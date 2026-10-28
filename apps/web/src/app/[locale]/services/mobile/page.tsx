import type { Metadata } from "next";
import ServiceDetailContent from "@/components/service-detail-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { BREADCRUMB_LABELS } from "@/seo/breadcrumbs";
import { buildPageMetadata, SERVICES_MOBILE_META, urlFor } from "@/seo/meta";
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
  return buildPageMetadata(safe, "/services/mobile", SERVICES_MOBILE_META);
}

export default async function ServiceMobilePage({
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
          { name: BREADCRUMB_LABELS[safe].home, url: urlFor(safe, "/") },
          { name: BREADCRUMB_LABELS[safe].services, url: urlFor(safe, "/services") },
          { name: BREADCRUMB_LABELS[safe].mobile, url: urlFor(safe, "/services/mobile") },
        ]}
      />
      <ServiceDetailContent slug="mobile" />
    </>
  );
}
