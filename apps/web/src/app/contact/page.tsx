import type { Metadata } from "next";
import ContactPageContent from "@/components/contact-page-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lunexa. We'd love to hear about your project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uselunexa.com/" },
          { name: "Contact", url: "https://uselunexa.com/contact" },
        ]}
      />
      <ContactPageContent />
    </>
  );
}
