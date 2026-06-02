import asyncio
import importlib.util
import json
import subprocess
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from custom_components.ha_codex.approvals import is_safe_read_only_command
from custom_components.ha_codex.capabilities import (
    discover_addon_paths,
    discover_validation_command,
)
from custom_components.ha_codex.codex_events import NormalizedEvent, normalize_event
from custom_components.ha_codex.manager import CodexManager, summarize_prompt_title
from custom_components.ha_codex.models import (
    ChatMessage,
    CodexSession,
    PendingApproval,
    ValidationResult,
)
from custom_components.ha_codex.runner import RunnerOptions, build_codex_command
from custom_components.ha_codex.runtime_settings import (
    default_settings,
    resolve_run_settings,
    update_settings,
)
from custom_components.ha_codex.validation_lab import (
    build_validation_summary,
    reload_service_for_domain,
)

CONFIG_TEMP_DIR = "/config" if Path("/config").is_dir() else None
REPO_ROOT = Path(__file__).resolve().parents[1]
BRIDGE_PATH = REPO_ROOT / "custom_components" / "ha_codex" / "bridge" / "ha_codex_bridge.py"


def load_bridge_module():
    spec = importlib.util.spec_from_file_location("ha_codex_bridge_test", BRIDGE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


class CapabilityDiscoveryTests(unittest.TestCase):
    def test_discovers_first_available_validation_command(self):
        command = discover_validation_command(
            "auto",
            config_path="/config",
            command_exists=lambda name: name == "hass",
        )

        self.assertEqual(command, ["hass", "--script", "check_config", "--config", "/config"])

    def test_returns_no_validation_command_when_auto_has_no_candidate(self):
        command = discover_validation_command("auto", command_exists=lambda _: False)

        self.assertIsNone(command)

    def test_discovers_visible_addon_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / "addons").mkdir()
            (root / "addon_configs").mkdir()
            missing = root / "missing"

            paths = discover_addon_paths(
                "all_visible",
                candidates=[root / "addons", root / "addon_configs", missing],
            )

        self.assertEqual(paths, [str(root / "addons"), str(root / "addon_configs")])


class BridgeAccountTests(unittest.TestCase):
    def test_auth_status_reports_missing_auth_as_logged_out(self):
        bridge = load_bridge_module()
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            status = bridge.codex_auth_status(codex_home=Path(tmp), codex_command="/bin/true")

        self.assertTrue(status["ok"])
        self.assertFalse(status["logged_in"])
        self.assertEqual(status["status_text"], "Not logged in")

    def test_auth_status_redacts_token_fields(self):
        bridge = load_bridge_module()
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / "auth.json").write_text(
                json.dumps(
                    {
                        "auth_mode": "chatgpt",
                        "tokens": {
                            "access_token": "access-secret",
                            "refresh_token": "refresh-secret",
                            "id_token": "id-secret",
                            "account_id": "acct-safe",
                        },
                        "last_refresh": "2026-06-01T12:00:00Z",
                    }
                ),
                encoding="utf-8",
            )

            status = bridge.codex_auth_status(codex_home=root, codex_command="/bin/true")

        self.assertTrue(status["logged_in"])
        self.assertEqual(status["auth_mode"], "chatgpt")
        self.assertEqual(status["account_id"], "acct-safe")
        self.assertEqual(status["last_refresh"], "2026-06-01T12:00:00Z")
        serialized = json.dumps(status)
        self.assertNotIn("access-secret", serialized)
        self.assertNotIn("refresh-secret", serialized)
        self.assertNotIn("id-secret", serialized)

    def test_device_login_output_extracts_url_and_code_without_secrets(self):
        bridge = load_bridge_module()
        output = (
            "Open https://auth.openai.com/activate and enter ABCD-EFGH\n"
            "access_token=secret-token sk-real-secret"
        )

        parsed = bridge.parse_device_login_output(output)
        sanitized = bridge.sanitize_device_login_output(output)

        self.assertEqual(parsed["verification_uri"], "https://auth.openai.com/activate")
        self.assertEqual(parsed["user_code"], "ABCD-EFGH")
        self.assertNotIn("secret-token", sanitized)
        self.assertNotIn("sk-real-secret", sanitized)


class CodexEventTests(unittest.TestCase):
    def test_normalizes_assistant_text_delta(self):
        event = normalize_event({"type": "agent_message_delta", "delta": "hello"})

        self.assertEqual(event.kind, "message_delta")
        self.assertEqual(event.text, "hello")

    def test_normalizes_completed_agent_message_item(self):
        event = normalize_event(
            {
                "type": "item.completed",
                "item": {
                    "type": "agent_message",
                    "text": "Plan:\n- Inspect files first",
                },
            }
        )

        self.assertEqual(event.kind, "message")
        self.assertEqual(event.text, "Plan:\n- Inspect files first")

    def test_normalizes_session_id_from_thread_event(self):
        event = normalize_event({"type": "thread.started", "thread_id": "abc-123"})

        self.assertEqual(event.kind, "session_started")
        self.assertEqual(event.session_id, "abc-123")

    def test_normalizes_approval_request(self):
        event = normalize_event(
            {
                "type": "exec_approval_request",
                "id": "approval-1",
                "command": "ha core restart",
                "cwd": "/homeassistant",
            }
        )

        self.assertEqual(event.kind, "approval_required")
        self.assertEqual(event.approval_id, "approval-1")
        self.assertEqual(event.command, "ha core restart")

    def test_normalizes_nested_error_message(self):
        event = normalize_event(
            {
                "type": "error",
                "error": {
                    "message": "thread/resume failed",
                    "code": -32600,
                },
            }
        )

        self.assertEqual(event.kind, "error")
        self.assertEqual(event.text, "thread/resume failed (code -32600)")

    def test_suppresses_completed_command_execution_item(self):
        event = normalize_event(
            {
                "type": "item.completed",
                "item": {
                    "type": "command_execution",
                    "command": "/bin/zsh -lc 'ls -la /config'",
                },
            }
        )

        self.assertEqual(event.kind, "raw")
        self.assertIsNone(event.command)

    def test_normalizes_started_command_execution_item(self):
        event = normalize_event(
            {
                "type": "item.started",
                "item": {
                    "type": "command_execution",
                    "command": "/bin/zsh -lc 'ls -la /config'",
                    "status": "in_progress",
                },
            }
        )

        self.assertEqual(event.kind, "action")
        self.assertEqual(event.command, "ls -la /config")

    def test_compacts_large_raw_command_payload(self):
        event = normalize_event(
            {
                "type": "item.completed",
                "item": {
                    "type": "command_execution",
                    "command": "/bin/sh -lc 'yes output | head -20000'",
                    "output": "x" * 20000,
                },
            }
        )

        self.assertEqual(event.kind, "raw")
        self.assertIsNotNone(event.raw)
        self.assertLess(len(event.raw["item"]["output"]), 9000)
        self.assertIn("truncated", event.raw["item"]["output"])

    def test_normalizes_apply_patch_file_changes(self):
        event = normalize_event(
            {
                "type": "item.completed",
                "item": {
                    "type": "tool_call",
                    "tool_name": "functions.apply_patch",
                    "arguments": (
                        "*** Begin Patch\n"
                        "*** Update File: /config/www/ha_codex/panel.js\n"
                        "@@\n"
                        "-old\n"
                        "+new\n"
                        "*** Add File: /config/custom_components/ha_codex/new.py\n"
                        "+value = 1\n"
                        "*** End Patch\n"
                    ),
                },
            }
        )

        self.assertEqual(event.kind, "action")
        self.assertEqual(
            event.file_changes,
            [
                {"status": "modified", "path": "/config/www/ha_codex/panel.js"},
                {"status": "added", "path": "/config/custom_components/ha_codex/new.py"},
            ],
        )
        self.assertIn("File changes:", event.text)


