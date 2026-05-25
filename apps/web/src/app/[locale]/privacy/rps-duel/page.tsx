import type { Metadata } from "next";
import RpsDuelPrivacyContent from "@/components/rps-duel-privacy-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { buildPageMetadata, RPS_DUEL_PRIVACY_META, urlFor } from "@/seo/meta";
import { LOCALES, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe = ((LOCALES as readonly string[]).includes(locale)
    ? locale
    : "en") as Locale;
  return buildPageMetadata(safe, "/privacy/rps-duel", RPS_DUEL_PRIVACY_META);
}

export default async function RpsDuelPrivacyPage({
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
          { name: "RPS Duel", url: urlFor(safe, "/privacy/rps-duel") },
        ]}
      />
      <RpsDuelPrivacyContent />
    </>
  );
}
