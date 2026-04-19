"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/config";
import { useT } from "@/i18n/provider";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function select(next: Locale) {
    setLocale(next);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t("language.switcher_label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-muted hover:text-foreground"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="uppercase">{locale}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("language.switcher_label")}
          className="absolute right-0 top-full z-50 mt-2 min-w-36 overflow-hidden rounded-lg border border-border bg-surface shadow-xl"
        >
          {LOCALES.map((code) => (
            <li key={code} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => select(code)}
                className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors ${
                  locale === code
                    ? "bg-accent/10 text-accent"
                    : "text-foreground hover:bg-surface-light"
                }`}
              >
                <span>{LOCALE_LABELS[code]}</span>
                <span className="text-xs uppercase text-muted">{code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
