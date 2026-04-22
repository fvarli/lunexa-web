import type { Metadata } from "next";
import TermsPageContent from "@/components/terms-page-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { buildPageMetadata, TERMS_META } from "@/seo/meta";
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
  return buildPageMetadata(safe, "/terms", TERMS_META);
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `https://uselunexa.com/${locale}` },
          { name: "Terms of Use", url: `https://uselunexa.com/${locale}/terms` },
        ]}
      />
      <TermsPageContent />
    </>
  );
}
