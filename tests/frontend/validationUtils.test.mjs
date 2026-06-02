import assert from "node:assert/strict";
import test from "node:test";

import {
  validationActionLabel,
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
