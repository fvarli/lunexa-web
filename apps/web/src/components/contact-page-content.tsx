"use client";

import Link from "next/link";
import ContactForm from "@/components/contact-form";
import { useT } from "@/i18n/provider";

export default function ContactPageContent() {
  const { t } = useT();

  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <header className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {t("contact_page.eyebrow")}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("contact_page.heading")}
          </h1>
          <p className="mt-4 text-lg text-muted">
            {t("contact_page.subtitle")}
          </p>
        </header>

        <div className="grid gap-16 sm:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                {t("contact_page.email_heading")}
              </h2>
              <a
                href="mailto:hello@uselunexa.com"
                className="text-lg text-foreground transition-colors hover:text-accent"
              >
                hello@uselunexa.com
              </a>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                {t("contact_page.support_heading")}
              </h2>
              <a
                href="mailto:support@uselunexa.com"
                className="text-lg text-foreground transition-colors hover:text-accent"
              >
                support@uselunexa.com
              </a>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                {t("contact_page.response_heading")}
              </h2>
              <p className="text-muted">{t("contact_page.response_time")}</p>
            </div>
          </div>

          <ContactForm idPrefix="contact" />
        </div>

        <p className="mt-16 text-center text-sm text-muted">
          {t("contact_page.agreement_prefix")}
          <Link href="/privacy" className="text-accent hover:underline">
            {t("contact_page.privacy_link")}
          </Link>
          {t("contact_page.agreement_suffix")}
        </p>
      </div>
    </main>
  );
}
