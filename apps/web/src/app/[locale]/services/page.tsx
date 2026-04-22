import type { Metadata } from "next";
import ServicesIndexContent from "@/components/services-index-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { buildPageMetadata, SERVICES_META } from "@/seo/meta";
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
  return buildPageMetadata(safe, "/services", SERVICES_META);
}

export default async function ServicesPage({
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
          { name: "Services", url: `https://uselunexa.com/${locale}/services` },
        ]}
      />
      <ServicesIndexContent />
    </>
  );
}
