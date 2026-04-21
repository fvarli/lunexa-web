import type { Metadata } from "next";
import PrivacyPageContent from "@/components/privacy-page-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Lunexa handles your data. Our privacy policy explains what we collect and why.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uselunexa.com/" },
          { name: "Privacy Policy", url: "https://uselunexa.com/privacy" },
        ]}
      />
      <PrivacyPageContent />
    </>
  );
}
