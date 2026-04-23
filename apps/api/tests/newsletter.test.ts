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
      .send({ name: "Jane Doe", email: "jane@example.com", consent: true });

    expect(res.status).toBe(503);
  });

  it("returns 400 when consent is missing", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });

    const res = await request(app)
      .post("/api/newsletter/subscribe")
      .send({ name: "Jane Doe", email: "jane@example.com" });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
  });

  it("returns 400 when name is missing", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });

    const res = await request(app)
      .post("/api/newsletter/subscribe")
      .send({ email: "jane@example.com", consent: true });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(
      (res.body.errors as Array<{ field: string }>).some((e) => e.field === "name"),
    ).toBe(true);
  });

  it("returns 400 when name is too short after trimming", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });

    const res = await request(app)
      .post("/api/newsletter/subscribe")
      .send({ name: "  a  ", email: "jane@example.com", consent: true });

    expect(res.status).toBe(400);
    expect(
      (res.body.errors as Array<{ field: string }>).some((e) => e.field === "name"),
    ).toBe(true);
  });

  it("returns 400 for invalid email", async () => {
    const app = createApp({ transporter: mockTransporter(), db: mockDb() });

    const res = await request(app)
      .post("/api/newsletter/subscribe")
      .send({ name: "Jane Doe", email: "not-an-email", consent: true });

    expect(res.status).toBe(400);
  });

  it("sends confirmation email on valid submission, does not write DB yet", async () => {
    const transporter = mockTransporter();
    const db = mockDb();
    const app = createApp({ transporter, db });

    const res = await request(app)
      .post("/api/newsletter/subscribe")
      .send({ name: "Jane Doe", email: "jane@example.com", consent: true });

    expect(res.status).toBe(200);
    expect(transporter.sendMail).toHaveBeenCalledTimes(1);
    expect(db.subscriber.upsert).not.toHaveBeenCalled();

    const call = (transporter.sendMail as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(call.to).toBe("jane@example.com");
    expect(call.html).toContain("Confirm subscription");
    expect(call.html).toContain("Unsubscribe");
    expect(call.html).toContain("Hi Jane Doe,");
  });

  it("escapes HTML in name before it reaches the email body", async () => {
    const transporter = mockTransporter();
    const db = mockDb();
    const app = createApp({ transporter, db });

    const res = await request(app)
      .post("/api/newsletter/subscribe")
      .send({
        name: "<script>evil</script>",
        email: "jane@example.com",
        consent: true,
      });

    expect(res.status).toBe(200);
    const call = (transporter.sendMail as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(call.html).not.toContain("<script>evil</script>");
    expect(call.html).toContain("&lt;script&gt;evil&lt;/script&gt;");
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

    const token = signSubscriptionToken("jane@example.com", "Jane Doe", SECRET);
    const res = await request(app)
      .get(`/api/newsletter/confirm?token=${token}`)
      .set("User-Agent", "Mozilla/5.0 Test")
      .set("Referer", "https://example.com/src")
      .set("Accept-Language", "tr-TR,tr;q=0.9");

    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("status=ok");
    expect(db.subscriber.upsert).toHaveBeenCalledTimes(1);
    const upsertArg = db.subscriber.upsert.mock.calls[0][0] as {
      where: { email: string };
      create: {
        email: string;
        name?: string | null;
        userAgent?: string | null;
        referer?: string | null;
        locale?: string | null;
        consentVersion?: string | null;
        ipHash?: string | null;
      };
      update: { unsubscribedAt: null; name?: string | null; consentVersion?: string | null };
    };
    expect(upsertArg.where.email).toBe("jane@example.com");
    expect(upsertArg.create.email).toBe("jane@example.com");
    expect(upsertArg.create.name).toBe("Jane Doe");
    expect(upsertArg.update.name).toBe("Jane Doe");
    expect(upsertArg.update.unsubscribedAt).toBeNull();
    expect(upsertArg.create.userAgent).toBe("Mozilla/5.0 Test");
    expect(upsertArg.create.referer).toBe("https://example.com/src");
    expect(upsertArg.create.locale).toBe("tr-TR");
    expect(upsertArg.create.consentVersion).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(upsertArg.create.ipHash).toBeTruthy();

    expect(transporter.sendMail).toHaveBeenCalledTimes(1);
    const mailArg = (transporter.sendMail as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(mailArg.to).toBe("inbox@test");
    expect(mailArg.text).toContain("Jane Doe");
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
    const confirmToken = signSubscriptionToken("jane@example.com", "Jane Doe", SECRET);
    const res = await request(app).get(`/api/newsletter/unsubscribe?token=${confirmToken}`);
    expect(res.headers.location).toContain("status=expired");
  });
});
