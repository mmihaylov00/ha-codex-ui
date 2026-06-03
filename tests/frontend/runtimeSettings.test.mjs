import assert from "node:assert/strict";
import test from "node:test";

import {
  contextBudgetState,
  defaultHaCodexSettings,
  deleteModelPreset,
  estimateContextChars,
  modelPresetOptions,
  normalizeHaCodexSettings,
  normalizeModelPresets,
  normalizeRunSettings,
  presetIdFromLabel,
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

test("settings normalization falls back from unknown presets and preserves custom presets", () => {
  const normalized = normalizeHaCodexSettings({
    defaults: { model_preset_id: "missing" },
    model_presets: [
      { id: "custom", label: "", model: "" },
      { id: "custom", label: "Duplicate", model: "duplicate" },
      null,
      [],
    ],
    context_budget_chars: 250000,
  });

  assert.equal(normalized.defaults.model_preset_id, "gpt_5_5");
  assert.equal(normalized.context_budget_chars, 200000);
  assert.deepEqual(normalized.model_presets.at(-1), { id: "custom", label: "custom", model: null });
  assert.equal(normalizeHaCodexSettings(undefined).context_budget_chars, 40000);
  assert.equal(normalizeModelPresets("not-an-array").length, 6);
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
  assert.equal(contextBudgetState([], Number.NaN).budget, 40000);
  assert.equal(estimateContextChars([{ label: "Small" }]), JSON.stringify({ label: "Small" }).length);
  assert.equal(presetIdFromLabel("  GPT 5.5 Codex! "), "gpt_5_5_codex");
  assert.match(presetIdFromLabel("!!!"), /^model_\d+$/);
});

test("model preset helpers update, reject, and delete expected presets", () => {
  const settings = defaultHaCodexSettings();
  const withPreset = upsertModelPreset(settings, {
    id: "",
    label: "Local Model",
    model: "",
  });
  const updated = upsertModelPreset(withPreset, {
    id: "local_model",
    label: "Local Model Updated",
    model: "local-model",
  });

  assert.deepEqual(upsertModelPreset(updated, { id: "gpt_5_5", label: "Nope", model: "nope" }), updated);
  assert.equal(updated.model_presets.at(-1).label, "Local Model Updated");
  assert.deepEqual(deleteModelPreset(updated, "gpt_5_5"), normalizeHaCodexSettings(updated));
  assert.equal(deleteModelPreset({
    ...updated,
    defaults: { ...updated.defaults, model_preset_id: "local_model" },
  }, "local_model").defaults.model_preset_id, "gpt_5_5");
  assert.equal(runSettingsForSession({ metadata: { run_settings: { model_preset_id: "missing" } } }, updated).model_preset_id, "gpt_5_5");
  assert.equal(runSettingsForSession({ metadata: { run_settings: { model_preset_id: "codex_default" } } }, {
    ...updated,
    model_presets: [...updated.model_presets, { id: "codex_default", label: "Legacy", model: null }],
  }).model_preset_id, "gpt_5_5");
});
