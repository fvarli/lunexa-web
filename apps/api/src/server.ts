import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
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

app.post("/api/contact", (req, res) => {
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

    // TODO: send email notification (e.g. Nodemailer, Resend, SES)
    console.log("[contact]", { name, email, message: message.slice(0, 80) });

    res.json({ ok: true, message: "Message received successfully." });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    res.status(500).json({ ok: false, message: "Something went wrong." });
  }
});

// ── Start ──

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
