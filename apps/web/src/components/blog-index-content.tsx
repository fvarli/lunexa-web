"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import { BLOG_INDEX } from "@/seo/content";
import type { PostMeta } from "@/blog";
import CtaBlock from "@/components/cta-block";

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function BlogIndexContent({ posts }: { posts: PostMeta[] }) {
  const { locale } = useT();
  const c = BLOG_INDEX[locale];
  const hrefFor = (slug: string) => localeHref(locale, `/blog/${slug}`);

  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <header className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {c.eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {c.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {c.lead}
          </p>
        </header>

        {posts.length === 0 ? (
          <section className="rounded-2xl border border-border bg-surface-light p-12 text-center">
            <p className="text-base leading-relaxed text-muted">{c.empty}</p>
          </section>
        ) : (
          <ul className="divide-y divide-border">
            {posts.map((p) => (
              <li key={p.slug} className="py-8 first:pt-0 last:pb-0">
                <Link
                  href={hrefFor(p.slug)}
                  className="group block"
                >
                  <time
                    dateTime={p.date}
                    className="font-mono text-xs uppercase tracking-[0.2em] text-muted"
                  >
                    {formatDate(p.date, locale)}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                    {p.title}
                  </h2>
                  {p.description && (
                    <p className="mt-2 leading-relaxed text-muted">
                      {p.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-20">
          <CtaBlock />
        </div>
      </div>
    </main>
  );
}
