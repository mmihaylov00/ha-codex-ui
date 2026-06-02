"""Codex JSONL event normalization."""

from __future__ import annotations

import json
import shlex
from dataclasses import dataclass
from typing import Any

RAW_STRING_LIMIT = 8192
RAW_LIST_LIMIT = 50


@dataclass
class NormalizedEvent:
    """A small, frontend-friendly event shape."""

    kind: str
    text: str | None = None
    session_id: str | None = None
    approval_id: str | None = None
    command: str | None = None
    cwd: str | None = None
    file_changes: list[dict[str, str]] | None = None
    raw: dict[str, Any] | None = None

    def to_dict(self) -> dict[str, Any]:
        """Serialize the event."""
        return {
            "kind": self.kind,
            "text": self.text,
            "session_id": self.session_id,
            "approval_id": self.approval_id,
            "command": self.command,
            "cwd": self.cwd,
            "file_changes": self.file_changes,
            "raw": self.raw,
        }


def _first_string(data: dict[str, Any], *keys: str) -> str | None:
    for key in keys:
        value = data.get(key)
        if isinstance(value, str) and value:
            return value
    return None


def compact_raw_event(data: dict[str, Any]) -> dict[str, Any]:
    """Return a bounded copy of a raw Codex event for storage/UI payloads."""
    compacted = _compact_raw_value(data)
    return compacted if isinstance(compacted, dict) else {}


def _compact_raw_value(value: Any) -> Any:
    if isinstance(value, dict):
        return {str(key): _compact_raw_value(item) for key, item in value.items()}
    if isinstance(value, list):
        compacted = [_compact_raw_value(item) for item in value[:RAW_LIST_LIMIT]]
        omitted = len(value) - RAW_LIST_LIMIT
        if omitted > 0:
            compacted.append(f"... truncated {omitted} item(s)")
        return compacted
    if isinstance(value, str) and len(value) > RAW_STRING_LIMIT:
        omitted = len(value) - RAW_STRING_LIMIT
        return f"{value[:RAW_STRING_LIMIT]}\n... truncated {omitted} character(s)"
    return value


def _extract_text(data: dict[str, Any]) -> str | None:
    text = _first_string(data, "delta", "text", "content", "message")
    if text:
        return text
    error = data.get("error")
    if isinstance(error, str) and error:
        return error
    if isinstance(error, dict):
        text = _first_string(error, "message", "text", "detail", "description")
        if text:
            code = error.get("code")
            return f"{text} (code {code})" if code else text
    message = data.get("message")
    if isinstance(message, dict):
        return _first_string(message, "content", "text")
    item = data.get("item")
    if isinstance(item, dict):
        return _first_string(item, "text", "content")
    return None


def _is_agent_message_item(data: dict[str, Any]) -> bool:
    """Return true when a Codex item event carries assistant-visible text."""
    item = data.get("item")
    if not isinstance(item, dict):
        return False
    item_type = str(item.get("type") or "").lower()
    if item_type in {"agent_message", "assistant_message", "message"}:
        return bool(_extract_text(item))
    return False


def _extract_command(data: dict[str, Any]) -> str | None:
    item = data.get("item")
    if isinstance(item, dict):
        nested = _extract_command(item)
        if nested:
            return nested
    command = data.get("command") or data.get("cmd")
    if isinstance(command, str):
        return _unwrap_shell_command(command)
    if isinstance(command, list):
        return " ".join(str(part) for part in command)
    arguments = data.get("arguments")
    if isinstance(arguments, str):
        parsed = _json_object(arguments)
        if parsed:
            nested = _extract_command(parsed)
            if nested:
                return nested
        return _unwrap_shell_command(arguments)
    if isinstance(arguments, dict):
        nested = _extract_command(arguments)
        if nested:
            return nested
    call = data.get("call") or data.get("tool_call") or data.get("tool")
    if isinstance(call, dict):
        return _extract_command(call)
    return None


def _unwrap_shell_command(command: str) -> str:
    try:
        parts = shlex.split(command)
    except ValueError:
        return command
    if (
        len(parts) >= 3
        and parts[0] in {"/bin/zsh", "zsh", "/bin/sh", "sh", "/bin/bash", "bash"}
        and parts[1] == "-lc"
    ):
        return parts[2]
    return command


def _json_object(value: str) -> dict[str, Any] | None:
    try:
        parsed = json.loads(value)
    except (TypeError, ValueError):
        return None
    return parsed if isinstance(parsed, dict) else None


def _extract_tool_name(data: dict[str, Any]) -> str | None:
    for key in ("tool_name", "name", "function", "recipient", "tool"):
        value = data.get(key)
        if isinstance(value, str) and value:
            return value
        if isinstance(value, dict):
            nested = _extract_tool_name(value)
            if nested:
                return nested
    item = data.get("item")
    if isinstance(item, dict):
        return _extract_tool_name(item)
    return None


