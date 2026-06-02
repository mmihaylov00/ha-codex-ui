"""Codex process runner."""

from __future__ import annotations

import asyncio
import json
from collections.abc import AsyncIterator, Awaitable, Callable
from dataclasses import dataclass, field
from typing import Any

from .codex_events import NormalizedEvent, normalize_event

QUESTION_GUIDANCE = """

HA Codex question protocol:
When you are not sure how to proceed and the uncertainty materially affects the
result, ask the user one focused question instead of guessing. Put the question
at the end of your assistant response in exactly this form:

<ha_codex_question>
{"question":"What should I do?","choices":[{"label":"Recommended answer","description":"Why this answer is useful."},{"label":"Second answer","description":"Tradeoff for this answer."},{"label":"Third answer","description":"Tradeoff for this answer."}],"custom_placeholder":"Describe another direction..."}
</ha_codex_question>

Use exactly three choices. Keep labels short. Descriptions should explain the
impact of each choice. The user may select a choice or type a custom answer.
"""


@dataclass(frozen=True)
class RunnerOptions:
    """Options used to launch Codex."""

    codex_command: str
    workspace_path: str
    writable_paths: list[str] = field(default_factory=list)
    sandbox: str = "danger-full-access"
    approval_policy: str = "on-request"


def build_codex_command(
    options: RunnerOptions,
    prompt: str,
    codex_session_id: str | None,
    *,
    include_question_guidance: bool = False,
    run_settings: dict[str, Any] | None = None,
) -> list[str]:
    """Build a Codex CLI command for a new or resumed session."""
    command_prompt = with_question_guidance(prompt) if include_question_guidance else prompt
    model = str(run_settings.get("model") or "").strip() if run_settings else ""
    reasoning_effort = (
        str(run_settings.get("reasoning_effort") or "").strip()
        if run_settings and run_settings.get("reasoning_effort") != "auto"
        else ""
    )
    verbosity = (
        str(run_settings.get("verbosity") or "").strip()
        if run_settings and run_settings.get("verbosity") != "auto"
        else ""
    )
    if codex_session_id:
        command = [
            options.codex_command,
            "exec",
            "resume",
            "--json",
        ]
        if model:
            command.extend(["-m", model])
        command.extend(
            [
                "-c",
                f'sandbox_mode="{options.sandbox}"',
                "-c",
                "shell_environment_policy.inherit=all",
            ]
        )
        _append_runtime_config(command, reasoning_effort, verbosity)
        command.extend(
            [
                "--skip-git-repo-check",
                codex_session_id,
                command_prompt,
            ]
        )
    else:
        command = [
            options.codex_command,
            "exec",
            "--json",
            "-C",
            options.workspace_path,
        ]
        if model:
            command.extend(["-m", model])
        command.extend(
            [
                "-s",
                options.sandbox,
                "-c",
                "shell_environment_policy.inherit=all",
            ]
        )
        _append_runtime_config(command, reasoning_effort, verbosity)
        command.extend(
            [
                "--skip-git-repo-check",
            ]
        )
        for path in options.writable_paths:
            command.extend(["--add-dir", path])
        command.append(command_prompt)
    return command


def _append_runtime_config(command: list[str], reasoning_effort: str, verbosity: str) -> None:
    """Append Codex config overrides for supported runtime settings."""
    if reasoning_effort:
        command.extend(["-c", f'model_reasoning_effort="{reasoning_effort}"'])
    if verbosity:
        command.extend(["-c", f'model_verbosity="{verbosity}"'])


def with_question_guidance(prompt: str) -> str:
    """Attach UI-readable question guidance to the Codex prompt."""
    return f"{prompt.rstrip()}{QUESTION_GUIDANCE}"


class CodexProcessRunner:
    """Run Codex and stream normalized JSONL events."""

    def __init__(self, options: RunnerOptions) -> None:
        """Initialize the runner."""
        self.options = options

    async def run(
        self,
        prompt: str,
        codex_session_id: str | None,
        approval_handler: Callable[[NormalizedEvent], Awaitable[bool]] | None = None,
        run_settings: dict[str, Any] | None = None,
    ) -> AsyncIterator[NormalizedEvent]:
        """Run Codex and yield normalized events."""
        command = build_codex_command(
            self.options,
            prompt,
            codex_session_id,
            include_question_guidance=True,
            run_settings=run_settings,
        )
        process = await asyncio.create_subprocess_exec(
            *command,
            stdin=asyncio.subprocess.DEVNULL,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        assert process.stdout is not None

        async for raw_line in process.stdout:
            line = raw_line.decode(errors="replace").strip()
            if not line:
                continue
            try:
                payload = json.loads(line)
            except json.JSONDecodeError:
                yield NormalizedEvent("raw", text=line, raw={"line": line})
                continue
            if isinstance(payload, dict):
                event = normalize_event(payload)
                if event.kind == "approval_required" and approval_handler is not None:
                    decision_task = asyncio.create_task(approval_handler(event))
                    yield event
                    await decision_task
                    continue
                yield event

        stderr = ""
        if process.stderr is not None:
            stderr = (await process.stderr.read()).decode(errors="replace").strip()
        returncode = await process.wait()
        if returncode != 0:
            yield NormalizedEvent(
                "error",
                text=stderr or f"Codex exited with code {returncode}",
                raw={"returncode": returncode, "stderr": stderr},
            )
        yield NormalizedEvent("run_finished", raw={"returncode": returncode})
