import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/config";

type Route = {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
};

const BASE = "https://uselunexa.com";

const ROUTES: Route[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/mobile", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/web", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/intelligent", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

function urlFor(locale: string, path: string): string {
  const suffix = path === "/" ? "" : path;
  return `${BASE}/${locale}${suffix}`;
}

function localesLanguagesMap(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of LOCALES) map[l] = urlFor(l, path);
  map["x-default"] = urlFor("en", path);
  return map;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      entries.push({
        url: urlFor(locale, route.path),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: localesLanguagesMap(route.path) },
      });
    }
  }

  return entries;
}
