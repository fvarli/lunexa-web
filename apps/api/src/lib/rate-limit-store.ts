/**
 * Rate-limit store selection — single point of swap.
 *
 * Today: returns `undefined`, which makes `express-rate-limit` use its
 * built-in MemoryStore. Fine for single-instance pm2 production but
 * resets every deploy and doesn't share quota across processes.
 *
 * To upgrade for multi-instance / distributed rate limiting:
 *   1. `npm install rate-limit-redis ioredis`
 *   2. Replace the body of `getRateLimitStore()` to return a RedisStore
 *      backed by `new IORedis(process.env.REDIS_URL)`. Three-tier
 *      precedence (REDIS_URL → Upstash REST → memory) is the
 *      techchefdelights baseline; copy `src/lib/rate-limit.ts` from
 *      that repo if you want the full reference implementation.
 *   3. Set `REDIS_URL` in production env.
 *   4. The `health.rateLimitStore` field reports which backend is active.
 *
 * The swap is intentionally one-file. Every endpoint passes the result
 * of `getRateLimitStore()` into `rateLimit({ store, ... })`, so the
 * production rollout is a single env var + one dependency install.
 *
 * Pattern adopted from techchefdelights `src/lib/rate-limit.ts` (full
 * three-tier implementation; deferred here until traffic warrants it).
 */

import type { Store } from "express-rate-limit";
import { logger } from "./logger";

export type RateLimitStoreKind = "memory" | "redis" | "upstash";

let warnedAboutMemoryStore = false;

export function getRateLimitStore(): Store | undefined {
  // Future: branch on REDIS_URL / UPSTASH_REDIS_REST_URL here.
  if (
    process.env.NODE_ENV === "production" &&
    !warnedAboutMemoryStore &&
    !process.env.REDIS_URL &&
    !process.env.UPSTASH_REDIS_REST_URL
  ) {
    warnedAboutMemoryStore = true;
    logger.warn("rateLimit.fallback_memory_store", {
      context: {
        reason:
          "Production is using MemoryStore — fine for single-instance pm2; " +
          "set REDIS_URL or Upstash for multi-instance.",
      },
    });
  }
  return undefined;
}

/**
 * Reports which rate-limit backend is in effect. Surfaced in /api/health.
 */
export function rateLimitStoreKind(): RateLimitStoreKind {
  // Today: always memory until the swap above is completed.
  return "memory";
}
