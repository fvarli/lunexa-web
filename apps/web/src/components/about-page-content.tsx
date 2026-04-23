"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import { ABOUT } from "@/seo/content";
import RelatedServices from "@/components/related-services";

export default function AboutPageContent() {
  const { locale } = useT();
  const c = ABOUT[locale];

  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <article className="mx-auto max-w-3xl px-6">
        <header className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {c.eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {c.heading}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{c.lead}</p>
        </header>

        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">
            {c.story.title}
          </h2>
          <div className="space-y-4 leading-relaxed text-muted">
            {c.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            {c.philosophy.title}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {c.philosophy.items.map((item, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold">
                  {String(i + 1).padStart(2, "0")}. {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedServices />

        <section className="mt-16 rounded-2xl border border-border bg-surface-light p-8 text-center">
          <p className="text-lg font-medium">{c.cta_lead}</p>
          <Link
            href={localeHref(locale, "/contact")}
            className="mt-6 inline-block rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {c.cta_button}
          </Link>
        </section>
      </article>
    </main>
  );
}
