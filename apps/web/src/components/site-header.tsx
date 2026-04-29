"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import LanguageSwitcher from "./language-switcher";
import ThemeToggle from "./theme-toggle";
import MobileMenu from "./mobile-menu";

export default function SiteHeader() {
  const { t, locale } = useT();
  const href = (path: string) => localeHref(locale, path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={href("/")} className="text-lg font-semibold tracking-tight">
          Lunexa
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
            <Link
              href={href("/about")}
              className="transition-colors hover:text-foreground"
            >
              {t("nav.about")}
            </Link>
            <Link
              href={href("/services")}
              className="transition-colors hover:text-foreground"
            >
              {t("nav.services")}
            </Link>
            <Link
              href={href("/work")}
              className="transition-colors hover:text-foreground"
            >
              {t("nav.work_page")}
            </Link>
            <Link
              href={href("/blog")}
              className="transition-colors hover:text-foreground"
            >
              {t("nav.blog")}
            </Link>
            <Link
              href={href("/contact")}
              className="transition-colors hover:text-foreground"
            >
              {t("nav.contact")}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
