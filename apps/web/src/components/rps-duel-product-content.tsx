"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import { RPS_DUEL_PLAY_URL, RPS_DUEL_PRODUCT, WORK } from "@/seo/content";
import GooglePlayBadge from "@/components/google-play-badge";
import ProductGallery from "@/components/product-gallery";
import CtaBlock from "@/components/cta-block";
import mainEn from "@/assets/products/rps-duel/main-en.png";
import mainTr from "@/assets/products/rps-duel/main-tr.png";
import mainEs from "@/assets/products/rps-duel/main-es.png";
import roundResult from "@/assets/products/rps-duel/round-result.png";
import difficulty from "@/assets/products/rps-duel/difficulty.png";

/**
 * The lead screenshot is captured per language — the same game state in each —
 * so the first frame a visitor sees is in their own language. The two
 * supporting frames exist only as English captures.
 */
const MAIN_SCREENSHOT = { en: mainEn, tr: mainTr, es: mainEs } as const;

export default function RpsDuelProductContent() {
  const { locale } = useT();
  const c = RPS_DUEL_PRODUCT[locale];
  const work = WORK[locale].items.find((item) => item.slug === "rps-duel");

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
          <GooglePlayBadge
            href={RPS_DUEL_PLAY_URL}
            label={work?.visitLabel ?? c.heading}
            className="sm:mt-10"
          />
        </header>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {c.galleryHeading}
          </h2>
          <div className="mt-8">
            <ProductGallery
              images={[
                { src: MAIN_SCREENSHOT[locale], alt: c.galleryAlt.main },
                { src: roundResult, alt: c.galleryAlt.roundResult },
                { src: difficulty, alt: c.galleryAlt.difficulty },
              ]}
            />
          </div>
        </section>

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
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {c.builtWithHeading}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {(work?.stack ?? []).map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-16 rounded-2xl border border-border bg-surface-light p-8 sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight">
            {c.legalHeading}
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href={localeHref(locale, "/privacy/rps-duel")}
              className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              {c.privacyLabel} →
            </Link>
            <Link
              href={localeHref(locale, "/terms/rps-duel")}
              className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              {c.termsLabel} →
            </Link>
            <Link
              href={localeHref(locale, "/support/rps-duel")}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {c.supportLabel} →
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
