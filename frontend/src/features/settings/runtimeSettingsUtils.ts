import type { CodexSession, HaCodexSettings, ModelPreset, RunSettings } from "../../types/ha";
import type { HaContextItem } from "../context/contextUtils";

export const DEFAULT_MODEL_PRESET_ID = "gpt_5_5";
export const LEGACY_DEFAULT_MODEL_PRESET_ID = "codex_default";
export const BUILT_IN_MODEL_PRESETS: ModelPreset[] = [
  { id: "gpt_5_5", label: "GPT-5.5", model: "gpt-5.5" },
  { id: "gpt_5_4", label: "GPT-5.4", model: "gpt-5.4" },
  { id: "gpt_5_4_mini", label: "GPT-5.4-Mini", model: "gpt-5.4-mini" },
  { id: "gpt_5_3_codex", label: "GPT-5.3-Codex", model: "gpt-5.3-codex" },
  { id: "gpt_5_3_codex_spark", label: "GPT-5.3-Codex-Spark", model: "gpt-5.3-codex-spark" },
  { id: "gpt_5_2", label: "GPT-5.2", model: "gpt-5.2" },
];
export const BUILT_IN_MODEL_PRESET_IDS = new Set(BUILT_IN_MODEL_PRESETS.map((preset) => preset.id));

export const DEFAULT_RUN_SETTINGS: RunSettings = {
  mode: "auto",
  model_preset_id: DEFAULT_MODEL_PRESET_ID,
  reasoning_effort: "auto",
  verbosity: "auto",
  plan_mode: "auto",
  validation_depth: "auto",
  tool_visibility: "normal",
  approval_mode: "ask",
};

const RUN_SETTING_VALUES = {
  mode: ["auto", "manual"],
  reasoning_effort: ["auto", "minimal", "low", "medium", "high", "xhigh"],
  verbosity: ["auto", "low", "medium", "high"],
  plan_mode: ["auto", "always", "off"],
  validation_depth: ["auto", "none", "full"],
  tool_visibility: ["compact", "normal", "verbose"],
  approval_mode: ["ask", "auto_readonly"],
} as const;

export type ContextBudgetLevel = "ok" | "warning" | "danger";

export function defaultHaCodexSettings(): HaCodexSettings {
  return {
    defaults: { ...DEFAULT_RUN_SETTINGS },
    model_presets: BUILT_IN_MODEL_PRESETS.map((preset) => ({ ...preset })),
    context_budget_chars: 40_000,
  };
}

export function normalizeRunSettings(value: Partial<RunSettings> | Record<string, unknown> | undefined, base: RunSettings = DEFAULT_RUN_SETTINGS): RunSettings {
  const settings: RunSettings = { ...base };
  if (!value || typeof value !== "object") return settings;
  Object.entries(RUN_SETTING_VALUES).forEach(([key, values]) => {
    if (!(key in value)) return;
    const candidate = String((value as Record<string, unknown>)[key] || "");
    if (!(values as readonly string[]).includes(candidate)) {
      throw new Error(`${key} must be one of ${(values as readonly string[]).join(", ")}`);
    }
    (settings as unknown as Record<string, string>)[key] = candidate;
  });
  if ("model_preset_id" in value) {
    const presetId = String(value.model_preset_id || "").trim();
    if (!presetId) throw new Error("model_preset_id is required");
    settings.model_preset_id = presetId;
  }
  return settings;
}

export function normalizeHaCodexSettings(value: Partial<HaCodexSettings> | Record<string, unknown> | undefined): HaCodexSettings {
  const defaults = defaultHaCodexSettings();
  if (!value || typeof value !== "object") return defaults;
  const modelPresets = normalizeModelPresets((value as Partial<HaCodexSettings>).model_presets);
  const settings: HaCodexSettings = {
    defaults: normalizeRunSettings((value as Partial<HaCodexSettings>).defaults, defaults.defaults),
    model_presets: modelPresets,
    context_budget_chars: normalizeContextBudget((value as Partial<HaCodexSettings>).context_budget_chars),
  };
  if (
    settings.defaults.model_preset_id === LEGACY_DEFAULT_MODEL_PRESET_ID
    || !settings.model_presets.some((preset) => preset.id === settings.defaults.model_preset_id)
  ) {
    settings.defaults.model_preset_id = DEFAULT_MODEL_PRESET_ID;
  }
  return settings;
}

