"""Context picker helpers for HA Codex."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

CONTEXT_SELECTION_LIMIT = 20
CONTEXT_MAX_SERIALIZED_CHARS = 40_000
_CONFIG_FILE_MAX_BYTES = 80_000
_CONFIG_FILE_MAX_COUNT = 500
_LOG_MAX_BYTES = 200_000
_LOG_MAX_LINES = 500
_CONTEXT_TRUNCATED_MARKER = "\n[context truncated]"
_CONTEXT_ALLOWED_KINDS = {
    "entity",
    "device",
    "area",
    "automation",
    "script",
    "log",
    "config_file",
}
_CONFIG_ALLOWED_SUFFIXES = {
    ".css",
    ".js",
    ".json",
    ".md",
    ".py",
    ".toml",
    ".ts",
    ".txt",
    ".yaml",
    ".yml",
}
_CONTEXT_EXCLUDED_PARTS = {
    ".cache",
    ".cloud",
    ".codex",
    ".git",
    ".git-real",
    ".idea",
    ".ssh",
    ".storage",
    "__pycache__",
    "backup",
    "backups",
    "codex_home",
    "deps",
    "media",
    "node_modules",
    "ssl",
    "tmp",
    "tts",
}
_CONTEXT_EXCLUDED_NAMES = {
    ".ha_run.lock",
    "database.db",
    "home-assistant.log",
    "home-assistant.log.1",
    "ip_bans.yaml",
    "known_devices.yaml",
    "secrets.yaml",
}
_CONTEXT_EXCLUDED_SUFFIXES = {
    ".db",
    ".db-shm",
    ".db-wal",
    ".fault",
    ".key",
    ".log",
    ".pem",
    ".pyc",
    ".sqlite",
    ".sqlite-shm",
    ".sqlite-wal",
    ".tar",
    ".tgz",
    ".zip",
}


class ContextMixin:
    """Mixin methods extracted from CodexManager for context picker data."""

    async def async_context_logs(self, lines: int = 200) -> dict[str, Any]:
        """Return bounded Home Assistant and HA Codex log tails."""
        safe_lines = max(1, min(int(lines), _LOG_MAX_LINES))

        def read_logs() -> dict[str, Any]:
            return {
                "logs": [
                    {
                        "id": log_id,
                        "name": name,
                        **self._read_context_tail(path, safe_lines, _LOG_MAX_BYTES),
                    }
                    for log_id, name, path in self._context_log_specs()
                ]
            }

        return await self.hass.async_add_executor_job(read_logs)

    async def async_context_config_files(self) -> dict[str, Any]:
        """Return safe text configuration files that can be attached as context."""
        return await self.hass.async_add_executor_job(self._context_config_files)

    async def async_context_config_file(self, path: str) -> dict[str, Any]:
        """Return a bounded preview for one safe configuration file."""
        return await self.hass.async_add_executor_job(self._context_config_file, path)

    def _prepare_context_attachments(
        self,
        selected: Any,
    ) -> tuple[list[dict[str, Any]], str]:
        """Return transcript metadata and serialized run context for selected items."""
        attachments: list[dict[str, Any]] = []
        prompt_items: list[dict[str, Any]] = []
        if not isinstance(selected, list):
            return attachments, ""

        seen: set[str] = set()
        for raw_item in selected:
            if len(attachments) >= CONTEXT_SELECTION_LIMIT:
                break
            prepared = self._prepare_context_item(raw_item)
            if prepared is None:
                continue
            attachment, prompt_item = prepared
            key = f"{attachment['kind']}:{attachment['id']}"
            if key in seen:
                continue
            seen.add(key)
            attachments.append(attachment)
            prompt_items.append(prompt_item)

        return attachments, self._serialize_context_items(prompt_items)

    def _compose_prompt_with_context(self, prompt: str, serialized_context: str) -> str:
        """Compose the internal Codex prompt from raw user text and hidden context."""
        user_prompt = str(prompt or "").strip()
        context = str(serialized_context or "").strip()
        if not context:
            return user_prompt

        request = f"User request:\n{user_prompt}"
        separator = "\n\n"
        max_context_length = CONTEXT_MAX_SERIALIZED_CHARS - len(request) - len(separator)
        if max_context_length <= 0:
            return request
        if len(context) > max_context_length:
            marker = _CONTEXT_TRUNCATED_MARKER
            context = f"{context[: max(0, max_context_length - len(marker))].rstrip()}{marker}"
        return f"{context}{separator}{request}"

    def _context_roots(self) -> list[Path]:
        roots = [Path(self.workspace_path), Path(self.hass.config.path())]
        seen: set[str] = set()
        unique: list[Path] = []
        for root in roots:
            try:
                key = str(root.resolve(strict=False))
            except OSError:
                key = str(root)
            if key in seen:
                continue
            seen.add(key)
            unique.append(root)
        return unique

    def _context_config_files(self) -> dict[str, Any]:
        files: dict[str, dict[str, Any]] = {}
        for root in self._context_roots():
            if root.is_file():
                candidates = [root]
            elif root.is_dir():
                candidates = root.rglob("*")
            else:
                continue
            for path in candidates:
                if not path.is_file() or not self._is_context_config_file(path):
                    continue
                display_path = self._display_context_path(path)
                if display_path in files:
                    continue
                try:
                    stat = path.stat()
                except OSError:
                    continue
                files[display_path] = {
                    "path": display_path,
                    "size": stat.st_size,
                    "modified": stat.st_mtime,
                }
                if len(files) >= _CONFIG_FILE_MAX_COUNT:
                    break
        return {"files": [files[key] for key in sorted(files)]}

    def _context_log_specs(self) -> list[tuple[str, str, Path]]:
        return [
            (
                "home_assistant",
                "Home Assistant log",
                Path(self.hass.config.path("home-assistant.log")),
            ),
            (
                "ha_codex_bridge",
                "HA Codex bridge log",
                Path(self.hass.config.path("ha_codex_bridge.log")),
            ),
        ]

    def _context_config_file(self, requested_path: str) -> dict[str, Any]:
        path = self._resolve_context_config_file(requested_path)
        try:
            stat = path.stat()
            with path.open("rb") as file:
                raw = file.read(_CONFIG_FILE_MAX_BYTES + 1)
        except OSError as err:
            raise ValueError(f"Unable to read config file {requested_path}: {err}") from err

        truncated = len(raw) > _CONFIG_FILE_MAX_BYTES or stat.st_size > _CONFIG_FILE_MAX_BYTES
        if truncated:
            raw = raw[:_CONFIG_FILE_MAX_BYTES]
        return {
            "path": self._display_context_path(path),
            "size": stat.st_size,
            "modified": stat.st_mtime,
            "content": raw.decode("utf-8", errors="replace"),
            "truncated": truncated,
        }

    def _resolve_context_config_file(self, requested_path: str) -> Path:
        value = str(requested_path or "").strip()
        if not value:
            raise ValueError("Config file path is required")
        requested = Path(value)
        if requested.is_absolute() or ".." in requested.parts:
            raise ValueError("Config file path is outside the workspace")

        for root in self._context_roots():
            root_resolved = root.resolve(strict=False)
            candidate = (root / requested).resolve(strict=False)
            try:
                candidate.relative_to(root_resolved)
            except ValueError:
                continue
            if candidate.is_file() and self._is_context_config_file(candidate):
                return candidate
        raise ValueError(f"Config file is not available for context: {value}")

    def _display_context_path(self, path: Path) -> str:
        for root in self._context_roots():
            try:
                return str(
                    path.resolve(strict=False).relative_to(root.resolve(strict=False))
                ).replace("\\", "/")
            except ValueError:
                continue
        return str(path)

    def _is_context_config_file(self, path: Path) -> bool:
        parts = [part.lower() for part in path.parts]
        if any(part in _CONTEXT_EXCLUDED_PARTS for part in parts):
            return False
        if any(part.startswith(".") and part not in {".gitignore"} for part in parts):
            return False
        name = path.name.lower()
        if name in _CONTEXT_EXCLUDED_NAMES:
            return False
        if any(name.endswith(suffix) for suffix in _CONTEXT_EXCLUDED_SUFFIXES):
            return False
        return path.suffix.lower() in _CONFIG_ALLOWED_SUFFIXES or name == ".gitignore"

    def _read_context_tail(self, path: Path, lines: int, max_bytes: int) -> dict[str, Any]:
        if not path.exists():
            return {
                "path": str(path),
                "exists": False,
                "lines": "",
                "line_count": 0,
                "truncated": False,
            }
        try:
            size = path.stat().st_size
            with path.open("rb") as log_file:
                if size > max_bytes:
                    log_file.seek(size - max_bytes)
                    log_file.readline()
                raw_lines = log_file.readlines()
        except OSError as err:
            return {
                "path": str(path),
                "exists": True,
                "error": str(err),
                "lines": "",
                "line_count": 0,
                "truncated": False,
            }

        selected = raw_lines[-lines:]
        return {
            "path": str(path),
            "exists": True,
            "lines": b"".join(selected).decode("utf-8", errors="replace"),
            "line_count": len(selected),
            "truncated": size > max_bytes or len(raw_lines) > len(selected),
        }

    def _prepare_context_item(
        self,
        raw_item: Any,
    ) -> tuple[dict[str, Any], dict[str, Any]] | None:
        if not isinstance(raw_item, dict):
            return None
        kind = self._context_text(raw_item.get("kind"), max_length=48)
        if kind not in _CONTEXT_ALLOWED_KINDS:
            return None
        item_id = self._context_text(raw_item.get("id"), max_length=512)
        label = self._context_text(raw_item.get("label"), max_length=512)
        if not item_id or not label:
            return None

        if kind == "config_file":
            return self._prepare_config_file_context_item(raw_item, item_id, label)
        if kind == "log":
            return self._prepare_log_context_item(raw_item, item_id, label)
        return self._prepare_generic_context_item(raw_item, item_id, kind, label)

    def _prepare_generic_context_item(
        self,
        raw_item: dict[str, Any],
        item_id: str,
        kind: str,
        label: str,
    ) -> tuple[dict[str, Any], dict[str, Any]]:
        subtitle = self._context_text(raw_item.get("subtitle"), max_length=512)
        payload = raw_item.get("payload") if isinstance(raw_item.get("payload"), dict) else {}
        attachment = self._context_attachment(item_id, kind, label, subtitle)
        return attachment, {**attachment, "payload": payload}

    def _prepare_config_file_context_item(
        self,
        raw_item: dict[str, Any],
        item_id: str,
        label: str,
    ) -> tuple[dict[str, Any], dict[str, Any]] | None:
        raw_payload = raw_item.get("payload") if isinstance(raw_item.get("payload"), dict) else {}
        requested_path = self._context_text(raw_payload.get("path") or item_id, max_length=512)
        if not requested_path:
            return None
        try:
            payload = self._context_config_file(requested_path)
        except ValueError:
            return None
        display_path = self._context_text(payload.get("path"), max_length=512)
        label = label or Path(display_path).name or display_path
        attachment = self._context_attachment(display_path, "config_file", label, display_path)
        return attachment, {**attachment, "payload": payload}

    def _prepare_log_context_item(
        self,
        raw_item: dict[str, Any],
        item_id: str,
        label: str,
    ) -> tuple[dict[str, Any], dict[str, Any]] | None:
        log_spec = next(
            (spec for spec in self._context_log_specs() if spec[0] == item_id),
            None,
        )
        if log_spec is None:
            return None
        log_id, name, path = log_spec
        payload = {
            "source": name,
            **self._read_context_tail(path, 200, _LOG_MAX_BYTES),
        }
        subtitle = self._context_text(raw_item.get("subtitle"), max_length=512)
        if not subtitle:
            subtitle = (
                f"{payload.get('line_count', 0)} lines" if payload.get("exists") else "missing"
            )
        attachment = self._context_attachment(log_id, "log", label or name, subtitle)
        return attachment, {**attachment, "payload": payload}

    def _context_attachment(
        self,
        item_id: str,
        kind: str,
        label: str,
        subtitle: str = "",
    ) -> dict[str, Any]:
        attachment: dict[str, Any] = {
            "id": item_id,
            "kind": kind,
            "label": label,
        }
        if subtitle:
            attachment["subtitle"] = subtitle
        return attachment

    def _serialize_context_items(self, items: list[dict[str, Any]]) -> str:
        if not items:
            return ""
        lines = ["HA Codex context"]
        for index, item in enumerate(items[:CONTEXT_SELECTION_LIMIT], 1):
            lines.append("")
            lines.append(f"{index}. [{item['kind']}] {item['label']}")
            subtitle = item.get("subtitle")
            if subtitle:
                lines.append(f"subtitle: {subtitle}")
            lines.append(f"id: {item['id']}")
            payload = item.get("payload")
            if payload:
                lines.append(json.dumps(payload, indent=2, ensure_ascii=False, default=str))
        return "\n".join(lines)

    def _context_text(self, value: Any, *, max_length: int) -> str:
        text = str(value or "").strip()
        if len(text) <= max_length:
            return text
        return text[:max_length].rstrip()
