#!/usr/bin/env bash
set -euo pipefail

CONFIG_DIR="/config"
DRY_RUN=0
ASSUME_YES=0
KEEP_CODEX_BIN=0
KEEP_GIT_KEY=0
KEEP_CODEX_USER_STATE=0
HOME_DIR_PROVIDED=0
HOME_DIRS=()

usage() {
  cat <<'EOF'
Usage: uninstall-ha-codex-ui.sh [options]

Remove HA Codex UI and Codex-related local state from a Home Assistant install.

Options:
  --config-dir PATH          Home Assistant config directory. Default: /config
  --home-dir PATH            Shell/home directory to clean for Codex state. Can be repeated.
                             If omitted, the script checks HOME plus common Home Assistant homes.
  --dry-run                  Print what would be removed without deleting anything.
  --yes                      Required for real deletion.
  --keep-codex-bin           Keep CONFIG_DIR/bin/codex.
  --keep-git-key             Keep CONFIG_DIR/.ssh/ha_codex_ed25519*.
  --keep-codex-user-state    Keep .codex/.cache/.config/.local Codex state under config/home dirs.
  -h, --help                 Show this help.
EOF
}

die() {
  printf 'Error: %s\n' "$*" >&2
  exit 2
}

normalize_dir() {
  local value="${1%/}"
  [[ -n "$value" ]] || die "directory path cannot be empty"
  [[ "$value" != "/" ]] || die "refusing to use / as a cleanup root"
  printf '%s\n' "$value"
}

add_home_dir() {
  local value
  value="$(normalize_dir "$1")"
  local existing
  if [[ "${#HOME_DIRS[@]}" -gt 0 ]]; then
    for existing in "${HOME_DIRS[@]}"; do
      [[ "$existing" != "$value" ]] || return 0
    done
  fi
  HOME_DIRS+=("$value")
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --config-dir)
      [[ $# -ge 2 ]] || die "--config-dir requires a path"
      CONFIG_DIR="$(normalize_dir "$2")"
      shift 2
      ;;
    --home-dir)
      [[ $# -ge 2 ]] || die "--home-dir requires a path"
      HOME_DIR_PROVIDED=1
      add_home_dir "$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --yes)
      ASSUME_YES=1
      shift
      ;;
    --keep-codex-bin)
      KEEP_CODEX_BIN=1
      shift
      ;;
    --keep-git-key)
      KEEP_GIT_KEY=1
      shift
      ;;
    --keep-codex-user-state)
      KEEP_CODEX_USER_STATE=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      die "unknown option: $1"
      ;;
  esac
done

CONFIG_DIR="$(normalize_dir "$CONFIG_DIR")"

if [[ "$DRY_RUN" -eq 0 && "$ASSUME_YES" -ne 1 ]]; then
  die "real deletion requires --yes. Use --dry-run to preview cleanup targets."
fi

if [[ "$HOME_DIR_PROVIDED" -eq 0 ]]; then
  if [[ -n "${HOME:-}" ]]; then
    add_home_dir "$HOME"
  fi
  [[ ! -d /root ]] || add_home_dir /root
  [[ ! -d /homeassistant ]] || add_home_dir /homeassistant
fi

TARGETS=()

add_target() {
  local value="${1%/}"
  [[ -n "$value" && "$value" != "/" ]] || return 0
  local existing
  if [[ "${#TARGETS[@]}" -gt 0 ]]; then
    for existing in "${TARGETS[@]}"; do
      [[ "$existing" != "$value" ]] || return 0
    done
  fi
  TARGETS+=("$value")
}

add_codex_user_state_targets() {
  local base
  base="$(normalize_dir "$1")"
  add_target "$base/.codex"
  add_target "$base/.cache/codex"
  add_target "$base/.cache/openai-codex"
  add_target "$base/.cache/openai_codex"
  add_target "$base/.config/codex"
  add_target "$base/.config/openai-codex"
  add_target "$base/.config/openai_codex"
  add_target "$base/.local/share/codex"
  add_target "$base/.local/share/openai-codex"
  add_target "$base/.local/share/openai_codex"
  add_target "$base/.local/state/codex"
  add_target "$base/.local/state/openai-codex"
  add_target "$base/.local/state/openai_codex"
}

add_target "$CONFIG_DIR/custom_components/ha_codex"
add_target "$CONFIG_DIR/codex_home"
add_target "$CONFIG_DIR/ha_codex_bridge.log"
add_target "$CONFIG_DIR/.storage/ha_codex.sessions"
add_target "$CONFIG_DIR/www/ha_codex"
add_target "$CONFIG_DIR/bin/start_ha_codex_bridge.sh"
add_target "$CONFIG_DIR/bin/restart_ha_codex_bridge.sh"

if [[ "$KEEP_CODEX_BIN" -eq 0 ]]; then
  add_target "$CONFIG_DIR/bin/codex"
fi

if [[ "$KEEP_GIT_KEY" -eq 0 ]]; then
  add_target "$CONFIG_DIR/.ssh/ha_codex_ed25519"
  add_target "$CONFIG_DIR/.ssh/ha_codex_ed25519.pub"
fi

if [[ "$KEEP_CODEX_USER_STATE" -eq 0 ]]; then
  add_codex_user_state_targets "$CONFIG_DIR"
  if [[ "${#HOME_DIRS[@]}" -gt 0 ]]; then
    for home_dir in "${HOME_DIRS[@]}"; do
      add_codex_user_state_targets "$home_dir"
    done
  fi
fi

found=0
for target in "${TARGETS[@]}"; do
  if [[ -e "$target" || -L "$target" ]]; then
    found=1
    if [[ "$DRY_RUN" -eq 1 ]]; then
      printf 'Would remove: %s\n' "$target"
    else
      rm -rf -- "$target"
      printf 'Removed: %s\n' "$target"
    fi
  fi
done

if [[ "$found" -eq 0 ]]; then
  printf 'No HA Codex UI or Codex cleanup targets found.\n'
fi
