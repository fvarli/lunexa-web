/**
 * Locked `lunexa-*` storage namespace.
 *
 * Single source of truth for every cookie / localStorage / sessionStorage key
 * the app reads or writes. Anywhere else in the codebase, import from this
 * module — never hardcode a key string.
 *
 * Why this exists:
 * - Prevents drift: a single place answers "what keys do we own?".
 * - Audit-friendly: a search for `SK.` shows every site that touches storage.
 * - Migration-friendly: renaming a key happens in one file; consumers stay put.
 *
 * Naming convention: `lunexa-<purpose>` (kebab-case, lowercase). Existing
 * production users have cookies/localStorage entries with these exact names —
 * do not change them without a migration plan.
 *
 * Pattern adopted from techchefdelights `src/lib/storage-keys.ts`.
 */

export const SK = {
  /** Cookie. User's selected locale (set by language switcher; read by proxy). */
  locale: "lunexa-locale",
  /** Cookie. User's selected theme (light / dark). */
  theme: "lunexa-theme",
  /** localStorage. Cookie consent payload — { analytics: boolean, decidedAt: ISO, version: number }. */
  cookieConsent: "lunexa-cookie-consent",
} as const;

export type StorageKey = (typeof SK)[keyof typeof SK];
