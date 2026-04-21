"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useT } from "@/i18n/provider";

export default function NewsletterConfirmedContent() {
  const { t } = useT();
  const params = useSearchParams();
  const status = params.get("status");

  const ok = status === "ok";
  const title = ok
    ? t("newsletter_confirmed.ok_title")
    : t("newsletter_confirmed.expired_title");
  const body = ok
    ? t("newsletter_confirmed.ok_body")
    : t("newsletter_confirmed.expired_body");

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {ok ? t("newsletter_confirmed.eyebrow_ok") : t("newsletter_confirmed.eyebrow_err")}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{body}</p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {t("newsletter_confirmed.home")}
        </Link>
      </div>
    </main>
  );
}
