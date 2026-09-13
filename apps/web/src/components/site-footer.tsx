"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";

/**
 * `showUpdates` is passed in rather than read here: the flag lives in the
 * server-side updates module alongside the release entries, which this client
 * component must not pull into the browser bundle.
 */
export default function SiteFooter({ showUpdates }: { showUpdates: boolean }) {
  const { t, locale } = useT();
  const href = (path: string) => localeHref(locale, path);

  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Lunexa. {t("footer.copyright")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {showUpdates && (
            <Link
              href={href("/updates")}
              className="transition-colors hover:text-foreground"
            >
              {t("footer.updates")}
            </Link>
          )}
          <Link
            href={href("/privacy")}
            className="transition-colors hover:text-foreground"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href={href("/terms")}
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
