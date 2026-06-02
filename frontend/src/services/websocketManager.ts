import type { HaCodexEvent, HomeAssistant, PanelInfo } from "../types/ha";
import { useChatStore } from "../stores/chatStore";
import { useUiStore } from "../stores/uiStore";
import { HA_CODEX_EVENTS } from "./events";
import { shouldKeepResolvedSubscription } from "./subscriptionState";

type Unsubscribe = () => void;
type PendingDelta = { chatId: string; messageId?: string | number; delta: string };
const INITIAL_TRANSCRIPT_LIMIT = 200;

export class HaCodexWebSocketManager {
  private hass: HomeAssistant | null = null;
  private panel: PanelInfo | null = null;
  private subscribed = false;
  private unsubscribers: Unsubscribe[] = [];
  private reconnectTimer: number | null = null;
  private deltaFrame: number | null = null;
  private pendingDeltas = new Map<string, PendingDelta>();
  private subscriptionGeneration = 0;

  configure(hass: HomeAssistant | null, panel: PanelInfo | null) {
    this.hass = hass;
    this.panel = panel;
    this.connect();
  }

  connect() {
    if (this.subscribed || !this.hass?.connection) return;
    const events = this.panel?.config?.events || HA_CODEX_EVENTS;
    const eventTypes = Object.values(events).filter(Boolean);
    if (!eventTypes.length) return;
    this.subscribed = true;
    const subscriptionGeneration = ++this.subscriptionGeneration;
    eventTypes.forEach((eventType) => {
      try {
        const result = this.hass?.connection?.subscribeEvents((event) => this.handleEvent(event), eventType);
        Promise.resolve(result).then((unsubscribe) => {
          if (typeof unsubscribe !== "function") return;
          if (shouldKeepResolvedSubscription(this.subscriptionGeneration, subscriptionGeneration, this.subscribed)) {
            this.unsubscribers.push(unsubscribe);
          } else {
            unsubscribe();
          }
        });
      } catch (error) {
        this.subscribed = false;
        this.scheduleReconnect();
        throw error;
      }
    });
  }

  cleanup() {
    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
    this.unsubscribers = [];
    this.subscribed = false;
    this.subscriptionGeneration += 1;
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.deltaFrame !== null) {
      window.cancelAnimationFrame(this.deltaFrame);
      this.deltaFrame = null;
    }
    this.pendingDeltas.clear();
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, 1500);
  }

  private handleEvent(event: HaCodexEvent) {
    const data = event.data || {};
    const chatStore = useChatStore.getState();
    if (data.session_id && data.message) {
      this.flushDeltas();
      chatStore.appendMessage(data.session_id, data.message);
    }
    if (data.session_id && data.delta) {
      this.queueDelta(data.session_id, data.delta, data.message_id);
    }
    if (data.session) {
      this.flushDeltas();
      chatStore.upsertSession(data.session);
      void this.recoverMissingMessages(data.session.id);
    }
    if (data.deleted_session_id) {
      chatStore.deleteSession(data.deleted_session_id);
    }
    if (data.validation) {
      chatStore.setValidation(data.validation);
      useUiStore.getState().showToast(
        data.validation.status === "passed" ? "Validation passed" : "Validation finished",
        data.validation.status === "passed" ? "success" : "error",
      );
    }
    if (data.approval) {
      chatStore.bumpRestartToast();
      if (data.approval.command !== "ha core restart") {
        useUiStore.getState().showToast("Codex needs approval for a shell command", "info");
      }
    }
  }

  private async recoverMissingMessages(chatId: string) {
    if (!this.hass) return;
    const state = useChatStore.getState();
    const session = state.chatsById[chatId];
    const newestKnown = Math.max(
      0,
      ...(state.messagesByChatId[chatId] || [])
        .map((message) => Number(message.id))
        .filter((id) => Number.isFinite(id)),
    );
    const reportedNewest = Number(session?.last_message_id || 0);
    if (!reportedNewest || reportedNewest <= newestKnown) return;
    try {
      const result = await this.hass.callWS<{ messages?: import("../types/ha").CodexMessage[] }>({
        type: "ha_codex/sessions/messages_after",
        session_id: chatId,
        after_id: newestKnown,
        ...(newestKnown ? {} : { limit: INITIAL_TRANSCRIPT_LIMIT }),
      });
      useChatStore.getState().appendMessages(chatId, result.messages || [], false);
    } catch {
      // Event recovery is best-effort; the next full session load will reconcile.
    }
  }

  private queueDelta(chatId: string, delta: string, messageId?: string | number) {
    const key = `${chatId}:${messageId ?? "latest"}`;
    const pending = this.pendingDeltas.get(key);
    this.pendingDeltas.set(key, {
      chatId,
      messageId,
      delta: `${pending?.delta || ""}${delta}`,
    });
    if (this.deltaFrame !== null) return;
    this.deltaFrame = window.requestAnimationFrame(() => {
      this.deltaFrame = null;
      this.flushDeltas();
    });
  }

  private flushDeltas() {
    if (!this.pendingDeltas.size) return;
    const deltas = [...this.pendingDeltas.values()];
    this.pendingDeltas.clear();
    const chatStore = useChatStore.getState();
    deltas.forEach((item) => chatStore.appendDelta(item.chatId, item.delta, item.messageId));
  }
}

export const haCodexWebSocketManager = new HaCodexWebSocketManager();
