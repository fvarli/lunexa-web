import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Lunexa — Simple, Fast, Intelligent Digital Products",
  description:
    "Lunexa builds simple, fast, and intelligent mobile and web applications. Premium digital craftsmanship for the modern world.",
  keywords: ["Lunexa", "web development", "mobile apps", "digital products"],
  openGraph: {
    title: "Lunexa — Simple, Fast, Intelligent Digital Products",
    description:
      "Premium digital craftsmanship for the modern world.",
    url: "https://uselunexa.com",
    siteName: "Lunexa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunexa — Simple, Fast, Intelligent Digital Products",
    description:
      "Premium digital craftsmanship for the modern world.",
  },
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
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
