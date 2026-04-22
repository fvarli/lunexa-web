"use client";

import { useT } from "@/i18n/provider";
import { dictionaries } from "@/i18n/dictionaries";

type FaqItem = { q: string; a: string };

export default function HomeFaq() {
  const { locale } = useT();
  const faq = dictionaries[locale].faq;
  const items = faq.items as readonly FaqItem[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="border-t border-border/50 py-24 sm:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {faq.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {faq.heading}
          </h2>
        </div>
        <div className="divide-y divide-border">
          {items.map((item, i) => (
            <details
              key={i}
              className="group py-6 first:pt-0 last:pb-0"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="ml-4 font-mono text-sm text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
