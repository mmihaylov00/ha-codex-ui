import type {
  AreaRegistryEntry,
  BridgeLog,
  CodexSession,
  CodexAccountStatus,
  CodexDeviceLoginStatus,
  ContextConfigFile,
  ContextConfigFilePreview,
  ContextLog,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  GitChanges,
  GitFile,
  GitSetupResult,
  GitSetupStatus,
  HaCodexSettings,
  HomeAssistant,
  RollbackResult,
  RunSettings,
  ValidationResult,
} from "../types/ha";
import type { ContextSendPayload, HaContextItem } from "../features/context/contextUtils";

function sendPayload(request: string | ContextSendPayload, fallbackContext: HaContextItem[] = []): Record<string, unknown> {
  const payload = typeof request === "string" ? { prompt: request, context: fallbackContext } : request;
  return {
    prompt: payload.prompt,
    ...(payload.context.length ? { context: payload.context } : {}),
    ...(payload.runPrompt ? { run_prompt: payload.runPrompt } : {}),
    ...(payload.metadata ? { metadata: payload.metadata } : {}),
    ...(payload.runSettings ? { run_settings: payload.runSettings } : {}),
  };
}

export class HaCodexApi {
  constructor(private getHass: () => HomeAssistant | null) {}

  async callWS<T>(payload: Record<string, unknown>): Promise<T> {
    const hass = this.getHass();
    if (!hass) throw new Error("Home Assistant connection is not ready");
    return hass.callWS<T>(payload);
  }

  status() {
    return this.callWS<Record<string, unknown>>({ type: "ha_codex/status" });
  }

  settings() {
    return this.callWS<{ settings: HaCodexSettings }>({ type: "ha_codex/settings/get" });
  }

  updateSettings(settings: Partial<HaCodexSettings>) {
    return this.callWS<{ settings: HaCodexSettings }>({ type: "ha_codex/settings/update", settings });
  }

  bridgeLog(lines = 500) {
    return this.callWS<BridgeLog>({ type: "ha_codex/bridge_log", lines });
  }

  bridgeLogClear() {
    return this.callWS<BridgeLog>({ type: "ha_codex/bridge_log/clear" });
  }

  bridgeRestart() {
    return this.callWS<{ ok?: boolean; error?: string }>({ type: "ha_codex/bridge_restart" });
  }

  coreRestart() {
    return this.callWS<{ ok?: boolean; error?: string }>({ type: "ha_codex/core_restart" });
  }

  accountStatus() {
    return this.callWS<CodexAccountStatus>({ type: "ha_codex/account/status" });
  }

  accountDeviceLoginStart() {
    return this.callWS<CodexDeviceLoginStatus>({ type: "ha_codex/account/device_login/start" });
  }

  accountDeviceLoginStatus() {
    return this.callWS<CodexDeviceLoginStatus>({ type: "ha_codex/account/device_login/status" });
  }

  accountDeviceLoginCancel() {
    return this.callWS<CodexDeviceLoginStatus>({ type: "ha_codex/account/device_login/cancel" });
  }

  accountLogout() {
    return this.callWS<{ ok?: boolean; error?: string; account?: CodexAccountStatus }>({ type: "ha_codex/account/logout" });
  }

  entityRegistry() {
    return this.callWS<EntityRegistryEntry[]>({ type: "config/entity_registry/list" });
  }

  deviceRegistry() {
    return this.callWS<DeviceRegistryEntry[]>({ type: "config/device_registry/list" });
  }

  areaRegistry() {
    return this.callWS<AreaRegistryEntry[]>({ type: "config/area_registry/list" });
  }

  contextLogs(lines = 200) {
    return this.callWS<{ logs?: ContextLog[] }>({ type: "ha_codex/context/logs", lines });
  }

  contextConfigFiles() {
    return this.callWS<{ files?: ContextConfigFile[] }>({ type: "ha_codex/context/config_files" });
  }

  contextConfigFile(path: string) {
    return this.callWS<ContextConfigFilePreview>({ type: "ha_codex/context/config_file", path });
  }

  listSessions() {
    return this.callWS<{ sessions?: CodexSession[] }>({ type: "ha_codex/sessions/list" });
  }

  messagesAfter(sessionId: string, afterId: number, limit?: number) {
    return this.callWS<{ messages?: import("../types/ha").CodexMessage[] }>({
      type: "ha_codex/sessions/messages_after",
      session_id: sessionId,
      after_id: afterId,
      ...(limit ? { limit } : {}),
    });
  }

  createSession() {
    return this.callWS<{ session: CodexSession }>({ type: "ha_codex/sessions/create" });
  }

