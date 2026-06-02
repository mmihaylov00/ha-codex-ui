"""Session title helpers for HA Codex."""

from __future__ import annotations

import re

_TITLE_MAX_LENGTH = 48
_TITLE_MAX_WORDS = 6
_TITLE_LEADING_RE = re.compile(
    r"^(please\s+)?"
    r"(?:(can|could|would)\s+you\s+|"
    r"(i\s+need\s+you\s+to|help\s+me\s+|"
    r"use\s+|add\s+|create\s+|update\s+|fix\s+|change\s+|make\s+|set\s+|turn\s+on\s+|turn\s+off\s+))",
    re.IGNORECASE,
)
_TITLE_TRAILING_RE = re.compile(r"\s+\b(instead of|rather than|by default)\b.*$", re.IGNORECASE)
_TITLE_STOP_WORDS = {
    "a",
    "an",
    "and",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "that",
    "the",
    "this",
    "to",
    "with",
}


def summarize_prompt_title(prompt: str) -> str:
    """Build a concise default chat title from the first user prompt."""
    text = " ".join(line.strip() for line in prompt.splitlines() if line.strip())
    if not text:
        return "New chat"

    text = re.sub(r"`([^`]+)`", r"\1", text)
    while True:
        shortened = _TITLE_LEADING_RE.sub("", text).strip()
        if shortened == text:
            break
        text = shortened
    text = _TITLE_TRAILING_RE.sub("", text).strip()
    text = re.split(r"[.?!]\s+", text, maxsplit=1)[0].strip()
    words = re.findall(r"[A-Za-z0-9][A-Za-z0-9_./'-]*", text)
    title_words = [
        _format_title_word(word.strip("'\".,:;()[]{}"))
        for word in words
        if word.strip("'\".,:;()[]{}").lower() not in _TITLE_STOP_WORDS
    ][:_TITLE_MAX_WORDS]

    if not title_words:
        title_words = [_format_title_word(word) for word in words[:_TITLE_MAX_WORDS]]
    return _trim_title(" ".join(title_words)) or "New chat"


def _format_title_word(word: str) -> str:
    if not word:
        return ""
    if word.isupper() or any(char in word for char in "./_"):
        return word
    return word[:1].upper() + word[1:].lower()


def _trim_title(title: str) -> str:
    if len(title) <= _TITLE_MAX_LENGTH:
        return title
    trimmed = title[:_TITLE_MAX_LENGTH].rsplit(" ", 1)[0].strip()
    return trimmed or title[:_TITLE_MAX_LENGTH].strip()
