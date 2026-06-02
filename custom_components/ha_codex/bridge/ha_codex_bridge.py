#!/usr/bin/env python3
"""Small HTTP bridge for running Codex outside Home Assistant Core."""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

SCRIPT_PATH = Path(__file__).resolve()


def discover_config_dir() -> Path:
    """Return the Home Assistant config/repository root for this bridge script."""
    for parent in SCRIPT_PATH.parents:
        if parent.joinpath("custom_components", "ha_codex").is_dir():
            return parent
    return SCRIPT_PATH.parents[1]


CONFIG_DIR = discover_config_dir()
sys.path.insert(0, str(CONFIG_DIR))

from custom_components.ha_codex.codex_events import compact_raw_event, normalize_event
from custom_components.ha_codex.runner import RunnerOptions, build_codex_command

APPROVALS: dict[str, bool] = {}
APPROVAL_CONDITION = threading.Condition()
DEVICE_LOGIN_LOCK = threading.Lock()
DEVICE_LOGIN_CONDITION = threading.Condition(DEVICE_LOGIN_LOCK)
DEVICE_LOGIN: dict[str, Any] = {
    "active": False,
    "status": "idle",
    "output": "",
    "verification_uri": None,
    "user_code": None,
    "error": None,
    "returncode": None,
    "started_at": None,
    "completed_at": None,
    "process": None,
}
LOG_FILE = CONFIG_DIR / "ha_codex_bridge.log"
CODEX_HOME = CONFIG_DIR / "codex_home"
STARTED_AT = time.time()
MAX_BRIDGE_LINE_BYTES = 96 * 1024
MAX_BRIDGE_STDERR_BYTES = 128 * 1024
MAX_DEVICE_LOGIN_OUTPUT = 12_000
DEVICE_LOGIN_INITIAL_WAIT_SECONDS = 3
ANSI_ESCAPE_RE = re.compile(r"\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])")
DEVICE_CODE_RE = re.compile(r"\b[A-Z0-9]{4,8}(?:-[A-Z0-9]{4,8}){1,3}\b")
DEVICE_URL_RE = re.compile(r"https?://[^\s)>\]\"']+")


def bridge_log(message: str) -> None:
    """Append a bridge diagnostic message."""
    timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    with LOG_FILE.open("a", encoding="utf-8") as log_file:
        log_file.write(f"{timestamp} {message}\n")


