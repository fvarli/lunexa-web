import type { MetadataRoute } from "next";

/**
 * AI crawlers we deny. These are scraping/training bots — blocking them from the
 * whole site keeps our content out of their training sets without hurting search
 * ranking (search crawlers like Googlebot and Bingbot are a separate user-agent
 * and still get Allow: /).
 */
const AI_BOTS_DENY = [
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  "Google-Extended",
  "GPTBot",
  "meta-externalagent",
  "PerplexityBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_BOTS_DENY,
        disallow: "/",
      },
    ],
    sitemap: "https://uselunexa.com/sitemap.xml",
  };
}
