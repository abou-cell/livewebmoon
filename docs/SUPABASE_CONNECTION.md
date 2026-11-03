# LiveWebMoon Supabase connection

Project created 2026-11-03:
- Name: `livewebmoon-preprod`
- Ref: `cffvwtbjkkjkyuunmuzp`
- Region: `eu-west-3`
- Dashboard: https://supabase.com/dashboard/project/cffvwtbjkkjkyuunmuzp

The SQL in `supabase/schema.sql` has been applied. No real viewer accounts or creator role are provisioned yet.

## Deployment configuration

Set only these **public** build environment variables in Cloudflare Pages:

```text
VITE_SUPABASE_URL=https://cffvwtbjkkjkyuunmuzp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<copy the project's publishable key from Supabase>
```

Never commit a service-role or secret key. Supabase publishable keys are intended for browser use under RLS; all Stripe/Cloudflare private tokens stay on the server.

## Identity

1. Supabase dashboard → Authentication → URL Configuration: register the exact deployed production origin and redirect URLs.
2. Email/password works with Supabase Auth once deployed. Email sign-up may require a confirmation click.
3. Google OAuth button is wired in code but **Google provider credentials and allowed redirect URLs are not configured**; it cannot be used yet.
4. To provision the single owner, register a normal account, verify its identity, then set `public.creator_settings.owner_id` using a trusted privileged admin migration. No visitor can grant themselves admin access.

## Security and outstanding work

- The admin React route is gated using the authenticated user's UUID compared to the creator owner UUID, but all sensitive operations still require **backend** checks.
- Paid Cloudflare playback, private photo URLs, payment webhooks and secure chat are deliberately not enabled.
- RLS is enabled on all ten project tables.
- Do not enable real Stripe payments until webhook signature verification, subscriptions and access revocation are implemented and tested.
