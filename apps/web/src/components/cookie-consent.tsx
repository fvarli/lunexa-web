"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useT } from "@/i18n/provider";

const STORAGE_KEY = "lunexa-cookie-consent";

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

  function acknowledge() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ acknowledged: true, timestamp: Date.now() })
      );
    } catch {
      // ignore
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
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
          <button
            type="button"
            onClick={acknowledge}
            className="shrink-0 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t("cookie.acknowledge")}
          </button>
        </div>
      </div>
    </div>
  );
}
