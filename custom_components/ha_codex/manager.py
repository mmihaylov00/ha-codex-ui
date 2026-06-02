"""Session manager for the HA Codex integration."""

from __future__ import annotations

import asyncio
import json
import logging
import re
import subprocess
from pathlib import Path
from shutil import which
from typing import Any
from uuid import uuid4

from .approvals import is_safe_read_only_command
from .bridge_control import async_restart_bridge_service, async_start_bridge_service
from .bridge_runner import CodexBridgeRunner
from .capabilities import discover_addon_paths, discover_validation_command
from .codex_events import NormalizedEvent
from .const import (
    EVENT_APPROVAL_REQUIRED,
    EVENT_MESSAGE_APPENDED,
    EVENT_MESSAGE_DELTA,
    EVENT_RUN_FINISHED,
    EVENT_SESSION_DELETED,
    EVENT_SESSION_UPDATED,
    EVENT_VALIDATION_FINISHED,
)
from .context import ContextMixin
from .file_changes import FileChangeMixin
from .git_ops import GitOperationsMixin
from .models import ChatMessage, CodexSession, PendingApproval, ValidationResult, utc_timestamp
from .restart_watch import RestartWatchMixin
from .run_checkpoints import RunCheckpointMixin
from .runner import CodexProcessRunner, RunnerOptions
from .runtime_settings import (
    default_settings,
    model_for_preset,
    normalize_run_settings,
    normalize_settings,
    resolve_run_settings,
    update_settings,
)
from .titles import summarize_prompt_title
from .validation_lab import (
    build_validation_summary,
    is_ha_relevant_change,
    reload_service_for_domain,
)

_LOGGER = logging.getLogger(__name__)

_STALE_CODEX_THREAD_RE = re.compile(
    r"thread/resume failed:\s+no rollout found for thread id\s+([0-9a-f-]+)",
    re.IGNORECASE,
)
_RECOVERY_CONTEXT_MESSAGES = 16
_UNKNOWN_CODEX_ERROR = "Codex reported an error without additional details."
_BRIDGE_LOG_MAX_LINES = 500
_BRIDGE_LOG_MAX_BYTES = 200_000
_SESSION_UPDATE_DEBOUNCE_SECONDS = 0.05
_QUESTION_BLOCK_RE = re.compile(
    r"<ha_codex_question>\s*([\s\S]*?)\s*</ha_codex_question>", re.IGNORECASE
)
_MODIFYING_PROMPT_RE = re.compile(
    r"\b(add|adjust|build|change|configure|create|delete|disable|edit|enable|fix|"
    r"implement|install|make|modify|move|remove|rename|replace|set up|update|write)\b",
    re.IGNORECASE,
)
_READ_ONLY_PROMPT_RE = re.compile(
    r"^\s*(analy[sz]e|check|describe|diagnose|explain|find|how|inspect|list|"
    r"review|show|summari[sz]e|what|why)\b",
    re.IGNORECASE,
)
_RUN_PLANS_KEY = "run_plans"
_PLAN_QUESTION_STATUS = "needs_answer"


def bundled_codex_path() -> str | None:
    """Return the Python SDK bundled Codex binary path when installed."""
    try:
        from codex_cli_bin import bundled_codex_path as sdk_bundled_codex_path
    except ImportError:
        return None
    try:
        return str(sdk_bundled_codex_path())
    except (OSError, TypeError, ValueError):
        return None


