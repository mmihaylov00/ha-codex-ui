import type { ValidationResult } from "../../types/ha";

export function validationSummaryTone(validation?: ValidationResult | null): "success" | "warning" | "error" | "restart" | "unknown" {
  const recommendation = validation?.summary?.recommendation;
  if (recommendation === "fix_validation_errors") return "error";
  if (recommendation === "restart_required") return "restart";
  if (recommendation === "reload_may_be_enough" || recommendation === "validation_unavailable") return "warning";
  if (recommendation === "no_action_needed") return "success";
  if (validation?.status === "failed" || validation?.ok === false) return "error";
  if (validation?.status === "passed" || validation?.ok === true || validation?.returncode === 0) return "success";
  return "unknown";
}

export function validationActionLabel(validation?: ValidationResult | null): string {
  if (validation?.summary?.label) return validation.summary.label;
  if (!validation) return "No validation result yet";
  if (validation.status === "passed") return "No action needed";
  if (validation.status === "failed") return "Fix validation errors first";
  if (validation.status === "unavailable") return "Validation unavailable";
  return "Validation finished";
}

export function validationReloadDomains(validation?: ValidationResult | null): string[] {
  if (validation?.summary?.recommendation !== "reload_may_be_enough") return [];
  return [...(validation.summary.reload_domains || [])];
}

export function validationCommandText(validation?: ValidationResult | null): string {
  return (validation?.command || []).join(" ");
}
