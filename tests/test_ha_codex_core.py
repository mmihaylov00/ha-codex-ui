import asyncio
import importlib.util
import json
import subprocess
import sys
import types
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch

from custom_components.ha_codex.approvals import is_safe_read_only_command
from custom_components.ha_codex.capabilities import (
    discover_addon_paths,
    discover_validation_command,
)
from custom_components.ha_codex.codex_events import (
    NormalizedEvent,
    compact_raw_event,
    normalize_event,
)
from custom_components.ha_codex.config_flow import (
    HaCodexConfigFlow,
    HaCodexOptionsFlow,
    config_defaults,
    config_from_entry_data,
    config_schema,
    normalize_config_input,
)
from custom_components.ha_codex.git_ops import GitOperationsMixin
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
    model_for_preset,
    normalize_model_presets,
    normalize_run_settings,
    normalize_settings,
    resolve_run_settings,
    update_settings,
)
from custom_components.ha_codex.validation_lab import (
    build_validation_summary,
    is_ha_relevant_change,
    reload_service_for_domain,
)

REPO_ROOT = Path(__file__).resolve().parents[1]
# Avoid the OS temp root because the integration intentionally ignores paths
# containing a "tmp" segment when scanning user-visible workspace files.
CONFIG_TEMP_DIR = REPO_ROOT / "test_workspaces"
CONFIG_TEMP_DIR.mkdir(exist_ok=True)
BRIDGE_PATH = REPO_ROOT / "custom_components" / "ha_codex" / "bridge" / "ha_codex_bridge.py"


