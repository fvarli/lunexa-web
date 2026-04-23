"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import { CTA_BLOCK } from "@/seo/content";

type Variant = "default" | "compact";
type Destination = "contact" | "services";

type Props = {
  variant?: Variant;
  destination?: Destination;
  onClick?: () => void;
};

export default function CtaBlock({
  variant = "default",
  destination = "contact",
  onClick,
}: Props) {
  const { locale } = useT();
  const c = CTA_BLOCK[locale];
  const href = localeHref(
    locale,
    destination === "services" ? "/services" : "/contact",
  );
  const isCompact = variant === "compact";

  return (
    <section
      className={`rounded-2xl border border-border bg-surface-light text-center ${
        isCompact ? "p-6" : "p-10"
      }`}
    >
      <h2
        className={`font-semibold tracking-tight ${
          isCompact ? "text-xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {c.heading}
      </h2>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
        {c.body}
      </p>
      <Link
        href={href}
        onClick={onClick}
        className={`mt-6 inline-block rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 ${
          isCompact ? "px-6 py-2" : "px-8 py-3"
        }`}
      >
        {c.button}
      </Link>
    </section>
  );
}
