import assert from "node:assert/strict";
import test from "node:test";

import {
  copyText,
  errorSummary,
  formatDuration,
  formatElapsedTime,
  formatRelativeTime,
  formatRunTime,
  formatTimestampTitle,
  stripAnsi,
} from "../../frontend/src/utils/format.ts";

test("format helpers render relative times and absolute fallbacks", () => {
  const originalNow = Date.now;
  Object.defineProperty(Date, "now", { configurable: true, value: () => 1_700_000_000_000 });
  try {
    assert.equal(stripAnsi("\u001b[31mError\u001b[0m"), "Error");
    assert.equal(formatRelativeTime(1_700_000_000), "just now");
    assert.equal(formatRelativeTime(1_699_999_880), "2 minutes ago");
    assert.equal(formatRelativeTime(1_699_992_800), "2 hours ago");
    assert.equal(formatRelativeTime(1_699_913_600), "yesterday");
    assert.equal(formatRelativeTime(1_700_086_400), "tomorrow");
    assert.equal(formatRelativeTime(1_700_259_200), "in 3 days");
    assert.equal(formatRelativeTime(1_699_000_000), "2023-11-03");
    assert.equal(formatRelativeTime(1_700_259_200, { pastOnly: true }), "just now");
    assert.equal(formatRunTime(1_699_999_880), "2 minutes ago");
    assert.equal(formatRelativeTime(""), "");
  } finally {
    Object.defineProperty(Date, "now", { configurable: true, value: originalNow });
  }
});

test("elapsed chat timestamps are relative to the user message baseline", () => {
  assert.equal(formatElapsedTime(100, 104), "+4s");
  assert.equal(formatElapsedTime(100, 220), "+2m");
  assert.equal(formatElapsedTime(100, 3820), "+1h 2m");
});

test("elapsed chat timestamps clamp out-of-order codex events to zero", () => {
  assert.equal(formatElapsedTime(220, 100), "+0s");
});

test("elapsed and duration helpers handle long spans", () => {
  assert.equal(formatElapsedTime(100, 86_500), "+1d");
  assert.equal(formatElapsedTime(100, 180_100), "+2d 2h");
  assert.equal(formatElapsedTime("", 180_100), "");
  assert.equal(formatDuration(45), "45s");
  assert.equal(formatDuration(125), "2m");
  assert.equal(formatDuration(7_300), "2h 1m");
  assert.equal(formatDuration(93_600), "1d 2h");
  assert.equal(formatDuration(-1), "");
});

test("error and timestamp helpers normalize display values", () => {
  assert.equal(errorSummary(new Error("Bridge offline")), "Bridge offline");
  assert.equal(errorSummary({ code: "unknown", message: "Git pull failed: conflict" }), "Git pull failed: conflict");
  assert.equal(errorSummary({ name: "WS", code: 400, message: "Bad payload" }), "Bad payload (WS code 400)");
  assert.equal(errorSummary({ name: "WS", code: "unknown", data: { step: "pull" } }), 'WS code unknown: data: {"step":"pull"}');
  assert.equal(errorSummary({ name: "HTTP", code: 500 }), "HTTP code 500");
  const circular = {};
  circular.self = circular;
  assert.match(errorSummary({ type: "Circular", self: circular }), /^\[object Object\]|Circular:/);
  assert.equal(errorSummary("unknown"), "unknown");
  assert.equal(formatTimestampTitle(0), "");
  assert.match(formatTimestampTitle(1_700_000_000), /2023|2024|11|14/);
});

test("copyText uses clipboard when it is available", async () => {
  const originalNavigator = globalThis.navigator;
  const writes = [];
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { clipboard: { writeText: async (value) => writes.push(value) } },
  });
  try {
    await copyText("hello");
    assert.deepEqual(writes, ["hello"]);
  } finally {
    Object.defineProperty(globalThis, "navigator", { configurable: true, value: originalNavigator });
  }
});

test("copyText falls back to a temporary textarea", async () => {
  const originalNavigator = globalThis.navigator;
  const originalDocument = globalThis.document;
  const calls = [];
  const textarea = {
    style: {},
    setAttribute: (name, value) => calls.push(["setAttribute", name, value]),
    focus: () => calls.push(["focus"]),
    select: () => calls.push(["select"]),
    remove: () => calls.push(["remove"]),
  };
  Object.defineProperty(globalThis, "navigator", { configurable: true, value: {} });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: {
      body: { appendChild: (node) => calls.push(["appendChild", node]) },
      createElement: (tag) => {
        assert.equal(tag, "textarea");
        return textarea;
      },
      execCommand: (command) => {
        calls.push(["execCommand", command]);
        return true;
      },
    },
  });
  try {
    await copyText("fallback");
    assert.equal(textarea.value, "fallback");
    assert.deepEqual(calls.map((call) => call[0]), ["setAttribute", "appendChild", "focus", "select", "execCommand", "remove"]);
  } finally {
    Object.defineProperty(globalThis, "navigator", { configurable: true, value: originalNavigator });
    Object.defineProperty(globalThis, "document", { configurable: true, value: originalDocument });
  }
});
