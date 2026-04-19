import type { Metadata } from "next";
import TermsPageContent from "@/components/terms-page-content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms and conditions for using the Lunexa website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <TermsPageContent />;
}
