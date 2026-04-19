import type { Metadata } from "next";
import PrivacyPageContent from "@/components/privacy-page-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Lunexa handles your data. Our privacy policy explains what we collect and why.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
