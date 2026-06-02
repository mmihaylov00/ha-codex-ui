import type { ContextSendPayload, HaContextItem, HaContextKind } from "../context/contextUtils";

const CONTEXT_SELECTION_LIMIT = 20;

export type BuilderTemplateId =
  | "create_automation"
  | "fix_automation"
  | "create_script"
  | "convert_blueprint"
  | "explain_simplify";

export interface BuilderField {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  control?: BuilderFieldControl;
}

export type BuilderFieldControl =
  | { type: "action" }
  | { type: "condition" }
  | { type: "entity"; domains?: string[]; multiple?: boolean }
  | { type: "notification" }
  | { type: "select"; options: BuilderFieldOption[] }
  | { type: "trigger" };

export interface BuilderFieldOption {
  label: string;
  value: string;
}

export interface BuilderTemplate {
  id: BuilderTemplateId;
  label: string;
  icon: string;
  fields: BuilderField[];
  requiredContextKinds?: HaContextKind[];
}

export interface BuilderSelection {
  label: string;
  value: string;
}

export type BuilderValues = Record<string, string | undefined>;

export const BUILDER_TEMPLATES: BuilderTemplate[] = [
  {
    id: "create_automation",
    label: "Create automation",
    icon: "mdi:robot-industrial-outline",
    fields: [
      { id: "goal", label: "Goal", required: true, multiline: true, placeholder: "Turn on the kitchen light when motion is detected after sunset." },
      { id: "trigger", label: "Trigger", placeholder: "Motion is detected in the kitchen after sunset." },
      { id: "actions", label: "Action", placeholder: "Turn on light.kitchen at 60%." },
      { id: "details", label: "Details", multiline: true, placeholder: "Optional conditions, notifications, timing, or edge cases." },
    ],
  },
  {
    id: "fix_automation",
    label: "Fix automation",
    icon: "mdi:wrench-clock",
    requiredContextKinds: ["automation", "script"],
    fields: [
      { id: "issue", label: "Issue", required: true, multiline: true, placeholder: "It no longer triggers when the door opens." },
      { id: "expected", label: "Expected behavior", multiline: true },
      {
        id: "reload",
        label: "Reload expectation",
        placeholder: "Tell me whether automations/scripts need reload.",
        control: {
          type: "select",
          options: [
            { label: "Recommend automation/script reload", value: "Recommend reloading automations/scripts if YAML changed." },
            { label: "No reload needed", value: "No reload should be needed unless files are changed." },
            { label: "Mention restart only if required", value: "Mention a Home Assistant Core restart only if the change truly requires it." },
          ],
        },
      },
    ],
  },
  {
    id: "create_script",
    label: "Create script",
    icon: "mdi:script-text-outline",
    fields: [
      { id: "goal", label: "Goal", required: true, multiline: true, placeholder: "Set movie mode in the living room." },
      { id: "target", label: "Targets", placeholder: "light.living_room, media_player.tv", control: { type: "entity", domains: ["light", "switch", "fan", "cover", "climate", "media_player", "lock", "scene", "script", "input_boolean", "input_button", "button"], multiple: true } },
      { id: "actions", label: "Actions", placeholder: "Dim lights, close covers, set TV input.", control: { type: "action" } },
      { id: "fields", label: "Script fields", placeholder: "Optional variables to expose" },
    ],
  },
  {
    id: "convert_blueprint",
    label: "Convert to blueprint",
    icon: "mdi:file-tree-outline",
    requiredContextKinds: ["automation", "script"],
    fields: [
      { id: "source", label: "Source", required: true, placeholder: "automation.porch_light", control: { type: "entity", domains: ["automation", "script"] } },
      { id: "goal", label: "Blueprint goal", multiline: true, placeholder: "Make entity IDs configurable for other rooms." },
      { id: "inputs", label: "Inputs", multiline: true, placeholder: "motion sensor, light target, delay" },
    ],
  },
  {
    id: "explain_simplify",
    label: "Explain or simplify",
    icon: "mdi:text-box-search-outline",
    requiredContextKinds: ["automation", "script"],
    fields: [
      { id: "source", label: "Source", placeholder: "automation.porch_light", control: { type: "entity", domains: ["automation", "script"] } },
      { id: "goal", label: "Focus", multiline: true, placeholder: "Explain what it does and simplify duplicate conditions." },
      { id: "constraints", label: "Keep behavior", placeholder: "Preserve current behavior unless clearly broken." },
    ],
  },
];

export function builderTemplate(id: BuilderTemplateId): BuilderTemplate {
  const template = BUILDER_TEMPLATES.find((item) => item.id === id);
  if (!template) throw new Error(`Unknown builder template: ${id}`);
  return template;
}

export function requiredBuilderMessages(
  templateId: BuilderTemplateId,
  values: BuilderValues,
  context: HaContextItem[] = [],
): string[] {
  const template = builderTemplate(templateId);
  const messages = template.fields
    .filter((field) => field.required && !fieldValue(values, field.id))
    .map((field) => requiredFieldMessage(field));
  if (template.requiredContextKinds?.length && !hasRequiredContext(context, template.requiredContextKinds)) {
    messages.push("Select an automation or script as context.");
  }
  return messages;
}

