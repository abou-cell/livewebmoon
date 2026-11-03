-- LiveWebMoon preproduction schema: one creator per installation.
-- Apply only to a dedicated Supabase project after reviewing the target project.
-- No Stripe secret, Stream key or signed playback token belongs in these tables.
create extension if not exists pgcrypto;

create table if not exists public.creator_settings (
 id boolean primary key default true check (id = true),
 owner_id uuid not null references auth.users(id) on delete restrict,
 display_name text not null default 'My Studio',
 introduction text not null default '',
 theme text not null default 'rose' check (theme in ('rose','lavender','pearl','noir')),
 logo_path text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.viewer_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '',
 created_at timestamptz not null default now()
);

create table if not exists public.membership_plans (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 description text not null default '',
 price_cents integer not null check (price_cents >= 0),
 currency text not null default 'eur' check (char_length(currency) = 3),
 stripe_price_id text unique,
 active boolean not null default false,
 created_at timestamptz not null default now()
);

create table if not exists public.member_subscriptions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 plan_id uuid references public.membership_plans(id),
 stripe_subscription_id text unique,
 status text not null check (status in ('trialing','active','past_due','canceled','unpaid','incomplete','incomplete_expired','paused')),
 current_period_end timestamptz,
 created_at timestamptz not null default now()
);
create index if not exists member_subscriptions_user_idx on public.member_subscriptions(user_id);

create table if not exists public.media_items (
 id uuid primary key default gen_random_uuid(),
 kind text not null check (kind in ('photo','video')),
 title text not null,
 description text not null default '',
 storage_path text,
 cloudflare_uid text,
 access_policy text not null default 'private' check (access_policy in ('free','subscriber','one_time','private')),
 price_credits integer not null default 0 check (price_credits >= 0),
 published boolean not null default false,
 created_at timestamptz not null default now(),
 check ((kind = 'photo' and storage_path is not null) or (kind = 'video' and cloudflare_uid is not null))
);

create table if not exists public.member_entitlements (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 media_id uuid not null references public.media_items(id) on delete cascade,
 expires_at timestamptz,
 created_at timestamptz not null default now(),
 unique(user_id,media_id)
);
create index if not exists member_entitlements_user_idx on public.member_entitlements(user_id);

create table if not exists public.live_events (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 starts_at timestamptz,
 status text not null default 'scheduled' check (status in ('scheduled','live','ended')),
 access_policy text not null default 'free' check (access_policy in ('free','subscriber','ticket','per_minute','private')),
 ticket_credits integer not null default 0 check (ticket_credits >= 0),
 cloudflare_live_input_id text,
 created_at timestamptz not null default now()
);

create table if not exists public.live_chat_messages (
 id bigint generated always as identity primary key,
 live_id uuid not null references public.live_events(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 body text not null check (char_length(body) between 1 and 1000),
 hidden boolean not null default false,
 created_at timestamptz not null default now()
);
create index if not exists live_chat_messages_feed_idx on public.live_chat_messages(live_id,created_at desc);

create table if not exists public.payment_events (
 stripe_event_id text primary key,
 event_type text not null,
 processed_at timestamptz not null default now()
);

create table if not exists public.credit_ledger (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 delta integer not null check (delta <> 0),
 reason text not null,
 idempotency_key text not null unique,
 created_at timestamptz not null default now()
);
create index if not exists credit_ledger_user_idx on public.credit_ledger(user_id,created_at desc);

-- No creator is implicitly assigned on sign-up. Provision creator_settings.owner_id
-- using a privileged, audited administrative operation after validating identity.
alter table public.creator_settings enable row level security;
alter table public.viewer_profiles enable row level security;
alter table public.membership_plans enable row level security;
alter table public.member_subscriptions enable row level security;
alter table public.media_items enable row level security;
alter table public.member_entitlements enable row level security;
alter table public.live_events enable row level security;
alter table public.live_chat_messages enable row level security;
alter table public.payment_events enable row level security;
alter table public.credit_ledger enable row level security;

create policy "Visitors see creator branding" on public.creator_settings
 for select to anon, authenticated using (true);
create policy "Creator changes branding" on public.creator_settings
 for update to authenticated using (owner_id = (select auth.uid()))
 with check (owner_id = (select auth.uid()));

create policy "Viewer reads own profile" on public.viewer_profiles
 for select to authenticated using (user_id = (select auth.uid()));
create policy "Viewer creates own profile" on public.viewer_profiles
 for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Viewer edits own profile" on public.viewer_profiles
 for update to authenticated using (user_id = (select auth.uid()))
 with check (user_id = (select auth.uid()));

create policy "Published plans are visible" on public.membership_plans
 for select to anon, authenticated using (active = true);
create policy "Members see own subscriptions" on public.member_subscriptions
 for select to authenticated using (user_id = (select auth.uid()));
create policy "Members see own entitlements" on public.member_entitlements
 for select to authenticated using (user_id = (select auth.uid()));

-- Media identifiers and storage paths are intentionally not readable by browsers.
-- A backend service checks entitlements and issues short-lived signed access tokens.
create policy "Creator sees media" on public.media_items
 for select to authenticated
 using (exists (select 1 from public.creator_settings where owner_id = (select auth.uid())));
create policy "Creator manages media" on public.media_items
 for all to authenticated
 using (exists (select 1 from public.creator_settings where owner_id = (select auth.uid())))
 with check (exists (select 1 from public.creator_settings where owner_id = (select auth.uid())));

create policy "Creator sees live configuration" on public.live_events
 for select to authenticated
 using (exists (select 1 from public.creator_settings where owner_id = (select auth.uid())));
create policy "Creator manages live configuration" on public.live_events
 for all to authenticated
 using (exists (select 1 from public.creator_settings where owner_id = (select auth.uid())))
 with check (exists (select 1 from public.creator_settings where owner_id = (select auth.uid())));

-- Chats, purchases, subscriptions and balances are server-managed at this stage.
-- No browser INSERT/UPDATE policy is granted for payment_events, credit_ledger or chat.
create policy "Member reads own credit ledger" on public.credit_ledger
 for select to authenticated using (user_id = (select auth.uid()));

-- Defensive explicit privileges: RLS does not replace grants.
revoke all on public.payment_events from anon, authenticated;
revoke all on public.live_chat_messages from anon, authenticated;
revoke all on public.media_items from anon;
revoke all on public.live_events from anon;
grant select on public.creator_settings, public.membership_plans to anon, authenticated;
grant select, insert, update on public.viewer_profiles to authenticated;
grant select on public.member_subscriptions, public.member_entitlements, public.credit_ledger to authenticated;
grant select, insert, update, delete on public.media_items, public.live_events to authenticated;
