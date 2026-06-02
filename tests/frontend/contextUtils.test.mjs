import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTEXT_SELECTION_LIMIT,
  addContextSelection,
  buildContextSendPayload,
  createQueuedContextMessage,
  contextAttachmentsFromMetadata,
  contextItemsForSend,
  shouldClearContextAfterSend,
} from "../../frontend/src/features/context/contextUtils.ts";

test("context selection is deduplicated and capped", () => {
  const items = Array.from({ length: CONTEXT_SELECTION_LIMIT + 2 }, (_, index) => ({
    id: `entity.sensor_${index}`,
    kind: "entity",
    label: `Sensor ${index}`,
    subtitle: `sensor.sensor_${index}`,
    payload: { entity_id: `sensor.sensor_${index}`, state: String(index) },
  }));

  let selected = [];
  for (const item of items) selected = addContextSelection(selected, item);
  selected = addContextSelection(selected, items[0]);

  assert.equal(selected.length, CONTEXT_SELECTION_LIMIT);
  assert.deepEqual(selected.map((item) => item.id), items.slice(0, CONTEXT_SELECTION_LIMIT).map((item) => item.id));
});

test("context send payload preserves selected structure without composing the user prompt", () => {
  const context = contextItemsForSend([
    {
      id: "entity.light_kitchen",
      kind: "entity",
      label: "Kitchen Light",
      subtitle: "light.kitchen",
      payload: { entity_id: "light.kitchen", state: "on", attributes: { brightness: 128 } },
    },
    {
      id: "config.configuration.yaml",
      kind: "config_file",
      label: "configuration.yaml",
      subtitle: "552 bytes",
      payload: { path: "configuration.yaml", content: "homeassistant:\n  name: Home\n", truncated: false },
    },
  ]);

  assert.equal(context.length, 2);
  assert.equal(context[0].label, "Kitchen Light");
  assert.equal(context[0].payload.entity_id, "light.kitchen");
  assert.equal(context[1].payload.content, "homeassistant:\n  name: Home\n");
});

test("send payload keeps raw prompt and structured context separate", () => {
  const context = [
    {
      id: "light.kitchen",
      kind: "entity",
      label: "Kitchen Light",
      subtitle: "light.kitchen - state on",
      payload: { entity_id: "light.kitchen", state: "on" },
    },
  ];

  const payload = buildContextSendPayload("  Fix the kitchen lights  ", context);

  assert.equal(payload.prompt, "Fix the kitchen lights");
  assert.deepEqual(payload.context, context);
  assert.doesNotMatch(payload.prompt, /HA Codex context/);
});

test("queued context messages preserve raw prompt and attached context", () => {
  const context = [
    {
      id: "configuration.yaml",
      kind: "config_file",
      label: "configuration.yaml",
      payload: { path: "configuration.yaml", content: "homeassistant:\n" },
    },
  ];

  const queued = createQueuedContextMessage("queue-1", "Inspect config", context);

  assert.equal(queued.id, "queue-1");
  assert.equal(queued.content, "Inspect config");
  assert.deepEqual(queued.context, context);
  assert.doesNotMatch(queued.content, /HA Codex context/);
});

test("context send payload is capped before it leaves the frontend", () => {
  const context = contextItemsForSend(Array.from({ length: CONTEXT_SELECTION_LIMIT + 5 }, (_, index) => (
    {
      id: `entity.sensor_${index}`,
      kind: "entity",
      label: `Sensor ${index}`,
    }
  )));

  assert.equal(context.length, CONTEXT_SELECTION_LIMIT);
  assert.equal(context.at(-1).id, `entity.sensor_${CONTEXT_SELECTION_LIMIT - 1}`);
});

test("message metadata exposes compact attachments for transcript rendering", () => {
  const attachments = contextAttachmentsFromMetadata({
    context: [
      {
        id: "light.kitchen",
        kind: "entity",
        label: "Kitchen Light",
        subtitle: "light.kitchen - state on",
        payload: { ignored: true },
      },
      { id: "", kind: "entity", label: "Missing id" },
      { id: "secret", kind: "unknown", label: "Unknown kind" },
    ],
  });

  assert.deepEqual(attachments, [
    {
      id: "light.kitchen",
      kind: "entity",
      label: "Kitchen Light",
      subtitle: "light.kitchen - state on",
    },
  ]);
});

test("selected context clears only after a sent or queued prompt", () => {
  assert.equal(shouldClearContextAfterSend("sent"), true);
  assert.equal(shouldClearContextAfterSend("queued"), true);
  assert.equal(shouldClearContextAfterSend("failed"), false);
});
