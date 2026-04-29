import { SK } from "@/lib/storage-keys";

export const THEMES = ["dark", "light"] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = "dark";
/** @deprecated import from `@/lib/storage-keys` SK.theme instead. Kept for compatibility. */
export const THEME_STORAGE_KEY = SK.theme;
