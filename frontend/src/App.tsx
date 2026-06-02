import { useEffect, useMemo, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HaCodexApi } from "./services/api";
import { haCodexWebSocketManager } from "./services/websocketManager";
import type { HomeAssistant, PanelInfo } from "./types/ha";
import { useHaCodexActions } from "./hooks/useHaCodexActions";
import { useChatStore } from "./stores/chatStore";
import { useUiStore } from "./stores/uiStore";
import { Rail } from "./components/Rail";
import { ChatPanel } from "./components/ChatPanel";
import { GitDrawer } from "./components/GitDrawer";
import { SettingsModal } from "./components/SettingsModal";
import { ToastStack } from "./components/ToastStack";
import { copyText, errorSummary } from "./utils/format";
import { useSidebarBadge } from "./hooks/useSidebarBadge";
import { isGitSetupReady } from "./features/git/gitUtils";

const queryClient = new QueryClient();
const INITIAL_TRANSCRIPT_LIMIT = 200;

export function AppShell({ hass, panel }: { hass: HomeAssistant | null; panel: PanelInfo | null }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CodexApp hass={hass} panel={panel} />
    </QueryClientProvider>
  );
}

function CodexApp({ hass, panel }: { hass: HomeAssistant | null; panel: PanelInfo | null }) {
  const api = useMemo(() => new HaCodexApi(() => hass), [hass]);
  const actions = useHaCodexActions(api);
  const actionsRef = useRef(actions);
  const gitOpen = useUiStore((state) => state.gitPanelOpen);
  const gitReady = useUiStore((state) => isGitSetupReady(state.gitSetupStatus));
  const showDebug = useUiStore((state) => state.showStatusDebug);
  const setShowArchived = useChatStore((state) => state.setShowArchived);
  const showArchived = useChatStore((state) => state.showArchived);
  const setActiveId = useChatStore((state) => state.setActiveId);
  const activeId = useChatStore((state) => state.activeId);
  const setGitPanelOpen = useUiStore((state) => state.setGitPanelOpen);
  const setShowStatusDebug = useUiStore((state) => state.setShowStatusDebug);
  const setSettingsTab = useUiStore((state) => state.setSettingsTab);
  const showToast = useUiStore((state) => state.showToast);
  useSidebarBadge();

  useEffect(() => {
    actionsRef.current = actions;
  }, [actions]);

  useEffect(() => {
    haCodexWebSocketManager.configure(hass, panel);
    return () => haCodexWebSocketManager.cleanup();
  }, [hass, panel]);

  useEffect(() => {
    if (!hass) return;
    void actions.loadInitial().catch((error) => showToast(errorSummary(error), "error"));
  }, [hass, actions, showToast]);

  useEffect(() => {
    if (!activeId) return;
    const session = useChatStore.getState().chatsById[activeId];
    const newestKnown = Math.max(
      0,
      ...(useChatStore.getState().messagesByChatId[activeId] || [])
        .map((message) => Number(message.id))
        .filter((id) => Number.isFinite(id)),
    );
    const reportedNewest = Number(session?.last_message_id || 0);
    if (!reportedNewest || reportedNewest <= newestKnown) return;
    let canceled = false;
    void api.messagesAfter(activeId, newestKnown, newestKnown ? undefined : INITIAL_TRANSCRIPT_LIMIT)
      .then((result) => {
        if (canceled) return;
        useChatStore.getState().appendMessages(activeId, result.messages || [], false);
      })
      .catch((error) => showToast(errorSummary(error), "error"));
    return () => {
      canceled = true;
    };
  }, [activeId, api, showToast]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void actionsRef.current.maybeRunScheduledRestart();
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && useUiStore.getState().showStatusDebug) {
        setShowStatusDebug(false);
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [setShowStatusDebug]);

  const guarded = <Args extends unknown[]>(fn: (...args: Args) => Promise<void> | void) => (...args: Args) => {
    Promise.resolve(fn(...args)).catch((error) => showToast(errorSummary(error), "error"));
  };

  return (
    <main className={`shell ${gitOpen && gitReady ? "git-open" : "git-closed"}`}>
      <Rail
        onNew={guarded(actions.createSession)}
        onSelect={setActiveId}
        onArchive={guarded(actions.archiveSession)}
        onToggleArchived={() => setShowArchived(!showArchived)}
        onValidate={guarded(() => actions.runValidation(activeId))}
        onRestartNow={guarded((sessionId, approvalId) => actions.respondApproval(sessionId, approvalId, true, "Restarting Home Assistant"))}
        onRestartSchedule={actions.scheduleRestartAfterChats}
        onRestartScheduleCancel={actions.cancelScheduledRestart}
        onDebug={guarded(async () => {
          await Promise.all([actions.loadStatus(), actions.loadSettings()]);
          setSettingsTab("run");
          setShowStatusDebug(true);
        })}
      />
      <section className="chat">
        <ChatPanel
          api={api}
          hass={hass}
          onNew={guarded(actions.createSession)}
          onGitToggle={guarded(actions.toggleGitPanel)}
          onRenameStart={actions.startRename}
          onRenameSave={guarded(actions.saveRename)}
          onArchive={guarded(actions.archiveSession)}
          onCancel={guarded(actions.cancelSession)}
          onRetry={guarded(actions.retryContinueSession)}
          onSend={guarded(actions.sendPrompt)}
          onAnswer={guarded(actions.answerQuestion)}
          onApprove={guarded(actions.respondApproval)}
          onRunPlan={guarded(actions.respondRunPlan)}
          onRollback={guarded(actions.rollbackRun)}
          onCopy={guarded(async (value) => {
            await copyText(value);
            showToast("Copied to clipboard", "success");
          })}
          onQueueEdit={actions.editQueuedMessage}
          onQueueSteer={guarded(actions.steerQueuedMessage)}
          onQueueClear={actions.clearQueuedMessage}
          onValidationReload={guarded(actions.reloadValidationDomains)}
          onRunSettingsChange={guarded(actions.updateSessionRunSettings)}
        />
      </section>
      {gitReady ? (
        <GitDrawer
          open={gitOpen}
          onClose={() => setGitPanelOpen(false)}
          onRefresh={guarded(() => actions.loadGitChanges(true))}
          onLoadMore={actions.showMoreGitFiles}
          onToggleFile={guarded(actions.toggleGitFileDiff)}
          onCommit={guarded(actions.commitAndPush)}
          onDiscard={guarded(actions.discardSelectedGitFiles)}
        />
      ) : null}
      {showDebug ? (
        <SettingsModal
          onClose={() => setShowStatusDebug(false)}
          onTab={guarded(async (tab) => {
            setSettingsTab(tab);
            if (tab === "bridge-log" && !useUiStore.getState().bridgeLog) await actions.loadBridgeLog();
            if (tab === "account") await actions.loadAccountStatus();
            if (tab === "git") await actions.loadGitSetupStatus();
          })}
          onSettingsSave={guarded(actions.updateSettings)}
          onBridgeRestart={guarded(actions.startOrRestartBridge)}
          onCoreRestart={guarded(actions.restartHomeAssistant)}
          onBridgeLogRefresh={guarded(actions.loadBridgeLog)}
          onBridgeLogClear={guarded(actions.clearBridgeLog)}
          onDeviceLogin={guarded(actions.startDeviceLogin)}
          onDeviceLoginCancel={guarded(actions.cancelDeviceLogin)}
          onAccountLogout={guarded(actions.logoutAccount)}
          onGitSetupRefresh={guarded(async () => { await actions.loadGitSetupStatus(); })}
          onGitSetupGenerateKey={guarded(actions.generateGitSetupKey)}
          onGitSetupRemoteSave={guarded(actions.saveGitSetupRemote)}
          onGitSetupPull={guarded(actions.pullGitSetupRemote)}
        />
      ) : null}
      <ToastStack />
    </main>
  );
}
