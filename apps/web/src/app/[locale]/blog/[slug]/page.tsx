import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/blog-post-content";
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";
import { alternatesFor, openGraphLocale, urlFor } from "@/seo/meta";
import { LOCALES, type Locale } from "@/i18n/config";
import { getPost } from "@/blog";

const BASE = "https://uselunexa.com";

function safeLocale(value: string): Locale {
  return ((LOCALES as readonly string[]).includes(value) ? value : "en") as Locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const safe = safeLocale(locale);
  const post = await getPost(safe, slug);
  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }
  const path = `/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: alternatesFor(path, safe),
    openGraph: {
      title: post.title,
      description: post.description,
      url: urlFor(safe, path),
      siteName: "Lunexa",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${BASE}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      ...openGraphLocale(safe),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${BASE}/opengraph-image`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const safe = safeLocale(locale);
  const post = await getPost(safe, slug);
  if (!post) notFound();

  const postUrl = urlFor(safe, `/blog/${slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author, url: BASE },
    publisher: { "@id": `${BASE}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    url: postUrl,
    inLanguage: safe,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: urlFor(safe, "/") },
          { name: "Blog", url: urlFor(safe, "/blog") },
          { name: post.title, url: postUrl },
        ]}
      />
      <BlogPostContent post={post} />
    </>
  );
}
