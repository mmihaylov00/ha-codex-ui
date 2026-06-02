import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sourcePath = new URL("../../frontend/src/components/GitDrawer.tsx", import.meta.url);

test("discard confirmation uses the modal dialog pattern", async () => {
  const source = await readFile(sourcePath, "utf8");

  assert.match(source, /className="modal-backdrop discard-confirm-backdrop"/);
  assert.match(source, /role="dialog"/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /aria-labelledby="discard-confirm-title"/);
  assert.doesNotMatch(source, /className="discard-confirm"/);
});
