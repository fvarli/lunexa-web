/**
 * Unified API error envelope helper.
 *
 * Every error response from /api/* SHOULD use this shape:
 *   { error: { code, message, details?, requestId } }
 *
 * Existing endpoints (newsletter, contact) currently return the legacy
 * shape `{ ok: false, errors: [...] }` for backwards-compat with the
 * web frontend. New endpoints adopt this envelope directly; legacy
 * endpoints migrate when they get touched next.
 *
 * Pattern adopted from techchefdelights `src/lib/api/errors.ts`,
 * adapted for Express response.
 */

import type { Response } from "express";
import { REQUEST_ID_HEADER } from "./request-id";

export type ApiErrorPayload = {
  error: {
    code: string;
    message: string;
    details?: unknown;
    requestId?: string;
  };
};

export function apiError(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: unknown,
  requestId?: string
): Response {
  const body: ApiErrorPayload = {
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
      ...(requestId ? { requestId } : {}),
    },
  };
  if (requestId) res.setHeader(REQUEST_ID_HEADER, requestId);
  return res.status(status).json(body);
}

export const ApiErrors = {
  invalidInput: (res: Response, issues: unknown, requestId?: string) =>
    apiError(res, 400, "INVALID_INPUT", "Request payload failed validation.", issues, requestId),

  unauthorized: (res: Response, requestId?: string) =>
    apiError(res, 401, "UNAUTHORIZED", "Authentication required.", undefined, requestId),

  forbidden: (res: Response, requestId?: string) =>
    apiError(res, 403, "FORBIDDEN", "Access denied.", undefined, requestId),

  notFound: (res: Response, what: string, requestId?: string) =>
    apiError(res, 404, "NOT_FOUND", `${what} not found.`, undefined, requestId),

  bodyTooLarge: (res: Response, requestId?: string) =>
    apiError(res, 413, "PAYLOAD_TOO_LARGE", "Request body too large.", undefined, requestId),

  rateLimited: (res: Response, retryAfterSec: number, requestId?: string) => {
    res.setHeader("Retry-After", String(retryAfterSec));
    return apiError(
      res,
      429,
      "RATE_LIMITED",
      "Too many requests. Please try again later.",
      { retryAfterSec },
      requestId
    );
  },

  serviceUnavailable: (res: Response, message: string, requestId?: string) =>
    apiError(res, 503, "SERVICE_UNAVAILABLE", message, undefined, requestId),

  internal: (res: Response, requestId?: string) =>
    apiError(res, 500, "INTERNAL_ERROR", "An unexpected error occurred.", undefined, requestId),
};
