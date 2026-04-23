"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import { SERVICES_INDEX } from "@/seo/content";
import CtaBlock from "@/components/cta-block";

export default function ServicesIndexContent() {
  const { locale } = useT();
  const c = SERVICES_INDEX[locale];

  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {c.eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {c.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {c.lead}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {c.items.map((item) => (
            <Link
              key={item.slug}
              href={localeHref(locale, `/services/${item.slug}`)}
              className="group flex flex-col rounded-2xl border border-border bg-surface-light p-8 transition-colors hover:border-accent/40"
            >
              <h2 className="text-xl font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-muted">
                {item.body}
              </p>
              <span className="mt-6 text-sm font-medium text-accent transition-opacity group-hover:opacity-80">
                {item.link_label} →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-20">
          <CtaBlock />
        </div>
      </div>
    </main>
  );
}
