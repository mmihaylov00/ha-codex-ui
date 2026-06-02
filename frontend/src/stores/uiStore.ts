import { create } from "zustand";
import { defaultGitSelection, gitFileKey, toggleGitSelection } from "../features/git/gitUtils";
import { defaultHaCodexSettings } from "../features/settings/runtimeSettingsUtils";
import type { BridgeLog, CodexAccountStatus, CodexDeviceLoginStatus, GitChanges, GitFile, GitSetupResult, GitSetupStatus, HaCodexSettings } from "../types/ha";
import type { GitSelection } from "../features/git/gitUtils";
import type { DebugTab, SettingsTab, Toast } from "../types/ui";

export type GitSetupRunningAction = "key" | "remote" | "pull" | "branch" | `restore:${string}` | null;

interface UiStore {
  status: Record<string, unknown>;
  bridgeLog: BridgeLog | null;
  bridgeLogLoading: boolean;
  bridgeActionRunning: boolean;
  coreActionRunning: boolean;
  archiveCleanupRunning: boolean;
  account: CodexAccountStatus | null;
  accountLoading: boolean;
  accountActionRunning: boolean;
  deviceLogin: CodexDeviceLoginStatus | null;
  showStatusDebug: boolean;
  statusDebugTab: DebugTab;
  settings: HaCodexSettings;
  settingsLoading: boolean;
  settingsSaving: boolean;
  settingsTab: SettingsTab;
  gitPanelOpen: boolean;
  gitSetupStatus: GitSetupStatus | null;
  gitSetupLoading: boolean;
  gitSetupActionRunning: boolean;
  gitSetupRunningAction: GitSetupRunningAction;
  gitSetupResult: GitSetupResult | null;
  gitChanges: GitChanges | null;
  gitChangedCount: number;
  gitLoading: boolean;
  openGitDiffKey: string | null;
  gitFileDiffs: Record<string, GitFile>;
  gitFileDiffLoading: Record<string, boolean>;
  gitSelection: GitSelection;
  gitOperationResult: GitChanges | null;
  gitDiscardConfirming: boolean;
  gitVisibleLimit: number;
  gitPageSize: number;
  commitMessage: string;
  commitRunning: boolean;
  discardRunning: boolean;
  renamingId: string | null;
  renameTitle: string;
  toasts: Toast[];
  toastId: number;
  setStatus: (status: Record<string, unknown>) => void;
  setBridgeLog: (bridgeLog: BridgeLog | null) => void;
  setBridgeLogLoading: (loading: boolean) => void;
  setBridgeActionRunning: (running: boolean) => void;
  setCoreActionRunning: (running: boolean) => void;
  setArchiveCleanupRunning: (running: boolean) => void;
  setAccount: (account: CodexAccountStatus | null) => void;
  setAccountLoading: (loading: boolean) => void;
  setAccountActionRunning: (running: boolean) => void;
  setDeviceLogin: (deviceLogin: CodexDeviceLoginStatus | null) => void;
  setShowStatusDebug: (show: boolean) => void;
  setStatusDebugTab: (tab: DebugTab) => void;
  setSettings: (settings: HaCodexSettings) => void;
  setSettingsLoading: (loading: boolean) => void;
  setSettingsSaving: (saving: boolean) => void;
  setSettingsTab: (tab: SettingsTab) => void;
  setGitPanelOpen: (open: boolean) => void;
  setGitSetupStatus: (status: GitSetupStatus | null) => void;
  setGitSetupLoading: (loading: boolean) => void;
  setGitSetupActionRunning: (running: boolean, action?: GitSetupRunningAction) => void;
  setGitSetupResult: (result: GitSetupResult | null) => void;
  setGitChanges: (changes: GitChanges | null) => void;
  setGitChangedCount: (count: number) => void;
  setGitLoading: (loading: boolean) => void;
  setOpenGitDiffKey: (key: string | null) => void;
  setGitFileDiff: (key: string, diff: GitFile) => void;
  setGitFileDiffLoading: (key: string, loading: boolean) => void;
  toggleGitFileSelected: (file: GitFile) => void;
  setGitFileSelected: (file: GitFile, selected: boolean) => void;
  setGitOperationResult: (result: GitChanges | null) => void;
  setGitDiscardConfirming: (confirming: boolean) => void;
  showMoreGitFiles: () => void;
  setCommitMessage: (message: string) => void;
  setCommitRunning: (running: boolean) => void;
  setDiscardRunning: (running: boolean) => void;
  setRenaming: (id: string | null, title?: string) => void;
  showToast: (message: string, tone?: Toast["tone"]) => void;
  removeToast: (id: number) => void;
}

