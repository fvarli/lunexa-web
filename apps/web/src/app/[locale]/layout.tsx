import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import CookieConsent from "@/components/cookie-consent";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { LanguageProvider } from "@/i18n/provider";
import { LOCALES, type Locale } from "@/i18n/config";
import { ThemeProvider } from "@/theme/provider";
import { DEFAULT_THEME, THEMES, THEME_STORAGE_KEY, type Theme } from "@/theme/config";
import { urlFor } from "@/seo/meta";
import { HAS_PUBLISHED_UPDATES } from "@/seo/updates";

function buildJsonLd(locale: Locale) {
  const base = "https://uselunexa.com";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: "Lunexa",
        url: base,
        email: "hello@uselunexa.com",
        description:
          "Lunexa builds simple, fast, and intelligent mobile and web applications.",
        logo: {
          "@type": "ImageObject",
          url: `${base}/icon.svg`,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: "hello@uselunexa.com",
            contactType: "customer support",
            availableLanguage: ["en", "tr", "es"],
          },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${base}/#service`,
        name: "Lunexa",
        url: base,
        areaServed: "Worldwide",
        slogan: "Simple, fast, intelligent digital products.",
        priceRange: "Contact for quote",
        serviceType: [
          "Custom software development",
          "Mobile application development",
          "Web platform development",
          "AI integrations and automation",
        ],
        parentOrganization: { "@id": `${base}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "Lunexa",
        publisher: { "@id": `${base}/#organization` },
        inLanguage: ["en", "tr", "es"],
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${base}/#sitenav-${locale}`,
        name: ["About", "Services", "Work", "Blog", "Contact"],
        url: [
          urlFor(locale, "/about"),
          urlFor(locale, "/services"),
          urlFor(locale, "/work"),
          urlFor(locale, "/blog"),
          urlFor(locale, "/contact"),
        ],
      },
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) {
    notFound();
  }

  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get(THEME_STORAGE_KEY)?.value;
  const initialTheme: Theme =
    cookieTheme && (THEMES as readonly string[]).includes(cookieTheme)
      ? (cookieTheme as Theme)
      : DEFAULT_THEME;

  const jsonLd = buildJsonLd(locale as Locale);

  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LanguageProvider initialLocale={locale as Locale}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        {children}
        <CookieConsent />
        <SiteFooter showUpdates={HAS_PUBLISHED_UPDATES} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
