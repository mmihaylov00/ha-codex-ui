"""Home Assistant integration for a Codex dashboard."""

from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

from .const import (
    CONF_ADDON_WRITE_SCOPE,
    CONF_BRIDGE_URL,
    CONF_CODEX_COMMAND,
    CONF_REQUIRE_ADMIN,
    CONF_VALIDATION_COMMAND,
    CONF_WORKSPACE_PATH,
    DEFAULT_ADDON_WRITE_SCOPE,
    DEFAULT_BRIDGE_URL,
    DEFAULT_CODEX_COMMAND,
    DEFAULT_REQUIRE_ADMIN,
    DEFAULT_VALIDATION_COMMAND,
    DEFAULT_WORKSPACE_PATH,
    DOMAIN,
    PANEL_COMPONENT,
    PANEL_ICON,
    PANEL_PATH,
    PANEL_TITLE,
    PANEL_URL,
    STORE_KEY,
    STORE_VERSION,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: Any, config: dict[str, Any]) -> bool:
    """Set up HA Codex from YAML."""
    from homeassistant.components import panel_custom
    from homeassistant.components.http import StaticPathConfig
    from homeassistant.helpers.storage import Store

    from .manager import CodexManager
    from .websocket import async_register_commands

    conf = dict(config.get(DOMAIN) or {})
    workspace_path = str(conf.get(CONF_WORKSPACE_PATH, DEFAULT_WORKSPACE_PATH))
    codex_command = str(conf.get(CONF_CODEX_COMMAND, DEFAULT_CODEX_COMMAND))
    bridge_url = conf.get(CONF_BRIDGE_URL, DEFAULT_BRIDGE_URL)
    require_admin = bool(conf.get(CONF_REQUIRE_ADMIN, DEFAULT_REQUIRE_ADMIN))
    addon_write_scope = conf.get(CONF_ADDON_WRITE_SCOPE, DEFAULT_ADDON_WRITE_SCOPE)
    validation_command = conf.get(CONF_VALIDATION_COMMAND, DEFAULT_VALIDATION_COMMAND)

    store = Store(hass, STORE_VERSION, STORE_KEY)
    manager = CodexManager(
        hass,
        store,
        workspace_path=workspace_path,
        codex_command=codex_command,
        bridge_url=str(bridge_url) if bridge_url else None,
        addon_write_scope=addon_write_scope,
        validation_command=validation_command,
    )
    await manager.async_load()
    hass.data[DOMAIN] = manager
    if manager.bridge_url:
        bridge_result = await manager.async_start_bridge()
        if not bridge_result.get("ok"):
            _LOGGER.warning(
                "HA Codex bridge did not start during integration setup: %s",
                bridge_result.get("error") or bridge_result,
            )

    integration_dir = Path(__file__).resolve().parent
    panel_dir = integration_dir / "frontend"
    if not panel_dir.joinpath("panel.js").is_file():
        panel_dir = Path(hass.config.path("www", "ha_codex"))
    await hass.http.async_register_static_paths(
        [StaticPathConfig(PANEL_URL, str(panel_dir), False)]
    )
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_PATH,
        webcomponent_name=PANEL_COMPONENT,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        module_url=f"{PANEL_URL}/panel.js?v={_panel_cache_version(integration_dir)}",
        require_admin=require_admin,
        config={
            "domain": DOMAIN,
            "events": {
                "session_updated": f"{DOMAIN}/session_updated",
                "session_deleted": f"{DOMAIN}/session_deleted",
                "message_appended": f"{DOMAIN}/message_appended",
                "message_delta": f"{DOMAIN}/message_delta",
                "run_finished": f"{DOMAIN}/run_finished",
                "approval_required": f"{DOMAIN}/approval_required",
                "validation_finished": f"{DOMAIN}/validation_finished",
            },
        },
    )
    async_register_commands(hass)
    return True


def _panel_cache_version(integration_dir: Path) -> str:
    """Return a cache-busting version for the packaged panel."""
    try:
        manifest = json.loads(integration_dir.joinpath("manifest.json").read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return "dev"
    return str(manifest.get("version") or "dev")
