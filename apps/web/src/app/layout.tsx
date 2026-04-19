import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookieConsent from "@/components/cookie-consent";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { LanguageProvider } from "@/i18n/provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col font-sans">
        <LanguageProvider>
          <SiteHeader />
          {children}
          <CookieConsent />
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
