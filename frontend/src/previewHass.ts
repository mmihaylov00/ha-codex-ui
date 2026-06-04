import type {
  CodexMessage,
  CodexSession,
  ContextConfigFile,
  ContextConfigFilePreview,
  ContextLog,
  GitChanges,
  GitFile,
  HaCodexSettings,
  HomeAssistant,
  ValidationDomain,
} from "./types/ha";

type EventCallback = (event: { event_type: string; data?: Record<string, unknown> }) => void;

const now = () => Date.now() / 1000;

const previewMessages: CodexMessage[] = [
  {
    id: 1,
    role: "user",
    content: "Review my lighting automation and suggest a safer trigger.",
    created_at: now() - 420,
  },
  {
    id: 2,
    role: "assistant",
    content: "I would first inspect the related automation YAML, then propose a small guarded change before applying it.",
    created_at: now() - 380,
  },
];

const previewSessions: CodexSession[] = [
  {
    id: "preview-active",
    title: "Lighting automation review",
    messages: previewMessages,
    approvals: [
      {
        id: "approval-preview-1",
        command: "ha core check",
        reason: "Validate the updated Home Assistant configuration before restart.",
        cwd: "/config",
        status: "pending",
      },
    ],
    status: "idle",
    archived: false,
    created_at: now() - 500,
    updated_at: now() - 60,
    last_message_id: 2,
    metadata: {
      pending_plan: {
        id: "plan-preview-1",
        prompt: "Review the lighting automation.",
        content: "1. Inspect automation YAML\n2. Update the trigger guard\n3. Run Home Assistant validation",
        status: "pending",
        created_at: now() - 120,
      },
    },
  },
  {
    id: "preview-archived",
    title: "Archived dashboard notes",
    messages: [
      {
        id: 1,
        role: "assistant",
        content: "This archived preview chat shows how older sessions appear in the rail.",
        created_at: now() - 7200,
      },
    ],
    approvals: [],
    status: "idle",
    archived: true,
    archived_at: now() - 3600,
    created_at: now() - 9000,
    updated_at: now() - 7200,
    last_message_id: 1,
    metadata: {},
  },
];

const previewFiles: ContextConfigFile[] = [
  { path: "configuration.yaml", size: 1260, modified: now() - 3000 },
  { path: "automations.yaml", size: 8420, modified: now() - 1800 },
  { path: "scripts.yaml", size: 2430, modified: now() - 1200 },
];

const previewLogs: ContextLog[] = [
  {
    id: "home-assistant",
    name: "Home Assistant log",
    path: "/config/home-assistant.log",
    exists: true,
    line_count: 2,
    lines: "INFO Preview bridge is using mock Home Assistant data.\nWARNING Kitchen motion automation skipped because illuminance was high.",
  },
];

const validationDomains: ValidationDomain[] = [
  { id: "automation", label: "Automations", paths: ["automations.yaml"], reloadable: true, restart_required: false },
  { id: "script", label: "Scripts", paths: ["scripts.yaml"], reloadable: true, restart_required: false },
];

const gitFiles: GitFile[] = [
  {
    path: "automations.yaml",
    status: "modified",
    code: " M",
    added_lines: 12,
    deleted_lines: 4,
    patch: "@@ -14,7 +14,8 @@\n- trigger: old\n+ trigger: new\n+ condition: sun below horizon",
  },
];

