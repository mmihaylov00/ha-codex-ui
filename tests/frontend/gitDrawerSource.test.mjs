import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appSourcePath = new URL("../../frontend/src/App.tsx", import.meta.url);
const gitDrawerSourcePath = new URL("../../frontend/src/components/GitDrawer.tsx", import.meta.url);

test("discard confirmation is mounted at the app shell level", async () => {
  const appSource = await readFile(appSourcePath, "utf8");
  const gitDrawerSource = await readFile(gitDrawerSourcePath, "utf8");

  assert.match(appSource, /<DiscardConfirmModal\b/);
  assert.doesNotMatch(gitDrawerSource, /<DiscardConfirmModal\b/);
  assert.doesNotMatch(gitDrawerSource, /className="modal-backdrop discard-confirm-backdrop"/);
});
