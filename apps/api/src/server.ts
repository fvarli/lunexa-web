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

app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

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
    .pipe(z.string().min(1, "Name is required").max(200)),
  email: z
    .string()
    .transform((v) => v.trim().toLowerCase())
    .pipe(z.string().email("Invalid email address").max(320)),
  message: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().min(1, "Message is required").max(5000)),
});

app.post("/api/contact", async (req, res) => {
  try {
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

    await transporter.sendMail({
      from: `"Lunexa Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: "New Contact Message — Lunexa",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px;">
          <h2 style="margin-bottom: 16px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    console.log("[contact] sent", { name, email });

    res.json({ ok: true, message: "Message received successfully." });
  } catch (err) {
    console.error("[contact] error:", err);
    res.status(500).json({ ok: false, message: "Something went wrong." });
  }
});

// ── Start ──

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
