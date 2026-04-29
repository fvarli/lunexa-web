/**
 * Structured logger.
 *
 * Dev:  human-readable lines on stdout/stderr.
 * Prod: structured JSON lines (one record per line). Pluggable to a real
 *       log shipper later by replacing the emit() body.
 *
 * Never logs secrets, tokens, full request bodies, emails, IPs of users,
 * or PII. Callers pass sanitized `context` only. Use `reqMeta(req)` from
 * `./request-id` for safe request metadata (route/method/ip/userAgent).
 *
 * Audit event naming convention: `<feature>.<action>` snake_case.
 *   - newsletter.signup
 *   - newsletter.confirmed
 *   - newsletter.rate_limited
 *   - contact.sent
 *   - contact.rate_limited
 *   - contact.turnstile_failed
 *   - health.db_check_failed
 *
 * Pattern adopted from techchefdelights `src/lib/logger.ts`.
 */

export type LogLevel = "info" | "warn" | "error";

export type LogContext = {
  requestId?: string;
  route?: string;
  method?: string;
  userAgent?: string | null;
  ip?: string | null;
  context?: Record<string, unknown>;
};

type LogRecord = LogContext & {
  level: LogLevel;
  message: string;
  timestamp: string;
};

const isProd = process.env.NODE_ENV === "production";

function emit(record: LogRecord): void {
  if (isProd) {
    const line = JSON.stringify(record);
    if (record.level === "error") console.error(line);
    else if (record.level === "warn") console.warn(line);
    else console.log(line);
    return;
  }
  const tag = `[${record.level.toUpperCase()}]`;
  const meta = [
    record.requestId && `req=${record.requestId.slice(0, 8)}`,
    record.route && `route=${record.route}`,
    record.method && `method=${record.method}`,
    record.ip && `ip=${record.ip}`,
  ]
    .filter(Boolean)
    .join(" ");
  const head = `${tag} ${record.message}${meta ? " " + meta : ""}`;
  const tail = record.context ? " " + JSON.stringify(record.context) : "";
  if (record.level === "error") console.error(head + tail);
  else if (record.level === "warn") console.warn(head + tail);
  else console.log(head + tail);
}

function build(level: LogLevel, message: string, ctx: LogContext = {}): LogRecord {
  return { level, message, timestamp: new Date().toISOString(), ...ctx };
}

export const logger = {
  info: (message: string, ctx: LogContext = {}) => emit(build("info", message, ctx)),
  warn: (message: string, ctx: LogContext = {}) => emit(build("warn", message, ctx)),
  error: (message: string, ctx: LogContext = {}) => emit(build("error", message, ctx)),
};