class BridgeHandler(BaseHTTPRequestHandler):
    """HTTP endpoints for Codex bridge runs and approval decisions."""

    server_version = "ha-codex-bridge/0.1"

    def do_GET(self) -> None:  # noqa: N802
        """Route GET requests."""
        if self.path == "/health":
            self.handle_health()
            return
        if self.path == "/usage":
            self.handle_usage()
            return
        if self.path == "/auth/status":
            self.handle_auth_status()
            return
        if self.path == "/auth/device_login/status":
            self.handle_device_login_status()
            return
        self.send_error(404)

    def handle_health(self) -> None:
        """Return bridge health and runtime paths."""
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(
            json.dumps(
                {
                    "ok": True,
                    "config_dir": str(CONFIG_DIR),
                    "codex_home": str(CODEX_HOME),
                    "codex_home_exists": CODEX_HOME.is_dir(),
                    "started_at": STARTED_AT,
                    "uptime_seconds": max(0, int(time.time() - STARTED_AT)),
                }
            ).encode("utf-8")
        )

    def do_POST(self) -> None:  # noqa: N802
        """Route POST requests."""
        if self.path == "/run":
            self.handle_run()
            return
        if self.path.startswith("/approvals/"):
            self.handle_approval(self.path.rsplit("/", 1)[-1])
            return
        if self.path == "/auth/device_login/start":
            self.handle_device_login_start()
            return
        if self.path == "/auth/device_login/cancel":
            self.handle_device_login_cancel()
            return
        if self.path == "/auth/logout":
            self.handle_auth_logout()
            return
        self.send_error(404)

    def handle_run(self) -> None:
        """Run Codex and stream JSONL output."""
        payload = self.read_json()
        options = RunnerOptions(
            codex_command=str(payload.get("codex_command", "codex")),
            workspace_path=str(payload.get("workspace_path", "/homeassistant")),
            writable_paths=[str(path) for path in payload.get("writable_paths", [])],
            sandbox=str(payload.get("sandbox", "workspace-write")),
            approval_policy=str(payload.get("approval_policy", "on-request")),
        )
        command = build_codex_command(
            options,
            str(payload.get("prompt", "")),
            payload.get("codex_session_id"),
            include_question_guidance=True,
            run_settings=payload.get("run_settings")
            if isinstance(payload.get("run_settings"), dict)
            else None,
        )
        bridge_log(f"starting run command={json.dumps(command)}")
        process = subprocess.Popen(
            command,
            stdin=subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=self.codex_env(),
            text=True,
            bufsize=1,
        )
        stderr_lines: list[str] = []
        stderr_thread = self.start_stderr_reader(process, stderr_lines)
        self.send_response(200)
        self.send_header("Content-Type", "application/x-ndjson")
        self.end_headers()
        client_connected = True
        try:
            assert process.stdout is not None
            for line in process.stdout:
                line = self.compact_stream_line(line)
                try:
                    self.wfile.write(line.encode("utf-8"))
                    self.wfile.flush()
                except (BrokenPipeError, ConnectionResetError):
                    client_connected = False
                    bridge_log(f"client disconnected; terminating pid={process.pid}")
                    break

                approval_id = self.approval_id_from_line(line)
                if approval_id:
                    self.wait_for_approval(approval_id)

            if not client_connected and process.poll() is None:
                process.terminate()

            try:
                returncode = process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                bridge_log(f"kill timeout pid={process.pid}")
                process.kill()
                returncode = process.wait()

            stderr_thread.join(timeout=2)
            stderr = "".join(stderr_lines)
            bridge_log(
                f"run finished pid={process.pid} returncode={returncode} "
                f"stderr={stderr.strip()!r}"
            )
            if returncode != 0 and client_connected:
                self.write_jsonl(
                    {
                        "type": "error",
                        "message": stderr or f"Codex exited with code {returncode}",
                        "returncode": returncode,
                    }
                )
        finally:
            if process.poll() is None:
                bridge_log(f"killing unfinished pid={process.pid}")
                process.kill()
                process.wait()

    def start_stderr_reader(
        self,
        process: subprocess.Popen[str],
        stderr_lines: list[str],
    ) -> threading.Thread:
        """Drain child stderr while stdout is streamed."""

        def drain_stderr() -> None:
            assert process.stderr is not None
            total_bytes = 0
            for line in process.stderr:
                total_bytes += len(line.encode("utf-8", errors="replace"))
                stderr_lines.append(line)
                while total_bytes > MAX_BRIDGE_STDERR_BYTES and stderr_lines:
                    removed = stderr_lines.pop(0)
                    total_bytes -= len(removed.encode("utf-8", errors="replace"))

        thread = threading.Thread(
            target=drain_stderr,
            name=f"ha-codex-stderr-{process.pid}",
            daemon=True,
        )
        thread.start()
        return thread

    def handle_approval(self, approval_id: str) -> None:
        """Record an approval decision."""
        payload = self.read_json()
        with APPROVAL_CONDITION:
            APPROVALS[approval_id] = bool(payload.get("approved"))
            APPROVAL_CONDITION.notify_all()
        self.send_response(204)
        self.end_headers()

    def handle_usage(self) -> None:
        """Return Codex usage limits from the ChatGPT backend."""
        usage = fetch_codex_usage()
        bridge_log(
            "usage result "
            f"ok={usage.get('ok')} "
            f"five_hour={usage.get('five_hour_remaining_percent')} "
            f"weekly={usage.get('weekly_remaining_percent')} "
            f"error={usage.get('error')!r}"
        )
        self.send_response(200 if usage.get("ok") else 503)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(usage).encode("utf-8"))

    def handle_auth_status(self) -> None:
        """Return redacted Codex account status."""
        status = codex_auth_status(codex_env=self.codex_env())
        self.write_json_response(status, 200 if status.get("ok") else 503)

    def handle_device_login_start(self) -> None:
        """Start a Codex device-code login in the background."""
        status = start_device_login(codex_env=self.codex_env())
        self.write_json_response(status, 200 if status.get("ok") else 409)

    def handle_device_login_status(self) -> None:
        """Return current device-code login status."""
        self.write_json_response(device_login_status())

    def handle_device_login_cancel(self) -> None:
        """Cancel a pending Codex device-code login."""
        self.write_json_response(cancel_device_login())

    def handle_auth_logout(self) -> None:
        """Remove stored Codex credentials through the Codex CLI."""
        result = logout_codex(codex_env=self.codex_env())
        self.write_json_response(result, 200 if result.get("ok") else 500)

    def read_json(self) -> dict[str, Any]:
        """Read a JSON request body."""
        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0:
            return {}
        data = self.rfile.read(length).decode("utf-8")
        payload = json.loads(data)
        return payload if isinstance(payload, dict) else {}

    def write_jsonl(self, payload: dict[str, Any]) -> None:
        """Write one JSONL payload."""
        self.wfile.write((json.dumps(payload) + "\n").encode("utf-8"))
        self.wfile.flush()

    def write_json_response(self, payload: dict[str, Any], status: int = 200) -> None:
        """Write a JSON response."""
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def compact_stream_line(self, line: str) -> str:
        """Keep large non-message Codex events below aiohttp line limits."""
        if len(line.encode("utf-8")) <= MAX_BRIDGE_LINE_BYTES:
            return line
        try:
            payload = json.loads(line)
        except json.JSONDecodeError:
            return (
                json.dumps(
                    {
                        "type": "raw.truncated",
                        "message": (
                            "Codex emitted a non-JSON output line that was too large "
                            "to forward completely."
                        ),
                        "original_bytes": len(line.encode("utf-8")),
                    }
                )
                + "\n"
            )
        if not isinstance(payload, dict):
            return line

        event = normalize_event(payload)
        if event.kind in {"message", "message_delta", "error"}:
            return line

        compacted = compact_raw_event(payload)
        compacted["_ha_codex_truncated"] = True
        compacted["_ha_codex_original_bytes"] = len(line.encode("utf-8"))
        return json.dumps(compacted, separators=(",", ":")) + "\n"

    def approval_id_from_line(self, line: str) -> str | None:
        """Return approval id if a Codex event requests approval."""
        try:
            payload = json.loads(line)
        except json.JSONDecodeError:
            return None
        if not isinstance(payload, dict):
            return None
        event = normalize_event(payload)
        return event.approval_id if event.kind == "approval_required" else None

    def wait_for_approval(self, approval_id: str) -> bool:
        """Wait until Home Assistant posts an approval decision."""
        with APPROVAL_CONDITION:
            while approval_id not in APPROVALS:
                APPROVAL_CONDITION.wait(timeout=30)
            return APPROVALS.pop(approval_id)

    def codex_env(self) -> dict[str, str]:
        """Return environment for child Codex runs."""
        env = os.environ.copy()
        env["CODEX_HOME"] = str(CODEX_HOME)
        system_path = (
            f"{CONFIG_DIR}/bin:" "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
        )
        current_path = env.get("PATH", "")
        env["PATH"] = f"{system_path}:{current_path}" if current_path else system_path
        return env

    def log_message(self, format: str, *args: Any) -> None:
        """Use the default server logger format."""
        super().log_message(format, *args)


