import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { Virtuoso } from "react-virtuoso";
import { Icon } from "./Icon";
import { useChatStore } from "../stores/chatStore";
import { useUiStore } from "../stores/uiStore";
import { formatRelativeTime, formatRunTime, formatTimestampTitle } from "../utils/format";
import { currentRestartApprovals, filterSessionIdsBySearch, hasPendingQuestion, hasPendingRestart, hasPendingRunPlan, pendingApprovals, sessionListTime } from "../features/chat/chatUtils";
import type { Approval, CodexSession, ValidationResult } from "../types/ha";

interface RailProps {
  onNew: () => void;
  onSelect: (id: string) => void;
  onArchive: (id: string, archived: boolean) => void;
  onDeleteArchived: (id: string) => void;
  onToggleArchived: () => void;
  onValidate: () => void;
  onDebug: () => void;
  onRestartNow: (sessionId: string, approvalId: string) => void;
  onRestartSchedule: () => void;
  onRestartScheduleCancel: () => void;
}

function sessionStatusTone(session: CodexSession) {
  const pending = pendingApprovals(session).length;
  if (session.status === "error") return "error";
  if (pending || hasPendingQuestion(session) || hasPendingRunPlan(session) || (session.status === "waiting_approval" && pending)) return "approval";
  if (hasPendingRestart(session)) return "restart";
  if (["planning", "running", "working"].includes(session.status || "")) return "working";
  return "idle";
}

function validationTone(validation: ValidationResult | null, running: boolean) {
  if (running) return "running";
  if (!validation) return "unknown";
  if (validation.status === "passed" || validation.ok === true || validation.returncode === 0) return "success";
  if (validation.status === "failed" || validation.ok === false || (Number.isInteger(validation.returncode) && validation.returncode !== 0)) return "error";
  if (validation.status === "unavailable") return "warning";
  return "unknown";
}

function validationIcon(tone: string) {
  if (tone === "success") return "mdi:check-circle";
  if (tone === "error") return "mdi:alert-circle";
  if (tone === "warning") return "mdi:alert-outline";
  if (tone === "running") return "mdi:progress-clock";
  return "mdi:help-circle-outline";
}

