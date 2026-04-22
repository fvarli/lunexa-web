import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";
import { z } from "zod";
import { prisma as defaultPrisma } from "./db";

type NewsletterDb = {
  subscriber: {
    upsert: (args: unknown) => Promise<unknown>;
    update: (args: unknown) => Promise<unknown>;
    findUnique: (args: unknown) => Promise<unknown>;
  };
};

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

export const newsletterSchema = z.object({
  email: z
    .string()
    .transform((v) => v.trim().toLowerCase())
    .pipe(z.string().email("Invalid email address").max(254, "Email is too long")),
  consent: z.literal(true, {
    message: "You must accept the newsletter terms",
  }),
});

export function signSubscriptionToken(email: string, secret: string): string {
  return jwt.sign({ email, purpose: "newsletter-confirm" }, secret, {
    expiresIn: "15m",
  });
}

export function verifySubscriptionToken(
  token: string,
  secret: string
): { email: string } | null {
  try {
    const decoded = jwt.verify(token, secret) as {
      email?: unknown;
      purpose?: unknown;
    };
    if (
      decoded &&
      decoded.purpose === "newsletter-confirm" &&
      typeof decoded.email === "string"
    ) {
      return { email: decoded.email };
    }
    return null;
  } catch {
    return null;
  }
}

export function signUnsubscribeToken(email: string, secret: string): string {
  return jwt.sign({ email, purpose: "newsletter-unsubscribe" }, secret, {
    expiresIn: "30d",
  });
}

export function verifyUnsubscribeToken(
  token: string,
  secret: string
): { email: string } | null {
  try {
    const decoded = jwt.verify(token, secret) as {
      email?: unknown;
      purpose?: unknown;
    };
    if (
      decoded &&
      decoded.purpose === "newsletter-unsubscribe" &&
      typeof decoded.email === "string"
    ) {
      return { email: decoded.email };
    }
    return null;
  } catch {
    return null;
  }
}

export function hashIp(ip: string | undefined, pepper: string | undefined): string | null {
  if (!ip) return null;
  const salt = pepper ?? "lunexa-newsletter";
  return createHash("sha256").update(`${salt}::${ip}`).digest("hex");
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
  /** Inject a Prisma-compatible client for tests. */
  db?: NewsletterDb;
  /** Override rate limits (useful for tests). */
  rateLimits?: {
    globalMax?: number;
    contactMax?: number;
    newsletterMax?: number;
    windowMs?: number;
  };
};

