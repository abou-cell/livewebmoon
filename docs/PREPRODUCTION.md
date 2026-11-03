# LiveWebMoon — Préproduction gratuite (phase 1)

This is a **foundation**, not an assertion that an online production system is live.

## Verified connected services (2026-11-03)

- Stripe connector: test-mode access to the **Atlas Shop** account. No live charges or payment setup.
- Cloudflare connector: read access to Stream videos and live-input listing. No stream inputs created.
- Supabase connector: one existing project `sb1-sykbtqqh` is **INACTIVE**; organization `abou-cell's Org` is on the free plan.
- Supabase quoted project cost: **$0/month** at the time of inspection. Project creation awaits the explicit target-organization choice.

## Stage 1 — configure dedicated Supabase

1. Select a Supabase organization and create a fresh dedicated `livewebmoon-preprod` project in Europe; do **not** overwrite the unrelated inactive project.
2. Run and review `supabase/schema.sql`; check SQL errors, table grants, RLS and the Supabase security advisors.
3. Manually assign the sole creator's `auth.users.id` to `creator_settings.owner_id` through a privileged operation. Signing up does **not** give admin rights.
4. Enable email and Google authentication only after configuring callback URLs and domains in the selected project.
5. Create private storage policies for photos, upload validation and signed URLs before uploading private media.

## Stage 2 — backend integrations

- Stripe: use **test mode** account only. Create Checkout Sessions in a private Edge Function/backend; verify Stripe webhook signatures and event-id deduplication in `payment_events`, then update `member_subscriptions` and `credit_ledger`. Never trust frontend price, time watched or payment status.
- Cloudflare: token stays in server secrets. Private media and paid live require backend entitlement validation before a **short-lived signed playback token** is returned. The existing live player demos do not enforce rights.
- Live chat: server side participation checks, rate limiting, moderation, and anti-spam must be implemented before enabling public inserts.
- No API keys, Stripe `sk_test`, Cloudflare Stream tokens or Supabase service-role keys are to be committed.

## Stage 3 — deploy and acceptance criteria

- Host the React app on Cloudflare Pages free tier with distinct / and /admin URLs.
- Check unauthenticated viewers cannot read creator/admin resources or media source identifiers.
- Check user A cannot view user B's subscription, balance or rights.
- Simulate subscriptions, cancellation, payment failure, refunds, one-time purchases, tips and per-minute debits in Stripe test mode.
- Test a free live and a paid live with two separate viewer accounts.
- Verify Cloudflare viewing minutes and billing before inviting real viewers.

## Current demo-only URLs

- Visitors: https://abou-cell.github.io/livewebmoon/preview/index.html
- Creator admin visual: https://abou-cell.github.io/livewebmoon/preview/admin.html
- Player/chat visual: https://abou-cell.github.io/livewebmoon/preview/watch.html

The preview admin URL is publicly accessible **for design review only**, and the preview chat is browser-local. No real subscriber data should be used there.

## Self-hosting / AWS compatibility

The SQL uses PostgreSQL with Supabase auth references. The eventual AWS package will need an identity adapter (e.g. Cognito) and migration of the auth FK references to application-owned identity IDs; database portability is a future deliverable, not an achieved feature.
