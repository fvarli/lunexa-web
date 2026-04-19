"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LOCALE_CHANGE_EVENT = "lunexa:locale-change";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

function writeCookie(locale: Locale) {
  document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function resolveKey(dict: Dictionary, path: string): string {
  const parts = path.split(".");
  let node: unknown = dict;
  for (const part of parts) {
    if (node && typeof node === "object" && part in node) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return typeof node === "string" ? node : path;
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Cross-tab sync: react to changes from other tabs/windows
  useEffect(() => {
    function onExternal() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (isLocale(stored) && stored !== locale) {
          setLocaleState(stored);
        }
      } catch {
        // ignore
      }
    }
    window.addEventListener("storage", onExternal);
    window.addEventListener(LOCALE_CHANGE_EVENT, onExternal);
    return () => {
      window.removeEventListener("storage", onExternal);
      window.removeEventListener(LOCALE_CHANGE_EVENT, onExternal);
    };
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    writeCookie(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new CustomEvent(LOCALE_CHANGE_EVENT));
    } catch {
      // ignore
    }
  };

  const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
  const t = (path: string) => resolveKey(dict, path);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useT must be used within LanguageProvider");
  }
  return ctx;
}
