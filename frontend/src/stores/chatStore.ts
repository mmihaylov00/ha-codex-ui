import { create } from "zustand";
import type { CodexMessage, CodexSession, ValidationResult } from "../types/ha";
import type { QueuedMessage } from "../types/ui";
import { appendMessageContentDelta, currentRestartApprovals, hasPendingQuestion, hasPendingRunPlan, pendingApprovals, sortedSessions } from "../features/chat/chatUtils";
import { addContextSelection, createQueuedContextMessage, contextItemsForSend, removeContextSelection, type ContextSendPayload, type HaContextItem } from "../features/context/contextUtils";

interface ChatStore {
  chatsById: Record<string, CodexSession>;
  messagesByChatId: Record<string, CodexMessage[]>;
  activeChatIds: string[];
  archivedChatIds: string[];
  streamingByChatId: Record<string, boolean>;
  activeId: string | null;
  showArchived: boolean;
  drafts: Record<string, string>;
  contextByChatId: Record<string, HaContextItem[]>;
  questionDrafts: Record<string, string>;
  queuesByChatId: Record<string, QueuedMessage[]>;
  queueStartsByChatId: Record<string, boolean>;
  scheduledRestart: boolean;
  validation: ValidationResult | null;
  validationRunning: boolean;
  restartToastNonce: number;
  setSessions: (sessions: CodexSession[]) => void;
  upsertSession: (session: CodexSession) => void;
  deleteSession: (id: string) => void;
  appendMessage: (chatId: string, message: CodexMessage, touch?: boolean) => void;
  appendMessages: (chatId: string, messages: CodexMessage[], touch?: boolean) => void;
  appendDelta: (chatId: string, delta: string, messageId?: string | number) => void;
  setActiveId: (id: string | null) => void;
  setShowArchived: (show: boolean) => void;
  setDraft: (id: string, value: string) => void;
  clearDraft: (id: string) => void;
  addContextItem: (id: string, item: HaContextItem) => void;
  removeContextItem: (id: string, itemKey: string) => void;
  clearContext: (id: string) => void;
  setContextItems: (id: string, items: HaContextItem[]) => void;
  setQuestionDraft: (id: string, value: string) => void;
  clearQuestionDraft: (id: string) => void;
  enqueueMessage: (chatId: string, payload: string | ContextSendPayload, context?: HaContextItem[]) => QueuedMessage;
  removeQueuedMessage: (chatId: string, queueId: string) => void;
  setQueueStarting: (chatId: string, starting: boolean) => void;
  setScheduledRestart: (scheduled: boolean) => void;
  setValidation: (validation: ValidationResult | null) => void;
  setValidationRunning: (running: boolean) => void;
  bumpRestartToast: () => void;
}

let queueItemId = 0;

function sessionSummary(session: CodexSession): CodexSession {
  const { messages: _messages, ...summary } = session;
  return summary;
}

function mergedSessionSummary(
  session: CodexSession,
  existing?: CodexSession,
  messages: CodexMessage[] = [],
): CodexSession {
  const summary = sessionSummary(session);
  return {
    ...existing,
    ...summary,
    last_user_message_at: newestUserMessageTime(
      messages,
      summary.last_user_message_at ?? existing?.last_user_message_at,
    ),
  };
}

function normalizeSessions(sessions: CodexSession[], existingMessages: Record<string, CodexMessage[]> = {}) {
  const chatsById: Record<string, CodexSession> = {};
  const messagesByChatId: Record<string, CodexMessage[]> = {};
  sessions.forEach((session) => {
    if (Array.isArray(session.messages)) messagesByChatId[session.id] = session.messages;
    else if (existingMessages[session.id]) messagesByChatId[session.id] = existingMessages[session.id];
    chatsById[session.id] = mergedSessionSummary(session, undefined, messagesByChatId[session.id] || []);
  });
  return { chatsById, messagesByChatId };
}

