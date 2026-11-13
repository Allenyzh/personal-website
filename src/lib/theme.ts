/**
 * Browser-side theme helpers. Dark is the default; the choice is stored under
 * `theme` and applied before first paint by the inline script in BaseLayout.
 */
export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

export const getTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export function setTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice just won't persist.
  }
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
