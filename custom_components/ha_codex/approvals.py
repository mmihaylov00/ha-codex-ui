"""Approval helpers for HA Codex command prompts."""

from __future__ import annotations

import shlex
from pathlib import PurePosixPath

_SHELLS = {"sh", "bash", "zsh", "/bin/sh", "/bin/bash", "/bin/zsh"}
_CONTROL_TOKENS = (";", "&&", "||", "|", "`", "$(", ">", "<")
_FIND_RISKY_ARGS = {"-delete", "-exec", "-execdir", "-ok", "-okdir"}
_SED_RISKY_ARGS = {"-i", "--in-place"}


def is_safe_read_only_command(command: str) -> bool:
    """Return true for a conservative allowlist of read-only shell commands."""
    text = str(command or "").strip()
    if not text:
        return False
    if any(token in text for token in _CONTROL_TOKENS):
        return False
    try:
        parts = shlex.split(text)
    except ValueError:
        return False
    if len(parts) >= 3 and parts[0] in _SHELLS and parts[1] == "-lc":
        return is_safe_read_only_command(parts[2])
    if not parts:  # pragma: no cover
        return False
    command_name = _command_name(parts[0])
    args = parts[1:]
    if command_name in {"ls", "cat", "grep", "rg"}:
        return True
    if command_name == "sed":
        return "-n" in args and not any(
            arg in _SED_RISKY_ARGS or arg.startswith("-i") for arg in args
        )
    if command_name == "find":
        return not any(arg in _FIND_RISKY_ARGS for arg in args)
    if command_name == "git":
        return _is_safe_git_command(args)
    if command_name == "ha":
        return args[:2] == ["core", "check"]
    return False


def _command_name(value: str) -> str:
    return PurePosixPath(value).name


def _is_safe_git_command(args: list[str]) -> bool:
    if not args:
        return False
    subcommand = args[0]
    if subcommand not in {"status", "diff"}:
        return False
    return not any(arg.startswith("--output") for arg in args[1:])
