import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import CtaBlock from "@/components/cta-block";
import { localeHref } from "@/i18n/href";
import { LOCALES, type Locale } from "@/i18n/config";
import {
  HAS_PUBLISHED_UPDATES,
  PRODUCTS,
  sortedUpdates,
  UPDATES_PAGE,
  type ChangeCategory,
  type UpdateEntry,
} from "@/seo/updates";
import { buildPageMetadata, UPDATES_META, urlFor } from "@/seo/meta";

export const revalidate = 86400;

const CATEGORY_ORDER: ChangeCategory[] = ["new", "improved", "fixed"];

function toLocale(locale: string): Locale {
  return ((LOCALES as readonly string[]).includes(locale) ? locale : "en") as Locale;
}

/**
 * `timeZone: "UTC"` is load-bearing: an ISO date string parses as UTC midnight,
 * so without it a visitor west of Greenwich sees the previous day.
 */
function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = buildPageMetadata(toLocale(locale), "/updates", UPDATES_META);

  // notFound() already injects noindex; this keeps the page unindexable even if
  // the guard below is ever loosened before there is anything to publish.
  return HAS_PUBLISHED_UPDATES
    ? base
    : { ...base, robots: { index: false, follow: false } };
}

function EntryCard({ entry, locale }: { entry: UpdateEntry; locale: Locale }) {
  const c = UPDATES_PAGE[locale];
  const product = PRODUCTS[entry.productId];

  return (
    <article
      id={entry.id}
      className="rounded-2xl border border-border bg-surface-light p-8 sm:p-10"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className="rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent">
          {product.name}
        </span>
        <time
          dateTime={entry.date}
          className="font-mono text-xs uppercase tracking-[0.2em] text-muted"
        >
          {formatDate(entry.date, locale)}
        </time>
      </div>

      <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        {entry.title[locale]}
        {entry.version && (
          <span className="ml-3 font-mono text-base font-normal text-muted">
            {entry.version}
          </span>
        )}
      </h2>

      {entry.summary && (
        <p className="mt-4 leading-relaxed text-muted">{entry.summary[locale]}</p>
      )}

      {CATEGORY_ORDER.map((category) => {
        const items = entry.changes.filter((ch) => ch.category === category);
        if (items.length === 0) return null;
        return (
          <div key={category} className="mt-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {c.categoryLabels[category]}
            </p>
            <ul className="ml-6 mt-3 list-disc space-y-2 leading-relaxed text-muted">
              {items.map((item, i) => (
                <li key={i}>{item.text[locale]}</li>
              ))}
            </ul>
          </div>
        );
      })}

      {(product.storeUrl || product.workPath) && (
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {product.storeUrl && (
            <a
              href={product.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              {c.storeLabel} →
            </a>
          )}
          {product.workPath && (
            <Link
              href={localeHref(locale, product.workPath)}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {c.productLabel} →
            </Link>
          )}
        </div>
      )}
    </article>
  );
}

/**
 * Server-rendered with no client JavaScript of its own: the locale comes from
 * the route, `localeHref` is pure, and dates are formatted on the server.
 *
 * The route 404s until a release is verified, so the page never exists publicly
 * with nothing on it. The same `HAS_PUBLISHED_UPDATES` constant gates the
 * sitemap entry and the footer link.
 */
export default async function UpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (!HAS_PUBLISHED_UPDATES) notFound();

  const { locale } = await params;
  const safe = toLocale(locale);
  const c = UPDATES_PAGE[safe];
  const entries = sortedUpdates();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: urlFor(safe, "/") },
          { name: "Updates", url: urlFor(safe, "/updates") },
        ]}
      />

      <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <header className="text-center">
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

          <div className="mt-16 space-y-8">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} locale={safe} />
            ))}
          </div>

          <div className="mt-20">
            <CtaBlock />
          </div>
        </div>
      </main>
    </>
  );
}
