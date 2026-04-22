"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";

export default function NotFoundContent() {
  const { t, locale } = useT();

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {t("notfound.eyebrow")}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t("notfound.heading")}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {t("notfound.body")}
        </p>
        <Link
          href={localeHref(locale, "/")}
          className="mt-10 inline-block rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {t("notfound.home")}
        </Link>
      </div>
    </main>
  );
}
