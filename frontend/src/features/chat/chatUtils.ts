import type { Approval, CodexMessage, CodexSession, GitFile } from "../../types/ha";
import type { CodexQuestion } from "../../types/ui";

export function isRestartApproval(approval?: Approval): boolean {
  return approval?.command === "ha core restart" && String(approval.reason || "").startsWith("restart_required:");
}

export function pendingApprovals(session?: CodexSession | null): Approval[] {
  return (session?.approvals || []).filter((approval) => approval.status === "pending" && !isRestartApproval(approval));
}

export function hasPendingRestart(session?: CodexSession | null): boolean {
  return (session?.approvals || []).some((approval) => approval.status === "pending" && isRestartApproval(approval));
}

export function currentRestartApprovals(sessions: CodexSession[]): Array<{ session: CodexSession; approval: Approval }> {
  return sessions
    .map((session) => {
      const approval = (session.approvals || []).find((item) => item.status === "pending" && isRestartApproval(item));
      return approval ? { session, approval } : null;
    })
    .filter(Boolean) as Array<{ session: CodexSession; approval: Approval }>;
}

export function extractQuestion(message?: CodexMessage | null): CodexQuestion | null {
  if (!canContainQuestion(message)) return null;
  const content = String(message.content || "");
  const match = content.match(/<ha_codex_question>\s*([\s\S]*?)\s*<\/ha_codex_question>\s*$/i);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[1]) as {
      question?: string;
      choices?: Array<{ label?: string; description?: string }>;
      custom_placeholder?: string;
    };
    const choices = Array.isArray(parsed.choices) ? parsed.choices.slice(0, 3) : [];
    if (!parsed.question || choices.length !== 3) return null;
    const normalizedChoices = choices
      .map((choice) => ({
        label: String(choice?.label || "").trim(),
        description: String(choice?.description || "").trim(),
      }))
      .filter((choice) => choice.label);
    if (normalizedChoices.length !== 3) return null;
    return {
      question: String(parsed.question),
      choices: normalizedChoices,
      customPlaceholder: String(parsed.custom_placeholder || "Type a custom answer..."),
    };
  } catch {
    return null;
  }
}

export function canContainQuestion(message?: CodexMessage | null): message is CodexMessage {
  if (!message) return false;
  if (message.role === "assistant") return true;
  return message.role === "event" && String(message.metadata?.kind || "") === "run_finished";
}

export function stripQuestionBlock(value: unknown): string {
  return String(value || "").replace(/<ha_codex_question>[\s\S]*?<\/ha_codex_question>/gi, "").trim();
}

export function stripDuplicateFileChangesBlock(value: unknown, changes: GitFile[] = []): string {
  const content = String(value || "").trim();
  if (!content || !changes.length || !/^\s*File changes:\s*$/im.test(content)) return content;
  const metadataPaths = new Set(changes.map((change) => normalizeFileChangePath(change.path)).filter(Boolean));
  if (!metadataPaths.size) return content;
  const lines = content.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    if (!/^\s*File changes:\s*$/i.test(lines[index])) continue;
    const paths: string[] = [];
    let sawSummaryLine = false;
    let end = index + 1;
    for (; end < lines.length; end += 1) {
      const line = lines[end];
      if (!line.trim()) continue;
      const parsed = parseFileChangeSummaryLine(line);
      if (!parsed) break;
      sawSummaryLine = true;
      if (parsed.path) paths.push(parsed.path);
    }
    const uniquePaths = [...new Set(paths)];
    if (!sawSummaryLine || !uniquePaths.length) continue;
    if (!uniquePaths.every((path) => metadataPaths.has(path))) continue;
    return [...lines.slice(0, index), ...lines.slice(end)].join("\n").trim();
  }
  return content;
}

