# HA Codex UI

HA Codex UI is a Home Assistant custom integration that adds an admin-only Codex
sidebar panel for inspecting configuration, chatting with Codex, reviewing file
changes, handling approvals, and running Home Assistant validation.

This integration can execute commands and edit files in your Home Assistant
configuration. Keep `require_admin: true`, review approval prompts carefully, and
install it only on Home Assistant instances you control.

![HA Codex UI running in Home Assistant](docs/assets/codex-working.png)

## Features

- **Codex inside Home Assistant**: adds an admin-only **Codex** sidebar panel for
  chatting with Codex about your Home Assistant configuration.
- **Home Assistant-aware context**: attach entities, devices, areas,
  automations, scripts, logs, and configuration files so Codex has the right
  context for each request.
- **Safer editing workflow**: review plans, command approvals, file changes, and
  restart requests before changes are applied.
- **Validation and troubleshooting**: run Home Assistant config checks, inspect
  bridge status, view logs, and see Codex runtime diagnostics from the panel.
- **Git-assisted change review**: set up a Git remote, review diffs, commit,
  push, or discard selected files when Git is configured.
- **UI-based setup**: install with HACS, configure from **Settings > Devices &
  services**, and edit options later from **Configure**.

## Prerequisites

Before installing HA Codex UI, prepare these items:

- **Home Assistant access**: use a Home Assistant instance you control and sign
  in with an administrator account. Keep HA Codex UI admin-only.
- **HACS**: install and configure
  [HACS](https://www.hacs.xyz/docs/use/download/download/) before adding this
  repository.
- **Terminal access to Home Assistant**: use a shell that can access `/config`.
  For Home Assistant OS, the recommended option is
  [Advanced SSH & Web Terminal](https://github.com/hassio-addons/app-ssh).
- **Node.js and npm**: the Codex CLI is installed with npm. Use the official
  [Node.js downloads](https://nodejs.org/en/download) or npm's
  [Node.js and npm install guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
  if your Home Assistant terminal does not already provide `node` and `npm`.
- **OpenAI Codex CLI**: install the CLI separately by following the
  [OpenAI Codex CLI guide](https://developers.openai.com/codex/cli#cli-setup).
- **Codex access**: use an OpenAI or ChatGPT account with Codex access enabled.
- **Optional Git integration requirements**: to use the Git setup page, your
  Home Assistant shell also needs `git`, `ssh-keygen`, network access to your Git
  host, and permission to add the generated SSH public key to the remote account
  or repository.

### Access a Home Assistant terminal

Home Assistant OS users usually need a terminal before they can install the
Codex CLI. The simplest path is Advanced SSH & Web Terminal:

1. Open Home Assistant.
2. Go to **Settings > Apps** or **Settings > Add-ons**, depending on your Home
   Assistant version.
3. Install
   [Advanced SSH & Web Terminal](https://github.com/hassio-addons/app-ssh).
4. Start the app/add-on.
5. Open its web terminal from the Home Assistant sidebar, or connect over SSH
   using the app/add-on configuration.
6. Work from the Home Assistant config directory:

```sh
cd /config
```

Verify the tools you will need:

```sh
node --version
npm --version
git --version
command -v ssh-keygen
```

If `node` or `npm` is missing, install Node.js/npm using the official links
above or the terminal app/add-on package configuration. If Git integration is not
needed, `git` and `ssh-keygen` can be skipped.

## Installation

Install the Codex CLI first, then install HA Codex UI with HACS as an
integration.

### Install Codex CLI

HA Codex UI does not bundle the Codex CLI or credentials. The OpenAI Codex CLI
must be installed separately; see the
[OpenAI Codex CLI getting started guide](https://developers.openai.com/codex/cli#cli-setup)
for the current official install guidance.

For Home Assistant OS, run this from a shell with `npm` available, or copy an
already-installed CLI into a path Home Assistant Core can execute. This
configuration uses `/config/bin/codex`:

```sh
mkdir -p /config/bin /config/codex-cli
npm install --global --prefix /config/codex-cli @openai/codex
ln -sf /config/codex-cli/bin/codex /config/bin/codex
/config/bin/codex --version
```

The HA Codex bridge prepends `/config/bin` to `PATH` before running Codex. If
diagnostics later show that `node` cannot be found, install Node.js somewhere the
bridge can execute it or place a compatible `node` executable at
`/config/bin/node`.

If you install Codex somewhere else, set `codex_command` in the integration
options to that executable path.

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
7. Open **Settings > Devices & services**.
8. Select **Add integration**.
9. Search for **HA Codex UI**.
10. Confirm or adjust the default options.

## Configuration

The preferred setup path is the Home Assistant UI. After HACS installs the
integration and Home Assistant restarts, add **HA Codex UI** from
**Settings > Devices & services**. The setup form is prefilled with these
defaults:

| Option | Default | Purpose |
| --- | --- | --- |
| `workspace_path` | `/config` | Directory where Codex runs. |
| `require_admin` | `true` | Restricts the sidebar panel to Home Assistant administrators. |
| `codex_command` | `/config/bin/codex` | Codex CLI executable or absolute path. |
| `bridge_url` | `http://127.0.0.1:8765` | Local bridge URL. |
| `addon_write_scope` | `all_visible` | Extra add-on paths exposed to Codex when present. |
| `validation_command` | `auto` | Uses `ha core check` or `hass --script check_config` when available. |

To edit these later, open **Settings > Devices & services**, select
**HA Codex UI**, and choose **Configure**.

YAML configuration remains supported for existing installs and is imported into
a Home Assistant config entry when possible:

```yaml
ha_codex:
  workspace_path: /config
  require_admin: true
  codex_command: /config/bin/codex
  bridge_url: http://127.0.0.1:8765
  addon_write_scope: all_visible
  validation_command: auto
```

Restart Home Assistant Core after changing YAML:

```sh
ha core restart
```

The sidebar panel appears as **Codex** for administrators after Home Assistant
loads the configured integration.

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