export function createApp({ transporter, db, rateLimits }: CreateAppOptions = {}) {
  const prisma = db ?? (defaultPrisma as unknown as NewsletterDb);
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

  const newsletterLimiter = rateLimit({
    windowMs,
    max: rateLimits?.newsletterMax ?? 3,
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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New contact inquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <tr>
              <td style="padding:24px 32px;background-color:#0f0f0f;color:#ffffff;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="middle">
                      <span style="display:inline-block;width:28px;height:28px;border-radius:8px;background-color:#a78bfa;vertical-align:middle;"></span>
                      <span style="display:inline-block;margin-left:10px;font-size:16px;font-weight:600;letter-spacing:0.01em;vertical-align:middle;">Lunexa</span>
                    </td>
                    <td align="right" style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#a1a1aa;">
                      Contact
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 24px 0;font-size:18px;font-weight:600;color:#18181b;letter-spacing:-0.01em;">New contact inquiry</h1>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-size:13px;color:#71717a;width:88px;vertical-align:top;">Name</td>
                    <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#18181b;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-size:13px;color:#71717a;vertical-align:top;">Email</td>
                    <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-size:14px;"><a href="mailto:${safeEmail}" style="color:#7c3aed;text-decoration:none;">${safeEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-size:13px;color:#71717a;vertical-align:top;">Date</td>
                    <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#18181b;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${timestamp}</td>
                  </tr>
                </table>
                <div style="margin-top:24px;padding:16px;background-color:#fafafa;border-radius:8px;">
                  <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#71717a;">Message</p>
                  <p style="margin:0;white-space:pre-wrap;line-height:1.65;font-size:14px;color:#27272a;">${safeMessage}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 24px 32px;font-size:12px;color:#a1a1aa;text-align:center;">
                Reply directly to this email to respond to ${safeName}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
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

  // ── Newsletter (double opt-in) ──

  const siteBaseUrl = process.env.SITE_BASE_URL || "https://uselunexa.com";

  app.post(
    "/api/newsletter/subscribe",
    jsonBody,
    newsletterLimiter,
    async (req, res) => {
      try {
        const result = newsletterSchema.safeParse(req.body);
        if (!result.success) {
          const errors = result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          }));
          res.status(400).json({ ok: false, errors });
          return;
        }

        const { email } = result.data;
        const secret = process.env.NEWSLETTER_SECRET;
        if (!secret) {
          console.error("[newsletter] NEWSLETTER_SECRET is not configured");
          res.status(503).json({
            ok: false,
            message: "Newsletter is temporarily unavailable.",
          });
          return;
        }

        const token = signSubscriptionToken(email, secret);
        const unsubToken = signUnsubscribeToken(email, secret);
        const confirmUrl = `${siteBaseUrl}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;
        const unsubscribeUrl = `${siteBaseUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubToken)}`;
        const safeEmail = escapeHtml(email);

        await mailer.sendMail({
          from: `"Lunexa" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Confirm your Lunexa newsletter subscription",
          text: [
            "Hi,",
            "",
            "Please confirm your Lunexa newsletter subscription by opening the link below within 15 minutes:",
            "",
            confirmUrl,
            "",
            "If you did not request this, you can safely ignore this email.",
            "",
            "— Lunexa",
            "https://uselunexa.com",
            "",
            `Don't want these emails? Unsubscribe: ${unsubscribeUrl}`,
          ].join("\n"),
          html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Confirm your newsletter subscription</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <tr>
              <td style="padding:24px 32px;background-color:#0f0f0f;color:#ffffff;">
                <span style="display:inline-block;width:28px;height:28px;border-radius:8px;background-color:#a78bfa;vertical-align:middle;"></span>
                <span style="display:inline-block;margin-left:10px;font-size:16px;font-weight:600;vertical-align:middle;">Lunexa</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 12px 0;font-size:22px;font-weight:600;color:#18181b;letter-spacing:-0.02em;">Confirm your subscription</h1>
                <p style="margin:0 0 24px 0;font-size:14px;line-height:1.65;color:#52525b;">
                  You asked to subscribe to the Lunexa newsletter as
                  <strong style="color:#18181b;">${safeEmail}</strong>. Please confirm within 15 minutes:
                </p>
                <p style="margin:0 0 24px 0;">
                  <a href="${confirmUrl}" style="display:inline-block;padding:12px 28px;background-color:#18181b;color:#ffffff;font-size:14px;font-weight:500;text-decoration:none;border-radius:9999px;">Confirm subscription</a>
                </p>
                <p style="margin:0 0 12px 0;font-size:12px;color:#71717a;">Or paste this link into your browser:</p>
                <p style="margin:0 0 24px 0;font-size:12px;word-break:break-all;"><a href="${confirmUrl}" style="color:#7c3aed;text-decoration:none;">${confirmUrl}</a></p>
                <p style="margin:0;font-size:12px;color:#a1a1aa;">If you didn't request this, you can safely ignore this email.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 24px 32px;font-size:12px;color:#a1a1aa;text-align:center;border-top:1px solid #e4e4e7;">
                Don't want these emails? <a href="${unsubscribeUrl}" style="color:#71717a;text-decoration:underline;">Unsubscribe</a>.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
        });

        console.log("[newsletter] confirmation requested", {
          timestamp: new Date().toISOString(),
        });
        res.json({
          ok: true,
          message: "Check your inbox to confirm your subscription.",
        });
      } catch (err) {
        console.error("[newsletter] subscribe error:", err);
        res.status(500).json({
          ok: false,
          message: "Something went wrong. Please try again later.",
        });
      }
    }
  );

  app.get("/api/newsletter/confirm", async (req, res) => {
    const secret = process.env.NEWSLETTER_SECRET;
    const token = typeof req.query.token === "string" ? req.query.token : "";

    if (!secret || !token) {
      res.redirect(`${siteBaseUrl}/newsletter/confirmed?status=expired`);
      return;
    }

    const decoded = verifySubscriptionToken(token, secret);
    if (!decoded) {
      res.redirect(`${siteBaseUrl}/newsletter/confirmed?status=expired`);
      return;
    }

    try {
      const ipHash = hashIp(req.ip, secret);
      await prisma.subscriber.upsert({
        where: { email: decoded.email },
        create: {
          email: decoded.email,
          ipHash,
        },
        update: {
          unsubscribedAt: null,
          confirmedAt: new Date(),
        },
      });

      await mailer.sendMail({
        from: `"Lunexa Newsletter" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER,
        subject: "New confirmed newsletter subscriber",
        text: [
          `Confirmed subscriber: ${decoded.email}`,
          `Date: ${new Date().toISOString()}`,
          "",
          "Stored in the subscribers table.",
        ].join("\n"),
      });

      console.log("[newsletter] confirmed", {
        timestamp: new Date().toISOString(),
      });
      res.redirect(`${siteBaseUrl}/newsletter/confirmed?status=ok`);
    } catch (err) {
      console.error("[newsletter] confirm error:", err);
      res.redirect(`${siteBaseUrl}/newsletter/confirmed?status=error`);
    }
  });

  app.get("/api/newsletter/unsubscribe", async (req, res) => {
    const secret = process.env.NEWSLETTER_SECRET;
    const token = typeof req.query.token === "string" ? req.query.token : "";

    if (!secret || !token) {
      res.redirect(`${siteBaseUrl}/newsletter/unsubscribed?status=expired`);
      return;
    }

    const decoded = verifyUnsubscribeToken(token, secret);
    if (!decoded) {
      res.redirect(`${siteBaseUrl}/newsletter/unsubscribed?status=expired`);
      return;
    }

    try {
      await prisma.subscriber.update({
        where: { email: decoded.email },
        data: { unsubscribedAt: new Date() },
      }).catch((err: unknown) => {
        // Record not found — still return OK to avoid leaking which emails are on the list
        const code = (err as { code?: string })?.code;
        if (code !== "P2025") throw err;
      });

      console.log("[newsletter] unsubscribed", {
        timestamp: new Date().toISOString(),
      });
      res.redirect(`${siteBaseUrl}/newsletter/unsubscribed?status=ok`);
    } catch (err) {
      console.error("[newsletter] unsubscribe error:", err);
      res.redirect(`${siteBaseUrl}/newsletter/unsubscribed?status=error`);
    }
  });

  return app;
}