function orderedIds(chatsById: Record<string, CodexSession>, archived: boolean): string[] {
  return sortedSessions(
    Object.values(chatsById).filter((session) => Boolean(session.archived) === archived),
    archived,
  ).map((session) => session.id);
}

function sameMessageId(left: CodexMessage["id"], right: CodexMessage["id"]) {
  return left !== undefined && left !== null && right !== undefined && right !== null && String(left) === String(right);
}

function numericMessageId(value: CodexMessage["id"]): number | null {
  const id = Number(value);
  return Number.isFinite(id) ? id : null;
}

function newestMessageId(messages: CodexMessage[], fallback: unknown = 0): number {
  const fallbackId = Number(fallback);
  return messages.reduce((max, message, index) => {
    const id = numericMessageId(message.id) ?? index + 1;
    return Math.max(max, id);
  }, Number.isFinite(fallbackId) ? fallbackId : 0);
}

function newestUserMessageTime(messages: CodexMessage[], fallback: unknown): number | null {
  const existingTime = optionalTimestamp(fallback);
  return messages.reduce((newest, message) => {
    if (message.role !== "user") return newest;
    const createdAt = optionalTimestamp(message.created_at);
    if (createdAt === null) return newest;
    return newest === null ? createdAt : Math.max(newest, createdAt);
  }, existingTime as number | null);
}

function optionalTimestamp(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const timestamp = Number(value);
  return Number.isFinite(timestamp) && timestamp > 0 ? timestamp : null;
}

