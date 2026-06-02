export function stripAnsi(value: unknown): string {
  return String(value || "").replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, "");
}

export function formatRelativeTime(value: unknown, options: { pastOnly?: boolean } = {}): string {
  const seconds = timestampSeconds(value);
  if (seconds === null) return "";
  const date = new Date(seconds * 1000);
  const deltaSeconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const ageSeconds = Math.abs(deltaSeconds);
  const suffix = deltaSeconds >= 0 ? "ago" : "";
  const prefix = deltaSeconds < 0 ? "in " : "";
  if (ageSeconds < 60) return deltaSeconds < 0 && !options.pastOnly ? "in less than a minute" : "just now";
  if (ageSeconds < 3600) {
    const minutes = Math.floor(ageSeconds / 60);
    return `${prefix}${minutes} minute${minutes === 1 ? "" : "s"}${suffix ? ` ${suffix}` : ""}`;
  }
  if (ageSeconds < 86400) {
    const hours = Math.floor(ageSeconds / 3600);
    return `${prefix}${hours} hour${hours === 1 ? "" : "s"}${suffix ? ` ${suffix}` : ""}`;
  }
  if (ageSeconds < 172800 && deltaSeconds >= 0) return "yesterday";
  if (ageSeconds < 172800 && !options.pastOnly) return "tomorrow";
  if (deltaSeconds < 0 && !options.pastOnly && ageSeconds < 2592000) {
    const days = Math.floor(ageSeconds / 86400);
    return `in ${days} day${days === 1 ? "" : "s"}`;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatRunTime(value: unknown): string {
  return formatRelativeTime(value, { pastOnly: true });
}

export function formatElapsedTime(fromValue: unknown, toValue: unknown): string {
  const fromSeconds = timestampSeconds(fromValue);
  const toSeconds = timestampSeconds(toValue);
  if (fromSeconds === null || toSeconds === null) return "";
  const seconds = Math.max(0, Math.floor(toSeconds - fromSeconds));
  if (seconds < 60) return `+${seconds}s`;
  if (seconds < 3600) return `+${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes ? `+${hours}h ${minutes}m` : `+${hours}h`;
  }
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  return hours ? `+${days}d ${hours}h` : `+${days}d`;
}

export function formatDuration(value: unknown): string {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds < 0) return "";
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${Math.floor(seconds)}s`;
}

export function formatTimestampTitle(value: unknown): string {
  const seconds = timestampSeconds(value);
  if (seconds === null) return "";
  return new Date(seconds * 1000).toLocaleString();
}

function timestampSeconds(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const seconds = Number(value);
  return Number.isFinite(seconds) && seconds > 0 ? seconds : null;
}

export function errorSummary(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "object" && error && "code" in error) {
    const item = error as { name?: string; code?: string | number };
    return `${item.name || "Error"} code ${item.code}`;
  }
  return String(error);
}

export async function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    if (!document.execCommand("copy")) throw new Error("Copy command failed");
  } finally {
    textarea.remove();
  }
}
