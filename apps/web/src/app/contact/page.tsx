import type { Metadata } from "next";
import ContactPageContent from "@/components/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lunexa. We'd love to hear about your project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