class SessionModelTests(unittest.TestCase):
    def test_session_round_trips_through_storage_dict(self):
        session = CodexSession(
            id="local-session",
            title="Kitchen lights",
            messages=[ChatMessage(role="user", content="Dim the kitchen")],
            codex_session_id="codex-session",
            status="running",
        )

        restored = CodexSession.from_dict(session.to_dict())

        self.assertEqual(restored.id, "local-session")
        self.assertEqual(restored.title, "Kitchen lights")
        self.assertEqual(restored.messages[0].content, "Dim the kitchen")
        self.assertEqual(restored.codex_session_id, "codex-session")
        self.assertEqual(restored.status, "running")

    def test_session_summary_excludes_messages_and_reports_message_state(self):
        session = CodexSession(
            id="summary-session",
            title="Needs direction",
            messages=[
                ChatMessage(role="user", content="choose one"),
                ChatMessage(
                    role="assistant",
                    content=(
                        "<ha_codex_question>{"
                        '"question":"Pick a mode",'
                        '"choices":['
                        '{"label":"A","description":"first"},'
                        '{"label":"B","description":"second"},'
                        '{"label":"C","description":"third"}'
                        "]}</ha_codex_question>"
                    ),
                ),
            ],
            status="idle",
        )
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )

        summary = manager._session_summary(session)

        self.assertNotIn("messages", summary)
        self.assertEqual(summary["last_message_id"], 2)
        self.assertTrue(summary["has_pending_question"])

    def test_session_summary_ignores_documented_question_protocol(self):
        session = CodexSession(
            id="summary-session",
            title="Documents protocol",
            messages=[
                ChatMessage(role="user", content="document the protocol"),
                ChatMessage(
                    role="assistant",
                    content=(
                        "Added docs.\n\n"
                        "```diff\n"
                        "+<ha_codex_question>\n"
                        '+{"question":"Pick a mode","choices":['
                        '{"label":"A","description":"first"},'
                        '{"label":"B","description":"second"},'
                        '{"label":"C","description":"third"}]}\n'
                        "+</ha_codex_question>\n"
                        "```"
                    ),
                    metadata={"kind": "run_finished"},
                ),
            ],
            status="idle",
        )
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )

        summary = manager._session_summary(session)

        self.assertFalse(summary["has_pending_question"])


class RuntimeSettingsTests(unittest.TestCase):
    def test_settings_defaults_update_validation_and_round_trip(self):
        settings = default_settings()

        self.assertEqual(settings["defaults"]["mode"], "auto")
        self.assertEqual(settings["defaults"]["model_preset_id"], "gpt_5_5")
        self.assertEqual(settings["model_presets"][0]["model"], "gpt-5.5")
        self.assertEqual(settings["model_presets"][5]["model"], "gpt-5.2")
        self.assertEqual(settings["context_budget_chars"], 40_000)

        updated = update_settings(
            settings,
            {
                "defaults": {"reasoning_effort": "high", "model_preset_id": "gpt5"},
                "model_presets": [
                    {"id": "gpt5", "label": "GPT-5 Codex", "model": "gpt-5-codex"},
                ],
                "context_budget_chars": 60_000,
            },
        )

        self.assertEqual(updated["defaults"]["reasoning_effort"], "high")
        self.assertEqual(updated["defaults"]["model_preset_id"], "gpt5")
        self.assertEqual(updated["context_budget_chars"], 60_000)
        migrated = update_settings(
            {
                "defaults": {"model_preset_id": "codex_default"},
                "model_presets": [
                    {"id": "codex_default", "label": "Codex default", "model": None},
                    {"id": "custom", "label": "Custom", "model": "custom-model"},
                ],
            },
            {},
        )
        self.assertEqual(migrated["defaults"]["model_preset_id"], "gpt_5_5")
        self.assertNotIn("codex_default", {preset["id"] for preset in migrated["model_presets"]})
        self.assertIn("custom", {preset["id"] for preset in migrated["model_presets"]})
        with self.assertRaisesRegex(ValueError, "reasoning_effort"):
            update_settings(settings, {"defaults": {"reasoning_effort": "huge"}})

    def test_resolve_run_settings_infers_read_only_modifying_and_risky_prompts(self):
        defaults = default_settings()["defaults"]

        read_only = resolve_run_settings("Explain configuration.yaml", [], defaults, None)
        self.assertEqual(read_only["resolved"]["reasoning_effort"], "low")
        self.assertEqual(read_only["resolved"]["plan_mode"], "off")
        self.assertEqual(read_only["resolved"]["validation_depth"], "none")

        risky = resolve_run_settings("Update configuration.yaml", [], defaults, None)
        self.assertTrue(risky["risky"])
        self.assertEqual(risky["resolved"]["reasoning_effort"], "high")
        self.assertEqual(risky["resolved"]["plan_mode"], "always")
        self.assertEqual(risky["resolved"]["validation_depth"], "full")

        manual = resolve_run_settings(
            "Update configuration.yaml",
            [],
            defaults,
            {"mode": "manual", "reasoning_effort": "minimal", "plan_mode": "off"},
        )
        self.assertEqual(manual["resolved"]["reasoning_effort"], "minimal")
        self.assertEqual(manual["resolved"]["plan_mode"], "off")
        self.assertEqual(manual["resolved"]["validation_depth"], "full")

    def test_read_only_approval_classifier_is_conservative(self):
        self.assertTrue(is_safe_read_only_command("rg -n kitchen configuration.yaml"))
        self.assertTrue(is_safe_read_only_command("git status --short"))
        self.assertTrue(is_safe_read_only_command("git diff -- configuration.yaml"))
        self.assertTrue(is_safe_read_only_command("ha core check"))
        self.assertTrue(is_safe_read_only_command("sed -n '1,40p' configuration.yaml"))

        self.assertFalse(is_safe_read_only_command("sed -i 's/a/b/' configuration.yaml"))
        self.assertFalse(is_safe_read_only_command("find . -delete"))
        self.assertFalse(is_safe_read_only_command("cat configuration.yaml | sh"))
        self.assertFalse(is_safe_read_only_command("ls > out.txt"))
        self.assertFalse(is_safe_read_only_command("ha core restart"))


