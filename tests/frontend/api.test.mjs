import assert from "node:assert/strict";
import test from "node:test";

import { HaCodexApi } from "../../frontend/src/services/api.ts";

test("callWS rejects when Home Assistant is unavailable", async () => {
  const api = new HaCodexApi(() => null);

  await assert.rejects(() => api.status(), /Home Assistant connection is not ready/);
});

test("deleteSession sends the session delete websocket command", async () => {
  const calls = [];
  const api = new HaCodexApi(() => ({
    callWS: async (payload) => {
      calls.push(payload);
      return { deleted_session_id: payload.session_id };
    },
  }));

  const result = await api.deleteSession("archived-chat");

  assert.deepEqual(calls, [{ type: "ha_codex/sessions/delete", session_id: "archived-chat" }]);
  assert.deepEqual(result, { deleted_session_id: "archived-chat" });
});

test("API methods send the expected websocket payloads", async () => {
  const calls = [];
  const api = new HaCodexApi(() => ({
    callWS: async (payload) => {
      calls.push(payload);
      return payload;
    },
  }));
  const files = [
    { path: "configuration.yaml" },
    { path: "new.yaml", old_path: "old.yaml" },
  ];

  await api.status();
  await api.settings();
  await api.updateSettings({ context_budget_chars: 12000 });
  await api.bridgeLog();
  await api.bridgeLog(25);
  await api.bridgeLogClear();
  await api.bridgeRestart();
  await api.coreRestart();
  await api.accountStatus();
  await api.accountDeviceLoginStart();
  await api.accountDeviceLoginStatus();
  await api.accountDeviceLoginCancel();
  await api.accountLogout();
  await api.entityRegistry();
  await api.deviceRegistry();
  await api.areaRegistry();
  await api.contextLogs();
  await api.contextLogs(5);
  await api.contextConfigFiles();
  await api.contextConfigFile("configuration.yaml");
  await api.listSessions();
  await api.messagesAfter("chat-1", 10);
  await api.messagesAfter("chat-1", 10, 50);
  await api.createSession();
  await api.send("chat-1", "hello", [{ id: "light.kitchen", kind: "entity", label: "Kitchen" }]);
  await api.send("chat-1", {
    prompt: "readable",
    context: [],
    runPrompt: "actual prompt",
    metadata: { source: "builder" },
    runSettings: { mode: "manual" },
  });
  await api.updateSessionRunSettings("chat-1", { model_preset_id: "custom" });
  await api.respondRunPlan("chat-1", "plan-1", "approve");
  await api.rollbackRun("chat-1", "checkpoint-1");
  await api.steer("chat-1", "continue", []);
  await api.retryContinue("chat-1");
  await api.cancel("chat-1");
  await api.rename("chat-1", "New title");
  await api.archive("chat-1", true);
  await api.respondApproval("chat-1", "approval-1", false);
  await api.gitStatus();
  await api.gitSetupStatus();
  await api.gitSetupGenerateKey();
  await api.gitSetupSetRemote("git@example.com:repo.git");
  await api.gitSetupPull();
  await api.gitSetupChangeBranch("feature/test");
  await api.gitSetupCheckoutCommit("abc123");
  await api.gitChanges();
  await api.gitDiff();
  await api.gitFileDiff("new.yaml");
  await api.gitFileDiff("new.yaml", "old.yaml");
  await api.commitPush("commit message", files);
  await api.discard(files);
  await api.runValidation();
  await api.runValidation("chat-1");
  await api.reloadValidationDomains(["automation"]);

  assert.deepEqual(calls.map((payload) => payload.type), [
    "ha_codex/status",
    "ha_codex/settings/get",
    "ha_codex/settings/update",
    "ha_codex/bridge_log",
    "ha_codex/bridge_log",
    "ha_codex/bridge_log/clear",
    "ha_codex/bridge_restart",
    "ha_codex/core_restart",
    "ha_codex/account/status",
    "ha_codex/account/device_login/start",
    "ha_codex/account/device_login/status",
    "ha_codex/account/device_login/cancel",
    "ha_codex/account/logout",
    "config/entity_registry/list",
    "config/device_registry/list",
    "config/area_registry/list",
    "ha_codex/context/logs",
    "ha_codex/context/logs",
    "ha_codex/context/config_files",
    "ha_codex/context/config_file",
    "ha_codex/sessions/list",
    "ha_codex/sessions/messages_after",
    "ha_codex/sessions/messages_after",
    "ha_codex/sessions/create",
    "ha_codex/sessions/send",
    "ha_codex/sessions/send",
    "ha_codex/sessions/run_settings/update",
    "ha_codex/sessions/run_plan/respond",
    "ha_codex/sessions/rollback_run",
    "ha_codex/sessions/steer",
    "ha_codex/sessions/retry_continue",
    "ha_codex/sessions/cancel",
    "ha_codex/sessions/rename",
    "ha_codex/sessions/archive",
    "ha_codex/approvals/respond",
    "ha_codex/git/status",
    "ha_codex/git/setup/status",
    "ha_codex/git/setup/generate_key",
    "ha_codex/git/setup/set_remote",
    "ha_codex/git/setup/pull",
    "ha_codex/git/setup/change_branch",
    "ha_codex/git/setup/checkout_commit",
    "ha_codex/git/changes",
    "ha_codex/git/diff",
    "ha_codex/git/file_diff",
    "ha_codex/git/file_diff",
    "ha_codex/git/commit_push",
    "ha_codex/git/discard",
    "ha_codex/validation/run",
    "ha_codex/validation/run",
    "ha_codex/validation/reload",
  ]);
  assert.deepEqual(calls[4], { type: "ha_codex/bridge_log", lines: 25 });
  assert.deepEqual(calls[22], {
    type: "ha_codex/sessions/messages_after",
    session_id: "chat-1",
    after_id: 10,
    limit: 50,
  });
  assert.deepEqual(calls[24], {
    type: "ha_codex/sessions/send",
    session_id: "chat-1",
    prompt: "hello",
    context: [{ id: "light.kitchen", kind: "entity", label: "Kitchen" }],
  });
  assert.deepEqual(calls[25], {
    type: "ha_codex/sessions/send",
    session_id: "chat-1",
    prompt: "readable",
    run_prompt: "actual prompt",
    metadata: { source: "builder" },
    run_settings: { mode: "manual" },
  });
  assert.deepEqual(calls[45], {
    type: "ha_codex/git/file_diff",
    path: "new.yaml",
    old_path: "old.yaml",
  });
  assert.deepEqual(calls[46].files, [
    { path: "configuration.yaml" },
    { path: "new.yaml", old_path: "old.yaml" },
  ]);
  assert.equal(calls[48].session_id, "");
  assert.equal(calls[49].session_id, "chat-1");
});