def fetch_codex_usage() -> dict[str, Any]:
    """Fetch Codex rate-limit usage using the local Codex ChatGPT token."""
    auth_path = CODEX_HOME / "auth.json"
    try:
        auth = json.loads(auth_path.read_text(encoding="utf-8"))
        tokens = auth.get("tokens", {})
        token = tokens.get("access_token")
        if not token:
            return usage_error("Codex ChatGPT access token was not found")
        account_id = tokens.get("account_id")
        headers = {
            "Accept": "application/json",
            "Authorization": f"Bearer {token}",
            "User-Agent": "codex-cli",
        }
        if account_id:
            headers["ChatGPT-Account-Id"] = str(account_id)
        request = Request(
            "https://chatgpt.com/backend-api/wham/usage",
            headers=headers,
        )
        with urlopen(request, timeout=10) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except HTTPError as err:
        return usage_error(f"ChatGPT usage request failed with HTTP {err.code}")
    except (OSError, URLError, json.JSONDecodeError) as err:
        return usage_error(str(err))

    snake_case_limits = extract_snake_case_limits(payload)
    if snake_case_limits:
        return {
            "ok": True,
            "five_hour_remaining_percent": remaining_percent(snake_case_limits.get("primary")),
            "weekly_remaining_percent": remaining_percent(snake_case_limits.get("secondary")),
            "five_hour_reset_at": reset_at(snake_case_limits.get("primary")),
            "weekly_reset_at": reset_at(snake_case_limits.get("secondary")),
        }

    limits = extract_codex_limits(payload)
    primary = limits.get("primary") if isinstance(limits, dict) else None
    secondary = limits.get("secondary") if isinstance(limits, dict) else None
    return {
        "ok": True,
        "five_hour_remaining_percent": remaining_percent(primary),
        "weekly_remaining_percent": remaining_percent(secondary),
        "five_hour_reset_at": reset_at(primary),
        "weekly_reset_at": reset_at(secondary),
    }


