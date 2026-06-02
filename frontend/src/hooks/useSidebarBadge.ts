import { useEffect } from "react";
import { useChatStore } from "../stores/chatStore";
import { hasPendingQuestion, hasPendingRestart, hasPendingRunPlan, pendingApprovals } from "../features/chat/chatUtils";

interface BadgeInfo {
  count: number;
  tone: "action" | "error" | "working" | "restart";
  label: string;
}

let cachedRoots: ShadowRoot[] = [];
let lastBadgeKey = "";

const SIDEBAR_HOST_SELECTORS = [
  "ha-sidebar",
  "home-assistant",
  "home-assistant-main",
  "ha-drawer",
  "ha-panel-lovelace",
  "partial-panel-resolver",
];
const SIDEBAR_BADGE_SLOW_MS = 50;

function sidebarBadgeInfo(): BadgeInfo | null {
  const sessions = Object.values(useChatStore.getState().chatsById).filter((session) => !session.archived);
  const actionCount = sessions.filter((session) => pendingApprovals(session).length > 0 || hasPendingQuestion(session) || hasPendingRunPlan(session)).length;
  if (actionCount > 0) return { count: actionCount, tone: "action", label: `${actionCount} chats waiting for action` };
  const errorCount = sessions.filter((session) => session.status === "error").length;
  if (errorCount > 0) return { count: errorCount, tone: "error", label: `${errorCount} chats with errors` };
  const workingCount = sessions.filter((session) => ["planning", "running", "working"].includes(session.status || "")).length;
  if (workingCount > 0) return { count: workingCount, tone: "working", label: `${workingCount} chats working` };
  const restartCount = sessions.filter((session) => hasPendingRestart(session)).length;
  if (restartCount > 0) return { count: restartCount, tone: "restart", label: `${restartCount} chats waiting for restart` };
  return null;
}

function findSidebarRoots() {
  const started = performance.now();
  const roots = new Set<ShadowRoot>();
  const visited = new Set<ParentNode | Document | ShadowRoot>();

  const visit = (node: ParentNode | Document | ShadowRoot | null) => {
    if (!node || visited.has(node)) return;
    visited.add(node);
    node.querySelectorAll?.(SIDEBAR_HOST_SELECTORS.join(",")).forEach((host) => {
      if (host.localName === "ha-sidebar" && host.shadowRoot) roots.add(host.shadowRoot);
      if (host.shadowRoot) visit(host.shadowRoot);
    });
  };

  visit(document);
  const elapsed = performance.now() - started;
  if (elapsed > SIDEBAR_BADGE_SLOW_MS) {
    console.debug(`[ha_codex] sidebar badge root lookup took ${elapsed.toFixed(1)}ms`);
  }
  return [...roots];
}

function badgeKey(info: BadgeInfo | null) {
  return info ? `${info.tone}:${info.count}:${info.label}` : "none";
}

function ensureSidebarBadgeStyle(root: ShadowRoot) {
  if (root.querySelector("style[data-ha-codex-sidebar-badge]")) return;
  const style = document.createElement("style");
  style.dataset.haCodexSidebarBadge = "true";
  style.textContent = `
    #sidebar-panel-ha-codex { position: relative; }
    #sidebar-panel-ha-codex .ha-codex-sidebar-badge[slot="start"] {
      position: absolute;
      top: var(--ha-space-1, 4px);
      left: 26px;
      border-radius: var(--ha-border-radius-md, 6px);
      font-size: 0.65em;
      line-height: var(--ha-line-height-expanded, 1.6);
      padding: 0 var(--ha-space-1, 4px);
    }
    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.action { background: #f97316; color: #111827; }
    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.error { background: #ef4444; color: #ffffff; }
    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.working { background: #facc15; color: #111827; }
    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.restart { background: #38bdf8; color: #0f172a; }
  `;
  root.appendChild(style);
}

function updateSidebarBadgeRoot(root: ShadowRoot, info: BadgeInfo | null) {
  const item = root.querySelector("#sidebar-panel-ha-codex");
  if (!item) return;
  ensureSidebarBadgeStyle(root);
  const badges = [...item.querySelectorAll<HTMLElement>(".ha-codex-sidebar-badge")];
  if (!info) {
    badges.forEach((badge) => badge.remove());
    return;
  }
  ["start", "end"].forEach((slot) => {
    let badge = badges.find((item) => item.slot === slot);
    if (!badge) {
      badge = document.createElement("span");
      badge.slot = slot;
      item.appendChild(badge);
    }
    badge.className = `badge ha-codex-sidebar-badge ${info.tone}`;
    badge.textContent = String(info.count);
    badge.setAttribute("aria-label", info.label);
    badge.title = info.label;
  });
}

function updateSidebarBadges(force = false) {
  const info = sidebarBadgeInfo();
  const key = badgeKey(info);
  if (!force && key === lastBadgeKey) return;
  lastBadgeKey = key;
  cachedRoots.forEach((root) => updateSidebarBadgeRoot(root, info));
}

function hasActiveSidebarTarget() {
  return cachedRoots.some((root) => root.host.isConnected && root.querySelector("#sidebar-panel-ha-codex"));
}

export function useSidebarBadge() {
  useEffect(() => {
    let badgeFrame: number | null = null;
    let rootFrame: number | null = null;
    const scheduleBadgeUpdate = () => {
      if (badgeFrame !== null) return;
      badgeFrame = requestAnimationFrame(() => {
        badgeFrame = null;
        updateSidebarBadges();
      });
    };
    const refreshRoots = () => {
      if (rootFrame !== null) return;
      rootFrame = requestAnimationFrame(() => {
        rootFrame = null;
        cachedRoots = findSidebarRoots();
        updateSidebarBadges(true);
      });
    };
    const unsubscribe = useChatStore.subscribe(scheduleBadgeUpdate);
    const observer = new MutationObserver(() => {
      if (hasActiveSidebarTarget()) {
        scheduleBadgeUpdate();
        return;
      }
      refreshRoots();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    refreshRoots();
    scheduleBadgeUpdate();
    return () => {
      unsubscribe();
      observer.disconnect();
      if (badgeFrame !== null) cancelAnimationFrame(badgeFrame);
      if (rootFrame !== null) cancelAnimationFrame(rootFrame);
    };
  }, []);
}
