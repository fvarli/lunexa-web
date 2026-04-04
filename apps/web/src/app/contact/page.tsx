import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lunexa. We'd love to hear about your project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <header className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Contact
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something together
          </h1>
          <p className="mt-4 text-lg text-muted">
            Whether you have a project in mind, a question about our work, or
            just want to say hello — we&apos;d love to hear from you.
          </p>
        </header>

        <div className="grid gap-16 sm:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                Email
              </h2>
              <a
                href="mailto:hello@uselunexa.com"
                className="text-lg text-foreground transition-colors hover:text-accent"
              >
                hello@uselunexa.com
              </a>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                For support
              </h2>
              <a
                href="mailto:support@uselunexa.com"
                className="text-lg text-foreground transition-colors hover:text-accent"
              >
                support@uselunexa.com
              </a>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                Response time
              </h2>
              <p className="text-muted">
                We typically respond within one business day.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <ContactForm idPrefix="contact" />
        </div>

        <p className="mt-16 text-center text-sm text-muted">
          By contacting us you agree to our{" "}
          <Link href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