def _extract_patch_text(data: dict[str, Any]) -> str | None:
    for key in ("patch", "input", "arguments"):
        value = data.get(key)
        if isinstance(value, str):
            parsed = _json_object(value)
            if parsed:
                nested = _extract_patch_text(parsed)
                if nested:
                    return nested
            if "*** Begin Patch" in value:
                return value
        elif isinstance(value, dict):
            nested = _extract_patch_text(value)
            if nested:
                return nested
    item = data.get("item")
    if isinstance(item, dict):
        return _extract_patch_text(item)
    call = data.get("call") or data.get("tool_call") or data.get("tool")
    if isinstance(call, dict):
        return _extract_patch_text(call)
    return None


def _extract_file_changes(data: dict[str, Any]) -> list[dict[str, str]]:
    tool_name = (_extract_tool_name(data) or "").lower()
    patch = _extract_patch_text(data)
    if not patch or "apply_patch" not in tool_name and "*** Begin Patch" not in patch:
        return []
    return _parse_patch_file_changes(patch)


def _parse_patch_file_changes(patch: str) -> list[dict[str, str]]:
    changes: list[dict[str, str]] = []
    current: dict[str, str] | None = None
    for raw_line in patch.splitlines():
        line = raw_line.strip()
        if line.startswith("*** Add File: "):
            current = {"status": "added", "path": line.removeprefix("*** Add File: ").strip()}
            changes.append(current)
        elif line.startswith("*** Delete File: "):
            current = {"status": "deleted", "path": line.removeprefix("*** Delete File: ").strip()}
            changes.append(current)
        elif line.startswith("*** Update File: "):
            current = {"status": "modified", "path": line.removeprefix("*** Update File: ").strip()}
            changes.append(current)
        elif current is not None and line.startswith("*** Move to: "):
            current["old_path"] = current["path"]
            current["path"] = line.removeprefix("*** Move to: ").strip()
            current["status"] = "renamed"
    return changes


def _format_file_changes(file_changes: list[dict[str, str]]) -> str:
    lines = ["File changes:"]
    for change in file_changes:
        status = change.get("status", "changed")
        path = change.get("path", "")
        old_path = change.get("old_path")
        if old_path:
            lines.append(f"- {status} `{old_path}` -> `{path}`")
        else:
            lines.append(f"- {status} `{path}`")
    return "\n".join(lines)


def normalize_event(data: dict[str, Any]) -> NormalizedEvent:
    """Normalize one Codex JSONL event into a stable integration event."""
    event_type = str(data.get("type", "unknown"))
    lowered = event_type.lower()
    item = data.get("item")
    item_status = str(item.get("status") or "").lower() if isinstance(item, dict) else ""
    command = _extract_command(data)
    file_changes = _extract_file_changes(data)
    if file_changes and command and "*** Begin Patch" in command:
        command = None
    raw = compact_raw_event(data)

    session_id = _first_string(
        data,
        "session_id",
        "thread_id",
        "conversation_id",
        "id" if "session" in lowered or "thread" in lowered else "",
    )
    if session_id and ("session" in lowered or "thread" in lowered):
        return NormalizedEvent("session_started", session_id=session_id, raw=raw)

    if _is_agent_message_item(data):
        text = _extract_text(data)
        if text:
            return NormalizedEvent("message", text=text, raw=raw)

    if "approval" in lowered:
        return NormalizedEvent(
            "approval_required",
            approval_id=_first_string(data, "approval_id", "request_id", "id"),
            command=command,
            cwd=_first_string(data, "cwd", "workdir"),
            raw=raw,
        )

    if (
        "command" in lowered
        or "tool" in lowered
        or "exec" in lowered
        or "function" in lowered
        or command
        or file_changes
    ):
        if command and not file_changes and ("complete" in lowered or item_status == "completed"):
            return NormalizedEvent("raw", text=_extract_text(data), raw=raw)
        text = (
            _format_file_changes(file_changes)
            if file_changes
            else _extract_text(data) or event_type
        )
        return NormalizedEvent(
            "action",
            text=text,
            command=command,
            cwd=_first_string(data, "cwd", "workdir"),
            file_changes=file_changes or None,
            raw=raw,
        )

    if "delta" in lowered:
        text = _extract_text(data)
        if text:
            return NormalizedEvent("message_delta", text=text, raw=raw)
    if "message" in lowered:
        text = _extract_text(data)
        if text:
            return NormalizedEvent("message", text=text, raw=raw)

    if "error" in lowered:
        return NormalizedEvent("error", text=_extract_text(data), raw=raw)

    if "complete" in lowered or "finished" in lowered or lowered in {"turn.end", "done"}:
        return NormalizedEvent("run_finished", text=_extract_text(data), raw=raw)

    return NormalizedEvent("raw", text=_extract_text(data), raw=raw)
