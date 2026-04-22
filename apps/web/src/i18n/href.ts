import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";

/**
 * Turn an internal path into a locale-aware URL.
 * Strategy: DEFAULT_LOCALE (English) has no prefix; other locales are
 * prefixed with `/${locale}`. External, hash, mailto, and already-prefixed
 * paths pass through unchanged.
 */
export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href;

  const segments = href.split("/");
  if (segments.length >= 2 && (LOCALES as readonly string[]).includes(segments[1])) {
    return href; // already has a locale prefix
  }

  if (locale === DEFAULT_LOCALE) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}
