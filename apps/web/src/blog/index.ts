import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/i18n/config";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  tags: string[];
};

export type Post = PostMeta & { html: string; body: string };

const BLOG_ROOT = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string, slug: string): {
  meta: PostMeta;
  body: string;
} {
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    author: String(data.author ?? "Lunexa"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
  return { meta, body: content };
}

export async function listPosts(locale: Locale): Promise<PostMeta[]> {
  const dir = path.join(BLOG_ROOT, locale);
  let entries: string[] = [];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    entries
      .filter((f) => f.endsWith(".md"))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, "");
        const raw = await fs.readFile(path.join(dir, file), "utf-8");
        const { meta } = parseFrontmatter(raw, slug);
        return meta;
      })
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(locale: Locale, slug: string): Promise<Post | null> {
  const file = path.join(BLOG_ROOT, locale, `${slug}.md`);
  let raw: string;
  try {
    raw = await fs.readFile(file, "utf-8");
  } catch {
    return null;
  }
  const { meta, body } = parseFrontmatter(raw, slug);
  const html = await marked.parse(body, { async: true });
  return { ...meta, body, html };
}

export async function listAllPostsAcrossLocales(
  locales: readonly Locale[]
): Promise<{ locale: Locale; slug: string; date: string }[]> {
  const entries: { locale: Locale; slug: string; date: string }[] = [];
  for (const locale of locales) {
    const posts = await listPosts(locale);
    for (const p of posts) {
      entries.push({ locale, slug: p.slug, date: p.date });
    }
  }
  return entries;
}