export function Rail(props: RailProps) {
  const visibleIds = useChatStore((state) => (state.showArchived ? state.archivedChatIds : state.activeChatIds));
  const activeId = useChatStore((state) => state.activeId);
  const showArchived = useChatStore((state) => state.showArchived);
  const archivedCount = useChatStore((state) => state.archivedChatIds.length);
  const scheduledRestart = useChatStore((state) => state.scheduledRestart);
  const chatsById = useChatStore((state) => state.chatsById);
  const restartApprovals = useMemo(() => currentRestartApprovals(Object.values(chatsById)), [chatsById]);
  const validation = useChatStore((state) => state.validation);
  const validationRunning = useChatStore((state) => state.validationRunning);
  const status = useUiStore((state) => state.status);
  const usage = (status.usage || {}) as Record<string, unknown>;
  const bridgeUnavailable = (status.runtime as { bridge_available?: boolean } | undefined)?.bridge_available === false;
  const tone = validationTone(validation, validationRunning);
  const archiveToggleLabel = showArchived ? "Current chats" : "Archived chats";
  const [archiveSearch, setArchiveSearch] = useState("");
  const [switchAnimation, setSwitchAnimation] = useState({ active: false, ids: [] as string[], phase: 0 });
  const [restartMenuOpen, setRestartMenuOpen] = useState(false);
  const previousOrderRef = useRef<{ ids: string[]; mode: "archived" | "current" } | null>(null);
  const restartActionRef = useRef<HTMLDivElement | null>(null);
  const switchTimeoutRef = useRef<number | null>(null);
  const mode = showArchived ? "archived" : "current";
  const filteredVisibleIds = useMemo(
    () => (showArchived ? filterSessionIdsBySearch(visibleIds, chatsById, archiveSearch) : visibleIds),
    [archiveSearch, chatsById, showArchived, visibleIds],
  );
  const switchingIds = useMemo(() => new Set(switchAnimation.ids), [switchAnimation.ids]);
  const archiveSearchActive = showArchived && Boolean(archiveSearch.trim());

  useEffect(() => {
    const previous = previousOrderRef.current;
    previousOrderRef.current = { ids: visibleIds, mode };
    if (!previous || previous.mode !== mode || previous.ids.length !== visibleIds.length) return;

    const previousIndexById = new Map(previous.ids.map((id, index) => [id, index]));
    if (!visibleIds.every((id) => previousIndexById.has(id))) return;

    const movedIds = visibleIds.filter((id, index) => previousIndexById.get(id) !== index);
    if (!movedIds.length) return;

    if (switchTimeoutRef.current) window.clearTimeout(switchTimeoutRef.current);
    setSwitchAnimation((current) => ({ active: true, ids: movedIds, phase: current.phase === 1 ? 2 : 1 }));
    switchTimeoutRef.current = window.setTimeout(() => {
      setSwitchAnimation((current) => ({ ...current, active: false, ids: [] }));
      switchTimeoutRef.current = null;
    }, 340);
  }, [mode, visibleIds]);

  useEffect(() => () => {
    if (switchTimeoutRef.current) window.clearTimeout(switchTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (!showArchived && archiveSearch) setArchiveSearch("");
  }, [archiveSearch, showArchived]);

  useEffect(() => {
    if (!restartApprovals.length) setRestartMenuOpen(false);
  }, [restartApprovals.length]);

  useEffect(() => {
    if (!restartMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const path = event.composedPath();
      if (restartActionRef.current && path.includes(restartActionRef.current)) return;
      setRestartMenuOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [restartMenuOpen]);

  const restartTarget = restartApprovals[0];

  return (
    <aside className="rail">
      <div className="brand">
        <div>
          <strong>Codex</strong>
          <span>Home Assistant</span>
        </div>
        <button onClick={props.onNew} title="New chat">+</button>
      </div>
      <div className="sessions" data-sessions-mode={showArchived ? "archived" : "current"}>
        {showArchived ? (
          <label className="archive-search">
            <Icon icon="mdi:magnify" />
            <input
              type="search"
              value={archiveSearch}
              onChange={(event) => setArchiveSearch(event.currentTarget.value)}
              placeholder="Search archived chats"
              aria-label="Search archived chats"
            />
          </label>
        ) : null}
        {!filteredVisibleIds.length ? <p className="muted pad">{showArchived ? (archiveSearchActive && visibleIds.length ? "No archived chats match your search." : "No archived chats.") : "No chats yet."}</p> : null}
        {filteredVisibleIds.length ? (
          <Virtuoso
            className="sessions-virtual-list"
            data={filteredVisibleIds}
            computeItemKey={(_, id) => id}
            itemContent={(_, id) => (
              <SessionRow
                id={id}
                active={id === activeId}
                switching={switchAnimation.active && switchingIds.has(id)}
                switchPhase={switchAnimation.phase}
                onSelect={props.onSelect}
                onArchive={props.onArchive}
                onDeleteArchived={props.onDeleteArchived}
              />
            )}
          />
        ) : null}
      </div>
      <div className="rail-footer">
        <div className="usage-summary" title="Codex usage remaining">
          <div>
            <span className="usage-main"><span>5h</span><strong>{formatPercent(usage.five_hour_remaining_percent)}</strong></span>
            {renderReset(usage.five_hour_reset_at)}
          </div>
          <div>
            <span className="usage-main"><span>Weekly</span><strong>{formatPercent(usage.weekly_remaining_percent)}</strong></span>
            {renderReset(usage.weekly_reset_at)}
          </div>
        </div>
        <div className={`rail-footer-actions ${restartApprovals.length ? "restart-pending" : ""}`}>
          <button className={`archive-toggle ${showArchived ? "active" : ""}`} onClick={props.onToggleArchived}>
            <Icon icon="mdi:archive-outline" />
            <span className="overflow-title" title={archiveToggleLabel}>{archiveToggleLabel}</span>
            <b>{archivedCount}</b>
          </button>
          {restartTarget ? (
            <RestartAction
              approval={restartTarget.approval}
              count={restartApprovals.length}
              menuOpen={restartMenuOpen}
              actionRef={restartActionRef}
              scheduled={scheduledRestart}
              session={restartTarget.session}
              onMenuOpen={setRestartMenuOpen}
              onRestartNow={props.onRestartNow}
              onRestartSchedule={props.onRestartSchedule}
              onRestartScheduleCancel={props.onRestartScheduleCancel}
            />
          ) : null}
          <button className={`validation-status-button ${tone}`} onClick={props.onValidate} title="Run HA config validation" aria-label="Run HA config validation" aria-disabled={validationRunning}>
            <Icon icon={validationIcon(tone)} />
            <span className="validation-tooltip" role="tooltip">
              <strong>HA Config Validation</strong>
              <span>{validationRunning ? "Running Home Assistant config validation..." : validation ? validation.status || "done" : "No validation result yet. Click to run check."}</span>
            </span>
          </button>
          <button className={`debug-button ${bridgeUnavailable ? "bridge-unavailable" : ""}`} onClick={props.onDebug} title="Open settings" aria-label="Open settings">
            <Icon icon="mdi:cog-outline" />
          </button>
        </div>
      </div>
    </aside>
  );
}

const RestartAction = memo(function RestartAction({
  approval,
  count,
  menuOpen,
  actionRef,
  scheduled,
  session,
  onMenuOpen,
  onRestartNow,
  onRestartSchedule,
  onRestartScheduleCancel,
}: {
  approval: Approval;
  count: number;
  menuOpen: boolean;
  actionRef: RefObject<HTMLDivElement | null>;
  scheduled: boolean;
  session: CodexSession;
  onMenuOpen: (open: boolean) => void;
  onRestartNow: (sessionId: string, approvalId: string) => void;
  onRestartSchedule: () => void;
  onRestartScheduleCancel: () => void;
}) {
  const title = scheduled ? "Restart scheduled after pending completion" : `${count} pending restart${count === 1 ? "" : "s"}`;
  return (
    <div className="restart-action-wrap" ref={actionRef}>
      <button
        className={`restart-action ${scheduled ? "scheduled" : "pending"}`}
        onClick={() => onMenuOpen(!menuOpen)}
        title={title}
        aria-label={title}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        <Icon icon="mdi:restart" />
      </button>
      {menuOpen ? (
        <div className="restart-action-menu" role="menu">
          <button
            role="menuitem"
            onClick={() => {
              onMenuOpen(false);
              onRestartNow(session.id, approval.id);
            }}
          >
            Restart now
          </button>
          <button
            role="menuitem"
            onClick={() => {
              onMenuOpen(false);
              if (scheduled) onRestartScheduleCancel();
              else onRestartSchedule();
            }}
          >
            {scheduled ? "Cancel auto restart" : "Restart after pending completion"}
          </button>
        </div>
      ) : null}
    </div>
  );
});

const SessionRow = memo(function SessionRow({ id, active, switching, switchPhase, onSelect, onArchive, onDeleteArchived }: { id: string; active: boolean; switching: boolean; switchPhase: number; onSelect: (id: string) => void; onArchive: (id: string, archived: boolean) => void; onDeleteArchived: (id: string) => void }) {
  const session = useChatStore((state) => state.chatsById[id]);
  if (!session) return null;
  const archived = Boolean(session.archived);
  return (
    <div className={`session-row ${active ? "active" : ""} ${archived ? "archived" : ""} ${switching ? `switching switching-${switchPhase}` : ""}`} data-session-id={id}>
      <button className="session" onClick={() => onSelect(id)}>
        <span className="session-text">
          <span className="title-line">
            <span className={`status-dot status-dot-${sessionStatusTone(session)}`} aria-hidden="true" />
            <span className="title overflow-title" title={session.title}>{session.title}</span>
          </span>
          <span className="meta">{formatRunTime(sessionListTime(session))}</span>
        </span>
      </button>
      <button className="icon-button session-archive" data-action={archived ? "unarchive" : "archive"} onClick={() => onArchive(id, !archived)} title={archived ? "Restore chat" : "Archive chat"} aria-label={archived ? "Restore chat" : "Archive chat"}>
        <Icon icon={archived ? "mdi:archive-arrow-up-outline" : "mdi:archive-arrow-down-outline"} />
      </button>
      {archived ? (
        <button className="icon-button session-delete" onClick={() => onDeleteArchived(id)} title="Delete archived chat" aria-label="Delete archived chat">
          <Icon icon="mdi:trash-can-outline" />
        </button>
      ) : null}
    </div>
  );
});

function formatPercent(value: unknown) {
  if (value === null || value === undefined || value === "") return "--%";
  const percent = Number(value);
  return Number.isFinite(percent) ? `${Math.round(percent)}%` : "--%";
}

function renderReset(value: unknown) {
  const reset = formatRelativeTime(value);
  if (!reset) return <small>--</small>;
  return <small title={formatTimestampTitle(value)}>Resets {reset}</small>;
}