function parseFileChangeSummaryLine(line: string): { path?: string } | null {
  let text = line.trim();
  if (!text) return null;
  if (/^[-*]?\s*\d+\s+more files? changed\.?$/i.test(text)) return {};
  text = text.replace(/^[-*]\s+/, "").trim();
  text = text.replace(/^(added|modified|deleted|renamed|changed|untracked|copied)\s+/i, "").trim();
  text = text.replace(/^[MADRC?]{1,2}\s+/, "").trim();
  const quotedPaths = [...text.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
  if (quotedPaths.length) {
    const path = normalizeFileChangePath(quotedPaths[quotedPaths.length - 1]);
    return path ? { path } : null;
  }
  const arrowParts = text.split(/\s+->\s+/);
  text = arrowParts[arrowParts.length - 1].replace(/^["'`]+|["'`,.;:]+$/g, "").trim();
  if (!/[/.\\]/.test(text)) return null;
  const path = normalizeFileChangePath(text);
  return path ? { path } : null;
}

function normalizeFileChangePath(path = ""): string {
  return String(path || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/^homeassistant\//, "")
    .replace(/^config\//, "");
}

export function currentQuestion(session?: CodexSession | null): CodexQuestion | null {
  if (!session) return null;
  if (!Array.isArray(session.messages) && session.has_pending_question !== undefined) return null;
  return currentQuestionFromMessages(session, session.messages || []);
}

export function currentQuestionFromMessages(session: CodexSession, messages: CodexMessage[] = []): CodexQuestion | null {
  if (["planning", "running", "working"].includes(session.status || "")) return null;
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role === "user") break;
    const question = extractQuestion(message);
    if (question) return { ...question, messageIndex: index };
  }
  return null;
}

export function hasPendingQuestion(session?: CodexSession | null): boolean {
  if (session && !Array.isArray(session.messages) && session.has_pending_question !== undefined) {
    return Boolean(session.has_pending_question);
  }
  return Boolean(currentQuestion(session));
}

export function hasPendingRunPlan(session?: CodexSession | null): boolean {
  const plan = session?.metadata?.pending_plan as { status?: string } | undefined;
  return Boolean(plan && plan.status === "pending");
}

export function isSessionBusy(session?: CodexSession | null): boolean {
  if (!session) return false;
  if (["planning", "running", "working"].includes(session.status || "")) return true;
  return session.status === "waiting_approval" && Boolean(pendingApprovals(session).length);
}

export function visibleMessages(messages: CodexMessage[] = []): CodexMessage[] {
  const visible = messages.filter((message) => !["restart_required", "restart_deferred"].includes(String(message.metadata?.kind || "")));
  return visible.filter((message, index, items) => {
    if (index === 0) return true;
    return messageDisplayKey(message) !== messageDisplayKey(items[index - 1]);
  });
}

export function messageDisplayKey(message: CodexMessage): string {
  return [message.role || "", message.metadata?.kind || "", (message.content || "").trim()].join("\n");
}

export function messageKey(message: CodexMessage, index: number): string {
  if (message.id !== undefined && message.id !== null) return `id:${message.id}`;
  if (message.created_at) return `created:${message.created_at}:${message.role || ""}:${message.metadata?.kind || ""}`;
  return `content:${index}:${messageDisplayKey(message)}`;
}

export function moveEditedMessageToEnd(messages: CodexMessage[], index: number): CodexMessage[] {
  if (index < 0 || index >= messages.length - 1) return messages;
  const moved = [...messages];
  const [message] = moved.splice(index, 1);
  moved.push(message);
  return moved;
}

export function appendMessageContentDelta(messages: CodexMessage[], index: number, delta: string): CodexMessage[] {
  if (index < 0 || index >= messages.length) return messages;
  const updated = [...messages];
  updated[index] = { ...updated[index], content: `${updated[index].content || ""}${delta}` };
  if (updated[index].role === "assistant" && updated.slice(index + 1).some((message) => message.role === "event")) {
    return moveEditedMessageToEnd(updated, index);
  }
  return updated;
}

export function sessionActivityTime(session: CodexSession): number {
  const updatedAt = optionalTimestamp(session.updated_at);
  if (updatedAt !== null) return updatedAt;
  const messageTime = [...(session.messages || [])]
    .reverse()
    .map((message) => optionalTimestamp(message.created_at))
    .find((createdAt) => createdAt !== null);
  if (messageTime !== undefined) return messageTime;
  return optionalTimestamp(session.created_at) ?? 0;
}

export function lastUserMessageTime(session: CodexSession): number {
  const summaryTime = optionalTimestamp(session.last_user_message_at);
  if (summaryTime !== null) return summaryTime;
  const messageTime = [...(session.messages || [])]
    .reverse()
    .map((message) => (message.role === "user" ? optionalTimestamp(message.created_at) : null))
    .find((createdAt) => createdAt !== null);
  if (messageTime !== undefined) return messageTime;
  return sessionActivityTime(session);
}

export function sessionListTime(session: CodexSession): number {
  return lastUserMessageTime(session);
}

function optionalTimestamp(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const timestamp = Number(value);
  return Number.isFinite(timestamp) && timestamp > 0 ? timestamp : null;
}

export function isEmptySession(session: CodexSession): boolean {
  const hasVisibleApprovals = (session.approvals || []).some((approval) => !isRestartApproval(approval));
  if (!Array.isArray(session.messages)) {
    return !Number(session.last_message_id || 0) && !hasVisibleApprovals && !session.codex_session_id;
  }
  const hasVisibleMessages = (session.messages || []).some(
    (message) => !["restart_required", "restart_deferred"].includes(String(message.metadata?.kind || "")),
  );
  return !hasVisibleMessages && !Number(session.last_message_id || 0) && !hasVisibleApprovals && !session.codex_session_id;
}

export function sessionStatusRank(session: CodexSession): number {
  if (pendingApprovals(session).length || hasPendingQuestion(session) || hasPendingRunPlan(session) || (session.status === "waiting_approval" && pendingApprovals(session).length)) return 0;
  if (["planning", "running", "working"].includes(session.status || "")) return 1;
  if (session.status === "error") return 2;
  return 3;
}

function isNewEmptySession(session: CodexSession, empty: boolean): boolean {
  return empty && String(session.title || "") === "New chat";
}

export function sortedSessions(sessions: CodexSession[], archived = false): CodexSession[] {
  return [...sessions].sort((left, right) => {
    const leftEmpty = isEmptySession(left);
    const rightEmpty = isEmptySession(right);
    const leftMetrics = {
      activity: sessionListTime(left),
      empty: leftEmpty,
      newEmpty: isNewEmptySession(left, leftEmpty),
      rank: sessionStatusRank(left),
      title: String(left.title || ""),
    };
    const rightMetrics = {
      activity: sessionListTime(right),
      empty: rightEmpty,
      newEmpty: isNewEmptySession(right, rightEmpty),
      rank: sessionStatusRank(right),
      title: String(right.title || ""),
    };
    if (archived) {
      const archivedTimeDelta = rightMetrics.activity - leftMetrics.activity;
      if (archivedTimeDelta !== 0) return archivedTimeDelta;
      return leftMetrics.title.localeCompare(rightMetrics.title);
    }
    const newEmptyDelta = Number(rightMetrics.newEmpty) - Number(leftMetrics.newEmpty);
    if (newEmptyDelta !== 0) return newEmptyDelta;
    const statusDelta = leftMetrics.rank - rightMetrics.rank;
    if (statusDelta !== 0) return statusDelta;
    const emptyDelta = Number(leftMetrics.empty) - Number(rightMetrics.empty);
    if (emptyDelta !== 0) return emptyDelta;
    const timeDelta = rightMetrics.activity - leftMetrics.activity;
    if (timeDelta !== 0) return timeDelta;
    return leftMetrics.title.localeCompare(rightMetrics.title);
  });
}

export function filterSessionIdsBySearch(ids: string[], chatsById: Record<string, CodexSession>, query: string): string[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return ids;
  return ids.filter((id) => {
    const session = chatsById[id];
    if (!session) return false;
    return [session.title, session.id, session.codex_session_id]
      .filter((value) => value !== null && value !== undefined)
      .some((value) => String(value).toLowerCase().includes(normalizedQuery));
  });
}

export function cleanupArchivedSessionIds(ids: string[], chatsById: Record<string, CodexSession | undefined>): string[] {
  return ids.filter((id) => Boolean(chatsById[id]?.archived));
}
