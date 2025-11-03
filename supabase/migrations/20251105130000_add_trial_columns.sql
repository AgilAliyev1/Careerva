ALTER TABLE public.profiles
  ADD COLUMN trial_started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ADD COLUMN trial_ends_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  ADD COLUMN trial_status TEXT NOT NULL DEFAULT 'active';

-- Ensure existing rows are marked active with a 7-day trial window
UPDATE public.profiles
SET
  trial_started_at = COALESCE(trial_started_at, now()),
  trial_ends_at = COALESCE(trial_ends_at, now() + interval '7 days'),
  trial_status = COALESCE(trial_status, 'active');

-- Optional helper view to quickly inspect trial users (comment out if not needed)
-- CREATE VIEW public.active_trials AS
-- SELECT id, email, full_name, trial_started_at, trial_ends_at
-- FROM public.profiles
-- WHERE trial_status = 'active' AND trial_ends_at >= now();
