import type { CodexSession, RunPlan } from "../../types/ha";

export function pendingRunPlan(session?: CodexSession | null): RunPlan | null {
  const plan = session?.metadata?.pending_plan as RunPlan | undefined;
  if (!plan || plan.status !== "pending" || !plan.id) return null;
  return plan;
}

export function isRunPlanGenerating(session?: CodexSession | null): boolean {
  const plan = session?.metadata?.pending_plan as RunPlan | undefined;
  return Boolean(plan && plan.status === "planning");
}

export function runPlanActionDisabled(session?: CodexSession | null): boolean {
  return isRunPlanGenerating(session) || !pendingRunPlan(session);
}

export function runPlanRevisePrompt(session?: CodexSession | null): string {
  return String(pendingRunPlan(session)?.prompt || "").trim();
}
