import { readFileSync } from "node:fs";

/**
 * Release commit SHA for /api/health.
 *
 * The deploy writes the SHA from the CI release artifact into
 * `dist/RELEASE_SHA`, next to the compiled code built from that same checkout.
 * It is never taken from the environment, so a runtime override cannot
 * misrepresent what is deployed, and never from the server's git HEAD.
 *
 * Read once at startup: a running process keeps reporting the build it loaded,
 * even if a later deploy rewrites the file before reloading it.
 */

const SHA_PATTERN = /^[0-9a-f]{40}$/;

/** Returns the SHA in `file`, or null when it is missing, unreadable or not a full lowercase commit SHA. */
export function readReleaseSha(file: string): string | null {
  try {
    // Only a single trailing line ending is tolerated; anything else is malformed.
    const sha = readFileSync(file, "utf8").replace(/\r?\n$/, "");
    return SHA_PATTERN.test(sha) ? sha : null;
  } catch {
    return null;
  }
}
