import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { AppShell } from "./App";
import { haCodexThemeClass } from "./features/theme/themeUtils";
import type { HomeAssistant, PanelInfo } from "./types/ha";
import panelCss from "./styles/panel.css?inline";

class HaCodexPanel extends HTMLElement {
  private root: Root | null = null;
  private mount: HTMLDivElement;
  private _hass: HomeAssistant | null = null;
  private _panel: PanelInfo | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = panelCss;
    shadow.appendChild(style);
    this.mount = document.createElement("div");
    this.updateThemeClass();
    shadow.appendChild(this.mount);
  }

  connectedCallback() {
    this.renderReact();
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
  }

  set hass(value: HomeAssistant | null) {
    this._hass = value;
    this.updateThemeClass();
    this.renderReact();
  }

  get hass() {
    return this._hass;
  }

  set panel(value: PanelInfo | null) {
    this._panel = value;
    this.renderReact();
  }

  get panel() {
    return this._panel;
  }

  private renderReact() {
    if (!this.isConnected) return;
    if (!this.root) this.root = createRoot(this.mount);
    this.root.render(<React.StrictMode><AppShell hass={this._hass} panel={this._panel} /></React.StrictMode>);
  }

  private updateThemeClass() {
    this.mount.className = `ha-codex-root ${haCodexThemeClass(this._hass)}`;
  }
}

if (!customElements.get("ha-codex-panel")) {
  customElements.define("ha-codex-panel", HaCodexPanel);
}
