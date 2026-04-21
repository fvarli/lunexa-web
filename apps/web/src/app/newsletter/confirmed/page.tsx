import type { Metadata } from "next";
import { Suspense } from "react";
import NewsletterConfirmedContent from "@/components/newsletter-confirmed-content";

export const metadata: Metadata = {
  title: "Newsletter",
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmedPage() {
  return (
    <Suspense fallback={null}>
      <NewsletterConfirmedContent />
    </Suspense>
  );
}
