"use client";

import { useT } from "@/i18n/provider";
import { PRODUCT_PLAY_CTA } from "@/seo/products";
import GooglePlayBadge from "@/components/google-play-badge";

/**
 * Closing call to action on an app landing page, so a visitor who has read to
 * the end can install without scrolling back to the header badge. `badgeLabel`
 * is the app-specific accessible name ("Get Chess Rescue on Google Play").
 */
export default function ProductPlayCta({
  name,
  href,
  badgeLabel,
}: {
  name: string;
  href: string;
  badgeLabel: string;
}) {
  const { locale } = useT();
  const c = PRODUCT_PLAY_CTA[locale];

  return (
    <section
      aria-labelledby="product-play-cta-heading"
      className="mt-16 flex flex-col gap-6 rounded-2xl border border-accent/40 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
    >
      <div>
        <h2
          id="product-play-cta-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {c.heading.replace("{name}", name)}
        </h2>
        <p className="mt-2 leading-relaxed text-muted">
          {c.body.replace("{name}", name)}
        </p>
      </div>
      <GooglePlayBadge href={href} label={badgeLabel} />
    </section>
  );
}
