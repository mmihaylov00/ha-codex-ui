import { useLayoutEffect, useRef } from "react";
import { Icon } from "./Icon";
import { ValidationSummaryCard } from "./ValidationSummaryCard";
import { useChatStore } from "../stores/chatStore";
import { useUiStore } from "../stores/uiStore";
import { formatDuration, formatRunTime, stripAnsi } from "../utils/format";
import type { DebugTab } from "../types/ui";

interface DebugModalProps {
  onClose: () => void;
  onTab: (tab: DebugTab) => void;
  onBridgeRestart: () => void;
  onBridgeLogRefresh: () => void;
  onValidate: () => void;
  onValidationReload: (domains: string[]) => void;
}

export function DebugModal({ onClose, onTab, onBridgeRestart, onBridgeLogRefresh, onValidate, onValidationReload }: DebugModalProps) {
  const tab = useUiStore((state) => state.statusDebugTab);
  const status = useUiStore((state) => state.status);
  const bridgeAvailable = (status.runtime as { bridge_available?: boolean } | undefined)?.bridge_available === true;
  const bridgeActionRunning = useUiStore((state) => state.bridgeActionRunning);
  const bridgeActionLabel = bridgeAvailable ? "Restart" : "Start";
  return (
    <div className="modal-backdrop">
      <div className="modal-scrim" onClick={onClose} />
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="status-debug-title">
        <header className="modal-header">
          <h2 id="status-debug-title">Debug</h2>
          <button className="icon-button" onClick={onClose} title="Close" aria-label="Close"><Icon icon="mdi:close" /></button>
        </header>
        <div className="modal-tabs">
          <div className="debug-tabs" role="tablist" aria-label="Debug views">
            <button className={tab === "status" ? "active" : ""} onClick={() => onTab("status")} role="tab" aria-selected={tab === "status"}>Status JSON</button>
            <button className={tab === "validation" ? "active" : ""} onClick={() => onTab("validation")} role="tab" aria-selected={tab === "validation"}>Validation</button>
            <button className={tab === "bridge-log" ? "active" : ""} onClick={() => onTab("bridge-log")} role="tab" aria-selected={tab === "bridge-log"}>Bridge Log</button>
          </div>
          <span className="modal-tab-spacer" />
          <button className={`bridge-action ${bridgeAvailable ? "bridge-action-restart" : "bridge-action-start"}`} onClick={onBridgeRestart} title={`${bridgeActionLabel} bridge`} disabled={bridgeActionRunning}>
            <Icon icon={bridgeActionRunning ? "mdi:progress-clock" : bridgeAvailable ? "mdi:restart" : "mdi:play"} />
            <span>{bridgeActionRunning ? "Working..." : `${bridgeActionLabel} Bridge`}</span>
          </button>
        </div>
        <div className="modal-body">
          {tab === "bridge-log" ? <BridgeLog onRefresh={onBridgeLogRefresh} /> : tab === "validation" ? <ValidationPanel onValidate={onValidate} onReloadDomains={onValidationReload} /> : <StatusView />}
        </div>
      </section>
    </div>
  );
}

function StatusView() {
  const status = useUiStore((state) => state.status);
  const debugStatus = {
    ...status,
    sessions: Array.isArray(status.sessions) ? status.sessions.filter((session: { archived?: boolean }) => !session.archived) : status.sessions,
  };
  return (
    <>
      <RuntimeCards />
      <pre className="result">{JSON.stringify(debugStatus, null, 2)}</pre>
    </>
  );
}

function RuntimeCards() {
  const status = useUiStore((state) => state.status);
  const runtime = (status.runtime || {}) as Record<string, unknown>;
  const cards = [
    { label: "Runner", value: runtime.runner_type || "unknown", detail: runtime.codex_exec_available === false ? "Codex exec unavailable" : "Codex exec ready", tone: runtime.codex_exec_available === false ? "error" : "" },
    { label: "Bridge", value: runtime.bridge_available === false ? "Unavailable" : runtime.bridge_available ? "Available" : "Unknown", detail: runtime.bridge_url || "No bridge URL", tone: runtime.bridge_available === false ? "error" : runtime.bridge_available ? "success" : "" },
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

function BridgeLog({ onRefresh }: { onRefresh: () => void }) {
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
  const meta = [bridgeLog.path, `${bridgeLog.line_count || 0} lines`, bridgeLog.truncated ? "tail only" : ""].filter(Boolean).join(" · ");
  return (
    <>
      <div className="modal-toolbar">
        <span>{meta}</span>
        <button className="ghost" onClick={onRefresh}><Icon icon="mdi:refresh" /><span>{loading ? "Refreshing..." : "Refresh"}</span></button>
      </div>
      <pre className="result bridge-log-result" ref={logRef}>{logLines}</pre>
    </>
  );
}

export function ValidationPanel({ onValidate, onReloadDomains }: { onValidate: () => void; onReloadDomains: (domains: string[]) => void }) {
  const validation = useChatStore((state) => state.validation);
  const running = useChatStore((state) => state.validationRunning);
  return (
    <>
      <div className="modal-toolbar">
        <span>Home Assistant validation lab</span>
        <button className="ghost" onClick={onValidate} disabled={running}><Icon icon={running ? "mdi:progress-clock" : "mdi:check-decagram-outline"} /><span>{running ? "Running..." : "Run check"}</span></button>
      </div>
      {running ? <div className="loading-state">Running Home Assistant config validation...</div> : null}
      {!running && validation ? <div className="validation-panel-body"><ValidationSummaryCard validation={validation} onReloadDomains={onReloadDomains} /></div> : null}
      {!running && !validation ? <p className="muted">No validation result yet.</p> : null}
    </>
  );
}
