import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config";
import { urlFor } from "@/seo/meta";
import { HAS_PUBLISHED_UPDATES } from "@/seo/updates";
import { listPosts } from "@/blog";

type Route = {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
};

const STATIC_ROUTES: Route[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/mobile", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/web", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/intelligent", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  // Absent until a release is verified, so the sitemap never advertises the
  // 404 that /updates serves while the changelog is empty.
  ...(HAS_PUBLISHED_UPDATES
    ? ([{ path: "/updates", priority: 0.6, changeFrequency: "monthly" }] as Route[])
    : []),
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work/rps-duel", priority: 0.7, changeFrequency: "monthly" },
  { path: "/support/rps-duel", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy/rps-duel", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy/chess-rescue", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy/quietly", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms/rps-duel", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms/chess-rescue", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms/quietly", priority: 0.4, changeFrequency: "yearly" },
];

function languagesMap(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of LOCALES) map[l] = urlFor(l, path);
  map["x-default"] = urlFor(DEFAULT_LOCALE, path);
  return map;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static routes across all locales
  for (const route of STATIC_ROUTES) {
    for (const locale of LOCALES) {
      entries.push({
        url: urlFor(locale, route.path),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: languagesMap(route.path) },
      });
    }
  }

  // Blog posts — include each post in every locale where it exists
  for (const locale of LOCALES) {
    const posts = await listPosts(locale);
    for (const post of posts) {
      const path = `/blog/${post.slug}`;
      entries.push({
        url: urlFor(locale, path),
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: languagesMap(path) },
      });
    }
  }

  return entries;
}
