"use client";

import { useT } from "@/i18n/provider";
import { QUIETLY_PRIVACY } from "@/seo/content";
import CtaBlock from "@/components/cta-block";

const CONTACT_EMAIL = "hello@uselunexa.com";

export default function QuietlyPrivacyContent() {
  const { locale } = useT();
  const c = QUIETLY_PRIVACY[locale];

  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <article className="mx-auto max-w-3xl px-6">
        <header className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {c.eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {c.heading}
          </h1>
          <p className="mt-4 text-muted">{c.lastUpdated}</p>
          <p className="mt-6 leading-relaxed text-muted">{c.intro}</p>
        </header>

        <div className="space-y-10 leading-relaxed text-muted">
          {c.sections.map((section, i) => (
            <section key={i}>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {section.title}
              </h2>
              {section.paragraphs?.map((p, j) => (
                <p key={j} className={j > 0 ? "mt-3" : undefined}>
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="ml-6 mt-3 list-disc space-y-2">
                  {section.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              {c.contactTitle}
            </h2>
            <p>
              {c.contactBodyPrefix}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              {c.contactBodySuffix}
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
