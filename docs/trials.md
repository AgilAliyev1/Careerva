# 7-Day Student Trial

Newly created student accounts automatically receive a 7-day trial. The `profiles` table tracks the trial window with the `trial_started_at`, `trial_ends_at`, and `trial_status` columns. Frontend pages fetch these fields to determine whether a user should still have access to the learning experience.

## Lifecycle

1. **Account creation** – The `on_auth_user_created` trigger inserts a profile row and the migration defaults the trial window.
2. **Active trial** – Students can browse the dashboard and join courses until `trial_ends_at` has passed.
3. **Conversion** – When Paddle webhooks mark a Supabase `subscriptions` row as `active`, the UI allows ongoing access even after the trial window ends.
4. **Expiry** – Once the trial window passes without an active subscription, the Student Dashboard redirects the user back to `/subscription`.

## Frontend references

- `src/pages/Auth.tsx` explains the trial during sign-up and prevents instructors from self-registering.
- `src/pages/StudentDashboard.tsx` verifies access before loading courses and displays a countdown alert.
- `src/pages/Subscription.tsx` shows the remaining trial time (or the expiry message) and blocks checkout for unverified emails.

These checks ensure the MVP experience matches the business requirement: free onboarding for the first week and a mandatory paid plan afterward.
