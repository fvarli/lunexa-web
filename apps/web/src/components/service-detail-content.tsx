"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import {
  SERVICE_MOBILE,
  SERVICE_WEB,
  SERVICE_INTELLIGENT,
} from "@/seo/content";

type Slug = "mobile" | "web" | "intelligent";

const CONTENT = {
  mobile: SERVICE_MOBILE,
  web: SERVICE_WEB,
  intelligent: SERVICE_INTELLIGENT,
} as const;

export default function ServiceDetailContent({ slug }: { slug: Slug }) {
  const { locale } = useT();
  const c = CONTENT[slug][locale as Locale];

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
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {c.lead}
          </p>
        </header>

        <section className="mb-12">
          <h2 className="mb-3 text-xl font-semibold tracking-tight">
            {c.audience_title}
          </h2>
          <p className="leading-relaxed text-muted">{c.audience_body}</p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            {c.delivery_title}
          </h2>
          <ul className="space-y-3 leading-relaxed text-muted">
            {c.delivery_items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            {c.process_title}
          </h2>
          <ol className="space-y-4">
            {c.process_items.map((item, i) => (
              <li key={i} className="flex gap-4 leading-relaxed">
                <span className="font-mono text-sm text-accent">
                  0{i + 1}
                </span>
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-border bg-surface-light p-8 text-center">
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
