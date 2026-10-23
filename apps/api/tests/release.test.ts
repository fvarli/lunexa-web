import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createApp } from "../src/app";
import { readReleaseSha } from "../src/lib/release";

const SHA = "0f3999ca1c9dfb675305ad5dcf60ed17f18e3b1e";

let dir: string;
const marker = (name: string, contents: string) => {
  const file = path.join(dir, name);
  writeFileSync(file, contents);
  return file;
};

beforeAll(() => {
  dir = mkdtempSync(path.join(tmpdir(), "release-sha-"));
});

afterAll(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe("readReleaseSha", () => {
  it("returns a valid 40-character lowercase SHA", () => {
    expect(readReleaseSha(marker("valid", SHA))).toBe(SHA);
  });

  it("accepts a single trailing newline, as written by the deploy", () => {
    expect(readReleaseSha(marker("lf", `${SHA}\n`))).toBe(SHA);
    expect(readReleaseSha(marker("crlf", `${SHA}\r\n`))).toBe(SHA);
  });

  it("returns null when the file is missing", () => {
    expect(readReleaseSha(path.join(dir, "does-not-exist"))).toBeNull();
  });

  it("returns null for the wrong length", () => {
    expect(readReleaseSha(marker("short", SHA.slice(0, 39)))).toBeNull();
    expect(readReleaseSha(marker("long", `${SHA}0`))).toBeNull();
    expect(readReleaseSha(marker("abbrev", SHA.slice(0, 7)))).toBeNull();
    expect(readReleaseSha(marker("empty", ""))).toBeNull();
  });

  it("returns null for non-hex characters, uppercase or extra whitespace", () => {
    expect(readReleaseSha(marker("nonhex", `${SHA.slice(0, 39)}g`))).toBeNull();
    expect(readReleaseSha(marker("upper", SHA.toUpperCase()))).toBeNull();
    expect(readReleaseSha(marker("leading", ` ${SHA}`))).toBeNull();
    expect(readReleaseSha(marker("two-lines", `${SHA}\n${SHA}\n`))).toBeNull();
  });

  it("returns null when the path cannot be read as a file", () => {
    expect(readReleaseSha(dir)).toBeNull();
  });

  // Permission bits do not restrict root, so this only means something as a normal user.
  it.skipIf(process.getuid?.() === 0)("returns null for an unreadable file", () => {
    const file = marker("unreadable", SHA);
    chmodSync(file, 0o000);
    try {
      expect(readReleaseSha(file)).toBeNull();
    } finally {
      chmodSync(file, 0o600);
    }
  });
});

describe("GET /api/health commit", () => {
  const db = () =>
    ({
      $queryRaw: vi.fn().mockResolvedValue([{ "?column?": 1 }]),
      subscriber: { upsert: vi.fn(), update: vi.fn(), findUnique: vi.fn() },
    }) as unknown as NonNullable<Parameters<typeof createApp>[0]>["db"];

  it("reports the SHA from the release marker", async () => {
    const app = createApp({ db: db(), releaseShaFile: marker("health-valid", `${SHA}\n`) });
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.commit).toBe(SHA);
  });

  it("reports null when the marker is missing", async () => {
    const app = createApp({ db: db(), releaseShaFile: path.join(dir, "health-missing") });
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.commit).toBeNull();
  });

  it("ignores APP_COMMIT_SHA from the environment", async () => {
    process.env.APP_COMMIT_SHA = "f".repeat(40);
    try {
      const app = createApp({ db: db(), releaseShaFile: path.join(dir, "health-missing") });
      const res = await request(app).get("/api/health");
      expect(res.body.commit).toBeNull();
    } finally {
      delete process.env.APP_COMMIT_SHA;
    }
  });

  it("keeps the existing response fields", async () => {
    const app = createApp({ db: db(), releaseShaFile: marker("health-shape", SHA) });
    const res = await request(app).get("/api/health");
    expect(Object.keys(res.body).sort()).toEqual(
      ["commit", "db", "environment", "memory", "ok", "rateLimitStore", "requestId", "status", "timestamp", "uptimeSeconds", "version"].sort(),
    );
  });
});
