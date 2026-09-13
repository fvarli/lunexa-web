"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import CtaBlock from "@/components/cta-block";

export default function TermsPageContent() {
  const { t, locale } = useT();

  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <article className="mx-auto max-w-3xl px-6">
        <header className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {t("terms_page.eyebrow")}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("terms_page.heading")}
          </h1>
          <p className="mt-4 text-muted">{t("terms_page.last_updated")}</p>
        </header>

        <div className="space-y-10 leading-relaxed text-muted">
          <section className="rounded-2xl border border-border bg-surface-light p-6 sm:p-8">
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("terms_page.product_terms_title")}
            </h2>
            <p>{t("terms_page.product_terms_intro")}</p>
            <ul className="ml-6 mt-3 list-disc space-y-2">
              <li>
                <Link
                  href={localeHref(locale, "/terms/rps-duel")}
                  className="text-accent hover:underline"
                >
                  {t("terms_page.product_terms_rps_duel")}
                </Link>
              </li>
              <li>
                <Link
                  href={localeHref(locale, "/terms/chess-rescue")}
                  className="text-accent hover:underline"
                >
                  {t("terms_page.product_terms_chess_rescue")}
                </Link>
              </li>
              <li>
                <Link
                  href={localeHref(locale, "/terms/quietly")}
                  className="text-accent hover:underline"
                >
                  {t("terms_page.product_terms_quietly")}
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("terms_page.agreement_title")}
            </h2>
            <p>{t("terms_page.agreement_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("terms_page.use_title")}
            </h2>
            <p>{t("terms_page.use_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("terms_page.ip_title")}
            </h2>
            <p>{t("terms_page.ip_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("terms_page.form_title")}
            </h2>
            <p>{t("terms_page.form_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("terms_page.disclaimer_title")}
            </h2>
            <p>{t("terms_page.disclaimer_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("terms_page.liability_title")}
            </h2>
            <p>{t("terms_page.liability_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("terms_page.changes_title")}
            </h2>
            <p>{t("terms_page.changes_body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {t("terms_page.contact_title")}
            </h2>
            <p>
              {t("terms_page.contact_body_prefix")}
              <a
                href="mailto:hello@uselunexa.com"
                className="text-accent hover:underline"
              >
                hello@uselunexa.com
              </a>
              {t("terms_page.contact_body_suffix")}
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