function mergeMessages(existing: CodexMessage[], incoming: CodexMessage[]): CodexMessage[] {
  const messages = [...existing];
  incoming.forEach((message) => {
    const existingIndex = messages.findIndex((item) => sameMessageId(item.id, message.id));
    if (existingIndex !== -1) {
      messages[existingIndex] = message;
      return;
    }
    const optimisticIndex = messages.findIndex(
      (item) => item.metadata?.optimistic && item.role === message.role && String(item.content || "") === String(message.content || ""),
    );
    if (optimisticIndex !== -1) {
      messages[optimisticIndex] = message;
      return;
    }
    messages.push(message);
  });
  return messages;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chatsById: {},
  messagesByChatId: {},
  activeChatIds: [],
  archivedChatIds: [],
  streamingByChatId: {},
  activeId: null,
  showArchived: false,
  drafts: {},
  contextByChatId: {},
  questionDrafts: {},
  queuesByChatId: {},
  queueStartsByChatId: {},
  scheduledRestart: false,
  validation: null,
  validationRunning: false,
  restartToastNonce: 0,

  setSessions: (sessions) => set((state) => {
    const normalized = normalizeSessions(sessions, state.messagesByChatId);
    const activeChatIds = orderedIds(normalized.chatsById, false);
    const archivedChatIds = orderedIds(normalized.chatsById, true);
    const visibleIds = state.showArchived ? archivedChatIds : activeChatIds;
    const activeId = state.activeId && visibleIds.includes(state.activeId) ? state.activeId : visibleIds[0] || null;
    const streamingByChatId = Object.fromEntries(
      sessions.map((session) => [session.id, ["planning", "running", "working"].includes(session.status || "")]),
    );
    return { ...normalized, activeChatIds, archivedChatIds, activeId, streamingByChatId };
  }),

  upsertSession: (session) => set((state) => {
    const messages = Array.isArray(session.messages) ? session.messages : state.messagesByChatId[session.id];
    const chatsById = {
      ...state.chatsById,
      [session.id]: mergedSessionSummary(session, state.chatsById[session.id], messages || []),
    };
    const activeChatIds = orderedIds(chatsById, false);
    const archivedChatIds = orderedIds(chatsById, true);
    const visibleIds = state.showArchived ? archivedChatIds : activeChatIds;
    const activeId = state.activeId && visibleIds.includes(state.activeId) ? state.activeId : visibleIds[0] || null;
    return {
      chatsById,
      messagesByChatId: messages ? { ...state.messagesByChatId, [session.id]: messages } : state.messagesByChatId,
      activeChatIds,
      archivedChatIds,
      activeId,
      streamingByChatId: {
        ...state.streamingByChatId,
        [session.id]: ["planning", "running", "working"].includes(session.status || ""),
      },
    };
  }),

  deleteSession: (id) => set((state) => {
    const { [id]: _chat, ...chatsById } = state.chatsById;
    const { [id]: _messages, ...messagesByChatId } = state.messagesByChatId;
    const { [id]: _context, ...contextByChatId } = state.contextByChatId;
    const activeChatIds = orderedIds(chatsById, false);
    const archivedChatIds = orderedIds(chatsById, true);
    const visibleIds = state.showArchived ? archivedChatIds : activeChatIds;
    return {
      chatsById,
      messagesByChatId,
      contextByChatId,
      activeChatIds,
      archivedChatIds,
      activeId: state.activeId === id ? visibleIds[0] || null : state.activeId,
    };
  }),

  appendMessage: (chatId, message, touch = true) => set((state) => {
    const session = state.chatsById[chatId];
    if (!session) return {};
    const messages = mergeMessages(state.messagesByChatId[chatId] || [], [message]);
    const chatsById = {
      ...state.chatsById,
      [chatId]: {
        ...session,
        last_message_id: newestMessageId(messages, session.last_message_id),
        last_user_message_at: newestUserMessageTime(messages, session.last_user_message_at),
        updated_at: touch ? Date.now() / 1000 : session.updated_at,
      },
    };
    return {
      chatsById,
      messagesByChatId: { ...state.messagesByChatId, [chatId]: messages },
      activeChatIds: orderedIds(chatsById, false),
      archivedChatIds: orderedIds(chatsById, true),
    };
  }),

  appendMessages: (chatId, incoming, touch = false) => set((state) => {
    const session = state.chatsById[chatId];
    if (!session || !incoming.length) return {};
    const messages = mergeMessages(state.messagesByChatId[chatId] || [], incoming);
    const chatsById = {
      ...state.chatsById,
      [chatId]: {
        ...session,
        last_message_id: newestMessageId(messages, session.last_message_id),
        last_user_message_at: newestUserMessageTime(messages, session.last_user_message_at),
        updated_at: touch ? Date.now() / 1000 : session.updated_at,
      },
    };
    return {
      chatsById,
      messagesByChatId: { ...state.messagesByChatId, [chatId]: messages },
      activeChatIds: touch ? orderedIds(chatsById, false) : state.activeChatIds,
      archivedChatIds: touch ? orderedIds(chatsById, true) : state.archivedChatIds,
    };
  }),

  appendDelta: (chatId, delta, messageId) => set((state) => {
    const session = state.chatsById[chatId];
    if (!session) return {};
    const existingMessages = state.messagesByChatId[chatId] || [];
    const messageIdNumber = numericMessageId(messageId);
    if (!existingMessages.length && messageIdNumber !== null && messageIdNumber > 1) return {};
    const messages = [...existingMessages];
    let index = messageId === undefined || messageId === null ? -1 : messages.findIndex((item) => sameMessageId(item.id, messageId));
    if (index === -1) {
      for (let i = messages.length - 1; i >= 0; i -= 1) {
        if (messages[i].role === "assistant") {
          index = i;
          break;
        }
      }
    }
    if (index === -1) {
      messages.push({ id: messageId, role: "assistant", content: delta, created_at: Date.now() / 1000 });
    } else {
      messages.splice(0, messages.length, ...appendMessageContentDelta(messages, index, delta));
    }
    const currentLastId = Number(session.last_message_id || 0);
    const nextLastId = messageIdNumber !== null ? Math.max(currentLastId, messageIdNumber) : currentLastId;
    const chatsById = nextLastId !== currentLastId
      ? { ...state.chatsById, [chatId]: { ...session, last_message_id: nextLastId } }
      : state.chatsById;
    return {
      chatsById,
      messagesByChatId: { ...state.messagesByChatId, [chatId]: messages },
    };
  }),

  setActiveId: (id) => set({ activeId: id }),
  setShowArchived: (show) => set((state) => {
    const visibleIds = show ? state.archivedChatIds : state.activeChatIds;
    return {
      showArchived: show,
      activeId: state.activeId && visibleIds.includes(state.activeId) ? state.activeId : visibleIds[0] || null,
    };
  }),
  setDraft: (id, value) => set((state) => ({ drafts: { ...state.drafts, [id]: value } })),
  clearDraft: (id) => set((state) => {
    const { [id]: _draft, ...drafts } = state.drafts;
    return { drafts };
  }),
  addContextItem: (id, item) => set((state) => {
    const selected = addContextSelection(state.contextByChatId[id] || [], item);
    return { contextByChatId: { ...state.contextByChatId, [id]: selected } };
  }),
  removeContextItem: (id, itemKey) => set((state) => {
    const selected = removeContextSelection(state.contextByChatId[id] || [], itemKey);
    if (!selected.length) {
      const { [id]: _removed, ...contextByChatId } = state.contextByChatId;
      return { contextByChatId };
    }
    return { contextByChatId: { ...state.contextByChatId, [id]: selected } };
  }),
  clearContext: (id) => set((state) => {
    const { [id]: _removed, ...contextByChatId } = state.contextByChatId;
    return { contextByChatId };
  }),
  setContextItems: (id, items) => set((state) => {
    const selected = contextItemsForSend(items);
    if (!selected.length) {
      const { [id]: _removed, ...contextByChatId } = state.contextByChatId;
      return { contextByChatId };
    }
    return { contextByChatId: { ...state.contextByChatId, [id]: selected } };
  }),
  setQuestionDraft: (id, value) => set((state) => ({ questionDrafts: { ...state.questionDrafts, [id]: value } })),
  clearQuestionDraft: (id) => set((state) => {
    const { [id]: _draft, ...questionDrafts } = state.questionDrafts;
    return { questionDrafts };
  }),
  enqueueMessage: (chatId, payload, context = []) => {
    const item = typeof payload === "string"
      ? createQueuedContextMessage(String(++queueItemId), payload, context)
      : createQueuedContextMessage(String(++queueItemId), payload.prompt, payload.context, {
        runPrompt: payload.runPrompt,
        metadata: payload.metadata,
      });
    set((state) => ({ queuesByChatId: { ...state.queuesByChatId, [chatId]: [...(state.queuesByChatId[chatId] || []), item] } }));
    return item;
  },
  removeQueuedMessage: (chatId, queueId) => set((state) => ({
    queuesByChatId: {
      ...state.queuesByChatId,
      [chatId]: (state.queuesByChatId[chatId] || []).filter((item) => item.id !== queueId),
    },
  })),
  setQueueStarting: (chatId, starting) => set((state) => ({
    queueStartsByChatId: { ...state.queueStartsByChatId, [chatId]: starting },
  })),
  setScheduledRestart: (scheduled) => set({ scheduledRestart: scheduled }),
  setValidation: (validation) => set({ validation }),
  setValidationRunning: (running) => set({ validationRunning: running }),
  bumpRestartToast: () => set((state) => ({ restartToastNonce: state.restartToastNonce + 1 })),
}));

export const chatSelectors = {
  sessions: (state: ChatStore) => Object.values(state.chatsById),
  visibleIds: (state: ChatStore) => (state.showArchived ? state.archivedChatIds : state.activeChatIds),
  activeSession: (state: ChatStore) => (state.activeId ? state.chatsById[state.activeId] || null : null),
  messagesFor: (chatId: string) => (state: ChatStore) => state.messagesByChatId[chatId] || [],
  hasActions: (session: CodexSession) => pendingApprovals(session).length > 0 || hasPendingQuestion(session) || hasPendingRunPlan(session),
  restartApprovals: (state: ChatStore) => currentRestartApprovals(Object.values(state.chatsById)),
};
