# Demo Accounts and Credit Configuration

Use these notes to seed Supabase with the accounts referenced in the product demo and to keep plan quotas in sync with the new `course_enrollments` and `user_ratings` tables.

## 1. Students

| Email | Plan | Notes |
| --- | --- | --- |
| `aqilliyev207@gmail.com` | Unlimited (`unlimited`) | Primary student in the demo. Seed with verified email and mark the subscription as active so the forum unlocks. |
| `aliyevagil21@gmail.com` | Starter (`starter`) | 3 credits per month. Use this account to test the confirmation dialog when joining a course. |
| `demo@careerva.test` | Growth (`growth`) | Optional sandbox student with 5 credits per month. |

Create or update the profile, subscription, and credit usage with the following SQL (replace `uuid_generate_v4()` values with the actual Supabase auth IDs):

```sql
insert into profiles (id, email, full_name, role, trial_started_at, trial_ends_at, trial_status)
values
  ('{uuid_aqilliyev}', 'aqilliyev207@gmail.com', 'Demo Learner', 'student', now(), now() + interval '7 days', 'expired')
  on conflict (id) do update set email = excluded.email;

insert into subscriptions (user_id, tier, price, status, start_date)
values
  ('{uuid_aqilliyev}', 'unlimited', 100, 'active', now())
  on conflict (user_id) do update set tier = excluded.tier, status = excluded.status;

insert into profiles (id, email, full_name, role, trial_started_at, trial_ends_at, trial_status)
values
  ('{uuid_aliyevagil}', 'aliyevagil21@gmail.com', 'Starter Learner', 'student', now(), now() + interval '7 days', 'expired')
  on conflict (id) do update set email = excluded.email;

insert into subscriptions (user_id, tier, price, status, start_date)
values
  ('{uuid_aliyevagil}', 'starter', 30, 'active', now())
  on conflict (user_id) do update set tier = excluded.tier, status = excluded.status;
```

Track monthly usage by inserting into `course_enrollments` when a learner unlocks a course:

```sql
insert into course_enrollments (user_id, course_id, tier)
values ('{uuid_aliyevagil}', '{course_uuid}', 'starter');
```

## 2. Instructor

The MVP instructor account is `ulvibayramov1@gmail.com` with password `12345678`. After creating the Supabase auth user:

```sql
insert into profiles (id, email, full_name, role)
values ('{uuid_ulvi}', 'ulvibayramov1@gmail.com', 'Ulvi Bayramov', 'instructor')
  on conflict (id) do update set role = excluded.role;
```

Seed Ulvi’s Azure AI Ops course so the instructor dashboard shows live data:

```sql
insert into courses (id, title, description, category, instructor_id, scheduled_date, duration_minutes, meeting_link)
values (
  '{demo_azure_uuid}',
  'Azure AI Ops in Production',
  'Deploy and monitor AI workloads on Azure with confidence and control.',
  'Programming',
  '{uuid_ulvi}',
  '2024-08-25T10:00:00Z',
  90,
  'https://meet.google.com/ai-ops-azr'
)
  on conflict (id) do nothing;
```

To display instructor ratings, add rows to `user_ratings` with `target_role = 'instructor'` and `target_user_id = '{uuid_ulvi}'`.

## 3. Resetting credits each month

At the start of a new billing cycle run a scheduled job to archive or delete last month’s `course_enrollments` rows for Starter and Growth users:

```sql
delete from course_enrollments
where user_id = '{uuid_aliyevagil}'
  and consumed_at < date_trunc('month', timezone('utc', now()));
```

This keeps the credit counter aligned with Paddle’s billing cycles and ensures the confirmation dialog reflects the current usage.