export const useUiStore = create<UiStore>((set, get) => ({
  status: {},
  bridgeLog: null,
  bridgeLogLoading: false,
  bridgeActionRunning: false,
  coreActionRunning: false,
  archiveCleanupRunning: false,
  account: null,
  accountLoading: false,
  accountActionRunning: false,
  deviceLogin: null,
  showStatusDebug: false,
  statusDebugTab: "status",
  settings: defaultHaCodexSettings(),
  settingsLoading: false,
  settingsSaving: false,
  settingsTab: "run",
  gitPanelOpen: false,
  gitSetupStatus: null,
  gitSetupLoading: false,
  gitSetupActionRunning: false,
  gitSetupRunningAction: null,
  gitSetupResult: null,
  gitChanges: null,
  gitChangedCount: 0,
  gitLoading: false,
  openGitDiffKey: null,
  gitFileDiffs: {},
  gitFileDiffLoading: {},
  gitSelection: {},
  gitOperationResult: null,
  gitDiscardConfirming: false,
  gitVisibleLimit: 40,
  gitPageSize: 40,
  commitMessage: "",
  commitRunning: false,
  discardRunning: false,
  renamingId: null,
  renameTitle: "",
  toasts: [],
  toastId: 0,
  setStatus: (status) => set({ status }),
  setBridgeLog: (bridgeLog) => set({ bridgeLog }),
  setBridgeLogLoading: (bridgeLogLoading) => set({ bridgeLogLoading }),
  setBridgeActionRunning: (bridgeActionRunning) => set({ bridgeActionRunning }),
  setCoreActionRunning: (coreActionRunning) => set({ coreActionRunning }),
  setArchiveCleanupRunning: (archiveCleanupRunning) => set({ archiveCleanupRunning }),
  setAccount: (account) => set({ account }),
  setAccountLoading: (accountLoading) => set({ accountLoading }),
  setAccountActionRunning: (accountActionRunning) => set({ accountActionRunning }),
  setDeviceLogin: (deviceLogin) => set({ deviceLogin }),
  setShowStatusDebug: (showStatusDebug) => set({ showStatusDebug }),
  setStatusDebugTab: (statusDebugTab) => set({ statusDebugTab }),
  setSettings: (settings) => set({ settings }),
  setSettingsLoading: (settingsLoading) => set({ settingsLoading }),
  setSettingsSaving: (settingsSaving) => set({ settingsSaving }),
  setSettingsTab: (settingsTab) => set({ settingsTab }),
  setGitPanelOpen: (gitPanelOpen) => set({ gitPanelOpen }),
  setGitSetupStatus: (gitSetupStatus) => set({ gitSetupStatus }),
  setGitSetupLoading: (gitSetupLoading) => set({ gitSetupLoading }),
  setGitSetupActionRunning: (gitSetupActionRunning, gitSetupRunningAction = null) => set({
    gitSetupActionRunning,
    gitSetupRunningAction: gitSetupActionRunning ? gitSetupRunningAction : null,
  }),
  setGitSetupResult: (gitSetupResult) => set({ gitSetupResult }),
  setGitChanges: (gitChanges) => set({ gitChanges, gitSelection: defaultGitSelection(gitChanges?.files || []), gitVisibleLimit: get().gitPageSize }),
  setGitChangedCount: (gitChangedCount) => set({ gitChangedCount }),
  setGitLoading: (gitLoading) => set({ gitLoading }),
  setOpenGitDiffKey: (openGitDiffKey) => set({ openGitDiffKey }),
  setGitFileDiff: (key, diff) => set((state) => ({ gitFileDiffs: { ...state.gitFileDiffs, [key]: diff } })),
  setGitFileDiffLoading: (key, loading) => set((state) => ({ gitFileDiffLoading: { ...state.gitFileDiffLoading, [key]: loading } })),
  toggleGitFileSelected: (file) => set((state) => ({ gitSelection: toggleGitSelection(file, state.gitSelection), gitDiscardConfirming: false })),
  setGitFileSelected: (file, selected) => set((state) => {
    const key = gitFileKey(file.path, file.old_path || "");
    if (selected) return { gitSelection: { ...state.gitSelection, [key]: true }, gitDiscardConfirming: false };
    const { [key]: _removed, ...rest } = state.gitSelection;
    return { gitSelection: rest, gitDiscardConfirming: false };
  }),
  setGitOperationResult: (gitOperationResult) => set({ gitOperationResult }),
  setGitDiscardConfirming: (gitDiscardConfirming) => set({ gitDiscardConfirming }),
  showMoreGitFiles: () => set((state) => ({ gitVisibleLimit: state.gitVisibleLimit + state.gitPageSize })),
  setCommitMessage: (commitMessage) => set({ commitMessage }),
  setCommitRunning: (commitRunning) => set({ commitRunning }),
  setDiscardRunning: (discardRunning) => set({ discardRunning }),
  setRenaming: (renamingId, renameTitle = "") => set({ renamingId, renameTitle }),
  showToast: (message, tone = "info") => {
    const id = get().toastId + 1;
    set((state) => ({
      toastId: id,
      toasts: [...state.toasts, { id, message, tone, entering: true, exiting: false }].slice(-4),
    }));
    window.setTimeout(() => {
      set((state) => ({ toasts: state.toasts.map((toast) => (toast.id === id ? { ...toast, entering: false } : toast)) }));
    }, 280);
    window.setTimeout(() => {
      set((state) => ({ toasts: state.toasts.map((toast) => (toast.id === id ? { ...toast, exiting: true } : toast)) }));
    }, 3900);
    window.setTimeout(() => get().removeToast(id), 4200);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
