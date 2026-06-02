"""WebSocket API for HA Codex."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.components.websocket_api import ActiveConnection
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError

from .const import DOMAIN
from .manager import CodexManager


def async_register_commands(hass: HomeAssistant) -> None:
    """Register HA Codex WebSocket commands."""
    websocket_api.async_register_command(hass, websocket_status)
    websocket_api.async_register_command(hass, websocket_settings_get)
    websocket_api.async_register_command(hass, websocket_settings_update)
    websocket_api.async_register_command(hass, websocket_bridge_log)
    websocket_api.async_register_command(hass, websocket_bridge_log_clear)
    websocket_api.async_register_command(hass, websocket_bridge_restart)
    websocket_api.async_register_command(hass, websocket_core_restart)
    websocket_api.async_register_command(hass, websocket_account_status)
    websocket_api.async_register_command(hass, websocket_account_device_login_start)
    websocket_api.async_register_command(hass, websocket_account_device_login_status)
    websocket_api.async_register_command(hass, websocket_account_device_login_cancel)
    websocket_api.async_register_command(hass, websocket_account_logout)
    websocket_api.async_register_command(hass, websocket_context_logs)
    websocket_api.async_register_command(hass, websocket_context_config_files)
    websocket_api.async_register_command(hass, websocket_context_config_file)
    websocket_api.async_register_command(hass, websocket_sessions_list)
    websocket_api.async_register_command(hass, websocket_sessions_last_message_id)
    websocket_api.async_register_command(hass, websocket_sessions_message)
    websocket_api.async_register_command(hass, websocket_sessions_messages_after)
    websocket_api.async_register_command(hass, websocket_sessions_create)
    websocket_api.async_register_command(hass, websocket_sessions_send)
    websocket_api.async_register_command(hass, websocket_sessions_run_settings_update)
    websocket_api.async_register_command(hass, websocket_sessions_run_plan_respond)
    websocket_api.async_register_command(hass, websocket_sessions_rollback_run)
    websocket_api.async_register_command(hass, websocket_sessions_steer)
    websocket_api.async_register_command(hass, websocket_sessions_retry_continue)
    websocket_api.async_register_command(hass, websocket_sessions_cancel)
    websocket_api.async_register_command(hass, websocket_sessions_rename)
    websocket_api.async_register_command(hass, websocket_sessions_delete)
    websocket_api.async_register_command(hass, websocket_sessions_archive)
    websocket_api.async_register_command(hass, websocket_approvals_respond)
    websocket_api.async_register_command(hass, websocket_git_status)
    websocket_api.async_register_command(hass, websocket_git_diff)
    websocket_api.async_register_command(hass, websocket_git_changes)
    websocket_api.async_register_command(hass, websocket_git_file_diff)
    websocket_api.async_register_command(hass, websocket_git_commit_push)
    websocket_api.async_register_command(hass, websocket_git_discard)
    websocket_api.async_register_command(hass, websocket_validation_run)
    websocket_api.async_register_command(hass, websocket_validation_reload)
    websocket_api.async_register_command(hass, websocket_validation_reload)


def _manager(hass: HomeAssistant) -> CodexManager:
    manager = hass.data.get(DOMAIN)
    if not isinstance(manager, CodexManager):
        raise HomeAssistantError("HA Codex is not initialized")
    return manager


def _raise_value_error(err: ValueError) -> None:
    raise HomeAssistantError(str(err)) from err


@websocket_api.websocket_command({"type": "ha_codex/status"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_status(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return runtime status."""
    connection.send_result(msg["id"], await _manager(hass).async_status())


