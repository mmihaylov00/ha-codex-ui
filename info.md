# HA Codex UI

Adds an admin-only Codex sidebar panel to Home Assistant for configuration-aware
chat, command approvals, validation summaries, bridge authentication, and file
change review.

Requires a separately installed Codex CLI. After installing with HACS and
restarting Home Assistant, add **HA Codex UI** from **Settings > Devices &
services**. The setup form is prefilled for bridge mode with `/config` as the
workspace and `/config/bin/codex` as the Codex command.

This integration can run commands and edit files. Keep it admin-only and review
all approval prompts carefully.
