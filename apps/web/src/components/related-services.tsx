"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import { SERVICES_INDEX, RELATED_SERVICES } from "@/seo/content";

type Slug = "mobile" | "web" | "intelligent";

export default function RelatedServices({ current }: { current?: Slug }) {
  const { locale } = useT();
  const c = RELATED_SERVICES[locale];
  const items = SERVICES_INDEX[locale].items.filter(
    (item) => item.slug !== current,
  );
  const cols = items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight">
        {c.heading}
      </h2>
      <div className={`grid gap-4 ${cols}`}>
        {items.map((item) => (
          <Link
            key={item.slug}
            href={localeHref(locale, `/services/${item.slug}`)}
            className="group flex flex-col rounded-xl border border-border bg-surface-light p-6 transition-colors hover:border-accent/40"
          >
            <h3 className="text-base font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
            <span className="mt-4 text-xs font-medium text-accent transition-opacity group-hover:opacity-80">
              {item.link_label} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
