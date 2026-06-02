import { useMemo } from "react";
import type { HaCodexApi } from "../services/api";
import { useChatStore } from "../stores/chatStore";
import { useUiStore } from "../stores/uiStore";
import { errorSummary, stripAnsi } from "../utils/format";
import { gitStatusLabel, gitFileKey, reviewableGitFileCount, reviewableGitFiles, selectedGitFiles } from "../features/git/gitUtils";
import { hasPendingQuestion, hasPendingRestart, hasPendingRunPlan, isSessionBusy, pendingApprovals } from "../features/chat/chatUtils";
import { buildContextSendPayload, contextAttachmentsFromItems, shouldClearContextAfterSend, type ContextSendPayload, type HaContextItem } from "../features/context/contextUtils";
import { runPlanRevisePrompt } from "../features/runPlan/runPlanUtils";
import { normalizeHaCodexSettings, normalizeRunSettings } from "../features/settings/runtimeSettingsUtils";
import type { CodexMessage, CodexSession, GitChanges, HaCodexSettings, RunSettings } from "../types/ha";

function localSessionId() {
  if (window.crypto?.randomUUID) return `local-${window.crypto.randomUUID()}`;
  return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function gitOperationFailureMessage(result: GitChanges, fallback: string): string {
  const failed = result.results?.find((item) => item.ok === false);
  return stripAnsi([failed?.stdout, failed?.stderr, result.stdout, result.stderr].filter(Boolean).join("\n")).trim() || fallback;
}

function sessionRunSettingsKey(session: CodexSession | undefined): string {
  return JSON.stringify(session?.metadata?.run_settings || null);
}

export function useHaCodexActions(api: HaCodexApi) {
  return useMemo(() => {
    const ui = () => useUiStore.getState();
    const chat = () => useChatStore.getState();
    let deviceLoginPoll: number | null = null;

    const loadLegacyGitChanges = async (primaryError: unknown): Promise<GitChanges> => {
      const [status, diff] = await Promise.all([api.gitStatus(), api.gitDiff()]);
      const statusLines = stripAnsi(status.stdout || "").split("\n").filter((line) => line.trim());
      const files = reviewableGitFiles(statusLines
        .map((line) => {
          const code = line.slice(0, 2);
          return {
            path: line.slice(3),
            code,
            status: gitStatusLabel(code),
            added_lines: null,
            deleted_lines: null,
          };
        }));
      return {
        ok: Boolean(status.ok && diff.ok),
        returncode: diff.returncode,
        stdout: status.stdout,
        stderr: [status.stderr, diff.stderr, errorSummary(primaryError)].filter(Boolean).join("\n"),
        changed_count: files.length,
        files,
        legacy: true,
      };
    };

    const loadSessions = async () => {
      const result = await api.listSessions();
      chat().setSessions(result.sessions || []);
    };

    const loadStatus = async () => {
      try {
        ui().setStatus(await api.status());
      } catch (error) {
        ui().setStatus({ error: errorSummary(error) });
      }
    };

    const loadAccountStatus = async () => {
      ui().setAccountLoading(true);
      try {
        ui().setAccount(await api.accountStatus());
      } catch (error) {
        ui().setAccount({ ok: false, logged_in: false, error: errorSummary(error) });
      } finally {
        ui().setAccountLoading(false);
      }
    };

    const pollDeviceLogin = () => {
      if (deviceLoginPoll !== null) window.clearInterval(deviceLoginPoll);
      deviceLoginPoll = window.setInterval(() => {
        void api.accountDeviceLoginStatus()
          .then(async (status) => {
            ui().setDeviceLogin(status);
            if (status.status === "succeeded") {
              if (deviceLoginPoll !== null) window.clearInterval(deviceLoginPoll);
              deviceLoginPoll = null;
              await Promise.all([loadAccountStatus(), loadStatus()]);
              ui().showToast("Codex account connected", "success");
            } else if (status.status === "failed" || status.status === "canceled") {
              if (deviceLoginPoll !== null) window.clearInterval(deviceLoginPoll);
              deviceLoginPoll = null;
              if (status.status === "failed") ui().showToast(status.error || "Device login failed", "error");
            }
          })
          .catch((error) => {
            if (deviceLoginPoll !== null) window.clearInterval(deviceLoginPoll);
            deviceLoginPoll = null;
            ui().showToast(errorSummary(error), "error");
          });
      }, 2000);
    };

    const loadSettings = async () => {
      ui().setSettingsLoading(true);
      try {
        const result = await api.settings();
        ui().setSettings(normalizeHaCodexSettings(result.settings));
      } catch (error) {
        ui().showToast(`Settings failed to load: ${errorSummary(error)}`, "error");
      } finally {
        ui().setSettingsLoading(false);
      }
    };

    const loadBridgeLog = async () => {
      ui().setBridgeLogLoading(true);
      try {
        ui().setBridgeLog(await api.bridgeLog());
      } catch (error) {
        ui().setBridgeLog({ error: errorSummary(error), lines: "" });
      } finally {
        ui().setBridgeLogLoading(false);
      }
    };

    const clearBridgeLog = async () => {
      ui().setBridgeLogLoading(true);
      try {
        const result = await api.bridgeLogClear();
        ui().setBridgeLog(result);
        if (result.error) {
          ui().showToast(`Bridge log clear failed: ${result.error}`, "error");
        } else {
          ui().showToast("Bridge log cleared", "success");
        }
      } catch (error) {
        ui().showToast(`Bridge log clear failed: ${errorSummary(error)}`, "error");
      } finally {
        ui().setBridgeLogLoading(false);
      }
    };

    const loadGitCount = async () => {
      try {
        const status = await api.gitStatus();
        const files = stripAnsi(status.stdout || "")
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => ({ path: line.slice(3), status: gitStatusLabel(line.slice(0, 2)) }));
        ui().setGitChangedCount(reviewableGitFileCount(files));
      } catch {
        ui().setGitChangedCount(0);
      }
    };

    const loadGitChanges = async (toast = true) => {
      if (ui().gitLoading) return;
      ui().setGitLoading(true);
      try {
        let changes: GitChanges;
        try {
          changes = await api.gitChanges();
        } catch (error) {
          changes = await loadLegacyGitChanges(error);
        }
        ui().setGitChanges(changes);
        ui().setOpenGitDiffKey(null);
        ui().setGitDiscardConfirming(false);
        ui().setGitChangedCount(reviewableGitFileCount(changes.files || []));
        if (toast) ui().showToast("Git changes refreshed", "success");
      } catch (error) {
        ui().setGitChanges({ ok: false, changed_count: 0, files: [], stderr: errorSummary(error) });
        if (toast) ui().showToast(`Git reload failed: ${errorSummary(error)}`, "error");
      } finally {
        ui().setGitLoading(false);
      }
    };

    const createSession = async () => {
      const optimisticId = localSessionId();
      const optimisticSession: CodexSession = {
        id: optimisticId,
        title: "New chat",
        messages: [],
        approvals: [],
        codex_session_id: null,
        status: "idle",
        validation: null,
        archived: chat().showArchived,
        archived_at: chat().showArchived ? Date.now() / 1000 : null,
        created_at: Date.now() / 1000,
        updated_at: Date.now() / 1000,
        metadata: { optimistic: true },
      };
      chat().upsertSession(optimisticSession);
      chat().setActiveId(optimisticId);
      try {
        const result = await api.createSession();
        const draft = chat().drafts[optimisticId];
        const context = chat().contextByChatId[optimisticId] || [];
        chat().deleteSession(optimisticId);
        chat().upsertSession(result.session);
        chat().setActiveId(result.session.id);
        if (draft !== undefined) chat().setDraft(result.session.id, draft);
        context.forEach((item) => chat().addContextItem(result.session.id, item));
      } catch (error) {
        chat().deleteSession(optimisticId);
        ui().showToast(errorSummary(error), "error");
      }
    };

    const requestPayload = (request: string | ContextSendPayload, selectedContext: HaContextItem[] = []) => (
      typeof request === "string" ? buildContextSendPayload(request, selectedContext) : request
    );

    const sendPrompt = async (sessionId: string, request: string | ContextSendPayload) => {
      const session = chat().chatsById[sessionId];
      if (!session) return;
      const context = chat().contextByChatId[sessionId] || [];
      const outbound = requestPayload(request, context);
      if (!outbound.prompt.trim()) return;
      if (isSessionBusy(session)) {
        chat().enqueueMessage(sessionId, outbound);
        if (shouldClearContextAfterSend("queued")) chat().clearContext(sessionId);
        ui().showToast("Message queued", "info");
        return;
      }
      const attachments = contextAttachmentsFromItems(outbound.context);
      const optimisticMessage: CodexMessage = {
        role: "user",
        content: outbound.prompt,
        created_at: Date.now() / 1000,
        metadata: {
          optimistic: true,
          ...(outbound.metadata || {}),
          ...(attachments.length ? { context: attachments } : {}),
        },
      };
      chat().appendMessage(sessionId, optimisticMessage);
      const currentSession = chat().chatsById[sessionId] || session;
      chat().upsertSession({ ...currentSession, status: "running", updated_at: Date.now() / 1000 });
      try {
        const result = await api.send(sessionId, outbound);
        chat().upsertSession(result.session);
        if (shouldClearContextAfterSend("sent")) chat().clearContext(sessionId);
      } catch (error) {
        ui().showToast(errorSummary(error), "error");
        await loadSessions();
      }
    };

    const answerQuestion = async (sessionId: string, answer: string) => {
      const content = answer.trim();
      if (!content) return;
      chat().clearQuestionDraft(sessionId);
      await sendPrompt(sessionId, `Answer to your question: ${content}`);
    };

    const archiveSession = async (sessionId: string, archived: boolean) => {
      const original = chat().chatsById[sessionId];
      if (!original) return;
      chat().upsertSession({ ...original, archived, archived_at: archived ? Date.now() / 1000 : null, updated_at: Date.now() / 1000 });
      if (!archived) {
        chat().setShowArchived(false);
        chat().setActiveId(sessionId);
      }
      try {
        const result = await api.archive(sessionId, archived);
        if (result.deleted_session_id) {
          chat().deleteSession(result.deleted_session_id);
          ui().showToast("Empty chat removed", "success");
        } else if (result.session) {
          chat().upsertSession(result.session);
          ui().showToast(archived ? "Chat archived" : "Chat restored", "success");
        }
      } catch (error) {
        chat().upsertSession(original);
        ui().showToast(errorSummary(error), "error");
      }
    };

    const startNextQueuedMessage = async (sessionId: string) => {
      const queue = chat().queuesByChatId[sessionId] || [];
      const item = queue[0];
      if (!item || chat().queueStartsByChatId[sessionId]) return;
      chat().setQueueStarting(sessionId, true);
      try {
        const session = chat().chatsById[sessionId];
        const payload = buildContextSendPayload(item.prompt || item.content, item.context || [], {
          runPrompt: item.runPrompt,
          metadata: item.metadata,
          runSettings: item.runSettings,
        });
        const result = session && (isSessionBusy(session) || hasPendingRestart(session))
          ? await api.steer(sessionId, payload)
          : await api.send(sessionId, payload);
        chat().removeQueuedMessage(sessionId, item.id);
        chat().upsertSession(result.session);
        ui().showToast("Started queued message", "success");
      } catch (error) {
        ui().showToast(errorSummary(error), "error");
      } finally {
        chat().setQueueStarting(sessionId, false);
      }
    };

    return {
      loadInitial: async () => {
        await Promise.all([loadSessions(), loadStatus(), loadSettings(), loadAccountStatus()]);
        await loadGitCount();
      },
      loadSessions,
      loadStatus,
      loadAccountStatus,
      loadSettings,
      loadBridgeLog,
      clearBridgeLog,
      loadGitChanges,
      createSession,
      sendPrompt,
      answerQuestion,
      startRename: (sessionId: string) => {
        const session = chat().chatsById[sessionId];
        ui().setRenaming(sessionId, session?.title || "");
      },
      saveRename: async (sessionId: string) => {
        const title = ui().renameTitle.trim();
        if (!title) return;
        const result = await api.rename(sessionId, title);
        ui().setRenaming(null);
        chat().upsertSession(result.session);
        ui().showToast("Chat renamed", "success");
      },
      archiveSession,
      cancelSession: async (sessionId: string) => {
        const result = await api.cancel(sessionId);
        chat().upsertSession(result.session);
        ui().showToast("Run canceled", "success");
      },
      retryContinueSession: async (sessionId: string) => {
        const result = await api.retryContinue(sessionId);
        chat().upsertSession(result.session);
        ui().showToast("Retrying chat", "info");
      },
      editQueuedMessage: (sessionId: string, queueId: string) => {
        const item = (chat().queuesByChatId[sessionId] || []).find((queued) => queued.id === queueId);
        if (!item) return;
        chat().removeQueuedMessage(sessionId, queueId);
        chat().setDraft(sessionId, item.content);
        chat().setContextItems(sessionId, item.context || []);
      },
      clearQueuedMessage: (sessionId: string, queueId: string) => chat().removeQueuedMessage(sessionId, queueId),
      steerQueuedMessage: async (sessionId: string, queueId: string) => {
        const item = (chat().queuesByChatId[sessionId] || []).find((queued) => queued.id === queueId);
        if (!item) return;
        const payload = buildContextSendPayload(item.prompt || item.content, item.context || [], {
          runPrompt: item.runPrompt,
          metadata: item.metadata,
          runSettings: item.runSettings,
        });
        const result = await api.steer(sessionId, payload);
        chat().removeQueuedMessage(sessionId, queueId);
        chat().upsertSession(result.session);
        ui().showToast("Steering queued for this run", "success");
      },
      respondApproval: async (sessionId: string, approvalId: string, approved: boolean, toast?: string) => {
        const result = await api.respondApproval(sessionId, approvalId, approved);
        chat().upsertSession(result.session);
        ui().showToast(toast || (approved ? "Action approved" : "Action canceled"), "success");
      },
      respondRunPlan: async (sessionId: string, planId: string, action: "approve" | "cancel" | "revise") => {
        const session = chat().chatsById[sessionId];
        const revisedPrompt = action === "revise" ? runPlanRevisePrompt(session) : "";
        if (action === "approve" && session) {
          const pendingPlan = session.metadata?.pending_plan;
          chat().upsertSession({
            ...session,
            metadata: {
              ...session.metadata,
              pending_plan: typeof pendingPlan === "object" && pendingPlan !== null
                ? { ...pendingPlan, status: "approved" }
                : pendingPlan,
            },
          });
        }
        try {
          const result = await api.respondRunPlan(sessionId, planId, action);
          chat().upsertSession(result.session);
          if (revisedPrompt) chat().setDraft(sessionId, revisedPrompt);
          ui().showToast(action === "approve" ? "Run plan approved" : action === "revise" ? "Prompt ready to revise" : "Run plan canceled", "success");
        } catch (error) {
          if (action === "approve" && session) chat().upsertSession(session);
          throw error;
        }
      },
      updateSettings: async (settings: Partial<HaCodexSettings>) => {
        ui().setSettingsSaving(true);
        try {
          const result = await api.updateSettings(settings);
          ui().setSettings(normalizeHaCodexSettings(result.settings));
          ui().showToast("Settings saved", "success");
        } finally {
          ui().setSettingsSaving(false);
        }
      },
      updateSessionRunSettings: async (sessionId: string, runSettings: Partial<RunSettings>) => {
        const original = chat().chatsById[sessionId];
        if (!original) return;
        const normalized = normalizeRunSettings(runSettings, ui().settings.defaults);
        const optimisticKey = JSON.stringify(normalized);
        chat().upsertSession({
          ...original,
          metadata: {
            ...(original.metadata || {}),
            run_settings: normalized,
          },
          updated_at: Date.now() / 1000,
        });
        try {
          const result = await api.updateSessionRunSettings(sessionId, normalized);
          if (sessionRunSettingsKey(chat().chatsById[sessionId]) === optimisticKey) {
            chat().upsertSession(result.session);
          }
        } catch (error) {
          if (sessionRunSettingsKey(chat().chatsById[sessionId]) === optimisticKey) {
            chat().upsertSession(original);
          }
          throw error;
        }
      },
      rollbackRun: async (sessionId: string, checkpointId: string) => {
        const result = await api.rollbackRun(sessionId, checkpointId);
        await loadSessions();
        await loadGitChanges(false);
        if (!result.ok) {
          ui().showToast(result.reason || "Rollback needs manual review", "error");
          return;
        }
        ui().showToast("Run rolled back", "success");
      },
      scheduleRestartAfterChats: () => {
        chat().setScheduledRestart(true);
        chat().bumpRestartToast();
        ui().showToast("Restart scheduled after chats complete", "success");
      },
      cancelScheduledRestart: () => {
        chat().setScheduledRestart(false);
        ui().showToast("Scheduled restart canceled", "success");
      },
      maybeRunScheduledRestart: async () => {
        const state = chat();
        if (!state.scheduledRestart) return;
        Object.values(state.chatsById).forEach((session) => {
          if ((state.queuesByChatId[session.id] || []).length && !isSessionBusy(session) && !pendingApprovals(session).length && !hasPendingQuestion(session) && !hasPendingRunPlan(session)) {
            void startNextQueuedMessage(session.id);
          }
        });
        const waiting = Object.values(state.chatsById).some((session) =>
          (state.queuesByChatId[session.id] || []).length || state.queueStartsByChatId[session.id] || isSessionBusy(session) || pendingApprovals(session).length || hasPendingQuestion(session) || hasPendingRunPlan(session),
        );
        if (waiting) return;
        const restart = state.chatsById ? Object.values(state.chatsById).flatMap((session) =>
          (session.approvals || []).filter((approval) => approval.status === "pending" && approval.command === "ha core restart").map((approval) => ({ session, approval })),
        )[0] : null;
        if (!restart) {
          chat().setScheduledRestart(false);
          return;
        }
        chat().setScheduledRestart(false);
        const result = await api.respondApproval(restart.session.id, restart.approval.id, true);
        chat().upsertSession(result.session);
      },
      toggleGitPanel: async () => {
        const next = !ui().gitPanelOpen;
        ui().setGitPanelOpen(next);
        if (next && !ui().gitChanges) await loadGitChanges(false);
      },
      showMoreGitFiles: () => ui().showMoreGitFiles(),
      toggleGitFileDiff: async (path: string, oldPath = "") => {
        const key = gitFileKey(path, oldPath);
        if (ui().openGitDiffKey === key) {
          ui().setOpenGitDiffKey(null);
          return;
        }
        ui().setOpenGitDiffKey(key);
        if (ui().gitFileDiffs[key] || ui().gitFileDiffLoading[key]) return;
        ui().setGitFileDiffLoading(key, true);
        try {
          ui().setGitFileDiff(key, await api.gitFileDiff(path, oldPath));
        } catch (error) {
          ui().setGitFileDiff(key, { ok: false, path, old_path: oldPath, patch: "", stderr: errorSummary(error) } as never);
        } finally {
          ui().setGitFileDiffLoading(key, false);
        }
      },
      commitAndPush: async (message: string) => {
        const commitMessage = message.trim();
        const selected = selectedGitFiles(ui().gitChanges?.files || [], ui().gitSelection);
        if (!commitMessage) {
          ui().showToast("Commit message is required", "error");
          return;
        }
        if (!selected.length) {
          ui().setGitOperationResult({ ok: false, stderr: "No files selected." });
          ui().showToast("Select at least one file", "error");
          return;
        }
        ui().setCommitRunning(true);
        ui().setGitOperationResult(null);
        try {
          const result = await api.commitPush(commitMessage, selected);
          ui().setGitOperationResult(result);
          if (!result.ok) {
            throw new Error(gitOperationFailureMessage(result, "Commit and push failed"));
          }
          ui().setCommitMessage("");
          ui().setGitDiscardConfirming(false);
          ui().showToast("Changes committed and pushed", "success");
          await loadGitChanges(false);
          ui().setGitOperationResult(result);
        } catch (error) {
          if (!ui().gitOperationResult) ui().setGitOperationResult({ ok: false, stderr: errorSummary(error) });
          throw error;
        } finally {
          ui().setCommitRunning(false);
        }
      },
      discardSelectedGitFiles: async () => {
        const selected = selectedGitFiles(ui().gitChanges?.files || [], ui().gitSelection);
        if (!selected.length) {
          ui().setGitOperationResult({ ok: false, stderr: "No files selected." });
          ui().showToast("Select at least one file", "error");
          return;
        }
        ui().setDiscardRunning(true);
        ui().setGitOperationResult(null);
        try {
          const result = await api.discard(selected);
          ui().setGitOperationResult(result);
          if (!result.ok) {
            throw new Error(gitOperationFailureMessage(result, "Discard failed"));
          }
          ui().setGitDiscardConfirming(false);
          ui().showToast("Selected changes discarded", "success");
          await loadGitChanges(false);
          ui().setGitOperationResult(result);
        } catch (error) {
          if (!ui().gitOperationResult) ui().setGitOperationResult({ ok: false, stderr: errorSummary(error) });
          throw error;
        } finally {
          ui().setDiscardRunning(false);
        }
      },
      runValidation: async (sessionId?: string | null) => {
        if (chat().validationRunning) return;
        chat().setValidationRunning(true);
        try {
          const result = await api.runValidation(sessionId);
          chat().setValidation(result.validation);
        } catch (error) {
          chat().setValidation({ status: "failed", stderr: errorSummary(error), created_at: Date.now() / 1000 });
          throw error;
        } finally {
          chat().setValidationRunning(false);
        }
      },
      reloadValidationDomains: async (domains: string[]) => {
        const result = await api.reloadValidationDomains(domains);
        if (!result.ok) throw new Error("Reload failed");
        ui().showToast(`Reloaded ${domains.join(", ")}`, "success");
      },
      startOrRestartBridge: async () => {
        const wasAvailable = (ui().status.runtime as { bridge_available?: boolean } | undefined)?.bridge_available === true;
        ui().setBridgeActionRunning(true);
        try {
          const result = await api.bridgeRestart();
          if (!result?.ok) throw new Error(result?.error || "Bridge helper failed");
          await Promise.all([loadStatus(), loadBridgeLog()]);
          ui().showToast(wasAvailable ? "Bridge restarted" : "Bridge started", "success");
        } catch (error) {
          ui().showToast(errorSummary(error), "error");
        } finally {
          ui().setBridgeActionRunning(false);
        }
      },
      restartHomeAssistant: async () => {
        if (!window.confirm("Restart Home Assistant Core now?")) return;
        ui().setCoreActionRunning(true);
        try {
          const result = await api.coreRestart();
          if (!result?.ok) throw new Error(result?.error || "Home Assistant restart failed");
          ui().showToast("Home Assistant restart requested", "success");
        } finally {
          ui().setCoreActionRunning(false);
        }
      },
      startDeviceLogin: async () => {
        ui().setAccountActionRunning(true);
        try {
          const status = await api.accountDeviceLoginStart();
          ui().setDeviceLogin(status);
          if (status.status === "pending") {
            pollDeviceLogin();
            ui().showToast("Device login started", "info");
          } else if (status.status === "succeeded") {
            await Promise.all([loadAccountStatus(), loadStatus()]);
            ui().showToast("Codex account connected", "success");
          } else if (!status.ok) {
            throw new Error(status.error || "Device login failed");
          }
        } finally {
          ui().setAccountActionRunning(false);
        }
      },
      cancelDeviceLogin: async () => {
        const status = await api.accountDeviceLoginCancel();
        if (deviceLoginPoll !== null) window.clearInterval(deviceLoginPoll);
        deviceLoginPoll = null;
        ui().setDeviceLogin(status);
        ui().showToast("Device login canceled", "success");
      },
      logoutAccount: async () => {
        ui().setAccountActionRunning(true);
        try {
          const result = await api.accountLogout();
          if (!result.ok) throw new Error(result.error || "Logout failed");
          ui().setAccount(result.account || await api.accountStatus());
          ui().setDeviceLogin(null);
          await loadStatus();
          ui().showToast("Codex account logged out", "success");
        } finally {
          ui().setAccountActionRunning(false);
        }
      },
    };
  }, [api]);
}
