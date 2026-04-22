import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import type { Transporter } from "nodemailer";
import {
  createApp,
  signSubscriptionToken,
  signUnsubscribeToken,
} from "../src/app";

function mockTransporter(): Transporter {
  return {
    sendMail: vi.fn().mockResolvedValue({ messageId: "test-id" }),
  } as unknown as Transporter;
}

function mockDb() {
  return {
    subscriber: {
      upsert: vi.fn().mockResolvedValue({ id: 1n }),
      update: vi.fn().mockResolvedValue({ id: 1n }),
      findUnique: vi.fn().mockResolvedValue(null),
    },
  };
}

const SECRET = "test-newsletter-secret-xyz";

describe("POST /api/newsletter/subscribe", () => {
  beforeEach(() => {
    process.env.NEWSLETTER_SECRET = SECRET;
    process.env.SMTP_USER = "noreply@test";
    process.env.SITE_BASE_URL = "http://localhost:3001";
  });

  it("returns 503 when NEWSLETTER_SECRET is missing", async () => {
    delete process.env.NEWSLETTER_SECRET;
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });

    const res = await request(app)
      .post("/api/newsletter/subscribe")
      .send({ email: "jane@example.com", consent: true });

    expect(res.status).toBe(503);
  });

  it("returns 400 when consent is missing", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });

    const res = await request(app)
      .post("/api/newsletter/subscribe")
      .send({ email: "jane@example.com" });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
  });

  it("returns 400 for invalid email", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });

    const res = await request(app)
      .post("/api/newsletter/subscribe")
      .send({ email: "not-an-email", consent: true });

    expect(res.status).toBe(400);
  });

  it("sends confirmation email on valid submission, does not write DB yet", async () => {
    const transporter = mockTransporter();
    const db = mockDb();
    const app = createApp({ transporter, db });

    const res = await request(app)
      .post("/api/newsletter/subscribe")
      .send({ email: "jane@example.com", consent: true });

    expect(res.status).toBe(200);
    expect(transporter.sendMail).toHaveBeenCalledTimes(1);
    expect(db.subscriber.upsert).not.toHaveBeenCalled();

    const call = (transporter.sendMail as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(call.to).toBe("jane@example.com");
    expect(call.html).toContain("Confirm subscription");
    expect(call.html).toContain("Unsubscribe");
  });
});

describe("GET /api/newsletter/confirm", () => {
  beforeEach(() => {
    process.env.NEWSLETTER_SECRET = SECRET;
    process.env.SMTP_USER = "noreply@test";
    process.env.CONTACT_RECEIVER = "inbox@test";
    process.env.SITE_BASE_URL = "http://localhost:3001";
  });

  it("redirects to ?status=expired with no token", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });
    const res = await request(app).get("/api/newsletter/confirm");
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("status=expired");
  });

  it("redirects to ?status=expired with invalid token", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });
    const res = await request(app).get("/api/newsletter/confirm?token=garbage");
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("status=expired");
  });

  it("upserts subscriber + emails admin + redirects status=ok on valid token", async () => {
    const transporter = mockTransporter();
    const db = mockDb();
    const app = createApp({ transporter, db });

    const token = signSubscriptionToken("jane@example.com", SECRET);
    const res = await request(app).get(`/api/newsletter/confirm?token=${token}`);

    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("status=ok");
    expect(db.subscriber.upsert).toHaveBeenCalledTimes(1);
    const upsertArg = db.subscriber.upsert.mock.calls[0][0] as {
      where: { email: string };
      create: { email: string };
      update: { unsubscribedAt: null };
    };
    expect(upsertArg.where.email).toBe("jane@example.com");
    expect(upsertArg.create.email).toBe("jane@example.com");
    expect(upsertArg.update.unsubscribedAt).toBeNull();

    expect(transporter.sendMail).toHaveBeenCalledTimes(1);
    const mailArg = (transporter.sendMail as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(mailArg.to).toBe("inbox@test");
  });

  it("rejects tokens signed for the unsubscribe purpose", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });
    const unsubToken = signUnsubscribeToken("jane@example.com", SECRET);
    const res = await request(app).get(`/api/newsletter/confirm?token=${unsubToken}`);
    expect(res.headers.location).toContain("status=expired");
  });
});

describe("GET /api/newsletter/unsubscribe", () => {
  beforeEach(() => {
    process.env.NEWSLETTER_SECRET = SECRET;
    process.env.SITE_BASE_URL = "http://localhost:3001";
  });

  it("redirects to ?status=expired with no token", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });
    const res = await request(app).get("/api/newsletter/unsubscribe");
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("status=expired");
  });

  it("updates unsubscribed_at and redirects status=ok for valid token", async () => {
    const db = mockDb();
    const app = createApp({ transporter: mockTransporter(), db });

    const token = signUnsubscribeToken("jane@example.com", SECRET);
    const res = await request(app).get(`/api/newsletter/unsubscribe?token=${token}`);

    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("status=ok");
    expect(db.subscriber.update).toHaveBeenCalledTimes(1);
    const arg = db.subscriber.update.mock.calls[0][0] as {
      where: { email: string };
      data: { unsubscribedAt: Date };
    };
    expect(arg.where.email).toBe("jane@example.com");
    expect(arg.data.unsubscribedAt).toBeInstanceOf(Date);
  });

  it("still redirects status=ok when row doesn't exist (P2025) — doesn't leak list membership", async () => {
    const db = mockDb();
    (db.subscriber.update as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      Object.assign(new Error("not found"), { code: "P2025" })
    );
    const app = createApp({ transporter: mockTransporter(), db });

    const token = signUnsubscribeToken("nobody@example.com", SECRET);
    const res = await request(app).get(`/api/newsletter/unsubscribe?token=${token}`);

    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("status=ok");
  });

  it("rejects tokens signed for the confirm purpose", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });
    const confirmToken = signSubscriptionToken("jane@example.com", SECRET);
    const res = await request(app).get(`/api/newsletter/unsubscribe?token=${confirmToken}`);
    expect(res.headers.location).toContain("status=expired");
  });
});
