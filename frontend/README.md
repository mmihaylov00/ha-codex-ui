# HA Codex Panel

React + TypeScript frontend for the Home Assistant Codex panel.

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

`npm run dev` serves a local panel preview with mock Home Assistant data so the
custom element can render outside the Home Assistant frontend.

The production build emits `custom_components/ha_codex/frontend/panel.js`, which
is the module URL registered by the `ha_codex` Home Assistant integration.
