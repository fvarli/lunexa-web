import type { Metadata } from "next";
import AppLandingContent from "@/components/app-landing-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { BREADCRUMB_LABELS } from "@/seo/breadcrumbs";
import { QUIETLY_PLAY_URL } from "@/seo/content";
import { buildPageMetadata, urlFor } from "@/seo/meta";
import { QUIETLY_PRODUCT, QUIETLY_PRODUCT_META } from "@/seo/products";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";

export const revalidate = 86400;

const PATH = "/work/quietly";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe = ((LOCALES as readonly string[]).includes(locale)
    ? locale
    : "en") as Locale;
  return buildPageMetadata(safe, PATH, QUIETLY_PRODUCT_META);
}

export default async function QuietlyProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safe = ((LOCALES as readonly string[]).includes(locale)
    ? locale
    : "en") as Locale;

  const pageUrl = urlFor(safe, PATH);

  // Same shape as the RPS Duel page. `inLanguage` is omitted: the app's own
  // language support is not verified here, and the page languages are already
  // declared through hreflang.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Quietly",
    description: QUIETLY_PRODUCT_META[safe].description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Android",
    url: pageUrl,
    downloadUrl: QUIETLY_PLAY_URL,
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
          { name: BREADCRUMB_LABELS[safe].home, url: urlFor(safe, "/") },
          { name: BREADCRUMB_LABELS[safe].work, url: urlFor(safe, "/work") },
          { name: "Quietly", url: pageUrl },
        ]}
      />
      <AppLandingContent
        slug="quietly"
        copy={QUIETLY_PRODUCT[safe]}
        playUrl={QUIETLY_PLAY_URL}
        badgeLabelKey="apps_cta.quietly_badge_label"
        privacyPath="/privacy/quietly"
        termsPath="/terms/quietly"
      />
    </>
  );
}
