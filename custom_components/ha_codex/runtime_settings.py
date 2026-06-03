"""Runtime settings normalization and auto-mode resolution."""

from __future__ import annotations

import json
import re
from typing import Any

DEFAULT_CONTEXT_BUDGET_CHARS = 40_000
DEFAULT_MODEL_PRESET_ID = "gpt_5_5"
LEGACY_DEFAULT_MODEL_PRESET_ID = "codex_default"
BUILT_IN_MODEL_PRESETS = [
    {"id": "gpt_5_5", "label": "GPT-5.5", "model": "gpt-5.5"},
    {"id": "gpt_5_4", "label": "GPT-5.4", "model": "gpt-5.4"},
    {"id": "gpt_5_4_mini", "label": "GPT-5.4-Mini", "model": "gpt-5.4-mini"},
    {"id": "gpt_5_3_codex", "label": "GPT-5.3-Codex", "model": "gpt-5.3-codex"},
    {
        "id": "gpt_5_3_codex_spark",
        "label": "GPT-5.3-Codex-Spark",
        "model": "gpt-5.3-codex-spark",
    },
    {"id": "gpt_5_2", "label": "GPT-5.2", "model": "gpt-5.2"},
]

_RUN_SETTING_VALUES = {
    "mode": {"auto", "manual"},
    "reasoning_effort": {"auto", "minimal", "low", "medium", "high", "xhigh"},
    "verbosity": {"auto", "low", "medium", "high"},
    "plan_mode": {"auto", "always", "off"},
    "validation_depth": {"auto", "none", "full"},
    "tool_visibility": {"compact", "normal", "verbose"},
    "approval_mode": {"ask", "auto_readonly"},
}

_DEFAULT_RUN_SETTINGS = {
    "mode": "auto",
    "model_preset_id": DEFAULT_MODEL_PRESET_ID,
    "reasoning_effort": "auto",
    "verbosity": "auto",
    "plan_mode": "auto",
    "validation_depth": "auto",
    "tool_visibility": "normal",
    "approval_mode": "ask",
}

_MODIFYING_PROMPT_RE = re.compile(
    r"\b(add|adjust|build|change|configure|convert|create|delete|disable|edit|enable|fix|"
    r"implement|install|make|modify|move|remove|rename|replace|set up|update|write)\b",
    re.IGNORECASE,
)
_READ_ONLY_PROMPT_RE = re.compile(
    r"^\s*(analy[sz]e|check|describe|diagnose|explain|find|how|inspect|list|"
    r"review|show|summari[sz]e|what|why)\b",
    re.IGNORECASE,
)
_RISKY_TARGET_RE = re.compile(
    r"(configuration\.ya?ml|custom_components/|www/ha_codex/|panel\.js|"
    r"\bautomations?\b|\bscripts?\b|\bscenes?\b|\bthemes?\b|\blovelace\b|"
    r"\bfrontend\b|\bdashboard\b)",
    re.IGNORECASE,
)


def default_run_settings() -> dict[str, str]:
    """Return default per-run settings."""
    return dict(_DEFAULT_RUN_SETTINGS)


def default_settings() -> dict[str, Any]:
    """Return default persisted settings."""
    return {
        "defaults": default_run_settings(),
        "model_presets": [dict(preset) for preset in BUILT_IN_MODEL_PRESETS],
        "context_budget_chars": DEFAULT_CONTEXT_BUDGET_CHARS,
    }


def normalize_settings(data: dict[str, Any] | None) -> dict[str, Any]:
    """Normalize a stored settings payload, filling missing defaults."""
    settings = default_settings()
    if not isinstance(data, dict):
        return settings
    presets = normalize_model_presets(data.get("model_presets", settings["model_presets"]))
    settings["model_presets"] = presets
    settings["defaults"] = normalize_run_settings(data.get("defaults"), settings["defaults"])
    settings["context_budget_chars"] = _normalize_context_budget(
        data.get("context_budget_chars", DEFAULT_CONTEXT_BUDGET_CHARS)
    )
    if settings["defaults"]["model_preset_id"] == LEGACY_DEFAULT_MODEL_PRESET_ID or settings[
        "defaults"
    ]["model_preset_id"] not in _preset_ids(presets):
        settings["defaults"]["model_preset_id"] = DEFAULT_MODEL_PRESET_ID
    return settings


def update_settings(current: dict[str, Any] | None, update: dict[str, Any]) -> dict[str, Any]:
    """Apply a validated partial settings update."""
    if not isinstance(update, dict):
        raise ValueError("Settings update must be an object")
    settings = normalize_settings(current)
    if "model_presets" in update:
        settings["model_presets"] = normalize_model_presets(update["model_presets"])
    if "defaults" in update:
        settings["defaults"] = normalize_run_settings(update["defaults"], settings["defaults"])
    if "context_budget_chars" in update:
        settings["context_budget_chars"] = _normalize_context_budget(update["context_budget_chars"])

    preset_ids = _preset_ids(settings["model_presets"])
    if settings["defaults"]["model_preset_id"] == LEGACY_DEFAULT_MODEL_PRESET_ID:
        settings["defaults"]["model_preset_id"] = DEFAULT_MODEL_PRESET_ID
    elif settings["defaults"]["model_preset_id"] not in preset_ids:
        if isinstance(update.get("defaults"), dict) and "model_preset_id" in update["defaults"]:
            raise ValueError("model_preset_id must reference a saved model preset")
        settings["defaults"]["model_preset_id"] = DEFAULT_MODEL_PRESET_ID
    return settings


