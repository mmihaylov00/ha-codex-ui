"""Serializable state models for HA Codex."""

from __future__ import annotations

from dataclasses import dataclass, field
from time import time
from typing import Any
from uuid import uuid4


def utc_timestamp() -> float:
    """Return a simple UTC timestamp for storage and sorting."""
    return time()


@dataclass
class ChatMessage:
    """A persisted chat message."""

    role: str
    content: str
    id: int | None = None
    created_at: float = field(default_factory=utc_timestamp)
    metadata: dict[str, Any] = field(default_factory=dict)

    def to_dict(self, message_id: int | None = None) -> dict[str, Any]:
        """Serialize the message for HA storage."""
        payload = {
            "role": self.role,
            "content": self.content,
            "created_at": self.created_at,
            "metadata": self.metadata,
        }
        payload["id"] = self.id if message_id is None else message_id
        return payload

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ChatMessage":
        """Deserialize a message from HA storage."""
        return cls(
            id=int(data["id"]) if data.get("id") is not None else None,
            role=str(data.get("role", "assistant")),
            content=str(data.get("content", "")),
            created_at=float(data.get("created_at", utc_timestamp())),
            metadata=dict(data.get("metadata") or {}),
        )


@dataclass
class PendingApproval:
    """A shell approval request surfaced by Codex."""

    id: str
    session_id: str
    command: str
    cwd: str | None = None
    reason: str | None = None
    status: str = "pending"
    created_at: float = field(default_factory=utc_timestamp)

    def to_dict(self) -> dict[str, Any]:
        """Serialize the approval for HA storage."""
        return {
            "id": self.id,
            "session_id": self.session_id,
            "command": self.command,
            "cwd": self.cwd,
            "reason": self.reason,
            "status": self.status,
            "created_at": self.created_at,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "PendingApproval":
        """Deserialize an approval from HA storage."""
        return cls(
            id=str(data.get("id", uuid4())),
            session_id=str(data.get("session_id", "")),
            command=str(data.get("command", "")),
            cwd=data.get("cwd"),
            reason=data.get("reason"),
            status=str(data.get("status", "pending")),
            created_at=float(data.get("created_at", utc_timestamp())),
        )


@dataclass
class ValidationResult:
    """Result from a Home Assistant config validation run."""

    status: str = "unknown"
    command: list[str] = field(default_factory=list)
    returncode: int | None = None
    stdout: str = ""
    stderr: str = ""
    created_at: float = field(default_factory=utc_timestamp)
    summary: dict[str, Any] | None = None

    def to_dict(self) -> dict[str, Any]:
        """Serialize validation output for HA storage."""
        return {
            "status": self.status,
            "command": self.command,
            "returncode": self.returncode,
            "stdout": self.stdout,
            "stderr": self.stderr,
            "created_at": self.created_at,
            "summary": self.summary,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any] | None) -> "ValidationResult | None":
        """Deserialize validation output from HA storage."""
        if not data:
            return None
        return cls(
            status=str(data.get("status", "unknown")),
            command=[str(part) for part in data.get("command", [])],
            returncode=data.get("returncode"),
            stdout=str(data.get("stdout", "")),
            stderr=str(data.get("stderr", "")),
            created_at=float(data.get("created_at", utc_timestamp())),
            summary=dict(data.get("summary") or {}) if data.get("summary") else None,
        )


@dataclass
class CodexSession:
    """A persisted Codex chat session."""

    id: str = field(default_factory=lambda: str(uuid4()))
    title: str = "New chat"
    messages: list[ChatMessage] = field(default_factory=list)
    approvals: list[PendingApproval] = field(default_factory=list)
    codex_session_id: str | None = None
    status: str = "idle"
    validation: ValidationResult | None = None
    archived_at: float | None = None
    metadata: dict[str, Any] = field(default_factory=dict)
    next_message_id: int = 1
    created_at: float = field(default_factory=utc_timestamp)
    updated_at: float = field(default_factory=utc_timestamp)

    def to_dict(
        self,
        *,
        include_messages: bool = True,
        include_message_ids: bool = False,
    ) -> dict[str, Any]:
        """Serialize a session for HA storage."""
        payload = {
            "id": self.id,
            "title": self.title,
            "approvals": [approval.to_dict() for approval in self.approvals],
            "codex_session_id": self.codex_session_id,
            "status": self.status,
            "validation": self.validation.to_dict() if self.validation else None,
            "archived": self.archived_at is not None,
            "archived_at": self.archived_at,
            "metadata": self.metadata,
            "last_message_id": self.last_message_id(),
            "last_user_message_at": self.last_user_message_at(),
            "next_message_id": self.next_message_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
        if include_messages:
            payload["messages"] = [
                message.to_dict(index if include_message_ids else None)
                for index, message in enumerate(self.messages, 1)
            ]
        return payload

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "CodexSession":
        """Deserialize a session from HA storage."""
        messages = [
            ChatMessage.from_dict(message)
            for message in data.get("messages", [])
            if isinstance(message, dict)
        ]
        next_message_id = int(data.get("next_message_id") or 1)
        for message in messages:
            if message.id is None:
                message.id = next_message_id
                next_message_id += 1
            else:
                next_message_id = max(next_message_id, int(message.id) + 1)
        return cls(
            id=str(data.get("id", uuid4())),
            title=str(data.get("title", "New chat")),
            messages=messages,
            approvals=[
                PendingApproval.from_dict(approval)
                for approval in data.get("approvals", [])
                if isinstance(approval, dict)
            ],
            codex_session_id=data.get("codex_session_id"),
            status=str(data.get("status", "idle")),
            validation=ValidationResult.from_dict(data.get("validation")),
            archived_at=(
                float(data.get("archived_at"))
                if data.get("archived_at") is not None
                else utc_timestamp()
                if data.get("archived")
                else None
            ),
            metadata=dict(data.get("metadata") or {}),
            next_message_id=next_message_id,
            created_at=float(data.get("created_at", utc_timestamp())),
            updated_at=float(data.get("updated_at", utc_timestamp())),
        )

    def touch(self) -> None:
        """Update the session modified timestamp."""
        self.updated_at = utc_timestamp()

    def assign_message_id(self, message: ChatMessage) -> ChatMessage:
        """Assign the next per-session message id if the message does not have one."""
        if message.id is None:
            message.id = self.next_message_id
            self.next_message_id += 1
        else:
            self.next_message_id = max(self.next_message_id, int(message.id) + 1)
        return message

    def last_message_id(self) -> int:
        """Return the highest assigned message id."""
        ids = [int(message.id) for message in self.messages if message.id is not None]
        return max(ids, default=len(self.messages))

    def last_user_message_at(self) -> float | None:
        """Return the creation time of the newest user message."""
        for message in reversed(self.messages):
            if message.role == "user":
                return message.created_at
        return None
