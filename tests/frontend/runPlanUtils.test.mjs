import assert from "node:assert/strict";
import test from "node:test";

import {
  pendingRunPlan,
  runPlanActionDisabled,
  runPlanRevisePrompt,
} from "../../frontend/src/features/runPlan/runPlanUtils.ts";

test("pending run plan is available only when awaiting user review", () => {
  const session = {
    id: "session-1",
    title: "Kitchen",
    metadata: {
      pending_plan: {
        id: "plan-1",
        prompt: "Change the kitchen light automation",
        status: "pending",
        content: "Plan text",
      },
    },
  };

  assert.equal(pendingRunPlan(session)?.id, "plan-1");
  assert.equal(runPlanActionDisabled(session), false);
});

test("run plan actions are disabled while the plan is still being generated", () => {
  const session = {
    id: "session-1",
    title: "Kitchen",
    metadata: {
      pending_plan: {
        id: "plan-1",
        prompt: "Change the kitchen light automation",
        status: "planning",
      },
    },
  };

  assert.equal(pendingRunPlan(session), null);
  assert.equal(runPlanActionDisabled(session), true);
});

test("revise action restores the original prompt text", () => {
  const session = {
    id: "session-1",
    title: "Kitchen",
    metadata: {
      pending_plan: {
        id: "plan-1",
        prompt: "  Change the kitchen light automation  ",
        status: "pending",
      },
    },
  };

  assert.equal(runPlanRevisePrompt(session), "Change the kitchen light automation");
});
