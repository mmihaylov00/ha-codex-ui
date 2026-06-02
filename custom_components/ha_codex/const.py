"""Constants for the HA Codex integration."""

DOMAIN = "ha_codex"

CONF_WORKSPACE_PATH = "workspace_path"
CONF_CODEX_COMMAND = "codex_command"
CONF_BRIDGE_URL = "bridge_url"
CONF_REQUIRE_ADMIN = "require_admin"
CONF_ADDON_WRITE_SCOPE = "addon_write_scope"
CONF_VALIDATION_COMMAND = "validation_command"

DEFAULT_WORKSPACE_PATH = "/homeassistant"
DEFAULT_CODEX_COMMAND = "codex"
DEFAULT_BRIDGE_URL = None
DEFAULT_REQUIRE_ADMIN = True
DEFAULT_ADDON_WRITE_SCOPE = "all_visible"
DEFAULT_VALIDATION_COMMAND = "auto"

PANEL_URL = "/ha_codex_static"
PANEL_PATH = "ha-codex"
PANEL_COMPONENT = "ha-codex-panel"
PANEL_TITLE = "Codex"
PANEL_ICON = "mdi:robot"

STORE_VERSION = 1
STORE_KEY = f"{DOMAIN}.sessions"

EVENT_SESSION_UPDATED = f"{DOMAIN}/session_updated"
EVENT_SESSION_DELETED = f"{DOMAIN}/session_deleted"
EVENT_MESSAGE_APPENDED = f"{DOMAIN}/message_appended"
EVENT_MESSAGE_DELTA = f"{DOMAIN}/message_delta"
EVENT_RUN_FINISHED = f"{DOMAIN}/run_finished"
EVENT_APPROVAL_REQUIRED = f"{DOMAIN}/approval_required"
EVENT_VALIDATION_FINISHED = f"{DOMAIN}/validation_finished"
