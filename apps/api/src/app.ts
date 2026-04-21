import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { z } from "zod";

// ── Shared helpers (exported for tests) ──

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function verifyTurnstile(
  token: string | undefined,
  remoteip: string | undefined,
  secret: string | undefined = process.env.TURNSTILE_SECRET_KEY
): Promise<boolean> {
  if (!secret) return true; // skip in local dev when not configured
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteip) body.append("remoteip", remoteip);

    const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await resp.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export const contactSchema = z.object({
  name: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().min(2, "Name must be at least 2 characters").max(80, "Name must be at most 80 characters")),
  email: z
    .string()
    .transform((v) => v.trim().toLowerCase())
    .pipe(z.string().email("Invalid email address").max(254, "Email is too long")),
  message: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must be at most 2000 characters")),
});

// ── Factory ──

export type CreateAppOptions = {
  /** Inject a mock transporter for tests. */
  transporter?: Transporter;
  /** Override rate limits (useful for tests). */
  rateLimits?: {
    globalMax?: number;
    contactMax?: number;
    windowMs?: number;
  };
};

export function createApp({ transporter, rateLimits }: CreateAppOptions = {}) {
  const app = express();
  app.set("trust proxy", 1);

  // CORS
  const rawCorsOrigins = process.env.CORS_ORIGIN || "";
  const explicitAllowedOrigins = rawCorsOrigins
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const localDevOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

  function isAllowedOrigin(origin?: string): boolean {
    if (!origin) return true;
    if (explicitAllowedOrigins.includes(origin)) return true;
    if (process.env.NODE_ENV !== "production" && localDevOriginPattern.test(origin)) return true;
    return false;
  }

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (isAllowedOrigin(origin)) {
          if (origin) console.log(`[cors] allowed origin: ${origin}`);
          return callback(null, true);
        }
        console.warn(`[cors] blocked origin: ${origin}`);
        return callback(null, false);
      },
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: false,
    })
  );

  // JSON body parsing
  const parseJson = express.json({ limit: "10kb" });

  function jsonBody(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    parseJson(req, res, (err?: unknown) => {
      if (!err) return next();
      if (err instanceof Error && "type" in err) {
        const type = (err as { type: string }).type;
        if (type === "entity.too.large") {
          res.status(413).json({ ok: false, message: "Request body too large." });
          return;
        }
        if (type === "entity.parse.failed") {
          res.status(400).json({ ok: false, message: "Invalid request body." });
          return;
        }
      }
      res.status(400).json({ ok: false, message: "Bad request." });
    });
  }

  // Rate limits
  const windowMs = rateLimits?.windowMs ?? 15 * 60 * 1000;
  const globalLimiter = rateLimit({
    windowMs,
    max: rateLimits?.globalMax ?? 100,
  });
  app.use(globalLimiter);

  const contactLimiter = rateLimit({
    windowMs,
    max: rateLimits?.contactMax ?? 5,
    message: {
      ok: false,
      message: "Too many requests. Please try again in a few minutes.",
    },
  });

  // Mailer (real or injected)
  const mailer: Transporter =
    transporter ??
    nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

  // Routes
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/api/contact", jsonBody, contactLimiter, async (req, res) => {
    try {
      if (req.body.company) {
        res.json({ ok: true, message: "Message received successfully." });
        return;
      }

      const turnstileOk = await verifyTurnstile(req.body.turnstileToken, req.ip);
      if (!turnstileOk) {
        res.status(400).json({ ok: false, message: "Captcha verification failed. Please try again." });
        return;
      }

      const result = contactSchema.safeParse(req.body);
      if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
        res.status(400).json({ ok: false, errors });
        return;
      }

      const { name, email, message } = result.data;
      const timestamp = new Date().toISOString();
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeMessage = escapeHtml(message);

      await mailer.sendMail({
        from: `"Lunexa Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER,
        replyTo: email,
        subject: "New contact inquiry — Lunexa",
        text: [`Name: ${name}`, `Email: ${email}`, `Date: ${timestamp}`, "", message].join("\n"),
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 520px; color: #222;">
            <h2 style="font-size: 18px; margin-bottom: 20px; color: #111;">New contact inquiry</h2>
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
              <tr><td style="padding: 6px 12px 6px 0; color: #666; width: 60px;">Name</td><td style="padding: 6px 0;">${safeName}</td></tr>
              <tr><td style="padding: 6px 12px 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${safeEmail}" style="color: #5b4dc7;">${safeEmail}</a></td></tr>
              <tr><td style="padding: 6px 12px 6px 0; color: #666;">Date</td><td style="padding: 6px 0;">${timestamp}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
            <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">${safeMessage}</p>
          </div>
        `,
      });

      if (process.env.ENABLE_AUTOREPLY === "true") {
        await mailer.sendMail({
          from: `"Lunexa" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Thank you for contacting Lunexa",
          text: [
            `Hi ${name},`,
            "",
            "Thank you for reaching out. We have received your message and will get back to you within one business day.",
            "",
            "Best regards,",
            "Lunexa",
            "https://uselunexa.com",
          ].join("\n"),
        });
      }

      console.log("[contact] sent", { timestamp });
      res.json({ ok: true, message: "Message received successfully." });
    } catch (err) {
      console.error("[contact] error:", err);
      res.status(500).json({ ok: false, message: "Something went wrong. Please try again later." });
    }
  });

  return app;
}
