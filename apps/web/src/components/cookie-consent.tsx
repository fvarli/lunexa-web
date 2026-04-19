"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "lunexa-cookie-consent";

type Preferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = Preferences & {
  timestamp: number;
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function save(next: Preferences) {
    const payload: StoredConsent = { ...next, timestamp: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent("cookie-consent:updated", { detail: payload }));
    } catch {
      // localStorage unavailable — session-only dismiss
    }
    setVisible(false);
  }

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
              Cookie Notice
            </h2>
            <p
              id="cookie-consent-desc"
              className="mt-2 text-sm leading-relaxed text-muted"
            >
              We use cookies to give you a better experience. Necessary cookies
              are required for the site to function. You can manage analytics
              and marketing cookies according to your preferences. For more
              information, see our{" "}
              <Link
                href="/privacy"
                className="text-accent transition-opacity hover:opacity-80"
              >
                Privacy Policy
              </Link>
              .
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
                    Necessary cookies
                  </span>
                  <span className="text-muted">
                    Required for core site functionality. Cannot be disabled.
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
                    Analytics cookies
                  </span>
                  <span className="text-muted">
                    For page performance and usage statistics.
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
                    Marketing cookies
                  </span>
                  <span className="text-muted">
                    For personalized content and advertising.
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
              Accept All
            </button>
            <button
              type="button"
              onClick={() =>
                save({ necessary: true, analytics: false, marketing: false })
              }
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-muted"
            >
              Reject
            </button>
            {showPreferences ? (
              <button
                type="button"
                onClick={() => save(prefs)}
                className="rounded-full border border-accent/50 bg-accent/10 px-5 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
              >
                Save Preferences
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Manage Preferences
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
