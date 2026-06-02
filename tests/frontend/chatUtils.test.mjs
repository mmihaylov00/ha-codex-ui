import assert from "node:assert/strict";
import test from "node:test";

import { stripDuplicateFileChangesBlock } from "../../frontend/src/features/chat/chatUtils.ts";

const changes = [
  { status: "modified", path: "custom_components/ha_codex/frontend/panel.js" },
  { status: "modified", path: "frontend/src/components/ChatPanel.tsx" },
];

test("duplicate generated file changes block is hidden when metadata renders the same files", () => {
  const content = [
    "File changes:",
    "- modified `custom_components/ha_codex/frontend/panel.js`",
    "- modified `frontend/src/components/ChatPanel.tsx`",
  ].join("\n");

  assert.equal(stripDuplicateFileChangesBlock(content, changes), "");
});

test("duplicate plain file changes block is hidden and surrounding content remains", () => {
  const content = [
    "Done.",
    "",
    "File changes:",
    "",
    "modified custom_components/ha_codex/frontend/panel.js",
    "modified frontend/src/components/ChatPanel.tsx",
    "",
    "Validation passed.",
  ].join("\n");

  assert.equal(stripDuplicateFileChangesBlock(content, changes), "Done.\n\nValidation passed.");
});

test("file changes block remains visible when it does not match metadata files", () => {
  const content = [
    "File changes:",
    "- modified `configuration.yaml`",
  ].join("\n");

  assert.equal(stripDuplicateFileChangesBlock(content, changes), content);
});
