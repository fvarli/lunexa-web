import type { Metadata } from "next";
import TermsPageContent from "@/components/terms-page-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms and conditions for using the Lunexa website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uselunexa.com/" },
          { name: "Terms of Use", url: "https://uselunexa.com/terms" },
        ]}
      />
      <TermsPageContent />
    </>
  );
}
