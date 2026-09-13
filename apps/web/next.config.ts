import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // ── CSP ──
  // Enforced as of 2026-04-25. Observed Report-Only for ~2 weeks across all
  // production traffic; no legitimate script/style violations. If anything
  // ever breaks (e.g. adding a new third-party script source), flip back to
  // "Content-Security-Policy-Report-Only" temporarily, observe, allow-list,
  // then re-enforce.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
      "script-src-elem 'self' 'unsafe-inline' https://challenges.cloudflare.com https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://challenges.cloudflare.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net",
      "frame-src https://challenges.cloudflare.com https://*.googletagmanager.com https://*.doubleclick.net",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  // Local development is served as https://lunexa.test through the system nginx,
  // which proxies to the dev server on 127.0.0.1. The dev server is initialized
  // on localhost, so Next treats requests arriving with that Host as
  // cross-origin and blocks its dev-only endpoints. Naming the host explicitly
  // is what keeps that check on — a wildcard would switch it off. Development
  // only; it has no effect on `next build` or `next start`.
  allowedDevOrigins: ["lunexa.test"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/icon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, immutable",
          },
        ],
      },
      {
        source: "/apple-icon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, immutable",
          },
        ],
      },
      {
        source: "/opengraph-image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=604800",
          },
        ],
      },
    ];
  },
};

/**
 * Sentry source map upload — only wraps the config when the build env has
 * SENTRY_AUTH_TOKEN + SENTRY_ORG + SENTRY_PROJECT. Otherwise the export
 * is the plain Next config (local dev never breaks; staging without
 * Sentry creds builds clean).
 */
import { withSentryConfig } from "@sentry/nextjs";

const hasSentry =
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT;

export default hasSentry
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: true,
      sourcemaps: { deleteSourcemapsAfterUpload: true },
    })
  : nextConfig;
