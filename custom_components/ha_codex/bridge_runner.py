"""Optional HTTP bridge runner for HA Codex."""

from __future__ import annotations

import json
from collections.abc import AsyncIterator, Awaitable, Callable
from typing import Any

from .bridge_control import async_restart_bridge_service
from .codex_events import NormalizedEvent, normalize_event
from .runner import RunnerOptions

BRIDGE_READ_BUFSIZE = 1024 * 1024


class CodexBridgeRunner:
    """Stream Codex JSONL events from a companion bridge service."""

    def __init__(self, bridge_url: str, options: RunnerOptions) -> None:
        """Initialize the bridge runner."""
        self.bridge_url = bridge_url.rstrip("/")
        self.options = options

    async def run(
        self,
        prompt: str,
        codex_session_id: str | None,
        approval_handler: Callable[[NormalizedEvent], Awaitable[bool]] | None = None,
        run_settings: dict[str, Any] | None = None,
    ) -> AsyncIterator[NormalizedEvent]:
        """Run Codex through the bridge and yield normalized events."""
        from aiohttp import ClientConnectionError

        payload = self._payload(prompt, codex_session_id, run_settings)
        try:
            async for event in self._stream_run(payload, approval_handler):
                yield event
        except ClientConnectionError:
            yield NormalizedEvent(
                "action",
                text="Cannot connect to Codex bridge. Restarting bridge and retrying once.",
                raw={"bridge_url": self.bridge_url},
            )
            await self._restart_bridge()
            async for event in self._stream_run(payload, approval_handler):
                yield event

    def _payload(
        self,
        prompt: str,
        codex_session_id: str | None,
        run_settings: dict[str, Any] | None,
    ) -> dict[str, object]:
        """Build the bridge request payload."""
        return {
            "prompt": prompt,
            "codex_session_id": codex_session_id,
            "codex_command": self.options.codex_command,
            "workspace_path": self.options.workspace_path,
            "writable_paths": self.options.writable_paths,
            "sandbox": self.options.sandbox,
            "approval_policy": self.options.approval_policy,
            "run_settings": run_settings or {},
        }

    async def _stream_run(
        self,
        payload: dict[str, object],
        approval_handler: Callable[[NormalizedEvent], Awaitable[bool]] | None,
    ) -> AsyncIterator[NormalizedEvent]:
        """Stream one bridge run attempt."""
        from aiohttp import ClientSession

        async with ClientSession(read_bufsize=BRIDGE_READ_BUFSIZE) as session:
            async with session.post(f"{self.bridge_url}/run", json=payload) as response:
                response.raise_for_status()
                async for raw_line in response.content:
                    line = raw_line.decode(errors="replace").strip()
                    if not line:
                        continue
                    try:
                        data = json.loads(line)
                    except json.JSONDecodeError:
                        yield NormalizedEvent("raw", text=line, raw={"line": line})
                        continue
                    event = normalize_event(data)
                    if event.kind == "approval_required" and approval_handler is not None:
                        decision = await approval_handler(event)
                        await session.post(
                            f"{self.bridge_url}/approvals/{event.approval_id}",
                            json={"approved": decision},
                        )
                    yield event

    async def _restart_bridge(self) -> None:
        """Restart the companion bridge service."""
        result = await async_restart_bridge_service()
        if not result.get("ok"):
            raise RuntimeError(f"Unable to restart HA Codex bridge: {result.get('error')}")