class CodexManager(
    RestartWatchMixin,
    RunCheckpointMixin,
    FileChangeMixin,
    GitOperationsMixin,
    ContextMixin,
):
    """Manage persisted Codex sessions and active runs."""

    def __init__(
        self,
        hass: Any,
        store: Any,
        *,
        workspace_path: str,
        codex_command: str,
        bridge_url: str | None,
        addon_write_scope: str | list[str] | None,
        validation_command: str | list[str] | None,
    ) -> None:
        """Initialize the manager."""
        self.hass = hass
        self.store = store
        self.workspace_path = workspace_path
        self.codex_command = codex_command
        self.bridge_url = bridge_url
        self.addon_write_scope = addon_write_scope
        self.validation_config = validation_command
        self.addon_paths = discover_addon_paths(addon_write_scope)
        self.validation_command = discover_validation_command(
            validation_command,
            config_path=self.hass.config.path(),
        )
        self.sessions: dict[str, CodexSession] = {}
        self.tasks: dict[str, asyncio.Task[Any]] = {}
        self.approval_waiters: dict[str, asyncio.Future[bool]] = {}
        self.restart_baselines: dict[str, dict[str, tuple[int, int]]] = {}
        self.file_change_baselines: dict[str, dict[str, tuple[int, int]]] = {}
        self.active_run_checkpoints: dict[str, str] = {}
        self.runtime_status: dict[str, Any] = {}
        self.settings: dict[str, Any] = default_settings()
        self.active_run_settings: dict[str, dict[str, Any]] = {}
        self._session_update_handles: dict[str, asyncio.TimerHandle] = {}
        self._session_update_include_messages: dict[str, bool] = {}
        self._pending_run_prompts: dict[tuple[str, int], str] = {}
        runner_options = RunnerOptions(
            codex_command=codex_command,
            workspace_path=workspace_path,
            writable_paths=self.addon_paths,
        )
        self.runner = (
            CodexBridgeRunner(bridge_url, runner_options)
            if bridge_url
            else CodexProcessRunner(runner_options)
        )

    async def async_load(self) -> None:
        """Load sessions and probe runtime capabilities."""
        stored = await self.store.async_load()
        if isinstance(stored, dict):
            self.sessions = {
                session_id: CodexSession.from_dict(session)
                for session_id, session in stored.get("sessions", {}).items()
                if isinstance(session, dict)
            }
            self.settings = normalize_settings(stored.get("settings"))
        await self.async_probe()

    async def async_save(self) -> None:
        """Persist sessions to HA storage."""
        await self.store.async_save(
            {
                "sessions": {key: session.to_dict() for key, session in self.sessions.items()},
                "settings": self.settings,
            }
        )

    async def async_get_settings(self) -> dict[str, Any]:
        """Return persisted HA Codex settings."""
        return self.settings

    async def async_update_settings(self, update: dict[str, Any]) -> dict[str, Any]:
        """Apply and persist a settings update."""
        self.settings = update_settings(self.settings, update)
        await self.async_save()
        return self.settings

    async def async_update_session_run_settings(
        self,
        session_id: str,
        run_settings: dict[str, Any],
    ) -> CodexSession:
        """Update one chat's run-settings override."""
        session = self._require_session(session_id)
        session.metadata["run_settings"] = normalize_run_settings(run_settings)
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        return session

    async def async_probe(self) -> dict[str, Any]:
        """Probe Codex and Home Assistant runtime capabilities."""
        codex_command = self.codex_command.strip()
        bridge_sdk_mode = bool(self.bridge_url and not codex_command)
        if bridge_sdk_mode:
            codex_path = bundled_codex_path()
            probe_command = codex_path
        else:
            probe_command = codex_command or "codex"
            codex_path = which(probe_command) or (
                probe_command if Path(probe_command).exists() else None
            )
        version = (
            await self._run_small_command([probe_command, "--version"])
            if probe_command
            else {"ok": False, "stdout": "", "stderr": "Codex runtime is not available"}
        )
        exec_help = (
            {"ok": True, "stdout": "SDK app-server", "stderr": ""}
            if bridge_sdk_mode and codex_path
            else await self._run_small_command([probe_command, "exec", "--help"])
            if probe_command
            else {"ok": False, "stdout": "", "stderr": "Codex exec is not available"}
        )
        self.addon_paths = discover_addon_paths(self.addon_write_scope)
        self.validation_command = discover_validation_command(
            self.validation_config,
            config_path=self.hass.config.path(),
        )
        runner_options = RunnerOptions(
            codex_command=probe_command or "",
            workspace_path=self.workspace_path,
            writable_paths=self.addon_paths,
        )
        self.runner = (
            CodexBridgeRunner(self.bridge_url, runner_options)
            if self.bridge_url
            else CodexProcessRunner(runner_options)
        )
        self.runtime_status = {
            "runner_type": "bridge-sdk"
            if bridge_sdk_mode and codex_path
            else "bridge"
            if self.bridge_url
            else ("direct" if codex_path else "unavailable"),
            "bridge_available": bool(self.bridge_url),
            "bridge_url": self.bridge_url,
            "codex_command": self.codex_command,
            "codex_path": codex_path,
            "codex_version": version["stdout"].strip() if version["ok"] else None,
            "codex_exec_available": exec_help["ok"],
            "codex_runtime_error": None
            if (codex_path or not bridge_sdk_mode)
            else "Python SDK bundled Codex runtime is not installed",
            "workspace_path": self.workspace_path,
            "workspace_exists": Path(self.workspace_path).is_dir(),
            "addon_paths": self.addon_paths,
            "validation_command": self.validation_command,
        }
        return self.runtime_status

    async def async_status(self) -> dict[str, Any]:
        """Return integration status."""
        runtime = dict(self.runtime_status)
        bridge_health = await self._async_bridge_health_status()
        runtime["bridge_health"] = bridge_health
        if self.bridge_url:
            runtime["bridge_available"] = bool(bridge_health.get("ok"))
        if bridge_health.get("ok"):
            runtime["bridge_started_at"] = bridge_health.get("started_at")
            runtime["bridge_uptime_seconds"] = bridge_health.get("uptime_seconds")
        return {
            "runtime": runtime,
            "usage": await self._async_usage_status(),
            "settings": self.settings,
            "sessions": [self._session_summary(session) for session in self.sessions.values()],
        }

    async def async_bridge_log(self, lines: int = _BRIDGE_LOG_MAX_LINES) -> dict[str, Any]:
        """Return the tail of the HA Codex bridge log."""
        safe_lines = max(1, min(int(lines), _BRIDGE_LOG_MAX_LINES))
        log_path = Path(self.hass.config.path("ha_codex_bridge.log"))

        def read_log() -> dict[str, Any]:
            if not log_path.exists():
                return {
                    "path": str(log_path),
                    "exists": False,
                    "lines": "",
                    "line_count": 0,
                    "truncated": False,
                }
            try:
                size = log_path.stat().st_size
                with log_path.open("rb") as log_file:
                    if size > _BRIDGE_LOG_MAX_BYTES:
                        log_file.seek(size - _BRIDGE_LOG_MAX_BYTES)
                        log_file.readline()
                    raw_lines = log_file.readlines()
            except OSError as err:
                return {
                    "path": str(log_path),
                    "exists": True,
                    "error": str(err),
                    "lines": "",
                    "line_count": 0,
                    "truncated": False,
                }

            selected = raw_lines[-safe_lines:]
            text = b"".join(selected).decode("utf-8", errors="replace")
            return {
                "path": str(log_path),
                "exists": True,
                "lines": text,
                "line_count": len(selected),
                "truncated": size > _BRIDGE_LOG_MAX_BYTES or len(raw_lines) > len(selected),
            }

        return await self.hass.async_add_executor_job(read_log)

    async def async_clear_bridge_log(self) -> dict[str, Any]:
        """Clear the HA Codex bridge log."""
        log_path = Path(self.hass.config.path("ha_codex_bridge.log"))

        def clear_log() -> dict[str, Any]:
            try:
                log_path.parent.mkdir(parents=True, exist_ok=True)
                log_path.write_text("", encoding="utf-8")
            except OSError as err:
                return {
                    "path": str(log_path),
                    "exists": log_path.exists(),
                    "error": str(err),
                    "lines": "",
                    "line_count": 0,
                    "truncated": False,
                }
            return {
                "path": str(log_path),
                "exists": True,
                "lines": "",
                "line_count": 0,
                "truncated": False,
            }

        return await self.hass.async_add_executor_job(clear_log)

    async def async_account_status(self) -> dict[str, Any]:
        """Return redacted Codex account status from the bridge."""
        return await self._async_bridge_json("GET", "/auth/status", timeout=10)

    async def async_account_device_login_start(self) -> dict[str, Any]:
        """Start a bridge-managed Codex device-code login."""
        return await self._async_bridge_json("POST", "/auth/device_login/start", timeout=15)

    async def async_account_device_login_status(self) -> dict[str, Any]:
        """Return bridge-managed device-code login status."""
        return await self._async_bridge_json("GET", "/auth/device_login/status", timeout=5)

    async def async_account_device_login_cancel(self) -> dict[str, Any]:
        """Cancel a bridge-managed Codex device-code login."""
        return await self._async_bridge_json("POST", "/auth/device_login/cancel", timeout=5)

    async def async_account_logout(self) -> dict[str, Any]:
        """Log out Codex through the bridge."""
        return await self._async_bridge_json("POST", "/auth/logout", timeout=35)

    async def async_restart_bridge(self) -> dict[str, Any]:
        """Start or restart the companion bridge service."""
        return await async_restart_bridge_service(self.hass)

    async def async_restart_core(self) -> dict[str, Any]:
        """Restart Home Assistant Core after building the HA Codex frontend."""
        build_result = await self._async_build_frontend_for_restart()
        if not build_result["ok"]:
            return {
                "ok": False,
                "error": "npm run build failed; Home Assistant Core restart was not started",
                "build": build_result,
            }
        await self.hass.services.async_call("homeassistant", "restart", {}, blocking=False)
        return {"ok": True, "build": build_result}

    async def async_start_bridge(self) -> dict[str, Any]:
        """Start the companion bridge service if bridge mode is configured."""
        if not self.bridge_url:
            return {"ok": False, "error": "Bridge mode is not configured"}

        start_result = await async_start_bridge_service(self.hass)
        if start_result.get("ok"):
            return start_result
        restart_result = await self.async_restart_bridge()
        if restart_result.get("ok"):
            restart_result["started_by_fallback"] = True
            return restart_result

        restart_error = restart_result.get("error")
        return {
            "ok": False,
            "error": str(
                restart_error or start_result.get("error") or "No bridge start helper is available"
            ),
            "start": start_result,
            "restart": restart_result,
        }

    async def _async_wait_for_bridge_health(self) -> dict[str, Any]:
        """Wait briefly for the configured bridge to answer health checks."""
        deadline = self.hass.loop.time() + 10
        last_health: dict[str, Any] = {"ok": False}
        while self.hass.loop.time() < deadline:
            last_health = await self._async_bridge_health_status()
            if last_health.get("ok"):
                return last_health
            await asyncio.sleep(0.5)
        return last_health

    async def async_create_session(self, title: str | None = None) -> CodexSession:
        """Create a new chat session."""
        session = CodexSession(title=title or "New chat")
        self.sessions[session.id] = session
        await self.async_save()
        self._fire_session_updated(session)
        return session

    async def async_send(
        self,
        session_id: str,
        prompt: str,
        context: list[dict[str, Any]] | None = None,
        run_prompt: str | None = None,
        metadata: dict[str, Any] | None = None,
        run_settings: dict[str, Any] | None = None,
    ) -> CodexSession:
        """Send a prompt to Codex, planning first when the request may edit files."""
        session = self.sessions.get(session_id)
        if session is None:
            raise ValueError(f"Unknown session {session_id}")
        if session_id in self.tasks and not self.tasks[session_id].done():
            raise ValueError("Session already has an active run")
        content = prompt.strip()
        if not content:
            raise ValueError("Prompt is required")
        attachments, serialized_context = self._prepare_context_attachments(context or [])
        message_metadata = dict(metadata or {})
        if attachments:
            message_metadata["context"] = attachments
        pending_plan = self._pending_run_plan(session)
        if pending_plan and self._is_question_answer(content):
            return await self._async_answer_run_plan_question(
                session,
                pending_plan,
                content,
                message_metadata,
            )
        if pending_plan:
            raise ValueError("Run plan is awaiting approval")
        run_content = str(run_prompt or "").strip() or content
        run_resolution = self._resolve_session_run_settings(
            session,
            content,
            context or [],
            run_settings,
        )
        effective_run_settings = self._runner_settings(run_resolution["resolved"])
        if run_settings is not None:
            message_metadata["run_settings"] = self._public_run_settings(run_resolution)
        runner_prompt = self._compose_prompt_with_context(run_content, serialized_context)
        if self._requires_run_plan(content, run_resolution):
            return await self._async_request_run_plan(
                session,
                content,
                runner_prompt,
                message_metadata,
                effective_run_settings,
            )
        return await self._async_start_run(
            session,
            content,
            runner_prompt,
            message_metadata,
            run_settings=effective_run_settings,
        )

    async def _async_start_run(
        self,
        session: CodexSession,
        content: str,
        runner_prompt: str,
        message_metadata: dict[str, Any] | None = None,
        run_settings: dict[str, Any] | None = None,
        *,
        task_name: str | None = None,
    ) -> CodexSession:
        """Append a user message and start a normal Codex execution run."""
        self._defer_pending_restart_approvals(session)
        self._append_message(
            session,
            ChatMessage(role="user", content=content, metadata=message_metadata or {}),
        )
        if session.title == "New chat":
            session.title = summarize_prompt_title(content)
        session.status = "running"
        await self._async_begin_run_tracking(session.id)
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        self.active_run_settings[session.id] = run_settings or self._runner_settings_for_session(
            session,
            content,
            [],
        )
        self.tasks[session.id] = self.hass.async_create_task(
            self._async_run_session(session.id, runner_prompt, run_settings=run_settings),
            task_name or f"ha_codex_run_{session.id}",
        )
        return session

    async def _async_request_run_plan(
        self,
        session: CodexSession,
        content: str,
        runner_prompt: str,
        message_metadata: dict[str, Any],
        run_settings: dict[str, Any],
    ) -> CodexSession:
        """Ask Codex for a short run plan and pause before execution."""
        self._defer_pending_restart_approvals(session)
        self._append_message(
            session,
            ChatMessage(role="user", content=content, metadata=message_metadata),
        )
        if session.title == "New chat":
            session.title = summarize_prompt_title(content)
        plan = {
            "id": str(uuid4()),
            "prompt": content,
            "run_prompt": runner_prompt,
            "status": "planning",
            "created_at": utc_timestamp(),
            "content": "",
            "run_settings": run_settings,
        }
        self._session_run_plans(session).append(plan)
        session.metadata["pending_plan"] = plan
        session.status = "planning"
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        self.tasks[session.id] = self.hass.async_create_task(
            self._async_run_plan(session.id, plan["id"]),
            f"ha_codex_plan_{session.id}",
        )
        return session

    async def async_respond_run_plan(
        self,
        session_id: str,
        plan_id: str,
        action: str,
    ) -> CodexSession:
        """Approve, revise, or cancel a pending run plan."""
        session = self._require_session(session_id)
        if session_id in self.tasks and not self.tasks[session_id].done():
            raise ValueError("Run plan is still being generated")
        plan = self._require_pending_run_plan(session, plan_id)
        decision = action.strip().lower()
        if decision not in {"approve", "cancel", "revise"}:
            raise ValueError("Run plan action must be approve, cancel, or revise")

        if decision == "approve":
            plan["status"] = "approved"
            plan["approved_at"] = utc_timestamp()
            session.metadata.pop("pending_plan", None)
            self._append_message(
                session,
                ChatMessage(
                    role="event",
                    content="Run plan approved. Starting execution.",
                    metadata={
                        "kind": "run_plan_decision",
                        "run_plan_id": plan_id,
                        "decision": "approved",
                    },
                ),
            )
            await self._async_create_rollback_checkpoint(session_id, plan_id)
            session.status = "running"
            await self._async_begin_run_tracking(session_id)
            session.touch()
            await self.async_save()
            self._fire_session_updated(session)
            run_settings = dict(plan.get("run_settings") or {})
            self.active_run_settings[session_id] = run_settings
            self.tasks[session_id] = self.hass.async_create_task(
                self._async_run_session(
                    session_id,
                    self._approved_run_prompt(plan),
                    run_settings=run_settings,
                ),
                f"ha_codex_run_{session_id}",
            )
            return session

        plan["status"] = "canceled" if decision == "cancel" else "revised"
        plan[f"{plan['status']}_at"] = utc_timestamp()
        session.metadata.pop("pending_plan", None)
        session.status = "idle"
        self._append_message(
            session,
            ChatMessage(
                role="event",
                content=(
                    "Run plan canceled. No files were changed."
                    if decision == "cancel"
                    else "Run plan returned for revision. No files were changed."
                ),
                metadata={
                    "kind": "run_plan_decision",
                    "run_plan_id": plan_id,
                    "decision": decision,
                },
            ),
        )
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        return session

    async def _async_answer_run_plan_question(
        self,
        session: CodexSession,
        plan: dict[str, Any],
        content: str,
        message_metadata: dict[str, Any],
    ) -> CodexSession:
        """Record a planning-question answer and resume plan generation."""
        if plan.get("status") != _PLAN_QUESTION_STATUS:
            raise ValueError("Run plan is awaiting approval")
        self._append_message(
            session,
            ChatMessage(role="user", content=content, metadata=message_metadata),
        )
        answers = plan.get("question_answers")
        if not isinstance(answers, list):
            answers = []
            plan["question_answers"] = answers
        answers.append({"content": content, "created_at": utc_timestamp()})
        plan["status"] = "planning"
        session.metadata["pending_plan"] = plan
        session.status = "planning"
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        self.tasks[session.id] = self.hass.async_create_task(
            self._async_run_plan(session.id, str(plan["id"])),
            f"ha_codex_plan_{session.id}",
        )
        return session

    async def async_steer(
        self,
        session_id: str,
        prompt: str,
        context: list[dict[str, Any]] | None = None,
        run_prompt: str | None = None,
        metadata: dict[str, Any] | None = None,
        run_settings: dict[str, Any] | None = None,
    ) -> CodexSession:
        """Queue a steering prompt for the active run's next resume step."""
        session = self._require_session(session_id)
        content = prompt.strip()
        if not content:
            raise ValueError("Prompt is required")
        run_content = str(run_prompt or "").strip() or content
        attachments, serialized_context = self._prepare_context_attachments(context or [])
        if session_id not in self.tasks or self.tasks[session_id].done():
            if self._has_pending_restart_approval(session):
                return await self.async_send(
                    session_id,
                    content,
                    context=context,
                    run_prompt=run_prompt,
                    metadata=metadata,
                    run_settings=run_settings,
                )
            raise ValueError("Session does not have an active run to steer")
        message_metadata: dict[str, Any] = dict(metadata or {})
        message_metadata.update({"kind": "steer", "steer_status": "pending"})
        run_resolution = self._resolve_session_run_settings(
            session,
            content,
            context or [],
            run_settings,
        )
        if run_settings is not None:
            message_metadata["run_settings"] = self._public_run_settings(run_resolution)
        if attachments:
            message_metadata["context"] = attachments
        message = self._append_message(
            session,
            ChatMessage(
                role="user",
                content=content,
                metadata=message_metadata,
            ),
        )
        runner_prompt = self._compose_prompt_with_context(run_content, serialized_context)
        if runner_prompt != content and message.id is not None:
            self._pending_run_prompts[(session_id, int(message.id))] = runner_prompt
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        return session

    async def async_retry_continue(self, session_id: str) -> CodexSession:
        """Retry or continue a failed Codex chat."""
        session = self._require_session(session_id)
        if session_id in self.tasks and not self.tasks[session_id].done():
            raise ValueError("Session already has an active run")
        if session.status != "error":
            raise ValueError("Only errored sessions can be retried")

        last_user_prompt = next(
            (
                message.content
                for message in reversed(session.messages)
                if message.role == "user" and message.content.strip()
            ),
            None,
        )
        if not last_user_prompt:
            raise ValueError("No previous user prompt to retry")

        prompt = (
            "Continue from the previous failed run. Another task may have been "
            "editing the Home Assistant config and left it temporarily unfinished. "
            "Inspect the current workspace state, then continue or repair the prior "
            "request as appropriate."
            if session.codex_session_id
            else last_user_prompt
        )
        self._append_message(
            session,
            ChatMessage(
                role="user",
                content=prompt,
                metadata={"kind": "retry_continue"},
            ),
        )
        session.status = "running"
        await self._async_begin_run_tracking(session_id)
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        self.tasks[session_id] = self.hass.async_create_task(
            self._async_run_session(session_id, prompt),
            f"ha_codex_retry_continue_{session_id}",
        )
        return session

    async def async_cancel(self, session_id: str) -> CodexSession:
        """Cancel an active Codex run."""
        task = self.tasks.get(session_id)
        if task and not task.done():
            task.cancel()
        session = self._require_session(session_id)
        session.status = "canceled"
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        return session

    async def async_rename(self, session_id: str, title: str) -> CodexSession:
        """Rename a session."""
        session = self._require_session(session_id)
        session.title = title.strip() or "New chat"
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        return session

    async def async_delete(self, session_id: str) -> None:
        """Delete a session."""
        self._require_session(session_id)
        task = self.tasks.pop(session_id, None)
        if task and not task.done():
            task.cancel()
        del self.sessions[session_id]
        self._cancel_pending_session_update(session_id)
        await self.async_save()
        self._fire(EVENT_SESSION_DELETED, {"deleted_session_id": session_id})

    async def async_archive(self, session_id: str, archived: bool = True) -> CodexSession | None:
        """Archive or restore a session."""
        session = self._require_session(session_id)
        if archived and self.is_empty_session(session):
            await self.async_delete(session_id)
            return None
        task = self.tasks.pop(session_id, None)
        if archived and task and not task.done():
            task.cancel()
            session.status = "canceled"
        session.archived_at = utc_timestamp() if archived else None
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        return session

    def is_empty_session(self, session: CodexSession) -> bool:
        """Return whether a session has no persisted chat state."""
        return not session.messages and not session.approvals and not session.codex_session_id

    async def async_respond_approval(
        self,
        session_id: str,
        approval_id: str,
        approved: bool,
    ) -> CodexSession:
        """Record an approval response and nudge Codex with the decision."""
        session = self._require_session(session_id)
        approval = next(
            (item for item in session.approvals if item.id == approval_id),
            None,
        )
        if approval is None:
            raise ValueError(f"Unknown approval {approval_id}")
        if self._is_restart_approval(approval):
            return await self._async_respond_restart_approval(approval_id, approved)
        approval.status = "approved" if approved else "rejected"
        waiter = self.approval_waiters.pop(approval_id, None)
        has_active_waiter = waiter is not None
        if waiter and not waiter.done():
            waiter.set_result(approved)
        decision = "approved" if approved else "rejected"
        self._append_message(
            session,
            ChatMessage(
                role="system",
                content=f"Shell command {decision}: {approval.command}",
                metadata={"approval_id": approval_id, "approved": approved},
            ),
        )
        session.status = "running" if has_active_waiter else "idle"
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        return session

    async def async_validate(
        self,
        session_id: str | None = None,
        changed_files: list[dict[str, str]] | None = None,
    ) -> ValidationResult:
        """Run Home Assistant config validation."""
        if not self.validation_command:
            result = ValidationResult(status="unavailable")
        else:
            completed = await self._run_command(self.validation_command, cwd=None, timeout=120)
            result = ValidationResult(
                status="passed" if completed["returncode"] == 0 else "failed",
                command=self.validation_command,
                returncode=completed["returncode"],
                stdout=completed["stdout"],
                stderr=completed["stderr"],
            )
        validation_changes = changed_files or []
        if session_id and session_id in self.sessions:
            session = self.sessions[session_id]
            if changed_files is None:
                validation_changes = await self._async_validation_changed_files(session_id)
            result.summary = build_validation_summary(
                result,
                validation_changes,
                session_id=session_id,
                session_title=session.title,
            )
            session.validation = result
            self._append_validation_summary_message(session, result)
            session.touch()
            await self.async_save()
            self._fire_session_updated(session)
        else:
            result.summary = build_validation_summary(result, validation_changes)
        self._fire(
            EVENT_VALIDATION_FINISHED, {"session_id": session_id, "validation": result.to_dict()}
        )
        return result

    async def async_reload_validation_domains(self, domains: list[str]) -> dict[str, Any]:
        """Reload safe Home Assistant domains from a validation recommendation."""
        selected: list[str] = []
        seen: set[str] = set()
        for domain_id in domains:
            value = str(domain_id).strip()
            if not value or value in seen:
                continue
            service = reload_service_for_domain(value)
            if service is None:
                raise ValueError(f"Cannot safely reload {value}")
            selected.append(value)
            seen.add(value)
        if not selected:
            raise ValueError("At least one reloadable domain is required")
        results = []
        for domain_id in selected:
            domain, service = reload_service_for_domain(domain_id) or ("", "")
            await self.hass.services.async_call(domain, service, {}, blocking=False)
            results.append({"domain": domain_id, "service": f"{domain}.{service}", "ok": True})
        return {"ok": True, "domains": selected, "results": results}

    async def _async_validation_changed_files(self, session_id: str) -> list[dict[str, str]]:
        baseline = self.file_change_baselines.get(session_id)
        if baseline is None:
            return []
        after = await self.hass.async_add_executor_job(self._workspace_file_snapshot)
        return self._changed_workspace_files(baseline, after)

    def _append_validation_summary_message(
        self,
        session: CodexSession,
        validation: ValidationResult,
    ) -> None:
        summary = validation.summary or {}
        label = str(summary.get("label") or validation.status or "Validation finished")
        content = f"Home Assistant validation: {label}."
        if validation.status:
            content += f"\nStatus: {validation.status}"
        if validation.command:
            content += f"\nCommand: `{' '.join(validation.command)}`"
        self._append_message(
            session,
            ChatMessage(
                role="event",
                content=content,
                metadata={
                    "kind": "validation_summary",
                    "validation": validation.to_dict(),
                },
            ),
        )

    def list_sessions(self) -> list[dict[str, Any]]:
        """Return lightweight session payloads."""
        return [
            self._session_payload(session)
            for session in sorted(
                self.sessions.values(),
                key=lambda item: item.updated_at,
                reverse=True,
            )
        ]

    def get_message(self, session_id: str, message_id: int) -> dict[str, Any]:
        """Return one message by per-session id."""
        session = self._require_session(session_id)
        for index, message in enumerate(session.messages, 1):
            current_id = int(message.id) if message.id is not None else index
            if current_id == message_id:
                return message.to_dict(current_id)
        raise ValueError(f"Unknown message {message_id}")

    def last_message_id(self, session_id: str) -> int:
        """Return the latest per-session message id."""
        return self._require_session(session_id).last_message_id()

    def messages_after(
        self,
        session_id: str,
        after_id: int | str | None = None,
        limit: int | str | None = None,
    ) -> list[dict[str, Any]]:
        """Return messages with ids greater than after_id, optionally capped to the newest messages."""
        session = self._require_session(session_id)
        try:
            newest_known = max(0, int(after_id or 0))
        except (TypeError, ValueError):
            newest_known = 0
        messages = [
            message.to_dict(int(message.id) if message.id is not None else index)
            for index, message in enumerate(session.messages, 1)
            if (int(message.id) if message.id is not None else index) > newest_known
        ]
        if limit is None:
            return messages
        try:
            bounded_limit = max(0, int(limit))
        except (TypeError, ValueError):
            return messages
        if not bounded_limit:
            return []
        return messages[-bounded_limit:]

    async def _async_run_plan(self, session_id: str, plan_id: str) -> None:
        """Run a read-only Codex planning pass and pause for user review."""
        session = self._require_session(session_id)
        plan = self._require_pending_run_plan(session, plan_id, allow_planning=True)
        plan_message: ChatMessage | None = None
        plan_run_settings = dict(plan.get("run_settings") or {})
        plan_run_settings["approval_mode"] = "ask"
        try:
            async for event in self.runner.run(
                self._run_plan_prompt(plan),
                session.codex_session_id,
                approval_handler=lambda approval_event: self._async_wait_for_approval(
                    session_id,
                    approval_event.approval_id or str(uuid4()),
                    approval_event.command or "Unknown command",
                    approval_event.cwd,
                ),
                run_settings=plan_run_settings,
            ):
                if event.kind == "session_started" and event.session_id:
                    session.codex_session_id = event.session_id
                    continue
                if event.kind == "message_delta" and event.text:
                    if plan_message is None:
                        plan_message = ChatMessage(
                            role="assistant",
                            content="",
                            metadata={
                                "kind": "run_plan",
                                "run_plan_id": plan_id,
                                "status": "planning",
                            },
                        )
                        self._append_message(session, plan_message)
                    plan_message.content += event.text
                    self._move_message_to_end_if_not_latest(session, plan_message)
                    self._fire(
                        EVENT_MESSAGE_DELTA,
                        {
                            "session_id": session_id,
                            "message_id": plan_message.id,
                            "delta": event.text,
                        },
                    )
                    session.touch()
                    continue
                if event.kind == "message" and event.text:
                    plan_message = ChatMessage(
                        role="assistant",
                        content=event.text,
                        metadata={"kind": "run_plan", "run_plan_id": plan_id, "status": "planning"},
                    )
                    self._append_message(session, plan_message)
                elif event.kind == "error":
                    plan["status"] = "error"
                    session.status = "error"
                    self._append_message(
                        session,
                        ChatMessage(
                            role="assistant",
                            content=event.text or self._unknown_error_text(event),
                            metadata={"kind": "error", "run_plan_id": plan_id},
                        ),
                    )
                elif event.kind != "run_finished":
                    action_message = self._message_for_event(event)
                    if action_message:
                        self._append_message(session, action_message)
                session.touch()
                self._fire_session_updated(session)

            if plan.get("status") == "planning":
                content = (plan_message.content if plan_message else "").strip()
                if not content:
                    content = (
                        "Codex did not return a run plan. Cancel this plan and revise "
                        "the prompt before trying again."
                    )
                    plan_message = ChatMessage(
                        role="assistant",
                        content=content,
                        metadata={"kind": "run_plan", "run_plan_id": plan_id, "status": "pending"},
                    )
                    self._append_message(session, plan_message)
                plan["content"] = content
                pending_question = self._extract_pending_question(content)
                plan["status"] = _PLAN_QUESTION_STATUS if pending_question else "pending"
                plan["planned_at"] = utc_timestamp()
                if plan_message:
                    if pending_question:
                        question_content = self._pending_question_content(content)
                        plan["content"] = question_content
                        plan_message.content = question_content
                    plan_message.metadata["status"] = plan["status"]
                session.metadata["pending_plan"] = plan
                session.status = "waiting_question" if pending_question else "waiting_plan_approval"
                if pending_question:
                    self._fire_session_updated(session, include_messages=True)
        except asyncio.CancelledError:
            plan["status"] = "canceled"
            session.status = "canceled"
            raise
        except Exception as err:  # noqa: BLE001
            _LOGGER.exception("Codex plan failed")
            plan["status"] = "error"
            session.status = "error"
            error_text = str(err).strip() or f"{err.__class__.__name__}: {_UNKNOWN_CODEX_ERROR}"
            self._append_message(
                session,
                ChatMessage(
                    role="assistant",
                    content=error_text,
                    metadata={"kind": "error", "run_plan_id": plan_id},
                ),
            )
        finally:
            for approval in session.approvals:
                if approval.session_id == session_id:
                    self.approval_waiters.pop(approval.id, None)
            session.touch()
            await self.async_save()
            self._fire(
                EVENT_RUN_FINISHED,
                {"session": self._session_payload(session), "session_id": session_id},
            )
            self.tasks.pop(session_id, None)
            self._fire_session_updated(session)

    async def _async_run_session(
        self,
        session_id: str,
        prompt: str,
        run_settings: dict[str, Any] | None = None,
    ) -> None:
        session = self._require_session(session_id)
        assistant_message: ChatMessage | None = None
        run_finished_message_added = False
        retry_after_stale_thread = False
        current_prompt = prompt
        changes_appended = False
        effective_run_settings = (
            run_settings
            or self.active_run_settings.get(session_id)
            or self._runner_settings_for_session(
                session,
                prompt,
                [],
            )
        )
        self.active_run_settings[session_id] = effective_run_settings
        try:
            while True:
                stale_thread_error = ""
                attempted_codex_session_id = session.codex_session_id
                async for event in self.runner.run(
                    current_prompt,
                    attempted_codex_session_id,
                    approval_handler=lambda approval_event: self._async_wait_for_approval(
                        session_id,
                        approval_event.approval_id or str(uuid4()),
                        approval_event.command or "Unknown command",
                        approval_event.cwd,
                    ),
                    run_settings=effective_run_settings,
                ):
                    if (
                        event.kind == "error"
                        and event.text
                        and attempted_codex_session_id
                        and not retry_after_stale_thread
                        and self._is_stale_codex_thread_error(event.text)
                    ):
                        stale_thread_error = event.text
                        break

                    if event.kind == "session_started" and event.session_id:
                        session.codex_session_id = event.session_id
                    elif event.kind == "message_delta" and event.text:
                        if assistant_message is None:
                            assistant_message = ChatMessage(role="assistant", content="")
                            self._append_message(session, assistant_message)
                        assistant_message.content += event.text
                        self._move_message_to_end_if_not_latest(session, assistant_message)
                        self._fire(
                            EVENT_MESSAGE_DELTA,
                            {
                                "session_id": session_id,
                                "message_id": assistant_message.id,
                                "delta": event.text,
                            },
                        )
                        session.touch()
                        continue
                    elif event.kind == "message" and event.text:
                        assistant_message = None
                        self._append_message(
                            session,
                            ChatMessage(role="assistant", content=event.text),
                        )
                    elif event.kind == "error":
                        error_text = event.text or self._unknown_error_text(event)
                        self._append_message(
                            session,
                            ChatMessage(
                                role="assistant",
                                content=error_text,
                                metadata={"kind": "error"},
                            ),
                        )
                        session.status = "error"
                    else:
                        if (
                            event.kind == "run_finished"
                            and run_finished_message_added
                            and not event.text
                        ):
                            continue
                        action_message = self._message_for_event(event)
                        if action_message:
                            assistant_message = None
                            self._append_message(session, action_message)
                            if (
                                event.kind == "run_finished"
                                and action_message.content == "Codex finished this run."
                            ):
                                run_finished_message_added = True
                    session.touch()
                    self._fire_session_updated(session)

                if not stale_thread_error:
                    break

                retry_after_stale_thread = True
                stale_codex_session_id = attempted_codex_session_id
                session.codex_session_id = None
                session.status = "running"
                assistant_message = None
                run_finished_message_added = False
                self._append_message(
                    session,
                    ChatMessage(
                        role="event",
                        content=(
                            "Codex could not resume the previous thread because its "
                            "remote rollout is no longer available. Starting a new "
                            "Codex thread for this chat."
                        ),
                        metadata={
                            "kind": "resume_recovery",
                            "stale_codex_session_id": stale_codex_session_id,
                            "error": stale_thread_error,
                        },
                    ),
                )
                current_prompt = self._fresh_thread_recovery_prompt(
                    session,
                    prompt,
                    stale_codex_session_id,
                )
                session.touch()
                await self.async_save()
                self._fire_session_updated(session)

            if session.status == "running":
                session.status = "idle"
            changed_files = await self._async_append_file_change_summary(session_id)
            changes_appended = True
            if self._should_validate_after_run(effective_run_settings, changed_files):
                await self.async_validate(session_id, changed_files=changed_files)
            await self._maybe_request_restart_approval(session_id)
        except asyncio.CancelledError:
            session.status = "canceled"
            raise
        except Exception as err:  # noqa: BLE001
            _LOGGER.exception("Codex run failed")
            session.status = "error"
            error_text = str(err).strip() or f"{err.__class__.__name__}: {_UNKNOWN_CODEX_ERROR}"
            self._append_message(
                session,
                ChatMessage(role="assistant", content=error_text, metadata={"kind": "error"}),
            )
        finally:
            if not changes_appended:
                await self._async_append_file_change_summary(session_id)
            for approval in session.approvals:
                if approval.session_id == session_id:
                    self.approval_waiters.pop(approval.id, None)
            session.touch()
            await self.async_save()
            self._fire(
                EVENT_RUN_FINISHED,
                {"session": self._session_payload(session), "session_id": session_id},
            )
            self.tasks.pop(session_id, None)
            self.restart_baselines.pop(session_id, None)
            self.file_change_baselines.pop(session_id, None)
            self.active_run_checkpoints.pop(session_id, None)
            self.active_run_settings.pop(session_id, None)
            await self._async_start_pending_steer(session_id)

    def _is_stale_codex_thread_error(self, text: str) -> bool:
        """Return true when Codex can no longer resume the stored thread id."""
        return bool(_STALE_CODEX_THREAD_RE.search(text))

    def _unknown_error_text(self, event: NormalizedEvent) -> str:
        """Build a useful fallback when Codex emits an empty error event."""
        raw = event.raw or {}
        returncode = raw.get("returncode")
        if returncode is not None:
            return f"{_UNKNOWN_CODEX_ERROR} Codex exited with code {returncode}."
        event_type = raw.get("type")
        if event_type:
            return f"{_UNKNOWN_CODEX_ERROR} Event type: {event_type}."
        return _UNKNOWN_CODEX_ERROR

    def _fresh_thread_recovery_prompt(
        self,
        session: CodexSession,
        prompt: str,
        stale_codex_session_id: str | None,
    ) -> str:
        """Build a prompt for recovering a local chat into a fresh Codex thread."""
        messages = [
            message
            for message in session.messages
            if message.role in {"user", "assistant"}
            and message.metadata.get("kind") not in {"error", "retry_continue"}
            and message.content.strip()
        ][-_RECOVERY_CONTEXT_MESSAGES:]
        transcript = "\n\n".join(
            f"{message.role.upper()}:\n{message.content.strip()}" for message in messages
        )
        recovery = (
            "The previous Codex thread could not be resumed because the remote rollout "
            "for its thread id is no longer available."
        )
        if stale_codex_session_id:
            recovery = f"{recovery}\nStale Codex thread id: {stale_codex_session_id}."
        recovery = (
            f"{recovery}\n\nContinue in this fresh Codex thread. Use the recent "
            "persisted chat transcript only as context, inspect the current workspace "
            "state directly, and handle the latest user request.\n\n"
            f"Recent transcript:\n{transcript or '(none)'}\n\n"
            f"Latest user request:\n{prompt}"
        )
        return recovery

    async def _async_start_pending_steer(self, session_id: str) -> None:
        """Start a follow-up run for user steering messages collected mid-run."""
        session = self._require_session(session_id)
        if session.archived_at is not None or session.status != "idle":
            return
        pending = [
            message
            for message in session.messages
            if (
                message.role == "user"
                and message.metadata.get("kind") == "steer"
                and message.metadata.get("steer_status") == "pending"
            )
        ]
        if not pending:
            return
        for message in pending:
            message.metadata["steer_status"] = "sent"
        prompt = (
            "The user sent the following steering message while you were running. "
            "Continue this same chat and incorporate it as the next instruction."
            if len(pending) == 1
            else (
                "The user sent the following steering messages while you were running. "
                "Continue this same chat and incorporate them as the next instructions."
            )
        )
        prompt = f"{prompt}\n\n" + "\n\n".join(
            f"Message {index}:\n{self._prompt_for_context_message(session_id, message)}"
            for index, message in enumerate(pending, 1)
        )
        session.status = "running"
        await self._async_begin_run_tracking(session_id)
        session.touch()
        await self.async_save()
        self._fire_session_updated(session)
        self.tasks[session_id] = self.hass.async_create_task(
            self._async_run_session(session_id, prompt),
            f"ha_codex_steer_{session_id}",
        )

    def _prompt_for_context_message(self, session_id: str, message: ChatMessage) -> str:
        """Return a raw message prompt with any stored hidden context attached."""
        context_key = (session_id, int(message.id or 0))
        return self._pending_run_prompts.pop(context_key, message.content)

    def _resolve_session_run_settings(
        self,
        session: CodexSession,
        prompt: str,
        context: list[dict[str, Any]],
        run_settings: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Resolve effective run settings and persist explicit chat overrides."""
        current_override = session.metadata.get("run_settings")
        override = current_override if isinstance(current_override, dict) else None
        if run_settings is not None:
            override = normalize_run_settings(run_settings, override)
            session.metadata["run_settings"] = override
        return resolve_run_settings(prompt, context, self.settings["defaults"], override)

    def _runner_settings_for_session(
        self,
        session: CodexSession,
        prompt: str,
        context: list[dict[str, Any]],
    ) -> dict[str, Any]:
        resolution = self._resolve_session_run_settings(session, prompt, context)
        return self._runner_settings(resolution["resolved"])

    def _runner_settings(self, resolved: dict[str, Any]) -> dict[str, Any]:
        """Return settings sent to the Codex runner."""
        settings = dict(resolved)
        settings["model"] = model_for_preset(self.settings, settings.get("model_preset_id"))
        return settings

    def _public_run_settings(self, resolution: dict[str, Any]) -> dict[str, Any]:
        """Return a compact run-settings summary for message metadata."""
        return {
            "requested": resolution.get("requested"),
            "resolved": resolution.get("resolved"),
            "read_only": resolution.get("read_only"),
            "modifying": resolution.get("modifying"),
            "risky": resolution.get("risky"),
        }

    def _requires_run_plan(self, prompt: str, resolution: dict[str, Any] | None = None) -> bool:
        """Return whether a prompt should pause for an explicit plan before edits."""
        content = prompt.strip()
        if not content:
            return False
        if self._is_question_answer(content):
            return False
        if resolution is None:
            resolution = resolve_run_settings(content, [], self.settings["defaults"], None)
        plan_mode = str((resolution.get("resolved") or {}).get("plan_mode") or "off")
        if plan_mode == "off":
            return False
        if plan_mode == "always":
            return True
        return bool(resolution.get("risky"))

    def _should_validate_after_run(
        self,
        run_settings: dict[str, Any],
        changed_files: list[dict[str, str]],
    ) -> bool:
        depth = str(run_settings.get("validation_depth") or "auto")
        if depth == "none":
            return False
        if depth == "full":
            return True
        return any(is_ha_relevant_change(change.get("path", "")) for change in changed_files)

    def _compose_run_plan_prompt(self, prompt: str) -> str:
        """Build the Codex prompt used for read-only run planning."""
        return (
            "Investigate the following HA Codex request before creating a run plan.\n"
            "You may read files, inspect configuration, search the workspace, and run safe read-only "
            "diagnostic commands to gather enough context.\n"
            "Do not modify files, run migrations, restart services, install packages, trigger automations, "
            "or execute any state-changing commands.\n"
            "If you need user input before choosing the plan, ask only the HA Codex question. "
            "Do not include a plan, intended files, validation strategy, or restart expectation until "
            "after the user answers all material questions.\n"
            "After investigation, return a compact run plan. Include these sections:\n"
            "- What you inspected\n"
            "- Intended files/areas\n"
            "- Validation strategy\n"
            "- Reload/restart expectation\n\n"
            f"User request:\n{prompt}"
        )

    def _run_plan_prompt(self, plan: dict[str, Any]) -> str:
        """Build the next planning prompt, including any answered planning question."""
        prompt = self._compose_run_plan_prompt(
            str(plan.get("run_prompt") or plan.get("prompt") or "")
        )
        answers = [item for item in plan.get("question_answers", []) if isinstance(item, dict)]
        if not answers:
            return prompt
        previous = str(plan.get("content") or "").strip()
        latest_answer = str(answers[-1].get("content") or "").strip()
        return (
            f"{prompt}\n\n"
            "Planning was paused because you asked the user for direction.\n"
            f"Previous planning response:\n{previous or '(none captured)'}\n\n"
            f"User answer:\n{latest_answer}\n\n"
            "Continue the planning pass now. Return the compact run plan only when it is ready for approval. "
            "If the answer is still insufficient, ask one focused HA Codex question using the required protocol "
            "and do not include a plan yet."
        )

    def _approved_run_prompt(self, plan: dict[str, Any]) -> str:
        """Build the execution prompt after the user approves a plan."""
        plan_text = str(plan.get("content") or "").strip()
        run_prompt = str(plan.get("run_prompt") or plan.get("prompt") or "").strip()
        return (
            "Execute the approved run plan for this HA Codex session.\n"
            "Keep changes scoped to the approved plan, preserve existing approval, "
            "validation, Git review, and restart approval flows, and report any "
            "reason you must deviate.\n\n"
            f"Approved plan:\n{plan_text or '(no plan text captured)'}\n\n"
            f"User request:\n{run_prompt}"
        )

    def _session_run_plans(self, session: CodexSession) -> list[dict[str, Any]]:
        plans = session.metadata.get(_RUN_PLANS_KEY)
        if not isinstance(plans, list):
            plans = []
            session.metadata[_RUN_PLANS_KEY] = plans
        return plans

    def _pending_run_plan(self, session: CodexSession) -> dict[str, Any] | None:
        plan = session.metadata.get("pending_plan")
        return plan if isinstance(plan, dict) else None

    def _require_pending_run_plan(
        self,
        session: CodexSession,
        plan_id: str,
        *,
        allow_planning: bool = False,
    ) -> dict[str, Any]:
        plan = self._pending_run_plan(session)
        if not plan or plan.get("id") != plan_id:
            raise ValueError(f"Unknown run plan {plan_id}")
        allowed = {"pending", "planning", _PLAN_QUESTION_STATUS} if allow_planning else {"pending"}
        if plan.get("status") not in allowed:
            raise ValueError("Run plan is not awaiting review")
        return plan

    def _is_question_answer(self, content: str) -> bool:
        """Return whether a user message is answering a structured Codex question."""
        return content.strip().lower().startswith("answer to your question:")

    async def _async_wait_for_approval(
        self,
        session_id: str,
        approval_id: str,
        command: str,
        cwd: str | None,
    ) -> bool:
        """Create an approval request and wait for the dashboard decision."""
        session = self._require_session(session_id)
        approval = PendingApproval(
            id=approval_id,
            session_id=session_id,
            command=command,
            cwd=cwd,
        )
        run_settings = self.active_run_settings.get(session_id) or {}
        if run_settings.get("approval_mode") == "auto_readonly" and is_safe_read_only_command(
            command
        ):
            approval.status = "approved"
            approval.reason = "auto_readonly: safe read-only command"
            session.approvals.append(approval)
            session.touch()
            await self.async_save()
            self._fire_session_updated(session)
            return True
        session.approvals.append(approval)
        session.status = "waiting_approval"
        session.touch()
        waiter = asyncio.get_running_loop().create_future()
        self.approval_waiters[approval_id] = waiter
        await self.async_save()
        self._fire(
            EVENT_APPROVAL_REQUIRED,
            {"session_id": session_id, "approval": approval.to_dict()},
        )
        self._fire_session_updated(session)
        return await waiter

    def _require_session(self, session_id: str) -> CodexSession:
        session = self.sessions.get(session_id)
        if session is None:
            raise ValueError(f"Unknown session {session_id}")
        return session

    def _session_summary(self, session: CodexSession) -> dict[str, Any]:
        return {
            "id": session.id,
            "title": session.title,
            "status": session.status,
            "codex_session_id": session.codex_session_id,
            "approvals": [approval.to_dict() for approval in session.approvals],
            "validation": session.validation.to_dict() if session.validation else None,
            "archived": session.archived_at is not None,
            "archived_at": session.archived_at,
            "metadata": session.metadata,
            "created_at": session.created_at,
            "updated_at": session.updated_at,
            "last_message_id": session.last_message_id(),
            "last_user_message_at": session.last_user_message_at(),
            "has_pending_question": self._has_pending_question(session),
            "pending_approvals": len(
                [
                    approval
                    for approval in session.approvals
                    if approval.status == "pending" and not self._is_restart_approval(approval)
                ]
            ),
        }

    def _has_pending_question(self, session: CodexSession) -> bool:
        """Return whether the newest unanswered assistant message asks a question."""
        if session.status in {"running", "working"}:
            return False
        for message in reversed(session.messages):
            if message.role == "user":
                return False
            if self._message_can_contain_question(message) and self._extract_pending_question(
                message.content
            ):
                return True
        return False

    def _extract_pending_question(self, content: str) -> dict[str, Any] | None:
        """Return a valid final question block, if the message ends with one."""
        for match in _QUESTION_BLOCK_RE.finditer(content):
            if content[match.end() :].strip():
                continue
            try:
                parsed = json.loads(match.group(1))
            except (TypeError, json.JSONDecodeError):
                return None
            if not isinstance(parsed, dict) or not str(parsed.get("question") or "").strip():
                return None
            choices = parsed.get("choices")
            if not isinstance(choices, list) or len(choices) != 3:
                return None
            for choice in choices:
                if not isinstance(choice, dict) or not str(choice.get("label") or "").strip():
                    return None
            return parsed
        return None

    def _pending_question_content(self, content: str) -> str:
        """Return only the final structured question block from a planning response."""
        for match in _QUESTION_BLOCK_RE.finditer(content):
            if content[match.end() :].strip():
                continue
            return match.group(0).strip()
        return content.strip()

    def _message_can_contain_question(self, message: ChatMessage) -> bool:
        """Return whether a message may carry the structured question protocol."""
        if message.role == "assistant":
            return True
        return message.role == "event" and str(message.metadata.get("kind") or "") == "run_finished"

    def _session_payload(
        self, session: CodexSession, *, include_messages: bool = False
    ) -> dict[str, Any]:
        """Return a session payload, optionally omitting heavy message history."""
        if include_messages:
            return session.to_dict()
        return self._session_summary(session)

    def session_payload(
        self, session: CodexSession, *, include_messages: bool = False
    ) -> dict[str, Any]:
        """Return a public websocket-safe session payload."""
        return self._session_payload(session, include_messages=include_messages)

    def _fire_session_updated(
        self, session: CodexSession, *, include_messages: bool = False
    ) -> None:
        """Fire a coalesced lightweight session update event."""
        session_id = session.id
        handle = self._session_update_handles.pop(session_id, None)
        if handle is not None:
            handle.cancel()
        self._session_update_include_messages[session_id] = (
            self._session_update_include_messages.get(session_id, False) or include_messages
        )
        self._session_update_handles[session_id] = self.hass.loop.call_later(
            _SESSION_UPDATE_DEBOUNCE_SECONDS,
            self._flush_session_updated,
            session_id,
        )

    def _flush_session_updated(self, session_id: str) -> None:
        """Flush one pending session update if the session still exists."""
        self._session_update_handles.pop(session_id, None)
        include_messages = self._session_update_include_messages.pop(session_id, False)
        session = self.sessions.get(session_id)
        if session is None:
            return
        self._fire(
            EVENT_SESSION_UPDATED,
            {"session": self._session_payload(session, include_messages=include_messages)},
        )

    def _cancel_pending_session_update(self, session_id: str) -> None:
        """Cancel a queued session update for a deleted session."""
        handle = self._session_update_handles.pop(session_id, None)
        if handle is not None:
            handle.cancel()
        self._session_update_include_messages.pop(session_id, None)

    def _append_message(self, session: CodexSession, message: ChatMessage) -> ChatMessage:
        """Append a message unless it is the same as the previous timeline item."""
        if session.messages:
            previous = session.messages[-1]
            if (
                previous.role == message.role
                and previous.content.strip() == message.content.strip()
                and previous.metadata.get("kind") == message.metadata.get("kind")
            ):
                return previous
        session.assign_message_id(message)
        session.messages.append(message)
        self._fire(
            EVENT_MESSAGE_APPENDED,
            {"session_id": session.id, "message": message.to_dict()},
        )
        return message

    def _move_message_to_end_if_not_latest(
        self,
        session: CodexSession,
        message: ChatMessage,
    ) -> None:
        """Keep resumed streamed assistant text below intervening tool activity."""
        if not session.messages or session.messages[-1] is message:
            return
        for index, existing in enumerate(session.messages):
            if existing is message:
                session.messages.pop(index)
                session.messages.append(message)
                return

    async def _async_usage_status(self) -> dict[str, Any]:
        """Return Codex usage percentages when the runtime exposes them."""
        unavailable = {
            "ok": False,
            "five_hour_remaining_percent": None,
            "weekly_remaining_percent": None,
            "five_hour_reset_at": None,
            "weekly_reset_at": None,
        }
        if not self.bridge_url:
            return unavailable

        from aiohttp import ClientError, ClientSession

        try:
            async with ClientSession() as session:
                async with session.get(
                    f"{self.bridge_url.rstrip('/')}/usage", timeout=10
                ) as response:
                    payload = await response.json()
        except (ClientError, TimeoutError, ValueError) as err:
            return {**unavailable, "error": str(err)}

        if not isinstance(payload, dict):
            return {**unavailable, "error": "Bridge returned an invalid usage response"}
        return {
            "ok": bool(payload.get("ok")),
            "error": payload.get("error"),
            "five_hour_remaining_percent": payload.get("five_hour_remaining_percent"),
            "weekly_remaining_percent": payload.get("weekly_remaining_percent"),
            "five_hour_reset_at": payload.get("five_hour_reset_at"),
            "weekly_reset_at": payload.get("weekly_reset_at"),
        }

    async def _async_bridge_json(
        self, method: str, path: str, *, timeout: int | float = 10
    ) -> dict[str, Any]:
        """Call a bridge JSON endpoint and return a graceful error payload."""
        if not self.bridge_url:
            return {"ok": False, "error": "Bridge mode is not configured"}

        from aiohttp import ClientError, ClientSession

        url = f"{self.bridge_url.rstrip('/')}{path}"
        try:
            async with ClientSession() as session:
                request = session.post if method.upper() == "POST" else session.get
                async with request(url, timeout=timeout) as response:
                    try:
                        payload = await response.json()
                    except ValueError:
                        payload = {"ok": False, "error": "Bridge returned an invalid JSON response"}
                    if isinstance(payload, dict):
                        if response.status >= 400 and "ok" not in payload:
                            payload["ok"] = False
                        return payload
                    return {"ok": False, "error": "Bridge returned an invalid response"}
        except (ClientError, TimeoutError, ValueError) as err:
            return {"ok": False, "error": str(err)}

    async def _async_bridge_health_status(self) -> dict[str, Any]:
        """Return bridge health and uptime details when bridge mode is configured."""
        if not self.bridge_url:
            return {"ok": False}

        from aiohttp import ClientError, ClientSession

        try:
            async with ClientSession() as session:
                async with session.get(
                    f"{self.bridge_url.rstrip('/')}/health", timeout=5
                ) as response:
                    payload = await response.json()
        except (ClientError, TimeoutError, ValueError) as err:
            return {"ok": False, "error": str(err)}

        if not isinstance(payload, dict):
            return {"ok": False, "error": "Bridge returned an invalid health response"}
        return {
            "ok": bool(payload.get("ok")),
            "error": payload.get("error"),
            "config_dir": payload.get("config_dir"),
            "codex_home": payload.get("codex_home"),
            "codex_home_exists": payload.get("codex_home_exists"),
            "started_at": payload.get("started_at"),
            "uptime_seconds": payload.get("uptime_seconds"),
        }

    def _message_for_event(self, event: NormalizedEvent) -> ChatMessage | None:
        """Render non-assistant Codex activity as chat timeline messages."""
        if event.kind in {"message_delta", "session_started"}:
            return None
        if event.kind == "approval_required":
            content = "Approval requested"
            if event.command:
                content = f"{content}: {event.command}"
            return ChatMessage(
                role="event",
                content=content,
                metadata={"kind": event.kind, "approval_id": event.approval_id, "raw": event.raw},
            )
        if event.kind == "run_finished":
            role = "assistant" if event.text and _QUESTION_BLOCK_RE.search(event.text) else "event"
            return ChatMessage(
                role=role,
                content=event.text or "Codex finished this run.",
                metadata={"kind": event.kind, "raw": event.raw},
            )
        if event.file_changes:
            metadata = {"kind": event.kind, "file_changes": event.file_changes, "raw": event.raw}
            return ChatMessage(
                role="event",
                content=event.text or "File changes recorded.",
                metadata=metadata,
            )
        if event.command:
            return ChatMessage(
                role="event",
                content=self._format_command_message(event.command),
                metadata={
                    "kind": event.kind,
                    "cwd": event.cwd,
                    "command": event.command,
                    "raw": event.raw,
                },
            )
        if event.text:
            return ChatMessage(
                role="event",
                content=event.text,
                metadata={"kind": event.kind, "raw": event.raw},
            )
        return None

    def _format_command_message(self, command: str) -> str:
        """Format a shell command for readable markdown rendering."""
        safe_command = command.replace("```", "` ` `")
        return f"```\n{safe_command}\n```"

    async def _run_small_command(self, command: list[str]) -> dict[str, Any]:
        return await self._run_command(command, cwd=None, timeout=10)

    async def _run_workspace_command(self, command: list[str]) -> dict[str, Any]:
        return await self._run_command(command, cwd=self.workspace_path, timeout=120)

    async def _run_command(
        self,
        command: list[str],
        *,
        cwd: str | None,
        timeout: int,
        ok_returncodes: set[int] | None = None,
    ) -> dict[str, Any]:
        def run() -> dict[str, Any]:
            try:
                completed = subprocess.run(
                    command,
                    cwd=cwd,
                    text=True,
                    capture_output=True,
                    timeout=timeout,
                    check=False,
                )
            except (OSError, subprocess.SubprocessError) as err:
                return {
                    "ok": False,
                    "returncode": None,
                    "stdout": "",
                    "stderr": str(err),
                }
            valid_returncodes = ok_returncodes or {0}
            return {
                "ok": completed.returncode in valid_returncodes,
                "returncode": completed.returncode,
                "stdout": completed.stdout,
                "stderr": completed.stderr,
            }

        return await self.hass.async_add_executor_job(run)

    def _fire(self, event_type: str, data: dict[str, Any]) -> None:
        self.hass.bus.async_fire(event_type, data)
