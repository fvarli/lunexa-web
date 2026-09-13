import type { Metadata } from "next";
import RpsDuelProductContent from "@/components/rps-duel-product-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { RPS_DUEL_PLAY_URL } from "@/seo/content";
import { buildPageMetadata, RPS_DUEL_PRODUCT_META, urlFor } from "@/seo/meta";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe = ((LOCALES as readonly string[]).includes(locale)
    ? locale
    : "en") as Locale;
  return buildPageMetadata(safe, "/work/rps-duel", RPS_DUEL_PRODUCT_META);
}

export default async function RpsDuelProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safe = ((LOCALES as readonly string[]).includes(locale)
    ? locale
    : "en") as Locale;

  const pageUrl = urlFor(safe, "/work/rps-duel");

  // Publisher points at the single Organization declared in the root layout
  // graph rather than naming a second entity. "Lunexa Games" is a product brand
  // in the page copy, not an organization the site models.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RPS Duel",
    applicationCategory: "GameApplication",
    operatingSystem: "Android",
    url: pageUrl,
    downloadUrl: RPS_DUEL_PLAY_URL,
    inLanguage: LOCALES,
    publisher: { "@id": `${urlFor(DEFAULT_LOCALE, "/")}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: urlFor(safe, "/") },
          { name: "Work", url: urlFor(safe, "/work") },
          { name: "RPS Duel", url: pageUrl },
        ]}
      />
      <RpsDuelProductContent />
    </>
  );
}
