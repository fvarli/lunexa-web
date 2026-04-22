"use client";

import { useT } from "@/i18n/provider";
import { BLOG_INDEX } from "@/seo/content";

export default function BlogIndexContent() {
  const { locale } = useT();
  const c = BLOG_INDEX[locale];

  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-3xl px-6">
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

        <section className="rounded-2xl border border-border bg-surface-light p-12 text-center">
          <p className="text-base leading-relaxed text-muted">{c.empty}</p>
        </section>
      </div>
    </main>
  );
}
