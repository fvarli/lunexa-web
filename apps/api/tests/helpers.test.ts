import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { escapeHtml, verifyTurnstile, contactSchema } from "../src/app";

describe("escapeHtml", () => {
  it("escapes all HTML-significant characters", () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"
    );
  });

  it("escapes ampersand first (to avoid double-escape)", () => {
    expect(escapeHtml("A & B")).toBe("A &amp; B");
  });

  it("escapes apostrophes", () => {
    expect(escapeHtml("it's fine")).toBe("it&#39;s fine");
  });

  it("passes plain text through unchanged", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });
});

describe("contactSchema", () => {
  it("accepts valid input and trims/normalizes", () => {
    const result = contactSchema.safeParse({
      name: "  Jane Doe  ",
      email: "  Jane@Example.COM  ",
      message: "  This is a test message long enough.  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Jane Doe");
      expect(result.data.email).toBe("jane@example.com");
      expect(result.data.message).toBe("This is a test message long enough.");
    }
  });

  it("rejects short name", () => {
    const result = contactSchema.safeParse({
      name: "J",
      email: "j@example.com",
      message: "Long enough message here.",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["name"]);
    }
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Jane",
      email: "not-an-email",
      message: "Long enough message here.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short message", () => {
    const result = contactSchema.safeParse({
      name: "Jane",
      email: "j@example.com",
      message: "short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message over 2000 chars", () => {
    const result = contactSchema.safeParse({
      name: "Jane",
      email: "j@example.com",
      message: "x".repeat(2001),
    });
    expect(result.success).toBe(false);
  });
});

describe("verifyTurnstile", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    // no-op
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("returns true when secret is not configured (dev skip)", async () => {
    const result = await verifyTurnstile("some-token", "1.2.3.4", undefined);
    expect(result).toBe(true);
  });

  it("returns false when token is missing and secret is configured", async () => {
    const result = await verifyTurnstile(undefined, "1.2.3.4", "test-secret");
    expect(result).toBe(false);
  });

  it("returns true when Cloudflare confirms success", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ success: true }),
    } as Response);

    const result = await verifyTurnstile("valid-token", "1.2.3.4", "test-secret");
    expect(result).toBe(true);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("returns false when Cloudflare reports failure", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ success: false, "error-codes": ["invalid-input-response"] }),
    } as Response);

    const result = await verifyTurnstile("bad-token", "1.2.3.4", "test-secret");
    expect(result).toBe(false);
  });

  it("returns false when fetch throws (network error)", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("network"));

    const result = await verifyTurnstile("any-token", "1.2.3.4", "test-secret");
    expect(result).toBe(false);
  });
});
