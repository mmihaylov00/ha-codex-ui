import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAutomationScriptRequest,
  requiredBuilderMessages,
} from "../../frontend/src/features/builder/builderUtils.ts";

const kitchenLight = {
  id: "light.kitchen",
  kind: "entity",
  label: "Kitchen Light",
  subtitle: "light.kitchen - state off",
  payload: { entity_id: "light.kitchen", state: "off" },
};

const automation = {
  id: "automation.porch_light",
  kind: "automation",
  label: "Porch Light",
  subtitle: "automation.porch_light",
};

test("create automation builder creates readable message and scoped Codex prompt", () => {
  const request = buildAutomationScriptRequest("create_automation", {
    goal: "Turn on the kitchen light when motion is detected after sunset.",
    trigger: "Motion is detected in the kitchen after sunset.",
    actions: "Turn on light.kitchen at 60%.",
    details: "Only run once every 10 minutes and notify if the light is unavailable.",
  }, [kitchenLight]);

  assert.equal(request.prompt, "Create automation: Turn on the kitchen light when motion is detected after sunset.");
  assert.doesNotMatch(request.prompt, /\{/);
  assert.match(request.runPrompt, /Create a Home Assistant automation/);
  assert.match(request.runPrompt, /Motion is detected in the kitchen after sunset/);
  assert.match(request.runPrompt, /Only run once every 10 minutes/);
  assert.match(request.runPrompt, /Validate the Home Assistant YAML/);
  assert.match(request.runPrompt, /Keep edits minimal and scoped/);
  assert.equal(request.metadata.builder.template_id, "create_automation");
  assert.equal(request.metadata.builder.template_label, "Create automation");
  assert.deepEqual(request.metadata.builder.selections.map((item) => item.label), [
    "Goal",
    "Trigger",
    "Action",
    "Details",
  ]);
  assert.deepEqual(request.context, [kitchenLight]);
});

test("fix automation builder requires an issue and automation context", () => {
  assert.deepEqual(requiredBuilderMessages("fix_automation", {}, []), [
    "Describe what is broken.",
    "Select an automation or script as context.",
  ]);

  assert.deepEqual(requiredBuilderMessages("fix_automation", { issue: "Does not trigger" }, [automation]), []);
});

test("blueprint builder prompt asks Codex to preserve behavior", () => {
  const request = buildAutomationScriptRequest("convert_blueprint", {
    source: "automation.porch_light",
    goal: "Make the entity IDs configurable for reuse in other rooms.",
  }, [automation]);

  assert.equal(request.prompt, "Convert to blueprint: automation.porch_light");
  assert.match(request.runPrompt, /Convert the selected automation or script into a Home Assistant blueprint/);
  assert.match(request.runPrompt, /preserve the current behavior/i);
  assert.match(request.runPrompt, /Make the entity IDs configurable/);
});
