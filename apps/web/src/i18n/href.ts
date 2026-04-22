import { LOCALES, type Locale } from "./config";

/**
 * Prefix an internal path with the current locale.
 * External URLs, hash-only links ("#foo"), and already-prefixed paths pass through.
 */
export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href; // external, hash, mailto, etc.

  const segments = href.split("/");
  if (segments.length >= 2 && (LOCALES as readonly string[]).includes(segments[1])) {
    return href; // already has a locale prefix
  }

  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}
