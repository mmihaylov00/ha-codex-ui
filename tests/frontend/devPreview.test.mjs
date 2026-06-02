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
