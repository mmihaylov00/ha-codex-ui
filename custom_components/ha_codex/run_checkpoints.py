"""Rollback checkpoint helpers for HA Codex runs."""

from __future__ import annotations

import base64
import hashlib
from typing import Any
from uuid import uuid4

from .models import ChatMessage, utc_timestamp

_CHECKPOINTS_KEY = "rollback_checkpoints"
_MAX_SNAPSHOT_BYTES = 1_000_000


class RunCheckpointMixin:
    """Create and apply tightly scoped rollback checkpoints."""

    async def _async_create_rollback_checkpoint(
        self,
        session_id: str,
        run_id: str,
    ) -> dict[str, Any]:
        """Record Git state and pre-run dirty-file snapshots."""
        session = self._require_session(session_id)
        head_result = await self._run_command(
            self._git_command(["rev-parse", "HEAD"]),
            cwd=None,
            timeout=120,
        )
        status_result = await self._run_command(
            self._git_command(
                [
                    "-c",
                    "status.relativePaths=false",
                    "status",
                    "--porcelain=v1",
                    "-uall",
                ]
            ),
            cwd=None,
            timeout=120,
        )
        dirty_files = []
        if status_result["ok"]:
            dirty_files = sorted(
                {
                    file_change["path"]
                    for file_change in self._display_git_files(
                        self._parse_git_status(status_result["stdout"])
                    )
                }
            )
        snapshots = {
            path: await self.hass.async_add_executor_job(
                self._file_snapshot_for_rollback,
                path,
                True,
            )
            for path in dirty_files
        }
        checkpoint = {
            "id": str(uuid4()),
            "run_id": run_id,
            "session_id": session_id,
            "created_at": utc_timestamp(),
            "head": head_result["stdout"].strip() if head_result["ok"] else None,
            "git_available": bool(head_result["ok"] and status_result["ok"]),
            "dirty_files": dirty_files,
            "snapshots": snapshots,
            "targets": [],
            "status": "created",
            "rollback_status": "pending",
        }
        self._session_checkpoints(session).append(checkpoint)
        self.active_run_checkpoints[session_id] = checkpoint["id"]
        session.touch()
        await self.async_save()
        return checkpoint

    async def _async_complete_active_rollback_checkpoint(
        self,
        session_id: str,
        changes: list[dict[str, str]],
    ) -> dict[str, Any] | None:
        """Complete the active checkpoint for a run, if one exists."""
        checkpoint_id = self.active_run_checkpoints.get(session_id)
        if not checkpoint_id:
            return None
        return await self._async_complete_rollback_checkpoint(session_id, checkpoint_id, changes)

    async def _async_complete_rollback_checkpoint(
        self,
        session_id: str,
        checkpoint_id: str,
        changes: list[dict[str, str]],
    ) -> dict[str, Any]:
        """Record after-run fingerprints for files changed by this run."""
        session = self._require_session(session_id)
        checkpoint = self._find_checkpoint(session, checkpoint_id)
        targets = []
        for change in changes:
            path = self._rollback_display_path(str(change.get("path", "")))
            if not path or not self._is_visible_git_path(path):
                continue
            before = checkpoint.get("snapshots", {}).get(path)
            if before is None:
                before = await self._async_head_snapshot_for_rollback(checkpoint, path)
            after = await self.hass.async_add_executor_job(
                self._file_snapshot_for_rollback,
                path,
                False,
            )
            targets.append(
                {
                    "path": path,
                    "status": str(change.get("status") or "changed"),
                    "before": before,
                    "after": after,
                }
            )
        checkpoint["targets"] = targets
        checkpoint["changed_files"] = [target["path"] for target in targets]
        checkpoint["completed_at"] = utc_timestamp()
        checkpoint["status"] = "completed"
        checkpoint["rollback_status"] = "available" if targets else "unavailable"
        session.touch()
        await self.async_save()
        return self._rollback_summary(checkpoint)

    async def async_rollback_run(self, session_id: str, checkpoint_id: str) -> dict[str, Any]:
        """Rollback files changed by one completed run if they are unchanged since completion."""
        session = self._require_session(session_id)
        checkpoint = self._find_checkpoint(session, checkpoint_id)
        targets = list(checkpoint.get("targets") or [])
        if checkpoint.get("status") != "completed" or not targets:
            reason = "Rollback is not available for this run. Review the changes manually in the Git drawer."
            self._mark_checkpoint_blocked(session, checkpoint, reason)
            await self.async_save()
            self._fire_session_updated(session)
            return {"ok": False, "reason": reason, "checkpoint": self._rollback_summary(checkpoint)}

        unsafe = await self._async_unsafe_rollback_targets(targets)
        if unsafe:
            reason = (
                "Rollback cannot be performed safely because "
                f"{', '.join(unsafe[:5])} changed after the run completed. "
                "Review the changes manually in the Git drawer."
            )
            self._mark_checkpoint_blocked(session, checkpoint, reason)
            self._append_message(
                session,
                ChatMessage(
                    role="event",
                    content=reason,
                    metadata={"kind": "rollback", "rollback": self._rollback_summary(checkpoint)},
                ),
            )
            session.touch()
            await self.async_save()
            self._fire_session_updated(session)
            return {"ok": False, "reason": reason, "checkpoint": self._rollback_summary(checkpoint)}

        for target in targets:
            await self.hass.async_add_executor_job(
                self._restore_rollback_target,
                target["path"],
                target.get("before") or {"state": "absent"},
            )

        checkpoint["rollback_status"] = "rolled_back"
        checkpoint["rolled_back_at"] = utc_timestamp()
        checkpoint.pop("rollback_reason", None)
        self._update_rollback_message_metadata(session, checkpoint)
        self._append_message(
            session,
            ChatMessage(
                role="event",
                content=(
                    "Rollback complete for this run. Home Assistant validation "
                    "will run again when available."
                ),
                metadata={"kind": "rollback", "rollback": self._rollback_summary(checkpoint)},
            ),
        )
        session.touch()
        await self.async_save()
        await self.async_validate(session_id)
        self._fire_session_updated(session)
        return {"ok": True, "checkpoint": self._rollback_summary(checkpoint)}

    async def _async_unsafe_rollback_targets(self, targets: list[dict[str, Any]]) -> list[str]:
        unsafe: list[str] = []
        for target in targets:
            current = await self.hass.async_add_executor_job(
                self._file_snapshot_for_rollback,
                target["path"],
                False,
            )
            if not self._rollback_snapshots_match(current, target.get("after") or {}):
                unsafe.append(target["path"])
        return unsafe

    async def _async_head_snapshot_for_rollback(
        self,
        checkpoint: dict[str, Any],
        path: str,
    ) -> dict[str, Any]:
        head = checkpoint.get("head")
        if not head:
            return {"state": "absent"}
        for git_path in self._rollback_head_path_candidates(path):
            result = await self._run_command(
                self._git_command(["show", f"{head}:{git_path}"]),
                cwd=None,
                timeout=120,
            )
            if result["ok"]:
                raw = result["stdout"].encode("utf-8")
                return self._bytes_snapshot(raw, include_content=True)
        return {"state": "absent"}

    def _session_checkpoints(self, session: Any) -> list[dict[str, Any]]:
        checkpoints = session.metadata.get(_CHECKPOINTS_KEY)
        if not isinstance(checkpoints, list):
            checkpoints = []
            session.metadata[_CHECKPOINTS_KEY] = checkpoints
        return checkpoints

    def _find_checkpoint(self, session: Any, checkpoint_id: str) -> dict[str, Any]:
        for checkpoint in self._session_checkpoints(session):
            if checkpoint.get("id") == checkpoint_id:
                return checkpoint
        raise ValueError(f"Unknown rollback checkpoint {checkpoint_id}")

    def _rollback_display_path(self, path: str) -> str:
        return self._display_workspace_change_path(self._normalize_git_status_path(path))

    def _rollback_head_path_candidates(self, path: str) -> list[str]:
        normalized = self._normalize_git_status_path(path)
        candidates = [normalized]
        if not normalized.startswith("homeassistant/"):
            candidates.append(f"homeassistant/{normalized}")
        if not normalized.startswith("config/"):
            candidates.append(f"config/{normalized}")
        return list(dict.fromkeys(candidates))

    def _file_snapshot_for_rollback(
        self,
        path: str,
        include_content: bool,
    ) -> dict[str, Any]:
        file_path = self._worktree_file_for_diff(path)
        if not file_path.exists():
            return {"state": "absent"}
        try:
            raw = file_path.read_bytes()
        except OSError as err:
            return {"state": "error", "error": str(err)}
        return self._bytes_snapshot(raw, include_content=include_content)

    def _bytes_snapshot(self, raw: bytes, *, include_content: bool) -> dict[str, Any]:
        snapshot: dict[str, Any] = {
            "state": "file",
            "sha256": hashlib.sha256(raw).hexdigest(),
            "size": len(raw),
        }
        if include_content:
            if len(raw) > _MAX_SNAPSHOT_BYTES:
                snapshot["state"] = "too_large"
                snapshot["error"] = f"File is larger than {_MAX_SNAPSHOT_BYTES} bytes"
                return snapshot
            try:
                snapshot["content"] = raw.decode("utf-8")
                snapshot["encoding"] = "utf-8"
            except UnicodeDecodeError:
                snapshot["content_b64"] = base64.b64encode(raw).decode("ascii")
                snapshot["encoding"] = "base64"
        return snapshot

    def _restore_rollback_target(self, path: str, before: dict[str, Any]) -> None:
        file_path = self._worktree_file_for_diff(path)
        state = before.get("state")
        if state == "absent":
            try:
                file_path.unlink()
            except FileNotFoundError:
                return
            return
        if state != "file":
            raise ValueError(f"Cannot restore {path}: snapshot is unavailable")
        if before.get("encoding") == "base64":
            raw = base64.b64decode(str(before.get("content_b64") or ""))
        else:
            raw = str(before.get("content") or "").encode("utf-8")
        file_path.parent.mkdir(parents=True, exist_ok=True)
        file_path.write_bytes(raw)

    def _rollback_snapshots_match(
        self,
        current: dict[str, Any],
        expected: dict[str, Any],
    ) -> bool:
        keys = ("state", "sha256", "size")
        return all(current.get(key) == expected.get(key) for key in keys)

    def _mark_checkpoint_blocked(
        self,
        session: Any,
        checkpoint: dict[str, Any],
        reason: str,
    ) -> None:
        checkpoint["rollback_status"] = "blocked"
        checkpoint["rollback_reason"] = reason
        self._update_rollback_message_metadata(session, checkpoint)
        session.touch()

    def _update_rollback_message_metadata(self, session: Any, checkpoint: dict[str, Any]) -> None:
        summary = self._rollback_summary(checkpoint)
        for message in session.messages:
            rollback = message.metadata.get("rollback")
            if isinstance(rollback, dict) and rollback.get("checkpoint_id") == checkpoint.get("id"):
                message.metadata["rollback"] = summary

    def _rollback_summary(self, checkpoint: dict[str, Any]) -> dict[str, Any]:
        return {
            "checkpoint_id": checkpoint.get("id"),
            "run_id": checkpoint.get("run_id"),
            "status": checkpoint.get("rollback_status", "unavailable"),
            "changed_files": list(checkpoint.get("changed_files") or []),
            "reason": checkpoint.get("rollback_reason"),
        }
