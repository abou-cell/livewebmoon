# LiveWebMoon — single-creator white-label platform

## Product direction (2026-11-03)

Each installation belongs to **one creator/model**. Visitors are never allowed into the admin area. The owner configures branding, content, pricing, provider credentials and custom domain.

## Public features

- Elegant responsive storefront with four themes: Rose Couture, Lavender, Pearl & Champagne, Elegant Noir.
- Creator branding: logo, display name, hero introduction and visual theme.
- Public photo galleries, premium photos/videos, free or paid live events.
- Viewer accounts: email authentication; Google and Facebook via supported OpenID Connect/OAuth providers. Instagram login must be validated against currently available Meta authentication flows before promising it.
- Access models: free, one-time unlock, paid membership, per-minute credit consumption, ticketed private live, free live with optional tips.
- Live player with participant chat; creator-to-subscriber messaging restricted to the policy configured by the owner.
- Moderation/reporting, age and content safeguards where applicable.

## Administration

- Private admin role assigned server-side, never merely via frontend routes.
- Manage photos/videos, media visibility, live schedule, playlists, subscriptions, customer support, viewer access, tips and analytics.
- Integrations wizard: Cloudflare Stream, Stripe, AWS S3/PostgreSQL; optional Firebase adapter.
- **Secrets never in localStorage, client bundles or public Firestore.** Store encrypted server-side (e.g. AWS Secrets Manager), display masked connection status in UI.
- Branding is persisted to tenant-owned database and served as public configuration, not bundled into code.

## Data model

- users: identity provider subject, profile, status
- plans: price, billing cadence, included rights
- subscriptions: Stripe IDs, status, periods
- payments: provider event IDs, immutable ledger entries
- credit_ledger: signed credit deltas, idempotency keys
- media: owner, storage/cloudflare ID, type, policy, price
- entitlements: user, content, grants, expiry
- live_events: Cloudflare input, status, access policy, price
- live_viewing_sessions: user, live, heartbeats, billed intervals
- chat_messages: user, live, timestamp, moderation status
- brand_settings: name, logo object key, theme, introduction, domain
- audit_logs: admin actions, webhook processing, security events

## Critical security contracts

1. Authorize media access **server-side**. Generate short-lived signed Cloudflare viewing tokens or S3/CloudFront signed URLs only after entitlement check.
2. Stripe webhook signatures must be verified and each event processed idempotently.
3. Never trust client-side watch timers for credit billing. Use transactional ledgers, server-monitored sessions, and enforce balance before granting/renewing playback.
4. Live chat requires authenticated sessions, per-user rate limits, moderation tools, and permission checks.
5. Uploads use scoped temporary credentials/presigned URLs and file validation; media defaults to private.
6. Social sign-in only through supported official providers, not scraping or collecting social passwords.
7. Reconcile subscription state against Stripe; handle failed payment, cancellation, renewal and refunds.
8. For creator content and payment acceptance, verify provider rules and applicable age/content regulations before commercial launch.

## AWS deployment target

- Web frontend: static hosting / CDN.
- Backend API: ECS Fargate (or equivalent) with HTTPS.
- Database: managed PostgreSQL (RDS), encrypted, backups.
- Photos: private S3 + CloudFront signed URLs.
- Video/live: Cloudflare Stream as default adapter; optional future AWS IVS adapter.
- Authentication: Cognito by default; optional Firebase or another standards-based identity provider.
- Payments: creator-owned Stripe account, configured server-side.
- Infrastructure as code and an installation wizard are required for true repeatable installation.

## Preview scope

The /preview pages in gh-pages are **design-only**. Browser-local branding is for preview convenience and is not authenticated or synchronized. Chat messages are local demonstration only. Do not put provider API keys into the preview.
