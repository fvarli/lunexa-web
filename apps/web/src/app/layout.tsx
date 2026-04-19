import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import CookieConsent from "@/components/cookie-consent";
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
        {/* ── Header ── */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Lunexa
            </Link>
            <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
              <Link
                href="/#about"
                className="transition-colors hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/#work"
                className="transition-colors hover:text-foreground"
              >
                What We Build
              </Link>
              <Link
                href="/#principles"
                className="transition-colors hover:text-foreground"
              >
                Principles
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <CookieConsent />

        {/* ── Footer ── */}
        <footer className="border-t border-border/50 py-12">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} Lunexa. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted">
              <Link
                href="/privacy"
                className="transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-foreground"
              >
                Terms
              </Link>
              <a
                href="mailto:hello@uselunexa.com"
                className="transition-colors hover:text-foreground"
              >
                hello@uselunexa.com
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
