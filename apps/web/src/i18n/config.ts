import { SK } from "@/lib/storage-keys";

export const LOCALES = ["en", "tr", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
/** @deprecated import from `@/lib/storage-keys` SK.locale instead. Kept for compatibility. */
export const STORAGE_KEY = SK.locale;

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  es: "Español",
};