export function buildAutomationScriptRequest(
  templateId: BuilderTemplateId,
  values: BuilderValues,
  context: HaContextItem[] = [],
): ContextSendPayload {
  const missing = requiredBuilderMessages(templateId, values, context);
  if (missing.length) throw new Error(missing.join(" "));
  const template = builderTemplate(templateId);
  const selections = selectionSummary(template, values);
  const prompt = readablePrompt(template, values, context);
  const runPrompt = codexPrompt(template, selections, contextItemsForBuilder(context));
  return buildBuilderSendPayload(prompt, context, {
    runPrompt,
    metadata: {
      builder: {
        template_id: template.id,
        template_label: template.label,
        selections,
      },
    },
  });
}

function buildBuilderSendPayload(
  prompt: string,
  context: HaContextItem[],
  options: { runPrompt: string; metadata: Record<string, unknown> },
): ContextSendPayload {
  return {
    prompt: prompt.trim(),
    context: contextItemsForBuilder(context),
    runPrompt: options.runPrompt.trim(),
    metadata: options.metadata,
  };
}

export function builderMetadataSummary(metadata?: Record<string, unknown> | null): { label: string; selections: BuilderSelection[] } | null {
  const builder = metadata?.builder;
  if (!builder || typeof builder !== "object" || Array.isArray(builder)) return null;
  const value = builder as Record<string, unknown>;
  const label = String(value.template_label || "").trim();
  const selections = Array.isArray(value.selections)
    ? value.selections.flatMap((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return [];
      const selection = item as Record<string, unknown>;
      const itemLabel = String(selection.label || "").trim();
      const itemValue = String(selection.value || "").trim();
      return itemLabel && itemValue ? [{ label: itemLabel, value: itemValue }] : [];
    })
    : [];
  return label ? { label, selections } : null;
}

function codexPrompt(template: BuilderTemplate, selections: BuilderSelection[], context: HaContextItem[]): string {
  const lines = [
    promptHeading(template.id),
    "",
    "Use the selected Home Assistant context and inspect the workspace before editing.",
    "Keep edits minimal and scoped to the automation, script, blueprint, or related config files needed for this request.",
    "Do not bypass existing command approvals or restart approval flow.",
  ];
  if (shouldValidate(template.id)) {
    lines.push("Validate the Home Assistant YAML when possible and report the validation result.");
    lines.push("Prefer reload recommendations for automations/scripts; recommend a Home Assistant Core restart only when required.");
  }
  if (context.length) {
    lines.push("", "Selected context:");
    context.forEach((item) => {
      lines.push(`- ${item.kind}: ${item.label}${item.subtitle ? ` (${item.subtitle})` : ""}`);
    });
  }
  if (selections.length) {
    lines.push("", "Builder inputs:");
    selections.forEach((selection) => {
      lines.push(`- ${selection.label}: ${selection.value}`);
    });
  }
  lines.push("", "After the run, surface changed files, validation status, and any reload or restart recommendation using the existing HA Codex mechanisms.");
  return lines.join("\n");
}

function promptHeading(templateId: BuilderTemplateId): string {
  switch (templateId) {
    case "create_automation":
      return "Create a Home Assistant automation from these structured inputs.";
    case "fix_automation":
      return "Fix the selected Home Assistant automation or script.";
    case "create_script":
      return "Create a Home Assistant script from these structured inputs.";
    case "convert_blueprint":
      return "Convert the selected automation or script into a Home Assistant blueprint and preserve the current behavior.";
    case "explain_simplify":
      return "Explain or simplify the selected Home Assistant automation or script.";
  }
}

function readablePrompt(template: BuilderTemplate, values: BuilderValues, context: HaContextItem[]): string {
  const goal = fieldValue(values, "goal");
  const source = fieldValue(values, "source") || firstContextLabel(context, template.requiredContextKinds);
  switch (template.id) {
    case "create_automation":
      return `Create automation: ${goal}`;
    case "fix_automation":
      return `Fix automation: ${fieldValue(values, "issue")}`;
    case "create_script":
      return `Create script: ${goal}`;
    case "convert_blueprint":
      return `Convert to blueprint: ${source || "selected automation/script"}`;
    case "explain_simplify":
      return `Explain or simplify: ${source || "selected automation/script"}`;
  }
}

function selectionSummary(template: BuilderTemplate, values: BuilderValues): BuilderSelection[] {
  return template.fields.flatMap((field) => {
    const value = fieldValue(values, field.id);
    return value ? [{ label: field.label, value }] : [];
  });
}

function hasRequiredContext(context: HaContextItem[], kinds: HaContextKind[]): boolean {
  return context.some((item) => kinds.includes(item.kind));
}

function contextItemsForBuilder(context: HaContextItem[]): HaContextItem[] {
  return context.slice(0, CONTEXT_SELECTION_LIMIT).map((item) => ({
    id: item.id,
    kind: item.kind,
    label: item.label,
    ...(item.subtitle ? { subtitle: item.subtitle } : {}),
    ...(item.payload ? { payload: { ...item.payload } } : {}),
  }));
}

function firstContextLabel(context: HaContextItem[], kinds?: HaContextKind[]): string {
  const item = context.find((candidate) => !kinds?.length || kinds.includes(candidate.kind));
  return item?.label || "";
}

function fieldValue(values: BuilderValues, id: string): string {
  return String(values[id] || "").trim();
}

function requiredFieldMessage(field: BuilderField): string {
  if (field.id === "issue") return "Describe what is broken.";
  return `${field.label} is required.`;
}

function shouldValidate(templateId: BuilderTemplateId): boolean {
  return templateId === "create_automation" || templateId === "fix_automation" || templateId === "create_script";
}
