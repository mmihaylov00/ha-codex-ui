[![CI](https://img.shields.io/github/actions/workflow/status/mmihaylov00/ha-codex-ui/ci.yml?branch=main&label=CI&logo=github&style=popout)](https://github.com/mmihaylov00/ha-codex-ui/actions/workflows/ci.yml?query=branch%3Amain)
[![codecov](https://codecov.io/gh/mmihaylov00/ha-codex-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/mmihaylov00/ha-codex-ui)
[![Validate with hassfest](https://github.com/mmihaylov00/ha-codex-ui/actions/workflows/hassfest.yml/badge.svg)](https://github.com/mmihaylov00/ha-codex-ui/actions/workflows/hassfest.yml)
[![GitHub Release][releases-shield]][releases]
[![GitHub All Releases][downloads-total-shield]][releases]
[![Revolut.Me][revolut-me-shield]][revolut-me]

# HA Codex UI

HA Codex UI is a Home Assistant custom integration that adds an admin-only Codex
sidebar panel for inspecting configuration, chatting with Codex, reviewing file
changes, handling approvals, and running Home Assistant validation. Use it for
generating and iterating on (vibecoding) automations, dashboards, scripts,
scenes, YAML, and other configurable parts of Home Assistant.

After the initial version, HA Codex UI itself has been built directly inside
Home Assistant using this workflow.

This is a development tool. It can execute commands and edit files in your Home
Assistant configuration, which means a wrong prompt, approval, command, or model
output can damage files and break Home Assistant. Keep `require_admin: true`,
review approval prompts carefully, keep current backups while working with it,
and install it only on Home Assistant instances you control.

![HA Codex UI running in Home Assistant](docs/assets/codex-working.png)

## Open Source

HA Codex UI is open source under the Apache-2.0 license. You can use, modify,
and share the integration for personal or commercial Home Assistant setups under
the license terms. Contributions, bug reports, documentation improvements, and
feature ideas are welcome.

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

Before installing HA Codex UI, make sure you have:

- **Home Assistant access**: use a Home Assistant instance you control and sign
  in with an administrator account. Keep HA Codex UI admin-only.
- **Codex access**: use an OpenAI or ChatGPT account with Codex access enabled.
- **Supported runtime**: Home Assistant must run Python 3.10 or newer on Linux
  `x86_64` or `aarch64` so the pinned Codex SDK runtime can be installed.
- **Optional Git integration requirements**: to use the Git setup page, your
  Home Assistant shell also needs `git`, `ssh-keygen`, network access to your Git
  host, and permission to add the generated SSH public key to the remote account
  or repository.

## Installation

Follow these steps in order. The UI values use the default HA Codex UI paths:

- Codex runtime: pinned Python SDK runtime installed by Home Assistant
- Codex credentials: `/config/codex_home`
- Workspace path: `/config`
- Bridge URL: `http://127.0.0.1:8765`

### 1. Install HA Codex UI

Install the integration files with HACS.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=mmihaylov00&repository=ha-codex-ui&category=integration)

Recommended HACS install:

1. Open **HACS** in Home Assistant.
2. Add `https://github.com/mmihaylov00/ha-codex-ui` as a custom integration
   repository if HA Codex UI is not already listed.
3. Search for **HA Codex UI**.
4. Download the integration.
5. Restart Home Assistant Core.

### 2. Codex runtime

HA Codex UI uses OpenAI's Python Codex SDK by default. Home Assistant installs
the pinned `openai-codex==0.1.0b2` dependency declared by the integration, and
that SDK dependency includes the matching local Codex runtime binary.

You only need a custom CLI path if you intentionally want to override the pinned
SDK runtime. In that case, install Codex separately and set the integration
option `codex_command` to the absolute executable path or a command on `PATH`.

Optional Git integration check:

```sh
git --version
command -v ssh-keygen
```

### 3. Add the Home Assistant integration

After Home Assistant restarts:

1. Open **Settings > Devices & services**.
2. Select **Add integration**.
3. Search for **HA Codex UI**.
4. Confirm or set these options:

| Option | Set it to | Possible values | Where it is used |
| --- | --- | --- | --- |
| `workspace_path` | `/config` | Any Home Assistant-accessible filesystem path, usually `/config`. | Codex runs from this Home Assistant config directory. |
| `require_admin` | `true` | `true` or `false`. Keep `true` unless you intentionally want non-admin access. | Keeps the Codex sidebar panel admin-only. |
| `openai_training_opt_out_confirmed` | `false` | `true` or `false`. Set `true` after disabling training in OpenAI's Data Controls and Codex Settings. | Allows HA Codex UI to send prompts and selected context to Codex only after the admin confirms the upstream training opt-out. |
| `codex_command` | blank | Blank to use the pinned SDK runtime, an absolute executable path, or a command name on `PATH`. | Optional custom Codex CLI override. |
| `bridge_url` | `http://127.0.0.1:8765` | Local URL such as `http://127.0.0.1:8765`, or blank/`none`/`null` to disable bridge mode. | Enables the packaged local bridge. |
| `addon_write_scope` | `all_visible` | `all_visible`, `none`, blank, or comma-separated absolute paths such as `/addons,/addon_configs`. | Lets Codex see writable add-on folders when present. |
| `validation_command` | `auto` | `auto`, `none`, blank, or command text such as `ha core check`. | Lets HA Codex choose `ha core check` when available. |

To edit these values later, open **Settings > Devices & services**, select
**HA Codex UI**, and choose **Configure**.

### 4. Authenticate Codex

HA Codex UI stores bridge credentials under `/config/codex_home`. Authenticate
from the HA Codex UI Account tab:

1. Make sure your OpenAI or ChatGPT account has Codex access.
2. In Home Assistant, open **Codex** from the sidebar.
3. Open **Settings**.
4. Select **Account**.
5. Click **Log in with device code**.
6. Open the displayed `https://auth.openai.com/codex/device` URL on a device
   where you can sign in to OpenAI.
7. Enter the displayed code and approve the login.
8. Return to HA Codex UI and wait for the Account tab to show the connected
   account.

![HA Codex UI device login](docs/assets/login.png)

### 5. Verify the first run

1. Open **Codex** in the Home Assistant sidebar.
2. Open **Settings > Debug** and confirm the runner, bridge URL, and workspace
   path look correct.
3. Start with a read-only prompt, such as:

```text
Inspect my Home Assistant configuration and summarize what integrations are configured. Do not edit files.
```

4. Review the run plan, command approvals, and file changes before approving any
   edit.

![HA Codex UI run plan approval](docs/assets/plan.png)

## Configuration

The preferred setup path is the Home Assistant UI. These are the places where
the important values are created or edited:

| Value | Where to set it | Default or path |
| --- | --- | --- |
| Integration files | HACS | `/config/custom_components/ha_codex` |
| Codex runtime | Home Assistant Python requirements | Pinned SDK runtime |
| Integration options | **Settings > Devices & services > HA Codex UI > Configure** | See the table below |
| Codex credentials | **Codex > Settings > Account** | `/config/codex_home` |
| Git remote and SSH key | **Codex > Settings > Git** | Set only if you want Git review, commit, and push controls |

The integration setup form is prefilled with these defaults:

| Option | Default | Possible values | Purpose |
| --- | --- | --- | --- |
| `workspace_path` | `/config` | Any Home Assistant-accessible filesystem path, usually `/config`. | Directory where Codex runs. |
| `require_admin` | `true` | `true` or `false`. | Restricts the sidebar panel to Home Assistant administrators. |
| `openai_training_opt_out_confirmed` | `false` | `true` or `false`. | Gates prompt and selected-context sends until the admin confirms OpenAI training opt-out is configured. |
| `codex_command` | blank | Blank, absolute executable path, or command name on `PATH`. | Optional custom Codex CLI override. |
| `bridge_url` | `http://127.0.0.1:8765` | Local URL, blank, `none`, or `null`. | Local bridge URL. |
| `addon_write_scope` | `all_visible` | `all_visible`, `none`, blank, comma-separated absolute paths, or a YAML list for YAML configuration. | Extra add-on paths exposed to Codex when present. |
| `validation_command` | `auto` | `auto`, `none`, blank, command text, or a YAML list for YAML configuration. | Uses `ha core check` or `hass --script check_config` when available. |

To edit these later, open **Settings > Devices & services**, select
**HA Codex UI**, and choose **Configure**.

YAML configuration remains supported for existing installs and is imported into
a Home Assistant config entry when possible:

```yaml
ha_codex:
  workspace_path: /config
  require_admin: true
  openai_training_opt_out_confirmed: false
  codex_command:
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

## OpenAI Training Controls

Codex has to send prompts and selected Home Assistant context to OpenAI to work.
HA Codex UI cannot change OpenAI account or workspace data controls by itself.
Use OpenAI's [Data Controls][openai-data-controls] and
[Codex Settings][openai-codex-settings] to opt out of training, then set
`openai_training_opt_out_confirmed: true` in **Settings > Devices & services >
HA Codex UI > Configure** or YAML.

When `openai_training_opt_out_confirmed` is `false`, HA Codex UI still starts the
local bridge and keeps account, login, usage, logs, context browsing, Git review,
and validation available. It rejects Codex task-content paths that would send
prompts or selected context, including new runs, run-plan approvals, steering,
and retries.

For individual ChatGPT/Codex accounts, OpenAI says training can be turned off
through the privacy portal or ChatGPT Data Controls, and Codex full-environment
training has separate controls in Codex Settings. For OpenAI API usage, OpenAI's
[platform data-controls documentation][openai-platform-data-controls] says API
inputs and outputs are not used for training by default.

## Authentication Details

HA Codex UI runs Codex through the bridge with:

```sh
CODEX_HOME=/config/codex_home
```

That means Codex credentials must be created under `/config/codex_home`, not the
default home directory for your shell user. Use the installation step
**4. Authenticate Codex** unless you need to troubleshoot login manually.

For Business, Enterprise, or Edu workspaces, a workspace owner/admin may need to
enable Codex access for your user or role. OpenAI's
[Codex plan documentation](https://help.openai.com/en/articles/11369540)
describes Codex Local as the control for CLI, IDE extension, and local app
workflows.

You can also authenticate manually from a shell when you configured a custom
Codex binary:

```sh
CODEX_HOME=/config/codex_home /config/bin/codex login --device-auth
CODEX_HOME=/config/codex_home /config/bin/codex login status
```

Do not run a plain `codex login` without `CODEX_HOME=/config/codex_home`; that
would create credentials in the terminal user's home directory instead of the
bridge credential directory used by HA Codex UI.

## Bridge Mode

`bridge_url: http://127.0.0.1:8765` enables the packaged local bridge. The bridge
runs Codex outside Home Assistant Core so Codex inherits a safer process
environment and can stream approvals back to the panel. By default the bridge
uses the pinned Python SDK runtime; `codex_command` is only needed for a custom
CLI override.

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

## Cleanup After Removal

Before or after removing the HA Codex UI integration from Home Assistant, use
the uninstall script to remove local HA Codex UI and Codex-related files. Stop
Home Assistant Core first or make a current backup before deleting anything.

```sh
bash /config/custom_components/ha_codex/uninstall.sh --dry-run
bash /config/custom_components/ha_codex/uninstall.sh --yes
```

By default the script removes all HA Codex UI and Codex-related paths it finds
for the Home Assistant install, including:

- `/config/custom_components/ha_codex`
- `/config/codex_home`
- `/config/ha_codex_bridge.log`
- `/config/.storage/ha_codex.sessions`
- `/config/www/ha_codex`
- `/config/bin/start_ha_codex_bridge.sh`
- `/config/bin/restart_ha_codex_bridge.sh`
- `/config/bin/codex`
- `/config/.ssh/ha_codex_ed25519`
- `/config/.ssh/ha_codex_ed25519.pub`
- Codex state/config/cache directories such as `.codex`, `.cache/codex`,
  `.cache/openai-codex`, `.config/codex`, `.local/share/codex`, and
  `.local/state/codex` under `/config`, `$HOME`, `/root`, and `/homeassistant`
  when those paths exist.

If your installation used `/homeassistant` instead of `/config`, pass the config
directory explicitly:

```sh
bash /homeassistant/custom_components/ha_codex/uninstall.sh --config-dir /homeassistant --dry-run
bash /homeassistant/custom_components/ha_codex/uninstall.sh --config-dir /homeassistant --yes
```

If the integration files are already gone, run the copy from a checked-out HA
Codex UI repository instead:

```sh
bash scripts/uninstall-ha-codex-ui.sh --config-dir /config --dry-run
bash scripts/uninstall-ha-codex-ui.sh --config-dir /config --yes
```

The script has opt-out flags for unusual cases where a Codex binary, generated
Git key, or Codex user state is shared with something outside HA Codex UI:
`--keep-codex-bin`, `--keep-git-key`, and `--keep-codex-user-state`. Start or
restart Home Assistant Core after cleanup so the sidebar, storage cache, and
static panel registration are refreshed.

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

[releases]: https://github.com/mmihaylov00/ha-codex-ui/releases
[releases-shield]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Frepos%2Fmmihaylov00%2Fha-codex-ui%2Freleases%2Flatest&query=%24.tag_name&label=release&logo=github&style=popout
[downloads-total-shield]: https://img.shields.io/github/downloads/mmihaylov00/ha-codex-ui/total?style=popout
[openai-codex-settings]: https://chatgpt.com/codex/settings
[openai-data-controls]: https://help.openai.com/en/articles/5722486-data-controls-faq
[openai-platform-data-controls]: https://platform.openai.com/docs/guides/your-data
[revolut-me]: https://revolut.me/mmihaylov00
[revolut-me-shield]: https://img.shields.io/static/v1.svg?label=%20&message=Revolut&logo=revolut&style=popout

## License

Apache-2.0