class RuntimeSettingsManagerTests(unittest.IsolatedAsyncioTestCase):
    async def test_manager_persists_settings_and_session_run_settings(self):
        store = _MemoryStore(
            {
                "sessions": {"session-1": CodexSession(id="session-1").to_dict()},
                "settings": {
                    "defaults": {"reasoning_effort": "medium"},
                    "model_presets": [
                        {"id": "gpt_5_5", "label": "GPT-5.5", "model": "gpt-5.5"},
                    ],
                    "context_budget_chars": 50_000,
                },
            }
        )
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=store,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.async_probe = _async_empty_dict

        await manager.async_load()
        self.assertEqual(manager.settings["context_budget_chars"], 50_000)
        session = await manager.async_update_session_run_settings(
            "session-1",
            {"mode": "manual", "reasoning_effort": "high"},
        )

        self.assertEqual(session.metadata["run_settings"]["reasoning_effort"], "high")
        self.assertEqual(
            store.data["sessions"]["session-1"]["metadata"]["run_settings"]["mode"], "manual"
        )
        self.assertEqual(store.data["settings"]["context_budget_chars"], 50_000)

    async def test_plan_mode_off_skips_risky_run_plan(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _FakeRunner([NormalizedEvent("run_finished")])
        manager.async_save = _async_noop
        manager.async_validate = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(id="session-1")
        manager.sessions[session.id] = session

        await manager.async_send(
            session.id,
            "Update configuration.yaml",
            run_settings={"mode": "manual", "plan_mode": "off", "validation_depth": "none"},
        )
        await manager.tasks[session.id]

        self.assertEqual(session.status, "idle")
        self.assertNotIn("pending_plan", session.metadata)
        self.assertEqual(len(manager.runner.calls), 1)

    async def test_validation_depth_controls_post_run_validation(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _FakeRunner([NormalizedEvent("run_finished")])
        manager.async_save = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(id="session-1")
        manager.sessions[session.id] = session
        validations = []

        async def validate(session_id=None, changed_files=None):
            validations.append((session_id, changed_files))
            return ValidationResult(status="passed")

        manager.async_validate = validate
        await manager.async_send(
            session.id,
            "List configuration.yaml",
            run_settings={"mode": "manual", "plan_mode": "off", "validation_depth": "none"},
        )
        await manager.tasks[session.id]
        self.assertEqual(validations, [])

        manager.runner = _FakeRunner([NormalizedEvent("run_finished")])
        await manager.async_send(
            session.id,
            "Update configuration.yaml",
            run_settings={"mode": "manual", "plan_mode": "off", "validation_depth": "full"},
        )
        await manager.tasks[session.id]
        self.assertEqual(validations[-1][0], "session-1")

    async def test_auto_readonly_approval_completes_without_waiting_for_user(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.async_save = _async_noop
        session = CodexSession(id="session-1", status="running")
        manager.sessions[session.id] = session
        manager.active_run_settings[session.id] = {"approval_mode": "auto_readonly"}

        approved = await manager._async_wait_for_approval(
            session.id,
            "approval-1",
            "rg -n kitchen configuration.yaml",
            "/homeassistant",
        )

        self.assertTrue(approved)
        self.assertEqual(session.approvals[0].status, "approved")
        self.assertNotIn("approval-1", manager.approval_waiters)


class ValidationLabTests(unittest.TestCase):
    def test_failed_validation_recommends_fixing_errors_before_restart_or_reload(self):
        validation = ValidationResult(
            status="failed",
            command=["ha", "core", "check"],
            returncode=1,
            stderr="Invalid config",
        )

        summary = build_validation_summary(
            validation,
            [{"status": "modified", "path": "configuration.yaml"}],
            session_id="session-1",
            session_title="Kitchen lights",
        )

        self.assertEqual(summary["recommendation"], "fix_validation_errors")
        self.assertEqual(summary["label"], "Fix validation errors first")
        self.assertEqual(summary["session_id"], "session-1")
        self.assertEqual(summary["session_title"], "Kitchen lights")

    def test_reloadable_domains_recommend_reload_when_validation_passes(self):
        validation = ValidationResult(
            status="passed", command=["ha", "core", "check"], returncode=0
        )

        summary = build_validation_summary(
            validation,
            [
                {"status": "modified", "path": "automations.yaml"},
                {"status": "modified", "path": "scripts/kitchen.yaml"},
                {"status": "modified", "path": "themes/night.yaml"},
            ],
        )

        self.assertEqual(summary["recommendation"], "reload_may_be_enough")
        self.assertEqual(summary["label"], "Reload may be enough")
        self.assertEqual(summary["reload_domains"], ["automations", "scripts", "themes"])
        self.assertEqual(
            [domain["id"] for domain in summary["affected_domains"]],
            ["automations", "scripts", "themes"],
        )
        self.assertEqual(reload_service_for_domain("themes"), ("frontend", "reload_themes"))

    def test_restart_domains_recommend_restart_when_validation_passes(self):
        validation = ValidationResult(
            status="passed", command=["ha", "core", "check"], returncode=0
        )

        summary = build_validation_summary(
            validation,
            [
                {"status": "modified", "path": "custom_components/ha_codex/websocket.py"},
                {"status": "modified", "path": "custom_components/ha_codex/frontend/panel.js"},
            ],
        )

        domain_ids = [domain["id"] for domain in summary["affected_domains"]]
        self.assertEqual(summary["recommendation"], "restart_required")
        self.assertEqual(summary["label"], "Restart required")
        self.assertEqual(summary["restart_required"], True)
        self.assertIn("custom_components", domain_ids)
        self.assertIn("ha_codex_frontend", domain_ids)

    def test_no_relevant_changes_need_no_action_after_passed_validation(self):
        validation = ValidationResult(
            status="passed", command=["ha", "core", "check"], returncode=0
        )

        summary = build_validation_summary(
            validation,
            [{"status": "modified", "path": "notes/runbook.md"}],
        )

        self.assertEqual(summary["recommendation"], "no_action_needed")
        self.assertEqual(summary["label"], "No action needed")
        self.assertEqual(summary["reload_domains"], [])


class ValidationLabManagerTests(unittest.IsolatedAsyncioTestCase):
    async def test_session_validation_attaches_summary_message(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            session = CodexSession(id="session-1", title="Automation tweak")
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=["python3", "-c", "print('ok')"],
            )
            manager.async_save = _async_noop
            manager.sessions[session.id] = session
            manager.file_change_baselines[session.id] = {}
            (root / "automations.yaml").write_text("- id: test\n", encoding="utf-8")

            result = await manager.async_validate(session.id)

        self.assertEqual(result.summary["recommendation"], "reload_may_be_enough")
        self.assertEqual(session.validation.summary["reload_domains"], ["automations"])
        self.assertEqual(session.messages[-1].metadata["kind"], "validation_summary")
        self.assertEqual(
            session.messages[-1].metadata["validation"]["summary"]["label"], "Reload may be enough"
        )


class SessionTitleTests(unittest.TestCase):
    def test_summarizes_default_title_from_prompt(self):
        title = summarize_prompt_title(
            "use summarized titles for the chats instead of using the full prompt by default"
        )

        self.assertEqual(title, "Summarized Titles For Chats")

    def test_summarized_title_uses_first_meaningful_words(self):
        title = summarize_prompt_title(
            "Can you update the HA Codex bridge restart approval flow so it is easier to review?"
        )

        self.assertEqual(title, "HA Codex Bridge Restart Approval Flow")


class SessionRunTests(unittest.IsolatedAsyncioTestCase):
    async def test_send_stores_raw_prompt_and_runs_with_backend_composed_context(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / "configuration.yaml").write_text(
                "homeassistant:\n  name: Real Home\n",
                encoding="utf-8",
            )
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )
            manager.runner = _FakeRunner([NormalizedEvent("run_finished")])
            manager.async_save = _async_noop
            manager.async_validate = _async_noop
            manager._maybe_request_restart_approval = _async_noop
            session = CodexSession(id="session-1")
            manager.sessions[session.id] = session

            await manager.async_send(
                session.id,
                "Inspect the kitchen lights",
                context=[
                    {
                        "id": "configuration.yaml",
                        "kind": "config_file",
                        "label": "configuration.yaml",
                        "payload": {
                            "path": "configuration.yaml",
                            "content": "client supplied content must not be trusted",
                        },
                    }
                ],
            )
            await manager.tasks[session.id]

        self.assertEqual(session.messages[0].role, "user")
        self.assertEqual(session.messages[0].content, "Inspect the kitchen lights")
        self.assertNotIn("_context_prompt", session.messages[0].metadata)
        self.assertEqual(session.title, "Inspect Kitchen Lights")
        self.assertEqual(
            session.messages[0].metadata["context"],
            [
                {
                    "id": "configuration.yaml",
                    "kind": "config_file",
                    "label": "configuration.yaml",
                    "subtitle": "configuration.yaml",
                }
            ],
        )
        run_prompt = manager.runner.calls[0][0]
        self.assertRegex(run_prompt, r"^HA Codex context\n")
        self.assertIn('"content": "homeassistant:\\n  name: Real Home\\n"', run_prompt)
        self.assertNotIn("client supplied content must not be trusted", run_prompt)
        self.assertIn("User request:\nInspect the kitchen lights", run_prompt)

    async def test_context_prompt_composition_is_bounded(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )

        attachments, serialized = manager._prepare_context_attachments(
            [
                {
                    "id": "entity.sensor_big",
                    "kind": "entity",
                    "label": "Big sensor",
                    "payload": {"blob": "x" * 100_000},
                }
            ]
        )
        prompt = manager._compose_prompt_with_context("Inspect the sensor", serialized)

        self.assertEqual(attachments[0]["label"], "Big sensor")
        self.assertLessEqual(len(prompt), 40_000)
        self.assertIn("[context truncated]", prompt)
        self.assertIn("User request:\nInspect the sensor", prompt)

    async def test_steer_stores_raw_prompt_and_preserves_context_for_follow_up_run(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _FakeRunner([NormalizedEvent("run_finished")])
        manager.async_save = _async_noop
        manager.async_validate = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(id="session-1", status="running")
        manager.sessions[session.id] = session
        active_task = asyncio.create_task(asyncio.sleep(60))
        manager.tasks[session.id] = active_task

        await manager.async_steer(
            session.id,
            "Use the kitchen entity",
            context=[
                {
                    "id": "light.kitchen",
                    "kind": "entity",
                    "label": "Kitchen Light",
                    "subtitle": "light.kitchen - state on",
                    "payload": {"entity_id": "light.kitchen", "state": "on"},
                }
            ],
        )
        active_task.cancel()
        session.status = "idle"
        manager.tasks.pop(session.id, None)
        await manager._async_start_pending_steer(session.id)
        await manager.tasks[session.id]

        self.assertEqual(session.messages[0].content, "Use the kitchen entity")
        self.assertEqual(session.messages[0].metadata["context"][0]["label"], "Kitchen Light")
        self.assertNotIn("_context_prompt", session.messages[0].metadata)
        run_prompt = manager.runner.calls[0][0]
        self.assertIn("HA Codex context", run_prompt)
        self.assertIn("Kitchen Light", run_prompt)
        self.assertIn("User request:\nUse the kitchen entity", run_prompt)

    async def test_builder_send_stores_readable_message_and_hidden_run_prompt(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _SequencedRunner(
            [[NormalizedEvent("message", text="Plan:\n- Files: automations.yaml")]]
        )
        manager.async_save = _async_noop
        session = CodexSession(id="session-1")
        manager.sessions[session.id] = session

        await manager.async_send(
            session.id,
            "Create automation: Turn on kitchen lights on motion.",
            run_prompt=(
                "Create a Home Assistant automation from these structured inputs.\n\n"
                "Builder inputs:\n- Goal: Turn on kitchen lights on motion."
            ),
            metadata={
                "builder": {
                    "template_id": "create_automation",
                    "template_label": "Create automation",
                    "selections": [{"label": "Goal", "value": "Turn on kitchen lights on motion."}],
                }
            },
        )
        await manager.tasks[session.id]

        self.assertEqual(
            session.messages[0].content,
            "Create automation: Turn on kitchen lights on motion.",
        )
        self.assertEqual(
            session.messages[0].metadata["builder"]["template_id"],
            "create_automation",
        )
        self.assertIn(
            "Create a Home Assistant automation",
            session.metadata["pending_plan"]["run_prompt"],
        )
        self.assertIn("Investigate the following HA Codex request", manager.runner.calls[0][0])
        self.assertIn("What you inspected", manager.runner.calls[0][0])

    async def test_modifying_send_requests_run_plan_before_execution(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _SequencedRunner(
            [[NormalizedEvent("message", text="Plan:\n- Files: configuration.yaml")]]
        )
        manager.async_save = _async_noop
        session = CodexSession(id="session-1")
        manager.sessions[session.id] = session

        await manager.async_send(session.id, "Update configuration.yaml")
        await manager.tasks[session.id]

        self.assertEqual(session.status, "waiting_plan_approval")
        self.assertEqual(session.messages[0].content, "Update configuration.yaml")
        self.assertEqual(session.messages[1].metadata["kind"], "run_plan")
        self.assertEqual(session.metadata["pending_plan"]["status"], "pending")
        self.assertEqual(len(manager.runner.calls), 1)
        self.assertIn("Investigate the following HA Codex request", manager.runner.calls[0][0])
        self.assertIn("What you inspected", manager.runner.calls[0][0])

    async def test_plan_approval_creates_checkpoint_and_executes_original_prompt(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            manager = _make_manager(root)
            manager.runner = _SequencedRunner(
                [
                    [NormalizedEvent("message", text="Plan:\n- Files: configuration.yaml")],
                    [NormalizedEvent("run_finished")],
                ]
            )
            manager.async_save = _async_noop
            manager.async_validate = _async_noop
            manager._maybe_request_restart_approval = _async_noop
            session = CodexSession(id="session-1")
            manager.sessions[session.id] = session

            await manager.async_send(session.id, "Update configuration.yaml")
            await manager.tasks[session.id]
            plan_id = session.metadata["pending_plan"]["id"]
            await manager.async_respond_run_plan(session.id, plan_id, "approve")
            await manager.tasks[session.id]

        self.assertEqual(session.status, "idle")
        self.assertEqual(session.metadata["run_plans"][0]["status"], "approved")
        self.assertEqual(len(session.metadata["rollback_checkpoints"]), 1)
        self.assertEqual(len(manager.runner.calls), 2)
        self.assertIn("Execute the approved run plan", manager.runner.calls[1][0])
        self.assertIn("Update configuration.yaml", manager.runner.calls[1][0])

    async def test_run_plan_question_waits_for_answer_before_approval(self):
        question = (
            "I need one decision.\n\n"
            "<ha_codex_question>"
            '{"question":"Which scope?","choices":['
            '{"label":"Minimal","description":"Change only the requested file."},'
            '{"label":"Broad","description":"Include adjacent cleanup."},'
            '{"label":"Cancel","description":"Stop planning."}'
            '],"custom_placeholder":"Describe the scope..."}'
            "</ha_codex_question>"
        )
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _SequencedRunner(
            [
                [NormalizedEvent("message", text=question)],
                [NormalizedEvent("message", text="Plan:\n- Files: configuration.yaml")],
            ]
        )
        manager.async_save = _async_noop
        session = CodexSession(id="session-1")
        manager.sessions[session.id] = session

        await manager.async_send(session.id, "Update configuration.yaml")
        await manager.tasks[session.id]

        plan = session.metadata["pending_plan"]
        self.assertEqual(session.status, "waiting_question")
        self.assertEqual(plan["status"], "needs_answer")
        with self.assertRaisesRegex(ValueError, "not awaiting review"):
            await manager.async_respond_run_plan(session.id, plan["id"], "approve")

        await manager.async_send(session.id, "Answer to your question: Minimal")
        await manager.tasks[session.id]

        self.assertEqual(session.status, "waiting_plan_approval")
        self.assertEqual(session.metadata["pending_plan"]["status"], "pending")
        self.assertEqual(session.messages[2].role, "user")
        self.assertIn("Minimal", manager.runner.calls[1][0])
        self.assertIn("Previous planning response", manager.runner.calls[1][0])

    async def test_run_plan_question_does_not_publish_plan_before_answer(self):
        question_with_premature_plan = (
            "Plan:\n"
            "- What I inspected: configuration.yaml\n"
            "- Intended files/areas: configuration.yaml\n\n"
            "<ha_codex_question>"
            '{"question":"Which scope?","choices":['
            '{"label":"Minimal","description":"Change only the requested file."},'
            '{"label":"Broad","description":"Include adjacent cleanup."},'
            '{"label":"Cancel","description":"Stop planning."}'
            '],"custom_placeholder":"Describe the scope..."}'
            "</ha_codex_question>"
        )
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _SequencedRunner(
            [[NormalizedEvent("message", text=question_with_premature_plan)]]
        )
        manager.async_save = _async_noop
        session = CodexSession(id="session-1")
        manager.sessions[session.id] = session

        await manager.async_send(session.id, "Update configuration.yaml")
        await manager.tasks[session.id]

        plan = session.metadata["pending_plan"]
        self.assertEqual(session.status, "waiting_question")
        self.assertEqual(plan["status"], "needs_answer")
        self.assertNotIn("What I inspected", plan["content"])
        self.assertNotIn("Intended files/areas", session.messages[1].content)
        self.assertTrue(session.messages[1].content.startswith("<ha_codex_question>"))

    async def test_plan_cancel_records_outcome_without_executing(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _SequencedRunner(
            [[NormalizedEvent("message", text="Plan:\n- Files: configuration.yaml")]]
        )
        manager.async_save = _async_noop
        session = CodexSession(id="session-1")
        manager.sessions[session.id] = session

        await manager.async_send(session.id, "Update configuration.yaml")
        await manager.tasks[session.id]
        plan_id = session.metadata["pending_plan"]["id"]
        await manager.async_respond_run_plan(session.id, plan_id, "cancel")

        self.assertEqual(session.status, "idle")
        self.assertNotIn("pending_plan", session.metadata)
        self.assertEqual(session.metadata["run_plans"][0]["status"], "canceled")
        self.assertEqual(len(manager.runner.calls), 1)

    async def test_archiving_empty_session_deletes_it(self):
        hass = _FakeHass("/tmp")
        manager = CodexManager(
            hass,
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.async_save = _async_noop
        session = CodexSession(id="empty-session")
        manager.sessions[session.id] = session

        result = await manager.async_archive(session.id, True)

        self.assertIsNone(result)
        self.assertNotIn(session.id, manager.sessions)
        self.assertEqual(hass.bus.events[-1][0], "ha_codex/session_deleted")
        self.assertEqual(hass.bus.events[-1][1], {"deleted_session_id": session.id})

    async def test_archiving_non_empty_session_keeps_archived_session(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.async_save = _async_noop
        session = CodexSession(
            id="non-empty-session",
            messages=[ChatMessage(role="user", content="do the thing")],
        )
        manager.sessions[session.id] = session

        result = await manager.async_archive(session.id, True)

        self.assertIs(result, session)
        self.assertIn(session.id, manager.sessions)
        self.assertIsNotNone(session.archived_at)

    async def test_run_finished_text_is_not_hidden_as_duplicate_completion(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _FakeRunner(
            [
                NormalizedEvent("run_finished", text="First thinking update"),
                NormalizedEvent("run_finished", text="Second thinking update"),
                NormalizedEvent("run_finished"),
                NormalizedEvent("run_finished"),
            ]
        )
        manager.async_save = _async_noop
        manager.async_validate = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(id="session-1", status="running")
        manager.sessions[session.id] = session

        await manager._async_run_session(session.id, "prompt")

        self.assertEqual(
            [message.content for message in session.messages],
            [
                "First thinking update",
                "Second thinking update",
                "Codex finished this run.",
            ],
        )

    async def test_run_events_use_message_ids_without_full_session_messages(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _FakeRunner(
            [
                NormalizedEvent("message_delta", text="Hello"),
                NormalizedEvent("run_finished"),
            ]
        )
        manager.async_save = _async_noop
        manager.async_validate = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(id="session-1", status="running")
        manager.sessions[session.id] = session

        await manager._async_run_session(session.id, "prompt")

        delta_events = [
            data
            for event_type, data in manager.hass.bus.events
            if event_type == "ha_codex/message_delta"
        ]
        appended_events = [
            data
            for event_type, data in manager.hass.bus.events
            if event_type == "ha_codex/message_appended"
        ]
        run_finished_events = [
            data
            for event_type, data in manager.hass.bus.events
            if event_type == "ha_codex/run_finished"
        ]
        self.assertEqual(delta_events[0]["message_id"], 1)
        self.assertEqual(appended_events[-1]["message"]["id"], 2)
        self.assertNotIn("messages", run_finished_events[-1]["session"])

    async def test_empty_error_event_records_fallback_message(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _FakeRunner([NormalizedEvent("error", raw={"type": "error"})])
        manager.async_save = _async_noop
        manager.async_validate = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(id="session-1", status="running")
        manager.sessions[session.id] = session

        await manager._async_run_session(session.id, "prompt")

        self.assertEqual(session.status, "error")
        self.assertEqual(
            session.messages[0].content,
            "Codex reported an error without additional details. Event type: error.",
        )

    async def test_command_event_is_persisted_as_markdown_code_block(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _FakeRunner([NormalizedEvent("action", command="ls -la /config")])
        manager.async_save = _async_noop
        manager.async_validate = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(id="session-1", status="running")
        manager.sessions[session.id] = session

        await manager._async_run_session(session.id, "prompt")

        self.assertEqual(session.messages[0].content, "```\nls -la /config\n```")
        self.assertEqual(session.messages[0].metadata["command"], "ls -la /config")

    async def test_run_appends_filesystem_file_change_summary(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            tracked = root / "configuration.yaml"
            tracked.write_text("before\n", encoding="utf-8")
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )
            manager.file_change_baselines["session-1"] = manager._workspace_file_snapshot()
            tracked.write_text("after\n", encoding="utf-8")
            session = CodexSession(id="session-1", status="running")
            manager.sessions[session.id] = session

            await manager._async_append_file_change_summary(session.id)

        self.assertEqual(session.messages[0].metadata["kind"], "action")
        self.assertEqual(
            session.messages[0].metadata["file_changes"],
            [{"status": "modified", "path": "configuration.yaml"}],
        )
        self.assertIn("- modified `configuration.yaml`", session.messages[0].content)

    async def test_run_omits_generated_panel_bundle_from_file_change_summary(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            bundle = root / "custom_components" / "ha_codex" / "frontend" / "panel.js"
            source = root / "frontend" / "src" / "App.tsx"
            bundle.parent.mkdir(parents=True)
            source.parent.mkdir(parents=True)
            bundle.write_text("before\n", encoding="utf-8")
            source.write_text("before\n", encoding="utf-8")
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )
            manager.file_change_baselines["session-1"] = manager._workspace_file_snapshot()
            bundle.write_text("after\n", encoding="utf-8")
            source.write_text("after\n", encoding="utf-8")
            session = CodexSession(id="session-1", status="running")
            manager.sessions[session.id] = session

            await manager._async_append_file_change_summary(session.id)

        self.assertEqual(
            session.messages[0].metadata["file_changes"],
            [{"status": "modified", "path": "frontend/src/App.tsx"}],
        )

    async def test_messages_after_returns_stable_message_ids(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        session = CodexSession(
            id="session-1",
            messages=[
                ChatMessage(role="user", content="first"),
                ChatMessage(role="assistant", content="second"),
                ChatMessage(role="user", content="third"),
            ],
        )
        manager.sessions[session.id] = session

        messages = manager.messages_after(session.id, 1)

        self.assertEqual(
            [(message["id"], message["content"]) for message in messages],
            [(2, "second"), (3, "third")],
        )

    async def test_messages_after_limit_returns_newest_matching_messages(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        session = CodexSession(
            id="session-1",
            messages=[
                ChatMessage(role="user", content="first"),
                ChatMessage(role="assistant", content="second"),
                ChatMessage(role="user", content="third"),
                ChatMessage(role="assistant", content="fourth"),
            ],
        )
        manager.sessions[session.id] = session

        messages = manager.messages_after(session.id, 0, 2)

        self.assertEqual(
            [(message["id"], message["content"]) for message in messages],
            [(3, "third"), (4, "fourth")],
        )

    async def test_steer_during_pending_restart_starts_follow_up_run(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _FakeRunner([NormalizedEvent("run_finished")])
        manager.async_save = _async_noop
        manager.async_validate = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(
            id="session-1",
            status="waiting_approval",
            approvals=[
                PendingApproval(
                    id="approval-1",
                    session_id="session-1",
                    command="ha core restart",
                    reason="restart_required: changed integration code",
                )
            ],
        )
        manager.sessions[session.id] = session

        await manager.async_steer(session.id, " follow up after restart prompt ")
        task = manager.tasks[session.id]
        await task

        self.assertEqual(session.approvals[0].status, "skipped")
        self.assertEqual(session.messages[1].content, "follow up after restart prompt")
        self.assertEqual(session.messages[1].metadata, {})
        self.assertEqual(manager.runner.calls[0][0], "follow up after restart prompt")

    async def test_pending_steer_suppresses_restart_approval(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.async_save = _async_noop
        manager.restart_baselines["session-1"] = {"watched.py": (1, 1)}
        manager._restart_watch_snapshot = lambda: {"watched.py": (2, 1)}
        session = CodexSession(
            id="session-1",
            status="idle",
            messages=[
                ChatMessage(
                    role="user",
                    content="next request",
                    metadata={"kind": "steer", "steer_status": "pending"},
                )
            ],
        )
        manager.sessions[session.id] = session

        await manager._maybe_request_restart_approval(session.id)

        self.assertEqual(session.approvals, [])
        self.assertEqual(session.status, "idle")

    async def test_restart_approval_is_global_toast_state_not_chat_waiting(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.async_save = _async_noop
        manager.restart_baselines["session-1"] = {"watched.py": (1, 1)}
        manager._restart_watch_snapshot = lambda: {"watched.py": (2, 1)}
        session = CodexSession(id="session-1", status="idle")
        manager.sessions[session.id] = session

        await manager._maybe_request_restart_approval(session.id)

        self.assertEqual(session.status, "idle")
        self.assertEqual(session.messages, [])
        self.assertEqual(len(session.approvals), 1)
        self.assertEqual(session.approvals[0].command, "ha core restart")
        self.assertEqual(
            manager._session_summary(session)["pending_approvals"],
            0,
        )

    async def test_restart_approval_tracks_each_chat_that_needs_restart(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.async_save = _async_noop
        manager.restart_baselines["session-1"] = {"watched.py": (1, 1)}
        manager.restart_baselines["session-2"] = {"watched.py": (1, 1)}
        manager._restart_watch_snapshot = lambda: {"watched.py": (2, 1)}
        first = CodexSession(id="session-1", title="Integration edits")
        second = CodexSession(id="session-2", title="Panel edits")
        manager.sessions[first.id] = first
        manager.sessions[second.id] = second

        await manager._maybe_request_restart_approval(first.id)
        await manager._maybe_request_restart_approval(second.id)

        self.assertEqual(len(first.approvals), 1)
        self.assertEqual(len(second.approvals), 1)
        self.assertEqual(first.status, "idle")
        self.assertEqual(second.status, "idle")

    async def test_restart_approval_response_clears_all_pending_restarts(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.async_save = _async_noop
        first = CodexSession(
            id="session-1",
            status="waiting_approval",
            approvals=[
                PendingApproval(
                    id="restart-1",
                    session_id="session-1",
                    command="ha core restart",
                    reason="restart_required: changed integration code",
                )
            ],
        )
        second = CodexSession(
            id="session-2",
            status="idle",
            approvals=[
                PendingApproval(
                    id="restart-2",
                    session_id="session-2",
                    command="ha core restart",
                    reason="restart_required: changed frontend code",
                )
            ],
        )
        manager.sessions[first.id] = first
        manager.sessions[second.id] = second

        await manager.async_respond_approval(first.id, "restart-1", False)

        self.assertEqual(first.approvals[0].status, "rejected")
        self.assertEqual(second.approvals[0].status, "rejected")
        self.assertEqual(first.status, "idle")
        self.assertEqual(second.status, "idle")
        self.assertEqual(manager.hass.services.calls, [])

    async def test_restart_approval_builds_frontend_before_restart(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            frontend = root / "frontend"
            frontend.mkdir(parents=True)
            (frontend / "package.json").write_text("{}", encoding="utf-8")
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )
            manager.async_save = _async_noop
            commands = []

            async def _fake_run_command(command, *, cwd, timeout, ok_returncodes=None):
                commands.append((command, cwd, timeout, ok_returncodes))
                return {"ok": True, "returncode": 0, "stdout": "built", "stderr": ""}

            manager._run_command = _fake_run_command
            session = CodexSession(
                id="session-1",
                status="waiting_approval",
                approvals=[
                    PendingApproval(
                        id="restart-1",
                        session_id="session-1",
                        command="ha core restart",
                        reason="restart_required: changed frontend code",
                    )
                ],
            )
            manager.sessions[session.id] = session

            await manager.async_respond_approval(session.id, "restart-1", True)

            self.assertEqual(commands, [(["npm", "run", "build"], str(frontend), 180, None)])
            self.assertEqual(session.approvals[0].status, "approved")
            self.assertEqual(
                manager.hass.services.calls,
                [("homeassistant", "restart", {}, False)],
            )

    async def test_restart_approval_blocks_restart_when_frontend_build_fails(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            frontend = root / "frontend"
            frontend.mkdir(parents=True)
            (frontend / "package.json").write_text("{}", encoding="utf-8")
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )
            manager.async_save = _async_noop

            async def _fake_run_command(command, *, cwd, timeout, ok_returncodes=None):
                return {
                    "ok": False,
                    "returncode": 1,
                    "stdout": "",
                    "stderr": "TypeScript error",
                }

            manager._run_command = _fake_run_command
            session = CodexSession(
                id="session-1",
                status="waiting_approval",
                approvals=[
                    PendingApproval(
                        id="restart-1",
                        session_id="session-1",
                        command="ha core restart",
                        reason="restart_required: changed frontend code",
                    )
                ],
            )
            manager.sessions[session.id] = session

            with self.assertRaisesRegex(RuntimeError, "npm run build failed"):
                await manager.async_respond_approval(session.id, "restart-1", True)

            self.assertEqual(session.approvals[0].status, "pending")
            self.assertEqual(manager.hass.services.calls, [])
            self.assertEqual(session.messages[-1].metadata["kind"], "restart_build_failed")
            self.assertIn("TypeScript error", session.messages[-1].content)

    async def test_send_defers_pending_restart_approval(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runner = _FakeRunner([NormalizedEvent("run_finished")])
        manager.async_save = _async_noop
        manager.async_validate = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(
            id="session-1",
            status="waiting_approval",
            approvals=[
                PendingApproval(
                    id="approval-1",
                    session_id="session-1",
                    command="ha core restart",
                    reason="restart_required: changed integration code",
                )
            ],
        )
        manager.sessions[session.id] = session

        await manager.async_send(session.id, "next queued message")
        await manager.tasks[session.id]

        self.assertEqual(session.approvals[0].status, "skipped")
        self.assertEqual(
            session.messages[0].content,
            "Home Assistant Core restart deferred because another user message was queued.",
        )
        self.assertEqual(session.messages[1].content, "next queued message")
        self.assertEqual(manager.runner.calls[0][0], "next queued message")


class GitCommandTests(unittest.TestCase):
    def test_git_command_uses_home_assistant_config_git_metadata(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / ".git-real").mkdir()
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path="/homeassistant",
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )

            command = manager._git_command(["status", "--short"])

        self.assertEqual(
            command,
            [
                "git",
                f"--git-dir={root / '.git-real'}",
                f"--work-tree={root}",
                "status",
                "--short",
            ],
        )

    def test_display_path_diff_resolves_under_config(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / ".git-real").mkdir()
            target = root / "zigbee2mqtt" / "state.json"
            target.parent.mkdir()
            target.write_text("{}\n", encoding="utf-8")
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )

            diff_path = manager._worktree_file_for_diff("zigbee2mqtt/state.json")

        self.assertEqual(diff_path, target)

    def test_display_git_files_handles_homeassistant_path_without_old_path(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )

            files = manager._display_git_files(
                [
                    {
                        "path": "homeassistant/configuration.yaml",
                        "old_path": None,
                        "code": " M",
                        "status": "modified",
                    }
                ]
            )

        self.assertEqual(files[0]["path"], "configuration.yaml")
        self.assertIsNone(files[0]["old_path"])


class GitReviewOperationTests(unittest.IsolatedAsyncioTestCase):
    async def test_commit_push_only_selected_files(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            tracked = root / "configuration.yaml"
            unselected = root / "custom_components" / "ha_codex" / "keep.py"
            tracked.write_text("homeassistant:\n  name: Selected\n", encoding="utf-8")
            unselected.write_text("VALUE = 2\n", encoding="utf-8")
            manager = _make_manager(root)

            result = await manager.async_git_commit_push(
                "commit selected file",
                [{"path": "configuration.yaml"}],
            )

            self.assertTrue(result["ok"], result)
            self.assertEqual(result["selected_paths"], ["configuration.yaml"])
            committed_paths = _git(
                root, "show", "--name-only", "--format=", "HEAD"
            ).stdout.splitlines()
            self.assertEqual(set(filter(None, committed_paths)), {"configuration.yaml"})
            self.assertEqual(
                _git(root, "status", "--short").stdout.strip(),
                "M custom_components/ha_codex/keep.py",
            )

    async def test_discard_selected_restores_tracked_and_removes_untracked_visible_files(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            tracked = root / "configuration.yaml"
            untracked = root / "custom_components" / "ha_codex" / "new.py"
            ignored = root / "secrets.yaml"
            tracked.write_text("homeassistant:\n  name: Discard me\n", encoding="utf-8")
            untracked.write_text("VALUE = 3\n", encoding="utf-8")
            ignored.write_text("token: keep\n", encoding="utf-8")
            manager = _make_manager(root)

            result = await manager.async_git_discard(
                [
                    {"path": "configuration.yaml"},
                    {"path": "custom_components/ha_codex/new.py"},
                ]
            )

            self.assertTrue(result["ok"], result)
            self.assertEqual(
                result["discarded_paths"],
                ["configuration.yaml", "custom_components/ha_codex/new.py"],
            )
            self.assertEqual(tracked.read_text(encoding="utf-8"), "homeassistant:\n  name: Base\n")
            self.assertFalse(untracked.exists())
            self.assertTrue(ignored.exists())
            self.assertEqual(_git(root, "status", "--short").stdout.strip(), "?? secrets.yaml")

    async def test_discard_rejects_unsafe_or_ignored_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            (root / "secrets.yaml").write_text("token: keep\n", encoding="utf-8")
            manager = _make_manager(root)

            with self.assertRaisesRegex(ValueError, "unsafe"):
                await manager.async_git_discard([{"path": "../outside.txt"}])
            with self.assertRaisesRegex(ValueError, "not reviewable"):
                await manager.async_git_discard([{"path": "secrets.yaml"}])


class RunCheckpointTests(unittest.IsolatedAsyncioTestCase):
    async def test_checkpoint_records_git_head_dirty_set_and_pre_run_snapshots(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            tracked = root / "configuration.yaml"
            untracked = root / "custom_components" / "ha_codex" / "draft.py"
            tracked.write_text("homeassistant:\n  name: Dirty before run\n", encoding="utf-8")
            untracked.write_text("VALUE = 'before'\n", encoding="utf-8")
            manager = _make_manager(root)
            manager.async_save = _async_noop
            session = CodexSession(id="session-1")
            manager.sessions[session.id] = session

            checkpoint = await manager._async_create_rollback_checkpoint(session.id, "run-1")

            self.assertEqual(
                checkpoint["head"],
                _git(root, "rev-parse", "HEAD").stdout.strip(),
            )
            self.assertEqual(
                checkpoint["dirty_files"],
                ["configuration.yaml", "custom_components/ha_codex/draft.py"],
            )
            self.assertEqual(
                checkpoint["snapshots"]["configuration.yaml"]["content"],
                "homeassistant:\n  name: Dirty before run\n",
            )
            self.assertEqual(
                checkpoint["snapshots"]["custom_components/ha_codex/draft.py"]["content"],
                "VALUE = 'before'\n",
            )

    async def test_rollback_restores_only_files_changed_by_the_run(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            tracked = root / "configuration.yaml"
            added = root / "custom_components" / "ha_codex" / "new.py"
            untouched_dirty = root / "custom_components" / "ha_codex" / "keep.py"
            untouched_dirty.write_text("VALUE = 99\n", encoding="utf-8")
            manager = _make_manager(root)
            manager.async_save = _async_noop
            session = CodexSession(id="session-1")
            manager.sessions[session.id] = session
            checkpoint = await manager._async_create_rollback_checkpoint(session.id, "run-1")
            tracked.write_text("homeassistant:\n  name: Changed by run\n", encoding="utf-8")
            added.write_text("VALUE = 'new'\n", encoding="utf-8")
            await manager._async_complete_rollback_checkpoint(
                session.id,
                checkpoint["id"],
                [
                    {"status": "modified", "path": "configuration.yaml"},
                    {"status": "added", "path": "custom_components/ha_codex/new.py"},
                ],
            )

            result = await manager.async_rollback_run(session.id, checkpoint["id"])

            self.assertTrue(result["ok"], result)
            self.assertEqual(tracked.read_text(encoding="utf-8"), "homeassistant:\n  name: Base\n")
            self.assertFalse(added.exists())
            self.assertEqual(untouched_dirty.read_text(encoding="utf-8"), "VALUE = 99\n")
            self.assertEqual(
                session.metadata["rollback_checkpoints"][0]["rollback_status"], "rolled_back"
            )

    async def test_rollback_refuses_when_target_changed_after_run_completion(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            tracked = root / "configuration.yaml"
            manager = _make_manager(root)
            manager.async_save = _async_noop
            session = CodexSession(id="session-1")
            manager.sessions[session.id] = session
            checkpoint = await manager._async_create_rollback_checkpoint(session.id, "run-1")
            tracked.write_text("homeassistant:\n  name: Changed by run\n", encoding="utf-8")
            await manager._async_complete_rollback_checkpoint(
                session.id,
                checkpoint["id"],
                [{"status": "modified", "path": "configuration.yaml"}],
            )
            tracked.write_text("homeassistant:\n  name: User edit after run\n", encoding="utf-8")

            result = await manager.async_rollback_run(session.id, checkpoint["id"])

            self.assertFalse(result["ok"])
            self.assertIn("changed after the run completed", result["reason"])
            self.assertEqual(
                tracked.read_text(encoding="utf-8"),
                "homeassistant:\n  name: User edit after run\n",
            )
            self.assertEqual(
                session.metadata["rollback_checkpoints"][0]["rollback_status"], "blocked"
            )


class BridgeLogTests(unittest.IsolatedAsyncioTestCase):
    async def test_status_includes_bridge_uptime_from_health(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url="http://127.0.0.1:8765",
            addon_write_scope=None,
            validation_command=None,
        )
        manager.runtime_status = {
            "runner_type": "bridge",
            "bridge_available": True,
            "bridge_url": "http://127.0.0.1:8765",
        }
        manager._async_bridge_health_status = _async_bridge_health_ok
        manager._async_usage_status = _async_usage_unavailable

        result = await manager.async_status()

        self.assertTrue(result["runtime"]["bridge_health"]["ok"])
        self.assertEqual(result["runtime"]["bridge_started_at"], 1_700_000_000)
        self.assertEqual(result["runtime"]["bridge_uptime_seconds"], 125)

    async def test_bridge_log_returns_tail_from_config_path(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "ha_codex_bridge.log").write_text(
                "first\nsecond\nthird\n",
                encoding="utf-8",
            )
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url="http://127.0.0.1:8765",
                addon_write_scope=None,
                validation_command=None,
            )

            result = await manager.async_bridge_log(lines=2)

        self.assertTrue(result["exists"])
        self.assertEqual(result["lines"], "second\nthird\n")
        self.assertEqual(result["line_count"], 2)
        self.assertTrue(result["truncated"])

    async def test_bridge_log_handles_missing_file(self):
        with TemporaryDirectory() as tmp:
            manager = CodexManager(
                _FakeHass(tmp),
                store=None,
                workspace_path=tmp,
                codex_command="codex",
                bridge_url="http://127.0.0.1:8765",
                addon_write_scope=None,
                validation_command=None,
            )

            result = await manager.async_bridge_log()

        self.assertFalse(result["exists"])
        self.assertEqual(result["lines"], "")


class ContextTests(unittest.IsolatedAsyncioTestCase):
    async def test_context_config_files_exclude_sensitive_and_noisy_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / "configuration.yaml").write_text("homeassistant:\n", encoding="utf-8")
            (root / "automations.yaml").write_text("[]\n", encoding="utf-8")
            (root / "secrets.yaml").write_text("token: secret\n", encoding="utf-8")
            (root / ".storage").mkdir()
            (root / ".storage" / "core.config_entries").write_text("{}", encoding="utf-8")
            (root / "home-assistant.log").write_text("log\n", encoding="utf-8")
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )

            result = await manager.async_context_config_files()

        paths = [item["path"] for item in result["files"]]
        self.assertEqual(paths, ["automations.yaml", "configuration.yaml"])

    async def test_context_config_file_preview_is_bounded_and_rejects_traversal(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            config_file = root / "configuration.yaml"
            config_file.write_text("x" * 120_000, encoding="utf-8")
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )

            result = await manager.async_context_config_file("configuration.yaml")

            with self.assertRaises(ValueError):
                await manager.async_context_config_file("../secrets.yaml")

        self.assertEqual(result["path"], "configuration.yaml")
        self.assertTrue(result["truncated"])
        self.assertLessEqual(len(result["content"]), 80_200)

    async def test_context_logs_return_bounded_home_assistant_and_bridge_tails(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / "home-assistant.log").write_text("one\ntwo\nthree\n", encoding="utf-8")
            (root / "ha_codex_bridge.log").write_text("alpha\nbeta\ngamma\n", encoding="utf-8")
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )

            result = await manager.async_context_logs(lines=2)

        logs = {item["id"]: item for item in result["logs"]}
        self.assertEqual(logs["home_assistant"]["lines"], "two\nthree\n")
        self.assertEqual(logs["ha_codex_bridge"]["lines"], "beta\ngamma\n")
        self.assertTrue(logs["home_assistant"]["truncated"])
        self.assertTrue(logs["ha_codex_bridge"]["truncated"])


class RestartWatchTests(unittest.TestCase):
    def test_restart_watch_roots_include_workspace_when_config_path_differs(self):
        with TemporaryDirectory() as config_tmp, TemporaryDirectory() as workspace_tmp:
            config_root = Path(config_tmp)
            workspace_root = Path(workspace_tmp)
            watched_file = workspace_root / "custom_components" / "ha_codex" / "manager.py"
            watched_file.parent.mkdir(parents=True)
            watched_file.write_text("# changed by codex\n", encoding="utf-8")
            manager = CodexManager(
                _FakeHass(config_root),
                store=None,
                workspace_path=str(workspace_root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )

            snapshot = manager._restart_watch_snapshot()

        self.assertIn(str(watched_file), snapshot)

    def test_restart_watch_roots_are_deduplicated(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )

            roots = manager._restart_watch_roots()

        self.assertEqual(len(roots), 3)


class RunnerCommandTests(unittest.TestCase):
    def test_builds_new_codex_exec_command_with_workspace_and_additional_paths(self):
        options = RunnerOptions(
            codex_command="codex",
            workspace_path="/homeassistant",
            writable_paths=["/addon_configs"],
        )

        command = build_codex_command(options, "Turn on validation", None)

        self.assertEqual(command[:4], ["codex", "exec", "--json", "-C"])
        self.assertIn("/homeassistant", command)
        self.assertIn("--add-dir", command)
        self.assertIn("/addon_configs", command)
        self.assertEqual(command[-1], "Turn on validation")

    def test_builds_resume_command_when_codex_session_exists(self):
        options = RunnerOptions(codex_command="codex", workspace_path="/homeassistant")

        command = build_codex_command(options, "Continue", "session-123")

        self.assertEqual(command[:3], ["codex", "exec", "resume"])
        self.assertIn("session-123", command)
        self.assertEqual(command[-1], "Continue")

    def test_builds_runtime_model_reasoning_and_verbosity_flags(self):
        options = RunnerOptions(codex_command="codex", workspace_path="/homeassistant")

        command = build_codex_command(
            options,
            "Tune runtime",
            None,
            run_settings={
                "model": "gpt-5-codex",
                "reasoning_effort": "high",
                "verbosity": "low",
            },
        )
        resume = build_codex_command(
            options,
            "Continue",
            "session-123",
            run_settings={
                "model": "gpt-5-codex",
                "reasoning_effort": "minimal",
                "verbosity": "high",
            },
        )

        self.assertIn("-m", command)
        self.assertIn("gpt-5-codex", command)
        self.assertIn('model_reasoning_effort="high"', command)
        self.assertIn('model_verbosity="low"', command)
        self.assertIn("-m", resume)
        self.assertIn('model_reasoning_effort="minimal"', resume)
        self.assertIn('model_verbosity="high"', resume)


class RunnerApprovalTests(unittest.IsolatedAsyncioTestCase):
    async def test_runner_calls_approval_handler_without_stdin_write(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            fake_codex = Path(tmp) / "fake-codex"
            fake_codex.write_text(
                "#!/usr/bin/env python3\n"
                "import json, sys\n"
                "print(json.dumps({'type':'exec_approval_request','id':'a1','command':'touch x'}), flush=True)\n"
                "decision = sys.stdin.readline().strip()\n"
                "print(json.dumps({'type':'agent_message_delta','delta':'decision:' + decision}), flush=True)\n",
                encoding="utf-8",
            )
            fake_codex.chmod(fake_codex.stat().st_mode | 0o111)
            options = RunnerOptions(codex_command=str(fake_codex), workspace_path=tmp)
            from custom_components.ha_codex.runner import CodexProcessRunner

            runner = CodexProcessRunner(options)
            events = []
            approvals = []

            async def approve(event):
                self.assertEqual(event.approval_id, "a1")
                approvals.append(event.approval_id)
                return True

            async for event in runner.run("prompt", None, approval_handler=approve):
                events.append(event)

        self.assertEqual(events[0].kind, "approval_required")
        self.assertEqual(events[1].text, "decision:")
        self.assertEqual(approvals, ["a1"])


def _git(root: Path, *args: str, check: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", "-C", str(root), *args],
        text=True,
        capture_output=True,
        check=check,
    )


def _create_git_repo(parent: Path) -> tuple[Path, Path]:
    root = parent / "repo"
    remote = parent / "remote.git"
    root.mkdir()
    subprocess.run(["git", "init", str(root)], text=True, capture_output=True, check=True)
    _git(root, "checkout", "-b", "main")
    _git(root, "config", "user.email", "ha-codex@example.test")
    _git(root, "config", "user.name", "HA Codex")
    (root / "custom_components" / "ha_codex").mkdir(parents=True)
    (root / "configuration.yaml").write_text("homeassistant:\n  name: Base\n", encoding="utf-8")
    (root / "custom_components" / "ha_codex" / "keep.py").write_text(
        "VALUE = 1\n", encoding="utf-8"
    )
    _git(root, "add", "configuration.yaml", "custom_components/ha_codex/keep.py")
    _git(root, "commit", "-m", "initial")
    subprocess.run(
        ["git", "init", "--bare", str(remote)], text=True, capture_output=True, check=True
    )
    _git(root, "remote", "add", "origin", str(remote))
    _git(root, "push", "-u", "origin", "main")
    return root, remote


def _make_manager(root: Path) -> CodexManager:
    return CodexManager(
        _FakeHass(root),
        store=None,
        workspace_path=str(root),
        codex_command="codex",
        bridge_url=None,
        addon_write_scope=None,
        validation_command=None,
    )


class _FakeConfig:
    def __init__(self, root):
        self.root = Path(root)

    def path(self, *parts):
        return str(self.root.joinpath(*parts))


class _FakeHass:
    def __init__(self, root):
        self.config = _FakeConfig(root)
        self.bus = _FakeBus()
        self.services = _FakeServices()
        try:
            self.loop = asyncio.get_running_loop()
        except RuntimeError:
            self.loop = _FakeLoop()

    def async_create_task(self, coro, _name=None):
        return asyncio.create_task(coro)

    async def async_add_executor_job(self, target, *args):
        return target(*args)


class _FakeBus:
    def __init__(self):
        self.events = []

    def async_fire(self, event_type, event_data=None, **_kwargs):
        self.events.append((event_type, event_data or {}))


class _FakeLoop:
    def call_later(self, _delay, callback, *args):
        callback(*args)
        return _FakeHandle()


class _FakeHandle:
    def cancel(self):
        return None


class _FakeServices:
    def __init__(self):
        self.calls = []

    async def async_call(self, domain, service, data, blocking=False):
        self.calls.append((domain, service, data, blocking))


class _MemoryStore:
    def __init__(self, data=None):
        self.data = data or {}

    async def async_load(self):
        return self.data

    async def async_save(self, data):
        self.data = data


class _FakeRunner:
    def __init__(self, events):
        self.events = events
        self.calls = []

    async def run(self, *args, **_kwargs):
        self.calls.append(args)
        for event in self.events:
            yield event


class _SequencedRunner:
    def __init__(self, event_batches):
        self.event_batches = list(event_batches)
        self.calls = []

    async def run(self, *args, **_kwargs):
        self.calls.append(args)
        events = self.event_batches.pop(0) if self.event_batches else []
        for event in events:
            yield event


async def _async_noop(*_args, **_kwargs):
    return None


async def _async_empty_dict(*_args, **_kwargs):
    return {}


async def _async_bridge_health_ok():
    return {
        "ok": True,
        "started_at": 1_700_000_000,
        "uptime_seconds": 125,
    }


async def _async_usage_unavailable():
    return {
        "ok": False,
        "five_hour_remaining_percent": None,
        "weekly_remaining_percent": None,
        "five_hour_reset_at": None,
        "weekly_reset_at": None,
    }


if __name__ == "__main__":
    unittest.main()