def normalize_run_settings(
    data: dict[str, Any] | None,
    base: dict[str, Any] | None = None,
) -> dict[str, str]:
    """Normalize a partial run-settings payload against a base."""
    settings = dict(base or _DEFAULT_RUN_SETTINGS)
    if not isinstance(data, dict):
        return settings
    for key, value in data.items():
        if key == "model_preset_id":
            preset_id = str(value or "").strip()
            if not preset_id:
                raise ValueError("model_preset_id is required")
            settings[key] = preset_id
            continue
        if key not in _RUN_SETTING_VALUES:
            continue
        normalized = str(value or "").strip()
        if normalized not in _RUN_SETTING_VALUES[key]:
            raise ValueError(f"{key} must be one of {sorted(_RUN_SETTING_VALUES[key])}")
        settings[key] = normalized
    return settings


def normalize_model_presets(value: Any) -> list[dict[str, str | None]]:
    """Normalize model presets, always preserving the built-in default."""
    presets: list[dict[str, str | None]] = [dict(preset) for preset in BUILT_IN_MODEL_PRESETS]
    seen = {str(preset["id"]) for preset in BUILT_IN_MODEL_PRESETS}
    seen.add(LEGACY_DEFAULT_MODEL_PRESET_ID)
    if not isinstance(value, list):
        return presets
    for item in value:
        if not isinstance(item, dict):
            continue
        preset_id = str(item.get("id") or "").strip()
        if not preset_id or preset_id in seen:
            continue
        label = str(item.get("label") or preset_id).strip()
        model_value = item.get("model")
        model = str(model_value).strip() if model_value is not None else None
        presets.append({"id": preset_id, "label": label or preset_id, "model": model or None})
        seen.add(preset_id)
    return presets


def resolve_run_settings(
    prompt: str,
    context: list[dict[str, Any]] | None,
    defaults: dict[str, Any] | None,
    chat_override: dict[str, Any] | None,
) -> dict[str, Any]:
    """Resolve auto/manual run settings for a prompt and selected context."""
    base = normalize_run_settings(defaults)
    requested = normalize_run_settings(chat_override, base)
    text = _prompt_context_text(prompt, context or [])
    modifying = bool(_MODIFYING_PROMPT_RE.search(text))
    read_only = bool(_READ_ONLY_PROMPT_RE.search(str(prompt or ""))) and not modifying
    risky = bool(modifying and _RISKY_TARGET_RE.search(text))
    inferred = _inferred_settings(read_only=read_only, modifying=modifying, risky=risky)
    resolved = dict(requested)
    for key in ("reasoning_effort", "verbosity", "plan_mode", "validation_depth"):
        if resolved.get(key) == "auto":
            resolved[key] = inferred[key]
    return {
        "requested": requested,
        "resolved": resolved,
        "inferred": inferred,
        "read_only": read_only,
        "modifying": modifying,
        "risky": risky,
    }


def model_for_preset(settings: dict[str, Any], preset_id: str | None) -> str | None:
    """Return the model string for a saved preset id."""
    normalized = normalize_settings(settings)
    selected = str(preset_id or normalized["defaults"]["model_preset_id"])
    for preset in normalized["model_presets"]:
        if preset["id"] == selected:
            model = preset.get("model")
            return str(model) if model else None
    return None


def _inferred_settings(*, read_only: bool, modifying: bool, risky: bool) -> dict[str, str]:
    if read_only:
        return {
            "reasoning_effort": "low",
            "verbosity": "medium",
            "plan_mode": "off",
            "validation_depth": "none",
        }
    if risky:
        return {
            "reasoning_effort": "high",
            "verbosity": "medium",
            "plan_mode": "always",
            "validation_depth": "full",
        }
    if modifying:
        return {
            "reasoning_effort": "medium",
            "verbosity": "medium",
            "plan_mode": "off",
            "validation_depth": "full",
        }
    return {
        "reasoning_effort": "medium",
        "verbosity": "medium",
        "plan_mode": "off",
        "validation_depth": "none",
    }


def _prompt_context_text(prompt: str, context: list[dict[str, Any]]) -> str:
    parts = [str(prompt or "")]
    for item in context[:20]:
        if not isinstance(item, dict):
            continue
        parts.extend(str(item.get(key) or "") for key in ("id", "kind", "label", "subtitle"))
        payload = item.get("payload")
        if isinstance(payload, dict):
            parts.append(json.dumps(payload, sort_keys=True)[:2048])
    return "\n".join(parts)


def _normalize_context_budget(value: Any) -> int:
    try:
        budget = int(value)
    except (TypeError, ValueError) as err:
        raise ValueError("context_budget_chars must be a number") from err
    if budget < 1_000 or budget > 200_000:
        raise ValueError("context_budget_chars must be between 1000 and 200000")
    return budget


def _preset_ids(presets: list[dict[str, Any]]) -> set[str]:
    return {str(preset.get("id")) for preset in presets}
