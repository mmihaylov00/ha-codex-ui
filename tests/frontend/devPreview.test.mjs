import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { createPreviewHomeAssistant } from "../../frontend/src/previewHass.ts";

test("dev preview has an HTML entry that boots the panel preview", async () => {
  const html = await readFile(new URL("../../frontend/index.html", import.meta.url), "utf8");

  assert.match(html, /<ha-codex-panel\b/);
  assert.match(html, /\/src\/preview\.tsx/);
});

test("preview Home Assistant mock responds to initial panel websocket calls", async () => {
  const hass = createPreviewHomeAssistant();
  const unsubscribers = [];

  assert.equal(typeof hass.callWS, "function");
  assert.equal(typeof hass.connection?.subscribeEvents, "function");
  unsubscribers.push(await hass.connection.subscribeEvents(() => {}, "ha_codex/session_updated"));

  const sessions = await hass.callWS({ type: "ha_codex/sessions/list" });
  const status = await hass.callWS({ type: "ha_codex/status" });
  const settings = await hass.callWS({ type: "ha_codex/settings/get" });
  const account = await hass.callWS({ type: "ha_codex/account/status" });
  const gitSetup = await hass.callWS({ type: "ha_codex/git/setup/status" });

  assert.equal(sessions.sessions.length, 2);
  assert.equal(status.preview, true);
  assert.equal(settings.settings.context_budget_chars, 40000);
  assert.equal(account.logged_in, true);
  assert.equal(gitSetup.setup_complete, true);
  unsubscribers.forEach((unsubscribe) => unsubscribe());
});

test("preview Home Assistant mock handles interactive websocket routes", async () => {
  const hass = createPreviewHomeAssistant();

  assert.deepEqual(await hass.callWS({ type: "ha_codex/settings/update", settings: { context_budget_chars: 12000 } }), {
    settings: {
      defaults: {
        mode: "auto",
        model_preset_id: "gpt_5_5",
        reasoning_effort: "auto",
        verbosity: "auto",
        plan_mode: "auto",
        validation_depth: "auto",
        tool_visibility: "normal",
        approval_mode: "ask",
      },
      model_presets: [
        { id: "gpt_5_5", label: "GPT-5.5", model: "gpt-5.5" },
        { id: "gpt_5_4", label: "GPT-5.4", model: "gpt-5.4" },
        { id: "gpt_5_4_mini", label: "GPT-5.4-Mini", model: "gpt-5.4-mini" },
      ],
      context_budget_chars: 12000,
    },
  });

  assert.equal((await hass.callWS({ type: "ha_codex/git/status" })).changed_count, 1);
  assert.equal((await hass.callWS({ type: "ha_codex/git/changes" })).files[0].path, "automations.yaml");
  assert.equal((await hass.callWS({ type: "ha_codex/git/diff" })).files[0].status, "modified");
  assert.equal((await hass.callWS({ type: "ha_codex/git/file_diff" })).path, "automations.yaml");
  assert.equal((await hass.callWS({ type: "ha_codex/context/config_files" })).files.length, 3);
  assert.equal((await hass.callWS({ type: "ha_codex/context/config_file", path: "scripts.yaml" })).path, "scripts.yaml");
  assert.equal((await hass.callWS({ type: "ha_codex/context/config_file", path: "missing.yaml" })).path, "configuration.yaml");
  assert.equal((await hass.callWS({ type: "ha_codex/context/logs" })).logs[0].id, "home-assistant");
  assert.equal((await hass.callWS({ type: "config/entity_registry/list" })).length, 2);
  assert.equal((await hass.callWS({ type: "config/device_registry/list" }))[0].id, "preview-device");
  assert.equal((await hass.callWS({ type: "config/area_registry/list" }))[1].area_id, "kitchen");
  assert.equal((await hass.callWS({ type: "get_services" })).light.turn_on.name, "Turn on");
  assert.equal((await hass.callWS({ type: "ha_codex/validation/run" })).validation.status, "passed");
  assert.deepEqual(await hass.callWS({ type: "ha_codex/validation/reload_domains", domains: ["automation"] }), {
    ok: true,
    domains: ["automation"],
    results: [],
  });
  assert.match((await hass.callWS({ type: "ha_codex/bridge_log" })).lines, /Preview bridge log/);
  assert.equal((await hass.callWS({ type: "ha_codex/bridge_log/clear" })).lines, "");
  assert.equal((await hass.callWS({ type: "ha_codex/account/device_login/start" })).status, "succeeded");
  assert.equal((await hass.callWS({ type: "ha_codex/account/device_login/status" })).user_code, "PREVIEW");

  const created = await hass.callWS({ type: "ha_codex/sessions/create" });
  const sessionId = created.session.id;
  assert.match(sessionId, /^preview-/);
  assert.equal((await hass.callWS({ type: "ha_codex/sessions/send", session_id: sessionId, prompt: "Hello" })).session.messages.length, 2);
  assert.equal((await hass.callWS({ type: "ha_codex/sessions/steer", session_id: sessionId, prompt: "More" })).session.messages.length, 4);
  assert.equal((await hass.callWS({ type: "ha_codex/sessions/messages_after", session_id: sessionId, after_id: 2 })).messages.length, 2);
  assert.equal((await hass.callWS({ type: "ha_codex/sessions/rename", session_id: sessionId, title: "Renamed" })).session.title, "Renamed");
  assert.equal((await hass.callWS({ type: "ha_codex/sessions/archive", session_id: sessionId, archived: true })).session.archived, true);
  assert.equal((await hass.callWS({ type: "ha_codex/approvals/respond", session_id: "preview-active", approval_id: "approval-preview-1", approved: false })).session.approvals[0].status, "canceled");
  assert.equal((await hass.callWS({ type: "ha_codex/sessions/run_plan/respond", session_id: "preview-active", action: "approve" })).session.metadata.pending_plan.status, "approve");
  assert.equal((await hass.callWS({ type: "ha_codex/sessions/run_settings/update", session_id: sessionId })).session.id, sessionId);

  for (const type of [
    "ha_codex/sessions/cancel",
    "ha_codex/sessions/retry_continue",
    "ha_codex/sessions/rollback_run",
    "ha_codex/core_restart",
    "ha_codex/bridge_restart",
    "ha_codex/account/logout",
    "ha_codex/account/device_login/cancel",
    "ha_codex/git/setup/generate_key",
    "ha_codex/git/setup/set_remote",
    "ha_codex/git/setup/pull",
    "ha_codex/git/setup/change_branch",
    "ha_codex/git/setup/checkout_commit",
    "ha_codex/git/commit_push",
    "ha_codex/git/discard",
  ]) {
    assert.equal((await hass.callWS({ type, session_id: sessionId })).ok, true);
  }

  await assert.rejects(() => hass.callWS({ type: "unknown/route" }), /Preview websocket mock does not handle unknown\/route/);
});
