import assert from "node:assert/strict";
import test from "node:test";

import { haCodexThemeClass, resolveHaCodexTheme } from "../../frontend/src/features/theme/themeUtils.ts";

test("theme resolver follows Home Assistant effective light mode", () => {
  assert.equal(resolveHaCodexTheme({ themes: { darkMode: false } }), "light");
  assert.equal(haCodexThemeClass({ themes: { darkMode: false } }), "theme-light");
});

test("theme resolver follows Home Assistant effective dark mode", () => {
  assert.equal(resolveHaCodexTheme({ themes: { darkMode: true } }), "dark");
  assert.equal(haCodexThemeClass({ themes: { darkMode: true } }), "theme-dark");
});

test("theme resolver falls back to current dark palette until Home Assistant provides preferences", () => {
  assert.equal(resolveHaCodexTheme(null), "dark");
  assert.equal(resolveHaCodexTheme({}), "dark");
});

test("theme resolver follows explicit Home Assistant user preference while effective theme catches up", () => {
  assert.equal(resolveHaCodexTheme({ selectedTheme: { theme: "default", dark: false }, themes: { darkMode: true } }), "light");
  assert.equal(haCodexThemeClass({ selectedTheme: { theme: "default", dark: false }, themes: { darkMode: true } }), "theme-light");
  assert.equal(resolveHaCodexTheme({ selectedTheme: { theme: "default", dark: true }, themes: { darkMode: false } }), "dark");
});

test("theme resolver uses effective Home Assistant mode for auto user preference", () => {
  assert.equal(resolveHaCodexTheme({ selectedTheme: { theme: "default" }, themes: { darkMode: false } }), "light");
  assert.equal(resolveHaCodexTheme({ selectedTheme: { theme: "default" }, themes: { darkMode: true } }), "dark");
});
