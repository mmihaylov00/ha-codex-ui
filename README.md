# HA Codex UI

HA Codex UI is a Home Assistant custom integration that adds an admin-only Codex
sidebar panel for inspecting configuration, chatting with Codex, reviewing file
changes, handling approvals, and running Home Assistant validation.

This integration can execute commands and edit files in your Home Assistant
configuration. Keep `require_admin: true`, review approval prompts carefully, and
install it only on Home Assistant instances you control.

![HA Codex UI running in Home Assistant](docs/assets/codex-working.png)

## Installation

Install the Codex CLI first, then install HA Codex UI with HACS as an
integration.

### Install Codex CLI

HA Codex UI does not bundle the Codex CLI or credentials. The OpenAI Codex CLI
can be installed with npm; see the
[OpenAI Codex CLI getting started guide](https://help.openai.com/en/articles/11096431)
for the current official install guidance.

```sh
npm install -g @openai/codex
```

For Home Assistant OS, run this from a shell with `npm` available, or copy an
already-installed CLI into a path Home Assistant Core can execute. This
configuration uses `/config/bin/codex`:

```sh
mkdir -p /config/bin /config/codex-cli
npm install --global --prefix /config/codex-cli @openai/codex
ln -sf /config/codex-cli/bin/codex /config/bin/codex
/config/bin/codex --version
```

If you install Codex somewhere else, set `codex_command` in `configuration.yaml`
to that executable path.

### Install HA Codex UI

[![Open your Home Assistant instance and open a repository inside HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=mmihaylov00&repository=ha-codex-ui&category=integration)

Until the repository is included in the default HACS store, add it as a custom
repository:

1. Open HACS.
2. Select **Custom repositories**.
3. Add `https://github.com/mmihaylov00/ha-codex-ui`.
4. Select category **Integration**.
5. Download **HA Codex UI**.
6. Restart Home Assistant Core.

## Configuration

Add the integration to `configuration.yaml`:

```yaml
ha_codex:
  workspace_path: /config
  require_admin: true
  codex_command: /config/bin/codex
  bridge_url: http://127.0.0.1:8765
  addon_write_scope: all_visible
  validation_command: auto
```

Restart Home Assistant Core after changing this YAML:

```sh
ha core restart
```

The sidebar panel appears as **Codex** for administrators after Home Assistant
loads the integration.

## Codex CLI

Install Codex yourself and set `codex_command` to the executable path. A common
Home Assistant OS path is:

```yaml
codex_command: /config/bin/codex
```

If `codex` is already on `PATH`, this also works:

```yaml
codex_command: codex
```

## Authenticate Codex

HA Codex UI runs Codex through the bridge with:

```sh
CODEX_HOME=/config/codex_home
```

That means Codex credentials must be created under `/config/codex_home`, not the
default home directory for your shell user. The easiest path is the Account tab
inside HA Codex UI.

OpenAI's [Codex CLI documentation](https://developers.openai.com/codex/cli)
says the first interactive `codex` run prompts you to sign in with a ChatGPT
account or an API key. For HA Codex UI, use the device-code flow so the browser
login can happen outside Home Assistant:

1. Make sure your OpenAI or ChatGPT account has Codex access.
2. For Business, Enterprise, or Edu workspaces, ask a workspace owner/admin to
   enable Codex access for your user or role. OpenAI's
   [Codex plan documentation](https://help.openai.com/en/articles/11369540)
   describes Codex Local as the control for CLI, IDE extension, and local app
   workflows.
3. In Home Assistant, open **Codex**.
4. Open **Settings**.
5. Select **Account**.
6. Click **Log in with device code**.
7. Open the displayed `https://auth.openai.com/codex/device` URL on a device
   where you can sign in to OpenAI.
8. Enter the displayed code and approve the login.
9. Return to HA Codex UI and wait for the Account tab to show the connected
   account.

![HA Codex UI device login](docs/assets/login.png)

You can also authenticate manually from a shell that can run the same Codex
binary:

```sh
CODEX_HOME=/config/codex_home /config/bin/codex login --device-auth
CODEX_HOME=/config/codex_home /config/bin/codex login status
```

After authentication succeeds, start a read-only prompt first and review the
run plan before approving edits or commands.

![HA Codex UI run plan approval](docs/assets/plan.png)

## Bridge Mode

`bridge_url: http://127.0.0.1:8765` enables the packaged local bridge. The bridge
runs Codex outside Home Assistant Core so Codex inherits a safer process
environment and can stream approvals back to the panel.

When the integration starts and `bridge_url` is configured, it starts the bridge
from:

```text
/config/custom_components/ha_codex/bridge/ha_codex_bridge.py
```

Legacy helper scripts under `/config/bin` or `/homeassistant/bin` remain
supported as a fallback for existing local installs.

## Options

| Option | Default | Purpose |
| --- | --- | --- |
| `workspace_path` | `/homeassistant` | Directory where Codex runs. Use `/config` on Home Assistant OS. |
| `require_admin` | `true` | Restricts the sidebar panel to Home Assistant administrators. |
| `codex_command` | `codex` | Codex CLI executable or absolute path. |
| `bridge_url` | `null` | Local bridge URL. Recommended: `http://127.0.0.1:8765`. |
| `addon_write_scope` | `all_visible` | Extra add-on paths exposed to Codex when present. |
| `validation_command` | `auto` | Uses `ha core check` or `hass --script check_config` when available. |

## Troubleshooting

Enable debug logging:

```yaml
logger:
  default: warning
  logs:
    custom_components.ha_codex: debug
```

Useful checks:

```sh
ha core check
pgrep -af ha_codex_bridge.py
tail -f /config/ha_codex_bridge.log
```

If the panel changes do not appear after an update, refresh the browser and then
restart Home Assistant Core.

## Development

```sh
python3 -m unittest tests.test_ha_codex_core
node --test tests/frontend/*.test.mjs
npm ci --prefix frontend
npm run build --prefix frontend
```

The frontend build writes the production module to:

```text
custom_components/ha_codex/frontend/panel.js
```

## License

Apache-2.0