def load_bridge_module():
    spec = importlib.util.spec_from_file_location("ha_codex_bridge_test", BRIDGE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


class CapabilityDiscoveryTests(unittest.TestCase):
    def test_uses_configured_validation_commands(self):
        self.assertIsNone(discover_validation_command(None))
        self.assertIsNone(discover_validation_command("none"))
        self.assertEqual(discover_validation_command("ha core check"), ["ha", "core", "check"])
        self.assertEqual(
            discover_validation_command(["python", "-m", "hass"]), ["python", "-m", "hass"]
        )
        self.assertIsNone(discover_validation_command([]))
        self.assertEqual(
            discover_validation_command("auto", command_exists=lambda name: name == "ha"),
            ["ha", "core", "check"],
        )

    def test_discovers_explicit_addon_scope_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            first = root / "first"
            second = root / "second"
            first.mkdir()
            second.mkdir()

            self.assertEqual(discover_addon_paths(None, candidates=[first]), [])
            self.assertEqual(discover_addon_paths("none", candidates=[first]), [])
            self.assertEqual(
                discover_addon_paths([first, first, second]), [str(first), str(second)]
            )
            self.assertEqual(
                discover_addon_paths(f" {first}, {second}, {root / 'missing'} "),
                [str(first), str(second)],
            )

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


class ConfigEntryTests(unittest.TestCase):
    def test_manifest_enables_config_flow(self):
        manifest = json.loads(
            (REPO_ROOT / "custom_components" / "ha_codex" / "manifest.json").read_text(
                encoding="utf-8"
            )
        )

        self.assertEqual(manifest["name"], "HA Codex UI")
        self.assertEqual(manifest["config_flow"], True)
        self.assertIn("openai-codex==0.1.0b2", manifest["requirements"])

    def test_config_flow_defaults_match_hacs_install_values(self):
        defaults = config_defaults()

        self.assertEqual(defaults["workspace_path"], "/config")
        self.assertEqual(defaults["codex_command"], "")
        self.assertEqual(defaults["bridge_url"], "http://127.0.0.1:8765")
        self.assertTrue(defaults["require_admin"])
        self.assertEqual(defaults["addon_write_scope"], "all_visible")
        self.assertEqual(defaults["validation_command"], "auto")

    def test_yaml_import_normalizes_blank_optional_values(self):
        data = normalize_config_input(
            {
                "workspace_path": "/config",
                "codex_command": "/config/bin/codex",
                "bridge_url": "",
                "require_admin": True,
                "addon_write_scope": "",
                "validation_command": "",
            }
        )

        self.assertEqual(data["bridge_url"], None)
        self.assertEqual(data["addon_write_scope"], None)
        self.assertEqual(data["validation_command"], None)

    def test_options_override_config_entry_data(self):
        data = normalize_config_input({"codex_command": "/config/bin/codex"})
        merged = config_from_entry_data(data, {"codex_command": "codex", "require_admin": False})

        self.assertEqual(merged["workspace_path"], "/config")
        self.assertEqual(merged["codex_command"], "codex")
        self.assertFalse(merged["require_admin"])

    def test_config_schema_formats_nullable_and_list_values_for_forms(self):
        schema = config_schema(
            {
                "bridge_url": None,
                "addon_write_scope": ["/addons", "/addon_configs"],
                "validation_command": ["ha", "core", "check"],
            }
        )

        self.assertIn("bridge_url", schema)
        self.assertEqual(schema["bridge_url"], str)
        self.assertIn("addon_write_scope", schema)
        normalized = normalize_config_input(
            {
                "workspace_path": "  ",
                "codex_command": " codex ",
                "bridge_url": "null",
                "require_admin": "off",
                "addon_write_scope": ["/addons"],
                "ignored": "value",
            }
        )
        self.assertEqual(normalized["workspace_path"], "/config")
        self.assertEqual(normalized["codex_command"], "codex")
        self.assertEqual(normalized["bridge_url"], None)
        self.assertFalse(normalized["require_admin"])
        self.assertEqual(normalized["addon_write_scope"], ["/addons"])

    def test_config_and_options_flow_create_entries_and_forms(self):
        flow = HaCodexConfigFlow()
        calls = []
        flow._async_set_unique_id = lambda unique_id: _async_value(
            calls.append(("unique", unique_id))
        )
        flow._abort_if_unique_id_configured = lambda: calls.append(("abort_check",))
        flow.async_create_entry = lambda **kwargs: {"type": "entry", **kwargs}
        flow.async_show_form = lambda **kwargs: {"type": "form", **kwargs}

        created = asyncio.run(flow.async_step_user({"codex_command": "codex"}))
        self.assertEqual(created["type"], "entry")
        self.assertEqual(created["title"], "HA Codex UI")
        self.assertEqual(created["data"]["codex_command"], "codex")

        form = asyncio.run(flow.async_step_user())
        self.assertEqual(form["type"], "form")
        self.assertEqual(form["step_id"], "user")

        imported = asyncio.run(flow.async_step_import({"bridge_url": "none"}))
        self.assertEqual(imported["data"]["bridge_url"], None)
        self.assertEqual(calls[0], ("unique", "ha_codex"))

        options = HaCodexConfigFlow.async_get_options_flow(
            types.SimpleNamespace(data={"codex_command": "/config/bin/codex"}, options={})
        )
        self.assertIsInstance(options, HaCodexOptionsFlow)
        options.async_create_entry = lambda **kwargs: {"type": "entry", **kwargs}
        options.async_show_form = lambda **kwargs: {"type": "form", **kwargs}

        options_form = asyncio.run(options.async_step_init())
        self.assertEqual(options_form["type"], "form")
        options_entry = asyncio.run(options.async_step_init({"require_admin": False}))
        self.assertFalse(options_entry["data"]["require_admin"])


class IntegrationSetupTests(unittest.IsolatedAsyncioTestCase):
    async def test_yaml_setup_imports_when_config_entries_are_available(self):
        import custom_components.ha_codex as integration

        config_entries_module = types.ModuleType("homeassistant.config_entries")
        config_entries_module.SOURCE_IMPORT = "import"
        sys.modules["homeassistant.config_entries"] = config_entries_module

        hass = _FakeSetupHass("/config")
        self.assertTrue(await integration.async_setup(hass, {}))
        self.assertEqual(hass.created_tasks, [])

        hass = _FakeSetupHass("/config")
        hass.config_entries.entries = [object()]
        self.assertTrue(
            await integration.async_setup(hass, {"ha_codex": {"codex_command": "codex"}})
        )
        self.assertEqual(hass.created_tasks, [])

        hass = _FakeSetupHass("/config")
        self.assertTrue(
            await integration.async_setup(hass, {"ha_codex": {"codex_command": "codex"}})
        )
        self.assertEqual(len(hass.created_tasks), 1)
        self.assertEqual(hass.config_entries.flow.calls[0][0], "ha_codex")

    async def test_setup_entry_registers_static_panel_commands_and_unloads(self):
        import custom_components.ha_codex as integration
        import custom_components.ha_codex.manager as manager_module

        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            panel_dir = root / "www" / "ha_codex"
            panel_dir.mkdir(parents=True)
            (panel_dir / "panel.js").write_text("console.log('panel')\n", encoding="utf-8")
            hass = _FakeSetupHass(root)
            calls = _install_runtime_setup_stubs()
            original_manager = manager_module.CodexManager
            try:
                manager_module.CodexManager = _FakeRuntimeManager
                entry = _FakeConfigEntry(
                    data={"bridge_url": "http://127.0.0.1:8765"},
                    options={"require_admin": False},
                )
                self.assertTrue(await integration.async_setup_entry(hass, entry))

                self.assertIsInstance(hass.data["ha_codex"], _FakeRuntimeManager)
                self.assertEqual(hass.data["ha_codex"].loaded, True)
                self.assertEqual(hass.data["ha_codex"].started_bridge, True)
                runtime_manager = hass.data["ha_codex"]
                self.assertEqual(len(hass.http.static_paths), 1)
                self.assertEqual(calls["panels"][0]["frontend_url_path"], "ha-codex")
                self.assertFalse(calls["panels"][0]["require_admin"])
                self.assertEqual(len(calls["commands"]), 1)
                self.assertEqual(len(entry.unloads), 1)

                self.assertTrue(await integration.async_unload_entry(hass, entry))
                self.assertTrue(runtime_manager.tasks["run"].cancelled)
                self.assertEqual(calls["removed_panels"], ["ha-codex"])

                self.assertTrue(await integration.async_reload_entry(hass, entry))
            finally:
                manager_module.CodexManager = original_manager

    async def test_options_update_and_panel_cache_version_fallbacks(self):
        import custom_components.ha_codex as integration

        hass = _FakeSetupHass("/config")
        entry = _FakeConfigEntry()
        await integration._async_options_updated(hass, entry)
        self.assertEqual(hass.config_entries.reloads, [entry.entry_id])

        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.assertEqual(integration._panel_cache_version(root), "dev")
            (root / "manifest.json").write_text('{"version": "1.2.3"}', encoding="utf-8")
            self.assertEqual(integration._panel_cache_version(root), "1.2.3")


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


class BridgeRunnerTests(unittest.IsolatedAsyncioTestCase):
    async def test_bridge_runner_streams_json_raw_and_approval_events(self):
        import custom_components.ha_codex.bridge_runner as bridge_runner

        aiohttp, calls = _install_aiohttp_runner_stub(
            [
                b"\n",
                b"not-json\n",
                json.dumps(
                    {
                        "type": "exec_approval_request",
                        "id": "approval-1",
                        "command": "ha core restart",
                        "cwd": "/config",
                    }
                ).encode(),
                json.dumps({"type": "thread.started", "thread_id": "thread-1"}).encode(),
            ]
        )
        runner = bridge_runner.CodexBridgeRunner(
            "http://bridge/",
            RunnerOptions(
                codex_command="codex",
                workspace_path="/config",
                writable_paths=["/addons"],
            ),
        )

        approvals = []

        async def approve(event):
            approvals.append(event.approval_id)
            return True

        events = [
            event
            async for event in runner.run("Prompt", "codex-session", approve, {"model": "gpt-5"})
        ]

        self.assertEqual(runner.bridge_url, "http://bridge")
        self.assertEqual(
            [event.kind for event in events], ["raw", "approval_required", "session_started"]
        )
        self.assertEqual(approvals, ["approval-1"])
        self.assertEqual(calls["posts"][0]["url"], "http://bridge/run")
        self.assertEqual(calls["posts"][0]["json"]["writable_paths"], ["/addons"])
        self.assertEqual(calls["posts"][1]["url"], "http://bridge/approvals/approval-1")
        self.assertEqual(calls["posts"][1]["json"], {"approved": True})
        self.assertIs(aiohttp.ClientSession, _FakeRunnerClientSession)

    async def test_bridge_runner_restarts_once_after_connection_failure(self):
        _install_aiohttp_runner_stub(
            [json.dumps({"type": "thread.started", "thread_id": "ok"}).encode()]
        )
        import custom_components.ha_codex.bridge_runner as bridge_runner

        runner = bridge_runner.CodexBridgeRunner(
            "http://bridge",
            RunnerOptions(codex_command="codex", workspace_path="/config"),
        )
        attempts = {"count": 0}
        restarts = []

        async def stream_once(_payload, _approval_handler):
            attempts["count"] += 1
            if attempts["count"] == 1:
                raise sys.modules["aiohttp"].ClientConnectionError("offline")
            yield NormalizedEvent("message", text="recovered")

        async def restart():
            restarts.append("restart")

        runner._stream_run = stream_once
        runner._restart_bridge = restart

        events = [event async for event in runner.run("Prompt", None)]

        self.assertEqual([event.kind for event in events], ["action", "message"])
        self.assertEqual(restarts, ["restart"])

    async def test_bridge_restart_failure_raises_runtime_error(self):
        import custom_components.ha_codex.bridge_runner as bridge_runner

        original_restart = bridge_runner.async_restart_bridge_service
        try:
            bridge_runner.async_restart_bridge_service = lambda: _async_value(
                {"ok": False, "error": "blocked"}
            )
            runner = bridge_runner.CodexBridgeRunner(
                "http://bridge",
                RunnerOptions(codex_command="codex", workspace_path="/config"),
            )
            with self.assertRaisesRegex(RuntimeError, "blocked"):
                await runner._restart_bridge()
        finally:
            bridge_runner.async_restart_bridge_service = original_restart


class BridgeSdkRuntimeTests(unittest.TestCase):
    def test_builds_sdk_run_request_from_bridge_payload(self):
        bridge = load_bridge_module()

        request = bridge.build_sdk_run_request(
            {
                "prompt": "Inspect config",
                "codex_session_id": "thread-1",
                "codex_command": "/custom/codex",
                "workspace_path": "/config",
                "writable_paths": ["/addons"],
                "sandbox": "workspace-write",
                "approval_policy": "never",
                "run_settings": {
                    "model": "gpt-5-codex",
                    "reasoning_effort": "high",
                },
            }
        )

        self.assertEqual(request["codex_bin"], "/custom/codex")
        self.assertEqual(request["thread_id"], "thread-1")
        self.assertEqual(request["cwd"], "/config")
        self.assertEqual(request["sandbox"], "workspace_write")
        self.assertEqual(request["sdk_sandbox_policy"]["writableRoots"], ["/addons"])
        self.assertEqual(request["approval_mode"], "deny_all")
        self.assertEqual(request["model"], "gpt-5-codex")
        self.assertEqual(request["effort"], "high")
        self.assertIn("HA Codex question protocol", request["prompt"])

    def test_sdk_notification_to_codex_event_preserves_frontend_event_contract(self):
        bridge = load_bridge_module()
        notification = types.SimpleNamespace(
            method="item/agentMessage/delta",
            payload=_FakeSdkPayload(delta="hello"),
        )

        event = bridge.sdk_notification_to_codex_event(notification)

        self.assertEqual(event, {"type": "agent_message_delta", "delta": "hello"})

    def test_sdk_approval_handler_waits_for_bridge_decision(self):
        bridge = load_bridge_module()
        approvals = []

        def wait_for_approval(approval):
            approvals.append(approval)
            return False

        handler = bridge.build_sdk_approval_handler(wait_for_approval)
        decision = handler(
            "item/commandExecution/requestApproval",
            {"command": ["ha", "core", "restart"], "cwd": "/config"},
        )

        self.assertEqual(decision, {"decision": "deny"})
        self.assertEqual(approvals[0]["command"], "ha core restart")
        self.assertEqual(approvals[0]["cwd"], "/config")
        self.assertTrue(approvals[0]["id"])

    def test_run_codex_sdk_streams_normalized_events(self):
        bridge = load_bridge_module()
        fake_sdk = _install_openai_codex_sdk_stub()
        fake_sdk.notifications = [
            types.SimpleNamespace(
                method="item/agentMessage/delta",
                payload=_FakeSdkPayload(delta="hello"),
            ),
            types.SimpleNamespace(
                method="turn/completed",
                payload=_FakeSdkPayload(turn={"id": "turn-1"}),
            ),
        ]

        events = list(
            bridge.run_codex_sdk(
                {
                    "prompt": "Prompt",
                    "workspace_path": "/config",
                    "run_settings": {"model": "gpt-5-codex"},
                },
                wait_for_approval=lambda _approval: True,
            )
        )

        self.assertEqual(events[0], {"type": "thread.started", "thread_id": "thread-1"})
        self.assertEqual(events[1], {"type": "agent_message_delta", "delta": "hello"})
        self.assertEqual(fake_sdk.clients[0].config.codex_bin, None)
        self.assertEqual(fake_sdk.clients[0].turn_params["model"], "gpt-5-codex")
        self.assertEqual(fake_sdk.clients[0].turn_params["cwd"], "/config")

    def test_run_codex_sdk_raises_import_error_when_sdk_missing(self):
        bridge = load_bridge_module()
        for name in list(sys.modules):
            if name.startswith("openai_codex"):
                sys.modules.pop(name)

        with self.assertRaises(ImportError):
            list(bridge.run_codex_sdk({"prompt": "Prompt"}, wait_for_approval=lambda _: True))


class CodexEventTests(unittest.TestCase):
    def test_normalized_event_serializes_all_fields(self):
        event = NormalizedEvent(
            "action",
            text="Run command",
            session_id="session-1",
            approval_id="approval-1",
            command="ls",
            cwd="/config",
            file_changes=[{"status": "modified", "path": "configuration.yaml"}],
            raw={"type": "test"},
        )

        self.assertEqual(
            event.to_dict(),
            {
                "kind": "action",
                "text": "Run command",
                "session_id": "session-1",
                "approval_id": "approval-1",
                "command": "ls",
                "cwd": "/config",
                "file_changes": [{"status": "modified", "path": "configuration.yaml"}],
                "raw": {"type": "test"},
            },
        )

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

    def test_normalizes_nested_commands_patches_and_fallback_events(self):
        shell_event = normalize_event(
            {
                "type": "tool.started",
                "tool_call": {
                    "function": {"name": "shell"},
                    "arguments": json.dumps({"cmd": ["python", "-m", "unittest"]}),
                },
            }
        )
        self.assertEqual(shell_event.kind, "action")
        self.assertEqual(shell_event.command, "python -m unittest")

        invalid_shell = normalize_event({"type": "exec.started", "command": "sh -lc 'unterminated"})
        self.assertEqual(invalid_shell.command, "sh -lc 'unterminated")

        patch_event = normalize_event(
            {
                "type": "function_call",
                "tool": {"recipient": "functions.apply_patch"},
                "arguments": json.dumps(
                    {
                        "patch": (
                            "*** Begin Patch\n"
                            "*** Delete File: old.yaml\n"
                            "*** Update File: before.yaml\n"
                            "*** Move to: after.yaml\n"
                            "*** End Patch\n"
                        )
                    }
                ),
            }
        )
        self.assertEqual(
            patch_event.file_changes,
            [
                {"status": "deleted", "path": "old.yaml"},
                {"status": "renamed", "path": "after.yaml", "old_path": "before.yaml"},
            ],
        )
        self.assertIn("`before.yaml` -> `after.yaml`", patch_event.text)

        self.assertEqual(
            normalize_event({"type": "message.created", "message": {"content": "done"}}).text,
            "done",
        )
        self.assertEqual(
            normalize_event({"type": "item.created", "item": {"content": "nested"}}).text,
            "nested",
        )
        self.assertEqual(normalize_event({"type": "turn.end"}).kind, "run_finished")
        self.assertEqual(
            normalize_event({"type": "unknown", "error": "plain error"}).text, "plain error"
        )

    def test_extracts_nested_argument_commands_and_patch_text(self):
        command_event = normalize_event(
            {
                "type": "tool.started",
                "arguments": {"command": "cat configuration.yaml"},
            }
        )
        self.assertEqual(command_event.kind, "action")
        self.assertEqual(command_event.command, "cat configuration.yaml")

        patch_event = normalize_event(
            {
                "type": "tool.started",
                "tool_name": "functions.apply_patch",
                "arguments": {
                    "input": {
                        "patch": (
                            "*** Begin Patch\n"
                            "*** Update File: configuration.yaml\n"
                            "@@\n"
                            "-old\n"
                            "+new\n"
                            "*** End Patch\n"
                        )
                    }
                },
            }
        )
        self.assertEqual(
            patch_event.file_changes,
            [{"status": "modified", "path": "configuration.yaml"}],
        )

    def test_compact_raw_event_bounds_lists_and_ignores_non_object_roots(self):
        compacted = compact_raw_event({"items": list(range(55))})

        self.assertEqual(len(compacted["items"]), 51)
        self.assertEqual(compacted["items"][-1], "... truncated 5 item(s)")
        self.assertEqual(compact_raw_event(["not", "an", "object"]), {})


class SessionModelTests(unittest.TestCase):
    def test_storage_models_deserialize_optional_fields_and_ids(self):
        approval = PendingApproval.from_dict({"command": "ha core check"})
        self.assertEqual(approval.session_id, "")
        self.assertEqual(approval.status, "pending")

        validation = ValidationResult.from_dict(
            {
                "status": "passed",
                "command": ["ha", "core", "check"],
                "returncode": 0,
                "summary": {"label": "Passed"},
            }
        )
        self.assertEqual(validation.command, ["ha", "core", "check"])
        self.assertEqual(validation.summary, {"label": "Passed"})

        session = CodexSession.from_dict(
            {
                "messages": [
                    {"id": 5, "role": "user", "content": "Hi"},
                    {"role": "assistant", "content": "Hello"},
                ],
                "approvals": [{"id": "approval-1", "command": "cat configuration.yaml"}],
                "validation": validation.to_dict(),
                "archived": True,
            }
        )
        self.assertEqual([message.id for message in session.messages], [5, 6])
        self.assertGreaterEqual(session.next_message_id, 7)
        self.assertIsNotNone(session.archived_at)
        self.assertEqual(session.approvals[0].id, "approval-1")
        self.assertEqual(session.validation.status, "passed")

        session.assign_message_id(ChatMessage(id=10, role="assistant", content="Existing id"))
        self.assertEqual(session.next_message_id, 11)

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
        self.assertEqual(
            update_settings(settings, {"defaults": {"model_preset_id": "codex_default"}})[
                "defaults"
            ]["model_preset_id"],
            "gpt_5_5",
        )
        custom_current = update_settings(
            settings,
            {
                "defaults": {"model_preset_id": "custom"},
                "model_presets": [{"id": "custom", "label": "Custom", "model": "custom"}],
            },
        )
        self.assertEqual(
            update_settings(custom_current, {"model_presets": []})["defaults"]["model_preset_id"],
            "gpt_5_5",
        )
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

        modifying = resolve_run_settings("Add a helper", ["ignored"], defaults, None)
        self.assertTrue(modifying["modifying"])
        self.assertFalse(modifying["risky"])
        self.assertEqual(modifying["resolved"]["validation_depth"], "full")

    def test_settings_normalization_rejects_invalid_values_and_preserves_safe_defaults(self):
        self.assertEqual(normalize_settings(None)["defaults"]["model_preset_id"], "gpt_5_5")
        with self.assertRaisesRegex(ValueError, "Settings update"):
            update_settings(default_settings(), ["bad"])
        with self.assertRaisesRegex(ValueError, "model_preset_id"):
            update_settings(default_settings(), {"defaults": {"model_preset_id": "missing"}})
        with self.assertRaisesRegex(ValueError, "model_preset_id is required"):
            normalize_run_settings({"model_preset_id": ""})
        with self.assertRaisesRegex(ValueError, "context_budget_chars"):
            update_settings(default_settings(), {"context_budget_chars": "large"})
        with self.assertRaisesRegex(ValueError, "between 1000 and 200000"):
            update_settings(default_settings(), {"context_budget_chars": 999})

        presets = normalize_model_presets(
            [
                "ignored",
                {"id": "gpt_5_5", "label": "duplicate built-in", "model": "ignored"},
                {"id": "custom", "label": "", "model": ""},
                {"id": "custom", "label": "duplicate", "model": "duplicate"},
            ]
        )
        custom = [preset for preset in presets if preset["id"] == "custom"]
        self.assertEqual(custom, [{"id": "custom", "label": "custom", "model": None}])
        self.assertEqual(normalize_model_presets("bad")[0]["id"], "gpt_5_5")

        resolved = resolve_run_settings(
            "What changed?",
            [{"payload": {"target": "configuration.yaml", "action": "update"}}],
            default_settings()["defaults"],
            {"tool_visibility": "verbose", "unknown": "ignored"},
        )
        self.assertTrue(resolved["modifying"])
        self.assertEqual(resolved["requested"]["tool_visibility"], "verbose")

        settings = update_settings(
            default_settings(),
            {"model_presets": [{"id": "custom", "label": "Custom", "model": "custom-model"}]},
        )
        self.assertEqual(model_for_preset(settings, "custom"), "custom-model")
        self.assertIsNone(model_for_preset(settings, "missing"))

    def test_read_only_approval_classifier_is_conservative(self):
        self.assertTrue(is_safe_read_only_command("/bin/sh -lc 'cat configuration.yaml'"))
        self.assertTrue(is_safe_read_only_command("rg -n kitchen configuration.yaml"))
        self.assertTrue(is_safe_read_only_command("git status --short"))
        self.assertTrue(is_safe_read_only_command("git diff -- configuration.yaml"))
        self.assertTrue(is_safe_read_only_command("ha core check"))
        self.assertTrue(is_safe_read_only_command("sed -n '1,40p' configuration.yaml"))

        self.assertFalse(is_safe_read_only_command(""))
        self.assertFalse(is_safe_read_only_command("#"))
        self.assertFalse(is_safe_read_only_command("pwd"))
        self.assertFalse(is_safe_read_only_command("sh -lc 'unterminated"))
        self.assertFalse(is_safe_read_only_command("git"))
        self.assertFalse(is_safe_read_only_command("git log --oneline"))
        self.assertFalse(is_safe_read_only_command("git diff --output patch.diff"))
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
    def test_relevance_and_domain_mapping_cover_home_assistant_paths(self):
        self.assertFalse(
            build_validation_summary(ValidationResult(status="passed"), [])["restart_required"]
        )
        self.assertEqual(
            build_validation_summary(
                ValidationResult(status="passed", returncode=0),
                [
                    {"status": "modified", "path": ""},
                    {"status": "modified", "path": "ui-lovelace.yaml"},
                    {"status": "modified", "path": "dashboards/kitchen.yaml"},
                    {"status": "modified", "path": "scenes.yaml"},
                ],
            )["affected_domains"],
            [
                {
                    "id": "lovelace_www",
                    "label": "Lovelace/www assets",
                    "paths": ["ui-lovelace.yaml", "dashboards/kitchen.yaml"],
                    "reloadable": False,
                    "restart_required": False,
                },
                {
                    "id": "scenes",
                    "label": "Scenes",
                    "paths": ["scenes.yaml"],
                    "reloadable": True,
                    "restart_required": False,
                },
            ],
        )
        self.assertFalse(is_ha_relevant_change(""))
        self.assertTrue(is_ha_relevant_change("config/script.yml"))
        self.assertTrue(is_ha_relevant_change("custom_components/example/manifest.json"))

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
    def test_summarized_title_handles_empty_stop_words_paths_and_trimming(self):
        self.assertEqual(summarize_prompt_title(""), "New chat")
        self.assertEqual(summarize_prompt_title("the and or to"), "The And Or To")
        self.assertEqual(
            summarize_prompt_title("update `custom_components/ha_codex/manager.py`"),
            "custom_components/ha_codex/manager.py",
        )
        self.assertEqual(
            summarize_prompt_title(
                "create alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu"
            ),
            "Alpha Beta Gamma Delta Epsilon Zeta",
        )
        self.assertEqual(
            summarize_prompt_title("create " + ("x" * 80)),
            "X" + ("x" * 47),
        )

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

    async def test_run_finished_text_matching_streamed_assistant_is_not_duplicated(self):
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
                NormalizedEvent("message_delta", text="Created hello_world.txt"),
                NormalizedEvent("run_finished", text="Created hello_world.txt"),
            ]
        )
        manager.async_save = _async_noop
        manager.async_validate = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(id="session-1", status="running")
        manager.sessions[session.id] = session

        await manager._async_run_session(session.id, "prompt")

        self.assertEqual(
            [(message.role, message.content) for message in session.messages],
            [("assistant", "Created hello_world.txt")],
        )

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

    async def test_run_plan_handles_delta_empty_error_and_exception_paths(self):
        async def run_plan_with(events_or_runner):
            manager = CodexManager(
                _FakeHass("/tmp"),
                store=None,
                workspace_path="/homeassistant",
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )
            manager.runner = (
                events_or_runner
                if hasattr(events_or_runner, "run")
                else _FakeRunner(events_or_runner)
            )
            manager.async_save = _async_noop
            session = CodexSession(id="session-1", status="planning")
            plan = {
                "id": "plan-1",
                "prompt": "Update configuration.yaml",
                "run_prompt": "Update configuration.yaml",
                "status": "planning",
                "content": "",
                "run_settings": {},
            }
            session.metadata["pending_plan"] = plan
            manager.sessions[session.id] = session

            await manager._async_run_plan(session.id, plan["id"])
            return session, manager

        delta_session, delta_manager = await run_plan_with(
            [
                NormalizedEvent("session_started", session_id="codex-session"),
                NormalizedEvent("message_delta", text="Plan:"),
                NormalizedEvent("message_delta", text="\n- Inspect configuration.yaml"),
            ]
        )
        self.assertEqual(delta_session.codex_session_id, "codex-session")
        self.assertEqual(delta_session.status, "waiting_plan_approval")
        self.assertEqual(
            delta_session.metadata["pending_plan"]["content"], "Plan:\n- Inspect configuration.yaml"
        )
        self.assertEqual(delta_manager.tasks, {})

        empty_session, _empty_manager = await run_plan_with([])
        self.assertEqual(empty_session.status, "waiting_plan_approval")
        self.assertIn("Codex did not return a run plan", empty_session.messages[-1].content)

        error_session, _error_manager = await run_plan_with(
            [NormalizedEvent("error", text="planning failed")]
        )
        self.assertEqual(error_session.status, "error")
        self.assertEqual(error_session.messages[-1].content, "planning failed")

        exception_session, _exception_manager = await run_plan_with(_FailingRunner(RuntimeError()))
        self.assertEqual(exception_session.status, "error")
        self.assertIn("RuntimeError", exception_session.messages[-1].content)

    async def test_run_plan_moves_edited_message_below_command_events(self):
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
                NormalizedEvent("message_delta", text="Inspecting"),
                NormalizedEvent("action", command="ls -la /config"),
                NormalizedEvent("message_delta", text="\nPlan ready"),
            ]
        )
        manager.async_save = _async_noop
        session = CodexSession(id="session-1", status="planning")
        plan = {
            "id": "plan-1",
            "prompt": "prompt",
            "run_prompt": "prompt",
            "status": "planning",
            "content": "",
            "run_settings": {},
        }
        session.metadata["pending_plan"] = plan
        manager.sessions[session.id] = session

        await manager._async_run_plan(session.id, plan["id"])

        self.assertEqual([message.role for message in session.messages], ["event", "assistant"])
        self.assertEqual(session.messages[0].metadata["command"], "ls -la /config")
        self.assertEqual(session.messages[1].content, "Inspecting\nPlan ready")

    async def test_stale_codex_thread_error_recovers_with_fresh_thread_prompt(self):
        stale_id = "01234567-89ab-cdef-0123-456789abcdef"
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
                [
                    NormalizedEvent(
                        "error",
                        text=f"thread/resume failed: no rollout found for thread id {stale_id}",
                    )
                ],
                [
                    NormalizedEvent("session_started", session_id="fresh-thread"),
                    NormalizedEvent("message", text="Recovered"),
                    NormalizedEvent("run_finished"),
                ],
            ]
        )
        manager.async_save = _async_noop
        manager.async_validate = _async_noop
        manager._maybe_request_restart_approval = _async_noop
        session = CodexSession(
            id="session-1",
            status="running",
            codex_session_id=stale_id,
            messages=[
                ChatMessage(role="user", content="Original request"),
                ChatMessage(role="assistant", content="Earlier response"),
            ],
        )
        manager.sessions[session.id] = session

        await manager._async_run_session(
            session.id,
            "Latest request",
            run_settings={"validation_depth": "none"},
        )

        self.assertEqual(session.status, "idle")
        self.assertEqual(session.codex_session_id, "fresh-thread")
        self.assertEqual(len(manager.runner.calls), 2)
        self.assertIsNone(manager.runner.calls[1][1])
        self.assertIn("Stale Codex thread id", manager.runner.calls[1][0])
        self.assertIn("Latest user request:\nLatest request", manager.runner.calls[1][0])
        self.assertTrue(
            any(message.metadata.get("kind") == "resume_recovery" for message in session.messages)
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
                "-C",
                str(root),
                f"--git-dir={root / '.git-real'}",
                f"--work-tree={root}",
                "status",
                "--short",
            ],
        )

    def test_git_command_reads_git_real_worktree_without_subprocess(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            work_tree = root / "worktree"
            git_dir = root / ".git-real"
            work_tree.mkdir()
            git_dir.mkdir()
            (git_dir / "config").write_text(
                f"[core]\n\tworktree = {work_tree}\n",
                encoding="utf-8",
            )
            manager = CodexManager(
                _FakeHass(root),
                store=None,
                workspace_path="/homeassistant",
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )

            with patch("custom_components.ha_codex.git_ops.subprocess.run") as run:
                run.side_effect = AssertionError("subprocess.run must not run in _git_work_tree")
                command = manager._git_command(["status", "--short"])

        self.assertEqual(
            command,
            [
                "git",
                "-C",
                str(work_tree),
                f"--git-dir={git_dir}",
                f"--work-tree={work_tree}",
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


class GitOperationsHelperTests(unittest.IsolatedAsyncioTestCase):
    def test_git_path_parsing_visibility_and_selection_helpers(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / "configuration.yaml").write_text("homeassistant:\n", encoding="utf-8")
            manager = _FakeGitOpsManager(root)
            manager.head_paths = {"configuration.yaml"}

            parsed = manager._parse_git_status(
                "\n".join(
                    [
                        " M homeassistant/configuration.yaml",
                        "R  homeassistant/old.yaml -> homeassistant/new.yaml",
                        "?? config/configuration.yaml",
                        " D homeassistant/deleted.yaml",
                        "?? node_modules/pkg/index.js",
                        "",
                    ]
                )
            )
            files = manager._display_git_files(parsed)

            self.assertEqual(files[0]["path"], "configuration.yaml")
            self.assertEqual(files[1]["old_path"], "old.yaml")
            self.assertEqual(files[2]["path"], "configuration.yaml")
            self.assertEqual(files[2]["status"], "added")
            self.assertFalse(manager._is_visible_git_path("node_modules/pkg/index.js"))
            self.assertFalse(manager._is_visible_git_path("secrets.yaml"))
            self.assertFalse(manager._is_visible_git_path("home-assistant_v2.db"))
            self.assertEqual(manager._normalize_git_status_path("./config.yaml"), "config.yaml")
            self.assertEqual(
                manager._normalize_git_status_path(".././config.yaml"), "./config.yaml"
            )

            stats = manager._parse_git_numstat(
                "2\t3\tconfiguration.yaml\n-\t-\tbinary.bin\nx\ty\tbad.yaml\n1\t2\t{old => new}.yaml"
            )
            self.assertEqual(stats["configuration.yaml"], {"added_lines": 2, "deleted_lines": 3})
            self.assertEqual(stats["binary.bin"], {"added_lines": None, "deleted_lines": None})
            self.assertEqual(stats["bad.yaml"], {"added_lines": None, "deleted_lines": None})
            self.assertIn("new}.yaml", stats)

            self.assertEqual(manager._git_status_label("??"), "untracked")
            self.assertEqual(manager._git_status_label(" D"), "deleted")
            self.assertEqual(manager._git_status_label("A "), "added")
            self.assertEqual(manager._git_status_label("R "), "renamed")
            self.assertEqual(manager._git_status_label("C "), "copied")
            self.assertEqual(manager._git_status_label(" M"), "modified")
            self.assertEqual(manager._git_status_label("!!"), "!!")

            with self.assertRaises(ValueError):
                manager._safe_review_display_path("../secrets.yaml")
            with self.assertRaises(ValueError):
                manager._safe_review_display_path("secrets.yaml")
            with self.assertRaises(ValueError):
                manager._coerce_git_review_selection(123)

            change = {
                "path": "new.yaml",
                "git_path": "homeassistant/new.yaml",
                "old_path": "old.yaml",
                "old_git_path": "homeassistant/old.yaml",
                "head_path": "homeassistant/head.yaml",
            }
            self.assertEqual(
                manager._pathspecs_for_change(change),
                ["homeassistant/head.yaml", "homeassistant/old.yaml", "homeassistant/new.yaml"],
            )
            self.assertEqual(
                manager._dedupe_paths(["configuration.yaml", "configuration.yaml"]),
                ["configuration.yaml"],
            )
            self.assertEqual(
                manager._restore_pathspecs_for_selected_changes([change]),
                ["homeassistant/head.yaml"],
            )
            self.assertEqual(
                manager._untracked_changes_for_selected_discard(
                    [{"path": "new.yaml", "code": "??"}]
                )[0]["path"],
                "new.yaml",
            )

    async def test_git_patch_and_discard_helpers_cover_file_branches(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / "new.yaml").write_text("new: true\n", encoding="utf-8")
            (root / "directory").mkdir()
            manager = _FakeGitOpsManager(root)
            manager.command_results = [
                _cmd(stdout="diff --git a/new.yaml b/new.yaml\n+new\n", returncode=1),
                _cmd(stdout="diff --git a/deleted.yaml b/deleted.yaml\n-old\n"),
                _cmd(stdout="diff --git a/mod.yaml b/mod.yaml\n-old\n+new\n"),
                _cmd(stdout="old\n"),
            ]

            patch = await manager._git_patch_for_file(
                {"path": "new.yaml", "status": "untracked", "code": "??"}
            )
            self.assertEqual(patch["returncode"], 1)
            patch = await manager._git_patch_for_file({"path": "deleted.yaml", "status": "deleted"})
            self.assertIn("-old", patch["stdout"])
            patch = await manager._git_patch_for_file({"path": "mod.yaml", "status": "modified"})
            self.assertIn("+new", patch["stdout"])

            (root / "current.yaml").write_text("new\n", encoding="utf-8")
            patch = await manager._git_patch_against_head_file("head.yaml", "current.yaml")
            self.assertTrue(patch["ok"])
            self.assertIn("-old", patch["stdout"])
            self.assertIn("+new", patch["stdout"])

            remove_result = await manager._remove_untracked_review_files(
                [{"path": "new.yaml"}, {"path": "directory"}]
            )
            self.assertFalse(remove_result["ok"])
            self.assertIn("new.yaml", remove_result["stdout"])
            self.assertIn("non-file", remove_result["stderr"])

    async def test_git_setup_status_key_generation_and_identity_helpers(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _FakeGitOpsManager(root)
            manager.command_results = [_cmd(ok=False, stderr="git missing")]
            status = await GitOperationsMixin.async_git_setup_status(manager)
            self.assertFalse(status["git_available"])
            self.assertIn("git command", status["missing"])

            (root / ".git").mkdir()
            manager.command_results = [
                _cmd(stdout="git version 2.50.0\n"),
                _cmd(stdout="true\n"),
                _cmd(stdout=f"{root}\n"),
                _cmd(stdout="\n"),
                _cmd(stdout="git@example.com:owner/repo.git\n"),
                _cmd(stdout="origin/main\n"),
                _cmd(stdout="abc123def456\x1fabc123d\x1f1710000000\x1fInitial config\n"),
                _cmd(stdout="2\n"),
            ]
            status = await GitOperationsMixin.async_git_setup_status(manager)
            self.assertTrue(status["repository"])
            self.assertEqual(status["remote_url"], "git@example.com:owner/repo.git")
            self.assertEqual(status["incoming_count"], 2)
            self.assertEqual(
                status["history"],
                [
                    {
                        "hash": "abc123def456",
                        "short_hash": "abc123d",
                        "timestamp": 1710000000,
                        "subject": "Initial config",
                    }
                ],
            )
            self.assertNotIn("current branch", status["missing"])
            self.assertIn("SSH key", status["missing"])

            ssh_dir = root / ".ssh"
            ssh_dir.mkdir()
            private_key = ssh_dir / "ha_codex_ed25519"
            public_key = ssh_dir / "ha_codex_ed25519.pub"
            private_key.write_text("private", encoding="utf-8")
            public_key.write_text("ssh-ed25519 AAA test", encoding="utf-8")
            generated_paths = []

            async def keygen(command, **_kwargs):
                self.assertIn("ssh-keygen", command)
                generated_path = Path(command[-1])
                generated_paths.append(generated_path)
                generated_path.write_text("private generated", encoding="utf-8")
                generated_path.with_suffix(f"{generated_path.suffix}.pub").write_text(
                    "ssh-ed25519 BBB generated",
                    encoding="utf-8",
                )
                return _cmd(stdout="generated")

            manager._run_command = keygen
            generated = await GitOperationsMixin.async_git_setup_generate_key(manager)
            self.assertTrue(generated["ok"])
            self.assertEqual(generated["step"], "generate_key")
            self.assertEqual(generated["public_key"], "ssh-ed25519 BBB generated")
            self.assertEqual(private_key.read_text(encoding="utf-8"), "private generated")
            self.assertEqual(public_key.read_text(encoding="utf-8"), "ssh-ed25519 BBB generated")
            self.assertTrue(generated_paths)
            self.assertNotEqual(generated_paths[0], private_key)
            self.assertFalse(generated_paths[0].exists())
            self.assertFalse(
                generated_paths[0].with_suffix(f"{generated_paths[0].suffix}.pub").exists()
            )

    async def test_git_setup_status_and_key_generation_failure_branches(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _FakeGitOpsManager(root)

            manager.command_results = [_cmd(stdout="git version 2.50.0\n")]
            status = await GitOperationsMixin.async_git_setup_status(manager)
            self.assertFalse(status["repository"])
            self.assertIn("No Git repository", status["repo_error"])

            (root / ".git").mkdir()
            manager.command_results = [
                _cmd(stdout="git version 2.50.0\n"),
                _cmd(stdout="false\n", stderr="not a repo"),
            ]
            status = await GitOperationsMixin.async_git_setup_status(manager)
            self.assertFalse(status["repository"])
            self.assertEqual(status["repo_error"], "not a repo")

            manager.command_results = [
                _cmd(stdout="git version 2.50.0\n"),
                _cmd(stdout="true\n"),
                _cmd(stdout=f"{root}\n"),
                _cmd(ok=False),
                _cmd(ok=False),
                _cmd(stdout="origin/main\n"),
                _cmd(stdout="bad\x1flog\nabc\x1fshort\x1fnot-time\x1fSubject\n"),
                _cmd(stdout="not-a-number\n"),
            ]
            status = await GitOperationsMixin.async_git_setup_status(manager)
            self.assertEqual(status["incoming_count"], 0)
            self.assertEqual(status["history"][0]["timestamp"], 0)

            async def prepare_failed(_target, *_args):
                return {"ok": False, "returncode": None, "stdout": "", "stderr": "no chmod"}

            manager.hass.async_add_executor_job = prepare_failed
            result = await GitOperationsMixin.async_git_setup_generate_key(manager)
            self.assertFalse(result["ok"])
            self.assertEqual(result["step"], "prepare")

            manager = _FakeGitOpsManager(root)
            temporary_paths = []

            async def keygen_failed(command, **_kwargs):
                temporary_key = Path(command[-1])
                temporary_paths.append(temporary_key)
                temporary_key.write_text("private", encoding="utf-8")
                temporary_key.with_suffix(f"{temporary_key.suffix}.pub").write_text(
                    "public", encoding="utf-8"
                )
                return _cmd(ok=False, stderr="keygen failed", returncode=1)

            manager._run_command = keygen_failed
            result = await GitOperationsMixin.async_git_setup_generate_key(manager)
            self.assertFalse(result["ok"])
            self.assertEqual(result["step"], "generate_key")
            self.assertFalse(temporary_paths[0].exists())
            self.assertFalse(
                temporary_paths[0].with_suffix(f"{temporary_paths[0].suffix}.pub").exists()
            )

    async def test_git_setup_remote_and_pull_cover_fallback_branches(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _FakeGitOpsManager(root)
            manager.status.update({"repository": False, "remote_configured": False})
            manager.command_results = [
                _cmd(ok=False, stderr="old git"),
                _cmd(ok=True),
                _cmd(ok=False, stderr="missing remote"),
                _cmd(ok=True),
                _cmd(ok=False, stdout=""),
                _cmd(ok=True),
                _cmd(ok=True, stdout=""),
                _cmd(ok=True),
            ]

            result = await manager.async_git_setup_set_remote("https://example.test/repo.git")
            self.assertTrue(result["ok"])
            self.assertEqual(result["step"], "remote")
            self.assertEqual(
                manager.commands[3][-4:],
                ["remote", "add", "origin", "https://example.test/repo.git"],
            )

            manager.status.update({"repository": True, "remote_configured": True, "branch": ""})
            manager.command_results = [
                _cmd(ok=True),
                _cmd(ok=False),
                _cmd(ok=False),
                _cmd(ok=False),
                _cmd(ok=True, stdout=""),
            ]
            result = await manager.async_git_setup_pull()
            self.assertEqual(result["step"], "branch")

            manager.status.update({"branch": "main"})
            manager.command_results = [
                _cmd(ok=True),
                _cmd(ok=False),
                _cmd(ok=True, stdout="origin/main\n"),
                _cmd(ok=True),
                _cmd(ok=True),
            ]
            result = await manager.async_git_setup_pull()
            self.assertTrue(result["ok"])
            self.assertEqual(result["step"], "checkout")

            manager.status.update({"branch": "main"})
            manager.command_results = [
                _cmd(ok=True),
                _cmd(ok=True),
                _cmd(ok=True, stdout="0\n"),
            ]
            result = await manager.async_git_setup_pull()
            self.assertTrue(result["ok"])
            self.assertEqual(result["step"], "up_to_date")
            self.assertFalse(
                any("pull" in command for command in manager.commands[-3:]),
                manager.commands[-3:],
            )

            manager.command_results = [
                _cmd(ok=True),
                _cmd(ok=True),
                _cmd(ok=True),
            ]
            result = await manager.async_git_setup_change_branch("feature/test")
            self.assertTrue(result["ok"])
            self.assertEqual(result["step"], "checkout")
            self.assertEqual(manager.commands[-1][-2:], ["checkout", "feature/test"])

            with self.assertRaises(ValueError):
                await manager.async_git_setup_change_branch("-bad")

    async def test_git_setup_branch_pull_and_checkout_error_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _FakeGitOpsManager(root)

            manager.status.update({"repository": False})
            result = await manager.async_git_setup_change_branch("main")
            self.assertEqual(result["step"], "setup")

            manager.status.update(
                {
                    "repository": True,
                    "remote_uses_ssh": True,
                    "ssh_key_exists": False,
                    "remote_configured": True,
                }
            )
            result = await manager.async_git_setup_change_branch("main")
            self.assertEqual(result["step"], "ssh_key")

            manager.status.update({"remote_uses_ssh": False, "ssh_key_exists": False})
            manager.command_results = [_cmd(ok=False, stderr="fetch failed")]
            result = await manager.async_git_setup_change_branch("main")
            self.assertEqual(result["step"], "fetch")

            manager.status.update({"repository": False})
            result = await manager.async_git_setup_checkout_commit("abc123")
            self.assertEqual(result["step"], "setup")

            manager.status.update({"repository": True})
            manager.command_results = [_cmd(ok=False, stderr="bad commit")]
            result = await manager.async_git_setup_checkout_commit("abc123")
            self.assertEqual(result["step"], "verify")

            manager.command_results = [_cmd(ok=True), _cmd(ok=False, stderr="restore failed")]
            result = await manager.async_git_setup_checkout_commit("abc123")
            self.assertEqual(result["step"], "restore")
            self.assertFalse(result["ok"])

            manager.status.update({"branch": ""})
            manager.command_results = [
                _cmd(ok=True),
                _cmd(ok=True),
                _cmd(ok=True, stdout="origin/main\n"),
                _cmd(ok=True),
                _cmd(ok=False),
                _cmd(ok=False, stderr="checkout failed"),
                _cmd(ok=False, stderr="checkout failed"),
            ]
            result = await manager.async_git_setup_pull()
            self.assertEqual(result["step"], "checkout")
            self.assertFalse(result["ok"])

            manager.status.update({"branch": "main"})
            manager.command_results = [
                _cmd(ok=True),
                _cmd(ok=True),
                _cmd(stdout="not-a-number\n"),
                _cmd(ok=True),
            ]
            result = await manager.async_git_setup_pull()
            self.assertEqual(result["step"], "up_to_date")
            self.assertTrue(result["ok"])

            manager.command_results = [
                _cmd(ok=True),
                _cmd(ok=True),
                _cmd(stdout="2\n"),
                _cmd(ok=True),
            ]
            result = await manager.async_git_setup_pull()
            self.assertEqual(result["step"], "pull")
            self.assertTrue(result["ok"])

    async def test_git_setup_pull_commit_and_discard_failure_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _FakeGitOpsManager(root)
            manager.status = {
                "git_available": False,
                "repository": False,
                "branch": "",
                "remote_configured": False,
                "remote_uses_ssh": False,
                "ssh_key_exists": False,
            }
            result = await manager.async_git_setup_set_remote("https://example.test/repo.git")
            self.assertEqual(result["step"], "git")
            with self.assertRaises(ValueError):
                await manager.async_git_setup_set_remote("-bad")

            manager.status = {
                "git_available": True,
                "repository": False,
                "branch": "",
                "remote_configured": False,
                "remote_uses_ssh": False,
                "ssh_key_exists": False,
            }
            manager.command_results = [
                _cmd(ok=False, stderr="init failed"),
                _cmd(ok=False, stderr="init failed"),
            ]
            result = await manager.async_git_setup_set_remote("https://example.test/repo.git")
            self.assertEqual(result["step"], "init")

            manager.status.update({"repository": True, "remote_configured": False})
            manager.command_results = [
                _cmd(ok=False),
                _cmd(ok=True),
                _cmd(ok=True),
                _cmd(ok=True),
                _cmd(ok=True),
            ]
            result = await manager.async_git_setup_set_remote("https://example.test/repo.git")
            self.assertEqual(result["step"], "remote")

            manager.status.update({"repository": False, "remote_configured": False})
            result = await manager.async_git_setup_pull()
            self.assertEqual(result["step"], "setup")
            manager.status.update(
                {
                    "repository": True,
                    "remote_configured": True,
                    "remote_uses_ssh": True,
                    "ssh_key_exists": False,
                }
            )
            result = await manager.async_git_setup_pull()
            self.assertEqual(result["step"], "ssh_key")
            manager.status.update(
                {"remote_uses_ssh": False, "ssh_key_exists": False, "branch": "main"}
            )
            manager.command_results = [_cmd(ok=False, stderr="fetch failed")]
            result = await manager.async_git_setup_pull()
            self.assertEqual(result["step"], "fetch")

            with self.assertRaisesRegex(ValueError, "Commit message"):
                await manager.async_git_commit_push(" ", ["configuration.yaml"])
            with self.assertRaisesRegex(ValueError, "At least one"):
                await manager.async_git_discard([])

            manager.status_stdout = "?? new.yaml\n M configuration.yaml\n"
            manager.command_results = [
                _cmd(stdout=manager.status_stdout),
                _cmd(ok=False, stderr="restore failed"),
            ]
            result = await manager.async_git_discard(["configuration.yaml"])
            self.assertEqual(result["step"], "restore")

            manager.command_results = [
                _cmd(stdout=manager.status_stdout),
                _cmd(ok=True),
                _cmd(ok=False, stderr="commit failed"),
            ]
            result = await manager.async_git_commit_push("Update", ["configuration.yaml"])
            self.assertEqual(result["step"], "commit")

            manager.command_results = [
                _cmd(stdout=manager.status_stdout),
                _cmd(ok=False, stderr="add failed"),
            ]
            result = await manager.async_git_commit_push("Update", ["configuration.yaml"])
            self.assertEqual(result["step"], "add")

            manager.command_results = [
                _cmd(stdout=manager.status_stdout),
                _cmd(ok=True),
                _cmd(ok=True),
                _cmd(ok=False, stderr="push failed"),
            ]
            result = await manager.async_git_commit_push("Update", ["configuration.yaml"])
            self.assertEqual(result["step"], "push")
            self.assertFalse(result["ok"])

    async def test_git_review_selection_file_diff_and_changes_edge_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / "configuration.yaml").write_text("new\n", encoding="utf-8")
            manager = _FakeGitOpsManager(root)

            manager.status_stdout = " M configuration.yaml\n"
            manager.command_results = [_cmd(ok=False, stderr="status failed")]
            with self.assertRaisesRegex(ValueError, "status failed"):
                await manager._selected_git_review_files(["configuration.yaml"])

            manager.command_results = [_cmd(stdout=manager.status_stdout)]
            with self.assertRaisesRegex(ValueError, "not reviewable"):
                await manager._selected_git_review_files(["missing.yaml"])

            manager.command_results = [_cmd(stdout=manager.status_stdout)]
            selected = await manager._selected_git_review_files(
                ["configuration.yaml", {"path": "configuration.yaml"}]
            )
            self.assertEqual([item["path"] for item in selected], ["configuration.yaml"])

            self.assertEqual(
                manager._coerce_git_review_selection({"path": "new.yaml", "old_path": "old.yaml"}),
                ("new.yaml", "old.yaml"),
            )
            for unsafe in ("", "/abs.yaml", "a\0b.yaml", "folder/../config.yaml", "."):
                with self.assertRaises(ValueError):
                    manager._safe_review_display_path(unsafe)

            manager.head_paths = {"new.yaml"}
            self.assertEqual(
                manager._restore_pathspecs_for_selected_changes(
                    [
                        {
                            "path": "renamed.yaml",
                            "git_path": "renamed.yaml",
                            "old_git_path": "old.yaml",
                        },
                        {"path": "added.yaml", "code": "??"},
                        {"path": "new.yaml", "code": "??", "head_path": "new.yaml"},
                    ]
                ),
                ["old.yaml", "new.yaml"],
            )
            self.assertEqual(
                manager._untracked_changes_for_selected_discard(
                    [
                        {"path": "new.yaml", "code": "??"},
                        {
                            "path": "renamed.yaml",
                            "git_path": "renamed.yaml",
                            "old_git_path": "old.yaml",
                        },
                    ]
                )[1]["path"],
                "renamed.yaml",
            )

            manager.command_results = [_cmd(stdout=" M configuration.yaml\n")]
            self.assertTrue((await manager.async_git_status())["ok"])
            self.assertTrue((await manager.async_git_diff())["ok"])

            manager.status_stdout = (
                "D  homeassistant/configuration.yaml\n?? config/configuration.yaml\n"
            )
            manager.head_paths = {"homeassistant/configuration.yaml"}
            manager.command_results = [
                _cmd(stdout=manager.status_stdout),
                _cmd(stdout="bad\n2\t1\tconfig/configuration.yaml\n"),
                _cmd(stdout="old\n"),
            ]
            changes = await manager.async_git_changes()
            self.assertTrue(changes["ok"])
            self.assertEqual(changes["changed_count"], 1)

            manager.status_stdout = " M configuration.yaml\n"
            manager.head_paths = {"configuration.yaml"}
            manager.command_results = [
                _cmd(stdout=manager.status_stdout),
                _cmd(ok=True, stdout=""),
                _cmd(stdout="old\n"),
            ]
            diff = await manager.async_git_file_diff("configuration.yaml")
            self.assertTrue(diff["ok"])
            self.assertEqual(diff["added_lines"], 1)
            self.assertEqual(diff["deleted_lines"], 1)

            manager.command_results = [_cmd(stdout="old\n")]
            (root / "missing.yaml").unlink(missing_ok=True)
            diff = await manager._git_patch_against_head_file("head.yaml", "missing.yaml")
            self.assertFalse(diff["ok"])

    async def test_git_low_level_helpers_cover_paths_refs_and_commands(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _FakeGitOpsManager(root)

            self.assertEqual(
                manager._worktree_file_for_diff(str(root / "abs.yaml")), root / "abs.yaml"
            )
            nested = root / "homeassistant" / "nested.yaml"
            nested.parent.mkdir()
            nested.write_text("nested\n", encoding="utf-8")
            self.assertEqual(manager._worktree_file_for_diff("nested.yaml"), nested)
            self.assertEqual(
                manager._patch_line_stats("--- a\n+++ b\n-old\n+new\n context"),
                {"added_lines": 1, "deleted_lines": 1},
            )

            with self.assertRaises(ValueError):
                manager._safe_git_commit_ref("")
            with self.assertRaises(ValueError):
                manager._safe_git_commit_ref("g" * 41)
            self.assertEqual(manager._safe_git_commit_ref("ABC123"), "ABC123")

            ssh_dir = root / ".ssh"
            ssh_dir.mkdir()
            (ssh_dir / "ha_codex_ed25519").write_text("private", encoding="utf-8")
            self.assertIn("StrictHostKeyChecking=accept-new", manager._git_ssh_command())
            self.assertIn("core.sshCommand", " ".join(manager._git_command(["status"])))

            workspace_root = root / "workspace"
            workspace_root.mkdir()
            workspace_git = workspace_root / ".git-real"
            workspace_git.mkdir()
            workspace_manager = _FakeGitOpsManager(root)
            workspace_manager.workspace_path = str(workspace_root)
            command = workspace_manager._git_command(["status"])
            self.assertIn(f"--git-dir={workspace_git}", command)

            config_path = workspace_git / "config"
            config_path.write_text("[core]\n\tworktree = ../wt\n", encoding="utf-8")
            self.assertTrue(
                workspace_manager._git_work_tree(workspace_git, workspace_root).endswith("wt")
            )
            config_path.write_text("[core\nbroken", encoding="utf-8")
            self.assertEqual(
                workspace_manager._git_config_value(config_path, "core", "worktree"), ""
            )

            with patch("custom_components.ha_codex.git_ops.subprocess.run") as run:
                run.return_value = types.SimpleNamespace(returncode=0)
                self.assertTrue(
                    GitOperationsMixin._head_path_exists(workspace_manager, "configuration.yaml")
                )

            empty_command_manager = _FakeGitOpsManager(root)
            empty_command_manager._git_command = lambda _args: ["git"]
            self.assertEqual(empty_command_manager._git_work_tree_from_command(), str(root))

            self.assertEqual(
                manager._parse_git_numstat("1\t2\told => {nested/new}.yaml\n")["nested/new}.yaml"],
                {"added_lines": 1, "deleted_lines": 2},
            )

    async def test_git_discard_and_default_branch_remaining_error_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _FakeGitOpsManager(root)
            manager.status_stdout = "?? new.yaml\n"

            async def remove_failed(_files):
                return _cmd(ok=False, stderr="remove failed", returncode=1)

            manager._remove_untracked_review_files = remove_failed
            manager.command_results = [_cmd(stdout=manager.status_stdout)]
            result = await manager.async_git_discard(["new.yaml"])
            self.assertEqual(result["step"], "remove")

            manager = _FakeGitOpsManager(root)
            manager.status_stdout = "?? new.yaml\n"

            def unsafe_target(_path):
                raise ValueError("unsafe path: new.yaml")

            manager._safe_worktree_file_for_discard = unsafe_target
            result = await manager._remove_untracked_review_files([{"path": "new.yaml"}])
            self.assertFalse(result["ok"])
            self.assertIn("unsafe path", result["stderr"])

            manager = _FakeGitOpsManager(root)
            target = root / "new.yaml"
            target.write_text("new\n", encoding="utf-8")
            manager._safe_worktree_file_for_discard = lambda _path: target
            with patch.object(Path, "unlink", side_effect=OSError("cannot unlink")):
                result = await manager._remove_untracked_review_files([{"path": "new.yaml"}])
            self.assertFalse(result["ok"])
            self.assertIn("cannot unlink", result["stderr"])

            manager = _FakeGitOpsManager(root)
            outside = Path("/outside/changed.yaml")
            manager._worktree_file_for_diff = lambda _path: outside
            with self.assertRaisesRegex(ValueError, "unsafe path"):
                manager._safe_worktree_file_for_discard("changed.yaml")

            manager = _FakeGitOpsManager(root)
            manager.command_results = [
                _cmd(ok=False),
                _cmd(ok=False),
                _cmd(ok=False),
                _cmd(stdout="origin/HEAD\norigin/feature/test\n"),
            ]
            self.assertEqual(await manager._git_remote_default_branch(), "feature/test")


class GitReviewOperationTests(unittest.IsolatedAsyncioTestCase):
    async def test_git_setup_status_requires_origin_remote(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp) / "repo"
            root.mkdir()
            subprocess.run(
                ["git", "init", "-b", "main", str(root)],
                text=True,
                capture_output=True,
                check=True,
            )
            manager = _make_manager(root)

            status = await manager.async_git_setup_status()

        self.assertTrue(status["git_available"], status)
        self.assertTrue(status["repository"], status)
        self.assertFalse(status["remote_configured"], status)
        self.assertFalse(status["setup_complete"], status)
        self.assertIn("origin remote", status["missing"])

    async def test_git_setup_set_remote_initializes_config_repo(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp) / "repo"
            remote = Path(tmp) / "remote.git"
            root.mkdir()
            subprocess.run(
                ["git", "init", "--bare", str(remote)],
                text=True,
                capture_output=True,
                check=True,
            )
            manager = _make_manager(root)

            result = await manager.async_git_setup_set_remote(str(remote))

            self.assertTrue(result["ok"], result)
            self.assertTrue((root / ".git").is_dir())
            self.assertEqual(_git(root, "remote", "get-url", "origin").stdout.strip(), str(remote))
            self.assertTrue(result["status"]["setup_complete"], result)

    async def test_git_setup_pull_fast_forwards_current_branch(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, remote = _create_git_repo(Path(tmp))
            upstream = Path(tmp) / "upstream"
            subprocess.run(
                ["git", "clone", str(remote), str(upstream)],
                text=True,
                capture_output=True,
                check=True,
            )
            _git(upstream, "config", "user.email", "ha-codex@example.test")
            _git(upstream, "config", "user.name", "HA Codex")
            (upstream / "configuration.yaml").write_text(
                "homeassistant:\n  name: Pulled\n",
                encoding="utf-8",
            )
            _git(upstream, "commit", "-am", "remote update")
            _git(upstream, "push", "origin", "main")
            manager = _make_manager(root)

            result = await manager.async_git_setup_pull()

            self.assertTrue(result["ok"], result)
            self.assertEqual(
                (root / "configuration.yaml").read_text(encoding="utf-8"),
                "homeassistant:\n  name: Pulled\n",
            )

    async def test_git_setup_change_branch_checks_out_remote_branch(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, remote = _create_git_repo(Path(tmp))
            upstream = Path(tmp) / "upstream"
            subprocess.run(
                ["git", "clone", str(remote), str(upstream)],
                text=True,
                capture_output=True,
                check=True,
            )
            _git(upstream, "config", "user.email", "ha-codex@example.test")
            _git(upstream, "config", "user.name", "HA Codex")
            _git(upstream, "checkout", "-b", "dev")
            (upstream / "configuration.yaml").write_text(
                "homeassistant:\n  name: Dev\n",
                encoding="utf-8",
            )
            _git(upstream, "commit", "-am", "dev branch")
            _git(upstream, "push", "origin", "dev")
            manager = _make_manager(root)

            result = await manager.async_git_setup_change_branch("dev")

            self.assertTrue(result["ok"], result)
            self.assertEqual(result["step"], "checkout")
            self.assertEqual(_git(root, "branch", "--show-current").stdout.strip(), "dev")
            self.assertEqual(
                (root / "configuration.yaml").read_text(encoding="utf-8"),
                "homeassistant:\n  name: Dev\n",
            )
            self.assertEqual(result["status"]["branch"], "dev")
            self.assertEqual(result["status"]["history"][0]["subject"], "dev branch")

    async def test_git_setup_checkout_commit_restores_previous_config(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            first_commit = _git(root, "rev-parse", "HEAD").stdout.strip()
            (root / "configuration.yaml").write_text(
                "homeassistant:\n  name: Newer\n",
                encoding="utf-8",
            )
            (root / "automations.yaml").write_text("[]\n", encoding="utf-8")
            _git(root, "add", "configuration.yaml", "automations.yaml")
            _git(root, "commit", "-am", "newer config")
            latest_commit = _git(root, "rev-parse", "HEAD").stdout.strip()
            manager = _make_manager(root)

            result = await manager.async_git_setup_checkout_commit(first_commit)

            self.assertTrue(result["ok"], result)
            self.assertEqual(result["step"], "restore")
            self.assertEqual(
                (root / "configuration.yaml").read_text(encoding="utf-8"),
                "homeassistant:\n  name: Base\n",
            )
            self.assertFalse((root / "automations.yaml").exists())
            self.assertEqual(_git(root, "rev-parse", "HEAD").stdout.strip(), latest_commit)
            self.assertEqual(_git(root, "branch", "--show-current").stdout.strip(), "main")
            self.assertIn("M  configuration.yaml", _git(root, "status", "--short").stdout)

    async def test_git_setup_checkout_commit_restores_with_git_real_metadata(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            first_commit = _git(root, "rev-parse", "HEAD").stdout.strip()
            (root / "configuration.yaml").write_text(
                "homeassistant:\n  name: Newer\n",
                encoding="utf-8",
            )
            _git(root, "commit", "-am", "newer config")
            (root / ".git").rename(root / ".git-real")
            manager = _make_manager(root)

            result = await manager.async_git_setup_checkout_commit(first_commit)

            self.assertTrue(result["ok"], result)
            self.assertEqual(result["step"], "restore")
            self.assertEqual(
                (root / "configuration.yaml").read_text(encoding="utf-8"),
                "homeassistant:\n  name: Base\n",
            )

    async def test_git_setup_restore_commit_keeps_setup_on_current_branch(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            first_commit = _git(root, "rev-parse", "HEAD").stdout.strip()
            (root / "configuration.yaml").write_text(
                "homeassistant:\n  name: Newer\n",
                encoding="utf-8",
            )
            _git(root, "commit", "-am", "newer config")
            manager = _make_manager(root)

            result = await manager.async_git_setup_checkout_commit(first_commit)
            status = result["status"]

            self.assertTrue(result["ok"], result)
            self.assertEqual(status["branch"], "main")
            self.assertTrue(status["setup_complete"], status)
            self.assertNotIn("current branch", status["missing"])

    async def test_git_setup_pull_recovers_from_detached_commit(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, remote = _create_git_repo(Path(tmp))
            first_commit = _git(root, "rev-parse", "HEAD").stdout.strip()
            upstream = Path(tmp) / "upstream"
            subprocess.run(
                ["git", "clone", str(remote), str(upstream)],
                text=True,
                capture_output=True,
                check=True,
            )
            _git(upstream, "config", "user.email", "ha-codex@example.test")
            _git(upstream, "config", "user.name", "HA Codex")
            (upstream / "configuration.yaml").write_text(
                "homeassistant:\n  name: Pulled\n",
                encoding="utf-8",
            )
            _git(upstream, "commit", "-am", "remote update")
            _git(upstream, "push", "origin", "main")
            manager = _make_manager(root)
            _git(root, "checkout", first_commit)

            result = await manager.async_git_setup_pull()

            self.assertTrue(result["ok"], result)
            self.assertEqual(_git(root, "branch", "--show-current").stdout.strip(), "main")
            self.assertEqual(
                (root / "configuration.yaml").read_text(encoding="utf-8"),
                "homeassistant:\n  name: Pulled\n",
            )

    async def test_git_setup_change_branch_recovers_from_detached_commit(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root, _remote = _create_git_repo(Path(tmp))
            first_commit = _git(root, "rev-parse", "HEAD").stdout.strip()
            (root / "configuration.yaml").write_text(
                "homeassistant:\n  name: Newer\n",
                encoding="utf-8",
            )
            _git(root, "commit", "-am", "newer config")
            manager = _make_manager(root)
            _git(root, "checkout", first_commit)

            result = await manager.async_git_setup_change_branch("main")

            self.assertTrue(result["ok"], result)
            self.assertEqual(_git(root, "branch", "--show-current").stdout.strip(), "main")
            self.assertEqual(
                (root / "configuration.yaml").read_text(encoding="utf-8"),
                "homeassistant:\n  name: Newer\n",
            )

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
    async def test_rollback_marks_unavailable_checkpoints_blocked(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _make_manager(root)
            manager.async_save = _async_noop
            session = CodexSession(id="session-1")
            checkpoint = {"id": "checkpoint-1", "status": "created", "targets": []}
            session.metadata["rollback_checkpoints"] = [checkpoint]
            session.messages.append(
                ChatMessage(
                    role="event",
                    content="Rollback",
                    metadata={"rollback": {"checkpoint_id": "checkpoint-1"}},
                )
            )
            manager.sessions[session.id] = session

            result = await manager.async_rollback_run(session.id, "checkpoint-1")

            self.assertFalse(result["ok"])
            self.assertEqual(checkpoint["rollback_status"], "blocked")
            self.assertEqual(
                session.messages[0].metadata["rollback"]["status"],
                "blocked",
            )
            with self.assertRaisesRegex(ValueError, "Unknown rollback checkpoint"):
                manager._find_checkpoint(session, "missing")

    async def test_rollback_snapshot_helpers_cover_absent_binary_and_unavailable_states(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _make_manager(root)
            binary = root / "binary.bin"
            binary.write_bytes(b"\xff\x00")
            large = root / "large.txt"
            large.write_bytes(b"x" * 1_100_000)

            self.assertEqual(
                manager._file_snapshot_for_rollback("missing.yaml", True), {"state": "absent"}
            )
            self.assertEqual(
                manager._file_snapshot_for_rollback("binary.bin", True)["encoding"], "base64"
            )
            self.assertEqual(
                manager._file_snapshot_for_rollback("large.txt", True)["state"], "too_large"
            )

            target = root / "restore.yaml"
            manager._restore_rollback_target("restore.yaml", {"state": "absent"})
            self.assertFalse(target.exists())
            with self.assertRaisesRegex(ValueError, "snapshot is unavailable"):
                manager._restore_rollback_target("restore.yaml", {"state": "too_large"})
            manager._restore_rollback_target(
                "restore.yaml",
                {"state": "file", "encoding": "base64", "content_b64": "dmFsdWU6IDEK"},
            )
            self.assertEqual(target.read_text(encoding="utf-8"), "value: 1\n")
            self.assertEqual(
                manager._rollback_head_path_candidates("configuration.yaml"),
                [
                    "configuration.yaml",
                    "homeassistant/configuration.yaml",
                    "config/configuration.yaml",
                ],
            )

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


class BridgeControlTests(unittest.IsolatedAsyncioTestCase):
    async def test_start_bridge_service_uses_health_packaged_and_legacy_paths(self):
        import custom_components.ha_codex.bridge_control as bridge_control

        original_health = bridge_control._async_bridge_health
        original_packaged = bridge_control._async_start_packaged_bridge
        original_legacy = bridge_control._async_run_first_legacy_command
        try:

            async def healthy():
                return {"ok": True, "status": 200}

            bridge_control._async_bridge_health = healthy
            result = await bridge_control.async_start_bridge_service()
            self.assertTrue(result["already_running"])

            async def unhealthy():
                return {"ok": False}

            async def packaged_ok(_hass=None):
                return {"ok": True, "pid": 123}

            bridge_control._async_bridge_health = unhealthy
            bridge_control._async_start_packaged_bridge = packaged_ok
            result = await bridge_control.async_start_bridge_service()
            self.assertEqual(result["pid"], 123)

            async def packaged_failed(_hass=None):
                return {"ok": False, "error": "packaged failed"}

            async def legacy_ok(_commands):
                return {"ok": True, "stdout": "started"}

            bridge_control._async_start_packaged_bridge = packaged_failed
            bridge_control._async_run_first_legacy_command = legacy_ok
            result = await bridge_control.async_start_bridge_service()
            self.assertTrue(result["legacy_helper"])

            async def legacy_failed(_commands):
                return {"ok": False, "error": "legacy failed"}

            bridge_control._async_run_first_legacy_command = legacy_failed
            result = await bridge_control.async_start_bridge_service()
            self.assertFalse(result["ok"])
            self.assertEqual(result["error"], "packaged failed")
        finally:
            bridge_control._async_bridge_health = original_health
            bridge_control._async_start_packaged_bridge = original_packaged
            bridge_control._async_run_first_legacy_command = original_legacy

    async def test_restart_bridge_service_reports_stopped_pids_and_failures(self):
        import custom_components.ha_codex.bridge_control as bridge_control

        original_stop = bridge_control._async_stop_bridge_processes
        original_packaged = bridge_control._async_start_packaged_bridge
        original_legacy = bridge_control._async_run_first_legacy_command
        try:

            async def stopped():
                return {"ok": True, "pids": [101, 102]}

            async def packaged_ok(_hass=None):
                return {"ok": True, "pid": 103}

            bridge_control._async_stop_bridge_processes = stopped
            bridge_control._async_start_packaged_bridge = packaged_ok
            result = await bridge_control.async_restart_bridge_service()
            self.assertEqual(result["stopped_pids"], [101, 102])

            async def packaged_failed(_hass=None):
                return {"ok": False, "error": "cannot start"}

            async def legacy_ok(_commands):
                return {"ok": True, "stdout": "legacy restarted"}

            bridge_control._async_start_packaged_bridge = packaged_failed
            bridge_control._async_run_first_legacy_command = legacy_ok
            result = await bridge_control.async_restart_bridge_service()
            self.assertTrue(result["legacy_helper"])
            self.assertEqual(result["stopped_pids"], [101, 102])

            async def legacy_failed(_commands):
                return {"ok": False, "error": "cannot restart"}

            bridge_control._async_run_first_legacy_command = legacy_failed
            result = await bridge_control.async_restart_bridge_service()
            self.assertFalse(result["ok"])
            self.assertEqual(result["stopped"]["pids"], [101, 102])
        finally:
            bridge_control._async_stop_bridge_processes = original_stop
            bridge_control._async_start_packaged_bridge = original_packaged
            bridge_control._async_run_first_legacy_command = original_legacy

    async def test_packaged_bridge_start_reports_missing_script_spawn_errors_and_health(self):
        import custom_components.ha_codex.bridge_control as bridge_control

        original_script = bridge_control.BRIDGE_SCRIPT
        original_create = bridge_control.asyncio.create_subprocess_exec
        original_wait = bridge_control._async_wait_for_bridge_health
        try:
            with TemporaryDirectory() as tmp:
                root = Path(tmp)
                bridge_control.BRIDGE_SCRIPT = root / "missing.py"
                result = await bridge_control._async_start_packaged_bridge(_FakeHass(root))
                self.assertFalse(result["ok"])
                self.assertIn("not found", result["error"])

                script = root / "bridge.py"
                script.write_text("print('bridge')\n", encoding="utf-8")
                bridge_control.BRIDGE_SCRIPT = script

                async def spawn_os_error(*_args, **_kwargs):
                    raise OSError("cannot spawn")

                bridge_control.asyncio.create_subprocess_exec = spawn_os_error
                result = await bridge_control._async_start_packaged_bridge(_FakeHass(root))
                self.assertFalse(result["ok"])
                self.assertEqual(result["error"], "cannot spawn")

                async def spawn_ok(*_args, **_kwargs):
                    return types.SimpleNamespace(pid=456)

                async def health_ok():
                    return {"ok": True, "status": 200}

                bridge_control.asyncio.create_subprocess_exec = spawn_ok
                bridge_control._async_wait_for_bridge_health = health_ok
                result = await bridge_control._async_start_packaged_bridge(_FakeHass(root))
                self.assertTrue(result["ok"])
                self.assertEqual(result["pid"], 456)

                async def health_failed():
                    return {"ok": False, "error": "timeout"}

                bridge_control._async_wait_for_bridge_health = health_failed
                result = await bridge_control._async_start_packaged_bridge(_FakeHass(root))
                self.assertFalse(result["ok"])
                self.assertEqual(result["error"], "timeout")
        finally:
            bridge_control.BRIDGE_SCRIPT = original_script
            bridge_control.asyncio.create_subprocess_exec = original_create
            bridge_control._async_wait_for_bridge_health = original_wait

    async def test_process_helpers_parse_pids_run_legacy_commands_and_wait_for_health(self):
        import custom_components.ha_codex.bridge_control as bridge_control

        original_create = bridge_control.asyncio.create_subprocess_exec
        original_health = bridge_control._async_bridge_health
        original_sleep = bridge_control.asyncio.sleep
        original_monotonic = bridge_control.time.monotonic
        try:

            class FakeProcess:
                def __init__(self, returncode, stdout=b"", stderr=b""):
                    self.returncode = returncode
                    self._stdout = stdout
                    self._stderr = stderr

                async def communicate(self):
                    return self._stdout, self._stderr

            async def pgrep_ok(*command, **_kwargs):
                self.assertEqual(command[:2], ("pgrep", "-f"))
                return FakeProcess(0, b"123\nbad\n456\n")

            bridge_control.asyncio.create_subprocess_exec = pgrep_ok
            self.assertEqual(await bridge_control._async_bridge_pids(), [123, 456])

            async def pgrep_missing(*_args, **_kwargs):
                raise OSError("missing")

            bridge_control.asyncio.create_subprocess_exec = pgrep_missing
            self.assertEqual(await bridge_control._async_bridge_pids(), [])

            async def pgrep_error(*_args, **_kwargs):
                return FakeProcess(2, b"999\n", b"error")

            bridge_control.asyncio.create_subprocess_exec = pgrep_error
            self.assertEqual(await bridge_control._async_bridge_pids(), [])

            attempts = []

            async def legacy_process(command, **_kwargs):
                attempts.append(command)
                if command == "missing":
                    raise OSError("missing")
                if command == "fails":
                    return FakeProcess(1, b"bad stdout", b"bad stderr")
                return FakeProcess(0, b"ok", b"")

            bridge_control.asyncio.create_subprocess_exec = legacy_process
            result = await bridge_control._async_run_first_legacy_command(
                ("missing", "fails", "works")
            )
            self.assertTrue(result["ok"])
            self.assertEqual(result["command"], "works")
            self.assertEqual(attempts, ["missing", "fails", "works"])

            attempts.clear()
            result = await bridge_control._async_run_first_legacy_command(("missing", "fails"))
            self.assertFalse(result["ok"])
            self.assertEqual(result["error"], "bad stderr")

            health_results = iter([{"ok": False}, {"ok": True, "status": 200}])

            async def health_sequence():
                return next(health_results)

            async def no_sleep(_delay):
                return None

            bridge_control._async_bridge_health = health_sequence
            bridge_control.asyncio.sleep = no_sleep
            self.assertEqual(
                await bridge_control._async_wait_for_bridge_health(), {"ok": True, "status": 200}
            )

            bridge_control.time.monotonic = _sequence_function([0, 0, 11])
            bridge_control._async_bridge_health = lambda: _async_value(
                {"ok": False, "error": "down"}
            )
            self.assertEqual(
                await bridge_control._async_wait_for_bridge_health(),
                {"ok": False, "error": "down"},
            )
        finally:
            bridge_control.asyncio.create_subprocess_exec = original_create
            bridge_control._async_bridge_health = original_health
            bridge_control.asyncio.sleep = original_sleep
            bridge_control.time.monotonic = original_monotonic

    async def test_bridge_health_config_dir_and_stop_process_helpers_are_bounded(self):
        import custom_components.ha_codex.bridge_control as bridge_control

        original_urlopen = bridge_control.urlopen
        original_pids = bridge_control._async_bridge_pids
        original_getpid = bridge_control.os.getpid
        original_kill = bridge_control.os.kill
        original_exists = bridge_control._pid_exists
        original_sleep = bridge_control.asyncio.sleep
        original_monotonic = bridge_control.time.monotonic
        original_script = bridge_control.BRIDGE_SCRIPT
        try:

            class FakeResponse:
                status = 200

                def __enter__(self):
                    return self

                def __exit__(self, *_args):
                    return False

            bridge_control.urlopen = lambda *_args, **_kwargs: FakeResponse()
            self.assertEqual(
                await bridge_control._async_bridge_health(), {"ok": True, "status": 200}
            )

            def raise_url_error(*_args, **_kwargs):
                raise OSError("offline")

            bridge_control.urlopen = raise_url_error
            result = await bridge_control._async_bridge_health()
            self.assertFalse(result["ok"])
            self.assertIn("offline", result["error"])

            self.assertEqual(bridge_control._config_dir(_FakeHass("/config")), Path("/config"))
            with TemporaryDirectory() as tmp:
                script = Path(tmp) / "one" / "two" / "three" / "bridge.py"
                script.parent.mkdir(parents=True)
                bridge_control.BRIDGE_SCRIPT = script
                self.assertEqual(bridge_control._config_dir(None), script.parents[3])
                root = Path(tmp) / "ha"
                integration = root / "custom_components" / "ha_codex"
                integration.mkdir(parents=True)
                bridge_control.BRIDGE_SCRIPT = integration / "bridge" / "ha_codex_bridge.py"
                self.assertEqual(bridge_control._config_dir(None), root)

            async def pids():
                return [999, 1000]

            killed = []
            bridge_control._async_bridge_pids = pids
            bridge_control.os.getpid = lambda: 999
            bridge_control.os.kill = lambda pid, sig: killed.append((pid, sig))
            bridge_control._pid_exists = lambda _pid: False
            bridge_control.asyncio.sleep = lambda _delay: _async_noop()
            result = await bridge_control._async_stop_bridge_processes()
            self.assertEqual(result["pids"], [1000])
            self.assertEqual(killed, [(1000, bridge_control.signal.SIGTERM)])

            bridge_control.os.kill = lambda _pid, _sig: (_ for _ in ()).throw(ProcessLookupError())
            bridge_control._pid_exists = original_exists
            self.assertEqual(bridge_control._pid_exists(123), False)

            bridge_control.os.kill = lambda _pid, _sig: (_ for _ in ()).throw(OSError("denied"))
            self.assertTrue(bridge_control._pid_exists(123))

            bridge_control.os.kill = lambda _pid, _sig: None
            self.assertTrue(bridge_control._pid_exists(123))

            async def stubborn_pids():
                return [1001, 1002, 1003]

            killed = []

            def kill_sequence(pid, sig):
                killed.append((pid, sig))
                if pid == 1001:
                    raise ProcessLookupError()
                if pid == 1002:
                    raise OSError("denied")
                if sig == bridge_control.signal.SIGKILL:
                    raise OSError("cannot kill")

            bridge_control._async_bridge_pids = stubborn_pids
            bridge_control.os.getpid = lambda: 999
            bridge_control.os.kill = kill_sequence
            bridge_control._pid_exists = lambda _pid: True
            bridge_control.time.monotonic = _sequence_function([0, 0, 6])
            result = await bridge_control._async_stop_bridge_processes()
            self.assertEqual(result["pids"], [1003])
            self.assertIn((1003, bridge_control.signal.SIGKILL), killed)
        finally:
            bridge_control.urlopen = original_urlopen
            bridge_control._async_bridge_pids = original_pids
            bridge_control.os.getpid = original_getpid
            bridge_control.os.kill = original_kill
            bridge_control._pid_exists = original_exists
            bridge_control.asyncio.sleep = original_sleep
            bridge_control.time.monotonic = original_monotonic
            bridge_control.BRIDGE_SCRIPT = original_script


class WebsocketCommandTests(unittest.IsolatedAsyncioTestCase):
    async def test_websocket_commands_delegate_to_manager(self):
        websocket = _load_websocket_module()
        manager = _FakeWebsocketManager()
        websocket.CodexManager = _FakeWebsocketManager
        hass = types.SimpleNamespace(data={websocket.DOMAIN: manager}, registered_commands=[])
        connection = _FakeConnection()

        websocket.async_register_commands(hass)
        self.assertGreaterEqual(len(hass.registered_commands), 40)

        await websocket.websocket_status(hass, connection, {"id": 1})
        await websocket.websocket_settings_get(hass, connection, {"id": 2})
        await websocket.websocket_settings_update(
            hass, connection, {"id": 3, "settings": {"plan": "auto"}}
        )
        await websocket.websocket_bridge_log(hass, connection, {"id": 4, "lines": 25})
        await websocket.websocket_bridge_log_clear(hass, connection, {"id": 5})
        await websocket.websocket_bridge_restart(hass, connection, {"id": 6})
        await websocket.websocket_core_restart(hass, connection, {"id": 7})
        await websocket.websocket_account_status(hass, connection, {"id": 8})
        await websocket.websocket_account_device_login_start(hass, connection, {"id": 9})
        await websocket.websocket_account_device_login_status(hass, connection, {"id": 10})
        await websocket.websocket_account_device_login_cancel(hass, connection, {"id": 11})
        await websocket.websocket_account_logout(hass, connection, {"id": 12})
        await websocket.websocket_context_logs(hass, connection, {"id": 13, "lines": 50})
        await websocket.websocket_context_config_files(hass, connection, {"id": 14})
        await websocket.websocket_context_config_file(
            hass,
            connection,
            {"id": 15, "path": "configuration.yaml"},
        )
        websocket.websocket_sessions_list(hass, connection, {"id": 16})
        websocket.websocket_sessions_last_message_id(
            hass,
            connection,
            {"id": 17, "session_id": "session-1"},
        )
        websocket.websocket_sessions_message(
            hass,
            connection,
            {"id": 18, "session_id": "session-1", "message_id": 2},
        )
        websocket.websocket_sessions_messages_after(
            hass,
            connection,
            {"id": 19, "session_id": "session-1", "after_id": 1, "limit": 3},
        )
        await websocket.websocket_sessions_create(hass, connection, {"id": 20, "title": "New"})
        await websocket.websocket_sessions_send(
            hass,
            connection,
            {
                "id": 21,
                "session_id": "session-1",
                "prompt": "Fix it",
                "context": [{"kind": "entity"}],
                "run_prompt": "Run this",
                "metadata": {"source": "test"},
                "run_settings": {"model": "gpt-5"},
            },
        )
        await websocket.websocket_sessions_run_settings_update(
            hass,
            connection,
            {"id": 22, "session_id": "session-1", "run_settings": {"model": "gpt-5"}},
        )
        await websocket.websocket_sessions_run_plan_respond(
            hass,
            connection,
            {"id": 23, "session_id": "session-1", "plan_id": "plan-1", "action": "approve"},
        )
        await websocket.websocket_sessions_rollback_run(
            hass,
            connection,
            {"id": 24, "session_id": "session-1", "checkpoint_id": "checkpoint-1"},
        )
        await websocket.websocket_sessions_steer(
            hass,
            connection,
            {
                "id": 25,
                "session_id": "session-1",
                "prompt": "Continue",
                "context": [],
                "run_prompt": "Continue run",
                "metadata": {},
                "run_settings": {},
            },
        )
        await websocket.websocket_sessions_retry_continue(
            hass,
            connection,
            {"id": 26, "session_id": "session-1"},
        )
        await websocket.websocket_sessions_cancel(
            hass, connection, {"id": 27, "session_id": "session-1"}
        )
        await websocket.websocket_sessions_rename(
            hass,
            connection,
            {"id": 28, "session_id": "session-1", "title": "Renamed"},
        )
        await websocket.websocket_sessions_delete(
            hass,
            connection,
            {"id": 29, "session_id": "session-1"},
        )
        await websocket.websocket_sessions_archive(
            hass,
            connection,
            {"id": 30, "session_id": "session-1", "archived": True},
        )
        await websocket.websocket_sessions_archive(
            hass,
            connection,
            {"id": 31, "session_id": "delete-me", "archived": True},
        )
        await websocket.websocket_approvals_respond(
            hass,
            connection,
            {"id": 32, "session_id": "session-1", "approval_id": "approval-1", "approved": True},
        )
        await websocket.websocket_git_status(hass, connection, {"id": 33})
        await websocket.websocket_git_setup_status(hass, connection, {"id": 34})
        await websocket.websocket_git_setup_generate_key(hass, connection, {"id": 35})
        await websocket.websocket_git_setup_set_remote(
            hass,
            connection,
            {"id": 36, "remote_url": "git@example.com:repo.git"},
        )
        await websocket.websocket_git_setup_pull(hass, connection, {"id": 37})
        await websocket.websocket_git_setup_change_branch(
            hass,
            connection,
            {"id": 38, "branch": "main"},
        )
        await websocket.websocket_git_setup_checkout_commit(
            hass,
            connection,
            {"id": 39, "commit": "abc123d"},
        )
        await websocket.websocket_git_diff(hass, connection, {"id": 40})
        await websocket.websocket_git_changes(hass, connection, {"id": 41})
        await websocket.websocket_git_file_diff(
            hass,
            connection,
            {"id": 42, "path": "configuration.yaml", "old_path": "old.yaml"},
        )
        await websocket.websocket_git_commit_push(
            hass,
            connection,
            {"id": 43, "message": "Update config", "files": ["configuration.yaml"]},
        )
        await websocket.websocket_git_discard(
            hass,
            connection,
            {"id": 44, "files": [{"path": "configuration.yaml"}]},
        )
        await websocket.websocket_validation_run(
            hass, connection, {"id": 45, "session_id": "session-1"}
        )
        await websocket.websocket_validation_reload(
            hass,
            connection,
            {"id": 46, "domains": ["automation"]},
        )

        results = dict(connection.results)
        self.assertEqual(results[1], {"status": "ok"})
        self.assertEqual(results[3], {"settings": {"plan": "auto"}})
        self.assertEqual(results[15]["path"], "configuration.yaml")
        self.assertEqual(results[17], {"last_message_id": 2})
        self.assertEqual(results[21], {"session": {"id": "session-1", "payload": True}})
        self.assertEqual(results[24], {"rolled_back": "checkpoint-1"})
        self.assertEqual(results[29], {"deleted_session_id": "session-1"})
        self.assertEqual(results[31], {"deleted_session_id": "delete-me"})
        self.assertEqual(results[36]["remote_url"], "git@example.com:repo.git")
        self.assertEqual(results[38]["branch"], "main")
        self.assertEqual(results[39]["commit"], "abc123d")
        self.assertEqual(results[42]["old_path"], "old.yaml")
        self.assertEqual(results[45]["validation"]["status"], "passed")
        self.assertIn(("send", "session-1", "Fix it", "Run this"), manager.calls)

    async def test_git_setup_websocket_errors_return_diagnostics(self):
        websocket = _load_websocket_module()
        manager = _FakeWebsocketManager()
        websocket.CodexManager = _FakeWebsocketManager
        hass = types.SimpleNamespace(data={websocket.DOMAIN: manager})
        connection = _FakeConnection()

        async def fail_status():
            raise RuntimeError("blocking call in setup status")

        async def fail_pull():
            raise RuntimeError("pull exploded")

        async def fail_branch(_branch):
            raise RuntimeError("branch exploded")

        async def fail_restore(_commit):
            raise RuntimeError("restore exploded")

        manager.async_git_setup_status = fail_status
        manager.async_git_setup_pull = fail_pull
        manager.async_git_setup_change_branch = fail_branch
        manager.async_git_setup_checkout_commit = fail_restore

        await websocket.websocket_git_setup_status(hass, connection, {"id": 1})
        await websocket.websocket_git_setup_pull(hass, connection, {"id": 2})
        await websocket.websocket_git_setup_change_branch(
            hass, connection, {"id": 3, "branch": "main"}
        )
        await websocket.websocket_git_setup_checkout_commit(
            hass, connection, {"id": 4, "commit": "abc123d"}
        )

        results = dict(connection.results)
        self.assertEqual(results[1]["ok"], False)
        self.assertEqual(results[1]["setup_complete"], False)
        self.assertEqual(results[1]["missing"], ["setup status"])
        self.assertEqual(results[1]["repo_error"], "RuntimeError: blocking call in setup status")
        self.assertEqual(
            results[2],
            {"ok": False, "step": "pull", "stderr": "RuntimeError: pull exploded"},
        )
        self.assertEqual(
            results[3],
            {"ok": False, "step": "change_branch", "stderr": "RuntimeError: branch exploded"},
        )
        self.assertEqual(
            results[4],
            {"ok": False, "step": "restore", "stderr": "RuntimeError: restore exploded"},
        )

    async def test_websocket_errors_raise_homeassistant_error(self):
        websocket = _load_websocket_module()
        manager = _FakeWebsocketManager()
        websocket.CodexManager = _FakeWebsocketManager
        hass = types.SimpleNamespace(data={websocket.DOMAIN: manager})
        connection = _FakeConnection()

        with self.assertRaises(websocket.HomeAssistantError):
            websocket._manager(types.SimpleNamespace(data={}))

        with self.assertRaises(websocket.HomeAssistantError):
            await websocket.websocket_settings_update(
                hass,
                connection,
                {"id": 1, "settings": {"raise": True}},
            )

        with self.assertRaises(websocket.HomeAssistantError):
            websocket.websocket_sessions_last_message_id(
                hass,
                connection,
                {"id": 2, "session_id": "missing"},
            )

        with self.assertRaises(websocket.HomeAssistantError):
            await websocket.websocket_context_config_file(
                hass,
                connection,
                {"id": 3, "path": "../secrets.yaml"},
            )

    async def test_websocket_value_error_wrappers_raise_homeassistant_error(self):
        websocket = _load_websocket_module()
        manager = _FakeWebsocketManager()
        websocket.CodexManager = _FakeWebsocketManager
        hass = types.SimpleNamespace(data={websocket.DOMAIN: manager})
        connection = _FakeConnection()

        async def async_value_error(*_args, **_kwargs):
            raise ValueError("wrapped async error")

        def sync_value_error(*_args, **_kwargs):
            raise ValueError("wrapped sync error")

        cases = [
            (
                "get_message",
                sync_value_error,
                websocket.websocket_sessions_message,
                {"id": 10, "session_id": "session-1", "message_id": 1},
                False,
            ),
            (
                "messages_after",
                sync_value_error,
                websocket.websocket_sessions_messages_after,
                {"id": 11, "session_id": "session-1", "after_id": 0, "limit": None},
                False,
            ),
            (
                "async_send",
                async_value_error,
                websocket.websocket_sessions_send,
                {"id": 12, "session_id": "session-1", "prompt": "x", "context": []},
                True,
            ),
            (
                "async_update_session_run_settings",
                async_value_error,
                websocket.websocket_sessions_run_settings_update,
                {"id": 13, "session_id": "session-1", "run_settings": {}},
                True,
            ),
            (
                "async_respond_run_plan",
                async_value_error,
                websocket.websocket_sessions_run_plan_respond,
                {"id": 14, "session_id": "session-1", "plan_id": "plan-1", "action": "approve"},
                True,
            ),
            (
                "async_rollback_run",
                async_value_error,
                websocket.websocket_sessions_rollback_run,
                {"id": 15, "session_id": "session-1", "checkpoint_id": "checkpoint-1"},
                True,
            ),
            (
                "async_steer",
                async_value_error,
                websocket.websocket_sessions_steer,
                {"id": 16, "session_id": "session-1", "prompt": "x", "context": []},
                True,
            ),
            (
                "async_retry_continue",
                async_value_error,
                websocket.websocket_sessions_retry_continue,
                {"id": 17, "session_id": "session-1"},
                True,
            ),
            (
                "async_cancel",
                async_value_error,
                websocket.websocket_sessions_cancel,
                {"id": 18, "session_id": "session-1"},
                True,
            ),
            (
                "async_rename",
                async_value_error,
                websocket.websocket_sessions_rename,
                {"id": 19, "session_id": "session-1", "title": "x"},
                True,
            ),
            (
                "async_archive",
                async_value_error,
                websocket.websocket_sessions_archive,
                {"id": 20, "session_id": "session-1", "archived": True},
                True,
            ),
            (
                "async_respond_approval",
                async_value_error,
                websocket.websocket_approvals_respond,
                {
                    "id": 21,
                    "session_id": "session-1",
                    "approval_id": "approval-1",
                    "approved": True,
                },
                True,
            ),
            (
                "async_git_setup_set_remote",
                async_value_error,
                websocket.websocket_git_setup_set_remote,
                {"id": 22, "remote_url": ""},
                True,
            ),
            (
                "async_git_setup_change_branch",
                async_value_error,
                websocket.websocket_git_setup_change_branch,
                {"id": 23, "branch": ""},
                True,
            ),
            (
                "async_git_setup_checkout_commit",
                async_value_error,
                websocket.websocket_git_setup_checkout_commit,
                {"id": 24, "commit": ""},
                True,
            ),
            (
                "async_git_commit_push",
                async_value_error,
                websocket.websocket_git_commit_push,
                {"id": 25, "message": "", "files": []},
                True,
            ),
            (
                "async_git_discard",
                async_value_error,
                websocket.websocket_git_discard,
                {"id": 26, "files": []},
                True,
            ),
            (
                "async_reload_validation_domains",
                async_value_error,
                websocket.websocket_validation_reload,
                {"id": 27, "domains": []},
                True,
            ),
        ]

        for attr, replacement, handler, msg, is_async in cases:
            original = getattr(manager, attr)
            setattr(manager, attr, replacement)
            try:
                with self.assertRaises(websocket.HomeAssistantError):
                    if is_async:
                        await handler(hass, connection, msg)
                    else:
                        handler(hass, connection, msg)
            finally:
                setattr(manager, attr, original)


class ManagerUtilityTests(unittest.IsolatedAsyncioTestCase):
    async def test_manager_session_payloads_questions_and_message_helpers(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            manager = _make_manager(Path(tmp))
            manager.async_save = _async_noop
            session = CodexSession(id="session-1", title="Question")
            manager.sessions[session.id] = session
            first = manager._append_message(session, ChatMessage(role="assistant", content="same"))
            duplicate = manager._append_message(
                session, ChatMessage(role="assistant", content=" same ")
            )
            self.assertIs(first, duplicate)
            manager._append_message(session, ChatMessage(role="user", content="Hello"))
            manager._append_message(session, ChatMessage(role="assistant", content="World"))

            self.assertEqual(manager.get_message(session.id, 1)["content"], "same")
            with self.assertRaisesRegex(ValueError, "Unknown message"):
                manager.get_message(session.id, 99)
            self.assertEqual(manager.last_message_id(session.id), 3)
            self.assertEqual(len(manager.messages_after(session.id, "bad")), 3)
            self.assertEqual(manager.messages_after(session.id, 0, 0), [])
            self.assertEqual(len(manager.messages_after(session.id, 0, "bad")), 3)
            self.assertEqual(len(manager.messages_after(session.id, 0, 2)), 2)
            self.assertEqual(manager.list_sessions()[0]["id"], session.id)
            self.assertEqual(
                manager.session_payload(session, include_messages=True)["messages"][0]["content"],
                "same",
            )
            with self.assertRaisesRegex(ValueError, "Unknown session"):
                manager._require_session("missing")

            question = ChatMessage(
                role="assistant",
                content=(
                    "Before\n"
                    "<ha_codex_question>"
                    '{"question":"Pick","choices":[{"label":"A"},{"label":"B"},{"label":"C"}]}'
                    "</ha_codex_question>"
                ),
            )
            session.messages = [question]
            self.assertTrue(manager._has_pending_question(session))
            self.assertTrue(
                manager._pending_question_content(question.content).startswith(
                    "<ha_codex_question>"
                )
            )
            self.assertFalse(
                manager._has_pending_question(CodexSession(status="running", messages=[question]))
            )
            for bad in [
                "<ha_codex_question>not-json</ha_codex_question>",
                '<ha_codex_question>{"question":"","choices":[{"label":"A"},{"label":"B"},{"label":"C"}]}</ha_codex_question>',
                '<ha_codex_question>{"question":"Pick","choices":[{"label":"A"}]}</ha_codex_question>',
                '<ha_codex_question>{"question":"Pick","choices":[{"label":""},{"label":"B"},{"label":"C"}]}</ha_codex_question>',
                '<ha_codex_question>{"question":"Pick","choices":[{"label":"A"},{"label":"B"},{"label":"C"}]}</ha_codex_question> trailing',
            ]:
                self.assertIsNone(manager._extract_pending_question(bad))

            event_message = ChatMessage(
                role="event",
                content=question.content,
                metadata={"kind": "run_finished"},
            )
            self.assertTrue(manager._message_can_contain_question(event_message))
            self.assertEqual(
                manager._pending_question_content("No question").strip(), "No question"
            )

            manager._fire_session_updated(session, include_messages=True)
            manager._flush_session_updated(session.id)
            self.assertEqual(manager.hass.bus.events[-1][0], "ha_codex/session_updated")
            manager._cancel_pending_session_update(session.id)
            manager.sessions.pop(session.id)
            manager._flush_session_updated(session.id)

    async def test_manager_run_plan_and_error_helper_branches(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            manager = _make_manager(Path(tmp))
            session = CodexSession(id="session-1")
            manager.sessions[session.id] = session

            self.assertTrue(
                manager._requires_run_plan(
                    "Update configuration.yaml", {"resolved": {"plan_mode": "always"}}
                )
            )
            self.assertFalse(
                manager._requires_run_plan(
                    "Answer to your question: yes", {"resolved": {"plan_mode": "always"}}
                )
            )
            self.assertTrue(
                manager._requires_run_plan(
                    "Update configuration.yaml", {"resolved": {"plan_mode": "auto"}, "risky": True}
                )
            )
            self.assertIn("User request", manager._compose_run_plan_prompt("Fix it"))
            plan = {
                "prompt": "Fix it",
                "question_answers": [{"content": "Use YAML"}],
                "content": "",
            }
            self.assertIn("User answer:\nUse YAML", manager._run_plan_prompt(plan))
            self.assertIn(
                "(no plan text captured)", manager._approved_run_prompt({"prompt": "Fix it"})
            )

            self.assertEqual(manager._session_run_plans(session), [])
            self.assertIsNone(manager._pending_run_plan(session))
            with self.assertRaisesRegex(ValueError, "Unknown run plan"):
                manager._require_pending_run_plan(session, "missing")
            session.metadata["pending_plan"] = {"id": "plan-1", "status": "approved"}
            with self.assertRaisesRegex(ValueError, "not awaiting"):
                manager._require_pending_run_plan(session, "plan-1")

            self.assertEqual(
                manager._unknown_error_text(NormalizedEvent("error", raw={"returncode": 2})),
                "Codex reported an error without additional details. Codex exited with code 2.",
            )
            self.assertEqual(
                manager._unknown_error_text(NormalizedEvent("error", raw={"type": "oops"})),
                "Codex reported an error without additional details. Event type: oops.",
            )
            self.assertIn(
                "stale-thread",
                manager._fresh_thread_recovery_prompt(
                    CodexSession(
                        messages=[
                            ChatMessage(role="user", content="One"),
                            ChatMessage(role="assistant", content="Two"),
                        ]
                    ),
                    "Continue",
                    "stale-thread",
                ),
            )

            event = NormalizedEvent(
                "run_finished", text="<ha_codex_question>{}</ha_codex_question>"
            )
            self.assertEqual(manager._message_for_event(event).role, "assistant")
            self.assertIsNone(manager._message_for_event(NormalizedEvent("raw")))
            self.assertTrue(manager._same_message_content(" done ", "done"))
            result = await manager._run_command(["missing-ha-codex-command"], cwd=None, timeout=1)
            self.assertFalse(result["ok"])

    async def test_settings_probe_bridge_and_restart_helpers(self):
        import custom_components.ha_codex.manager as manager_module

        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = CodexManager(
                _FakeHass(root),
                _MemoryStore(),
                workspace_path=str(root),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope="all_visible",
                validation_command="auto",
            )

            self.assertEqual(await manager.async_get_settings(), manager.settings)
            updated = await manager.async_update_settings({"defaults": {"plan_mode": "always"}})
            self.assertEqual(updated["defaults"]["plan_mode"], "always")

            original_which = manager_module.which
            original_discover_addons = manager_module.discover_addon_paths
            original_discover_validation = manager_module.discover_validation_command
            try:
                manager_module.which = lambda command: f"/usr/bin/{command}"
                manager_module.discover_addon_paths = lambda _scope: ["/addons"]
                manager_module.discover_validation_command = lambda _config, config_path: [
                    "ha",
                    "core",
                    "check",
                    "--config",
                    config_path,
                ]

                async def small_command(command):
                    stdout = "codex 1.2.3\n" if "--version" in command else "Usage: codex exec\n"
                    return {"ok": True, "returncode": 0, "stdout": stdout, "stderr": ""}

                manager._run_small_command = small_command
                status = await manager.async_probe()
                self.assertEqual(status["runner_type"], "direct")
                self.assertEqual(status["codex_version"], "codex 1.2.3")
                self.assertEqual(status["addon_paths"], ["/addons"])
            finally:
                manager_module.which = original_which
                manager_module.discover_addon_paths = original_discover_addons
                manager_module.discover_validation_command = original_discover_validation

            sdk_manager = CodexManager(
                _FakeHass(root),
                _MemoryStore(),
                workspace_path=str(root),
                codex_command="",
                bridge_url="http://127.0.0.1:8765",
                addon_write_scope=None,
                validation_command=None,
            )
            original_bundled = manager_module.bundled_codex_path
            try:
                manager_module.bundled_codex_path = lambda: "/sdk/bin/codex"

                async def sdk_small_command(command):
                    stdout = "codex-cli 0.132.0\n" if "--version" in command else ""
                    return {"ok": True, "returncode": 0, "stdout": stdout, "stderr": ""}

                sdk_manager._run_small_command = sdk_small_command
                status = await sdk_manager.async_probe()
                self.assertEqual(status["runner_type"], "bridge-sdk")
                self.assertEqual(status["codex_path"], "/sdk/bin/codex")
                self.assertEqual(status["codex_version"], "codex-cli 0.132.0")
                self.assertTrue(status["codex_exec_available"])
            finally:
                manager_module.bundled_codex_path = original_bundled

            log_result = await manager.async_clear_bridge_log()
            self.assertTrue(log_result["exists"])
            self.assertEqual((root / "ha_codex_bridge.log").read_text(encoding="utf-8"), "")

            manager._async_build_frontend_for_restart = lambda: _async_value({"ok": False})
            restart = await manager.async_restart_core()
            self.assertFalse(restart["ok"])
            self.assertEqual(manager.hass.services.calls, [])

            manager._async_build_frontend_for_restart = lambda: _async_value({"ok": True})
            restart = await manager.async_restart_core()
            self.assertTrue(restart["ok"])
            self.assertEqual(manager.hass.services.calls[-1][0:2], ("homeassistant", "restart"))

            self.assertFalse((await manager.async_start_bridge())["ok"])

            manager.bridge_url = "http://127.0.0.1:8765"
            original_start_bridge = manager_module.async_start_bridge_service
            try:
                manager_module.async_start_bridge_service = lambda _hass: _async_value(
                    {"ok": True, "already_running": True}
                )
                self.assertTrue((await manager.async_start_bridge())["already_running"])

                manager_module.async_start_bridge_service = lambda _hass: _async_value(
                    {"ok": False, "error": "start failed"}
                )
                manager.async_restart_bridge = lambda: _async_value({"ok": True})
                fallback = await manager.async_start_bridge()
                self.assertTrue(fallback["started_by_fallback"])

                manager.async_restart_bridge = lambda: _async_value(
                    {"ok": False, "error": "restart failed"}
                )
                failed = await manager.async_start_bridge()
                self.assertFalse(failed["ok"])
                self.assertEqual(failed["error"], "restart failed")
            finally:
                manager_module.async_start_bridge_service = original_start_bridge

    async def test_bridge_json_usage_and_health_helpers_handle_payload_variants(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url=None,
            addon_write_scope=None,
            validation_command=None,
        )

        self.assertFalse((await manager._async_usage_status())["ok"])
        self.assertFalse((await manager._async_bridge_json("GET", "/status"))["ok"])
        self.assertFalse((await manager._async_bridge_health_status())["ok"])

        manager.bridge_url = "http://127.0.0.1:8765"
        original_aiohttp = sys.modules.get("aiohttp")
        aiohttp, responses = _install_aiohttp_json_stub(
            [
                {
                    "payload": {
                        "ok": True,
                        "five_hour_remaining_percent": 80,
                        "weekly_remaining_percent": 65,
                        "five_hour_reset_at": "soon",
                        "weekly_reset_at": "later",
                    }
                },
                {"payload": ["invalid"]},
                {"payload": {"ok": True, "authenticated": False}},
                {"status": 400, "payload": {"error": "bad request"}},
                {"json_error": ValueError("invalid json")},
                {"payload": ["invalid"]},
                {"raise": None},
                {
                    "payload": {
                        "ok": True,
                        "config_dir": "/config",
                        "codex_home": "/config/codex_home",
                        "codex_home_exists": True,
                        "started_at": 1_700_000_000,
                        "uptime_seconds": 42,
                    }
                },
                {"payload": ["invalid"]},
                {"json_error": ValueError("invalid health json")},
            ]
        )
        responses[6]["raise"] = aiohttp.ClientError("offline")
        try:
            usage = await manager._async_usage_status()
            self.assertTrue(usage["ok"])
            self.assertEqual(usage["five_hour_remaining_percent"], 80)

            invalid_usage = await manager._async_usage_status()
            self.assertFalse(invalid_usage["ok"])
            self.assertIn("invalid usage", invalid_usage["error"])

            account = await manager.async_account_status()
            self.assertTrue(account["ok"])
            start = await manager.async_account_device_login_start()
            self.assertFalse(start["ok"])
            self.assertEqual(start["error"], "bad request")
            status = await manager.async_account_device_login_status()
            self.assertFalse(status["ok"])
            self.assertIn("invalid JSON", status["error"])
            cancel = await manager.async_account_device_login_cancel()
            self.assertFalse(cancel["ok"])
            self.assertIn("invalid response", cancel["error"])
            logout = await manager.async_account_logout()
            self.assertFalse(logout["ok"])
            self.assertEqual(logout["error"], "offline")

            health = await manager._async_bridge_health_status()
            self.assertTrue(health["ok"])
            self.assertEqual(health["uptime_seconds"], 42)
            invalid_health = await manager._async_bridge_health_status()
            self.assertFalse(invalid_health["ok"])
            self.assertIn("invalid health", invalid_health["error"])
            failed_health = await manager._async_bridge_health_status()
            self.assertFalse(failed_health["ok"])
            self.assertIn("invalid health json", failed_health["error"])
        finally:
            if original_aiohttp is None:
                sys.modules.pop("aiohttp", None)
            else:
                sys.modules["aiohttp"] = original_aiohttp

    async def test_usage_status_reports_client_errors(self):
        manager = CodexManager(
            _FakeHass("/tmp"),
            store=None,
            workspace_path="/homeassistant",
            codex_command="codex",
            bridge_url="http://127.0.0.1:8765",
            addon_write_scope=None,
            validation_command=None,
        )
        original_aiohttp = sys.modules.get("aiohttp")
        aiohttp, responses = _install_aiohttp_json_stub([{"raise": None}])
        responses[0]["raise"] = aiohttp.ClientError("usage offline")
        try:
            result = await manager._async_usage_status()
        finally:
            if original_aiohttp is None:
                sys.modules.pop("aiohttp", None)
            else:
                sys.modules["aiohttp"] = original_aiohttp

        self.assertFalse(result["ok"])
        self.assertEqual(result["error"], "usage offline")

    async def test_session_lifecycle_error_and_retry_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            manager = _make_manager(Path(tmp))
            manager.store = _MemoryStore()
            session = await manager.async_create_session("Lifecycle")

            with self.assertRaisesRegex(ValueError, "Unknown session"):
                await manager.async_send("missing", "hello")
            with self.assertRaisesRegex(ValueError, "Prompt is required"):
                await manager.async_send(session.id, "   ")

            session.metadata["pending_plan"] = {"id": "plan-1", "status": "pending"}
            with self.assertRaisesRegex(ValueError, "Run plan is awaiting approval"):
                await manager.async_send(session.id, "another prompt")
            session.metadata.pop("pending_plan")

            with self.assertRaisesRegex(ValueError, "active run"):
                await manager.async_steer(session.id, "continue")
            with self.assertRaisesRegex(ValueError, "Prompt is required"):
                await manager.async_steer(session.id, " ")
            with self.assertRaisesRegex(ValueError, "Only errored"):
                await manager.async_retry_continue(session.id)

            session.status = "error"
            with self.assertRaisesRegex(ValueError, "No previous user prompt"):
                await manager.async_retry_continue(session.id)

            manager._append_message(session, ChatMessage(role="user", content="Fix config"))
            manager._async_begin_run_tracking = lambda _session_id: _async_noop()
            manager._async_run_session = lambda *_args, **_kwargs: _async_noop()
            retried = await manager.async_retry_continue(session.id)
            self.assertEqual(retried.status, "running")
            self.assertEqual(retried.messages[-1].metadata["kind"], "retry_continue")

            task = _FakeTask()
            manager.tasks[session.id] = task
            canceled = await manager.async_cancel(session.id)
            self.assertTrue(task.cancelled)
            self.assertEqual(canceled.status, "canceled")

            renamed = await manager.async_rename(session.id, "  ")
            self.assertEqual(renamed.title, "New chat")

            approval = PendingApproval(
                id="approval-1", session_id=session.id, command="cat configuration.yaml"
            )
            session.approvals.append(approval)
            result = await manager.async_respond_approval(session.id, approval.id, False)
            self.assertEqual(result.approvals[-1].status, "rejected")
            with self.assertRaisesRegex(ValueError, "Unknown approval"):
                await manager.async_respond_approval(session.id, "missing", True)

            task = _FakeTask()
            manager.tasks[session.id] = task
            await manager.async_delete(session.id)
            self.assertTrue(task.cancelled)
            self.assertNotIn(session.id, manager.sessions)

    async def test_manager_active_guard_and_waiter_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            manager = _make_manager(Path(tmp))
            manager.async_save = _async_noop
            manager._fire_session_updated = lambda *_args, **_kwargs: None
            session = CodexSession(
                id="session-1", messages=[ChatMessage(role="user", content="Fix")]
            )
            manager.sessions[session.id] = session

            manager.tasks[session.id] = _FakeTask()
            with self.assertRaisesRegex(ValueError, "active run"):
                await manager.async_send(session.id, "hello")

            plan = {"id": "plan-1", "status": "pending", "prompt": "Fix", "content": "Plan"}
            session.metadata["pending_plan"] = plan
            with self.assertRaisesRegex(ValueError, "still being generated"):
                await manager.async_respond_run_plan(session.id, "plan-1", "approve")
            manager.tasks.pop(session.id, None)
            with self.assertRaisesRegex(ValueError, "approve, cancel, or revise"):
                await manager.async_respond_run_plan(session.id, "plan-1", "bad")
            with self.assertRaisesRegex(ValueError, "awaiting approval"):
                await manager._async_answer_run_plan_question(session, plan, "answer", {})
            session.metadata.pop("pending_plan", None)

            manager.tasks[session.id] = _FakeTask()
            await manager.async_steer(
                session.id,
                "continue",
                run_settings={"mode": "manual", "verbosity": "high"},
            )
            self.assertEqual(
                session.messages[-1].metadata["run_settings"]["requested"]["verbosity"],
                "high",
            )

            session.status = "error"
            with self.assertRaisesRegex(ValueError, "active run"):
                await manager.async_retry_continue(session.id)

            task = _FakeTask()
            manager.tasks[session.id] = task
            archived = await manager.async_archive(session.id, True)
            self.assertIs(archived, session)
            self.assertTrue(task.cancelled)
            self.assertEqual(session.status, "canceled")

            manager.tasks.pop(session.id, None)
            approval = PendingApproval(
                id="approval-1",
                session_id=session.id,
                command="cat configuration.yaml",
            )
            session.approvals = [approval]
            waiter = asyncio.get_running_loop().create_future()
            manager.approval_waiters[approval.id] = waiter
            await manager.async_respond_approval(session.id, approval.id, True)
            self.assertTrue(waiter.result())
            self.assertEqual(session.status, "running")

            calls = []

            async def record_command(command, *, cwd, timeout, ok_returncodes=None):
                calls.append((command, cwd, timeout, ok_returncodes))
                return _cmd(stdout="ok\n")

            manager._run_command = record_command
            await manager._run_small_command(["codex", "--version"])
            await manager._run_workspace_command(["git", "status"])
            self.assertEqual(calls[0][1:3], (None, 10))
            self.assertEqual(calls[1][1:3], (manager.workspace_path, 120))

    async def test_manager_runtime_fallbacks_approval_wait_and_cancellation_paths(self):
        import custom_components.ha_codex.manager as manager_module

        original_codex_cli_bin = sys.modules.get("codex_cli_bin")
        fake_codex_cli_bin = types.ModuleType("codex_cli_bin")
        fake_codex_cli_bin.bundled_codex_path = lambda: "/sdk/codex"
        sys.modules["codex_cli_bin"] = fake_codex_cli_bin
        try:
            self.assertEqual(manager_module.bundled_codex_path(), "/sdk/codex")
            fake_codex_cli_bin.bundled_codex_path = lambda: (_ for _ in ()).throw(ValueError("bad"))
            self.assertIsNone(manager_module.bundled_codex_path())
            sys.modules.pop("codex_cli_bin", None)
            self.assertIsNone(manager_module.bundled_codex_path())
        finally:
            if original_codex_cli_bin is None:
                sys.modules.pop("codex_cli_bin", None)
            else:
                sys.modules["codex_cli_bin"] = original_codex_cli_bin

        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _make_manager(root)
            manager.async_save = _async_noop
            log = root / "ha_codex_bridge.log"
            log.write_bytes(b"first\n" + (b"x" * 210_000) + b"\nlast\n")
            bridge_log = await manager.async_bridge_log(1)
            self.assertTrue(bridge_log["truncated"])
            self.assertIn("last", bridge_log["lines"])

            with (
                patch.object(Path, "exists", return_value=True),
                patch.object(Path, "stat", side_effect=OSError("cannot stat")),
            ):
                failed_log = await manager.async_bridge_log(1)
            self.assertIn("cannot stat", failed_log["error"])

            with patch.object(Path, "write_text", side_effect=OSError("cannot clear")):
                failed_clear = await manager.async_clear_bridge_log()
            self.assertIn("cannot clear", failed_clear["error"])

            manager.hass.loop = types.SimpleNamespace(time=_sequence_function([0, 0, 11]))
            manager._async_bridge_health_status = lambda: _async_value(
                {"ok": False, "error": "still down"}
            )
            with patch("custom_components.ha_codex.manager.asyncio.sleep", _async_noop):
                self.assertEqual(
                    await manager._async_wait_for_bridge_health(),
                    {"ok": False, "error": "still down"},
                )
                manager.hass.loop = types.SimpleNamespace(time=_sequence_function([0, 0]))
                manager._async_bridge_health_status = lambda: _async_value(
                    {"ok": True, "status": 200}
                )
                self.assertEqual(
                    await manager._async_wait_for_bridge_health(),
                    {"ok": True, "status": 200},
                )
            manager.hass.loop = _FakeLoop()

            original_restart_bridge = manager_module.async_restart_bridge_service
            try:
                manager_module.async_restart_bridge_service = lambda _hass: _async_value(
                    {"ok": True, "pid": 42}
                )
                self.assertEqual((await manager.async_restart_bridge())["pid"], 42)
            finally:
                manager_module.async_restart_bridge_service = original_restart_bridge

            session = CodexSession(id="session-1", status="running")
            manager.sessions[session.id] = session
            approval_task = asyncio.create_task(
                manager._async_wait_for_approval(
                    session.id,
                    "approval-1",
                    "python script.py",
                    str(root),
                )
            )
            await asyncio.sleep(0)
            self.assertEqual(session.status, "waiting_approval")
            await manager.async_respond_approval(session.id, "approval-1", True)
            self.assertTrue(await approval_task)

            plan = {
                "id": "plan-1",
                "status": "planning",
                "prompt": "Fix",
                "content": "",
                "run_settings": {},
            }
            session.metadata["pending_plan"] = plan
            approval = PendingApproval(id="plan-approval", session_id=session.id, command="cat")
            session.approvals = [approval]
            manager.approval_waiters[approval.id] = asyncio.get_running_loop().create_future()
            manager.runner = _FailingRunner(asyncio.CancelledError())
            with self.assertRaises(asyncio.CancelledError):
                await manager._async_run_plan(session.id, plan["id"])
            self.assertEqual(plan["status"], "canceled")
            self.assertNotIn(approval.id, manager.approval_waiters)

            session.status = "running"
            approval = PendingApproval(id="run-approval", session_id=session.id, command="cat")
            session.approvals = [approval]
            manager.approval_waiters[approval.id] = asyncio.get_running_loop().create_future()
            manager.runner = _FailingRunner(asyncio.CancelledError())
            with self.assertRaises(asyncio.CancelledError):
                await manager._async_run_session(session.id, "prompt")
            self.assertEqual(session.status, "canceled")

            session.status = "running"
            session.approvals = []
            manager.runner = _FailingRunner(RuntimeError())
            await manager._async_run_session(session.id, "prompt")
            self.assertEqual(session.status, "error")
            self.assertIn("RuntimeError", session.messages[-1].content)

            self.assertTrue(manager._requires_run_plan("Update configuration.yaml"))
            self.assertEqual(
                manager._unknown_error_text(NormalizedEvent("error", raw={})),
                "Codex reported an error without additional details.",
            )
            question_content = (
                '<ha_codex_question>{"question":"Old","choices":[{"label":"A"},'
                '{"label":"B"},{"label":"C"}]}</ha_codex_question> trailing '
                '<ha_codex_question>{"question":"New","choices":[{"label":"A"},'
                '{"label":"B"},{"label":"C"}]}</ha_codex_question>'
            )
            self.assertIn("New", manager._pending_question_content(question_content))

    async def test_file_change_summary_helpers_cover_edge_paths(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _make_manager(root)
            manager.async_save = _async_noop
            session = CodexSession(id="session-1")
            manager.sessions[session.id] = session
            config_file = root / "configuration.yaml"
            config_file.write_text("before\n", encoding="utf-8")
            manager.file_change_baselines[session.id] = manager._workspace_file_snapshot()
            config_file.write_text("after\n", encoding="utf-8")
            manager._async_complete_active_rollback_checkpoint = lambda *_args: _async_value(
                {"id": "checkpoint-1"}
            )

            changes = await manager._async_append_file_change_summary(session.id)

            self.assertEqual(changes[0]["status"], "modified")
            self.assertEqual(session.messages[-1].metadata["rollback"]["id"], "checkpoint-1")
            self.assertIn(
                "1 more files changed",
                manager._format_file_change_summary(
                    [{"status": "modified", "path": "one.yaml"}], hidden_count=1
                ),
            )
            self.assertEqual(
                manager._changed_workspace_files({str(config_file): (1, 1)}, {}),
                [{"status": "deleted", "path": "configuration.yaml"}],
            )

            snapshot = {}
            manager._add_workspace_snapshot_root(snapshot, config_file)
            self.assertIn(str(config_file), snapshot)

            original_add_root = manager._add_workspace_snapshot_root
            try:
                manager._add_workspace_snapshot_root = lambda *_args: None
                with patch.object(Path, "resolve", side_effect=OSError("cannot resolve")):
                    self.assertEqual(manager._workspace_file_snapshot(), {})
            finally:
                manager._add_workspace_snapshot_root = original_add_root

    async def test_validation_reload_message_and_command_helpers(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _make_manager(root)
            manager.store = _MemoryStore()
            session = await manager.async_create_session("Validation")

            manager.validation_command = None
            result = await manager.async_validate()
            self.assertEqual(result.status, "unavailable")

            manager.validation_command = ["ha", "core", "check"]

            async def run_command(_command, **_kwargs):
                return {"ok": True, "returncode": 0, "stdout": "valid", "stderr": ""}

            manager._run_command = run_command
            result = await manager.async_validate(
                session.id, changed_files=[{"path": "automations.yaml"}]
            )
            self.assertEqual(result.status, "passed")
            self.assertEqual(session.validation.status, "passed")
            self.assertEqual(session.messages[-1].metadata["kind"], "validation_summary")

            with self.assertRaisesRegex(ValueError, "At least one"):
                await manager.async_reload_validation_domains([" ", ""])
            with self.assertRaisesRegex(ValueError, "Cannot safely reload"):
                await manager.async_reload_validation_domains(["core"])

            reload_result = await manager.async_reload_validation_domains(
                ["automations", "automations", "scripts"]
            )
            self.assertEqual(reload_result["domains"], ["automations", "scripts"])
            self.assertEqual(len(manager.hass.services.calls), 2)

            event = NormalizedEvent(kind="approval_required", command="ha core restart", raw={})
            self.assertIn("ha core restart", manager._message_for_event(event).content)
            event = NormalizedEvent(kind="run_finished", text="Done", raw={})
            self.assertEqual(manager._message_for_event(event).content, "Done")
            event = NormalizedEvent(
                kind="file_event", text="", file_changes=[{"path": "a.yaml"}], raw={}
            )
            self.assertEqual(
                manager._message_for_event(event).metadata["file_changes"][0]["path"], "a.yaml"
            )
            event = NormalizedEvent(kind="note", text="Plain event", raw={})
            self.assertEqual(manager._message_for_event(event).content, "Plain event")
            event = NormalizedEvent(kind="session_started", raw={})
            self.assertIsNone(manager._message_for_event(event))

            self.assertIn("` ` `", manager._format_command_message("echo ```"))
            completed = await CodexManager._run_command(
                manager,
                [sys.executable, "-c", "print('ok')"],
                cwd=None,
                timeout=10,
            )
            self.assertTrue(completed["ok"])
            self.assertEqual(completed["stdout"].strip(), "ok")

            self.assertFalse(manager._requires_run_plan(""))
            self.assertFalse(manager._requires_run_plan("Answer to your question: yes"))
            self.assertTrue(
                manager._should_validate_after_run(
                    {"validation_depth": "auto"},
                    [{"path": "configuration.yaml"}],
                )
            )
            self.assertFalse(
                manager._should_validate_after_run(
                    {"validation_depth": "none"},
                    [{"path": "configuration.yaml"}],
                )
            )
            self.assertTrue(manager._should_validate_after_run({"validation_depth": "full"}, []))


class ContextTests(unittest.IsolatedAsyncioTestCase):
    async def test_context_edge_cases_for_paths_limits_and_logs(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            config_file = root / "configuration.yaml"
            config_file.write_text("homeassistant:\n", encoding="utf-8")
            (root / "hidden").mkdir()
            (root / ".hidden").mkdir()
            (root / ".hidden" / "ignored.yaml").write_text("ignored\n", encoding="utf-8")
            (root / "trace.log").write_text("log\n", encoding="utf-8")
            manager = _make_manager(root)

            many_items = [
                {"kind": "entity", "id": f"sensor.{index}", "label": f"Sensor {index}"}
                for index in range(30)
            ]
            attachments, serialized = manager._prepare_context_attachments(many_items)
            self.assertEqual(len(attachments), 20)
            self.assertIn("Sensor 19", serialized)
            self.assertNotIn("Sensor 20", serialized)

            with self.assertRaisesRegex(ValueError, "required"):
                manager._resolve_context_config_file("")
            with self.assertRaisesRegex(ValueError, "outside"):
                manager._resolve_context_config_file(str(config_file))
            with self.assertRaisesRegex(ValueError, "not available"):
                manager._resolve_context_config_file("missing.yaml")

            self.assertEqual(
                manager._display_context_path(root.parent / "outside.yaml"),
                str(root.parent / "outside.yaml"),
            )
            self.assertFalse(manager._is_context_config_file(root / ".hidden" / "ignored.yaml"))
            self.assertFalse(manager._is_context_config_file(root / "trace.log"))
            self.assertEqual(manager._context_text("x" * 600, max_length=10), "xxxxxxxxxx")
            self.assertEqual(manager._serialize_context_items([]), "")
            missing_log = manager._read_context_tail(root / "missing.log", 2, 100)
            self.assertFalse(missing_log["exists"])

    async def test_context_helper_error_and_limit_branches(self):
        import custom_components.ha_codex.context as context_module

        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _make_manager(root)
            (root / "one.yaml").write_text("one\n", encoding="utf-8")
            (root / "two.yaml").write_text("two\n", encoding="utf-8")

            original_max = context_module._CONFIG_FILE_MAX_COUNT
            try:
                context_module._CONFIG_FILE_MAX_COUNT = 1
                self.assertEqual(len(manager._context_config_files()["files"]), 1)
            finally:
                context_module._CONFIG_FILE_MAX_COUNT = original_max

            missing_manager = _make_manager(root)
            missing_manager.workspace_path = str(root / "missing")
            self.assertTrue(missing_manager._context_config_files()["files"])

            manager.workspace_path = str(root / "workspace")
            with patch.object(Path, "resolve", side_effect=OSError("cannot resolve")):
                self.assertEqual(
                    manager._context_roots(),
                    [Path(manager.workspace_path), Path(root)],
                )
            manager.workspace_path = str(root)

            with patch.object(Path, "open", side_effect=OSError("cannot read")):
                with self.assertRaisesRegex(ValueError, "Unable to read config file"):
                    manager._context_config_file("one.yaml")

            log_path = root / "home-assistant.log"
            log_path.write_text("first\n" + ("x" * 5000) + "\nlast\n", encoding="utf-8")
            tail = manager._read_context_tail(log_path, lines=1, max_bytes=100)
            self.assertTrue(tail["truncated"])
            self.assertEqual(tail["line_count"], 1)

            with (
                patch.object(Path, "exists", return_value=True),
                patch.object(Path, "stat", side_effect=OSError("cannot stat")),
            ):
                failed_tail = manager._read_context_tail(log_path, lines=1, max_bytes=100)
            self.assertTrue(failed_tail["exists"])
            self.assertIn("cannot stat", failed_tail["error"])

            self.assertIsNone(manager._prepare_config_file_context_item({}, "", "Config"))
            self.assertIsNone(
                manager._prepare_config_file_context_item(
                    {"payload": {"path": "missing.yaml"}}, "missing.yaml", "Missing"
                )
            )

    async def test_context_config_file_listing_supports_file_workspace_root(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            config_file = root / "configuration.yaml"
            config_file.write_text("homeassistant:\n", encoding="utf-8")
            manager = CodexManager(
                _FakeHass(root / "other"),
                store=None,
                workspace_path=str(config_file),
                codex_command="codex",
                bridge_url=None,
                addon_write_scope=None,
                validation_command=None,
            )

            result = await manager.async_context_config_files()

        self.assertEqual([item["path"] for item in result["files"]], ["."])

    async def test_context_attachment_preparation_filters_duplicates_and_truncates_prompt_context(
        self,
    ):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            (root / "configuration.yaml").write_text(
                "homeassistant:\n  name: Test\n", encoding="utf-8"
            )
            (root / "home-assistant.log").write_text("one\ntwo\n", encoding="utf-8")
            manager = _make_manager(root)

            attachments, serialized = manager._prepare_context_attachments("not-a-list")
            self.assertEqual(attachments, [])
            self.assertEqual(serialized, "")

            selected = [
                "invalid",
                {"kind": "unknown", "id": "x", "label": "Unknown"},
                {"kind": "entity", "id": "", "label": "Missing id"},
                {
                    "kind": "entity",
                    "id": "light.kitchen",
                    "label": "Kitchen Light",
                    "subtitle": "on",
                    "payload": {"state": "on"},
                },
                {
                    "kind": "entity",
                    "id": "light.kitchen",
                    "label": "Kitchen Light duplicate",
                },
                {
                    "kind": "config_file",
                    "id": "configuration.yaml",
                    "label": "Config",
                    "payload": {"path": "configuration.yaml"},
                },
                {"kind": "log", "id": "home_assistant", "label": "HA log"},
                {"kind": "log", "id": "missing", "label": "Missing log"},
            ]

            attachments, serialized = manager._prepare_context_attachments(selected)

            self.assertEqual(
                [item["kind"] for item in attachments], ["entity", "config_file", "log"]
            )
            self.assertEqual(attachments[0]["subtitle"], "on")
            self.assertIn("Kitchen Light", serialized)
            self.assertIn("homeassistant", serialized)
            self.assertIn("one\\ntwo", serialized)

            prompt = manager._compose_prompt_with_context("Do it", "x" * 100_000)
            self.assertIn("User request:\nDo it", prompt)
            self.assertIn("[context truncated]", prompt)
            self.assertEqual(manager._compose_prompt_with_context("  Do it  ", ""), "Do it")
            self.assertEqual(
                manager._compose_prompt_with_context("x" * 100_000, "context"),
                f"User request:\n{'x' * 100_000}",
            )

            self.assertEqual(
                manager._display_context_path(root / "configuration.yaml"), "configuration.yaml"
            )
            self.assertFalse(manager._is_context_config_file(root / "secrets.yaml"))
            self.assertFalse(manager._is_context_config_file(root / ".storage" / "core.config"))
            self.assertTrue(manager._is_context_config_file(root / ".gitignore"))

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


class RestartWatchAsyncTests(unittest.IsolatedAsyncioTestCase):
    async def test_restart_approval_edge_cases_and_existing_approval_refire(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _make_manager(root)
            manager.async_save = _async_noop
            session = CodexSession(id="session-1")
            manager.sessions[session.id] = session

            with self.assertRaisesRegex(ValueError, "Unknown approval"):
                await manager.async_respond_approval(session.id, "missing-restart", True)

            self.assertEqual(
                await manager._async_build_frontend_for_restart(),
                {
                    "ok": True,
                    "skipped": True,
                    "reason": "Frontend source package is not installed",
                },
            )
            self.assertEqual(manager._tail_text("a" * 10, limit=5), "aaaaa")

            await manager._maybe_request_restart_approval(session.id)
            session.validation = ValidationResult(status="failed")
            manager.restart_baselines[session.id] = {"before": (1, 1)}
            await manager._maybe_request_restart_approval(session.id)
            self.assertEqual(session.approvals, [])

            session.validation = None
            session.messages.append(
                ChatMessage(
                    role="user",
                    content="Continue",
                    metadata={"kind": "steer", "steer_status": "pending"},
                )
            )
            await manager._maybe_request_restart_approval(session.id)
            self.assertEqual(session.approvals, [])
            session.messages.clear()

            manager.restart_baselines[session.id] = manager._restart_watch_snapshot()
            await manager._maybe_request_restart_approval(session.id)
            self.assertEqual(session.approvals, [])

            approval = PendingApproval(
                id="restart-1",
                session_id=session.id,
                command="ha core restart",
                reason="restart_required: changed file",
            )
            session.approvals.append(approval)
            manager.restart_baselines[session.id] = {"before": (1, 1)}
            manager._restart_watch_snapshot = lambda: {"after": (2, 2)}
            await manager._maybe_request_restart_approval(session.id)
            self.assertEqual(manager.hass.bus.events[-1][0], "ha_codex/approval_required")

    async def test_restart_snapshot_tracks_missing_roots_and_stat_errors(self):
        with TemporaryDirectory(dir=CONFIG_TEMP_DIR) as tmp:
            root = Path(tmp)
            manager = _make_manager(root)
            missing_root = root / "missing"
            snapshot = {}

            manager._add_restart_path(snapshot, missing_root)
            self.assertEqual(snapshot[str(missing_root)], (-1, -1))
            restart_snapshot = manager._restart_watch_snapshot()
            self.assertIn(str(root / "configuration.yaml"), restart_snapshot)


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

    def test_process_runner_streams_raw_empty_approval_and_error_events(self):
        from custom_components.ha_codex import runner as runner_module

        class FakeStdout:
            def __init__(self, lines):
                self._lines = list(lines)

            def __aiter__(self):
                return self

            async def __anext__(self):
                if not self._lines:
                    raise StopAsyncIteration
                return self._lines.pop(0)

        class FakeStderr:
            async def read(self):
                return b"runner failed"

        class FakeProcess:
            stdout = FakeStdout(
                [
                    b"\n",
                    b"not json\n",
                    b'{"type":"exec_approval_request","id":"approval-1","command":"cat file"}\n',
                ]
            )
            stderr = FakeStderr()

            async def wait(self):
                return 2

        original_create = runner_module.asyncio.create_subprocess_exec
        try:
            runner_module.asyncio.create_subprocess_exec = lambda *_args, **_kwargs: _async_value(
                FakeProcess()
            )
            approvals = []

            async def approval_handler(event):
                approvals.append(event.command)
                return True

            events = asyncio.run(
                _collect_async_iter(
                    runner_module.CodexProcessRunner(
                        RunnerOptions(codex_command="codex", workspace_path="/config")
                    ).run("prompt", None, approval_handler=approval_handler)
                )
            )
        finally:
            runner_module.asyncio.create_subprocess_exec = original_create

        self.assertEqual(events[0].kind, "raw")
        self.assertEqual(events[1].kind, "approval_required")
        self.assertEqual(approvals, ["cat file"])
        self.assertEqual(events[2].kind, "error")
        self.assertEqual(events[-1].kind, "run_finished")


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
    subprocess.run(
        ["git", "--git-dir", str(remote), "symbolic-ref", "HEAD", "refs/heads/main"],
        text=True,
        capture_output=True,
        check=True,
    )
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


def _load_websocket_module():
    _install_websocket_stubs()
    import custom_components.ha_codex.websocket as websocket

    return importlib.reload(websocket)


def _install_websocket_stubs() -> None:
    if "voluptuous" not in sys.modules:
        vol = types.ModuleType("voluptuous")
        vol.Required = lambda key, *_args, **_kwargs: key
        vol.Optional = lambda key, *_args, **_kwargs: key
        vol.Coerce = lambda target: target
        vol.Range = lambda *_args, **_kwargs: lambda value: value
        vol.In = lambda values: lambda value: value if value in values else value
        vol.All = lambda *validators: lambda value: value
        vol.Any = lambda *validators: validators[0] if validators else object()
        sys.modules["voluptuous"] = vol

    if "homeassistant" not in sys.modules:
        sys.modules["homeassistant"] = types.ModuleType("homeassistant")
    if "homeassistant.components" not in sys.modules:
        sys.modules["homeassistant.components"] = types.ModuleType("homeassistant.components")

    websocket_api = types.ModuleType("homeassistant.components.websocket_api")
    websocket_api.ActiveConnection = object
    websocket_api.async_register_command = lambda hass, command: hass.registered_commands.append(
        command
    )
    websocket_api.websocket_command = lambda _schema: lambda func: func
    websocket_api.require_admin = lambda func: func
    websocket_api.async_response = lambda func: func
    sys.modules["homeassistant.components.websocket_api"] = websocket_api

    core = types.ModuleType("homeassistant.core")
    core.HomeAssistant = object
    sys.modules["homeassistant.core"] = core

    exceptions = types.ModuleType("homeassistant.exceptions")

    class HomeAssistantError(Exception):
        pass

    exceptions.HomeAssistantError = HomeAssistantError
    sys.modules["homeassistant.exceptions"] = exceptions


class _FakeConnection:
    def __init__(self):
        self.results = []

    def send_result(self, msg_id, result):
        self.results.append((msg_id, result))


class _FakeWebsocketManager:
    def __init__(self):
        self.calls = []
        self.session = {"id": "session-1"}

    async def async_status(self):
        return {"status": "ok"}

    async def async_get_settings(self):
        return {"plan": "auto"}

    async def async_update_settings(self, settings):
        if settings.get("raise"):
            raise ValueError("invalid settings")
        return settings

    async def async_bridge_log(self, lines):
        return {"lines": lines}

    async def async_clear_bridge_log(self):
        return {"cleared": True}

    async def async_restart_bridge(self):
        return {"restarted": True}

    async def async_restart_core(self):
        return {"restarted": "core"}

    async def async_account_status(self):
        return {"logged_in": False}

    async def async_account_device_login_start(self):
        return {"started": True}

    async def async_account_device_login_status(self):
        return {"status": "pending"}

    async def async_account_device_login_cancel(self):
        return {"cancelled": True}

    async def async_account_logout(self):
        return {"logged_out": True}

    async def async_context_logs(self, lines):
        return {"logs": "", "lines": lines}

    async def async_context_config_files(self):
        return [{"path": "configuration.yaml"}]

    async def async_context_config_file(self, path):
        if path.startswith(".."):
            raise ValueError("unsafe path")
        return {"path": path, "content": "homeassistant:\n"}

    def list_sessions(self):
        return [self.session]

    def last_message_id(self, session_id):
        if session_id == "missing":
            raise ValueError("missing session")
        return 2

    def get_message(self, session_id, message_id):
        return {"session_id": session_id, "id": message_id}

    def messages_after(self, session_id, after_id, limit):
        return [{"session_id": session_id, "after_id": after_id, "limit": limit}]

    async def async_create_session(self, title):
        return {"id": "created", "title": title}

    def session_payload(self, session):
        return {"id": session["id"], "payload": True}

    async def async_send(self, session_id, prompt, **kwargs):
        self.calls.append(("send", session_id, prompt, kwargs.get("run_prompt")))
        return self.session

    async def async_update_session_run_settings(self, session_id, run_settings):
        self.calls.append(("run_settings", session_id, run_settings))
        return self.session

    async def async_respond_run_plan(self, session_id, plan_id, action):
        self.calls.append(("run_plan", session_id, plan_id, action))
        return self.session

    async def async_rollback_run(self, _session_id, checkpoint_id):
        return {"rolled_back": checkpoint_id}

    async def async_steer(self, session_id, prompt, **kwargs):
        self.calls.append(("steer", session_id, prompt, kwargs.get("run_prompt")))
        return self.session

    async def async_retry_continue(self, session_id):
        self.calls.append(("retry", session_id))
        return self.session

    async def async_cancel(self, session_id):
        self.calls.append(("cancel", session_id))
        return self.session

    async def async_rename(self, session_id, title):
        self.calls.append(("rename", session_id, title))
        return self.session

    async def async_delete(self, session_id):
        self.calls.append(("delete", session_id))

    async def async_archive(self, session_id, archived):
        self.calls.append(("archive", session_id, archived))
        if session_id == "delete-me":
            return None
        return self.session

    async def async_respond_approval(self, session_id, approval_id, approved):
        self.calls.append(("approval", session_id, approval_id, approved))
        return self.session

    async def async_git_status(self):
        return {"files": []}

    async def async_git_setup_status(self):
        return {"setup_complete": True}

    async def async_git_setup_generate_key(self):
        return {"public_key": "ssh-ed25519 AAA"}

    async def async_git_setup_set_remote(self, remote_url):
        return {"remote_url": remote_url}

    async def async_git_setup_pull(self):
        return {"pulled": True}

    async def async_git_setup_change_branch(self, branch):
        return {"branch": branch}

    async def async_git_setup_checkout_commit(self, commit):
        return {"commit": commit}

    async def async_git_diff(self):
        return {"diff": ""}

    async def async_git_changes(self):
        return {"files": []}

    async def async_git_file_diff(self, path, old_path=None):
        return {"path": path, "old_path": old_path}

    async def async_git_commit_push(self, message, files):
        return {"message": message, "files": files}

    async def async_git_discard(self, files):
        return {"discarded": files}

    async def async_validate(self, session_id=None):
        return ValidationResult(status="passed", command=["ha", "core", "check"], returncode=0)

    async def async_reload_validation_domains(self, domains):
        return {"domains": domains}


class _FakeSetupHass:
    def __init__(self, root):
        self.config = _FakeConfig(root)
        self.bus = _FakeBus()
        self.services = _FakeServices()
        self.loop = _FakeLoop()
        self.data = {}
        self.http = _FakeHttp()
        self.config_entries = _FakeConfigEntries()
        self.created_tasks = []

    def async_create_task(self, coro, _name=None):
        self.created_tasks.append(coro)
        if hasattr(coro, "close"):
            coro.close()
        return _FakeTask(done=True)


class _FakeHttp:
    def __init__(self):
        self.static_paths = []

    async def async_register_static_paths(self, paths):
        self.static_paths.extend(paths)


class _FakeConfigEntries:
    def __init__(self):
        self.entries = []
        self.flow = _FakeConfigFlow()
        self.reloads = []

    def async_entries(self, domain):
        return self.entries if domain == "ha_codex" else []

    async def async_reload(self, entry_id):
        self.reloads.append(entry_id)


class _FakeConfigFlow:
    def __init__(self):
        self.calls = []

    def async_init(self, domain, context=None, data=None):
        self.calls.append((domain, context, data))
        return _async_value({"type": "create_entry"})


class _FakeConfigEntry:
    def __init__(self, data=None, options=None):
        self.data = data or {}
        self.options = options or {}
        self.entry_id = "entry-1"
        self.unloads = []

    def add_update_listener(self, listener):
        return ("listener", listener)

    def async_on_unload(self, unload):
        self.unloads.append(unload)


class _FakeRuntimeManager:
    def __init__(
        self,
        hass,
        store,
        *,
        workspace_path,
        codex_command,
        bridge_url,
        addon_write_scope,
        validation_command,
    ):
        self.hass = hass
        self.store = store
        self.workspace_path = workspace_path
        self.codex_command = codex_command
        self.bridge_url = bridge_url
        self.addon_write_scope = addon_write_scope
        self.validation_command = validation_command
        self.loaded = False
        self.started_bridge = False
        self.tasks = {"run": _FakeTask()}

    async def async_load(self):
        self.loaded = True

    async def async_start_bridge(self):
        self.started_bridge = True
        return {"ok": False, "error": "offline"}


class _FakeGitOpsManager(GitOperationsMixin):
    def __init__(self, root: Path):
        self.hass = _FakeHass(root)
        self.workspace_path = str(root)
        self.command_results = []
        self.commands = []
        self.head_paths = set()
        self.status_stdout = ""
        self.status = {
            "git_available": True,
            "repository": True,
            "branch": "main",
            "remote_configured": True,
            "remote_uses_ssh": False,
            "ssh_key_exists": False,
        }

    async def _run_command(self, command, **_kwargs):
        self.commands.append(command)
        if self.command_results:
            return self.command_results.pop(0)
        if "status" in command:
            return _cmd(stdout=self.status_stdout)
        return _cmd()

    async def async_git_setup_status(self):
        return dict(self.status)

    def _head_path_exists(self, path: str) -> bool:
        return path in self.head_paths

    def _display_workspace_change_path(self, path: str) -> str:
        file_path = Path(path)
        for root in (Path(self.hass.config.path()), Path(self.workspace_path)):
            try:
                return str(file_path.relative_to(root)).replace("\\", "/")
            except ValueError:
                continue
        return path

    def _git_work_tree_from_command(self) -> str:
        return self.hass.config.path()


def _cmd(ok=True, stdout="", stderr="", returncode=0):
    return {"ok": ok, "stdout": stdout, "stderr": stderr, "returncode": returncode}


def _sequence_function(values):
    items = list(values)

    def next_value():
        if len(items) > 1:
            return items.pop(0)
        return items[0]

    return next_value


async def _collect_async_iter(iterator):
    return [item async for item in iterator]


def _install_runtime_setup_stubs():
    _install_websocket_stubs()
    calls = {"panels": [], "commands": [], "removed_panels": []}

    panel_custom = types.ModuleType("homeassistant.components.panel_custom")

    async def async_register_panel(_hass, **kwargs):
        calls["panels"].append(kwargs)

    panel_custom.async_register_panel = async_register_panel
    sys.modules["homeassistant.components.panel_custom"] = panel_custom

    http = types.ModuleType("homeassistant.components.http")

    class StaticPathConfig:
        def __init__(self, url_path, path, cache_headers):
            self.url_path = url_path
            self.path = path
            self.cache_headers = cache_headers

    http.StaticPathConfig = StaticPathConfig
    sys.modules["homeassistant.components.http"] = http

    if "homeassistant.helpers" not in sys.modules:
        sys.modules["homeassistant.helpers"] = types.ModuleType("homeassistant.helpers")
    storage = types.ModuleType("homeassistant.helpers.storage")

    class Store:
        def __init__(self, hass, version, key):
            self.hass = hass
            self.version = version
            self.key = key

    storage.Store = Store
    sys.modules["homeassistant.helpers.storage"] = storage

    websocket = _load_websocket_module()
    websocket.async_register_commands = lambda hass: calls["commands"].append(hass)

    frontend = types.ModuleType("homeassistant.components.frontend")

    async def async_remove_panel(_hass, panel_path):
        calls["removed_panels"].append(panel_path)

    frontend.async_remove_panel = async_remove_panel
    sys.modules["homeassistant.components.frontend"] = frontend
    return calls


def _install_aiohttp_runner_stub(lines):
    calls = {"posts": []}
    aiohttp = types.ModuleType("aiohttp")

    class ClientConnectionError(Exception):
        pass

    aiohttp.ClientConnectionError = ClientConnectionError
    _FakeRunnerClientSession.lines = list(lines)
    _FakeRunnerClientSession.calls = calls
    aiohttp.ClientSession = _FakeRunnerClientSession
    sys.modules["aiohttp"] = aiohttp
    return aiohttp, calls


def _install_aiohttp_json_stub(responses):
    aiohttp = types.ModuleType("aiohttp")

    class ClientError(Exception):
        pass

    aiohttp.ClientError = ClientError
    response_list = list(responses)
    _FakeJsonClientSession.responses = response_list
    _FakeJsonClientSession.calls = []
    aiohttp.ClientSession = _FakeJsonClientSession
    sys.modules["aiohttp"] = aiohttp
    return aiohttp, response_list


class _FakeRunnerClientSession:
    lines = []
    calls = {"posts": []}

    def __init__(self, **kwargs):
        self.kwargs = kwargs

    async def __aenter__(self):
        return self

    async def __aexit__(self, *_args):
        return False

    def post(self, url, json=None):
        self.calls["posts"].append({"url": url, "json": json})
        if url.endswith("/run"):
            return _FakeRunnerResponse(self.lines)
        return _FakeRunnerResponse([])


class _FakeRunnerResponse:
    def __init__(self, lines):
        self.content = _FakeRunnerContent(lines)

    async def __aenter__(self):
        return self

    async def __aexit__(self, *_args):
        return False

    def __await__(self):
        async def _return_self():
            return self

        return _return_self().__await__()

    def raise_for_status(self):
        return None


class _FakeRunnerContent:
    def __init__(self, lines):
        self.lines = list(lines)

    def __aiter__(self):
        return self

    async def __anext__(self):
        if not self.lines:
            raise StopAsyncIteration
        return self.lines.pop(0)


class _FakeJsonClientSession:
    responses = []
    calls = []

    async def __aenter__(self):
        return self

    async def __aexit__(self, *_args):
        return False

    def get(self, url, timeout=None):
        return self._request("GET", url, timeout)

    def post(self, url, timeout=None):
        return self._request("POST", url, timeout)

    def _request(self, method, url, timeout):
        self.calls.append({"method": method, "url": url, "timeout": timeout})
        response = self.responses.pop(0)
        error = response.get("raise")
        if error is not None:
            raise error
        return _FakeJsonResponse(response)


class _FakeJsonResponse:
    def __init__(self, response):
        self.response = response
        self.status = int(response.get("status", 200))

    async def __aenter__(self):
        return self

    async def __aexit__(self, *_args):
        return False

    async def json(self):
        error = self.response.get("json_error")
        if error is not None:
            raise error
        return self.response.get("payload")


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


class _FakeSdkPayload:
    def __init__(self, **values):
        self.values = values
        for key, value in values.items():
            setattr(self, key, value)

    def model_dump(self, **_kwargs):
        return dict(self.values)


def _install_openai_codex_sdk_stub():
    sdk = types.SimpleNamespace(clients=[], notifications=[])
    openai_codex = types.ModuleType("openai_codex")
    client_module = types.ModuleType("openai_codex.client")

    class FakeCodexConfig:
        def __init__(
            self,
            codex_bin=None,
            cwd=None,
            env=None,
            config_overrides=(),
            **_kwargs,
        ):
            self.codex_bin = codex_bin
            self.cwd = cwd
            self.env = env or {}
            self.config_overrides = config_overrides

    class FakeCodexClient:
        def __init__(self, config=None, approval_handler=None):
            self.config = config
            self.approval_handler = approval_handler
            self.thread_params = None
            self.turn_params = None
            self.closed = False
            sdk.clients.append(self)

        def start(self):
            return None

        def initialize(self):
            return _FakeSdkPayload()

        def close(self):
            self.closed = True

        def thread_start(self, params):
            self.thread_params = params
            return _FakeSdkPayload(thread=_FakeSdkPayload(id="thread-1"))

        def thread_resume(self, thread_id, params):
            self.thread_params = params
            return _FakeSdkPayload(thread=_FakeSdkPayload(id=thread_id))

        def turn_start(self, thread_id, input_items, params):
            self.turn_params = params
            self.turn_input = input_items
            return _FakeSdkPayload(turn=_FakeSdkPayload(id="turn-1"))

        def register_turn_notifications(self, turn_id):
            self.turn_id = turn_id

        def unregister_turn_notifications(self, turn_id):
            self.unregistered_turn_id = turn_id

        def next_turn_notification(self, _turn_id):
            if not sdk.notifications:
                raise RuntimeError("no fake SDK notifications left")
            return sdk.notifications.pop(0)

    client_module.CodexClient = FakeCodexClient
    client_module.CodexConfig = FakeCodexConfig
    openai_codex.client = client_module
    sys.modules["openai_codex"] = openai_codex
    sys.modules["openai_codex.client"] = client_module
    return sdk


class _SequencedRunner:
    def __init__(self, event_batches):
        self.event_batches = list(event_batches)
        self.calls = []

    async def run(self, *args, **_kwargs):
        self.calls.append(args)
        events = self.event_batches.pop(0) if self.event_batches else []
        for event in events:
            yield event


class _FailingRunner:
    def __init__(self, error):
        self.error = error
        self.calls = []

    async def run(self, *args, **_kwargs):
        self.calls.append(args)
        raise self.error
        yield


async def _async_noop(*_args, **_kwargs):
    return None


async def _async_empty_dict(*_args, **_kwargs):
    return {}


async def _async_value(value):
    return value


class _FakeTask:
    def __init__(self, done=False):
        self._done = done
        self.cancelled = False

    def done(self):
        return self._done

    def cancel(self):
        self.cancelled = True


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
