import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const actionsPath = new URL("../../frontend/src/hooks/useHaCodexActions.ts", import.meta.url);
const settingsModalPath = new URL("../../frontend/src/components/SettingsModal.tsx", import.meta.url);
const panelCssPath = new URL("../../frontend/src/styles/panel.css", import.meta.url);
const uiStorePath = new URL("../../frontend/src/stores/uiStore.ts", import.meta.url);

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

test("branch checkout refreshes git setup status for updated history", async () => {
  const source = await readFile(actionsPath, "utf8");
  const branchSource = source.match(/changeGitSetupBranch: async \(branch: string\) => \{[\s\S]*?\n      \},\n      checkoutGitSetupCommit:/)?.[0] || "";

  assert.match(branchSource, /await loadGitSetupStatus\(false\);/);
});

test("commit history action is presented as restore", async () => {
  const source = await readFile(actionsPath, "utf8");
  const commitSource = source.match(/checkoutGitSetupCommit: async \(commit: string\) => \{[\s\S]*?\n      \},\n      showMoreGitFiles:/)?.[0] || "";

  assert.match(commitSource, /Commit restore failed/);
  assert.match(commitSource, /Git commit restored/);
  assert.doesNotMatch(commitSource, /Git commit checked out|Commit checkout failed/);
});

test("git setup actions surface diagnostic errors", async () => {
  const source = await readFile(actionsPath, "utf8");
  const formatterSource = source.match(/function gitSetupResultMessage[\s\S]*?function sessionRunSettingsKey/)?.[0] || "";
  const pullSource = source.match(/pullGitSetupRemote: async \(\) => \{[\s\S]*?\n      \},\n      changeGitSetupBranch:/)?.[0] || "";
  const branchSource = source.match(/changeGitSetupBranch: async \(branch: string\) => \{[\s\S]*?\n      \},\n      checkoutGitSetupCommit:/)?.[0] || "";
  const commitSource = source.match(/checkoutGitSetupCommit: async \(commit: string\) => \{[\s\S]*?\n      \},\n      showMoreGitFiles:/)?.[0] || "";

  assert.match(formatterSource, /step \${step}/);
  assert.match(formatterSource, /return code \${returncode}/);
  assert.match(pullSource, /gitSetupThrownErrorMessage\("Git pull failed", error\)/);
  assert.match(pullSource, /setGitSetupResult\(\{ ok: false, step: "pull", stderr: message \}\)/);
  assert.match(branchSource, /gitSetupThrownErrorMessage\("Branch change failed", error\)/);
  assert.match(branchSource, /setGitSetupResult\(\{ ok: false, step: "change_branch", stderr: message \}\)/);
  assert.match(commitSource, /gitSetupThrownErrorMessage\("Commit restore failed", error\)/);
  assert.match(commitSource, /setGitSetupResult\(\{ ok: false, step: "restore", stderr: message \}\)/);
});

