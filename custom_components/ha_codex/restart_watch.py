"""Restart-required change detection for HA Codex."""

from __future__ import annotations

from pathlib import Path
from uuid import uuid4

from .const import EVENT_APPROVAL_REQUIRED
from .models import ChatMessage, CodexSession, PendingApproval

FRONTEND_BUILD_COMMAND = ["npm", "run", "build"]
FRONTEND_BUILD_RELATIVE_PATHS = (
    ("frontend",),
    ("www", "ha_codex"),
)


class RestartWatchMixin:
    """Mixin methods extracted from CodexManager."""

    async def _async_respond_restart_approval(
        self,
        approval_id: str,
        approved: bool,
    ) -> CodexSession:
        """Apply one restart toast decision to all pending restart requests."""
        selected_session: CodexSession | None = None
        decision = "approved" if approved else "rejected"
        changed_sessions: list[CodexSession] = []
        for session in self.sessions.values():
            for approval in session.approvals:
                if approval.status == "pending" and self._is_restart_approval(approval):
                    if approval.id == approval_id:
                        selected_session = session
                        break
            if selected_session is not None:
                break
        if selected_session is None:  # pragma: no cover
            raise ValueError(f"Unknown approval {approval_id}")
        if approved:
            build_result = await self._async_build_frontend_for_restart()
            if not build_result["ok"]:
                self._append_message(
                    selected_session,
                    ChatMessage(
                        role="event",
                        content=self._format_frontend_build_failure(build_result),
                        metadata={
                            "kind": "restart_build_failed",
                            "command": " ".join(FRONTEND_BUILD_COMMAND),
                            "cwd": build_result.get("cwd"),
                            "returncode": build_result.get("returncode"),
                        },
                    ),
                )
                selected_session.touch()
                await self.async_save()
                self._fire_session_updated(selected_session)
                raise RuntimeError(
                    "npm run build failed; Home Assistant Core restart was not started"
                )
        for session in self.sessions.values():
            session_changed = False
            for approval in session.approvals:
                if approval.status == "pending" and self._is_restart_approval(approval):
                    approval.status = decision
                    session_changed = True
            if session_changed:
                if session.status == "waiting_approval":
                    session.status = "idle"
                session.touch()
                changed_sessions.append(session)
        await self.async_save()
        for session in changed_sessions:
            self._fire_session_updated(session)
        if approved:
            await self.hass.services.async_call("homeassistant", "restart", {}, blocking=False)
        return selected_session

    async def _async_build_frontend_for_restart(self) -> dict:
        """Build the React frontend before allowing Home Assistant Core restart."""
        cwd = self._frontend_build_path()
        if cwd is None:
            return {
                "ok": True,
                "skipped": True,
                "reason": "Frontend source package is not installed",
            }
        result = await self._run_command(FRONTEND_BUILD_COMMAND, cwd=str(cwd), timeout=180)
        result["cwd"] = str(cwd)
        return result

    def _frontend_build_path(self) -> Path | None:
        """Return the HA Codex frontend package directory."""
        base_paths = [Path(self.hass.config.path()), Path(self.workspace_path)]
        seen: set[str] = set()
        for base_path in base_paths:
            for relative_path in FRONTEND_BUILD_RELATIVE_PATHS:
                frontend_path = base_path.joinpath(*relative_path)
                try:
                    key = str(frontend_path.resolve(strict=False))
                except OSError:  # pragma: no cover
                    key = str(frontend_path)
                if key in seen:
                    continue
                seen.add(key)
                if frontend_path.joinpath("package.json").is_file():
                    return frontend_path
        return None

    def _format_frontend_build_failure(self, result: dict) -> str:
        """Format an npm build failure for the chat transcript."""
        lines = [
            "Home Assistant Core restart was not started because `npm run build` failed.",
            "",
            f"Command: `{' '.join(FRONTEND_BUILD_COMMAND)}`",
            f"Directory: `{result.get('cwd')}`",
            f"Return code: `{result.get('returncode')}`",
        ]
        stderr = self._tail_text(str(result.get("stderr") or ""))
        stdout = self._tail_text(str(result.get("stdout") or ""))
        if stderr:
            lines.extend(["", "stderr:", "```text", stderr, "```"])
        if stdout:  # pragma: no cover
            lines.extend(["", "stdout:", "```text", stdout, "```"])
        return "\n".join(lines)

    def _tail_text(self, value: str, limit: int = 4000) -> str:
        if len(value) <= limit:
            return value.strip()
        return value[-limit:].strip()

    async def _maybe_request_restart_approval(self, session_id: str) -> None:
        """Create a restart approval when a run changed restart-relevant files."""
        baseline = self.restart_baselines.get(session_id)
        if baseline is None:
            return
        session = self._require_session(session_id)
        if session.validation and session.validation.status == "failed":
            return
        if self._has_pending_steer(session):
            return
        restart_snapshot = await self.hass.async_add_executor_job(self._restart_watch_snapshot)
        changed = self._changed_restart_paths(baseline, restart_snapshot)
        if not changed:
            return
        existing_approval = next(
            (
                approval
                for approval in session.approvals
                if approval.status == "pending" and self._is_restart_approval(approval)
            ),
            None,
        )
        if existing_approval is not None:
            self._fire(
                EVENT_APPROVAL_REQUIRED,
                {
                    "session_id": existing_approval.session_id,
                    "approval": existing_approval.to_dict(),
                },
            )
            return
        approval = PendingApproval(
            id=str(uuid4()),
            session_id=session_id,
            command="ha core restart",
            reason=(
                "restart_required: HA Codex changed files that require Home Assistant "
                f"Core restart: {', '.join(changed[:8])}"
            ),
        )
        session.approvals.append(approval)
        session.status = "idle"
        session.touch()
        await self.async_save()
        self._fire(
            EVENT_APPROVAL_REQUIRED,
            {"session_id": session_id, "approval": approval.to_dict()},
        )
        self._fire_session_updated(session)

    def _restart_watch_snapshot(self) -> dict[str, tuple[int, int]]:
        """Return mtimes for files whose changes require HA Core restart."""
        snapshot: dict[str, tuple[int, int]] = {}
        for root in self._restart_watch_roots():
            if root.is_file():
                self._add_restart_path(snapshot, root)
                continue
            if not root.is_dir():
                snapshot[str(root)] = (-1, -1)
                continue
            for path in root.rglob("*"):
                if path.is_file() and "__pycache__" not in path.parts:
                    self._add_restart_path(snapshot, path)
        return snapshot

    def _restart_watch_roots(self) -> list[Path]:
        """Return file roots where changes require HA Core restart."""
        relative_roots = [
            ("configuration.yaml",),
            ("custom_components", "ha_codex"),
            ("www", "ha_codex"),
        ]
        base_paths = [Path(self.hass.config.path()), Path(self.workspace_path)]
        roots: list[Path] = []
        seen: set[str] = set()
        for base_path in base_paths:
            for relative_root in relative_roots:
                root = base_path.joinpath(*relative_root)
                try:
                    key = str(root.resolve(strict=False))
                except OSError:  # pragma: no cover
                    key = str(root)
                if key in seen:
                    continue
                seen.add(key)
                roots.append(root)
        return roots

    def _add_restart_path(self, snapshot: dict[str, tuple[int, int]], path: Path) -> None:
        try:
            stat = path.stat()
        except OSError:
            snapshot[str(path)] = (-1, -1)
            return
        snapshot[str(path)] = (stat.st_mtime_ns, stat.st_size)

    def _changed_restart_paths(
        self,
        before: dict[str, tuple[int, int]],
        after: dict[str, tuple[int, int]],
    ) -> list[str]:
        changed: list[str] = []
        for path in sorted(set(before) | set(after)):
            if before.get(path) != after.get(path):
                changed.append(path)
        return changed

    def _is_restart_approval(self, approval: PendingApproval) -> bool:
        return approval.command == "ha core restart" and str(approval.reason or "").startswith(
            "restart_required:"
        )

    def _has_pending_restart_approval(self, session: CodexSession) -> bool:
        return any(
            approval.status == "pending" and self._is_restart_approval(approval)
            for approval in session.approvals
        )

    def _has_pending_steer(self, session: CodexSession) -> bool:
        return any(
            message.role == "user"
            and message.metadata.get("kind") == "steer"
            and message.metadata.get("steer_status") == "pending"
            for message in session.messages
        )

    def _defer_pending_restart_approvals(self, session: CodexSession) -> None:
        deferred = [
            approval
            for approval in session.approvals
            if approval.status == "pending" and self._is_restart_approval(approval)
        ]
        if not deferred:
            return
        for approval in deferred:
            approval.status = "skipped"
        self._append_message(
            session,
            ChatMessage(
                role="event",
                content=(
                    "Home Assistant Core restart deferred because another user message was queued."
                ),
                metadata={"kind": "restart_deferred"},
            ),
        )
