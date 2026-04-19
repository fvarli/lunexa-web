"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";

export default function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Lunexa. {t("footer.copyright")}
        </p>
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            {t("footer.terms")}
          </Link>
          <a
            href="mailto:hello@uselunexa.com"
            className="transition-colors hover:text-foreground"
          >
            hello@uselunexa.com
          </a>
        </div>
      </div>
    </footer>
  );
}
