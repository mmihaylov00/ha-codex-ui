import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const messageSourcePath = new URL("../../frontend/src/components/Message.tsx", import.meta.url);

test("message file diffs load on open and reset when file changes refresh", async () => {
  const source = await readFile(messageSourcePath, "utf8");
  const messageFileChangesSource = source.match(/function MessageFileChanges[\s\S]*?function messageFileChangesKey/)?.[0] || "";
  const messageDiffFileSource = source.match(/function MessageDiffFile[\s\S]*?function errorFallbackMessage/)?.[0] || "";

  assert.match(messageFileChangesSource, /const \[gitFilesVersion, setGitFilesVersion\] = useState\(0\);/);
  assert.match(messageFileChangesSource, /version=\{diffVersion\}/);
  assert.match(messageDiffFileSource, /function MessageDiffFile\(\{ api, file, version \}/);
  assert.match(messageDiffFileSource, /setDiff\(file\.patch \? file : null\);/);
  assert.match(messageDiffFileSource, /if \(!open \|\| diff \|\| loading\) return;/);
  assert.doesNotMatch(messageDiffFileSource, /if \(diff \|\| loading\) return;/);
});
