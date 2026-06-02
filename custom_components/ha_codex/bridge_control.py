"""Packaged bridge process controls for HA Codex."""

from __future__ import annotations

import asyncio
import os
import signal
import sys
import time
from pathlib import Path
from typing import Any
from urllib.error import URLError
from urllib.request import urlopen

BRIDGE_HOST = "127.0.0.1"
BRIDGE_PORT = 8765
BRIDGE_SCRIPT = Path(__file__).resolve().parent / "bridge" / "ha_codex_bridge.py"
BRIDGE_PROCESS_PATTERN = "ha_codex_bridge.py"

LEGACY_BRIDGE_RESTART_COMMANDS = (
    "/homeassistant/bin/restart_ha_codex_bridge.sh",
    "/config/bin/restart_ha_codex_bridge.sh",
)
LEGACY_BRIDGE_START_COMMANDS = (
    "/homeassistant/bin/start_ha_codex_bridge.sh",
    "/config/bin/start_ha_codex_bridge.sh",
)


async def async_start_bridge_service(hass: Any | None = None) -> dict[str, Any]:
    """Start the packaged bridge service, falling back to legacy helpers."""
    health = await _async_bridge_health()
    if health.get("ok"):
        return {"ok": True, "already_running": True, "health": health}

    result = await _async_start_packaged_bridge(hass)
    if result.get("ok"):
        return result

    legacy = await _async_run_first_legacy_command(LEGACY_BRIDGE_START_COMMANDS)
    if legacy.get("ok"):
        legacy["legacy_helper"] = True
        return legacy
    return {
        "ok": False,
        "error": result.get("error") or legacy.get("error") or "Unable to start HA Codex bridge",
        "packaged": result,
        "legacy": legacy,
    }


async def async_restart_bridge_service(hass: Any | None = None) -> dict[str, Any]:
    """Restart the packaged bridge service, falling back to legacy helpers."""
    stopped = await _async_stop_bridge_processes()
    result = await _async_start_packaged_bridge(hass)
    if result.get("ok"):
        result["stopped_pids"] = stopped.get("pids", [])
        return result

    legacy = await _async_run_first_legacy_command(LEGACY_BRIDGE_RESTART_COMMANDS)
    if legacy.get("ok"):
        legacy["legacy_helper"] = True
        legacy["stopped_pids"] = stopped.get("pids", [])
        return legacy
    return {
        "ok": False,
        "error": result.get("error") or legacy.get("error") or "Unable to restart HA Codex bridge",
        "stopped": stopped,
        "packaged": result,
        "legacy": legacy,
    }


async def _async_start_packaged_bridge(hass: Any | None = None) -> dict[str, Any]:
    """Launch the packaged bridge script in the background."""
    if not BRIDGE_SCRIPT.is_file():
        return {"ok": False, "error": f"Packaged bridge script not found: {BRIDGE_SCRIPT}"}

    config_dir = _config_dir(hass)
    log_path = config_dir / "ha_codex_bridge.log"
    log_path.parent.mkdir(parents=True, exist_ok=True)
    env = os.environ.copy()
    env["PYTHONPATH"] = (
        f"{config_dir}:{env['PYTHONPATH']}" if env.get("PYTHONPATH") else str(config_dir)
    )
    command = [sys.executable, str(BRIDGE_SCRIPT)]
    try:
        with log_path.open("ab") as log_file:
            process = await asyncio.create_subprocess_exec(
                *command,
                cwd=str(config_dir),
                stdin=asyncio.subprocess.DEVNULL,
                stdout=log_file,
                stderr=log_file,
                env=env,
                start_new_session=True,
            )
    except OSError as err:
        return {"ok": False, "error": str(err), "command": command}

    health = await _async_wait_for_bridge_health()
    if health.get("ok"):
        return {
            "ok": True,
            "command": command,
            "pid": process.pid,
            "log_path": str(log_path),
            "health": health,
        }
    return {
        "ok": False,
        "error": health.get("error") or "Bridge did not become healthy",
        "command": command,
        "pid": process.pid,
        "log_path": str(log_path),
        "health": health,
    }


async def _async_stop_bridge_processes() -> dict[str, Any]:
    """Terminate bridge processes found by pgrep."""
    pids = await _async_bridge_pids()
    current_pid = os.getpid()
    stopped: list[int] = []
    for pid in pids:
        if pid == current_pid:
            continue
        try:
            os.kill(pid, signal.SIGTERM)
            stopped.append(pid)
        except ProcessLookupError:
            continue
        except OSError:
            continue

    deadline = time.monotonic() + 5
    while time.monotonic() < deadline:
        remaining = [pid for pid in stopped if _pid_exists(pid)]
        if not remaining:
            break
        await asyncio.sleep(0.25)

    for pid in stopped:
        if _pid_exists(pid):
            try:
                os.kill(pid, signal.SIGKILL)
            except OSError:
                pass
    return {"ok": True, "pids": stopped}


async def _async_bridge_pids() -> list[int]:
    """Return PIDs of running HA Codex bridge processes."""
    try:
        process = await asyncio.create_subprocess_exec(
            "pgrep",
            "-f",
            BRIDGE_PROCESS_PATTERN,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
    except OSError:
        return []
    stdout, _stderr = await process.communicate()
    if process.returncode not in (0, 1):
        return []
    pids: list[int] = []
    for line in stdout.decode(errors="replace").splitlines():
        try:
            pids.append(int(line.strip()))
        except ValueError:
            continue
    return pids


async def _async_run_first_legacy_command(commands: tuple[str, ...]) -> dict[str, Any]:
    """Run the first available legacy bridge helper."""
    last_error = ""
    for command in commands:
        try:
            process = await asyncio.create_subprocess_exec(
                command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
        except OSError as err:
            last_error = str(err)
            continue
        stdout, stderr = await process.communicate()
        output = (stdout or b"").decode(errors="replace").strip()
        error = (stderr or b"").decode(errors="replace").strip()
        if process.returncode == 0:
            return {"ok": True, "command": command, "stdout": output, "stderr": error}
        last_error = error or output
    return {"ok": False, "error": last_error or "No legacy bridge helper is available"}


async def _async_wait_for_bridge_health() -> dict[str, Any]:
    """Wait for the bridge health endpoint to become available."""
    deadline = time.monotonic() + 10
    last_health: dict[str, Any] = {"ok": False}
    while time.monotonic() < deadline:
        last_health = await _async_bridge_health()
        if last_health.get("ok"):
            return last_health
        await asyncio.sleep(0.5)
    return last_health


async def _async_bridge_health() -> dict[str, Any]:
    """Check the local bridge health endpoint."""

    def check() -> dict[str, Any]:
        try:
            with urlopen(f"http://{BRIDGE_HOST}:{BRIDGE_PORT}/health", timeout=1) as response:
                return {"ok": response.status == 200, "status": response.status}
        except (OSError, URLError) as err:
            return {"ok": False, "error": str(err)}

    return await asyncio.to_thread(check)


def _config_dir(hass: Any | None) -> Path:
    if hass is not None:
        return Path(hass.config.path())
    for parent in BRIDGE_SCRIPT.parents:
        if parent.joinpath("custom_components", "ha_codex").is_dir():
            return parent
    return BRIDGE_SCRIPT.parents[3]


def _pid_exists(pid: int) -> bool:
    try:
        os.kill(pid, 0)
    except ProcessLookupError:
        return False
    except OSError:
        return True
    return True
