import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const target = resolve("../custom_components/ha_codex/frontend/panel.js");

await mkdir(dirname(target), { recursive: true });
await copyFile(resolve("dist/panel.js"), target);