@websocket_api.websocket_command({"type": "ha_codex/settings/get"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_settings_get(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return HA Codex settings."""
    connection.send_result(msg["id"], {"settings": await _manager(hass).async_get_settings()})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/settings/update",
        vol.Required("settings"): dict,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_settings_update(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update HA Codex settings."""
    try:
        settings = await _manager(hass).async_update_settings(msg["settings"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"settings": settings})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/bridge_log",
        vol.Optional("lines", default=500): vol.All(vol.Coerce(int), vol.Range(min=1, max=500)),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_bridge_log(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the HA Codex bridge log tail."""
    connection.send_result(msg["id"], await _manager(hass).async_bridge_log(msg["lines"]))


@websocket_api.websocket_command({"type": "ha_codex/bridge_log/clear"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_bridge_log_clear(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Clear the HA Codex bridge log."""
    connection.send_result(msg["id"], await _manager(hass).async_clear_bridge_log())


@websocket_api.websocket_command({"type": "ha_codex/bridge_restart"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_bridge_restart(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Start or restart the HA Codex bridge."""
    connection.send_result(msg["id"], await _manager(hass).async_restart_bridge())


@websocket_api.websocket_command({"type": "ha_codex/core_restart"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_core_restart(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Restart Home Assistant Core."""
    connection.send_result(msg["id"], await _manager(hass).async_restart_core())


@websocket_api.websocket_command({"type": "ha_codex/account/status"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_account_status(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return redacted Codex account status."""
    connection.send_result(msg["id"], await _manager(hass).async_account_status())


@websocket_api.websocket_command({"type": "ha_codex/account/device_login/start"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_account_device_login_start(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Start Codex device-code login."""
    connection.send_result(msg["id"], await _manager(hass).async_account_device_login_start())


@websocket_api.websocket_command({"type": "ha_codex/account/device_login/status"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_account_device_login_status(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return Codex device-code login status."""
    connection.send_result(msg["id"], await _manager(hass).async_account_device_login_status())


@websocket_api.websocket_command({"type": "ha_codex/account/device_login/cancel"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_account_device_login_cancel(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Cancel Codex device-code login."""
    connection.send_result(msg["id"], await _manager(hass).async_account_device_login_cancel())


@websocket_api.websocket_command({"type": "ha_codex/account/logout"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_account_logout(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Log out Codex."""
    connection.send_result(msg["id"], await _manager(hass).async_account_logout())


@websocket_api.websocket_command(
    {
        "type": "ha_codex/context/logs",
        vol.Optional("lines", default=200): vol.All(vol.Coerce(int), vol.Range(min=1, max=500)),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_context_logs(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return bounded log context."""
    connection.send_result(msg["id"], await _manager(hass).async_context_logs(msg["lines"]))


@websocket_api.websocket_command({"type": "ha_codex/context/config_files"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_context_config_files(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return safe configuration files available as context."""
    connection.send_result(msg["id"], await _manager(hass).async_context_config_files())


@websocket_api.websocket_command(
    {
        "type": "ha_codex/context/config_file",
        vol.Required("path"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_context_config_file(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return a bounded safe configuration-file preview."""
    try:
        result = await _manager(hass).async_context_config_file(msg["path"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command({"type": "ha_codex/sessions/list"})
@websocket_api.require_admin
def websocket_sessions_list(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return all sessions."""
    connection.send_result(msg["id"], {"sessions": _manager(hass).list_sessions()})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/last_message_id",
        vol.Required("session_id"): str,
    }
)
@websocket_api.require_admin
def websocket_sessions_last_message_id(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the newest message id for a session."""
    try:
        last_message_id = _manager(hass).last_message_id(msg["session_id"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"last_message_id": last_message_id})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/message",
        vol.Required("session_id"): str,
        vol.Required("message_id"): vol.Coerce(int),
    }
)
@websocket_api.require_admin
def websocket_sessions_message(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return one message by id."""
    try:
        message = _manager(hass).get_message(msg["session_id"], msg["message_id"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"message": message})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/messages_after",
        vol.Required("session_id"): str,
        vol.Optional("after_id", default=0): vol.All(vol.Coerce(int), vol.Range(min=0)),
        vol.Optional("limit", default=None): vol.Any(
            None, vol.All(vol.Coerce(int), vol.Range(min=1, max=1000))
        ),
    }
)
@websocket_api.require_admin
def websocket_sessions_messages_after(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return messages after a known message position."""
    try:
        messages = _manager(hass).messages_after(msg["session_id"], msg["after_id"], msg["limit"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"messages": messages})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/create",
        vol.Optional("title"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_create(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Create a session."""
    session = await _manager(hass).async_create_session(msg.get("title"))
    connection.send_result(
        msg["id"],
        {"session": _manager(hass).session_payload(session)},
    )


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/send",
        vol.Required("session_id"): str,
        vol.Required("prompt"): str,
        vol.Optional("context", default=[]): [dict],
        vol.Optional("run_prompt"): str,
        vol.Optional("metadata"): dict,
        vol.Optional("run_settings"): dict,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_send(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Send a prompt to a session."""
    try:
        session = await _manager(hass).async_send(
            msg["session_id"],
            msg["prompt"],
            context=msg["context"],
            run_prompt=msg.get("run_prompt"),
            metadata=msg.get("metadata"),
            run_settings=msg.get("run_settings"),
        )
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(
        msg["id"],
        {"session": _manager(hass).session_payload(session)},
    )


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/run_settings/update",
        vol.Required("session_id"): str,
        vol.Required("run_settings"): dict,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_run_settings_update(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update a chat's run-settings override."""
    try:
        session = await _manager(hass).async_update_session_run_settings(
            msg["session_id"],
            msg["run_settings"],
        )
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"session": _manager(hass).session_payload(session)})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/run_plan/respond",
        vol.Required("session_id"): str,
        vol.Required("plan_id"): str,
        vol.Required("action"): vol.In(["approve", "cancel", "revise"]),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_run_plan_respond(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Approve, cancel, or revise a pending run plan."""
    try:
        session = await _manager(hass).async_respond_run_plan(
            msg["session_id"],
            msg["plan_id"],
            msg["action"],
        )
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"session": _manager(hass).session_payload(session)})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/rollback_run",
        vol.Required("session_id"): str,
        vol.Required("checkpoint_id"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_rollback_run(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Rollback one completed Codex run."""
    try:
        result = await _manager(hass).async_rollback_run(
            msg["session_id"],
            msg["checkpoint_id"],
        )
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/steer",
        vol.Required("session_id"): str,
        vol.Required("prompt"): str,
        vol.Optional("context", default=[]): [dict],
        vol.Optional("run_prompt"): str,
        vol.Optional("metadata"): dict,
        vol.Optional("run_settings"): dict,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_steer(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Queue a steering prompt for an active session."""
    try:
        session = await _manager(hass).async_steer(
            msg["session_id"],
            msg["prompt"],
            context=msg["context"],
            run_prompt=msg.get("run_prompt"),
            metadata=msg.get("metadata"),
            run_settings=msg.get("run_settings"),
        )
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"session": _manager(hass).session_payload(session)})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/retry_continue",
        vol.Required("session_id"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_retry_continue(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Retry or continue an errored session."""
    try:
        session = await _manager(hass).async_retry_continue(msg["session_id"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"session": _manager(hass).session_payload(session)})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/cancel",
        vol.Required("session_id"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_cancel(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Cancel a running session."""
    try:
        session = await _manager(hass).async_cancel(msg["session_id"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"session": _manager(hass).session_payload(session)})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/rename",
        vol.Required("session_id"): str,
        vol.Required("title"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_rename(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Rename a session."""
    try:
        session = await _manager(hass).async_rename(msg["session_id"], msg["title"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"session": _manager(hass).session_payload(session)})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/delete",
        vol.Required("session_id"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_delete(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Delete a session."""
    await _manager(hass).async_delete(msg["session_id"])
    connection.send_result(msg["id"], {"deleted_session_id": msg["session_id"]})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/sessions/archive",
        vol.Required("session_id"): str,
        vol.Optional("archived", default=True): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_sessions_archive(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Archive or restore a session."""
    try:
        session = await _manager(hass).async_archive(msg["session_id"], msg["archived"])
    except ValueError as err:
        _raise_value_error(err)
    if session is None:
        connection.send_result(msg["id"], {"deleted_session_id": msg["session_id"]})
        return
    connection.send_result(
        msg["id"],
        {"session": _manager(hass).session_payload(session)},
    )


@websocket_api.websocket_command(
    {
        "type": "ha_codex/approvals/respond",
        vol.Required("session_id"): str,
        vol.Required("approval_id"): str,
        vol.Required("approved"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_approvals_respond(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Approve or reject a pending shell command."""
    try:
        session = await _manager(hass).async_respond_approval(
            msg["session_id"],
            msg["approval_id"],
            msg["approved"],
        )
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], {"session": _manager(hass).session_payload(session)})


@websocket_api.websocket_command({"type": "ha_codex/git/status"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_git_status(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return git status."""
    connection.send_result(msg["id"], await _manager(hass).async_git_status())


@websocket_api.websocket_command({"type": "ha_codex/git/diff"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_git_diff(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return git diff."""
    connection.send_result(msg["id"], await _manager(hass).async_git_diff())


@websocket_api.websocket_command({"type": "ha_codex/git/changes"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_git_changes(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return structured git changes."""
    connection.send_result(msg["id"], await _manager(hass).async_git_changes())


@websocket_api.websocket_command(
    {
        "type": "ha_codex/git/file_diff",
        vol.Required("path"): str,
        vol.Optional("old_path"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_git_file_diff(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return one file diff."""
    connection.send_result(
        msg["id"],
        await _manager(hass).async_git_file_diff(msg["path"], msg.get("old_path")),
    )


@websocket_api.websocket_command(
    {
        "type": "ha_codex/git/commit_push",
        vol.Required("message"): str,
        vol.Required("files"): [
            vol.Any(str, {vol.Required("path"): str, vol.Optional("old_path"): str})
        ],
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_git_commit_push(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Commit and push git changes."""
    try:
        result = await _manager(hass).async_git_commit_push(msg["message"], msg["files"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        "type": "ha_codex/git/discard",
        vol.Required("files"): [
            vol.Any(str, {vol.Required("path"): str, vol.Optional("old_path"): str})
        ],
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_git_discard(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Discard selected git changes."""
    try:
        result = await _manager(hass).async_git_discard(msg["files"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        "type": "ha_codex/validation/run",
        vol.Optional("session_id"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_validation_run(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Run HA config validation."""
    result = await _manager(hass).async_validate(msg.get("session_id"))
    connection.send_result(msg["id"], {"validation": result.to_dict()})


@websocket_api.websocket_command(
    {
        "type": "ha_codex/validation/reload",
        vol.Required("domains"): [str],
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_validation_reload(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Reload safe HA domains recommended by validation."""
    try:
        result = await _manager(hass).async_reload_validation_domains(msg["domains"])
    except ValueError as err:
        _raise_value_error(err)
    connection.send_result(msg["id"], result)
