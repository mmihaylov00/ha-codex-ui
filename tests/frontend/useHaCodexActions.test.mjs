import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const actionsPath = new URL("../../frontend/src/hooks/useHaCodexActions.ts", import.meta.url);

test("new chats are created in current chats even when archive view is open", async () => {
  const source = await readFile(actionsPath, "utf8");
  const createSessionSource = source.match(/const createSession = async \(\) => \{[\s\S]*?\n    \};/)?.[0] || "";

  assert.match(createSessionSource, /if \(chat\(\)\.showArchived\) chat\(\)\.setShowArchived\(false\);/);
  assert.match(createSessionSource, /archived: false,/);
  assert.match(createSessionSource, /archived_at: null,/);
  assert.doesNotMatch(createSessionSource, /archived:\s*chat\(\)\.showArchived/);
});

test("up-to-date git pulls do not prompt for restart", async () => {
  const source = await readFile(actionsPath, "utf8");
  const pullSource = source.match(/pullGitSetupRemote: async \(\) => \{[\s\S]*?\n      \},\n      changeGitSetupBranch:/)?.[0] || "";

  assert.match(pullSource, /const alreadyUpToDate = result\.step === "up_to_date";/);
  assert.match(pullSource, /if \(!alreadyUpToDate\) \{[\s\S]*?promptRestartHomeAssistant/);
  assert.match(pullSource, /Git is already up to date/);
});
