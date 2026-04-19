"use client";

import { useT } from "@/i18n/provider";

export default function TermsPageContent() {
  const { t } = useT();

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
      </article>
    </main>
  );
}
