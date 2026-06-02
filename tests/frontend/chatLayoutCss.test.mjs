import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cssPath = new URL("../../frontend/src/styles/panel.css", import.meta.url);

function normalizeCss(css) {
  return css.replace(/\s+/g, " ").trim();
}

test("empty chat state is centered in the available chat panel", async () => {
  const css = normalizeCss(await readFile(cssPath, "utf8"));

  assert.match(
    css,
    /\.chat > \.empty\s*\{[^}]*grid-row:\s*1\s*\/\s*-1[^}]*align-self:\s*center[^}]*justify-self:\s*center\b/,
  );
});
