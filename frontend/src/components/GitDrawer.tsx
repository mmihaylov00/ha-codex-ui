import { useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import { Icon } from "./Icon";
import { useUiStore } from "../stores/uiStore";
import {
  fileStatusIcon,
  gitFileKey,
  gitReviewActionDisabled,
  groupGitFiles,
  parsePatchLines,
  reviewableGitFileCount,
  reviewableGitFiles,
  selectedGitFileCount,
  splitGitPath,
} from "../features/git/gitUtils";
import { stripAnsi } from "../utils/format";
import type { GitFile } from "../types/ha";

type GitListItem = { type: "folder"; folder: string } | { type: "file"; file: GitFile };
type DiffLine = ReturnType<typeof parsePatchLines>[number];

const DIFF_VIRTUAL_LINE_THRESHOLD = 180;
const EMPTY_GIT_FILES: GitFile[] = [];

interface GitDrawerProps {
  open?: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onLoadMore: () => void;
  onToggleFile: (path: string, oldPath?: string) => void;
  onCommit: (message: string) => void;
  onDiscard: () => void;
}

export function GitDrawer(props: GitDrawerProps) {
  const gitChangedCount = useUiStore((state) => state.gitChanges?.files ? reviewableGitFileCount(state.gitChanges.files) : state.gitChangedCount);
  const gitSelectedCount = useUiStore((state) => state.gitChanges?.files ? selectedGitFileCount(state.gitChanges.files, state.gitSelection) : 0);
  return (
    <aside className="drawer" aria-hidden={props.open === false ? "true" : "false"}>
      <header className="drawer-header">
        <div><h2>Git</h2><span>{gitChangedCount} changed {gitChangedCount === 1 ? "file" : "files"} · {gitSelectedCount} selected</span></div>
        <div className="drawer-actions">
          <button className="icon-button" onClick={props.onRefresh} title="Refresh changes" aria-label="Refresh changes"><Icon icon="mdi:refresh" /></button>
          <button className="icon-button" onClick={props.onClose} title="Close Git panel" aria-label="Close Git panel"><Icon icon="mdi:close" /></button>
        </div>
      </header>
      <div className="drawer-body git-review"><GitChanges {...props} /></div>
      <CommitBox onCommit={props.onCommit} onDiscard={props.onDiscard} />
    </aside>
  );
}

function GitChanges({ onToggleFile }: GitDrawerProps) {
  const gitLoading = useUiStore((state) => state.gitLoading);
  const gitChanges = useUiStore((state) => state.gitChanges);
  const sourceFiles = gitChanges?.files || EMPTY_GIT_FILES;
  const files = useMemo(() => reviewableGitFiles(sourceFiles), [sourceFiles]);
  const items = useMemo<GitListItem[]>(() => groupGitFiles(files).flatMap((group) => [
    { type: "folder" as const, folder: group.folder },
    ...group.files.map((file) => ({ type: "file" as const, file })),
  ]), [files]);
  if (gitLoading && !gitChanges) return <div className="loading-state">Loading Git changes...</div>;
  if (gitChanges && gitChanges.ok === false && !gitChanges.files?.length) {
    return <div className="loading-state error">{stripAnsi(gitChanges.stderr || "Git reload failed.")}</div>;
  }
  if (!files.length) return <p className="muted pad">{gitLoading ? "Refreshing changes..." : "No changed files."}</p>;
  return (
    <Virtuoso
      className="git-virtual-list"
      data={items}
      itemContent={(_, item) => item.type === "folder"
        ? <h3 className="git-folder-heading" title={item.folder}>{item.folder}</h3>
        : <DiffFile file={item.file} onToggleFile={onToggleFile} key={gitFileKey(item.file.path, item.file.old_path || "")} />}
    />
  );
}

export function DiffFile({
  file,
  onToggleFile,
  open,
  diff,
  loading = false,
  selectable = true,
  displayPath = "name",
}: {
  file: GitFile;
  onToggleFile: (path: string, oldPath?: string) => void;
  open?: boolean;
  diff?: GitFile | null;
  loading?: boolean;
  selectable?: boolean;
  displayPath?: "name" | "path";
}) {
  const key = gitFileKey(file.path, file.old_path || "");
  const storeOpen = useUiStore((state) => state.openGitDiffKey === key);
  const storeDiff = useUiStore((state) => state.gitFileDiffs[key] || (file.patch ? file : null));
  const storeLoading = useUiStore((state) => state.gitFileDiffLoading[key]);
  const resolvedOpen = open ?? storeOpen;
  const resolvedDiff = diff === undefined ? storeDiff : diff;
  const resolvedLoading = loading || (open === undefined && Boolean(storeLoading));
  const lines = useMemo(() => parsePatchLines(resolvedDiff?.patch || ""), [resolvedDiff?.patch]);
  const displayName = displayPath === "path" ? file.path : file.display_name || splitGitPath(file.path).name;
  const showLineStats = file.status !== "deleted";
  const status = String(file.status || "changed").toLowerCase();
  return (
    <section className={`diff-file ${resolvedOpen ? "open" : ""}`} data-diff-key={key}>
      <div className={`diff-card ${showLineStats ? "" : "no-line-stats"} ${selectable ? "" : "no-select"}`} onClick={() => onToggleFile(file.path, file.old_path || "")} role="button" tabIndex={0} title={file.path} onKeyDown={(event) => {
        if (event.target instanceof HTMLInputElement) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggleFile(file.path, file.old_path || "");
        }
      }}>
        {selectable ? <GitFileSelect file={file} displayName={displayName} /> : null}
        <span className="diff-file-main">
          <strong>{displayName}</strong>
          {file.old_path ? <span>{file.old_path} -&gt; {file.path}</span> : null}
        </span>
        {showLineStats ? <span className="line-stats"><LineStat value={file.added_lines} type="added" /><LineStat value={file.deleted_lines} type="deleted" /></span> : null}
        <b className={`file-status ${status}`}><Icon icon={fileStatusIcon(status)} /></b>
        <span className="diff-open-action"><Icon icon={resolvedOpen ? "mdi:chevron-up" : "mdi:chevron-down"} /><span>{resolvedOpen ? "Hide" : "Diff"}</span></span>
      </div>
      {resolvedOpen ? (
        <>
          <DiffLines loading={Boolean(resolvedLoading)} lines={lines} />
          {resolvedDiff?.stderr || resolvedDiff?.patch_error ? <pre className="diff-error">{stripAnsi(resolvedDiff.stderr || resolvedDiff.patch_error || "").trim()}</pre> : null}
        </>
      ) : null}
    </section>
  );
}

