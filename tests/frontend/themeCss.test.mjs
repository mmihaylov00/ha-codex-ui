import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cssPath = new URL("../../frontend/src/styles/panel.css", import.meta.url);

function normalizeCss(css) {
  return css.replace(/\s+/g, " ").trim();
}

test("light theme keeps primary action states white on blue backgrounds", async () => {
  const css = normalizeCss(await readFile(cssPath, "utf8"));

  assert.match(css, /\.ha-codex-root\.theme-light button\s*\{[^}]*color:\s*#ffffff\b/);
  assert.match(
    css,
    /\.ha-codex-root\.theme-light \.run-select-menu button:hover,[^{]*\.ha-codex-root\.theme-light \.modal-tabs button\.active:hover\s*\{[^}]*background:\s*var\(--tw-primary\)[^}]*color:\s*#ffffff\b/,
  );
  assert.match(
    css,
    /\.ha-codex-root\.theme-light \.modal-tabs \.bridge-action:not\(:disabled\):hover,[^{]*\.ha-codex-root\.theme-light \.modal-tabs \.core-action:not\(:disabled\):hover\s*\{[^}]*color:\s*#ffffff\b/,
  );
});

test("light theme keeps archived search and maintenance surfaces white", async () => {
  const css = normalizeCss(await readFile(cssPath, "utf8"));

  assert.match(
    css,
    /\.ha-codex-root\.theme-light \.archive-search\s*\{[^}]*background:\s*rgba\(255,\s*255,\s*255,\s*0\.86\)[^}]*border-color:\s*var\(--tw-border\)[^}]*color:\s*var\(--tw-muted\)/,
  );
  assert.match(
    css,
    /\.ha-codex-root\.theme-light \.archive-search:focus-within\s*\{[^}]*background:\s*#ffffff[^}]*border-color:\s*var\(--tw-primary\)[^}]*color:\s*var\(--tw-primary\)/,
  );
  assert.match(
    css,
    /\.ha-codex-root\.theme-light \.settings-maintenance-row\s*\{[^}]*background:\s*rgba\(255,\s*255,\s*255,\s*0\.72\)[^}]*border:\s*1px solid var\(--tw-border\)/,
  );
});