  send(sessionId: string, request: string | ContextSendPayload, context: HaContextItem[] = []) {
    const payload = sendPayload(request, context);
    return this.callWS<{ session: CodexSession }>({
      type: "ha_codex/sessions/send",
      session_id: sessionId,
      ...payload,
    });
  }

  updateSessionRunSettings(sessionId: string, runSettings: Partial<RunSettings>) {
    return this.callWS<{ session: CodexSession }>({
      type: "ha_codex/sessions/run_settings/update",
      session_id: sessionId,
      run_settings: runSettings,
    });
  }

  respondRunPlan(sessionId: string, planId: string, action: "approve" | "cancel" | "revise") {
    return this.callWS<{ session: CodexSession }>({
      type: "ha_codex/sessions/run_plan/respond",
      session_id: sessionId,
      plan_id: planId,
      action,
    });
  }

  rollbackRun(sessionId: string, checkpointId: string) {
    return this.callWS<RollbackResult>({
      type: "ha_codex/sessions/rollback_run",
      session_id: sessionId,
      checkpoint_id: checkpointId,
    });
  }

  steer(sessionId: string, request: string | ContextSendPayload, context: HaContextItem[] = []) {
    const payload = sendPayload(request, context);
    return this.callWS<{ session: CodexSession }>({
      type: "ha_codex/sessions/steer",
      session_id: sessionId,
      ...payload,
    });
  }

  retryContinue(sessionId: string) {
    return this.callWS<{ session: CodexSession }>({
      type: "ha_codex/sessions/retry_continue",
      session_id: sessionId,
    });
  }

  cancel(sessionId: string) {
    return this.callWS<{ session: CodexSession }>({ type: "ha_codex/sessions/cancel", session_id: sessionId });
  }

  rename(sessionId: string, title: string) {
    return this.callWS<{ session: CodexSession }>({ type: "ha_codex/sessions/rename", session_id: sessionId, title });
  }

  archive(sessionId: string, archived: boolean) {
    return this.callWS<{ session?: CodexSession; deleted_session_id?: string }>({
      type: "ha_codex/sessions/archive",
      session_id: sessionId,
      archived,
    });
  }

  respondApproval(sessionId: string, approvalId: string, approved: boolean) {
    return this.callWS<{ session: CodexSession }>({
      type: "ha_codex/approvals/respond",
      session_id: sessionId,
      approval_id: approvalId,
      approved,
    });
  }

  gitStatus() {
    return this.callWS<GitChanges>({ type: "ha_codex/git/status" });
  }

  gitSetupStatus() {
    return this.callWS<GitSetupStatus>({ type: "ha_codex/git/setup/status" });
  }

  gitSetupGenerateKey() {
    return this.callWS<GitSetupResult>({ type: "ha_codex/git/setup/generate_key" });
  }

  gitSetupSetRemote(remoteUrl: string) {
    return this.callWS<GitSetupResult>({ type: "ha_codex/git/setup/set_remote", remote_url: remoteUrl });
  }

  gitSetupPull() {
    return this.callWS<GitSetupResult>({ type: "ha_codex/git/setup/pull" });
  }

  gitChanges() {
    return this.callWS<GitChanges>({ type: "ha_codex/git/changes" });
  }

  gitDiff() {
    return this.callWS<GitChanges>({ type: "ha_codex/git/diff" });
  }

  gitFileDiff(path: string, oldPath = "") {
    return this.callWS<GitFile>({ type: "ha_codex/git/file_diff", path, ...(oldPath ? { old_path: oldPath } : {}) });
  }

  commitPush(message: string, files: GitFile[]) {
    return this.callWS<GitChanges>({ type: "ha_codex/git/commit_push", message, files: gitFilePayload(files) });
  }

  discard(files: GitFile[]) {
    return this.callWS<GitChanges>({ type: "ha_codex/git/discard", files: gitFilePayload(files) });
  }

  runValidation(sessionId?: string | null) {
    return this.callWS<{ validation: ValidationResult }>({
      type: "ha_codex/validation/run",
      session_id: sessionId || "",
    });
  }

  reloadValidationDomains(domains: string[]) {
    return this.callWS<{ ok?: boolean; domains?: string[]; results?: Array<{ ok?: boolean; service?: string }> }>({
      type: "ha_codex/validation/reload",
      domains,
    });
  }
}

function gitFilePayload(files: GitFile[]) {
  return files.map((file) => ({
    path: file.path,
    ...(file.old_path ? { old_path: file.old_path } : {}),
  }));
}
