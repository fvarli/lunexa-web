"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";

export default function NewsletterUnsubscribedContent() {
  const { t, locale } = useT();
  const params = useSearchParams();
  const status = params.get("status");

  const ok = status === "ok";
  const title = ok
    ? t("newsletter_unsubscribed.ok_title")
    : t("newsletter_unsubscribed.expired_title");
  const body = ok
    ? t("newsletter_unsubscribed.ok_body")
    : t("newsletter_unsubscribed.expired_body");
  const eyebrow = ok
    ? t("newsletter_unsubscribed.eyebrow_ok")
    : t("newsletter_unsubscribed.eyebrow_err");

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{body}</p>
        <Link
          href={localeHref(locale, "/")}
          className="mt-10 inline-block rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {t("newsletter_unsubscribed.home")}
        </Link>
      </div>
    </main>
  );
}
