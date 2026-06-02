"""Git review and commit helpers for HA Codex."""

from __future__ import annotations

import difflib
import subprocess
from pathlib import Path
from typing import Any

_GIT_VISIBLE_PREFIXES = ("",)
_GIT_VISIBLE_PATHSPECS = [":(top)"]
_GIT_IGNORED_PARTS = (
    "/.agents/",
    "/.cache/",
    "/.cloud/",
    "/.codex/",
    "/.git/",
    "/.git-real/",
    "/.idea/",
    "/.ssh/",
    "/.storage/",
    "/__pycache__/",
    "/codex_home/",
    "/deps/",
    "/dist/",
    "/node_modules/",
    "/tts/",
    "/zigbee2mqtt/log/",
)
_GIT_IGNORED_SUFFIXES = (
    ".db",
    ".db-shm",
    ".db-wal",
    ".fault",
    ".log",
    ".pyc",
    ".sqlite",
    ".sqlite-shm",
    ".sqlite-wal",
    ".tar",
    ".tar.gz",
    ".tgz",
    ".zip",
)
_GIT_IGNORED_NAMES = {
    ".HA_VERSION",
    ".ha_run.lock",
    ".shopping_list.json",
    "coordinator_backup.json",
    "database.db",
    "ip_bans.yaml",
    "known_devices.yaml",
    "secrets.yaml",
}