const previewSettings: HaCodexSettings = {
  defaults: {
    mode: "auto",
    model_preset_id: "gpt_5_5",
    reasoning_effort: "auto",
    verbosity: "auto",
    plan_mode: "auto",
    validation_depth: "auto",
    tool_visibility: "normal",
    approval_mode: "ask",
  },
  model_presets: [
    { id: "gpt_5_5", label: "GPT-5.5", model: "gpt-5.5" },
    { id: "gpt_5_4", label: "GPT-5.4", model: "gpt-5.4" },
    { id: "gpt_5_4_mini", label: "GPT-5.4-Mini", model: "gpt-5.4-mini" },
  ],
  context_budget_chars: 40_000,
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function previewSession(id: string) {
  const session = previewSessions.find((item) => item.id === id);
  if (!session) throw new Error(`Unknown preview session: ${id}`);
  return session;
}

function appendPreviewMessage(sessionId: string, role: CodexMessage["role"], content: string): CodexMessage {
  const session = previewSession(sessionId);
  const messages = session.messages || [];
  const message: CodexMessage = {
    id: messages.length + 1,
    role,
    content,
    created_at: now(),
  };
  messages.push(message);
  session.messages = messages;
  session.last_message_id = message.id;
  session.updated_at = message.created_at;
  return message;
}

function previewConfigFile(path: string): ContextConfigFilePreview {
  const file = previewFiles.find((item) => item.path === path) || previewFiles[0];
  return {
    path: file.path,
    size: file.size,
    modified: file.modified,
    truncated: false,
    content: "# Preview file content\n\nalias: Kitchen motion lighting\nmode: restart\n",
  };
}

export function createPreviewHomeAssistant(): HomeAssistant {
  const listeners = new Map<string, Set<EventCallback>>();

  return {
    selectedTheme: { theme: "Preview dark", dark: true },
    themes: { darkMode: true, themes: { "Preview dark": {} } },
    states: {
      "light.kitchen": { entity_id: "light.kitchen", state: "off", attributes: { friendly_name: "Kitchen" } },
      "sensor.office_temperature": { entity_id: "sensor.office_temperature", state: "22.4", attributes: { unit_of_measurement: "°C" } },
      "binary_sensor.front_door": { entity_id: "binary_sensor.front_door", state: "off", attributes: { friendly_name: "Front door" } },
    },
    connection: {
      subscribeEvents: (callback, eventType) => {
        const callbacks = listeners.get(eventType) || new Set<EventCallback>();
        callbacks.add(callback);
        listeners.set(eventType, callbacks);
        return () => callbacks.delete(callback);
      },
    },
    async callWS<T = unknown>(payload: Record<string, unknown>): Promise<T> {
      const type = String(payload.type || "");
      switch (type) {
        case "ha_codex/sessions/list":
          return { sessions: clone(previewSessions) } as T;
        case "ha_codex/status":
          return {
            preview: true,
            runtime: {
              runner_type: "preview",
              bridge_available: true,
              bridge_url: "mock://ha-codex-preview",
              codex_exec_available: true,
              codex_version: "preview",
              workspace_path: "/config",
              workspace_exists: true,
              validation_command: ["ha", "core", "check"],
              openai_training_opt_out_confirmed: true,
            },
          } as T;
        case "ha_codex/settings/get":
          return { settings: clone(previewSettings) } as T;
        case "ha_codex/settings/update":
          return { settings: { ...clone(previewSettings), ...(payload.settings || {}) } } as T;
        case "ha_codex/account/status":
          return { ok: true, logged_in: true, username: "preview@example.com" } as T;
        case "ha_codex/git/setup/status":
          return {
            ok: true,
            git_available: true,
            repository: true,
            branch: "feature/preview-mode",
            remote_configured: true,
            setup_complete: true,
            missing: [],
          } as T;
        case "ha_codex/git/status":
          return { ok: true, stdout: " M automations.yaml\n", changed_count: gitFiles.length, files: clone(gitFiles) } as T;
        case "ha_codex/git/changes":
        case "ha_codex/git/diff":
          return { ok: true, changed_count: gitFiles.length, files: clone(gitFiles) } satisfies GitChanges as T;
        case "ha_codex/git/file_diff":
          return clone(gitFiles[0]) as T;
        case "ha_codex/context/config_files":
          return { files: clone(previewFiles) } as T;
        case "ha_codex/context/config_file":
          return previewConfigFile(String(payload.path || previewFiles[0].path)) as T;
        case "ha_codex/context/logs":
          return { logs: clone(previewLogs) } as T;
        case "config/entity_registry/list":
          return [
            { entity_id: "light.kitchen", name: "Kitchen light", platform: "demo" },
            { entity_id: "sensor.office_temperature", name: "Office temperature", platform: "demo" },
          ] as T;
        case "config/device_registry/list":
          return [{ id: "preview-device", name_by_user: "Preview Hub", area_id: "office" }] as T;
        case "config/area_registry/list":
          return [{ area_id: "office", name: "Office" }, { area_id: "kitchen", name: "Kitchen" }] as T;
        case "get_services":
          return { light: { turn_on: { name: "Turn on" }, turn_off: { name: "Turn off" } } } as T;
        case "ha_codex/validation/run":
          return {
            validation: {
              ok: true,
              status: "passed",
              command: ["ha", "core", "check"],
              returncode: 0,
              stdout: "Preview validation passed.",
              stderr: "",
              created_at: now(),
              summary: { recommendation: "reload_may_be_enough", label: "Reload may be enough", affected_domains: validationDomains },
            },
          } as T;
        case "ha_codex/validation/reload_domains":
          return { ok: true, domains: payload.domains || [], results: [] } as T;
        case "ha_codex/bridge_log":
          return { exists: true, path: "/config/ha_codex_bridge.log", lines: "Preview bridge log\nNo real bridge is running in dev preview." } as T;
        case "ha_codex/bridge_log/clear":
          return { exists: true, path: "/config/ha_codex_bridge.log", lines: "" } as T;
        case "ha_codex/account/device_login/start":
        case "ha_codex/account/device_login/status":
          return { status: "succeeded", user_code: "PREVIEW", verification_uri: "https://auth.openai.com/codex/device" } as T;
        case "ha_codex/sessions/create": {
          const session: CodexSession = {
            id: `preview-${Math.round(now() * 1000)}`,
            title: "New preview chat",
            messages: [],
            approvals: [],
            status: "idle",
            archived: false,
            created_at: now(),
            updated_at: now(),
            metadata: {},
          };
          previewSessions.unshift(session);
          return { session: clone(session) } as T;
        }
        case "ha_codex/sessions/send":
        case "ha_codex/sessions/steer": {
          const sessionId = String(payload.session_id || "");
          appendPreviewMessage(sessionId, "user", String(payload.prompt || ""));
          appendPreviewMessage(sessionId, "assistant", "Preview mode received the prompt. Connect through Home Assistant to run Codex for real.");
          return { session: clone(previewSession(sessionId)) } as T;
        }
        case "ha_codex/sessions/messages_after": {
          const session = previewSession(String(payload.session_id || ""));
          const afterId = Number(payload.after_id || 0);
          return { messages: clone((session.messages || []).filter((message) => Number(message.id || 0) > afterId)) } as T;
        }
        case "ha_codex/sessions/rename": {
          const session = previewSession(String(payload.session_id || ""));
          session.title = String(payload.title || session.title);
          session.updated_at = now();
          return { session: clone(session) } as T;
        }
        case "ha_codex/sessions/archive": {
          const session = previewSession(String(payload.session_id || ""));
          session.archived = Boolean(payload.archived);
          session.archived_at = session.archived ? now() : null;
          session.updated_at = now();
          return { session: clone(session) } as T;
        }
        case "ha_codex/approvals/respond": {
          const session = previewSession(String(payload.session_id || ""));
          session.approvals = (session.approvals || []).map((approval) =>
            approval.id === payload.approval_id ? { ...approval, status: payload.approved ? "approved" : "canceled" } : approval,
          );
          return { session: clone(session) } as T;
        }
        case "ha_codex/sessions/run_plan/respond": {
          const session = previewSession(String(payload.session_id || ""));
          const pendingPlan = session.metadata?.pending_plan;
          session.metadata = {
            ...session.metadata,
            pending_plan: pendingPlan && typeof pendingPlan === "object" ? { ...pendingPlan, status: payload.action } : pendingPlan,
          };
          return { session: clone(session) } as T;
        }
        case "ha_codex/sessions/run_settings/update":
          return { session: clone(previewSession(String(payload.session_id || ""))) } as T;
        case "ha_codex/sessions/cancel":
        case "ha_codex/sessions/retry_continue":
        case "ha_codex/sessions/rollback_run":
        case "ha_codex/core_restart":
        case "ha_codex/bridge_restart":
        case "ha_codex/account/logout":
        case "ha_codex/account/device_login/cancel":
        case "ha_codex/git/setup/generate_key":
        case "ha_codex/git/setup/set_remote":
        case "ha_codex/git/setup/pull":
        case "ha_codex/git/setup/change_branch":
        case "ha_codex/git/setup/checkout_commit":
        case "ha_codex/git/commit_push":
        case "ha_codex/git/discard":
          return { ok: true, session: payload.session_id ? clone(previewSession(String(payload.session_id))) : undefined } as T;
        default:
          throw new Error(`Preview websocket mock does not handle ${type}`);
      }
    },
  };
}
