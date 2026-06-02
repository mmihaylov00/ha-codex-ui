import assert from "node:assert/strict";
import test from "node:test";

import { sessionListTime } from "../../frontend/src/features/chat/chatUtils.ts";

test("empty chat list time falls back to the chat creation time", () => {
  assert.equal(
    sessionListTime({
      id: "empty",
      title: "New chat",
      last_user_message_at: null,
      created_at: 1_780_000_000,
      updated_at: undefined,
    }),
    1_780_000_000,
  );
});
