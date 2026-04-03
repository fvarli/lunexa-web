import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms and conditions for using the Lunexa website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <article className="mx-auto max-w-3xl px-6">
        <header className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Legal
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-muted">Last updated: April 2026</p>
        </header>

        <div className="space-y-10 leading-relaxed text-muted">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Agreement
            </h2>
            <p>
              By accessing and using uselunexa.com, you agree to these terms. If
              you do not agree, please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Use of this website
            </h2>
            <p>
              This website is provided for informational purposes about Lunexa
              and its services. You may browse the site and use the contact form
              to reach us. You agree not to misuse the site, including
              submitting false information, attempting to disrupt its operation,
              or using automated tools to scrape its content.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Intellectual property
            </h2>
            <p>
              All content on this website — including text, design, graphics,
              and code — is the property of Lunexa unless otherwise stated. You
              may not reproduce, distribute, or create derivative works from our
              content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Contact form
            </h2>
            <p>
              When you submit a message through our contact form, you grant us
              permission to use the information you provide to respond to your
              inquiry. We make no guarantees about response times. Messages
              containing harmful, abusive, or spam content may be discarded
              without response.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Disclaimer
            </h2>
            <p>
              This website and its content are provided &ldquo;as is&rdquo;
              without warranties of any kind, express or implied. Lunexa does
              not guarantee that the site will be available at all times or free
              from errors.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, Lunexa shall not be liable
              for any indirect, incidental, or consequential damages arising
              from your use of this website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Changes
            </h2>
            <p>
              We may revise these terms at any time. Continued use of the
              website after changes are posted constitutes acceptance of the
              updated terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Contact
            </h2>
            <p>
              Questions about these terms? Reach us at{" "}
              <a
                href="mailto:hello@uselunexa.com"
                className="text-accent hover:underline"
              >
                hello@uselunexa.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
