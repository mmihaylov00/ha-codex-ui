import assert from "node:assert/strict";
import test from "node:test";

import { formatElapsedTime } from "../../frontend/src/utils/format.ts";

test("elapsed chat timestamps are relative to the user message baseline", () => {
  assert.equal(formatElapsedTime(100, 104), "+4s");
  assert.equal(formatElapsedTime(100, 220), "+2m");
  assert.equal(formatElapsedTime(100, 3820), "+1h 2m");
});

test("elapsed chat timestamps clamp out-of-order codex events to zero", () => {
  assert.equal(formatElapsedTime(220, 100), "+0s");
});
