# CLAUDE.md

Guidance for Claude when working in this repo. Keep it short; update it whenever Claude gets something wrong twice.

@AGENTS.md

## Business context
- This is the website for **Askale**, an agency that builds websites and AI automations for local businesses in Richardson and Irving, TX. Run by Austin, a CS student; prices are low on purpose to build a portfolio.
- This repo is also the first build of the **starter template** every client site will be created from. Keep anything reusable generic and driven by `src/site.config.ts`.
- All business info (name, prices, contact, booking link, service area) lives in `src/site.config.ts`. Read it first; never hardcode it elsewhere.
- Favor simple, fast, maintainable pages. Local SEO matters: real business details, LocalBusiness schema, fast mobile load.

## Brand (Askale's own site)
- Direction: **local and warm** (chosen by Austin 2026-11-15). Paper/coffee/terracotta palette, Fraunces serif headlines, Instrument Sans body, Caveat for handwritten notes, Geist Mono only for small data labels.
- Concept: the name reads "Ask · Scale". Use the ruler strip and the "Ask … then scale" idea sparingly; never the old cold/techy look.
- Client sites reuse the components but get their own tokens in `globals.css` and fonts in `layout.tsx`.

## Stack
- Next.js 16 (App Router, `cacheComponents` on) + TypeScript (strict) + Tailwind CSS v4 + shadcn/ui
- Next 16 renamed `middleware.ts` to `proxy.ts`. Check `node_modules/next/dist/docs/` before using an API you remember from older versions.
- Supabase (Postgres, Auth, RLS), Resend for email, Cal.com for booking, Upstash for rate limiting and cache, Inngest for background jobs, Sentry for errors, Better Stack for uptime
- Stripe for Askale's own client billing, run from the Stripe dashboard (invoices + care-plan payment links, ACH preferred); no checkout code in the site. See `docs/setup-stripe-payments.md`
- Hosted on Vercel; domain + DNS on Porkbun

## Commands
- `npm run dev`: local dev server
- `npm run build`: production build (must pass before a PR)
- `npm run lint`: lint
- `npm run typecheck`: generate route types, then type check (CI runs lint, typecheck, build and a gitleaks secret scan on every PR)

## Project layout
- `src/app/`: routes (server components by default; add `"use client"` only when needed)
- `src/components/ui/`: shadcn components (ours to edit)
- `src/components/`: site components
- `src/lib/`: helpers (`supabase/admin.ts` is server-only, `rate-limit.ts`, `turnstile.ts`, `contact-schema.ts`)
- `src/inngest/`: background job client and functions, served at `/api/inngest`
- `src/emails/`: email templates
- `supabase/migrations/`: all schema changes, as SQL migrations
- `docs/`: setup guides (start with `docs/setup-contact-form.md`; billing in `docs/setup-stripe-payments.md`)
- `src/site.config.ts`: all brand and business content
- `src/app/globals.css`: brand color tokens (change colors there, not in components)

## Required on every build
No site launches without all eleven: rate limiting (Upstash), RLS on every table, caching, async jobs (Inngest), k6 load test, authentication for admin areas, secrets in env only (gitleaks in CI), Sentry, Better Stack uptime, Zod validation + Turnstile on public forms, backups with a tested restore.

## Rules
- Never commit secrets. Env vars live in `.env.local` and Vercel; list every key (no values) in `.env.example`. Only `NEXT_PUBLIC_` values reach the browser.
- Every table gets RLS enabled with explicit policies in the same migration. Schema changes only via migrations.
- Validate every form and API input on the server with Zod.
- Slow work (emails, AI calls, reports) runs in background jobs, never inside a request.
- Use shadcn components before writing custom UI. Mobile-first: check every page at 375px.
- Keep PRs small and focused; describe what changed for the user, then how.

## Ask before
- Deleting data or running destructive migrations
- Changing auth, payment, or email-sending settings
- Adding paid services or new dependencies with large footprints
