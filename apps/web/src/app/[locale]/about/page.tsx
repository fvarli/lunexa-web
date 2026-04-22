import type { Metadata } from "next";
import AboutPageContent from "@/components/about-page-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { buildPageMetadata, ABOUT_META } from "@/seo/meta";
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
  return buildPageMetadata(safe, "/about", ABOUT_META);
}

export default async function AboutPage({
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
          { name: "About", url: `https://uselunexa.com/${locale}/about` },
        ]}
      />
      <AboutPageContent />
    </>
  );
}