class GitOperationsMixin:
    """Mixin methods extracted from CodexManager."""

    async def async_git_status(self) -> dict[str, Any]:
        """Return git status for the workspace."""
        return await self._run_command(
            self._git_command(
                [
                    "-c",
                    "status.relativePaths=false",
                    "status",
                    "--short",
                    "-uall",
                    "--",
                    *_GIT_VISIBLE_PATHSPECS,
                ]
            ),
            cwd=None,
            timeout=120,
        )

    async def async_git_diff(self) -> dict[str, Any]:
        """Return git diff for the workspace."""
        return await self._run_command(
            self._git_command(["diff", "--"]),
            cwd=None,
            timeout=120,
        )

    async def async_git_changes(self) -> dict[str, Any]:
        """Return structured git changes for review."""
        status, files = await self._current_git_review_files()
        numstat = await self._run_command(
            self._git_command(["diff", "--numstat", "HEAD", "--", *_GIT_VISIBLE_PATHSPECS]),
            cwd=None,
            timeout=120,
        )
        stats = self._parse_git_numstat(numstat["stdout"])
        for file_change in files:
            file_change.update(
                stats.get(file_change.get("git_path", file_change["path"]), {})
                or stats.get(file_change["path"], {})
            )
            if file_change.get("head_path") and "added_lines" not in file_change:
                patch = await self._git_patch_against_head_file(
                    file_change["head_path"], file_change.get("git_path", file_change["path"])
                )
                if patch["ok"]:
                    file_change.update(self._patch_line_stats(patch["stdout"]))
        return {
            "ok": status["ok"] and numstat["ok"],
            "returncode": status["returncode"] if not status["ok"] else numstat["returncode"],
            "stdout": status["stdout"],
            "stderr": "\n".join([status["stderr"], numstat["stderr"]]).strip(),
            "files": files,
            "changed_count": len(files),
        }

    async def async_git_file_diff(self, path: str, old_path: str | None = None) -> dict[str, Any]:
        """Return a patch for one changed file."""
        path = self._display_workspace_change_path(path)
        if old_path:
            old_path = self._display_workspace_change_path(old_path)
        file_change = {
            "path": path,
            "old_path": old_path,
            "status": self._git_status_label("??") if old_path is None else "changed",
        }
        current_files = self._display_git_files(
            self._parse_git_status(
                (
                    await self._run_command(
                        self._git_command(
                            [
                                "-c",
                                "status.relativePaths=false",
                                "status",
                                "--porcelain=v1",
                                "-uall",
                                "--",
                                *_GIT_VISIBLE_PATHSPECS,
                            ]
                        ),
                        cwd=None,
                        timeout=120,
                    )
                )["stdout"]
            )
        )
        matched = next(
            (
                item
                for item in current_files
                if item["path"] == path and (old_path is None or item.get("old_path") == old_path)
            ),
            None,
        )
        if matched:
            file_change = matched
        patch = await self._git_patch_for_file(file_change)
        head_path = file_change.get("old_git_path") or file_change.get(
            "git_path", file_change["path"]
        )
        if (
            (not patch["ok"] or not patch["stdout"])
            and file_change.get("status") not in ("added", "untracked", "deleted")
            and self._head_path_exists(head_path)
        ):
            patch = await self._git_patch_against_head_file(
                head_path,
                file_change.get("git_path", file_change["path"]),
            )
        line_stats = self._patch_line_stats(patch["stdout"]) if patch["ok"] else {}
        return {
            "ok": patch["ok"],
            "returncode": patch["returncode"],
            "path": file_change["path"],
            "old_path": file_change.get("old_path"),
            "status": file_change["status"],
            **line_stats,
            "patch": patch["stdout"],
            "stderr": patch["stderr"],
        }

    async def async_git_commit_push(
        self,
        message: str,
        selected_files: list[dict[str, str] | str] | None = None,
    ) -> dict[str, Any]:
        """Commit and push selected workspace changes."""
        commit_message = message.strip()
        if not commit_message:
            raise ValueError("Commit message is required")
        selected = await self._selected_git_review_files(selected_files)
        pathspecs = self._pathspecs_for_selected_changes(selected)
        selected_paths = [file_change["path"] for file_change in selected]
        add_result = await self._run_command(
            self._git_command(["add", "--all", "--", *pathspecs]),
            cwd=None,
            timeout=120,
        )
        if not add_result["ok"]:
            return {
                "ok": False,
                "step": "add",
                "selected_paths": selected_paths,
                "results": [add_result],
            }
        commit_result = await self._run_command(
            self._git_command(["commit", "--only", "-m", commit_message, "--", *pathspecs]),
            cwd=None,
            timeout=120,
        )
        if not commit_result["ok"]:
            return {
                "ok": False,
                "step": "commit",
                "selected_paths": selected_paths,
                "results": [add_result, commit_result],
            }
        push_result = await self._run_command(
            self._git_command(["push", "origin", "main"]),
            cwd=None,
            timeout=240,
        )
        return {
            "ok": push_result["ok"],
            "step": "push",
            "selected_paths": selected_paths,
            "results": [add_result, commit_result, push_result],
        }

    async def async_git_discard(
        self, selected_files: list[dict[str, str] | str] | None
    ) -> dict[str, Any]:
        """Discard selected reviewable changes."""
        selected = await self._selected_git_review_files(selected_files)
        selected_paths = [file_change["path"] for file_change in selected]
        restore_pathspecs = self._restore_pathspecs_for_selected_changes(selected)
        remove_changes = self._untracked_changes_for_selected_discard(selected)
        results: list[dict[str, Any]] = []

        if restore_pathspecs:
            restore_result = await self._run_command(
                self._git_command(
                    [
                        "restore",
                        "--source=HEAD",
                        "--staged",
                        "--worktree",
                        "--",
                        *restore_pathspecs,
                    ]
                ),
                cwd=None,
                timeout=120,
            )
            results.append(restore_result)
            if not restore_result["ok"]:
                return {
                    "ok": False,
                    "step": "restore",
                    "discarded_paths": selected_paths,
                    "results": results,
                }

        if remove_changes:
            remove_result = await self._remove_untracked_review_files(remove_changes)
            results.append(remove_result)
            if not remove_result["ok"]:
                return {
                    "ok": False,
                    "step": "remove",
                    "discarded_paths": selected_paths,
                    "results": results,
                }

        return {
            "ok": True,
            "step": "discard",
            "discarded_paths": selected_paths,
            "results": results,
        }

    async def _current_git_review_files(self) -> tuple[dict[str, Any], list[dict[str, Any]]]:
        status = await self._run_command(
            self._git_command(
                [
                    "-c",
                    "status.relativePaths=false",
                    "status",
                    "--porcelain=v1",
                    "-uall",
                    "--",
                    *_GIT_VISIBLE_PATHSPECS,
                ]
            ),
            cwd=None,
            timeout=120,
        )
        return status, self._display_git_files(self._parse_git_status(status["stdout"]))

    async def _selected_git_review_files(
        self,
        selected_files: list[dict[str, str] | str] | None,
    ) -> list[dict[str, Any]]:
        if not selected_files:
            raise ValueError("At least one changed file must be selected")
        status, current_files = await self._current_git_review_files()
        if not status["ok"]:
            raise ValueError(status["stderr"] or "Git status failed")

        current_by_key = {
            self._git_review_selection_key(
                file_change["path"], file_change.get("old_path")
            ): file_change
            for file_change in current_files
        }
        selected: list[dict[str, Any]] = []
        seen: set[tuple[str, str | None]] = set()
        for item in selected_files:
            path, old_path = self._coerce_git_review_selection(item)
            key = self._git_review_selection_key(path, old_path)
            if key in seen:
                continue
            file_change = current_by_key.get(key)
            if not file_change:
                raise ValueError(f"{path} is not reviewable")
            selected.append(file_change)
            seen.add(key)
        if not selected:
            raise ValueError("At least one changed file must be selected")
        return selected

    def _coerce_git_review_selection(self, item: dict[str, str] | str) -> tuple[str, str | None]:
        if isinstance(item, str):
            path = item
            old_path = None
        elif isinstance(item, dict):
            path = item.get("path", "")
            old_path = item.get("old_path") or None
        else:
            raise ValueError("Selected file is invalid")
        path = self._safe_review_display_path(path)
        if old_path is not None:
            old_path = self._safe_review_display_path(old_path)
        return path, old_path

    def _safe_review_display_path(self, path: str) -> str:
        raw_path = str(path or "")
        normalized = raw_path.strip().replace("\\", "/")
        if (
            not normalized
            or "\0" in normalized
            or normalized.startswith("/")
            or normalized.startswith("../")
            or "/../" in f"/{normalized}/"
            or normalized in {".", ".."}
        ):
            raise ValueError(f"unsafe path: {raw_path}")
        if self._normalize_git_status_path(normalized) != normalized:
            raise ValueError(f"unsafe path: {raw_path}")
        if not self._is_visible_git_path(normalized):
            raise ValueError(f"{normalized} is not reviewable")
        return normalized

    def _git_review_selection_key(
        self, path: str, old_path: str | None = None
    ) -> tuple[str, str | None]:
        return (path, old_path or None)

    def _pathspecs_for_selected_changes(self, files: list[dict[str, Any]]) -> list[str]:
        pathspecs: list[str] = []
        for file_change in files:
            pathspecs.extend(self._pathspecs_for_change(file_change))
        return self._dedupe_paths(pathspecs)

    def _restore_pathspecs_for_selected_changes(self, files: list[dict[str, Any]]) -> list[str]:
        pathspecs: list[str] = []
        for file_change in files:
            if file_change.get("code") == "??" and not file_change.get("head_path"):
                continue
            if file_change.get("head_path"):
                pathspecs.append(file_change["head_path"])
                continue
            old_git_path = file_change.get("old_git_path")
            git_path = file_change.get("git_path", file_change["path"])
            pathspecs.append(old_git_path or git_path)
            if old_git_path and old_git_path != git_path and self._head_path_exists(git_path):
                pathspecs.append(git_path)
        return self._dedupe_paths(pathspecs)

    def _untracked_changes_for_selected_discard(
        self, files: list[dict[str, Any]]
    ) -> list[dict[str, Any]]:
        remove_changes: list[dict[str, Any]] = []
        for file_change in files:
            if file_change.get("code") == "??" or file_change.get("head_path"):
                remove_changes.append(file_change)
            elif file_change.get("old_git_path") and file_change.get(
                "old_git_path"
            ) != file_change.get("git_path"):
                if not self._head_path_exists(file_change.get("git_path", file_change["path"])):
                    remove_changes.append(file_change)
        return remove_changes

    def _pathspecs_for_change(self, file_change: dict[str, Any]) -> list[str]:
        git_path = file_change.get("git_path", file_change["path"])
        paths = [git_path]
        old_git_path = file_change.get("old_git_path")
        head_path = file_change.get("head_path")
        if old_git_path:
            paths.insert(0, old_git_path)
        if head_path:
            paths.insert(0, head_path)
        return self._dedupe_paths(paths)

    def _dedupe_paths(self, paths: list[str]) -> list[str]:
        deduped: list[str] = []
        seen: set[str] = set()
        for path in paths:
            if path in seen:
                continue
            self._safe_review_display_path(path)
            deduped.append(path)
            seen.add(path)
        return deduped

    async def _remove_untracked_review_files(self, files: list[dict[str, Any]]) -> dict[str, Any]:
        def remove_files() -> dict[str, Any]:
            removed: list[str] = []
            errors: list[str] = []
            for file_change in files:
                git_path = file_change.get("git_path", file_change["path"])
                try:
                    target = self._safe_worktree_file_for_discard(git_path)
                    if target.is_symlink() or target.is_file():
                        target.unlink()
                        removed.append(file_change["path"])
                    elif target.exists():
                        errors.append(f"Refusing to discard non-file path: {file_change['path']}")
                except OSError as err:
                    errors.append(f"{file_change['path']}: {err}")
                except ValueError as err:
                    errors.append(str(err))
            return {
                "ok": not errors,
                "returncode": 0 if not errors else 1,
                "stdout": "\n".join(removed),
                "stderr": "\n".join(errors),
            }

        return await self.hass.async_add_executor_job(remove_files)

    def _safe_worktree_file_for_discard(self, path: str) -> Path:
        normalized = self._safe_review_display_path(path)
        target = self._worktree_file_for_diff(normalized)
        work_tree = Path(self._git_work_tree_from_command()).resolve()
        resolved_target = target.resolve(strict=False)
        try:
            resolved_target.relative_to(work_tree)
        except ValueError as err:
            raise ValueError(f"unsafe path: {path}") from err
        return target

    def _head_path_exists(self, path: str) -> bool:
        result = subprocess.run(
            self._git_command(["cat-file", "-e", f"HEAD:{path}"]),
            text=True,
            capture_output=True,
            timeout=10,
            check=False,
        )
        return result.returncode == 0

    async def _git_patch_for_file(self, file_change: dict[str, Any]) -> dict[str, Any]:
        path = file_change["path"]
        git_path = file_change.get("git_path", path)
        head_path = file_change.get("head_path")
        old_path = file_change.get("old_path")
        old_git_path = file_change.get("old_git_path", old_path)
        status = file_change["status"]
        if head_path:
            return await self._git_patch_against_head_file(head_path, git_path)
        if status == "untracked" or file_change.get("code") == "??":
            diff_path = self._worktree_file_for_diff(git_path)
            return await self._run_command(
                self._git_command(["diff", "--no-index", "--", "/dev/null", str(diff_path)]),
                cwd=None,
                timeout=120,
                ok_returncodes={0, 1},
            )
        if status == "deleted":
            return await self._run_command(
                self._git_command(["diff", "HEAD", "--", git_path]),
                cwd=None,
                timeout=120,
            )
        diff_path = old_git_path or git_path
        return await self._run_command(
            self._git_command(["diff", "--find-renames", "HEAD", "--", diff_path]),
            cwd=None,
            timeout=120,
        )

    async def _git_patch_against_head_file(
        self, head_path: str, worktree_path: str
    ) -> dict[str, Any]:
        """Return a textual diff between a HEAD blob and a visible worktree file."""
        head = await self._run_command(
            self._git_command(["show", f"HEAD:{head_path}"]),
            cwd=None,
            timeout=120,
        )
        if not head["ok"]:
            return head

        current_path = self._worktree_file_for_diff(worktree_path)

        def read_current() -> dict[str, Any]:
            try:
                return {
                    "ok": True,
                    "stdout": current_path.read_text(encoding="utf-8", errors="replace"),
                    "stderr": "",
                    "returncode": 0,
                }
            except OSError as err:
                return {"ok": False, "stdout": "", "stderr": str(err), "returncode": 1}

        current = await self.hass.async_add_executor_job(read_current)
        if not current["ok"]:
            return current

        patch = "".join(
            difflib.unified_diff(
                head["stdout"].splitlines(keepends=True),
                current["stdout"].splitlines(keepends=True),
                fromfile=f"a/{head_path}",
                tofile=f"b/{worktree_path}",
            )
        )
        return {"ok": True, "stdout": patch, "stderr": "", "returncode": 0}

    def _worktree_file_for_diff(self, path: str) -> Path:
        """Return an existing worktree file path for a Git or HA Codex display path."""
        file_path = Path(path)
        if file_path.is_absolute():
            return file_path

        normalized = self._normalize_git_status_path(path)
        work_tree = Path(self._git_work_tree_from_command())
        work_tree_candidate = work_tree / normalized
        if normalized.startswith(_GIT_VISIBLE_PREFIXES) and work_tree_candidate.exists():
            return work_tree_candidate

        config_path = Path(self.hass.config.path())
        workspace_path = Path(self.workspace_path)
        candidates = [
            config_path / normalized,
            workspace_path / normalized,
            work_tree / "homeassistant" / normalized,
            work_tree / "config" / normalized,
            work_tree / normalized,
        ]
        for candidate in candidates:
            if candidate.exists():
                return candidate
        return candidates[0]

    def _patch_line_stats(self, patch: str) -> dict[str, int]:
        """Count changed lines in a unified diff."""
        added = 0
        deleted = 0
        for line in patch.splitlines():
            if line.startswith("+") and not line.startswith("+++"):
                added += 1
            elif line.startswith("-") and not line.startswith("---"):
                deleted += 1
        return {"added_lines": added, "deleted_lines": deleted}

    def _parse_git_status(self, output: str) -> list[dict[str, Any]]:
        files: list[dict[str, Any]] = []
        for line in output.splitlines():
            if not line:
                continue
            code = line[:2]
            path_text = line[3:]
            old_path = None
            if " -> " in path_text:
                old_path, path_text = path_text.split(" -> ", 1)
            files.append(
                {
                    "path": path_text,
                    "old_path": old_path,
                    "code": code,
                    "status": self._git_status_label(code),
                }
            )
        return files

    def _display_git_files(self, files: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Return status entries relevant to the visible config work tree."""
        display_files: list[dict[str, Any]] = []
        config_path = Path(self.hass.config.path())
        deleted_homeassistant = {
            self._normalize_git_status_path(file_change["path"]).removeprefix("homeassistant/")
            for file_change in files
            if file_change["status"] == "deleted"
            and self._normalize_git_status_path(file_change["path"]).startswith("homeassistant/")
        }
        for file_change in files:
            path = self._normalize_git_status_path(file_change["path"])
            if not self._is_visible_git_path(path):
                continue
            status = file_change["status"]
            file_change = {**file_change, "git_path": path}
            if file_change.get("old_path"):
                old_path = self._normalize_git_status_path(file_change["old_path"])
                file_change["old_path"] = old_path
                file_change["old_git_path"] = old_path
            if path.startswith("homeassistant/"):
                mapped_path = path.removeprefix("homeassistant/")
                if status == "deleted" and config_path.joinpath(mapped_path).exists():
                    continue
                file_change = {**file_change, "path": mapped_path}
                if (file_change.get("old_path") or "").startswith("homeassistant/"):
                    file_change["old_path"] = file_change["old_path"].removeprefix("homeassistant/")
            elif path.startswith("config/"):
                mapped_path = path.removeprefix("config/")
                file_change = {**file_change, "path": mapped_path}
                if status == "untracked" and mapped_path in deleted_homeassistant:
                    file_change = {
                        **file_change,
                        "head_path": f"homeassistant/{mapped_path}",
                        "status": "modified",
                    }
            if file_change["status"] == "untracked":
                file_change = {**file_change, "status": "added"}
            display_files.append(file_change)
        return display_files

    def _normalize_git_status_path(self, path: str) -> str:
        """Return a repository-root relative path from git status output."""
        normalized = path.strip().replace("\\", "/")
        while normalized.startswith("./"):
            normalized = normalized[2:]
        while normalized.startswith("../"):
            normalized = normalized[3:]
        return normalized.lstrip("/")

    def _is_visible_git_path(self, path: str) -> bool:
        """Return whether a git status path belongs in the HA Codex review UI."""
        if not path.startswith(_GIT_VISIBLE_PREFIXES):
            return False
        normalized = f"/{path}"
        if any(part in normalized for part in _GIT_IGNORED_PARTS):
            return False
        name = path.rsplit("/", 1)[-1]
        if name in _GIT_IGNORED_NAMES:
            return False
        return not path.endswith(_GIT_IGNORED_SUFFIXES)

    def _parse_git_numstat(self, output: str) -> dict[str, dict[str, int | None]]:
        stats: dict[str, dict[str, int | None]] = {}
        for line in output.splitlines():
            parts = line.split("\t")
            if len(parts) < 3:
                continue
            added_text, deleted_text, path_text = parts[0], parts[1], parts[-1]
            if " => " in path_text:
                path_text = path_text.split(" => ", 1)[1].rstrip("}")
                if "{" in path_text:
                    path_text = path_text.split("{", 1)[0] + path_text.split("{", 1)[1]
            try:
                added = None if added_text == "-" else int(added_text)
                deleted = None if deleted_text == "-" else int(deleted_text)
            except ValueError:
                added = None
                deleted = None
            stats[path_text] = {"added_lines": added, "deleted_lines": deleted}
        return stats

    def _git_status_label(self, code: str) -> str:
        compact = code.strip()
        if compact == "??":
            return "untracked"
        if "D" in code and not any(flag in code for flag in ("M", "A", "R", "C")):
            return "deleted"
        if "A" in code:
            return "added"
        if "R" in code:
            return "renamed"
        if "C" in code:
            return "copied"
        if "M" in code:
            return "modified"
        return compact.lower() or "changed"

    def _git_command(self, args: list[str]) -> list[str]:
        """Build a git command that works with the HA root backup work tree."""
        config_path = Path(self.hass.config.path())
        config_git_dir = config_path / ".git-real"
        if config_git_dir.is_dir():
            return [
                "git",
                f"--git-dir={config_git_dir}",
                f"--work-tree={self._git_work_tree(config_git_dir, config_path)}",
                *args,
            ]

        workspace_path = Path(self.workspace_path)
        workspace_git_dir = workspace_path / ".git-real"
        if workspace_git_dir.is_dir():
            return [
                "git",
                f"--git-dir={workspace_git_dir}",
                f"--work-tree={self._git_work_tree(workspace_git_dir, workspace_path)}",
                *args,
            ]

        return ["git", "-C", str(config_path), *args]

    def _git_work_tree_from_command(self) -> str:
        """Return the effective git work tree used by _git_command."""
        command = self._git_command([])
        for arg in command:
            if arg.startswith("--work-tree="):
                return arg.removeprefix("--work-tree=")
        if "-C" in command:
            index = command.index("-C")
            if index + 1 < len(command):
                return command[index + 1]
        return str(Path(self.hass.config.path()))

    def _git_work_tree(self, git_dir: Path, fallback: Path) -> str:
        try:
            configured = subprocess.run(
                ["git", f"--git-dir={git_dir}", "config", "--get", "core.worktree"],
                text=True,
                capture_output=True,
                timeout=10,
                check=False,
            )
        except (OSError, subprocess.SubprocessError):
            return str(fallback)
        work_tree = configured.stdout.strip()
        if (
            work_tree == "/"
            and fallback == Path(self.hass.config.path())
            and not Path("/homeassistant").exists()
        ):
            return str(fallback)
        return work_tree or str(fallback)
