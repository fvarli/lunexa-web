import type { Metadata } from "next";
import LegalDocumentContent from "@/components/legal-document-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { QUIETLY_TERMS } from "@/seo/content";
import { buildPageMetadata, QUIETLY_TERMS_META, urlFor } from "@/seo/meta";
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
  return buildPageMetadata(safe, "/terms/quietly", QUIETLY_TERMS_META);
}

export default async function QuietlyTermsPage({
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
          { name: "Terms of Use", url: urlFor(safe, "/terms") },
          { name: "Quietly", url: urlFor(safe, "/terms/quietly") },
        ]}
      />
      <LegalDocumentContent document={QUIETLY_TERMS} />
    </>
  );
}