export function normalizeModelPresets(value: unknown): ModelPreset[] {
  const presets: ModelPreset[] = BUILT_IN_MODEL_PRESETS.map((preset) => ({ ...preset }));
  const seen = new Set([...BUILT_IN_MODEL_PRESETS.map((preset) => preset.id), LEGACY_DEFAULT_MODEL_PRESET_ID]);
  if (!Array.isArray(value)) return presets;
  value.forEach((item) => {
    if (!item || typeof item !== "object") return;
    const preset = item as Partial<ModelPreset>;
    const id = String(preset.id || "").trim();
    if (!id || seen.has(id)) return;
    const label = String(preset.label || id).trim() || id;
    const model = preset.model === null || preset.model === undefined ? null : String(preset.model).trim() || null;
    presets.push({ id, label, model });
    seen.add(id);
  });
  return presets;
}

export function modelPresetOptions(settings: HaCodexSettings): Array<{ value: string; label: string; model: string | null }> {
  return normalizeHaCodexSettings(settings).model_presets.map((preset) => ({
    value: preset.id,
    label: preset.label,
    model: preset.model,
  }));
}

export function upsertModelPreset(settings: HaCodexSettings, preset: ModelPreset): HaCodexSettings {
  const normalized = normalizeHaCodexSettings(settings);
  const id = String(preset.id || presetIdFromLabel(preset.label || preset.model || "model")).trim();
  if (!id || BUILT_IN_MODEL_PRESET_IDS.has(id)) return normalized;
  const nextPreset: ModelPreset = {
    id,
    label: String(preset.label || id).trim() || id,
    model: preset.model === null ? null : String(preset.model || "").trim() || null,
  };
  const existingIndex = normalized.model_presets.findIndex((item) => item.id === id);
  const modelPresets = [...normalized.model_presets];
  if (existingIndex === -1) modelPresets.push(nextPreset);
  else modelPresets[existingIndex] = nextPreset;
  return { ...normalized, model_presets: modelPresets };
}

export function deleteModelPreset(settings: HaCodexSettings, presetId: string): HaCodexSettings {
  const normalized = normalizeHaCodexSettings(settings);
  if (BUILT_IN_MODEL_PRESET_IDS.has(presetId)) return normalized;
  const modelPresets = normalized.model_presets.filter((preset) => preset.id !== presetId);
  const defaults = normalized.defaults.model_preset_id === presetId
    ? { ...normalized.defaults, model_preset_id: DEFAULT_MODEL_PRESET_ID }
    : normalized.defaults;
  return { ...normalized, defaults, model_presets: modelPresets };
}

export function runSettingsForSession(session: Pick<CodexSession, "metadata"> | null | undefined, settings: HaCodexSettings): RunSettings {
  const normalized = normalizeHaCodexSettings(settings);
  const override = session?.metadata?.run_settings;
  const runSettings = normalizeRunSettings(
    override && typeof override === "object" ? override as Record<string, unknown> : undefined,
    normalized.defaults,
  );
  if (
    runSettings.model_preset_id === LEGACY_DEFAULT_MODEL_PRESET_ID
    || !normalized.model_presets.some((preset) => preset.id === runSettings.model_preset_id)
  ) {
    runSettings.model_preset_id = DEFAULT_MODEL_PRESET_ID;
  }
  return runSettings;
}

export function contextBudgetState(items: HaContextItem[], budget = 40_000): { used: number; budget: number; ratio: number; level: ContextBudgetLevel; label: string } {
  const safeBudget = Math.max(1000, Number.isFinite(Number(budget)) ? Number(budget) : 40_000);
  const used = estimateContextChars(items);
  const ratio = used / safeBudget;
  const level: ContextBudgetLevel = ratio >= 0.9 ? "danger" : ratio >= 0.7 ? "warning" : "ok";
  return {
    used,
    budget: safeBudget,
    ratio,
    level,
    label: `${formatBudgetNumber(used)} / ${formatBudgetNumber(safeBudget)}`,
  };
}

export function estimateContextChars(items: HaContextItem[]): number {
  return items.reduce((total, item) => total + JSON.stringify(item).length, 0);
}

export function presetIdFromLabel(value: string): string {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return slug || `model_${Date.now()}`;
}

function normalizeContextBudget(value: unknown): number {
  const budget = Number(value);
  if (!Number.isFinite(budget)) return 40_000;
  return Math.min(200_000, Math.max(1000, Math.round(budget)));
}

function formatBudgetNumber(value: number): string {
  if (value < 1000) return String(Math.round(value));
  return `${Math.round(value / 1000)}k`;
}
