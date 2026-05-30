"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import CtaBlock from "@/components/cta-block";

export default function PrivacyPageContent() {
  const { t, locale } = useT();

  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <article className="mx-auto max-w-3xl px-6">
        <header className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {t("privacy_page.eyebrow")}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("privacy_page.heading")}
          </h1>
          <p className="mt-4 text-muted">{t("privacy_page.last_updated")}</p>
        </header>

        <div className="space-y-10 leading-relaxed text-muted">
          <section className="rounded-2xl border border-border bg-surface-light p-6 sm:p-8">
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("privacy_page.product_policies_title")}
            </h2>
            <p>{t("privacy_page.product_policies_intro")}</p>
            <ul className="ml-6 mt-3 list-disc space-y-2">
              <li>
                <Link
                  href={localeHref(locale, "/privacy/rps-duel")}
                  className="text-accent hover:underline"
                >
                  {t("privacy_page.product_policies_rps_duel")}
                </Link>
              </li>
              <li>
                <Link
                  href={localeHref(locale, "/privacy/chess-rescue")}
                  className="text-accent hover:underline"
                >
                  {t("privacy_page.product_policies_chess_rescue")}
                </Link>
              </li>
              <li>
                <Link
                  href={localeHref(locale, "/privacy/quietly")}
                  className="text-accent hover:underline"
                >
                  {t("privacy_page.product_policies_quietly")}
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("privacy_page.overview_title")}
            </h2>
            <p>{t("privacy_page.overview_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("privacy_page.collect_title")}
            </h2>
            <p>{t("privacy_page.collect_p1")}</p>
            <p className="mt-3">{t("privacy_page.collect_newsletter")}</p>
            <p className="mt-3">{t("privacy_page.collect_p2")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("privacy_page.usage_title")}
            </h2>
            <ul className="ml-6 list-disc space-y-2">
              <li>{t("privacy_page.usage_item_1")}</li>
              <li>{t("privacy_page.usage_item_2")}</li>
              <li>{t("privacy_page.usage_item_3")}</li>
            </ul>
            <p className="mt-3">{t("privacy_page.usage_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("privacy_page.retention_title")}
            </h2>
            <p>{t("privacy_page.retention_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("privacy_page.cookies_title")}
            </h2>
            <p>{t("privacy_page.cookies_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("privacy_page.rights_title")}
            </h2>
            <p>
              {t("privacy_page.rights_body_prefix")}
              <a
                href="mailto:hello@uselunexa.com"
                className="text-accent hover:underline"
              >
                hello@uselunexa.com
              </a>
              {t("privacy_page.rights_body_suffix")}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("privacy_page.changes_title")}
            </h2>
            <p>{t("privacy_page.changes_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("privacy_page.contact_title")}
            </h2>
            <p>
              {t("privacy_page.contact_body_prefix")}
              <a
                href="mailto:hello@uselunexa.com"
                className="text-accent hover:underline"
              >
                hello@uselunexa.com
              </a>
              {t("privacy_page.contact_body_suffix")}
            </p>
          </section>
        </div>

        <div className="mt-16">
          <CtaBlock variant="compact" />
        </div>
      </article>
    </main>
  );
}
