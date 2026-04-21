import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import Analytics from "@/components/analytics";
import CookieConsent from "@/components/cookie-consent";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { LanguageProvider } from "@/i18n/provider";
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, type Locale } from "@/i18n/config";
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
  "@type": "Organization",
  name: "Lunexa",
  url: "https://uselunexa.com",
  email: "hello@uselunexa.com",
  description:
    "Lunexa builds simple, fast, and intelligent mobile and web applications.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(STORAGE_KEY)?.value;
  const initialLocale: Locale =
    cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale)
      : DEFAULT_LOCALE;

  return (
    <html
      lang={initialLocale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col font-sans">
        <LanguageProvider initialLocale={initialLocale}>
          <SiteHeader />
          {children}
          <CookieConsent />
          <SiteFooter />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
