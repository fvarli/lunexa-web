import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import type { Transporter } from "nodemailer";
import { createApp } from "../src/app";

function mockTransporter(): Transporter {
  return {
    sendMail: vi.fn().mockResolvedValue({ messageId: "test-id" }),
  } as unknown as Transporter;
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    // Ensure Turnstile is skipped (no secret) so we don't hit the network
    delete process.env.TURNSTILE_SECRET_KEY;
    process.env.SMTP_USER = "noreply@test";
    process.env.CONTACT_RECEIVER = "inbox@test";
  });

  it("returns 200 fake-success when honeypot is filled (no email sent)", async () => {
    const transporter = mockTransporter();
    const app = createApp({ transporter });

    const res = await request(app)
      .post("/api/contact")
      .send({
        name: "bot",
        email: "bot@bot.com",
        message: "Long enough message here.",
        company: "SpamCorp",
      });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });

  it("returns 400 with field errors for invalid input", async () => {
    const transporter = mockTransporter();
    const app = createApp({ transporter });

    const res = await request(app)
      .post("/api/contact")
      .send({ name: "x", email: "bad", message: "tiny" });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });

  it("returns 200 and sends email on valid submission", async () => {
    const transporter = mockTransporter();
    const app = createApp({ transporter });

    const res = await request(app)
      .post("/api/contact")
      .send({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Hello, this is a real message that is long enough.",
      });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(transporter.sendMail).toHaveBeenCalledTimes(1);
    const call = (transporter.sendMail as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(call.to).toBe("inbox@test");
    expect(call.html).toContain("Jane Doe");
    expect(call.html).toContain("jane@example.com");
  });

  it("escapes HTML in email body to prevent injection", async () => {
    const transporter = mockTransporter();
    const app = createApp({ transporter });

    await request(app)
      .post("/api/contact")
      .send({
        name: "<script>evil</script>",
        email: "x@y.com",
        message: "A legitimate message of sufficient length.",
      });

    const call = (transporter.sendMail as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(call.html).not.toContain("<script>evil</script>");
    expect(call.html).toContain("&lt;script&gt;");
  });

  it("rejects body over 10 KB limit with 413", async () => {
    const transporter = mockTransporter();
    const app = createApp({ transporter });

    const res = await request(app)
      .post("/api/contact")
      .set("Content-Type", "application/json")
      .send({
        name: "Jane",
        email: "j@example.com",
        message: "x".repeat(20_000),
      });

    expect(res.status).toBe(413);
    expect(res.body.ok).toBe(false);
  });

  it("rejects with 400 when Turnstile token is missing and secret is configured", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    globalThis.fetch = vi.fn(); // would be called on valid token
    const transporter = mockTransporter();
    const app = createApp({ transporter });

    const res = await request(app)
      .post("/api/contact")
      .send({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "A legitimate message of sufficient length.",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/captcha/i);
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });
});

describe("Contact rate limit", () => {
  it("returns 429 after exceeding the contact-specific burst", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    const transporter = mockTransporter();
    const app = createApp({
      transporter,
      rateLimits: { contactMax: 2, globalMax: 1000, windowMs: 60_000 },
    });

    const payload = {
      name: "Jane",
      email: "jane@example.com",
      message: "A message of sufficient length goes here.",
    };

    const a = await request(app).post("/api/contact").send(payload);
    const b = await request(app).post("/api/contact").send(payload);
    const c = await request(app).post("/api/contact").send(payload);

    expect(a.status).toBe(200);
    expect(b.status).toBe(200);
    expect(c.status).toBe(429);
  });
});

describe("GET /api/health", () => {
  it("returns ok:true with status/db/uptime/memory/version metadata", async () => {
    const mockedDb = {
      $queryRaw: vi.fn().mockResolvedValue([{ "?column?": 1 }]),
      subscriber: {
        upsert: vi.fn().mockResolvedValue({ id: 1n }),
        update: vi.fn().mockResolvedValue({ id: 1n }),
        findUnique: vi.fn().mockResolvedValue(null),
      },
    };
    const app = createApp({
      transporter: mockTransporter(),
      db: mockedDb as unknown as Parameters<typeof createApp>[0]["db"],
    });
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.status).toBe("ok");
    expect(res.body.db).toBe("ok");
    expect(typeof res.body.uptimeSeconds).toBe("number");
    expect(typeof res.body.memory.rssMb).toBe("number");
    expect(typeof res.body.requestId).toBe("string");
    expect(res.body.requestId).toMatch(/^[0-9a-f-]{36}$/i);
    expect(mockedDb.$queryRaw).toHaveBeenCalled();
  });

  it("returns status=degraded when DB ping fails", async () => {
    const mockedDb = {
      $queryRaw: vi.fn().mockRejectedValue(new Error("ECONNREFUSED")),
      subscriber: {
        upsert: vi.fn(),
        update: vi.fn(),
        findUnique: vi.fn(),
      },
    };
    const app = createApp({
      transporter: mockTransporter(),
      db: mockedDb as unknown as Parameters<typeof createApp>[0]["db"],
    });
    const res = await request(app).get("/api/health");
    expect(res.body.status).toBe("degraded");
    expect(res.body.db).toBe("error");
  });
});
