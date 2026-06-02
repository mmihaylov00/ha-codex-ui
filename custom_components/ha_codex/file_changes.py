"""Workspace file-change reporting helpers for HA Codex."""

from __future__ import annotations

from pathlib import Path

from .models import ChatMessage

_FILE_CHANGE_EXCLUDED_PARTS = {
    ".cache",
    ".cloud",
    ".git",
    ".git-real",
    ".storage",
    "__pycache__",
    "codex_home",
    "deps",
    "dist",
    "node_modules",
    "tmp",
}
_FILE_CHANGE_EXCLUDED_SUFFIXES = {
    ".db",
    ".db-shm",
    ".db-wal",
    ".log",
    ".pyc",
}
_FILE_CHANGE_EXCLUDED_PATH_SUFFIXES = {
    ("custom_components", "ha_codex", "frontend", "panel.js"),
    ("www", "ha_codex", "panel.js"),
}


class FileChangeMixin:
    """Mixin methods extracted from CodexManager."""

    async def _async_begin_run_tracking(self, session_id: str) -> None:
        """Capture file baselines used for post-run change reporting."""
        restart_snapshot, file_snapshot = await self.hass.async_add_executor_job(
            self._run_tracking_snapshot
        )
        self.restart_baselines[session_id] = restart_snapshot
        self.file_change_baselines[session_id] = file_snapshot

    def _run_tracking_snapshot(
        self,
    ) -> tuple[dict[str, tuple[int, int]], dict[str, tuple[int, int]]]:
        """Return both run-tracking snapshots from a worker thread."""
        return self._restart_watch_snapshot(), self._workspace_file_snapshot()

    async def _async_append_file_change_summary(self, session_id: str) -> list[dict[str, str]]:
        """Append a reliable file-change event based on before/after filesystem state."""
        baseline = self.file_change_baselines.get(session_id)
        if baseline is None:
            return []
        session = self._require_session(session_id)
        after = await self.hass.async_add_executor_job(self._workspace_file_snapshot)
        changes = self._changed_workspace_files(baseline, after)
        if not changes:
            await self._async_complete_active_rollback_checkpoint(session_id, [])
            return []
        displayed = changes[:50]
        content = self._format_file_change_summary(
            displayed, hidden_count=len(changes) - len(displayed)
        )
        rollback = await self._async_complete_active_rollback_checkpoint(session_id, changes)
        metadata = {"kind": "action", "file_changes": displayed}
        if rollback:
            metadata["rollback"] = rollback
        self._append_message(
            session,
            ChatMessage(
                role="event",
                content=content,
                metadata=metadata,
            ),
        )
        return changes

    def _workspace_file_snapshot(self) -> dict[str, tuple[int, int]]:
        """Return mtimes for user-visible workspace files."""
        snapshot: dict[str, tuple[int, int]] = {}
        roots = [Path(self.hass.config.path()), Path(self.workspace_path)]
        seen: set[str] = set()
        for root in roots:
            try:
                key = str(root.resolve(strict=False))
            except OSError:
                key = str(root)
            if key in seen:
                continue
            seen.add(key)
            self._add_workspace_snapshot_root(snapshot, root)
        return snapshot

    def _add_workspace_snapshot_root(
        self,
        snapshot: dict[str, tuple[int, int]],
        root: Path,
    ) -> None:
        if root.is_file():
            if self._is_reportable_workspace_file(root):
                self._add_restart_path(snapshot, root)
            return
        if not root.is_dir():
            return
        for path in root.rglob("*"):
            if path.is_file() and self._is_reportable_workspace_file(path):
                self._add_restart_path(snapshot, path)

    def _is_reportable_workspace_file(self, path: Path) -> bool:
        parts = set(path.parts)
        if parts & _FILE_CHANGE_EXCLUDED_PARTS:
            return False
        if self._has_excluded_path_suffix(path):
            return False
        name = path.name
        return not any(name.endswith(suffix) for suffix in _FILE_CHANGE_EXCLUDED_SUFFIXES)

    def _has_excluded_path_suffix(self, path: Path) -> bool:
        path_parts = path.parts
        return any(
            len(path_parts) >= len(excluded) and path_parts[-len(excluded) :] == excluded
            for excluded in _FILE_CHANGE_EXCLUDED_PATH_SUFFIXES
        )

    def _changed_workspace_files(
        self,
        before: dict[str, tuple[int, int]],
        after: dict[str, tuple[int, int]],
    ) -> list[dict[str, str]]:
        changes: list[dict[str, str]] = []
        for path in sorted(set(before) | set(after)):
            if before.get(path) == after.get(path):
                continue
            if path not in before:
                status = "added"
            elif path not in after:
                status = "deleted"
            else:
                status = "modified"
            changes.append({"status": status, "path": self._display_workspace_change_path(path)})
        return changes

    def _display_workspace_change_path(self, path: str) -> str:
        """Return a diff-endpoint-friendly display path for a changed workspace file."""
        file_path = Path(path)
        for root in (Path(self.hass.config.path()), Path(self.workspace_path)):
            try:
                return str(file_path.relative_to(root)).replace("\\", "/")
            except ValueError:
                continue
        return path

    def _format_file_change_summary(
        self,
        changes: list[dict[str, str]],
        *,
        hidden_count: int = 0,
    ) -> str:
        lines = ["File changes:"]
        for change in changes:
            lines.append(f"- {change.get('status', 'changed')} `{change.get('path', '')}`")
        if hidden_count > 0:
            lines.append(f"- {hidden_count} more files changed")
        return "\n".join(lines)
