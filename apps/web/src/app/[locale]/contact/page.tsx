import type { Metadata } from "next";
import ContactPageContent from "@/components/contact-page-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { BREADCRUMB_LABELS } from "@/seo/breadcrumbs";
import { buildPageMetadata, CONTACT_META, urlFor } from "@/seo/meta";
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
  return buildPageMetadata(safe, "/contact", CONTACT_META);
}

export default async function ContactPage({
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
          { name: BREADCRUMB_LABELS[safe].contact, url: urlFor(safe, "/contact") },
        ]}
      />
      <ContactPageContent />
    </>
  );
}
