"""Validation summary helpers for HA Codex."""

from __future__ import annotations

from collections import OrderedDict
from typing import Any

from .models import ValidationResult

_RELOAD_SERVICES = {
    "automations": ("automation", "reload"),
    "scripts": ("script", "reload"),
    "scenes": ("scene", "reload"),
    "themes": ("frontend", "reload_themes"),
}

_DOMAIN_LABELS = {
    "automations": "Automations",
    "scripts": "Scripts",
    "scenes": "Scenes",
    "themes": "Themes",
    "configuration": "configuration.yaml",
    "custom_components": "Custom integrations",
    "ha_codex_frontend": "HA Codex frontend",
    "lovelace_www": "Lovelace/www assets",
}


def reload_service_for_domain(domain_id: str) -> tuple[str, str] | None:
    """Return the safe Home Assistant reload service for a validation domain."""
    return _RELOAD_SERVICES.get(domain_id)


def build_validation_summary(
    validation: ValidationResult,
    changed_files: list[dict[str, str]] | None = None,
    *,
    session_id: str | None = None,
    session_title: str | None = None,
) -> dict[str, Any]:
    """Build a review-oriented summary for a validation run."""
    files = _normalize_changed_files(changed_files or [])
    affected_domains = _affected_domains(files)
    reload_domains = [
        domain["id"]
        for domain in affected_domains
        if domain.get("reloadable") and reload_service_for_domain(str(domain["id"]))
    ]
    restart_required = any(domain.get("restart_required") for domain in affected_domains)
    failed = _validation_failed(validation)

    if failed:
        recommendation = "fix_validation_errors"
        label = "Fix validation errors first"
        severity = "error"
    elif restart_required:
        recommendation = "restart_required"
        label = "Restart required"
        severity = "restart"
    elif reload_domains:
        recommendation = "reload_may_be_enough"
        label = "Reload may be enough"
        severity = "warning"
    elif validation.status == "unavailable":
        recommendation = "validation_unavailable"
        label = "Validation unavailable"
        severity = "warning"
    else:
        recommendation = "no_action_needed"
        label = "No action needed"
        severity = "success"

    return {
        "recommendation": recommendation,
        "label": label,
        "severity": severity,
        "changed_files": files,
        "affected_domains": affected_domains,
        "reload_domains": reload_domains if recommendation == "reload_may_be_enough" else [],
        "restart_required": bool(restart_required and not failed),
        "session_id": session_id,
        "session_title": session_title,
    }


def is_ha_relevant_change(path: str) -> bool:
    """Return whether a changed path should trigger automatic HA validation."""
    value = str(path or "").strip("/").replace("\\", "/")
    if not value:
        return False
    if value.endswith((".yaml", ".yml")):
        return True
    return value.startswith(("custom_components/", "www/ha_codex/"))


def _normalize_changed_files(changed_files: list[dict[str, str]]) -> list[dict[str, str]]:
    normalized: list[dict[str, str]] = []
    for item in changed_files:
        path = str(item.get("path", "")).strip().replace("\\", "/")
        if not path:
            continue
        normalized.append({"status": str(item.get("status", "changed")), "path": path.lstrip("/")})
    return normalized


def _affected_domains(changed_files: list[dict[str, str]]) -> list[dict[str, Any]]:
    domains: OrderedDict[str, dict[str, Any]] = OrderedDict()
    for change in changed_files:
        path = change["path"]
        for domain_id in _domains_for_path(path):
            domain = domains.setdefault(
                domain_id,
                {
                    "id": domain_id,
                    "label": _DOMAIN_LABELS.get(domain_id, domain_id),
                    "paths": [],
                    "reloadable": domain_id in _RELOAD_SERVICES,
                    "restart_required": domain_id
                    in {"configuration", "custom_components", "ha_codex_frontend"},
                },
            )
            domain["paths"].append(path)
    return list(domains.values())


def _domains_for_path(path: str) -> list[str]:
    value = path.strip("/").replace("\\", "/")
    name = value.rsplit("/", 1)[-1]
    domains: list[str] = []

    if value == "configuration.yaml":
        domains.append("configuration")
    if value == "automations.yaml" or value.startswith("automations/"):
        domains.append("automations")
    if value == "scripts.yaml" or value.startswith("scripts/"):
        domains.append("scripts")
    if value == "scenes.yaml" or value.startswith("scenes/"):
        domains.append("scenes")
    if value == "themes.yaml" or value.startswith("themes/") or "/themes/" in f"/{value}/":
        domains.append("themes")
    if value.startswith("custom_components/"):
        domains.append("custom_components")
    if value.startswith(("custom_components/ha_codex/frontend/", "www/ha_codex/")):
        domains.append("ha_codex_frontend")
    elif (
        value.startswith("www/")
        or value.startswith("dashboards/")
        or name
        in {
            "ui-lovelace.yaml",
            "lovelace.yaml",
        }
    ):
        domains.append("lovelace_www")

    return domains


def _validation_failed(validation: ValidationResult) -> bool:
    if validation.status == "failed":
        return True
    if validation.returncode is None:
        return False
    return validation.returncode != 0
