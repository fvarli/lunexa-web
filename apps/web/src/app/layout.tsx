import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import Analytics from "@/components/analytics";
import CookieConsent from "@/components/cookie-consent";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { LanguageProvider } from "@/i18n/provider";
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, type Locale } from "@/i18n/config";
import { ThemeProvider } from "@/theme/provider";
import {
  DEFAULT_THEME,
  THEMES,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/theme/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uselunexa.com"),
  title: {
    default: "Lunexa — Simple, Fast, Intelligent Digital Products",
    template: "%s | Lunexa",
  },
  description:
    "Lunexa builds simple, fast, and intelligent mobile and web applications. Premium digital craftsmanship for the modern world.",
  keywords: [
    "Lunexa",
    "web development",
    "mobile apps",
    "digital products",
    "software development",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lunexa — Simple, Fast, Intelligent Digital Products",
    description: "Premium digital craftsmanship for the modern world.",
    url: "https://uselunexa.com",
    siteName: "Lunexa",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunexa — Simple, Fast, Intelligent Digital Products",
    description: "Premium digital craftsmanship for the modern world.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://uselunexa.com/#organization",
      name: "Lunexa",
      url: "https://uselunexa.com",
      email: "hello@uselunexa.com",
      description:
        "Lunexa builds simple, fast, and intelligent mobile and web applications.",
      logo: {
        "@type": "ImageObject",
        url: "https://uselunexa.com/icon.svg",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://uselunexa.com/#website",
      url: "https://uselunexa.com",
      name: "Lunexa",
      publisher: { "@id": "https://uselunexa.com/#organization" },
      inLanguage: ["en", "tr", "es"],
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://uselunexa.com/#sitenav",
      name: ["About", "What We Build", "Principles", "Contact"],
      url: [
        "https://uselunexa.com/#about",
        "https://uselunexa.com/#work",
        "https://uselunexa.com/#principles",
        "https://uselunexa.com/contact",
      ],
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get(STORAGE_KEY)?.value;

  // 1. Cookie wins if it's a supported locale
  // 2. Otherwise parse Accept-Language q-values; pick the first supported
  // 3. Otherwise fall back to DEFAULT_LOCALE
  function detectLocaleFromAcceptLanguage(header: string | null): Locale | null {
    if (!header) return null;
    const entries = header
      .split(",")
      .map((part) => {
        const [tag, ...params] = part.trim().split(";");
        const q = params
          .map((p) => p.trim())
          .find((p) => p.startsWith("q="));
        const quality = q ? parseFloat(q.slice(2)) : 1;
        return { tag: tag.toLowerCase(), quality: isNaN(quality) ? 1 : quality };
      })
      .sort((a, b) => b.quality - a.quality);

    for (const { tag } of entries) {
      const primary = tag.split("-")[0];
      if ((LOCALES as readonly string[]).includes(primary)) {
        return primary as Locale;
      }
    }
    return null;
  }

  const initialLocale: Locale =
    cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale)
      : detectLocaleFromAcceptLanguage(headerStore.get("accept-language")) ??
        DEFAULT_LOCALE;

  const cookieTheme = cookieStore.get(THEME_STORAGE_KEY)?.value;
  const initialTheme: Theme =
    cookieTheme && (THEMES as readonly string[]).includes(cookieTheme)
      ? (cookieTheme as Theme)
      : DEFAULT_THEME;

  return (
    <html
      lang={initialLocale}
      data-theme={initialTheme}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col font-sans">
        <ThemeProvider initialTheme={initialTheme}>
          <LanguageProvider initialLocale={initialLocale}>
            <SiteHeader />
            {children}
            <CookieConsent />
            <SiteFooter />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
