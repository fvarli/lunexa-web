import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import { z } from "zod";

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

const allowedOrigins = CORS_ORIGIN.split(",").map((s) => s.trim());

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// ── Global rate limit ──

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// ── Contact-specific rate limit ──

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    ok: false,
    message: "Too many requests. Please try again in a few minutes.",
  },
});

// ── Mail ──

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== "false",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Health ──

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// ── Contact ──

const contactSchema = z.object({
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

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    // Honeypot check — bots fill hidden fields
    if (req.body.company) {
      res.json({ ok: true, message: "Message received successfully." });
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

    await transporter.sendMail({
      from: `"Lunexa Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: "New contact inquiry — Lunexa",
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Date: ${timestamp}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 520px; color: #222;">
          <h2 style="font-size: 18px; margin-bottom: 20px; color: #111;">New contact inquiry</h2>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <tr><td style="padding: 6px 12px 6px 0; color: #666; width: 60px;">Name</td><td style="padding: 6px 0;">${name}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #5b4dc7;">${email}</a></td></tr>
            <tr><td style="padding: 6px 12px 6px 0; color: #666;">Date</td><td style="padding: 6px 0;">${timestamp}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">${message}</p>
        </div>
      `,
    });

    // Optional auto-reply
    if (process.env.ENABLE_AUTOREPLY === "true") {
      await transporter.sendMail({
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

    console.log("[contact] sent", { name, email, timestamp });

    res.json({ ok: true, message: "Message received successfully." });
  } catch (err) {
    console.error("[contact] error:", err);
    res.status(500).json({ ok: false, message: "Something went wrong. Please try again later." });
  }
});

// ── Start ──

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
