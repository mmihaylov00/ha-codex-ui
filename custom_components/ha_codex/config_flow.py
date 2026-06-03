"""Config flow for HA Codex."""

from __future__ import annotations

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
)

try:
    import voluptuous as vol
    from homeassistant import config_entries  # pragma: no cover
    from homeassistant.core import callback  # pragma: no cover
except ImportError:  # pragma: no cover

    class _VoluptuousFallback:
        @staticmethod
        def Optional(key: str, *, default: Any | None = None) -> str:
            return key

        @staticmethod
        def Schema(schema: Any) -> Any:
            return schema

    class _ConfigFlowFallback:
        def __init_subclass__(cls, **_kwargs: Any) -> None:
            return None

    class _OptionsFlowFallback:
        pass

    class _ConfigEntriesFallback:
        ConfigFlow = _ConfigFlowFallback
        OptionsFlow = _OptionsFlowFallback

    def callback(func: Any) -> Any:
        return func

    vol = _VoluptuousFallback()
    config_entries = _ConfigEntriesFallback()


TITLE = "HA Codex UI"
_CONFIG_KEYS = (
    CONF_WORKSPACE_PATH,
    CONF_CODEX_COMMAND,
    CONF_BRIDGE_URL,
    CONF_REQUIRE_ADMIN,
    CONF_ADDON_WRITE_SCOPE,
    CONF_VALIDATION_COMMAND,
)
_NULLABLE_KEYS = {
    CONF_BRIDGE_URL,
    CONF_ADDON_WRITE_SCOPE,
    CONF_VALIDATION_COMMAND,
}


def config_defaults() -> dict[str, Any]:
    """Return default config-entry values for HACS installs."""
    return {
        CONF_WORKSPACE_PATH: DEFAULT_WORKSPACE_PATH,
        CONF_CODEX_COMMAND: DEFAULT_CODEX_COMMAND,
        CONF_BRIDGE_URL: DEFAULT_BRIDGE_URL,
        CONF_REQUIRE_ADMIN: DEFAULT_REQUIRE_ADMIN,
        CONF_ADDON_WRITE_SCOPE: DEFAULT_ADDON_WRITE_SCOPE,
        CONF_VALIDATION_COMMAND: DEFAULT_VALIDATION_COMMAND,
    }


def normalize_config_input(user_input: dict[str, Any] | None) -> dict[str, Any]:
    """Return normalized config-entry data from a form or YAML import."""
    values = config_defaults()
    for key, value in (user_input or {}).items():
        if key not in _CONFIG_KEYS:
            continue
        if key == CONF_REQUIRE_ADMIN:
            values[key] = _normalize_bool(value)
        elif key in _NULLABLE_KEYS:
            values[key] = _normalize_optional_value(value)
        else:
            values[key] = _normalize_required_string(value, str(values[key]))
    return values


def config_from_entry_data(
    data: dict[str, Any] | None,
    options: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Merge config-entry data with editable options."""
    return normalize_config_input({**(data or {}), **(options or {})})


def config_schema(config: dict[str, Any] | None = None) -> Any:
    """Return the config/options form schema."""
    values = _form_values(config_from_entry_data(config or {}))
    return vol.Schema(
        {
            vol.Optional(CONF_WORKSPACE_PATH, default=values[CONF_WORKSPACE_PATH]): str,
            vol.Optional(CONF_CODEX_COMMAND, default=values[CONF_CODEX_COMMAND]): str,
            vol.Optional(CONF_BRIDGE_URL, default=values[CONF_BRIDGE_URL]): str,
            vol.Optional(CONF_REQUIRE_ADMIN, default=values[CONF_REQUIRE_ADMIN]): bool,
            vol.Optional(CONF_ADDON_WRITE_SCOPE, default=values[CONF_ADDON_WRITE_SCOPE]): str,
            vol.Optional(CONF_VALIDATION_COMMAND, default=values[CONF_VALIDATION_COMMAND]): str,
        }
    )


class HaCodexConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle the HA Codex config flow."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: Any) -> config_entries.OptionsFlow:
        """Return the options flow handler."""
        return HaCodexOptionsFlow(config_entry)

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> Any:
        """Create the integration entry from the UI."""
        await _async_set_unique_id(self)
        self._abort_if_unique_id_configured()
        if user_input is not None:
            return self.async_create_entry(
                title=TITLE,
                data=normalize_config_input(user_input),
            )
        return self.async_show_form(step_id="user", data_schema=config_schema())

    async def async_step_import(self, user_input: dict[str, Any]) -> Any:
        """Import YAML configuration into a config entry."""
        await _async_set_unique_id(self)
        self._abort_if_unique_id_configured()
        return self.async_create_entry(
            title=TITLE,
            data=normalize_config_input(user_input),
        )


class HaCodexOptionsFlow(config_entries.OptionsFlow):
    """Handle editable HA Codex options."""

    def __init__(self, config_entry: Any) -> None:
        """Initialize options flow."""
        self._config_entry = config_entry

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> Any:
        """Update HA Codex options."""
        current = config_from_entry_data(
            getattr(self._config_entry, "data", {}),
            getattr(self._config_entry, "options", {}),
        )
        if user_input is not None:
            return self.async_create_entry(
                title="",
                data=normalize_config_input(user_input),
            )
        return self.async_show_form(step_id="init", data_schema=config_schema(current))


def _normalize_required_string(value: Any, fallback: str) -> str:
    text = str(value or "").strip()
    return text or fallback


def _normalize_optional_value(value: Any) -> Any:
    if isinstance(value, list):
        return value
    text = str(value or "").strip()
    if not text or text.lower() in {"none", "null"}:
        return None
    return text


def _normalize_bool(value: Any) -> bool:
    if isinstance(value, str):
        return value.strip().lower() not in {"0", "false", "no", "off"}
    return bool(value)


async def _async_set_unique_id(flow: Any) -> None:
    setter = getattr(flow, "async_set_unique_id", None)
    if setter is None:
        setter = getattr(flow, "_async_set_unique_id", None)
    if setter is None:  # pragma: no cover
        return
    result = setter(DOMAIN)
    if hasattr(result, "__await__"):
        await result


def _form_values(config: dict[str, Any]) -> dict[str, Any]:
    values: dict[str, Any] = {}
    for key, value in config.items():
        if value is None:
            values[key] = ""
        elif isinstance(value, list):
            values[key] = ", ".join(str(item) for item in value)
        else:
            values[key] = value
    return values
