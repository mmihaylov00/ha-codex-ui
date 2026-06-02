import assert from "node:assert/strict";
import test from "node:test";

import {
  contextBudgetState,
  defaultHaCodexSettings,
  deleteModelPreset,
  modelPresetOptions,
  normalizeHaCodexSettings,
  normalizeRunSettings,
  runSettingsForSession,
  upsertModelPreset,
} from "../../frontend/src/features/settings/runtimeSettingsUtils.ts";

test("runtime settings default to auto mode and the built-in GPT-5.5 preset", () => {
  const settings = defaultHaCodexSettings();

  assert.equal(settings.defaults.mode, "auto");
  assert.equal(settings.defaults.model_preset_id, "gpt_5_5");
  assert.deepEqual(modelPresetOptions(settings), [
    { value: "gpt_5_5", label: "GPT-5.5", model: "gpt-5.5" },
    { value: "gpt_5_4", label: "GPT-5.4", model: "gpt-5.4" },
    { value: "gpt_5_4_mini", label: "GPT-5.4-Mini", model: "gpt-5.4-mini" },
    { value: "gpt_5_3_codex", label: "GPT-5.3-Codex", model: "gpt-5.3-codex" },
    { value: "gpt_5_3_codex_spark", label: "GPT-5.3-Codex-Spark", model: "gpt-5.3-codex-spark" },
    { value: "gpt_5_2", label: "GPT-5.2", model: "gpt-5.2" },
  ]);
});

test("model presets are edited in settings and selected by saved id in chat", () => {
  const settings = defaultHaCodexSettings();
  const withPreset = upsertModelPreset(settings, {
    id: "gpt5",
    label: "GPT-5 Codex",
    model: "gpt-5-codex",
  });

  assert.equal(modelPresetOptions(withPreset).length, 7);
  assert.equal(runSettingsForSession({ metadata: { run_settings: { model_preset_id: "gpt5" } } }, withPreset).model_preset_id, "gpt5");
  assert.equal(deleteModelPreset(withPreset, "gpt5").defaults.model_preset_id, "gpt_5_5");
});

test("legacy Codex default settings migrate to GPT-5.5", () => {
  const migrated = normalizeHaCodexSettings({
    defaults: { model_preset_id: "codex_default" },
    model_presets: [
      { id: "codex_default", label: "Codex default", model: null },
      { id: "custom", label: "Custom", model: "custom-model" },
    ],
  });

  assert.equal(migrated.defaults.model_preset_id, "gpt_5_5");
  assert.equal(migrated.model_presets.some((preset) => preset.id === "codex_default"), false);
  assert.equal(migrated.model_presets.some((preset) => preset.id === "custom"), true);
});

test("run settings normalization keeps manual overrides and rejects unknown enum values", () => {
  const normalized = normalizeRunSettings({
    mode: "manual",
    reasoning_effort: "high",
    plan_mode: "off",
  });

  assert.equal(normalized.mode, "manual");
  assert.equal(normalized.reasoning_effort, "high");
  assert.equal(normalized.plan_mode, "off");
  assert.throws(() => normalizeRunSettings({ tool_visibility: "everything" }), /tool_visibility/);
});

test("context budget helper estimates usage and warning levels", () => {
  const ok = contextBudgetState([{ label: "Small", payload: { value: "x".repeat(20) } }], 1000);
  const warning = contextBudgetState([{ label: "Large", payload: { value: "x".repeat(740) } }], 1000);
  const danger = contextBudgetState([{ label: "Huge", payload: { value: "x".repeat(940) } }], 1000);

  assert.equal(ok.level, "ok");
  assert.equal(warning.level, "warning");
  assert.equal(danger.level, "danger");
  assert.match(danger.label, /\/ 1k/);
});
