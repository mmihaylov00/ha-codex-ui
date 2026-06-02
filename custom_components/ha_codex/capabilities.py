"""Runtime discovery helpers for HA Codex."""

from __future__ import annotations

from collections.abc import Callable, Iterable
from pathlib import Path
from shutil import which

DEFAULT_ADDON_CANDIDATES = (
    "/addons",
    "/addon_configs",
    "/config/addons",
    "/homeassistant/addons",
    "/homeassistant/addon_configs",
)


def command_exists(command: str) -> bool:
    """Return whether a command is available on PATH."""
    return which(command) is not None


def discover_validation_command(
    configured: str | list[str] | None,
    *,
    config_path: str | None = None,
    command_exists: Callable[[str], bool] = command_exists,
) -> list[str] | None:
    """Resolve the Home Assistant validation command."""
    if not configured or configured == "none":
        return None
    if isinstance(configured, list):
        return [str(part) for part in configured] or None
    if configured != "auto":
        return str(configured).split()
    if command_exists("ha"):
        return ["ha", "core", "check"]
    if command_exists("hass"):
        command = ["hass", "--script", "check_config"]
        if config_path:
            command.extend(["--config", str(config_path)])
        return command
    return None


def discover_addon_paths(
    scope: str | list[str] | None,
    *,
    candidates: Iterable[str | Path] = DEFAULT_ADDON_CANDIDATES,
) -> list[str]:
    """Discover writable add-on paths for Codex."""
    if not scope or scope == "none":
        return []
    if isinstance(scope, list):
        candidates = scope
    elif scope != "all_visible":
        candidates = [part.strip() for part in str(scope).split(",") if part.strip()]

    discovered: list[str] = []
    for candidate in candidates:
        path = Path(candidate)
        if path.is_dir():
            resolved = str(path)
            if resolved not in discovered:
                discovered.append(resolved)
    return discovered
