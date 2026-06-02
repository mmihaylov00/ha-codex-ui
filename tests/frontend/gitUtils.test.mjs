import assert from "node:assert/strict";
import test from "node:test";

import {
  defaultGitSelection,
  gitReviewActionDisabled,
  reviewableGitFileCount,
  reviewableGitFiles,
  selectedGitFiles,
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
