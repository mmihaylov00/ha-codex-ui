export interface HomeAssistant {
  connection?: {
    subscribeEvents: (
      callback: (event: HaCodexEvent) => void,
      eventType: string,
    ) => Promise<() => void> | (() => void) | void;
  };
  states?: Record<string, HassEntity>;
  themes?: HomeAssistantThemes;
  selectedTheme?: HomeAssistantThemeSettings | string | null;
  callWS<T = unknown>(payload: Record<string, unknown>): Promise<T>;
}

export interface HomeAssistantThemeSettings {
  theme: string;
  dark?: boolean;
  primaryColor?: string;
  accentColor?: string;
}

export interface HomeAssistantThemes {
  default_theme?: string;
  default_dark_theme?: string | null;
  themes?: Record<string, unknown>;
  darkMode?: boolean;
  theme?: string;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes?: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface PanelInfo {
  config?: {
    events?: Record<string, string>;
  };
}

export interface HaCodexEvent {
  event_type?: string;
  type?: string;
  data?: HaCodexEventData;
}

export interface HaCodexEventData {
  session_id?: string;
  deleted_session_id?: string;
  message_id?: number | string;
  message?: CodexMessage;
  delta?: string;
  session?: CodexSession;
  approval?: Approval;
  validation?: ValidationResult;
}

export interface CodexSession {
  id: string;
  title: string;
  messages?: CodexMessage[];
  approvals?: Approval[];
  codex_session_id?: string | null;
  status?: string;
  validation?: ValidationResult | null;
  archived?: boolean;
  archived_at?: number | null;
  created_at?: number;
  updated_at?: number;
  last_message_id?: number | string | null;
  last_user_message_at?: number | null;
  has_pending_question?: boolean;
  metadata?: Record<string, unknown>;
}

export type ModelPreset = {
  id: string;
  label: string;
  model: string | null;
};

export type RunSettings = {
  mode: "auto" | "manual";
  model_preset_id: string;
  reasoning_effort: "auto" | "minimal" | "low" | "medium" | "high" | "xhigh";
  verbosity: "auto" | "low" | "medium" | "high";
  plan_mode: "auto" | "always" | "off";
  validation_depth: "auto" | "none" | "full";
  tool_visibility: "compact" | "normal" | "verbose";
  approval_mode: "ask" | "auto_readonly";
};

export type HaCodexSettings = {
  defaults: RunSettings;
  model_presets: ModelPreset[];
  context_budget_chars: number;
};

export interface RunPlan {
  id: string;
  prompt?: string;
  content?: string;
  status?: "planning" | "pending" | "approved" | "canceled" | "revised" | "error" | string;
  created_at?: number;
  planned_at?: number;
}

export interface CodexMessage {
  id?: number | string;
  role?: "user" | "assistant" | "event" | "system" | string;
  content?: string;
  created_at?: number;
  metadata?: Record<string, unknown>;
}

export interface Approval {
  id: string;
  command?: string;
  reason?: string;
  cwd?: string;
  status?: string;
}

export interface ValidationResult {
  ok?: boolean;
  status?: string;
  command?: string[];
  returncode?: number;
  stdout?: string;
  stderr?: string;
  created_at?: number;
  summary?: ValidationSummary | null;
}

export interface ValidationDomain {
  id: string;
  label: string;
  paths?: string[];
  reloadable?: boolean;
  restart_required?: boolean;
}

export interface ValidationSummary {
  recommendation?: "no_action_needed" | "reload_may_be_enough" | "restart_required" | "fix_validation_errors" | "validation_unavailable" | string;
  label?: string;
  severity?: string;
  changed_files?: GitFile[];
  affected_domains?: ValidationDomain[];
  reload_domains?: string[];
  restart_required?: boolean;
  session_id?: string | null;
  session_title?: string | null;
}

export interface GitFile {
  path: string;
  old_path?: string;
  display_name?: string;
  status?: string;
  code?: string;
  added_lines?: number | null;
  deleted_lines?: number | null;
  patch?: string;
  stderr?: string;
  patch_error?: string;
}

export interface GitChanges {
  ok?: boolean;
  returncode?: number;
  step?: string;
  stdout?: string;
  stderr?: string;
  changed_count?: number;
  files?: GitFile[];
  legacy?: boolean;
  results?: Array<{ ok?: boolean; stdout?: string; stderr?: string }>;
  selected_paths?: string[];
  discarded_paths?: string[];
}

export interface GitCommit {
  hash?: string;
  short_hash?: string;
  timestamp?: number;
  subject?: string;
}

export interface GitSetupStatus {
  ok?: boolean;
  git_available?: boolean;
  git_version?: string;
  repository?: boolean;
  repo_error?: string;
  work_tree?: string;
  branch?: string;
  upstream?: string;
  remote_configured?: boolean;
  remote_url?: string;
  remote_uses_ssh?: boolean;
  ssh_key_exists?: boolean;
  ssh_key_path?: string;
  ssh_public_key_path?: string;
  public_key?: string;
  history?: GitCommit[];
  setup_complete?: boolean;
  missing?: string[];
}

export interface GitSetupResult {
  ok?: boolean;
  step?: string;
  stdout?: string;
  stderr?: string;
  public_key?: string;
  status?: GitSetupStatus;
  results?: Array<{ ok?: boolean; stdout?: string; stderr?: string; returncode?: number | null }>;
}

export interface RollbackSummary {
  checkpoint_id?: string;
  run_id?: string;
  status?: "available" | "rolled_back" | "blocked" | "unavailable" | "pending" | string;
  changed_files?: string[];
  reason?: string | null;
}

export interface RollbackResult {
  ok?: boolean;
  reason?: string;
  checkpoint?: RollbackSummary;
}

export interface BridgeLog {
  exists?: boolean;
  path?: string;
  lines?: string;
  line_count?: number;
  truncated?: boolean;
  error?: string;
}

export interface CodexAccountStatus {
  ok?: boolean;
  logged_in?: boolean;
  auth_mode?: string | null;
  account_id?: string | null;
  last_refresh?: string | null;
  status_text?: string | null;
  error?: string;
}

export interface CodexDeviceLoginStatus {
  ok?: boolean;
  active?: boolean;
  status?: "idle" | "pending" | "succeeded" | "failed" | "canceled" | string;
  verification_uri?: string | null;
  user_code?: string | null;
  output?: string;
  error?: string | null;
  returncode?: number | null;
  started_at?: number | null;
  completed_at?: number | null;
}

export interface EntityRegistryEntry {
  entity_id: string;
  name?: string | null;
  original_name?: string | null;
  device_id?: string | null;
  area_id?: string | null;
  platform?: string | null;
  hidden_by?: string | null;
  disabled_by?: string | null;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  area_id?: string | null;
  disabled_by?: string | null;
}

export interface AreaRegistryEntry {
  area_id: string;
  name: string;
  aliases?: string[];
}

export interface ContextLog {
  id: string;
  name: string;
  path?: string;
  exists?: boolean;
  lines?: string;
  line_count?: number;
  truncated?: boolean;
  error?: string;
}

export interface ContextConfigFile {
  path: string;
  size?: number;
  modified?: number;
}

export interface ContextConfigFilePreview extends ContextConfigFile {
  content: string;
  truncated?: boolean;
}