function GitFileSelect({ file, displayName }: { file: GitFile; displayName: string }) {
  const key = gitFileKey(file.path, file.old_path || "");
  const selected = useUiStore((state) => state.gitSelection[key] === true);
  const setSelected = useUiStore((state) => state.setGitFileSelected);
  return (
    <label className="git-file-select" title={selected ? "Deselect file" : "Select file"} onClick={(event) => event.stopPropagation()}>
      <input
        type="checkbox"
        checked={selected}
        aria-label={`Select ${displayName}`}
        onChange={(event) => setSelected(file, event.currentTarget.checked)}
      />
    </label>
  );
}

function DiffLines({ loading, lines }: { loading: boolean; lines: DiffLine[] }) {
  if (loading) return <div className="diff-lines"><div className="diff-empty">Loading diff...</div></div>;
  if (!lines.length) return <div className="diff-lines"><div className="diff-empty">No textual diff available.</div></div>;
  if (lines.length >= DIFF_VIRTUAL_LINE_THRESHOLD) {
    return (
      <div className="diff-lines virtualized">
        <Virtuoso
          data={lines}
          itemContent={(index, line) => <DiffLineRow line={line} key={index} />}
        />
      </div>
    );
  }
  return (
    <div className="diff-lines">
      {lines.map((line, index) => <DiffLineRow line={line} key={index} />)}
    </div>
  );
}

