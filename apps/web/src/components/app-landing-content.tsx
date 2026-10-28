"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import { WORK } from "@/seo/content";
import type { Locale } from "@/i18n/config";
import type { AppLandingContent as Copy } from "@/seo/products";
import GooglePlayBadge from "@/components/google-play-badge";
import ProductPlayCta from "@/components/product-play-cta";
import CtaBlock from "@/components/cta-block";

/**
 * Landing page for an app without a screenshot gallery (Chess Rescue,
 * Quietly). Same structure as the RPS Duel page: header with the store badge,
 * highlights, stack, legal links, then a closing Play call to action.
 */
export default function AppLandingContent({
  slug,
  copy,
  playUrl,
  badgeLabelKey,
  privacyPath,
  termsPath,
}: {
  /** Work-card slug, used to read the status label and stack. */
  slug: string;
  copy: Record<Locale, Copy>;
  playUrl: string;
  /** Dictionary key of the app-specific badge label. */
  badgeLabelKey: string;
  privacyPath: string;
  termsPath: string;
}) {
  const { t, locale } = useT();
  const c = copy[locale];
  const work = WORK[locale].items.find((item) => item.slug === slug);
  const badgeLabel = t(badgeLabelKey);

  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href={localeHref(locale, "/work")}
          className="text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          ← {c.backLabel}
        </Link>

        <header className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {c.eyebrow}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {c.heading}
            </h1>
            {work && (
              <span className="mt-4 inline-block rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent">
                {work.statusLabel}
              </span>
            )}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {c.lead}
            </p>
          </div>
          <GooglePlayBadge href={playUrl} label={badgeLabel} className="sm:mt-10" />
        </header>

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {c.highlightsHeading}
            </h2>
            <ul className="ml-6 mt-6 list-disc space-y-2 leading-relaxed text-muted">
              {c.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
            {c.note && <p className="mt-6 text-sm text-muted">{c.note}</p>}
          </section>

          {work && work.stack.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {c.builtWithHeading}
              </h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {work.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <ProductPlayCta name={c.heading} href={playUrl} badgeLabel={badgeLabel} />

        <section className="mt-16 rounded-2xl border border-border bg-surface-light p-8 sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight">{c.legalHeading}</h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href={localeHref(locale, privacyPath)}
              className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              {c.privacyLabel} →
            </Link>
            <Link
              href={localeHref(locale, termsPath)}
              className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              {c.termsLabel} →
            </Link>
          </div>
        </section>

        <div className="mt-20">
          <CtaBlock />
        </div>
      </div>
    </main>
  );
}
