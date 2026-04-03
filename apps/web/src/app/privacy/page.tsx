import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Lunexa handles your data. Our privacy policy explains what we collect and why.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <article className="mx-auto max-w-3xl px-6">
        <header className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Legal
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted">Last updated: April 2026</p>
        </header>

        <div className="space-y-10 leading-relaxed text-muted">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Overview
            </h2>
            <p>
              Lunexa (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates the website
              uselunexa.com. This policy explains what information we collect
              when you visit our site or use our contact form, and how we handle
              it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              What we collect
            </h2>
            <p>
              When you submit our contact form, we collect your name, email
              address, and message content. We use this information solely to
              respond to your inquiry.
            </p>
            <p className="mt-3">
              Our web server may automatically log standard technical data such
              as your IP address, browser type, and pages visited. This data is
              used for security monitoring and basic analytics only.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              How we use your data
            </h2>
            <ul className="ml-6 list-disc space-y-2">
              <li>To respond to messages you send through our contact form</li>
              <li>To monitor and maintain the security of our website</li>
              <li>To understand general usage patterns and improve our site</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your personal information with third
              parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Data retention
            </h2>
            <p>
              Contact form submissions are retained only as long as necessary to
              address your inquiry. Server logs are retained for up to 90 days
              for security purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Cookies
            </h2>
            <p>
              This website does not use tracking cookies or third-party
              analytics services. Essential cookies may be used for basic site
              functionality.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Your rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of any
              personal data we hold about you. To make a request, contact us at{" "}
              <a
                href="mailto:hello@uselunexa.com"
                className="text-accent hover:underline"
              >
                hello@uselunexa.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. Changes will be posted
              on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Contact
            </h2>
            <p>
              If you have questions about this privacy policy, reach us at{" "}
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
