import { useLayoutEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { useUiStore } from "../stores/uiStore";
import { useChatStore } from "../stores/chatStore";
import type { GitCommit, HaCodexSettings, ModelPreset, RunSettings } from "../types/ha";
import type { SettingsTab } from "../types/ui";
import { gitSetupSummary, isGitSetupReady, paginateGitHistory } from "../features/git/gitUtils";
import { BUILT_IN_MODEL_PRESET_IDS, deleteModelPreset, presetIdFromLabel, upsertModelPreset } from "../features/settings/runtimeSettingsUtils";
import { copyText, formatDuration, formatRunTime, formatTimestampTitle, stripAnsi } from "../utils/format";

interface SettingsModalProps {
  onClose: () => void;
  onTab: (tab: SettingsTab) => void;
  onSettingsSave: (settings: Partial<HaCodexSettings>) => void;
  onBridgeRestart: () => void;
  onCoreRestart: () => void;
  onBridgeLogRefresh: () => void;
  onBridgeLogClear: () => void;
  onDeviceLogin: () => void;
  onDeviceLoginCancel: () => void;
  onAccountLogout: () => void;
  onGitSetupRefresh: () => void;
  onGitSetupGenerateKey: () => void;
  onGitSetupRemoteSave: (remoteUrl: string) => void;
  onGitSetupPull: () => void;
  onGitSetupBranchChange: (branch: string) => void;
  onGitSetupCommitCheckout: (commit: string) => void;
  onArchiveCleanup: () => void;
}

const TABS: Array<{ id: SettingsTab; label: string; icon: string }> = [
  { id: "account", label: "Account", icon: "mdi:account-outline" },
  { id: "git", label: "Git", icon: "mdi:source-branch" },
  { id: "run", label: "Run", icon: "mdi:play-circle-outline" },
  { id: "models", label: "Models", icon: "mdi:robot" },
  { id: "debug", label: "Debug", icon: "mdi:bug" },
  { id: "bridge-log", label: "Bridge Log", icon: "mdi:text-box-outline" },
];

export function SettingsModal({ onClose, onTab, onSettingsSave, onBridgeRestart, onCoreRestart, onBridgeLogRefresh, onBridgeLogClear, onDeviceLogin, onDeviceLoginCancel, onAccountLogout, onGitSetupRefresh, onGitSetupGenerateKey, onGitSetupRemoteSave, onGitSetupPull, onGitSetupBranchChange, onGitSetupCommitCheckout, onArchiveCleanup }: SettingsModalProps) {
  const tab = useUiStore((state) => state.settingsTab);
  const settings = useUiStore((state) => state.settings);
  const saving = useUiStore((state) => state.settingsSaving);
  const status = useUiStore((state) => state.status);
  const runtime = (status.runtime || {}) as Record<string, unknown>;
  const bridgeAvailable = runtime.bridge_available === true;
  const bridgeActionRunning = useUiStore((state) => state.bridgeActionRunning);
  const coreActionRunning = useUiStore((state) => state.coreActionRunning);
  const bridgeActionLabel = bridgeAvailable ? "Restart" : "Start";
  return (
    <div className="modal-backdrop">
      <div className="modal-scrim" onClick={onClose} />
      <section className="modal settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <header className="modal-header">
          <h2 id="settings-title">Settings</h2>
          <button className="icon-button" onClick={onClose} title="Close" aria-label="Close"><Icon icon="mdi:close" /></button>
        </header>
        <div className="modal-tabs">
          <div className="debug-tabs" role="tablist" aria-label="Settings views">
            {TABS.map((item) => (
              <button className={tab === item.id ? "active" : ""} onClick={() => onTab(item.id)} role="tab" aria-selected={tab === item.id} key={item.id}>
                <Icon icon={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <span className="modal-tab-spacer" />
          {saving ? <span className="settings-saving">Saving...</span> : null}
          <button className={`bridge-action ${bridgeAvailable ? "bridge-action-restart" : "bridge-action-start"}`} onClick={onBridgeRestart} title={`${bridgeActionLabel} bridge`} disabled={bridgeActionRunning}>
            <Icon icon={bridgeActionRunning ? "mdi:progress-clock" : bridgeAvailable ? "mdi:restart" : "mdi:play"} />
            <span>{bridgeActionRunning ? "Working..." : `${bridgeActionLabel} Bridge`}</span>
          </button>
          <button className="core-action" onClick={onCoreRestart} title="Restart Home Assistant Core" disabled={coreActionRunning}>
            <Icon icon={coreActionRunning ? "mdi:progress-clock" : "mdi:restart-alert"} />
            <span>{coreActionRunning ? "Working..." : "Restart HA"}</span>
          </button>
        </div>
        <div className="modal-body">
          {tab === "account" ? <AccountTab onDeviceLogin={onDeviceLogin} onDeviceLoginCancel={onDeviceLoginCancel} onAccountLogout={onAccountLogout} /> : null}
          {tab === "git" ? <GitSetupTab onRefresh={onGitSetupRefresh} onGenerateKey={onGitSetupGenerateKey} onRemoteSave={onGitSetupRemoteSave} onPull={onGitSetupPull} onBranchChange={onGitSetupBranchChange} onCommitCheckout={onGitSetupCommitCheckout} /> : null}
          {tab === "run" ? <RunSettingsTab settings={settings} onSave={onSettingsSave} onArchiveCleanup={onArchiveCleanup} /> : null}
          {tab === "models" ? <ModelsTab settings={settings} onSave={onSettingsSave} /> : null}
          {tab === "debug" ? <DebugTabView /> : null}
          {tab === "bridge-log" ? <BridgeLogTab onRefresh={onBridgeLogRefresh} onClear={onBridgeLogClear} /> : null}
        </div>
      </section>
    </div>
  );
}

function AccountTab({ onDeviceLogin, onDeviceLoginCancel, onAccountLogout }: { onDeviceLogin: () => void; onDeviceLoginCancel: () => void; onAccountLogout: () => void }) {
  const account = useUiStore((state) => state.account);
  const loading = useUiStore((state) => state.accountLoading);
  const running = useUiStore((state) => state.accountActionRunning);
  const deviceLogin = useUiStore((state) => state.deviceLogin);
  const status = useUiStore((state) => state.status);
  const usage = (status.usage || {}) as Record<string, unknown>;
  const [codeCopied, setCodeCopied] = useState(false);
  const loggedIn = account?.logged_in === true;
  const pending = deviceLogin?.status === "pending" || deviceLogin?.active;
  const statusText = account?.error || account?.status_text || (loggedIn ? "Logged in" : "Not logged in");
  const deviceOutput = stripAnsi(deviceLogin?.output || "").replace(/(?:%1b|%001b|%u001b|\\x1b|\\u001b)(?:\[[0-?]*[ -/]*[@-~])?/gi, "");
  const verificationUri = cleanDeviceLoginUrl(deviceLogin?.verification_uri) || extractDeviceLoginUrl(deviceOutput);
  const userCode = cleanDeviceLoginCode(deviceLogin?.user_code) || extractDeviceLoginCode(deviceOutput);
  const showDeviceLogin = pending || deviceLogin?.status === "failed" || deviceLogin?.status === "canceled";
  const showToast = useUiStore((state) => state.showToast);
  const copyDeviceCode = async () => {
    if (!userCode) return;
    await copyText(userCode);
    setCodeCopied(true);
    window.setTimeout(() => setCodeCopied(false), 1600);
    showToast("Device code copied", "success");
  };

  return (
    <div className="settings-account">
      <div className={`account-status-card ${loggedIn ? "success" : account?.error ? "error" : ""}`}>
        <div className="account-status-main">
          <Icon icon={loggedIn ? "mdi:account-check-outline" : "mdi:account-outline"} />
          <div>
            <strong>{loading ? "Checking account..." : loggedIn ? "Codex account connected" : "Codex account not connected"}</strong>
            <span>{statusText}</span>
          </div>
        </div>
        {loggedIn ? (
          <button className="danger" onClick={onAccountLogout} disabled={running}>
            <Icon icon={running ? "mdi:progress-clock" : "mdi:logout"} />
            <span>{running ? "Working..." : "Log out"}</span>
          </button>
        ) : (
          <button onClick={onDeviceLogin} disabled={running || pending}>
            <Icon icon={running ? "mdi:progress-clock" : "mdi:cellphone-key"} />
            <span>{running ? "Starting..." : pending ? "Login pending" : "Log in with device code"}</span>
          </button>
        )}
      </div>

      {loggedIn ? (
        <div className="account-details">
          <AccountDetail label="Mode" value={account?.auth_mode || "ChatGPT"} />
          <AccountDetail label="Account ID" value={account?.account_id || "Not reported"} />
          <AccountDetail label="Last refresh" value={formatAccountTime(account?.last_refresh)} />
          <AccountDetail label="5-hour usage" value={formatUsage(usage.five_hour_remaining_percent)} />
          <AccountDetail label="Weekly usage" value={formatUsage(usage.weekly_remaining_percent)} />
        </div>
      ) : null}

      {showDeviceLogin ? (
        <div className={`device-login-panel ${deviceLogin?.status === "failed" ? "error" : ""}`}>
          <div className="device-login-header">
            <div>
              <strong>{deviceLogin?.status === "failed" ? "Device login failed" : deviceLogin?.status === "canceled" ? "Device login canceled" : "Device login pending"}</strong>
              <span>{deviceLogin?.error || "Open the URL, enter the code, then return here."}</span>
            </div>
            {pending ? (
              <button className="ghost" onClick={onDeviceLoginCancel}>
                <Icon icon="mdi:close-circle-outline" />
                <span>Cancel</span>
              </button>
            ) : null}
          </div>
          {verificationUri ? (
            <div className="device-login-field">
              <span>URL</span>
              <a className="device-login-link" href={verificationUri} target="_blank" rel="noreferrer">{verificationUri}</a>
            </div>
          ) : null}
          {userCode ? (
            <div className="device-login-field">
              <span>Code</span>
              <div className="device-login-code-row">
                <div className={`device-login-code ${codeCopied ? "copied" : ""}`}>
                  <span>{userCode}</span>
                  <button className="device-login-copy" onClick={copyDeviceCode} title={codeCopied ? "Copied" : "Copy code"} aria-label={codeCopied ? "Copied" : "Copy device code"}>
                    <Icon icon={codeCopied ? "mdi:check" : "mdi:content-copy"} />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {deviceOutput ? <pre className="device-login-output">{deviceOutput}</pre> : null}
        </div>
      ) : null}
    </div>
  );
}

function cleanDeviceLoginUrl(value: unknown): string {
  return stripAnsi(value).replace(/(?:%1b|%001b|%u001b|\\x1b|\\u001b)(?:\[[0-?]*[ -/]*[@-~])?/gi, "").replace(/[.,;:]+$/g, "").trim();
}

function extractDeviceLoginUrl(output: string): string {
  const matches = output.match(/https?:\/\/[^\s)>\]"']+/g) || [];
  const preferred = matches.find((url) => /device|openai|auth/i.test(url)) || matches[0] || "";
  return cleanDeviceLoginUrl(preferred);
}

function cleanDeviceLoginCode(value: unknown): string {
  const match = stripAnsi(value).toUpperCase().match(/\b[A-Z0-9]{4,8}(?:-[A-Z0-9]{4,8}){1,3}\b/);
  return match?.[0] || "";
}

function extractDeviceLoginCode(output: string): string {
  return cleanDeviceLoginCode(output);
}

function AccountDetail({ label, value }: { label: string; value: string }) {
  return <div className="account-detail"><span>{label}</span><strong>{value}</strong></div>;
}

function GitSetupTab({
  onRefresh,
  onGenerateKey,
  onRemoteSave,
  onPull,
  onBranchChange,
  onCommitCheckout,
}: {
  onRefresh: () => void;
  onGenerateKey: () => void;
  onRemoteSave: (remoteUrl: string) => void;
  onPull: () => void;
  onBranchChange: (branch: string) => void;
  onCommitCheckout: (commit: string) => void;
}) {
  const status = useUiStore((state) => state.gitSetupStatus);
  const loading = useUiStore((state) => state.gitSetupLoading);
  const running = useUiStore((state) => state.gitSetupActionRunning);
  const runningAction = useUiStore((state) => state.gitSetupRunningAction);
  const result = useUiStore((state) => state.gitSetupResult);
  const showToast = useUiStore((state) => state.showToast);
  const ready = isGitSetupReady(status);
  const summary = gitSetupSummary(status, loading);
  const publicKey = status?.public_key || result?.public_key || "";
  const [remoteDraft, setRemoteDraft] = useState(status?.remote_url || "");
  const [branchDraft, setBranchDraft] = useState(status?.branch || "main");
  const [keyCopied, setKeyCopied] = useState(false);

  useLayoutEffect(() => {
    setRemoteDraft(status?.remote_url || "");
  }, [status?.remote_url]);

  useLayoutEffect(() => {
    if (!status?.repository) {
      setBranchDraft("");
    } else if (status.branch) {
      setBranchDraft(status.branch);
    } else {
      setBranchDraft((current) => current.trim() || "main");
    }
  }, [status?.branch, status?.repository]);

  const copyPublicKey = async () => {
    if (!publicKey) return;
    await copyText(publicKey);
    setKeyCopied(true);
    window.setTimeout(() => setKeyCopied(false), 1600);
    showToast("Git public key copied", "success");
  };

  return (
    <div className="settings-git">
      <div className="git-setup-cards">
        <GitSetupGitCard loading={loading} ready={ready} running={running} summary={summary} onRefresh={onRefresh} />
        <GitSetupRepositoryCard
          actionRunning={runningAction === "remote"}
          remoteDraft={remoteDraft}
          remoteUrl={status?.remote_url || ""}
          repoError={status?.repo_error || ""}
          repository={status?.repository === true}
          remoteConfigured={status?.remote_configured === true}
          running={running}
          onRemoteChange={setRemoteDraft}
          onRemoteSave={onRemoteSave}
        />
        <GitSetupSshKeyCard
          actionRunning={runningAction === "key"}
          keyCopied={keyCopied}
          publicKey={publicKey}
          remoteUsesSsh={status?.remote_uses_ssh === true}
          running={running}
          sshKeyExists={status?.ssh_key_exists === true}
          onCopyPublicKey={copyPublicKey}
          onGenerateKey={onGenerateKey}
        />
        <GitSetupBranchCard actionRunning={runningAction === "branch"} branch={branchDraft} currentBranch={status?.branch || ""} upstream={status?.upstream || ""} running={running} repository={status?.repository === true} onBranchChange={setBranchDraft} onSubmit={onBranchChange} />
        <GitSetupPullCard actionRunning={runningAction === "pull"} onPull={onPull} running={running} remoteConfigured={status?.remote_configured === true} incomingCount={status?.incoming_count || 0} />
      </div>

      <GitHistorySection history={status?.history || []} running={running} runningAction={runningAction} onCheckout={onCommitCheckout} />
    </div>
  );
}

function GitSetupGitCard({
  loading,
  ready,
  running,
  summary,
  onRefresh,
}: {
  loading: boolean;
  ready: boolean;
  running: boolean;
  summary: { title: string; detail: string; tone: string };
  onRefresh: () => void;
}) {
  return (
    <div className={`runtime-card git-setup-action-card ${summary.tone === "success" ? "success" : "warning"}`}>
      <span className="git-card-label">Git</span>
      <strong className="git-card-status">{summary.title}</strong>
      <div className="git-card-spacer" aria-hidden="true" />
      <div className="git-card-content">
        <small title={summary.detail}>{summary.detail}</small>
      </div>
      <div className="git-card-spacer" aria-hidden="true" />
      <button className="git-card-action" onClick={onRefresh} disabled={loading || running}>
        <Icon icon={loading ? "mdi:progress-clock" : ready ? "mdi:source-branch-check" : "mdi:refresh"} />
        <span>{loading ? "Checking..." : "Refresh"}</span>
      </button>
    </div>
  );
}

function GitSetupRepositoryCard({
  actionRunning,
  remoteDraft,
  remoteUrl,
  repoError,
  repository,
  remoteConfigured,
  running,
  onRemoteChange,
  onRemoteSave,
}: {
  actionRunning: boolean;
  remoteDraft: string;
  remoteUrl: string;
  repoError: string;
  repository: boolean;
  remoteConfigured: boolean;
  running: boolean;
  onRemoteChange: (remoteUrl: string) => void;
  onRemoteSave: (remoteUrl: string) => void;
}) {
  const value = remoteConfigured ? "Remote saved" : repository ? "Initialized" : "Not initialized";
  const detail = repoError || remoteUrl || (remoteConfigured ? "Origin remote is configured." : "Set the origin remote URL.");
  return (
    <div className={`runtime-card git-setup-action-card ${repository ? "success" : "warning"}`}>
      <span className="git-card-label">Repository</span>
      <strong className="git-card-status">{value}</strong>
      <div className="git-card-spacer" aria-hidden="true" />
      <div className="git-card-content">
        <small title={detail}>{detail}</small>
        <input value={remoteDraft} onChange={(event) => onRemoteChange(event.currentTarget.value)} placeholder="git@github.com:owner/repository.git" aria-label="Git origin remote URL" />
      </div>
      <div className="git-card-spacer" aria-hidden="true" />
      <button className="git-card-action" onClick={() => onRemoteSave(remoteDraft)} disabled={running || !remoteDraft.trim()}>
        <Icon icon={actionRunning ? "mdi:progress-clock" : "mdi:link-variant-plus"} />
        <span>Save</span>
      </button>
    </div>
  );
}

function GitSetupSshKeyCard({
  actionRunning,
  keyCopied,
  publicKey,
  remoteUsesSsh,
  running,
  sshKeyExists,
  onCopyPublicKey,
  onGenerateKey,
}: {
  actionRunning: boolean;
  keyCopied: boolean;
  publicKey: string;
  remoteUsesSsh: boolean;
  running: boolean;
  sshKeyExists: boolean;
  onCopyPublicKey: () => void;
  onGenerateKey: () => void;
}) {
  const detail = publicKey ? "Public key ready to copy." : remoteUsesSsh ? "Generate a key for SSH remotes." : "Only needed for SSH remotes.";
  return (
    <div className={`runtime-card git-setup-action-card ${sshKeyExists || !remoteUsesSsh ? "success" : "warning"}`}>
      <span className="git-card-label">SSH key</span>
      <strong className="git-card-status">{sshKeyExists ? "Created" : "Missing"}</strong>
      <div className="git-card-spacer" aria-hidden="true" />
      <div className="git-card-content">
        <small title={detail}>{detail}</small>
        {publicKey ? (
          <div className={`git-public-key git-public-key-inline ${keyCopied ? "copied" : ""}`}>
            <pre>{publicKey}</pre>
            <button className="icon-button" onClick={onCopyPublicKey} title={keyCopied ? "Copied" : "Copy public key"} aria-label={keyCopied ? "Copied" : "Copy public key"}>
              <Icon icon={keyCopied ? "mdi:check" : "mdi:content-copy"} />
            </button>
          </div>
        ) : (
          <span className="muted">Generate a key to show the public key.</span>
        )}
        <a className="git-ssh-keys-link" href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account" target="_blank" rel="noreferrer">GitHub SSH keys</a>
      </div>
      <div className="git-card-spacer" aria-hidden="true" />
      <button className="git-card-action" onClick={onGenerateKey} disabled={running}>
        <Icon icon={actionRunning ? "mdi:progress-clock" : sshKeyExists ? "mdi:key-change" : "mdi:key-plus"} />
        <span>{sshKeyExists ? "Recreate key" : "Generate key"}</span>
      </button>
    </div>
  );
}

function GitSetupBranchCard({
  actionRunning,
  branch,
  currentBranch,
  upstream,
  running,
  repository,
  onBranchChange,
  onSubmit,
}: {
  actionRunning: boolean;
  branch: string;
  currentBranch: string;
  upstream: string;
  running: boolean;
  repository: boolean;
  onBranchChange: (branch: string) => void;
  onSubmit: (branch: string) => void;
}) {
  const value = branch.trim();
  const unchanged = value === currentBranch;
  const detail = upstream || (repository ? "Enter a local or origin branch." : "Initialize a repository first.");
  const status = currentBranch || "Not checked out";
  return (
    <form
      className={`runtime-card git-setup-action-card ${currentBranch ? "success" : "warning"}`}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
    >
      <span className="git-card-label">Branch</span>
      <strong className="git-card-status">{status}</strong>
      <div className="git-card-spacer" aria-hidden="true" />
      <div className="git-card-content">
        <small title={detail}>{detail}</small>
        <input value={branch} onChange={(event) => onBranchChange(event.currentTarget.value)} placeholder="main" aria-label="Git branch name" />
      </div>
      <div className="git-card-spacer" aria-hidden="true" />
      <button className="git-card-action" type="submit" disabled={running || !repository || !value || unchanged}>
        <Icon icon={actionRunning ? "mdi:progress-clock" : "mdi:source-branch"} />
        <span>Checkout</span>
      </button>
    </form>
  );
}

function GitSetupPullCard({ actionRunning, onPull, running, remoteConfigured, incomingCount }: { actionRunning: boolean; onPull: () => void; running: boolean; remoteConfigured: boolean; incomingCount: number }) {
  const label = incomingCount > 0 ? `Pull ${incomingCount} incoming ${incomingCount === 1 ? "commit" : "commits"}` : "Pull";
  const detail = incomingCount > 0 ? "Incoming commits are available from origin." : "Fetch latest changes from origin.";
  return (
    <div className={`runtime-card git-setup-action-card ${remoteConfigured ? "success" : "warning"}`}>
      <span className="git-card-label">Pull</span>
      <strong className="git-card-status">{remoteConfigured ? "Ready" : "Unavailable"}</strong>
      <div className="git-card-spacer" aria-hidden="true" />
      <div className="git-card-content">
        <small title={detail}>{detail}</small>
      </div>
      <div className="git-card-spacer" aria-hidden="true" />
      <button className="git-card-action" onClick={onPull} disabled={running || !remoteConfigured}>
        <Icon icon={actionRunning ? "mdi:progress-clock" : "mdi:source-pull"} />
        <span>{label}</span>
      </button>
    </div>
  );
}

function GitHistorySection({ history, running, runningAction, onCheckout }: { history: GitCommit[]; running: boolean; runningAction: string | null; onCheckout: (commit: string) => void }) {
  const [page, setPage] = useState(0);
  const paged = paginateGitHistory(history, page, 6);

  useLayoutEffect(() => {
    setPage((current) => paginateGitHistory(history, current, 6).page);
  }, [history]);

  return (
    <section className="settings-section git-setup-section git-history-section">
      <div className="git-history-header">
        <h3>History</h3>
        {paged.pageCount > 1 ? (
          <div className="git-history-pager">
            <span>{paged.start}-{paged.end} of {history.length}</span>
            <button className="icon-button" onClick={() => setPage((value) => value - 1)} disabled={paged.page === 0} title="Previous commits" aria-label="Previous commits">
              <Icon icon="mdi:chevron-left" />
            </button>
            <button className="icon-button" onClick={() => setPage((value) => value + 1)} disabled={paged.page >= paged.pageCount - 1} title="Next commits" aria-label="Next commits">
              <Icon icon="mdi:chevron-right" />
            </button>
          </div>
        ) : null}
      </div>
      {history.length ? (
        <div className="git-history-list">
          {paged.items.map((commit, index) => {
            const hash = commit.hash || commit.short_hash || "";
            const shortHash = commit.short_hash || hash.slice(0, 7);
            const current = paged.start + index === 1;
            const restoring = runningAction === `restore:${hash}`;
            return (
              <div className="git-history-row" key={hash || index}>
                <div className="git-history-main">
                  <strong>{commit.subject || "Commit"}</strong>
                  <span title={formatTimestampTitle(commit.timestamp)}>{shortHash}{commit.timestamp ? ` · ${formatRunTime(commit.timestamp)}` : ""}</span>
                </div>
                <button onClick={() => onCheckout(hash)} disabled={running || !hash || current}>
                  <Icon icon={restoring ? "mdi:progress-clock" : current ? "mdi:check" : "mdi:restore"} />
                  <span>{current ? "Current" : "Restore"}</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <span className="muted">No commit history reported.</span>
      )}
    </section>
  );
}

function RunSettingsTab({ settings, onSave, onArchiveCleanup }: { settings: HaCodexSettings; onSave: (settings: Partial<HaCodexSettings>) => void; onArchiveCleanup: () => void }) {
  const defaults = settings.defaults;
  const archivedCount = useChatStore((state) => state.archivedChatIds.length);
  const archiveCleanupRunning = useUiStore((state) => state.archiveCleanupRunning);
  return (
    <div className="settings-run">
      <section className="settings-section">
        <h3>Run</h3>
        <div className="settings-grid">
          <SelectSetting label="Default mode" value={defaults.mode} options={[["auto", "Auto"], ["manual", "Manual"]]} onChange={(value) => saveDefaults(settings, onSave, { mode: value as RunSettings["mode"] })} />
          <SelectSetting label="Model preset" value={defaults.model_preset_id} options={settings.model_presets.map((preset) => [preset.id, preset.label])} onChange={(value) => saveDefaults(settings, onSave, { model_preset_id: value })} />
          <SelectSetting label="Reasoning" value={defaults.reasoning_effort} options={reasoningOptions()} onChange={(value) => saveDefaults(settings, onSave, { reasoning_effort: value as RunSettings["reasoning_effort"] })} />
          <SelectSetting label="Verbosity" value={defaults.verbosity} options={verbosityOptions()} onChange={(value) => saveDefaults(settings, onSave, { verbosity: value as RunSettings["verbosity"] })} />
          <SelectSetting label="Plan mode" value={defaults.plan_mode} options={planModeOptions()} onChange={(value) => saveDefaults(settings, onSave, { plan_mode: value as RunSettings["plan_mode"] })} />
        </div>
      </section>
      <section className="settings-section">
        <h3>Validation</h3>
        <div className="settings-grid">
          <SelectSetting label="Validation depth" value={defaults.validation_depth} options={validationOptions()} onChange={(value) => saveDefaults(settings, onSave, { validation_depth: value as RunSettings["validation_depth"] })} />
          <label className="setting-field">
            <span>Context budget</span>
            <input type="number" min={1000} max={200000} step={1000} defaultValue={settings.context_budget_chars} onBlur={(event) => onSave({ ...settings, context_budget_chars: Number(event.currentTarget.value) })} />
          </label>
        </div>
      </section>
      <section className="settings-section">
        <h3>Safety</h3>
        <div className="settings-grid">
          <SelectSetting label="Tool visibility" value={defaults.tool_visibility} options={[["compact", "Compact"], ["normal", "Normal"], ["verbose", "Verbose"]]} onChange={(value) => saveDefaults(settings, onSave, { tool_visibility: value as RunSettings["tool_visibility"] })} />
          <SelectSetting label="Approvals" value={defaults.approval_mode} options={[["ask", "Ask"], ["auto_readonly", "Auto read-only"]]} onChange={(value) => saveDefaults(settings, onSave, { approval_mode: value as RunSettings["approval_mode"] })} />
        </div>
      </section>
      <section className="settings-section">
        <h3>Maintenance</h3>
        <div className="settings-maintenance-row">
          <div>
            <strong>Archived chats</strong>
            <span>{archivedCount} archived</span>
          </div>
          <button className="danger" onClick={onArchiveCleanup} disabled={archiveCleanupRunning || archivedCount === 0}>
            <Icon icon={archiveCleanupRunning ? "mdi:progress-clock" : "mdi:trash-can-outline"} />
            <span>{archiveCleanupRunning ? "Cleaning..." : "Clean up archived chats"}</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function formatAccountTime(value: unknown): string {
  if (!value) return "Not reported";
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds > 0) return formatRunTime(seconds);
  return String(value);
}

function formatUsage(value: unknown): string {
  const percent = Number(value);
  if (!Number.isFinite(percent)) return "Not reported";
  return `${Math.round(percent)}% remaining`;
}

function ModelsTab({ settings, onSave }: { settings: HaCodexSettings; onSave: (settings: Partial<HaCodexSettings>) => void }) {
  const [draftLabel, setDraftLabel] = useState("");
  const [draftModel, setDraftModel] = useState("");
  const addPreset = () => {
    const label = draftLabel.trim();
    const model = draftModel.trim();
    if (!label || !model) return;
    const next = upsertModelPreset(settings, { id: presetIdFromLabel(label), label, model });
    onSave(next);
    setDraftLabel("");
    setDraftModel("");
  };
  return (
    <div className="settings-models">
      {settings.model_presets.map((preset) => (
        <div className="settings-model-row" key={preset.id}>
          <input aria-label={`${preset.label} label`} defaultValue={preset.label} disabled={BUILT_IN_MODEL_PRESET_IDS.has(preset.id)} onBlur={(event) => savePreset(settings, onSave, preset, { label: event.currentTarget.value })} />
          <input aria-label={`${preset.label} model`} defaultValue={preset.model || ""} disabled={BUILT_IN_MODEL_PRESET_IDS.has(preset.id)} placeholder="Model id" onBlur={(event) => savePreset(settings, onSave, preset, { model: event.currentTarget.value || null })} />
          <button className="icon-button danger" disabled={BUILT_IN_MODEL_PRESET_IDS.has(preset.id)} onClick={() => onSave(deleteModelPreset(settings, preset.id))} title="Delete model preset" aria-label="Delete model preset">
            <Icon icon="mdi:trash-can-outline" />
          </button>
        </div>
      ))}
      <div className="settings-model-row add">
        <input value={draftLabel} onChange={(event) => setDraftLabel(event.currentTarget.value)} placeholder="Preset label" aria-label="New preset label" />
        <input value={draftModel} onChange={(event) => setDraftModel(event.currentTarget.value)} placeholder="Model id" aria-label="New model id" />
        <button onClick={addPreset} disabled={!draftLabel.trim() || !draftModel.trim()}><Icon icon="mdi:plus" /><span>Add</span></button>
      </div>
    </div>
  );
}

function DebugTabView() {
  return (
    <div className="settings-debug">
      <RuntimeCards />
      <StatusJson />
    </div>
  );
}

function BridgeLogTab({ onRefresh, onClear }: { onRefresh: () => void; onClear: () => void }) {
  return (
    <div className="settings-bridge-log">
      <BridgeLog onRefresh={onRefresh} onClear={onClear} />
    </div>
  );
}

function StatusJson() {
  const status = useUiStore((state) => state.status);
  const debugStatus = {
    ...status,
    sessions: Array.isArray(status.sessions) ? status.sessions.filter((session: { archived?: boolean }) => !session.archived) : status.sessions,
  };
  return <pre className="result">{JSON.stringify(debugStatus, null, 2)}</pre>;
}

function RuntimeCards() {
  const status = useUiStore((state) => state.status);
  const runtime = (status.runtime || {}) as Record<string, unknown>;
  const cards = [
    { label: "Runner", value: runtime.runner_type || "unknown", detail: runtime.codex_exec_available === false ? "Codex exec unavailable" : "Codex exec ready", tone: runtime.codex_exec_available === false ? "error" : "" },
    { label: "Bridge", value: runtime.bridge_available === false ? "Unavailable" : runtime.bridge_available ? "Available" : "Unknown", detail: runtime.bridge_url || "No bridge URL", tone: runtime.bridge_available === false ? "error" : runtime.bridge_available ? "success" : "" },
    { label: "Training", value: runtime.openai_training_opt_out_confirmed ? "Opt-out confirmed" : "Not confirmed", detail: runtime.openai_training_opt_out_confirmed ? "Task sends allowed" : "Task sends blocked", tone: runtime.openai_training_opt_out_confirmed ? "success" : "warning" },
    { label: "Uptime", value: formatDuration(runtime.bridge_uptime_seconds) || "Not reported", detail: runtime.bridge_started_at ? `Started ${formatRunTime(runtime.bridge_started_at)}` : ((runtime.bridge_health as { error?: string } | undefined)?.error || "No bridge health data"), tone: (runtime.bridge_health as { error?: string } | undefined)?.error ? "warning" : "" },
    { label: "Codex", value: runtime.codex_version || "No version", detail: runtime.codex_path || runtime.codex_command || "No command", tone: runtime.codex_path ? "" : "warning" },
    { label: "Workspace", value: runtime.workspace_exists === false ? "Missing" : runtime.workspace_exists ? "Ready" : "Unknown", detail: runtime.workspace_path || "No workspace path", tone: runtime.workspace_exists === false ? "error" : "" },
  ];
  return (
    <div className="runtime-cards">
      {cards.map((card) => <div className={`runtime-card ${card.tone || ""}`} key={card.label}><span>{card.label}</span><strong>{String(card.value)}</strong><small>{String(card.detail)}</small></div>)}
    </div>
  );
}

function BridgeLog({ onRefresh, onClear }: { onRefresh: () => void; onClear: () => void }) {
  const bridgeLog = useUiStore((state) => state.bridgeLog);
  const loading = useUiStore((state) => state.bridgeLogLoading);
  const logRef = useRef<HTMLPreElement | null>(null);
  const logLines = stripAnsi(bridgeLog?.lines || "No bridge log output.");

  useLayoutEffect(() => {
    const log = logRef.current;
    if (!log || !bridgeLog?.exists || bridgeLog?.error) return;
    const scrollToBottom = () => {
      log.scrollTop = log.scrollHeight;
    };
    scrollToBottom();
    const frame = window.requestAnimationFrame(scrollToBottom);
    return () => window.cancelAnimationFrame(frame);
  }, [bridgeLog?.exists, bridgeLog?.error, logLines]);

  if (loading && !bridgeLog) return <div className="loading-state">Loading bridge log...</div>;
  if (bridgeLog?.error) return <pre className="result error">{bridgeLog.error}</pre>;
  if (!bridgeLog?.exists) return <pre className="result">Bridge log not found at {bridgeLog?.path || "/config/ha_codex_bridge.log"}.</pre>;
  const meta = [bridgeLog.path, `${bridgeLog.line_count || 0} lines`, bridgeLog.truncated ? "tail only" : ""].filter(Boolean).join(" - ");
  return (
    <>
      <div className="modal-toolbar">
        <span>{meta}</span>
        <div className="modal-toolbar-actions">
          <button className="ghost bridge-log-refresh" onClick={onRefresh} disabled={loading}><Icon icon="mdi:refresh" /><span>{loading ? "Refreshing..." : "Refresh"}</span></button>
          <button className="ghost bridge-log-clear" onClick={onClear} disabled={loading}><Icon icon="mdi:broom" /><span>Clear Log</span></button>
        </div>
      </div>
      <pre className="result bridge-log-result" ref={logRef}>{logLines}</pre>
    </>
  );
}

function SelectSetting({ label, value, options, onChange }: { label: string; value: string; options: Array<[string, string]>; onChange: (value: string) => void }) {
  return (
    <label className="setting-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.currentTarget.value)}>
        {options.map(([optionValue, optionLabel]) => <option value={optionValue} key={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}

function saveDefaults(settings: HaCodexSettings, onSave: (settings: Partial<HaCodexSettings>) => void, patch: Partial<RunSettings>) {
  onSave({ ...settings, defaults: { ...settings.defaults, ...patch } });
}

function savePreset(settings: HaCodexSettings, onSave: (settings: Partial<HaCodexSettings>) => void, preset: ModelPreset, patch: Partial<ModelPreset>) {
  if (BUILT_IN_MODEL_PRESET_IDS.has(preset.id)) return;
  onSave(upsertModelPreset(settings, { ...preset, ...patch }));
}

function reasoningOptions(): Array<[string, string]> {
  return [["auto", "Auto"], ["minimal", "Minimal"], ["low", "Low"], ["medium", "Medium"], ["high", "High"], ["xhigh", "XHigh"]];
}

function verbosityOptions(): Array<[string, string]> {
  return [["auto", "Auto"], ["low", "Low"], ["medium", "Medium"], ["high", "High"]];
}

function planModeOptions(): Array<[string, string]> {
  return [["auto", "Auto"], ["always", "Always"], ["off", "Off"]];
}

function validationOptions(): Array<[string, string]> {
  return [["auto", "Auto"], ["none", "None"], ["full", "Full"]];
}
