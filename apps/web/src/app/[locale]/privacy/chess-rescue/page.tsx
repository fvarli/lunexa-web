import type { Metadata } from "next";
import ChessRescuePrivacyContent from "@/components/chess-rescue-privacy-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { buildPageMetadata, CHESS_RESCUE_PRIVACY_META, urlFor } from "@/seo/meta";
import { LOCALES, type Locale } from "@/i18n/config";

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
  return buildPageMetadata(safe, "/privacy/chess-rescue", CHESS_RESCUE_PRIVACY_META);
}

export default async function ChessRescuePrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safe = ((LOCALES as readonly string[]).includes(locale)
    ? locale
    : "en") as Locale;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: urlFor(safe, "/") },
          { name: "Privacy Policy", url: urlFor(safe, "/privacy") },
          { name: "Chess Rescue", url: urlFor(safe, "/privacy/chess-rescue") },
        ]}
      />
      <ChessRescuePrivacyContent />
    </>
  );
}
