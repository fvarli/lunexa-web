-- Enrich subscribers with IP (raw + hash already exists), user agent, referer,
-- consent version, and audit timestamps. Retention: NEVER auto-null (keep raw IP forever per product decision).

ALTER TABLE "subscribers"
  ADD COLUMN "ip"               INET,
  ADD COLUMN "user_agent"       TEXT,
  ADD COLUMN "referer"          TEXT,
  ADD COLUMN "consent_version"  VARCHAR(16),
  ADD COLUMN "created_at"       TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "updated_at"       TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
