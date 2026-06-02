# HA Codex UI

Adds an admin-only Codex sidebar panel to Home Assistant for configuration-aware
chat, command approvals, validation summaries, bridge authentication, and file
change review.

Requires a separately installed Codex CLI. Bridge mode is recommended:

```yaml
ha_codex:
  workspace_path: /config
  require_admin: true
  codex_command: /config/bin/codex
  bridge_url: http://127.0.0.1:8765
  validation_command: auto
```

This integration can run commands and edit files. Keep it admin-only and review
all approval prompts carefully.

