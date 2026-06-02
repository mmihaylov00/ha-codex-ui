import assert from "node:assert/strict";
import test from "node:test";

import {
  defaultGitSelection,
  fileStatusIcon,
  gitFileKey,
  isGitSetupReady,
  isGitSetupStatusLoadError,
  gitReviewActionDisabled,
  gitSetupSummary,
  gitSetupMissingItems,
  gitStatusLabel,
  groupGitFiles,
  parsePatchLines,
  reviewableGitFileCount,
  reviewableGitFiles,
  selectedGitFiles,
  splitGitPath,
  toggleGitSelection,
} from "../../frontend/src/features/git/gitUtils.ts";

test("reviewable git files include untracked files", () => {
  const files = [
    { path: "configuration.yaml", status: "modified" },
    { path: "custom_components/new_sensor.py", status: "untracked" },
  ];

  assert.deepEqual(reviewableGitFiles(files).map((file) => file.path), [
    "configuration.yaml",
    "custom_components/new_sensor.py",
  ]);
  assert.equal(reviewableGitFileCount(files), 2);
});

test("git review selection defaults to every reviewable file", () => {
  const files = [
    { path: "configuration.yaml", status: "modified" },
    { path: "custom_components/ha_codex/new.py", status: "added" },
  ];

  const selection = defaultGitSelection(files);

  assert.deepEqual(selectedGitFiles(files, selection).map((file) => file.path), [
    "configuration.yaml",
    "custom_components/ha_codex/new.py",
  ]);
  assert.equal(gitFileKey("new.py", "old.py"), "old.py\nnew.py");
});

test("git review actions are disabled when every file is deselected", () => {
  const files = [
    { path: "configuration.yaml", status: "modified" },
    { path: "custom_components/ha_codex/new.py", status: "added" },
  ];

  let selection = defaultGitSelection(files);
  selection = toggleGitSelection(files[0], selection);
  selection = toggleGitSelection(files[1], selection);

  assert.deepEqual(selectedGitFiles(files, selection), []);
  assert.equal(gitReviewActionDisabled(files, selection, false), true);
  assert.equal(gitReviewActionDisabled(files, defaultGitSelection(files), false), false);
  assert.equal(gitReviewActionDisabled(files, defaultGitSelection(files), true), true);
});

test("git setup is ready only after backend setup is complete", () => {
  assert.equal(isGitSetupReady(null), false);
  assert.equal(isGitSetupReady({ setup_complete: false, repository: true, remote_configured: true }), false);
  assert.equal(isGitSetupReady({ setup_complete: true, repository: true, remote_configured: true }), true);
  assert.deepEqual(gitSetupMissingItems(null), ["setup status"]);
  assert.deepEqual(gitSetupMissingItems({ setup_complete: false, missing: ["remote"] }), ["remote"]);
  assert.deepEqual(gitSetupMissingItems({ setup_complete: true, missing: [] }), []);
  assert.equal(isGitSetupStatusLoadError(null), false);
  assert.equal(isGitSetupStatusLoadError({ setup_complete: false, missing: ["setup status"] }), true);
  assert.equal(isGitSetupStatusLoadError({ setup_complete: false, missing: ["origin remote"] }), false);
});

test("git setup summary treats missing status as checking while loading", () => {
  assert.deepEqual(gitSetupSummary(null, true), {
    tone: "checking",
    title: "Checking Git setup...",
    detail: "Loading setup status...",
  });
  assert.deepEqual(gitSetupSummary(null, false), {
    tone: "checking",
    title: "Checking Git setup...",
    detail: "Loading setup status...",
  });
  assert.deepEqual(gitSetupSummary({ setup_complete: false, missing: ["remote"] }, false), {
    tone: "warning",
    title: "Git setup incomplete",
    detail: "Missing: remote",
  });
  assert.deepEqual(gitSetupSummary({ setup_complete: true, missing: [] }, false), {
    tone: "success",
    title: "Git integration ready",
    detail: "Review, commit, and push controls are enabled.",
  });
});

test("git status labels and icons normalize porcelain states", () => {
  assert.equal(gitStatusLabel("??"), "untracked");
  assert.equal(gitStatusLabel(" D"), "deleted");
  assert.equal(gitStatusLabel("A "), "added");
  assert.equal(gitStatusLabel("R "), "renamed");
  assert.equal(gitStatusLabel("C "), "copied");
  assert.equal(gitStatusLabel(" M"), "modified");
  assert.equal(gitStatusLabel("!!"), "changed");
  assert.equal(fileStatusIcon("added"), "mdi:file-plus-outline");
  assert.equal(fileStatusIcon("untracked"), "mdi:file-plus-outline");
  assert.equal(fileStatusIcon("modified"), "mdi:file-edit-outline");
  assert.equal(fileStatusIcon("deleted"), "mdi:file-remove-outline");
  assert.equal(fileStatusIcon("renamed"), "mdi:file-move-outline");
  assert.equal(fileStatusIcon("copied"), "mdi:file-multiple-outline");
  assert.equal(fileStatusIcon("ignored"), "mdi:file-outline");
});

test("git files are split and grouped for review display", () => {
  assert.deepEqual(splitGitPath("configuration.yaml"), { folder: ".", name: "configuration.yaml" });
  assert.deepEqual(splitGitPath("custom_components/ha_codex/__init__.py"), {
    folder: "custom_components/ha_codex",
    name: "__init__.py",
  });

  const groups = groupGitFiles([
    { path: "zeta.py", status: "modified" },
    { path: "custom_components/ha_codex/websocket.py", status: "modified" },
    { path: "custom_components/ha_codex/__init__.py", status: "modified" },
  ]);

  assert.deepEqual(groups.map((group) => group.folder), [".", "custom_components/ha_codex"]);
  assert.deepEqual(groups[1].files.map((file) => file.display_name), ["__init__.py", "websocket.py"]);
});

test("patch parser classifies diff lines for display", () => {
  const parsed = parsePatchLines([
    "diff --git a/file b/file",
    "index abc..def 100644",
    "--- a/file",
    "+++ b/file",
    "@@ -1 +1 @@",
    "-old",
    "+new",
    " context",
  ].join("\n"));

  assert.deepEqual(parsed, [
    { type: "meta", content: "--- a/file" },
    { type: "meta", content: "+++ b/file" },
    { type: "hunk", content: "@@ -1 +1 @@" },
    { type: "deleted", content: "-old" },
    { type: "added", content: "+new" },
    { type: "context", content: " context" },
  ]);
});
