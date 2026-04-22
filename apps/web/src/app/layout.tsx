import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import Analytics from "@/components/analytics";
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, type Locale } from "@/i18n/config";
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The middleware sets x-locale on the request. Fallback to cookie / Accept-Language
  // if middleware was skipped (e.g., for asset routes it does run on).
  const hdrs = await headers();
  const cookieStore = await cookies();

  const headerLocale = hdrs.get("x-locale");
  const cookieLocale = cookieStore.get(STORAGE_KEY)?.value;
  const locale: Locale =
    (headerLocale && (LOCALES as readonly string[]).includes(headerLocale)
      ? (headerLocale as Locale)
      : null) ??
    (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale)
      : null) ??
    DEFAULT_LOCALE;

  const cookieTheme = cookieStore.get(THEME_STORAGE_KEY)?.value;
  const initialTheme: Theme =
    cookieTheme && (THEMES as readonly string[]).includes(cookieTheme)
      ? (cookieTheme as Theme)
      : DEFAULT_THEME;

  return (
    <html
      lang={locale}
      data-theme={initialTheme}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col font-sans"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
