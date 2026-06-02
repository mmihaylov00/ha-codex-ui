import "./main";
import { createPreviewHomeAssistant } from "./previewHass";
import type { HomeAssistant, PanelInfo } from "./types/ha";

type HaCodexPanelElement = HTMLElement & {
  hass: HomeAssistant | null;
  panel: PanelInfo | null;
};

const panel = document.querySelector<HaCodexPanelElement>("#ha-codex-preview");

if (panel) {
  panel.panel = {
    config: {
      events: {
        session_updated: "ha_codex/session_updated",
        message_delta: "ha_codex/message_delta",
        message: "ha_codex/message",
        deleted: "ha_codex/session_deleted",
        validation: "ha_codex/validation_finished",
        approval: "ha_codex/approval_requested",
      },
    },
  };
  panel.hass = createPreviewHomeAssistant();
}
