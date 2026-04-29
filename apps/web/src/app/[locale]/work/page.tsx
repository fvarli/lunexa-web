import type { Metadata } from "next";
import WorkPageContent from "@/components/work-page-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { buildPageMetadata, WORK_META, urlFor } from "@/seo/meta";
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
  return buildPageMetadata(safe, "/work", WORK_META);
}

export default async function WorkPage({
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
          { name: "Work", url: urlFor(safe, "/work") },
        ]}
      />
      <WorkPageContent />
    </>
  );
}
