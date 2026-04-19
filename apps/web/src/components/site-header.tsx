"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import LanguageSwitcher from "./language-switcher";

export default function SiteHeader() {
  const { t } = useT();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Lunexa
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
            <Link
              href="/#about"
              className="transition-colors hover:text-foreground"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/#work"
              className="transition-colors hover:text-foreground"
            >
              {t("nav.work")}
            </Link>
            <Link
              href="/#principles"
              className="transition-colors hover:text-foreground"
            >
              {t("nav.principles")}
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground"
            >
              {t("nav.contact")}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
