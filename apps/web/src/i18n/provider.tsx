"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

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

function writeCookie(locale: Locale) {
  document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function replaceLocaleSegment(pathname: string, next: Locale): string {
  // segments like ["", "tr", "contact"] or ["", "contact"] (English default has no prefix)
  const segments = pathname.split("/");
  if (segments.length < 2) {
    return next === DEFAULT_LOCALE ? "/" : `/${next}`;
  }

  const hasLocalePrefix = (LOCALES as readonly string[]).includes(segments[1]);

  if (hasLocalePrefix) {
    if (next === DEFAULT_LOCALE) {
      // switching to English — strip the prefix
      segments.splice(1, 1);
    } else {
      segments[1] = next;
    }
  } else {
    // no prefix currently (English) — prepend only when leaving English
    if (next !== DEFAULT_LOCALE) {
      segments.splice(1, 0, next);
    }
  }

  const joined = segments.join("/");
  return joined || "/";
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // URL is the source of truth; we don't mutate locale state outside of navigation.
  const locale = initialLocale;

  const setLocale = (next: Locale) => {
    if (next === locale) return;
    writeCookie(next); // soft hint so middleware knows preference on future root visits
    const nextPath = replaceLocaleSegment(pathname ?? "/", next);
    router.push(nextPath);
    router.refresh();
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
