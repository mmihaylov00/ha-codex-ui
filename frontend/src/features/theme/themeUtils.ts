import type { HomeAssistant } from "../../types/ha";

export type HaCodexTheme = "light" | "dark";

type ThemeSource = Pick<Partial<HomeAssistant>, "selectedTheme" | "themes"> | null | undefined;

export function resolveHaCodexTheme(hass: ThemeSource): HaCodexTheme {
  const userPreference = hass?.selectedTheme;
  if (userPreference && typeof userPreference === "object" && typeof userPreference.dark === "boolean") {
    return userPreference.dark ? "dark" : "light";
  }

  const darkMode = hass?.themes?.darkMode;
  if (typeof darkMode === "boolean") return darkMode ? "dark" : "light";

  return "dark";
}

export function haCodexThemeClass(hass: ThemeSource): `theme-${HaCodexTheme}` {
  return `theme-${resolveHaCodexTheme(hass)}`;
}
