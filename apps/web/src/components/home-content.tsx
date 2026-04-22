"use client";

import ContactForm from "@/components/contact-form";
import NewsletterForm from "@/components/newsletter-form";
import HomeFaq from "@/components/home-faq";
import { useT } from "@/i18n/provider";

export default function HomeContent() {
  const { t } = useT();

  return (
    <main className="flex-1">
      {/* ── Hero ── */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          {t("hero.eyebrow")}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {t("hero.heading_1")}
          <br />
          <span className="text-accent">{t("hero.heading_2")}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          {t("hero.subtitle")}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t("hero.cta_primary")}
          </a>
          <a
            href="#about"
            className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:border-muted"
          >
            {t("hero.cta_secondary")}
          </a>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="border-t border-border/50 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {t("about.eyebrow")}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("about.heading")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {t("about.paragraph_1_prefix")}
            <em>{t("about.paragraph_1_luna")}</em>
            {t("about.paragraph_1_mid")}
            <em>{t("about.paragraph_1_exa")}</em>
            {t("about.paragraph_1_suffix")}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {t("about.paragraph_2")}
          </p>
        </div>
      </section>

      {/* ── What We Build ── */}
      <section
        id="work"
        className="border-t border-border/50 bg-surface py-24 sm:py-32"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t("work.eyebrow")}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("work.heading")}
            </h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface-light p-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              </div>
              <h3 className="text-lg font-semibold">{t("work.items.mobile_title")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t("work.items.mobile_desc")}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface-light p-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <h3 className="text-lg font-semibold">{t("work.items.web_title")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t("work.items.web_desc")}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface-light p-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3 className="text-lg font-semibold">{t("work.items.ai_title")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t("work.items.ai_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section
        id="principles"
        className="border-t border-border/50 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t("principles.eyebrow")}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("principles.heading")}
            </h2>
          </div>
          <div className="mt-16 grid gap-12 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">{t("principles.items.clarity_title")}</h3>
              <p className="mt-2 leading-relaxed text-muted">
                {t("principles.items.clarity_desc")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("principles.items.speed_title")}</h3>
              <p className="mt-2 leading-relaxed text-muted">
                {t("principles.items.speed_desc")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("principles.items.craft_title")}</h3>
              <p className="mt-2 leading-relaxed text-muted">
                {t("principles.items.craft_desc")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("principles.items.global_title")}</h3>
              <p className="mt-2 leading-relaxed text-muted">
                {t("principles.items.global_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Coming Soon ── */}
      <section className="border-t border-border/50 bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {t("coming_soon.eyebrow")}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("coming_soon.heading")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {t("coming_soon.subtitle")}
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {t("coming_soon.badge")}
          </div>
        </div>
      </section>

      <HomeFaq />

      {/* ── Newsletter ── */}
      <section
        id="newsletter"
        className="border-t border-border/50 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-xl px-6">
          <div className="text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t("newsletter.eyebrow")}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("newsletter.heading")}
            </h2>
            <p className="mt-4 text-muted">{t("newsletter.subtitle")}</p>
          </div>
          <div className="mt-10">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* ── Contact (UI only) ── */}
      <section
        id="contact"
        className="border-t border-border/50 bg-surface py-24 sm:py-32"
      >
        <div className="mx-auto max-w-xl px-6">
          <div className="text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t("contact_section.eyebrow")}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("contact_section.heading")}
            </h2>
            <p className="mt-4 text-muted">
              {t("contact_section.subtitle")}
            </p>
          </div>
          <div className="mt-12">
            <ContactForm idPrefix="home" />
          </div>
        </div>
      </section>
    </main>
  );
}
