"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_THEME, THEMES, THEME_STORAGE_KEY, type Theme } from "./config";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function isTheme(value: string | undefined | null): value is Theme {
  return !!value && (THEMES as readonly string[]).includes(value);
}

function writeCookie(theme: Theme) {
  document.cookie = `${THEME_STORAGE_KEY}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  // Sync the data-theme attribute whenever state changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // React to changes from other tabs
  useEffect(() => {
    function onExternal() {
      try {
        const match = document.cookie.match(
          new RegExp(`(?:^|; )${THEME_STORAGE_KEY}=([^;]*)`)
        );
        const next = match ? decodeURIComponent(match[1]) : null;
        if (isTheme(next) && next !== theme) {
          setThemeState(next);
        }
      } catch {
        // ignore
      }
    }
    window.addEventListener("storage", onExternal);
    return () => window.removeEventListener("storage", onExternal);
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    writeCookie(next);
  };

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export { DEFAULT_THEME, THEME_STORAGE_KEY, isTheme };
