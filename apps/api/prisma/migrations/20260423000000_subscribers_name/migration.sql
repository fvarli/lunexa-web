-- Add a subscriber name column for personalization (confirmation email greeting,
-- future segmentation). Nullable at the DB level so existing rows stay valid;
-- the API + form require it from this migration forward, so new rows always have it.

ALTER TABLE "subscribers"
  ADD COLUMN "name" VARCHAR(120);
