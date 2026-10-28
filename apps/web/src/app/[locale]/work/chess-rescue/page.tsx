import type { Metadata } from "next";
import AppLandingContent from "@/components/app-landing-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { CHESS_RESCUE_PLAY_URL } from "@/seo/content";
import { buildPageMetadata, urlFor } from "@/seo/meta";
import { CHESS_RESCUE_PRODUCT, CHESS_RESCUE_PRODUCT_META } from "@/seo/products";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";

export const revalidate = 86400;

const PATH = "/work/chess-rescue";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe = ((LOCALES as readonly string[]).includes(locale)
    ? locale
    : "en") as Locale;
  return buildPageMetadata(safe, PATH, CHESS_RESCUE_PRODUCT_META);
}

export default async function ChessRescueProductPage({
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
    name: "Chess Rescue",
    description: CHESS_RESCUE_PRODUCT_META[safe].description,
    applicationCategory: "GameApplication",
    operatingSystem: "Android",
    url: pageUrl,
    downloadUrl: CHESS_RESCUE_PLAY_URL,
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
          { name: "Chess Rescue", url: pageUrl },
        ]}
      />
      <AppLandingContent
        slug="chess-rescue"
        copy={CHESS_RESCUE_PRODUCT}
        playUrl={CHESS_RESCUE_PLAY_URL}
        badgeLabelKey="games_cta.chess_badge_label"
        privacyPath="/privacy/chess-rescue"
        termsPath="/terms/chess-rescue"
      />
    </>
  );
}
