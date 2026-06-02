import type { RunSettings } from "../../types/ha";

export type HaContextKind = "entity" | "device" | "area" | "automation" | "script" | "log" | "config_file";

export interface HaContextItem {
  id: string;
  kind: HaContextKind;
  label: string;
  subtitle?: string;
  payload?: Record<string, unknown>;
}

export interface HaContextAttachment {
  id: string;
  kind: HaContextKind;
  label: string;
  subtitle?: string;
}

export interface ContextSendPayload {
  prompt: string;
  context: HaContextItem[];
  runPrompt?: string;
  metadata?: Record<string, unknown>;
  runSettings?: Partial<RunSettings>;
}

export interface QueuedContextMessage {
  id: string;
  content: string;
  prompt: string;
  context: HaContextItem[];
  runPrompt?: string;
  metadata?: Record<string, unknown>;
  runSettings?: Partial<RunSettings>;
}

export type ContextSendResult = "sent" | "queued" | "failed";

export const CONTEXT_SELECTION_LIMIT = 20;

export function contextItemKey(item: Pick<HaContextItem, "id" | "kind">): string {
  return `${item.kind}:${item.id}`;
}

export function addContextSelection(selected: HaContextItem[], item: HaContextItem): HaContextItem[] {
  const key = contextItemKey(item);
  if (selected.some((existing) => contextItemKey(existing) === key)) return selected;
  if (selected.length >= CONTEXT_SELECTION_LIMIT) return selected;
  return [...selected, item];
}

export function removeContextSelection(selected: HaContextItem[], itemKey: string): HaContextItem[] {
  return selected.filter((item) => contextItemKey(item) !== itemKey);
}

export function contextItemsForSend(selected: HaContextItem[] = []): HaContextItem[] {
  return selected.slice(0, CONTEXT_SELECTION_LIMIT).map(normalizeContextItem).filter((item): item is HaContextItem => Boolean(item));
}

export function buildContextSendPayload(
  prompt: string,
  selected: HaContextItem[] = [],
  options: { runPrompt?: string; metadata?: Record<string, unknown>; runSettings?: Partial<RunSettings> } = {},
): ContextSendPayload {
  const runPrompt = options.runPrompt?.trim();
  return {
    prompt: prompt.trim(),
    context: contextItemsForSend(selected),
    ...(runPrompt ? { runPrompt } : {}),
    ...(options.metadata ? { metadata: options.metadata } : {}),
    ...(options.runSettings ? { runSettings: options.runSettings } : {}),
  };
}

export function createQueuedContextMessage(
  id: string,
  content: string,
  selected: HaContextItem[] = [],
  options: { runPrompt?: string; metadata?: Record<string, unknown>; runSettings?: Partial<RunSettings> } = {},
): QueuedContextMessage {
  const payload = buildContextSendPayload(content, selected, options);
  return {
    id,
    content: payload.prompt,
    ...payload,
  };
}

export function contextAttachmentsFromMetadata(metadata: Record<string, unknown> | undefined): HaContextAttachment[] {
  const context = metadata?.context;
  if (!Array.isArray(context)) return [];
  return context.map(normalizeContextAttachment).filter((item): item is HaContextAttachment => Boolean(item)).slice(0, CONTEXT_SELECTION_LIMIT);
}

export function contextAttachmentsFromItems(items: HaContextItem[]): HaContextAttachment[] {
  return contextItemsForSend(items).map(({ id, kind, label, subtitle }) => ({
    id,
    kind,
    label,
    ...(subtitle ? { subtitle } : {}),
  }));
}

export function iconForContextKind(kind: HaContextKind): string {
  return {
    area: "mdi:floor-plan",
    automation: "mdi:robot-industrial-outline",
    config_file: "mdi:file-document-outline",
    device: "mdi:devices",
    entity: "mdi:home-assistant",
    log: "mdi:text-box-search-outline",
    script: "mdi:script-text-outline",
  }[kind] || "mdi:paperclip";
}

export function shouldClearContextAfterSend(result: ContextSendResult): boolean {
  return result === "sent" || result === "queued";
}

function normalizeContextItem(item: HaContextItem): HaContextItem | null {
  const attachment = normalizeContextAttachment(item);
  if (!attachment) return null;
  const payload = item.payload && typeof item.payload === "object" && !Array.isArray(item.payload)
    ? item.payload
    : undefined;
  return {
    ...attachment,
    ...(payload ? { payload } : {}),
  };
}

function normalizeContextAttachment(item: unknown): HaContextAttachment | null {
  if (!item || typeof item !== "object") return null;
  const value = item as Partial<HaContextItem>;
  if (!isContextKind(value.kind)) return null;
  const id = String(value.id || "").trim();
  const label = String(value.label || "").trim();
  if (!id || !label) return null;
  const subtitle = String(value.subtitle || "").trim();
  return {
    id,
    kind: value.kind,
    label,
    ...(subtitle ? { subtitle } : {}),
  };
}

function isContextKind(kind: unknown): kind is HaContextKind {
  return kind === "entity"
    || kind === "device"
    || kind === "area"
    || kind === "automation"
    || kind === "script"
    || kind === "log"
    || kind === "config_file";
}