test("git setup loading icons are scoped to the active action", async () => {
  const actionsSource = await readFile(actionsPath, "utf8");
  const modalSource = await readFile(settingsModalPath, "utf8");
  const storeSource = await readFile(uiStorePath, "utf8");
  const pullSource = actionsSource.match(/pullGitSetupRemote: async \(\) => \{[\s\S]*?\n      \},\n      changeGitSetupBranch:/)?.[0] || "";
  const branchSource = actionsSource.match(/changeGitSetupBranch: async \(branch: string\) => \{[\s\S]*?\n      \},\n      checkoutGitSetupCommit:/)?.[0] || "";
  const commitSource = actionsSource.match(/checkoutGitSetupCommit: async \(commit: string\) => \{[\s\S]*?\n      \},\n      showMoreGitFiles:/)?.[0] || "";
  const historySource = modalSource.match(/function GitHistorySection[\s\S]*?function RunSettingsTab/)?.[0] || "";

  assert.match(storeSource, /gitSetupRunningAction: GitSetupRunningAction/);
  assert.match(storeSource, /gitSetupActionRunning \? gitSetupRunningAction : null/);
  assert.match(pullSource, /setGitSetupActionRunning\(true, "pull"\)/);
  assert.match(branchSource, /setGitSetupActionRunning\(true, "branch"\)/);
  assert.match(commitSource, /setGitSetupActionRunning\(true, `restore:\$\{value\}`\)/);
  assert.match(modalSource, /actionRunning=\{runningAction === "pull"\}/);
  assert.match(modalSource, /actionRunning=\{runningAction === "branch"\}/);
  assert.match(historySource, /const restoring = runningAction === `restore:\$\{hash\}`/);
  assert.doesNotMatch(modalSource, /running \? "mdi:progress-clock" : "mdi:(?:link-variant-plus|key-change|source-branch|source-pull|restore)/);
});

test("commit history button uses restore wording", async () => {
  const source = await readFile(settingsModalPath, "utf8");
  const historySource = source.match(/function GitHistorySection[\s\S]*?function RunSettingsTab/)?.[0] || "";

  assert.match(historySource, /mdi:restore/);
  assert.match(historySource, /current \? "Current" : "Restore"/);
});

test("git setup errors are toast-only without a result panel", async () => {
  const source = await readFile(settingsModalPath, "utf8");
  const css = await readFile(panelCssPath, "utf8");

  assert.doesNotMatch(source, /GitSetupResultView|gitSetupResultOutput|Last Git setup action/);
  assert.doesNotMatch(source, /<GitSetupResultView result=\{result\}/);
  assert.doesNotMatch(css, /git-setup-result/);
});

test("git ssh key action lives in the SSH key card", async () => {
  const source = await readFile(settingsModalPath, "utf8");
  const cardsSource = source.match(/<div className="git-setup-cards">[\s\S]*?<GitHistorySection/)?.[0] || "";

  assert.match(cardsSource, /<GitSetupSshKeyCard\b/);
  assert.match(cardsSource, /onGenerateKey=\{onGenerateKey\}/);
  assert.match(source, /<button className="git-card-action" onClick=\{onGenerateKey\} disabled=\{running\}>/);
  assert.doesNotMatch(source, /<h3>SSH key<\/h3>/);
  assert.doesNotMatch(source, /onGenerateKey[\s\S]*?disabled=\{running \|\| status\?\.ssh_key_exists === true\}/);
  assert.match(source, /sshKeyExists \? "Recreate key" : "Generate key"/);
  assert.match(source, /<div className="git-card-content">[\s\S]*?<div className=\{`git-public-key git-public-key-inline/);
  assert.match(source, /<div className="git-card-content">[\s\S]*?<a className="git-ssh-keys-link" href="https:\/\/docs\.github\.com\/en\/authentication\/connecting-to-github-with-ssh\/adding-a-new-ssh-key-to-your-github-account"/);
  assert.match(source, /<button className="git-card-action" onClick=\{onGenerateKey\}/);
});

test("remote repository editing lives in the repository card", async () => {
  const source = await readFile(settingsModalPath, "utf8");
  const cardsSource = source.match(/<div className="git-setup-cards">[\s\S]*?<GitHistorySection/)?.[0] || "";

  assert.match(cardsSource, /<GitSetupRepositoryCard\b/);
  assert.match(cardsSource, /onRemoteSave=\{onRemoteSave\}/);
  assert.match(source, /<div className="git-card-content">[\s\S]*?<input[\s\S]*?<\/div>\s*<div className="git-card-spacer"/);
  assert.match(source, /<button className="git-card-action" onClick=\{\(\) => onRemoteSave\(remoteDraft\)\}/);
  assert.match(source, /<span>Save<\/span>/);
  assert.doesNotMatch(source, /<span>Save remote<\/span>/);
  assert.doesNotMatch(source, /<h3>Remote repository<\/h3>/);
  assert.doesNotMatch(source, /detail=\{status\?\.work_tree/);
  assert.doesNotMatch(source, /status\?\.work_tree \|\| status\?\.repo_error \|\| "Home Assistant config"/);
});

test("git setup summary and refresh live in the Git card", async () => {
  const source = await readFile(settingsModalPath, "utf8");
  const cardsSource = source.match(/<div className="git-setup-cards">[\s\S]*?<GitHistorySection/)?.[0] || "";

  assert.match(cardsSource, /<GitSetupGitCard\b/);
  assert.match(cardsSource, /summary=\{summary\}/);
  assert.match(cardsSource, /onRefresh=\{onRefresh\}/);
  assert.doesNotMatch(source, /<section className=\{`git-setup-summary/);
  assert.doesNotMatch(source, /<GitSetupCard label="Git"/);
  assert.match(source, /<button className="git-card-action" onClick=\{onRefresh\} disabled=\{loading \|\| running\}>/);
  assert.doesNotMatch(source, /<button className="ghost" onClick=\{onRefresh\}/);
});

test("git setup cards share fixed slots and action button style", async () => {
  const source = await readFile(settingsModalPath, "utf8");
  const css = await readFile(panelCssPath, "utf8");

  assert.equal((source.match(/className="git-card-label"/g) || []).length, 5);
  assert.equal((source.match(/className="git-card-status"/g) || []).length, 5);
  assert.equal((source.match(/className="git-card-content"/g) || []).length, 5);
  assert.equal((source.match(/className="git-card-action"/g) || []).length, 5);
  assert.match(css, /\.git-setup-action-card\s*\{[\s\S]*grid-template-rows:\s*16px 22px 10px 84px 10px 34px[\s\S]*min-height:\s*196px/);
  assert.match(css, /\.git-card-content\s*\{[\s\S]*height:\s*84px[\s\S]*overflow:\s*hidden/);
  assert.match(css, /\.git-card-action\s*\{[\s\S]*height:\s*34px[\s\S]*width:\s*100%/);
});

test("git setup cards are sized for three cards per row", async () => {
  const css = await readFile(panelCssPath, "utf8");

  assert.match(css, /\.git-setup-cards\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /@media \(max-width: 720px\)\s*\{[\s\S]*\.git-setup-cards\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)/);
});

test("git public key display is clipped to one line in cards", async () => {
  const css = await readFile(panelCssPath, "utf8");

  assert.match(css, /\.git-public-key-inline pre\s*\{[\s\S]*overflow:\s*hidden[\s\S]*text-overflow:\s*ellipsis[\s\S]*white-space:\s*nowrap/);
  assert.match(css, /\.git-public-key \.icon-button\s*\{[\s\S]*width:\s*32px/);
});
