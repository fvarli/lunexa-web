/**
 * Client-side observability bootstrap. Runs once per browser session.
 * Gated on NEXT_PUBLIC_SENTRY_DSN — no-op when unset.
 *
 * Release id resolves at build time from NEXT_PUBLIC_APP_VERSION
 * (the only release var that survives client bundling).
 *
 * Pattern adopted from techchefdelights `src/instrumentation-client.ts`.
 */

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 0.1,
      sendDefaultPii: false,
      environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? process.env.NODE_ENV,
      release: process.env.NEXT_PUBLIC_APP_VERSION,
    });
  });
}
