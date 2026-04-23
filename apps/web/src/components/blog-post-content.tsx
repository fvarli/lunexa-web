"use client";

import Link from "next/link";
import { useT } from "@/i18n/provider";
import { localeHref } from "@/i18n/href";
import type { Post } from "@/blog";
import CtaBlock from "@/components/cta-block";
import RelatedServices from "@/components/related-services";

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

export default function BlogPostContent({ post }: { post: Post }) {
  const { locale } = useT();

  return (
    <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <article className="mx-auto max-w-3xl px-6">
        <nav className="mb-8 text-sm text-muted">
          <Link
            href={localeHref(locale, "/blog")}
            className="transition-colors hover:text-foreground"
          >
            ← Blog
          </Link>
        </nav>

        <header className="mb-12">
          <time
            dateTime={post.date}
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            {formatDate(post.date, locale)}
          </time>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {post.description}
            </p>
          )}
          <p className="mt-6 text-sm text-muted">
            {post.author}
            {post.tags.length > 0 && (
              <>
                {" · "}
                <span className="font-mono">{post.tags.join(" / ")}</span>
              </>
            )}
          </p>
        </header>

        <div
          className="prose prose-invert max-w-none space-y-5 leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-surface-light [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:mb-1 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface-light [&_pre]:p-4 [&_strong]:text-foreground [&_ul]:ml-5 [&_ul]:list-disc"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-20">
          <CtaBlock variant="compact" />
        </div>

        <RelatedServices />
      </article>
    </main>
  );
}
