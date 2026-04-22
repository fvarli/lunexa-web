import type { Metadata } from "next";
import HomeContent from "@/components/home-content";
import { buildPageMetadata, HOME_META } from "@/seo/meta";
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
  return buildPageMetadata(safe, "/", HOME_META);
}

export default function Home() {
  return <HomeContent />;
}
