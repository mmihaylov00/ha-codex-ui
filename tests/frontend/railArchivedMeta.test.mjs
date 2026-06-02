import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cssPath = new URL("../../frontend/src/styles/panel.css", import.meta.url);

function cssRuleBody(css, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return css.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`))?.[1] || "";
}

test("archived chat rows keep the timespan metadata visible", async () => {
  const css = await readFile(cssPath, "utf8");
  const archivedMetaRule = cssRuleBody(css, ".session-row.archived .meta");

  assert.doesNotMatch(archivedMetaRule, /display\s*:\s*none\b/);
});
