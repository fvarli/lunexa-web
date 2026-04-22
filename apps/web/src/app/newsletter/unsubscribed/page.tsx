import type { Metadata } from "next";
import { Suspense } from "react";
import NewsletterUnsubscribedContent from "@/components/newsletter-unsubscribed-content";

export const metadata: Metadata = {
  title: "Unsubscribed",
  robots: { index: false, follow: false },
};

export default function NewsletterUnsubscribedPage() {
  return (
    <Suspense fallback={null}>
      <NewsletterUnsubscribedContent />
    </Suspense>
  );
}
