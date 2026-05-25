"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import { WORK } from "@/seo/content";
import CtaBlock from "@/components/cta-block";

export default function WorkPageContent() {
  const { locale } = useT();
  const c = WORK[locale];

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

        <div className="space-y-12">
          {c.items.map((item) => (
            <article
              key={item.slug}
              className="rounded-2xl border border-border bg-surface-light p-8 sm:p-10"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-muted">
                    {item.tagline}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
                    item.status === "live"
                      ? "border-accent/40 text-accent"
                      : "border-border text-muted"
                  }`}
                >
                  {item.statusLabel}
                </span>
              </div>

              <p className="mt-6 leading-relaxed text-muted">{item.body}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    {item.visitLabel}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-muted">
                    {item.visitLabel}
                  </span>
                )}
                {item.privacyPath && (
                  <Link
                    href={localeHref(locale, item.privacyPath)}
                    className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                  >
                    {c.privacyLabel} →
                  </Link>
                )}
              </div>
            </article>
          ))}

          <section className="rounded-2xl border border-dashed border-border p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {c.comingSoonHeading}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted">
              {c.comingSoonBody}
            </p>
          </section>
        </div>

        <div className="mt-20">
          <CtaBlock />
        </div>
      </div>
    </main>
  );
}