function DiffLineRow({ line }: { line: DiffLine }) {
  return (
    <div className={`diff-line ${line.type}`}>
      <span className="marker">{line.type === "added" ? "+" : line.type === "deleted" ? "-" : line.type === "hunk" ? "@" : ""}</span>
      <code>{line.content}</code>
    </div>
  );
}

function LineStat({ value, type }: { value?: number | null; type: "added" | "deleted" }) {
  if (value === null || value === undefined) return <span className={type}>--</span>;
  return <span className={type}>{type === "added" ? "+" : "-"}{Number(value)}</span>;
}

function CommitBox({ onCommit, onDiscard }: { onCommit: (message: string) => void; onDiscard: () => void }) {
  const message = useUiStore((state) => state.commitMessage);
  const setMessage = useUiStore((state) => state.setCommitMessage);
  const running = useUiStore((state) => state.commitRunning);
  const discardRunning = useUiStore((state) => state.discardRunning);
  const confirmingDiscard = useUiStore((state) => state.gitDiscardConfirming);
  const setConfirmingDiscard = useUiStore((state) => state.setGitDiscardConfirming);
  const files = useUiStore((state) => state.gitChanges?.files || EMPTY_GIT_FILES);
  const selection = useUiStore((state) => state.gitSelection);
  const selectedCount = selectedGitFileCount(files, selection);
  const commitDisabled = gitReviewActionDisabled(files, selection, running);
  const discardDisabled = gitReviewActionDisabled(files, selection, running || discardRunning);
  return (
    <form className="commit-box" onSubmit={(event) => {
      event.preventDefault();
      onCommit(message);
    }}>
      <textarea name="commit-message" placeholder="Commit message" rows={1} disabled={running} value={message} onChange={(event) => setMessage(event.target.value)} />
      <div className="git-action-row">
        <button type="submit" disabled={commitDisabled}><Icon icon={running ? "mdi:progress-clock" : "mdi:source-commit"} /><span>{running ? "Pushing..." : "Commit & Push"}</span></button>
        <button type="button" className="danger" disabled={discardDisabled} onClick={() => setConfirmingDiscard(true)}><Icon icon="mdi:trash-can-outline" /><span>Discard selected</span></button>
      </div>
      {confirmingDiscard && selectedCount ? (
        <div className="discard-confirm">
          <span>Discard {selectedCount} selected {selectedCount === 1 ? "file" : "files"}?</span>
          <button type="button" className="danger" disabled={discardRunning} onClick={onDiscard}><Icon icon={discardRunning ? "mdi:progress-clock" : "mdi:check"} /><span>{discardRunning ? "Discarding..." : "Confirm discard"}</span></button>
          <button type="button" className="ghost" disabled={discardRunning} onClick={() => setConfirmingDiscard(false)}>Cancel</button>
        </div>
      ) : null}
      <GitOperationResult />
    </form>
  );
}

function GitOperationResult() {
  const result = useUiStore((state) => state.gitOperationResult);
  if (!result) return null;
  const paths = result.discarded_paths || result.selected_paths || [];
  const output = stripAnsi([
    result.stdout,
    result.stderr,
    ...(result.results || []).flatMap((item) => [item.stdout, item.stderr]),
  ].filter(Boolean).join("\n")).trim();
  const title = result.ok
    ? result.step === "discard" ? "Discarded selected files" : "Commit pushed"
    : `${result.step || "Git operation"} failed`;
  return (
    <section className={`git-operation-result ${result.ok ? "success" : "error"}`}>
      <strong>{title}</strong>
      {paths.length ? <span>{summarizePaths(paths)}</span> : null}
      {output ? <pre>{output}</pre> : null}
    </section>
  );
}

function summarizePaths(paths: string[]): string {
  const shown = paths.slice(0, 4).join(", ");
  const remaining = paths.length - 4;
  return remaining > 0 ? `${shown} and ${remaining} more` : shown;
}
