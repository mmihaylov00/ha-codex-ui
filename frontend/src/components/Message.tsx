import { memo, useEffect, useState } from "react";
import type { CodexMessage, GitFile, RollbackSummary, ValidationResult } from "../types/ha";
import { Icon } from "./Icon";
import { ValidationSummaryCard } from "./ValidationSummaryCard";
import { DiffFile } from "./GitDrawer";
import { Markdown } from "../features/chat/markdown";
import { extractQuestion, stripDuplicateFileChangesBlock, stripQuestionBlock } from "../features/chat/chatUtils";
import { errorSummary, formatRunTime, formatTimestampTitle } from "../utils/format";
import { builderMetadataSummary } from "../features/builder/builderUtils";
import { contextAttachmentsFromMetadata, iconForContextKind, type HaContextAttachment } from "../features/context/contextUtils";
import { gitFileKey } from "../features/git/gitUtils";
import { useUiStore } from "../stores/uiStore";
import { useChatStore } from "../stores/chatStore";
import type { HaCodexApi } from "../services/api";

interface MessageProps {
  api: HaCodexApi;
  message: CodexMessage;
  sessionId: string;
  canRetry: boolean;
  onCopy: (value: string) => void;
  onRetry: (sessionId: string) => void;
  onRollback: (sessionId: string, checkpointId: string) => void;
  onValidationReload: (domains: string[]) => void;
}

export const Message = memo(function Message({ api, message, sessionId, canRetry, onCopy, onRetry, onRollback, onValidationReload }: MessageProps) {
  const rawContent = message.content || "";
  const isError = String(message.metadata?.kind || "") === "error";
  const hasQuestion = Boolean(extractQuestion(message));
  const fileChanges = Array.isArray(message.metadata?.file_changes) ? message.metadata.file_changes as GitFile[] : [];
  const plainContent = stripDuplicateFileChangesBlock(stripQuestionBlock(rawContent), fileChanges) || (isError ? errorFallbackMessage(message) : "") || (hasQuestion ? "Codex needs direction before continuing." : "");
  const kind = String(message.metadata?.kind || message.role || "message");
  const isCommandMessage = message.role === "event" && Boolean(message.metadata?.command);
  const roleLabel = isCommandMessage ? "command" : message.role === "event" ? "response" : message.role || "message";
  const roleIcon = { user: "mdi:account-circle", assistant: "mdi:robot", event: "mdi:progress-wrench", system: "mdi:information-outline" }[String(message.role)] || "mdi:message-text-outline";
  const rowClass = { user: "message-row-user", assistant: "message-row-codex" }[String(message.role)] || "";
  const baseStyleClass = {
    user: "message-style-user",
    assistant: "message-style-codex",
    event: "message-style-event",
    system: "message-style-system",
    action: "message-style-action",
  }[String(message.metadata?.kind || message.role)] || "";
  const styleClass = isError ? "message-style-error" : isCommandMessage ? "message-style-command" : baseStyleClass;
  const showRetry = canRetry && isError;
  const timestamp = renderMessageTimestamp(message);
  const contextAttachments = contextAttachmentsFromMetadata(message.metadata);
  const builderSummary = builderMetadataSummary(message.metadata);
  const defaultToolVisibility = useUiStore((state) => state.settings.defaults.tool_visibility);
  const sessionToolVisibility = useChatStore((state) => (state.chatsById[sessionId]?.metadata?.run_settings as { tool_visibility?: string } | undefined)?.tool_visibility);
  const toolVisibility = toolVisibilityForMessage(message, sessionToolVisibility || defaultToolVisibility);
  const showCopyMessage = fileChanges.length === 0;

  if (isCommandMessage) {
    const commandText = String(message.metadata?.command || plainContent);
    return (
      <div className={`message-row ${rowClass || "message-row-center"}`}>
        <article className={`message ${message.role || ""} ${styleClass} ${kind} tool-visibility-${toolVisibility}`}>
          <div className="command-line">
            <code className="command-text">{commandText}</code>
            {timestamp}
            <button className="icon-button copy-button" onClick={() => onCopy(commandText)} title="Copy" aria-label="Copy command"><Icon icon="mdi:content-copy" /></button>
          </div>
          <MessageRawMetadata raw={message.metadata?.raw} visible={toolVisibility === "verbose"} />
        </article>
      </div>
    );
  }

  return (
    <div className={`message-row ${rowClass || "message-row-center"}`}>
      <article className={`message ${message.role || ""} ${styleClass} ${kind} tool-visibility-${toolVisibility}`}>
        <div className="role">
          <Icon icon={roleIcon} />
          <span>{roleLabel}</span>
          {timestamp}
        </div>
        <div className="markdown-body"><Markdown value={plainContent} /></div>
        <MessageBuilderSummary summary={builderSummary} />
        <MessageContextAttachments attachments={contextAttachments} />
        <MessageValidationSummary validation={message.metadata?.validation as ValidationResult | undefined} onReloadDomains={onValidationReload} />
        <MessageFileChanges api={api} changes={fileChanges} />
        <RollbackAction sessionId={sessionId} rollback={message.metadata?.rollback as RollbackSummary | undefined} onRollback={onRollback} />
        <MessageRawMetadata raw={message.metadata?.raw} visible={toolVisibility === "verbose"} />
        {showCopyMessage ? <button className="icon-button copy-button" onClick={() => onCopy(plainContent)} title="Copy" aria-label="Copy message"><Icon icon="mdi:content-copy" /></button> : null}
        {showRetry ? <button className="icon-button retry-button" onClick={() => onRetry(sessionId)} title="Retry / continue" aria-label="Retry / continue"><Icon icon="mdi:refresh" /></button> : null}
      </article>
    </div>
  );
});

