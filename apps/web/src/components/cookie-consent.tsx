"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useT } from "@/i18n/provider";

const STORAGE_KEY = "lunexa-cookie-consent";

type Preferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = Preferences & {
  timestamp: number;
};

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string {
  return "__ssr__";
}

export default function CookieConsent() {
  const { t } = useT();
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  function save(next: Preferences) {
    const payload: StoredConsent = { ...next, timestamp: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent("cookie-consent:updated", { detail: payload }));
    } catch {
      // localStorage unavailable — session-only dismiss
    }
    setDismissed(true);
  }

  const visible = stored === null && !dismissed;

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 backdrop-blur-md"
    >
      <div className="mx-auto max-w-4xl px-6 py-5">
        <div className="flex flex-col gap-4">
          <div>
            <h2
              id="cookie-consent-title"
              className="text-sm font-semibold text-foreground"
            >
              {t("cookie.title")}
            </h2>
            <p
              id="cookie-consent-desc"
              className="mt-2 text-sm leading-relaxed text-muted"
            >
              {t("cookie.description_prefix")}
              <Link
                href="/privacy"
                className="text-accent transition-opacity hover:opacity-80"
              >
                {t("cookie.privacy_link")}
              </Link>
              {t("cookie.description_suffix")}
            </p>
          </div>

          {showPreferences && (
            <div className="space-y-3 rounded-lg border border-border bg-background/50 p-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="cookie-necessary"
                  checked
                  disabled
                  className="mt-1 accent-accent"
                />
                <label htmlFor="cookie-necessary" className="text-sm">
                  <span className="block font-medium text-foreground">
                    {t("cookie.necessary_title")}
                  </span>
                  <span className="text-muted">
                    {t("cookie.necessary_desc")}
                  </span>
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="cookie-analytics"
                  checked={prefs.analytics}
                  onChange={(e) =>
                    setPrefs({ ...prefs, analytics: e.target.checked })
                  }
                  className="mt-1 accent-accent"
                />
                <label htmlFor="cookie-analytics" className="text-sm">
                  <span className="block font-medium text-foreground">
                    {t("cookie.analytics_title")}
                  </span>
                  <span className="text-muted">
                    {t("cookie.analytics_desc")}
                  </span>
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="cookie-marketing"
                  checked={prefs.marketing}
                  onChange={(e) =>
                    setPrefs({ ...prefs, marketing: e.target.checked })
                  }
                  className="mt-1 accent-accent"
                />
                <label htmlFor="cookie-marketing" className="text-sm">
                  <span className="block font-medium text-foreground">
                    {t("cookie.marketing_title")}
                  </span>
                  <span className="text-muted">
                    {t("cookie.marketing_desc")}
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                save({ necessary: true, analytics: true, marketing: true })
              }
              className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              {t("cookie.accept_all")}
            </button>
            <button
              type="button"
              onClick={() =>
                save({ necessary: true, analytics: false, marketing: false })
              }
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-muted"
            >
              {t("cookie.reject")}
            </button>
            {showPreferences ? (
              <button
                type="button"
                onClick={() => save(prefs)}
                className="rounded-full border border-accent/50 bg-accent/10 px-5 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
              >
                {t("cookie.save")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {t("cookie.manage")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
