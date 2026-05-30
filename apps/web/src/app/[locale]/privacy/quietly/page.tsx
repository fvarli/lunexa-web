import type { Metadata } from "next";
import QuietlyPrivacyContent from "@/components/quietly-privacy-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { buildPageMetadata, QUIETLY_PRIVACY_META, urlFor } from "@/seo/meta";
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
  return buildPageMetadata(safe, "/privacy/quietly", QUIETLY_PRIVACY_META);
}

export default async function QuietlyPrivacyPage({
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
          { name: "Quietly", url: urlFor(safe, "/privacy/quietly") },
        ]}
      />
      <QuietlyPrivacyContent />
    </>
  );
}
