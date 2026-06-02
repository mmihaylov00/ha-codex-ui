import assert from "node:assert/strict";
import test from "node:test";

import {
  shouldKeepResolvedSubscription,
  shouldReplaceSubscriptions,
  websocketEventKey,
} from "../../frontend/src/services/subscriptionState.ts";

test("websocket subscription keys are stable for equal event sets", () => {
  assert.equal(websocketEventKey(["ha_codex/session_updated", "ha_codex/message_delta"]), "ha_codex/message_delta\nha_codex/session_updated");
  assert.equal(
    websocketEventKey(["ha_codex/message_delta", "ha_codex/session_updated"]),
    "ha_codex/message_delta\nha_codex/session_updated",
  );
});

test("websocket subscriptions are replaced when the HA connection changes", () => {
  const firstConnection = {};
  const nextConnection = {};

  assert.equal(shouldReplaceSubscriptions(false, null, "", firstConnection, "events"), false);
  assert.equal(shouldReplaceSubscriptions(true, firstConnection, "events", firstConnection, "events"), false);
  assert.equal(shouldReplaceSubscriptions(true, firstConnection, "events", nextConnection, "events"), true);
});

test("late resolved subscriptions are discarded after cleanup", () => {
  assert.equal(shouldKeepResolvedSubscription(2, 1, true), false);
  assert.equal(shouldKeepResolvedSubscription(2, 2, false), false);
  assert.equal(shouldKeepResolvedSubscription(2, 2, true), true);
});
