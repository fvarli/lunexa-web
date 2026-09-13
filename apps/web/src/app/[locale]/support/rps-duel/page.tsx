import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import FaqList from "@/components/faq-list";
import GooglePlayBadge from "@/components/google-play-badge";
import { localeHref } from "@/i18n/href";
import { RPS_DUEL_PLAY_URL, RPS_DUEL_SUPPORT } from "@/seo/content";
import { buildPageMetadata, RPS_DUEL_SUPPORT_META, urlFor } from "@/seo/meta";
import { LOCALES, type Locale } from "@/i18n/config";

export const revalidate = 86400;

function toLocale(locale: string): Locale {
  return ((LOCALES as readonly string[]).includes(locale) ? locale : "en") as Locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(
    toLocale(locale),
    "/support/rps-duel",
    RPS_DUEL_SUPPORT_META
  );
}

/**
 * Rendered entirely on the server — no `"use client"`. The locale comes from the
 * route rather than the language context, `localeHref` is a pure function, and
 * the disclosures are native `<details>`, so nothing here needs hydration. That
 * makes this the one product page that ships no JavaScript of its own.
 *
 * Structured data is Breadcrumb only. FAQPage markup is deliberately absent:
 * Google narrowed FAQ rich results to authoritative government and health sites
 * in 2023 and retired the feature outright in 2026, so the markup would carry
 * no benefit for this page.
 */
export default async function RpsDuelSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safe = toLocale(locale);
  const c = RPS_DUEL_SUPPORT[safe];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: urlFor(safe, "/") },
          { name: "RPS Duel", url: urlFor(safe, "/work/rps-duel") },
          { name: "Support", url: urlFor(safe, "/support/rps-duel") },
        ]}
      />

      <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href={localeHref(safe, "/work/rps-duel")}
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            ← {c.backLabel}
          </Link>

          <header className="mt-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {c.eyebrow}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {c.heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{c.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.facts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                >
                  {fact}
                </li>
              ))}
            </ul>
          </header>

          <section className="mt-12 rounded-2xl border border-border bg-surface-light p-8 sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight">
              {c.linksHeading}
            </h2>
            <div className="mt-6">
              <GooglePlayBadge href={RPS_DUEL_PLAY_URL} label={c.playLabel} />
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href={localeHref(safe, "/work/rps-duel")}
                className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                {c.productLabel} →
              </Link>
              <Link
                href={localeHref(safe, "/privacy/rps-duel")}
                className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                {c.privacyLabel} →
              </Link>
              <Link
                href={localeHref(safe, "/terms/rps-duel")}
                className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                {c.termsLabel} →
              </Link>
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {c.faqHeading}
            </h2>
            <div className="mt-8">
              <FaqList items={c.faq} defaultOpenFirst />
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {c.troubleshootingHeading}
            </h2>
            <div className="mt-8">
              <FaqList items={c.troubleshooting} />
            </div>
          </section>

          <section className="mt-16 rounded-2xl border border-border bg-surface-light p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {c.contactHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
              {c.contactBody}
            </p>
            <Link
              href={localeHref(safe, "/contact")}
              className="mt-6 inline-block rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              {c.contactLabel}
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
