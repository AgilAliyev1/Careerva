BEGIN;

ALTER TYPE subscription_tier RENAME TO subscription_tier_old;

CREATE TYPE subscription_tier AS ENUM ('starter', 'growth', 'unlimited');

ALTER TABLE subscriptions
  ALTER COLUMN tier TYPE subscription_tier
  USING CASE
    WHEN tier::text = 'basic' THEN 'starter'::subscription_tier
    WHEN tier::text = 'standard' THEN 'growth'::subscription_tier
    WHEN tier::text = 'premium' THEN 'unlimited'::subscription_tier
    ELSE 'starter'::subscription_tier
  END;

DROP TYPE subscription_tier_old;

CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL,
  consumed_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  UNIQUE (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS user_ratings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewer_user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  target_role text NOT NULL CHECK (target_role IN ('student', 'instructor')),
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS user_ratings_target_idx ON user_ratings (target_user_id);
CREATE INDEX IF NOT EXISTS user_ratings_reviewer_idx ON user_ratings (reviewer_user_id);
CREATE INDEX IF NOT EXISTS course_enrollments_user_idx ON course_enrollments (user_id, consumed_at);

COMMIT;
