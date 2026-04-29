/**
 * Request correlation ID — traces a single request across logs, Sentry
 * events, and the response (echoed via the x-request-id header).
 *
 * If an upstream proxy / Cloudflare already sent a request id, we trust
 * it (so a load balancer's tracing thread continues end-to-end).
 * Otherwise we mint one with crypto.randomUUID().
 *
 * Pattern adopted from techchefdelights `src/lib/request-id.ts`, adapted
 * for Express middleware.
 */

import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export const REQUEST_ID_HEADER = "x-request-id";

const SAFE_REQUEST_ID = /^[a-zA-Z0-9_-]{8,128}$/;

declare module "express-serve-static-core" {
  interface Request {
    requestId: string;
  }
}

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const incoming = req.get(REQUEST_ID_HEADER);
  const id =
    incoming && SAFE_REQUEST_ID.test(incoming) ? incoming : randomUUID();
  req.requestId = id;
  res.setHeader(REQUEST_ID_HEADER, id);
  next();
}

/**
 * Sanitized request metadata for log lines. Never includes Authorization,
 * Cookie, body, or any user-identifying header. Use this everywhere a log
 * line wants `route`/`method`/`ip`/`userAgent` context.
 */
export function reqMeta(req: Request): {
  route: string;
  method: string;
  ip: string | null;
  userAgent: string | null;
} {
  return {
    route: req.originalUrl?.split("?")[0] ?? req.path ?? "",
    method: req.method,
    ip: req.ip ?? null,
    userAgent: req.get("user-agent") ?? null,
  };
}