function renderMessageTimestamp(message: CodexMessage) {
  if (!message.created_at) return null;
  return <span className="message-time" title={formatTimestampTitle(message.created_at)}>{formatRunTime(message.created_at)}</span>;
}

function toolVisibilityForMessage(message: CodexMessage, fallback: string): "compact" | "normal" | "verbose" {
  const resolved = (message.metadata?.run_settings as { resolved?: { tool_visibility?: string } } | undefined)?.resolved;
  const value = resolved?.tool_visibility || fallback;
  return value === "compact" || value === "verbose" ? value : "normal";
}

function MessageRawMetadata({ raw, visible }: { raw: unknown; visible: boolean }) {
  if (!visible || !raw) return null;
  return (
    <details className="raw-event-details">
      <summary>Raw event</summary>
      <pre>{JSON.stringify(raw, null, 2)}</pre>
    </details>
  );
}

function MessageValidationSummary({ validation, onReloadDomains }: { validation?: ValidationResult; onReloadDomains: (domains: string[]) => void }) {
  if (!validation) return null;
  return <ValidationSummaryCard validation={validation} onReloadDomains={onReloadDomains} compact />;
}

function MessageBuilderSummary({ summary }: { summary: ReturnType<typeof builderMetadataSummary> }) {
  if (!summary) return null;
  return (
    <div className="message-builder-summary" aria-label="Builder mode">
      <span className="message-builder-chip strong"><Icon icon="mdi:robot-industrial-outline" />{summary.label}</span>
      {summary.selections.slice(0, 4).map((selection) => (
        <span className="message-builder-chip" key={`${selection.label}:${selection.value}`}>
          <b>{selection.label}</b>
          <span>{selection.value}</span>
        </span>
      ))}
    </div>
  );
}

function MessageContextAttachments({ attachments }: { attachments: HaContextAttachment[] }) {
  if (!attachments.length) return null;
  return (
    <div className="message-context-attachments" aria-label="Attached context">
      {attachments.map((item) => (
        <span className="message-context-chip" key={`${item.kind}:${item.id}`} title={item.subtitle || item.label}>
          <Icon icon={iconForContextKind(item.kind)} />
          <span>{item.label}</span>
        </span>
      ))}
    </div>
  );
}

function RollbackAction({ sessionId, rollback, onRollback }: { sessionId: string; rollback?: RollbackSummary; onRollback: (sessionId: string, checkpointId: string) => void }) {
  if (!rollback?.checkpoint_id) return null;
  if (rollback.status === "available") {
    return (
      <div className="rollback-action">
        <button type="button" className="danger" onClick={() => onRollback(sessionId, rollback.checkpoint_id || "")}>
          <Icon icon="mdi:restore" />
          <span>Rollback this run</span>
        </button>
      </div>
    );
  }
  if (rollback.status === "rolled_back") {
    return <div className="rollback-note"><Icon icon="mdi:check-circle-outline" /><span>Run rolled back</span></div>;
  }
  if (rollback.status === "blocked") {
    return <div className="rollback-note blocked"><Icon icon="mdi:alert-circle-outline" /><span>{rollback.reason || "Rollback needs manual review"}</span></div>;
  }
  return null;
}

const MESSAGE_FILE_CHANGE_LIMIT = 6;

