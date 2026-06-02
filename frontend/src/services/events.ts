export const HA_CODEX_EVENTS = {
  session_updated: "ha_codex/session_updated",
  session_deleted: "ha_codex/session_deleted",
  message_appended: "ha_codex/message_appended",
  message_delta: "ha_codex/message_delta",
  run_finished: "ha_codex/run_finished",
  approval_required: "ha_codex/approval_required",
  validation_finished: "ha_codex/validation_finished",
} as const;