def codex_auth_status(
    *,
    codex_home: Path = CODEX_HOME,
    codex_command: str | None = None,
    codex_env: dict[str, str] | None = None,
) -> dict[str, Any]:
    """Return redacted account status for the bridge Codex home."""
    auth_path = codex_home / "auth.json"
    result: dict[str, Any] = {
        "ok": True,
        "logged_in": False,
        "auth_mode": None,
        "account_id": None,
        "last_refresh": None,
        "status_text": "Not logged in",
    }
    try:
        auth = json.loads(auth_path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return result
    except (OSError, json.JSONDecodeError) as err:
        return {**result, "ok": False, "error": str(err)}

    if not isinstance(auth, dict):
        return {**result, "ok": False, "error": "Codex auth file is invalid"}
    tokens = auth.get("tokens")
    if not isinstance(tokens, dict):
        tokens = {}
    auth_mode = str(auth.get("auth_mode") or "").strip() or None
    account_id = str(tokens.get("account_id") or "").strip() or None
    last_refresh = str(auth.get("last_refresh") or "").strip() or None
    logged_in = bool(auth_mode or tokens.get("access_token") or auth.get("OPENAI_API_KEY"))
    status_text = codex_login_status_text(codex_command=codex_command, codex_env=codex_env)
    if status_text:
        logged_in = logged_in or status_text.lower().startswith("logged in")
    return {
        "ok": True,
        "logged_in": logged_in,
        "auth_mode": auth_mode,
        "account_id": account_id,
        "last_refresh": last_refresh,
        "status_text": status_text or ("Logged in" if logged_in else "Not logged in"),
    }


def codex_login_status_text(
    *,
    codex_command: str | None = None,
    codex_env: dict[str, str] | None = None,
) -> str | None:
    """Return safe Codex login status text from the CLI."""
    command = [codex_command or str(CONFIG_DIR / "bin" / "codex"), "login", "status"]
    try:
        result = subprocess.run(
            command,
            stdin=subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=codex_env,
            text=True,
            timeout=10,
            check=False,
        )
    except (OSError, subprocess.TimeoutExpired):
        return None
    text = (result.stdout or result.stderr or "").strip()
    return sanitize_device_login_output(text) or None


def start_device_login(
    *,
    codex_command: str | None = None,
    codex_env: dict[str, str] | None = None,
) -> dict[str, Any]:
    """Start Codex device-code login if one is not already running."""
    command = [codex_command or str(CONFIG_DIR / "bin" / "codex"), "login", "--device-auth"]
    with DEVICE_LOGIN_CONDITION:
        process = DEVICE_LOGIN.get("process")
        if DEVICE_LOGIN.get("active") and process is not None and process.poll() is None:
            return {
                **device_login_status_locked(),
                "ok": False,
                "error": "Device login is already running",
            }
        reset_device_login_locked()
        DEVICE_LOGIN.update(
            {
                "active": True,
                "status": "pending",
                "started_at": time.time(),
                "process": None,
            }
        )
        try:
            process = subprocess.Popen(
                command,
                stdin=subprocess.DEVNULL,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                env=codex_env,
                text=True,
                bufsize=1,
            )
        except OSError as err:
            DEVICE_LOGIN.update(
                {
                    "active": False,
                    "status": "failed",
                    "error": str(err),
                    "completed_at": time.time(),
                }
            )
            return {**device_login_status_locked(), "ok": False}
        DEVICE_LOGIN["process"] = process
        threading.Thread(
            target=watch_device_login_process,
            args=(process,),
            name=f"ha-codex-device-login-{process.pid}",
            daemon=True,
        ).start()
        deadline = time.time() + DEVICE_LOGIN_INITIAL_WAIT_SECONDS
        while time.time() < deadline and DEVICE_LOGIN["status"] == "pending":
            if (
                DEVICE_LOGIN.get("verification_uri")
                or DEVICE_LOGIN.get("user_code")
                or DEVICE_LOGIN.get("output")
            ):
                break
            DEVICE_LOGIN_CONDITION.wait(timeout=0.2)
        return {**device_login_status_locked(), "ok": True}


def watch_device_login_process(process: subprocess.Popen[str]) -> None:
    """Capture device-login output and completion status."""
    assert process.stdout is not None
    assert process.stderr is not None

    def read_stream(stream: Any) -> None:
        for line in stream:
            append_device_login_output(line)

    stdout_thread = threading.Thread(target=read_stream, args=(process.stdout,), daemon=True)
    stderr_thread = threading.Thread(target=read_stream, args=(process.stderr,), daemon=True)
    stdout_thread.start()
    stderr_thread.start()
    returncode = process.wait()
    stdout_thread.join(timeout=1)
    stderr_thread.join(timeout=1)
    with DEVICE_LOGIN_CONDITION:
        DEVICE_LOGIN["returncode"] = returncode
        DEVICE_LOGIN["completed_at"] = time.time()
        DEVICE_LOGIN["active"] = False
        if DEVICE_LOGIN.get("status") == "canceled":
            pass
        elif returncode == 0:
            DEVICE_LOGIN["status"] = "succeeded"
        else:
            DEVICE_LOGIN["status"] = "failed"
            DEVICE_LOGIN["error"] = (
                DEVICE_LOGIN.get("error") or f"Codex login exited with code {returncode}"
            )
        DEVICE_LOGIN_CONDITION.notify_all()
    bridge_log(f"device login finished returncode={returncode}")


def append_device_login_output(line: str) -> None:
    """Record sanitized device-login output and parse URL/code hints."""
    safe_line = sanitize_device_login_output(line)
    with DEVICE_LOGIN_CONDITION:
        output = str(DEVICE_LOGIN.get("output") or "") + safe_line
        DEVICE_LOGIN["output"] = output[-MAX_DEVICE_LOGIN_OUTPUT:]
        parsed = parse_device_login_output(DEVICE_LOGIN["output"])
        DEVICE_LOGIN["verification_uri"] = parsed.get("verification_uri") or DEVICE_LOGIN.get(
            "verification_uri"
        )
        DEVICE_LOGIN["user_code"] = parsed.get("user_code") or DEVICE_LOGIN.get("user_code")
        DEVICE_LOGIN_CONDITION.notify_all()


def parse_device_login_output(output: str) -> dict[str, str | None]:
    """Parse safe device-login URL and user code from CLI output."""
    urls = DEVICE_URL_RE.findall(output or "")
    verification_uri = None
    for url in urls:
        url = clean_device_login_url(url)
        lowered = url.lower()
        if "device" in lowered or "openai" in lowered or "auth" in lowered:
            verification_uri = url
            break
    if verification_uri is None and urls:
        verification_uri = clean_device_login_url(urls[0])
    code_match = DEVICE_CODE_RE.search(output or "")
    return {
        "verification_uri": verification_uri,
        "user_code": code_match.group(0) if code_match else None,
    }


def clean_device_login_url(url: str) -> str:
    """Remove terminal reset artifacts from a parsed device-login URL."""
    cleaned = ANSI_ESCAPE_RE.sub("", str(url or ""))
    cleaned = re.sub(r"(?i)(?:%1b|%001b|%u001b|\\x1b|\\u001b)(?:\[[0-?]*[ -/]*[@-~])?", "", cleaned)
    return cleaned.rstrip(".,;:")


def sanitize_device_login_output(output: str) -> str:
    """Remove known credential-like values from CLI output."""
    sanitized = ANSI_ESCAPE_RE.sub("", str(output or ""))
    sanitized = re.sub(
        r"(?i)(?:%1b|%001b|%u001b|\\x1b|\\u001b)(?:\[[0-?]*[ -/]*[@-~])?", "", sanitized
    )
    sanitized = re.sub(
        r"(?i)(access_token|refresh_token|id_token|api[_-]?key)[=:]\S+", r"\1=[redacted]", sanitized
    )
    sanitized = re.sub(r"sk-[A-Za-z0-9_-]+", "sk-[redacted]", sanitized)
    return sanitized


def device_login_status() -> dict[str, Any]:
    """Return a copy of current device-login state."""
    with DEVICE_LOGIN_CONDITION:
        return device_login_status_locked()


def device_login_status_locked() -> dict[str, Any]:
    """Return current device-login state while the lock is held."""
    process = DEVICE_LOGIN.get("process")
    active = bool(DEVICE_LOGIN.get("active") and process is not None and process.poll() is None)
    return {
        "ok": DEVICE_LOGIN.get("status") != "failed",
        "active": active,
        "status": DEVICE_LOGIN.get("status"),
        "verification_uri": DEVICE_LOGIN.get("verification_uri"),
        "user_code": DEVICE_LOGIN.get("user_code"),
        "output": DEVICE_LOGIN.get("output") or "",
        "error": DEVICE_LOGIN.get("error"),
        "returncode": DEVICE_LOGIN.get("returncode"),
        "started_at": DEVICE_LOGIN.get("started_at"),
        "completed_at": DEVICE_LOGIN.get("completed_at"),
    }


def reset_device_login_locked() -> None:
    """Reset stored device-login state while the lock is held."""
    DEVICE_LOGIN.clear()
    DEVICE_LOGIN.update(
        {
            "active": False,
            "status": "idle",
            "output": "",
            "verification_uri": None,
            "user_code": None,
            "error": None,
            "returncode": None,
            "started_at": None,
            "completed_at": None,
            "process": None,
        }
    )


def cancel_device_login() -> dict[str, Any]:
    """Terminate a pending device-login process."""
    with DEVICE_LOGIN_CONDITION:
        process = DEVICE_LOGIN.get("process")
        if not DEVICE_LOGIN.get("active") or process is None or process.poll() is not None:
            return device_login_status_locked()
        DEVICE_LOGIN["status"] = "canceled"
        DEVICE_LOGIN["active"] = False
        DEVICE_LOGIN["completed_at"] = time.time()
        process.terminate()
        DEVICE_LOGIN_CONDITION.notify_all()
        return device_login_status_locked()


def logout_codex(
    *,
    codex_command: str | None = None,
    codex_env: dict[str, str] | None = None,
) -> dict[str, Any]:
    """Run Codex logout and return refreshed account status."""
    command = [codex_command or str(CONFIG_DIR / "bin" / "codex"), "logout"]
    try:
        result = subprocess.run(
            command,
            stdin=subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=codex_env,
            text=True,
            timeout=30,
            check=False,
        )
    except (OSError, subprocess.TimeoutExpired) as err:
        return {"ok": False, "error": str(err), "account": codex_auth_status(codex_env=codex_env)}
    ok = result.returncode == 0
    return {
        "ok": ok,
        "returncode": result.returncode,
        "stdout": sanitize_device_login_output(result.stdout or ""),
        "stderr": sanitize_device_login_output(result.stderr or ""),
        "account": codex_auth_status(codex_env=codex_env),
    }


def extract_codex_limits(payload: dict[str, Any]) -> dict[str, Any]:
    """Extract the Codex rate-limit bucket from known response shapes."""
    candidates = [payload]
    result = payload.get("result")
    if isinstance(result, dict):
        candidates.append(result)

    for candidate in candidates:
        limits_by_id = candidate.get("rateLimitsByLimitId")
        if isinstance(limits_by_id, dict) and isinstance(limits_by_id.get("codex"), dict):
            return limits_by_id["codex"]

        limits = candidate.get("rateLimits")
        if isinstance(limits, dict) and (
            limits.get("limitId") == "codex" or isinstance(limits.get("primary"), dict)
        ):
            return limits

    return {}


def extract_snake_case_limits(payload: dict[str, Any]) -> dict[str, Any]:
    """Extract Codex usage from wham/usage snake_case responses."""
    rate_limit = payload.get("rate_limit")
    if not isinstance(rate_limit, dict):
        return {}
    return {
        "primary": rate_limit.get("primary_window"),
        "secondary": rate_limit.get("secondary_window"),
    }


def remaining_percent(window: Any) -> int | float | None:
    """Convert a Codex usage window into remaining percent."""
    if not isinstance(window, dict):
        return None
    used = window.get("usedPercent", window.get("used_percent"))
    if not isinstance(used, int | float):
        return None
    return max(0, min(100, 100 - used))


def reset_at(window: Any) -> int | float | None:
    """Return the reset timestamp from a Codex usage window."""
    if not isinstance(window, dict):
        return None
    value = window.get("reset_at", window.get("resetAt"))
    return value if isinstance(value, int | float) else None


def usage_error(error: str) -> dict[str, Any]:
    """Build an unavailable usage response."""
    return {
        "ok": False,
        "error": error,
        "five_hour_remaining_percent": None,
        "weekly_remaining_percent": None,
        "five_hour_reset_at": None,
        "weekly_reset_at": None,
    }


def main() -> None:
    """Run the bridge server."""
    server = ThreadingHTTPServer(("127.0.0.1", 8765), BridgeHandler)
    print("HA Codex bridge listening on http://127.0.0.1:8765", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
