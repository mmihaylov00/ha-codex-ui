import assert from "node:assert/strict";
import test from "node:test";

import {
  validationActionLabel,
  validationCommandText,
  validationReloadDomains,
  validationSummaryTone,
} from "../../frontend/src/features/validation/validationUtils.ts";

test("validation summary tone highlights failed validation first", () => {
  const validation = {
    status: "failed",
    summary: {
      recommendation: "fix_validation_errors",
      label: "Fix validation errors first",
    },
  };

  assert.equal(validationSummaryTone(validation), "error");
  assert.equal(validationActionLabel(validation), "Fix validation errors first");
});

test("validation summary exposes reload domains for safe actions", () => {
  const validation = {
    status: "passed",
    summary: {
      recommendation: "reload_may_be_enough",
      label: "Reload may be enough",
      reload_domains: ["automations", "scripts"],
    },
  };

  assert.equal(validationSummaryTone(validation), "warning");
  assert.deepEqual(validationReloadDomains(validation), ["automations", "scripts"]);
  assert.equal(validationActionLabel(validation), "Reload may be enough");
});

test("validation summary treats restart recommendation separately from reloads", () => {
  const validation = {
    status: "passed",
    summary: {
      recommendation: "restart_required",
      label: "Restart required",
      reload_domains: ["automations"],
    },
  };

  assert.equal(validationSummaryTone(validation), "restart");
  assert.deepEqual(validationReloadDomains(validation), []);
});

test("validation labels and tones fall back to raw status", () => {
  assert.equal(validationSummaryTone({ summary: { recommendation: "validation_unavailable" } }), "warning");
  assert.equal(validationSummaryTone({ summary: { recommendation: "no_action_needed" } }), "success");
  assert.equal(validationSummaryTone({ status: "failed" }), "error");
  assert.equal(validationSummaryTone({ ok: false }), "error");
  assert.equal(validationSummaryTone({ status: "passed" }), "success");
  assert.equal(validationSummaryTone({ ok: true }), "success");
  assert.equal(validationSummaryTone({ returncode: 0 }), "success");
  assert.equal(validationSummaryTone({ status: "unknown" }), "unknown");
  assert.equal(validationActionLabel(null), "No validation result yet");
  assert.equal(validationActionLabel({ status: "passed" }), "No action needed");
  assert.equal(validationActionLabel({ status: "failed" }), "Fix validation errors first");
  assert.equal(validationActionLabel({ status: "unavailable" }), "Validation unavailable");
  assert.equal(validationActionLabel({ status: "finished" }), "Validation finished");
});

test("validation command text joins command arguments safely", () => {
  assert.equal(validationCommandText({ command: ["ha", "core", "check"] }), "ha core check");
  assert.equal(validationCommandText(null), "");
});
