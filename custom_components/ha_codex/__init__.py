"""Home Assistant integration for a Codex dashboard."""

from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

from .config_flow import config_from_entry_data, normalize_config_input
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
_COMMANDS_REGISTERED_KEY = f"{DOMAIN}_websocket_commands_registered"
_STATIC_REGISTERED_KEY = f"{DOMAIN}_static_registered"

try:
    import voluptuous as vol
    from homeassistant.helpers import config_validation as cv
except ImportError:

    class _VoluptuousFallback:
        ALLOW_EXTRA = object()

        @staticmethod
        def Optional(key: str) -> str:
            return key

        @staticmethod
        def Any(*validators: Any) -> Any:
            return validators[0] if validators else None

        @staticmethod
        def Schema(schema: Any, *, extra: Any | None = None) -> Any:
            return schema

    class _ConfigValidationFallback:
        string = str

        @staticmethod
        def boolean(value: Any) -> bool:
            return bool(value)

    vol = _VoluptuousFallback()
    cv = _ConfigValidationFallback()

CONFIG_SCHEMA = vol.Schema(
    {
        vol.Optional(DOMAIN): vol.Schema(
            {
                vol.Optional(CONF_WORKSPACE_PATH): cv.string,
                vol.Optional(CONF_CODEX_COMMAND): cv.string,
                vol.Optional(CONF_BRIDGE_URL): vol.Any(None, cv.string),
                vol.Optional(CONF_REQUIRE_ADMIN): cv.boolean,
                vol.Optional(CONF_ADDON_WRITE_SCOPE): vol.Any(None, cv.string, [cv.string]),
                vol.Optional(CONF_VALIDATION_COMMAND): vol.Any(None, cv.string, [cv.string]),
            }
        )
    },
    extra=vol.ALLOW_EXTRA,
)


async def async_setup(hass: Any, config: dict[str, Any]) -> bool:
    """Set up HA Codex and import YAML configuration when present."""
    conf = dict(config.get(DOMAIN) or {})
    if not conf:
        return True

    config_entries = getattr(hass, "config_entries", None)
    if config_entries:
        try:
            from homeassistant.config_entries import SOURCE_IMPORT

            entries = config_entries.async_entries(DOMAIN)
            if entries:
                _LOGGER.warning("HA Codex YAML configuration ignored because a config entry exists")
            else:
                hass.async_create_task(
                    config_entries.flow.async_init(
                        DOMAIN,
                        context={"source": SOURCE_IMPORT},
                        data=conf,
                    )
                )
            return True
        except (AttributeError, ImportError):
            _LOGGER.debug("Falling back to direct YAML setup", exc_info=True)

    return await _async_setup_runtime(hass, normalize_config_input(conf))


async def async_setup_entry(hass: Any, entry: Any) -> bool:
    """Set up HA Codex from a config entry."""
    if hasattr(entry, "async_on_unload") and hasattr(entry, "add_update_listener"):
        entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    return await _async_setup_runtime(
        hass,
        config_from_entry_data(
            getattr(entry, "data", {}),
            getattr(entry, "options", {}),
        ),
    )


async def async_unload_entry(hass: Any, entry: Any) -> bool:
    """Unload a HA Codex config entry."""
    manager = hass.data.pop(DOMAIN, None)
    if manager:
        for task in getattr(manager, "tasks", {}).values():
            task.cancel()
    await _async_unregister_panel(hass)
    return True


async def async_reload_entry(hass: Any, entry: Any) -> bool:
    """Reload HA Codex when options change."""
    await async_unload_entry(hass, entry)
    return await async_setup_entry(hass, entry)


async def _async_options_updated(hass: Any, entry: Any) -> None:
    """Reload the config entry after options are updated."""
    await hass.config_entries.async_reload(entry.entry_id)


async def _async_setup_runtime(hass: Any, conf: dict[str, Any]) -> bool:
    """Set up the HA Codex runtime from normalized configuration."""
    from homeassistant.components import panel_custom
    from homeassistant.components.http import StaticPathConfig
    from homeassistant.helpers.storage import Store

    from .manager import CodexManager
    from .websocket import async_register_commands

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
    if not hass.data.get(_STATIC_REGISTERED_KEY):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(PANEL_URL, str(panel_dir), False)]
        )
        hass.data[_STATIC_REGISTERED_KEY] = True
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
    if not hass.data.get(_COMMANDS_REGISTERED_KEY):
        async_register_commands(hass)
        hass.data[_COMMANDS_REGISTERED_KEY] = True
    return True


async def _async_unregister_panel(hass: Any) -> None:
    """Remove the HA Codex panel when Home Assistant supports it."""
    try:
        from homeassistant.components import frontend
    except ImportError:
        return
    remove_panel = getattr(frontend, "async_remove_panel", None)
    if remove_panel is None:
        return
    result = remove_panel(hass, PANEL_PATH)
    if hasattr(result, "__await__"):
        await result


def _panel_cache_version(integration_dir: Path) -> str:
    """Return a cache-busting version for the packaged panel."""
    try:
        manifest = json.loads(integration_dir.joinpath("manifest.json").read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return "dev"
    return str(manifest.get("version") or "dev")
