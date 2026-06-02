import type { GitFile, GitSetupStatus } from "../../types/ha";

export type GitSelection = Record<string, true>;

export function gitStatusLabel(code: string): string {
  if (code.trim() === "??") return "untracked";
  if (code.includes("D") && !/[MARCA]/.test(code)) return "deleted";
  if (code.includes("A")) return "added";
  if (code.includes("R")) return "renamed";
  if (code.includes("C")) return "copied";
  if (code.includes("M")) return "modified";
  return "changed";
}

export function gitFileKey(path: string, oldPath = ""): string {
  return `${oldPath || ""}\n${path || ""}`;
}

export function splitGitPath(path: string): { folder: string; name: string } {
  const value = String(path || "");
  const index = value.lastIndexOf("/");
  if (index === -1) return { folder: ".", name: value };
  return { folder: value.slice(0, index), name: value.slice(index + 1) };
}

export function groupGitFiles(files: GitFile[]) {
  const groups = new Map<string, GitFile[]>();
  files.forEach((file) => {
    const { folder, name } = splitGitPath(file.path);
    const normalized = folder || ".";
    if (!groups.has(normalized)) groups.set(normalized, []);
    groups.get(normalized)?.push({ ...file, display_name: name });
  });
  return [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([folder, groupFiles]) => ({
      folder,
      files: groupFiles.sort((left, right) => String(left.display_name || left.path).localeCompare(String(right.display_name || right.path))),
    }));
}

export function reviewableGitFiles(files: GitFile[] = []): GitFile[] {
  return files;
}

export function reviewableGitFileCount(files: GitFile[] = []): number {
  return reviewableGitFiles(files).length;
}

export function defaultGitSelection(files: GitFile[] = []): GitSelection {
  return Object.fromEntries(reviewableGitFiles(files).map((file) => [gitFileKey(file.path, file.old_path || ""), true]));
}

export function selectedGitFiles(files: GitFile[] = [], selection: GitSelection = {}): GitFile[] {
  return reviewableGitFiles(files).filter((file) => selection[gitFileKey(file.path, file.old_path || "")]);
}

export function selectedGitFileCount(files: GitFile[] = [], selection: GitSelection = {}): number {
  return selectedGitFiles(files, selection).length;
}

export function toggleGitSelection(file: GitFile, selection: GitSelection = {}): GitSelection {
  const key = gitFileKey(file.path, file.old_path || "");
  if (selection[key]) {
    const { [key]: _removed, ...rest } = selection;
    return rest;
  }
  return { ...selection, [key]: true };
}

export function gitReviewActionDisabled(files: GitFile[] = [], selection: GitSelection = {}, running = false): boolean {
  return running || selectedGitFileCount(files, selection) === 0;
}

export function isGitSetupReady(status: GitSetupStatus | null | undefined): boolean {
  return status?.setup_complete === true;
}

export function gitSetupMissingItems(status: GitSetupStatus | null | undefined): string[] {
  if (!status) return ["setup status"];
  return status.missing?.length ? status.missing : [];
}

export function isGitSetupStatusLoadError(status: GitSetupStatus | null | undefined): boolean {
  return Boolean(status?.missing?.includes("setup status"));
}

export function gitSetupSummary(status: GitSetupStatus | null | undefined, loading = false): { tone: "checking" | "success" | "warning"; title: string; detail: string } {
  if (!status || loading) {
    return {
      tone: "checking",
      title: "Checking Git setup...",
      detail: "Loading setup status...",
    };
  }
  if (isGitSetupReady(status)) {
    return {
      tone: "success",
      title: "Git integration ready",
      detail: "Review, commit, and push controls are enabled.",
    };
  }
  const missing = gitSetupMissingItems(status);
  return {
    tone: "warning",
    title: "Git setup incomplete",
    detail: `Missing: ${missing.join(", ") || "setup status"}`,
  };
}

export function parsePatchLines(patch: string) {
  return String(patch || "")
    .split("\n")
    .filter((line) => !line.startsWith("diff --git "))
    .filter((line) => !line.startsWith("index "))
    .filter((line) => !line.startsWith("new file mode "))
    .filter((line) => !line.startsWith("deleted file mode "))
    .map((line) => {
      if (line.startsWith("@@")) return { type: "hunk", content: line };
      if (line.startsWith("+") && !line.startsWith("+++")) return { type: "added", content: line };
      if (line.startsWith("-") && !line.startsWith("---")) return { type: "deleted", content: line };
      if (line.startsWith("+++") || line.startsWith("---")) return { type: "meta", content: line };
      return { type: "context", content: line };
    });
}

export function fileStatusIcon(status?: string): string {
  const value = String(status || "changed").toLowerCase();
  if (value === "added" || value === "untracked") return "mdi:file-plus-outline";
  if (value === "modified") return "mdi:file-edit-outline";
  if (value === "deleted") return "mdi:file-remove-outline";
  if (value === "renamed") return "mdi:file-move-outline";
  if (value === "copied") return "mdi:file-multiple-outline";
  return "mdi:file-outline";
}