function MessageFileChanges({ api, changes }: { api: HaCodexApi; changes: GitFile[] }) {
  const [showAll, setShowAll] = useState(false);
  const [gitFiles, setGitFiles] = useState<GitFile[] | null>(null);
  const [gitFilesVersion, setGitFilesVersion] = useState(0);
  const changesKey = messageFileChangesKey(changes);
  useEffect(() => {
    if (!changes.length) {
      setGitFiles(null);
      return;
    }
    let canceled = false;
    setGitFiles(null);
    void api.gitChanges()
      .then((result) => {
        if (!canceled) {
          setGitFiles(result.files || []);
          setGitFilesVersion((version) => version + 1);
        }
      })
      .catch(() => {
        if (!canceled) {
          setGitFiles([]);
          setGitFilesVersion((version) => version + 1);
        }
      });
    return () => {
      canceled = true;
    };
  }, [api, changesKey]);
  if (!changes.length) return null;
  const displayChanges = enrichMessageFileChanges(changes, gitFiles);
  const visibleChanges = showAll ? displayChanges : displayChanges.slice(0, MESSAGE_FILE_CHANGE_LIMIT);
  const remainingCount = Math.max(0, displayChanges.length - visibleChanges.length);
  const diffVersion = `${changesKey}:${gitFilesVersion}`;
  return (
    <div className="message-file-changes">
      <div className="message-file-changes-head">
        <span>{displayChanges.length} changed {displayChanges.length === 1 ? "file" : "files"}</span>
      </div>
      {visibleChanges.map((file) => <MessageDiffFile api={api} key={`${file.old_path || ""}:${file.path}`} file={file} version={diffVersion} />)}
      {displayChanges.length > MESSAGE_FILE_CHANGE_LIMIT ? (
        <div className="message-file-changes-toggle">
          <button type="button" className="secondary" onClick={() => setShowAll((value) => !value)}>
            <Icon icon={showAll ? "mdi:chevron-up" : "mdi:chevron-down"} />
            <span>{showAll ? "Show fewer" : `Show ${remainingCount} more`}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

function messageFileChangesKey(changes: GitFile[]): string {
  return changes
    .map((file) => [
      normalizeMessageFilePath(file.old_path || ""),
      normalizeMessageFilePath(file.path),
      file.status || "",
      file.code || "",
      file.added_lines ?? "",
      file.deleted_lines ?? "",
      file.patch || "",
      file.patch_error || "",
      file.stderr || "",
    ].join("\u0000"))
    .join("\u0001");
}

function enrichMessageFileChanges(changes: GitFile[], gitFiles: GitFile[] | null): GitFile[] {
  const gitByKey = new Map<string, GitFile>();
  (gitFiles || []).forEach((file) => {
    gitByKey.set(normalizedGitFileKey(file.path, file.old_path), file);
  });
  return changes
    .map((file) => {
      const gitFile = gitByKey.get(normalizedGitFileKey(file.path, file.old_path));
      return gitFile ? { ...file, ...gitFile, path: gitFile.path || file.path, old_path: gitFile.old_path || file.old_path } : file;
    })
    .filter((file) => !isGeneratedMessageFile(file.path));
}

function normalizedGitFileKey(path: string, oldPath = ""): string {
  return gitFileKey(normalizeMessageFilePath(path), normalizeMessageFilePath(oldPath));
}

function normalizeMessageFilePath(path = ""): string {
  return String(path || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/^homeassistant\//, "")
    .replace(/^config\//, "");
}

function isGeneratedMessageFile(path: string): boolean {
  return normalizeMessageFilePath(path).split("/").includes("dist");
}

function MessageDiffFile({ api, file, version }: { api: HaCodexApi; file: GitFile; version: string }) {
  const [open, setOpen] = useState(false);
  const [diff, setDiff] = useState<GitFile | null>(file.patch ? file : null);
  const [loading, setLoading] = useState(false);
  const showToast = useUiStore((state) => state.showToast);
  const diffVersion = `${version}:${normalizedGitFileKey(file.path, file.old_path || "")}`;
  const displayFile = diff ? { ...file, ...diff, path: diff.path || file.path, old_path: diff.old_path || file.old_path } : file;
  useEffect(() => {
    setDiff(file.patch ? file : null);
    setLoading(false);
  }, [diffVersion]);
  useEffect(() => {
    if (!open || diff || loading) return;
    let canceled = false;
    setLoading(true);
    void api.gitFileDiff(file.path, file.old_path || "")
      .then((result) => {
        if (!canceled) setDiff(result);
      })
      .catch((error) => {
        if (!canceled) {
          const message = errorSummary(error);
          setDiff({ ...file, patch: "", patch_error: message });
          showToast(`Diff load failed: ${message}`, "error");
        }
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });
    return () => {
      canceled = true;
    };
  }, [api, diffVersion, open, file.path, file.old_path, showToast]);
  const toggleOpen = () => {
    setOpen((value) => !value);
  };
  return (
    <DiffFile
      file={displayFile}
      open={open}
      diff={diff}
      loading={loading}
      selectable={false}
      displayPath="path"
      onToggleFile={toggleOpen}
    />
  );
}

function errorFallbackMessage(message: CodexMessage) {
  const metadataError = message.metadata?.error || message.metadata?.stderr || message.metadata?.message;
  if (metadataError) return String(metadataError).trim();
  return "Codex reported an error without additional details.";
}
