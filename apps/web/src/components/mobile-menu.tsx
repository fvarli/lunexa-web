"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";

export default function MobileMenu() {
  const { t, locale } = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Close whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body scroll lock + ESC-to-close while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Return focus to the toggle after close (aria-expected behavior).
  useEffect(() => {
    if (!open) toggleRef.current?.focus({ preventScroll: true });
  }, [open]);

  const href = (p: string) => localeHref(locale, p);

  const links: { href: string; label: string }[] = [
    { href: href("/about"), label: t("nav.about") },
    { href: href("/services"), label: t("nav.services") },
    { href: href("/blog"), label: t("nav.blog") },
    { href: href("/contact"), label: t("nav.contact") },
  ];

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={t("nav.menu_open")}
        className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.main_menu")}
          className="fixed inset-0 z-[60] flex flex-col bg-background sm:hidden"
        >
          <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
            <span className="text-lg font-semibold tracking-tight">Lunexa</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("nav.menu_close")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-8 text-center">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
