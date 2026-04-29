/**
 * Resolve the release id (commit SHA / tag) for Sentry + observability.
 * Priority: NEXT_PUBLIC_APP_VERSION → VERCEL_GIT_COMMIT_SHA → APP_COMMIT_SHA → undefined.
 *
 * Pattern adopted from techchefdelights `src/lib/release.ts`.
 */
export function resolveRelease(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_APP_VERSION ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.APP_COMMIT_SHA ||
    undefined
  );
}
