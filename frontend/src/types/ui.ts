import type { HaContextItem } from "../features/context/contextUtils";
import type { RunSettings } from "./ha";

export interface QueuedMessage {
  id: string;
  content: string;
  prompt?: string;
  context?: HaContextItem[];
  runPrompt?: string;
  metadata?: Record<string, unknown>;
  runSettings?: Partial<RunSettings>;
}

export interface Toast {
  id: number;
  message: string;
  tone: "info" | "success" | "error" | "restart";
  entering?: boolean;
  exiting?: boolean;
}

export interface QuestionChoice {
  label: string;
  description: string;
}

export interface CodexQuestion {
  question: string;
  choices: QuestionChoice[];
  customPlaceholder: string;
  messageIndex?: number;
}

export type DebugTab = "status" | "bridge-log" | "validation";
export type SettingsTab = "account" | "run" | "models" | "debug" | "bridge-log";
