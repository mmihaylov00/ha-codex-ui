import assert from "node:assert/strict";
import test from "node:test";

import { HaCodexApi } from "../../frontend/src/services/api.ts";

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
