# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences:
- **Prospective clients:** owners/operators of small local businesses in Richardson, Irving, and the wider Dallas–Fort Worth area, evaluating whether to hire Askale for a website and/or automations. General local-business audience (no specific vertical/niche targeted) — skews non-technical, time-poor, mobile-heavy browsing, price-sensitive, and wary of long contracts or hourly billing.
- **Future developers (Austin or others) building client sites:** this repo is also the first build of Askale's reusable starter template; every client site will be created from it, so patterns here need to stay generic and config-driven.

## Product Purpose

Askale is a one-person agency (run by Austin, a CS student) that builds fast, mobile-first websites and simple AI/automation add-ons (booking, missed-call text-back, review requests, lead follow-up, AI chat for FAQs) for local businesses. Prices are deliberately low and fixed (no hourly billing) to build a portfolio of real local work in exchange for testimonials and reviews. Success for the marketing site = booking the free 30-minute audit call; success for a client engagement = a live site/automation the client is happy enough with to leave a testimonial and Google review.

## Positioning

Fixed, low, flat pricing (setup + small monthly fee) with no long contracts, done by a single person who personally walks each client through a 4-step process (Ask → Plan → Build → Scale: free audit call, one-page proposal, build with a preview link and two review rounds, then launch + ongoing care). The trade is explicit and stated on the site: low price in exchange for a testimonial/review. This combination of transparent fixed pricing, no-contract flexibility (30 days' notice to cancel), and a named, low-friction process is the differentiator versus typical web agencies or freelancers.

## Operating Context

- Marketing site today has dedicated routes: home (`/`, condensed teasers linking out), `/services`, `/pricing`, `/process`, `/about`, `/faq`, `/contact` (with Cal.com booking calendar embedded), and `/privacy`.
- Client acquisition funnel: visitor → books free 30-minute audit call via Cal.com (`askale/free-30-minute-audit`) → fixed-price one-page proposal → 1–2 week build with a clickable preview link and two rounds of revisions → launch with a walkthrough video → ongoing monthly hosting/monitoring/small-changes retainer.
- Client-facing automations referenced in pricing (booking with reminders, missed-call text-back, review requests, AI FAQ chat, monthly lead/booking/review report) are sold as add-ons in the "Website + automations" tier; some are not yet built in this repo and are near-term scope, not aspirational marketing claims.
- This codebase doubles as the agency's starter template — any pattern built here is expected to be reused, nearly as-is, for future client sites, with brand/content swapped via config and tokens.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router, `cacheComponents` on), TypeScript strict, Tailwind v4, shadcn/ui, Supabase (Postgres/Auth/RLS), Resend (email), Cal.com (booking), Upstash (rate limiting/cache), Inngest (background jobs), Sentry (errors), Better Stack (uptime). Hosted on Vercel; domain/DNS on Porkbun.
- All business facts (name, prices, contact, booking link, service area) are centralized in `src/site.config.ts` — pages must read from it, never hardcode.
- Required on every build per project rules: rate limiting, RLS on every table, caching, async jobs for slow work, k6 load test, admin auth, secrets only in env, Sentry, Better Stack uptime, Zod validation + Turnstile on public forms, backups with tested restore.
- No real client case studies, logos, or testimonials exist yet (see Evidence on Hand) — this constrains what the marketing site can truthfully claim.
- Service area is explicitly Richardson, Irving, and Dallas–Fort Worth, TX — local SEO (real business details, LocalBusiness schema, fast mobile load) matters more than broad-reach SEO.

## Brand Commitments

- Name "Askale" is intentionally read as "Ask · Scale" (tagline: "Ask. Then scale."); motto "Ask. Then scale." Owner is Austin, contact `hello@askale.app`.
- Pricing, service area, and process framing (4-step Ask/Plan/Build/Scale) are factual commitments already live on the site, not placeholder copy — treat them as content to preserve, not invent or alter without the user.
- (Visual identity — palette, type, "Ask…then scale" motif usage — is governed separately in DESIGN.md/CLAUDE.md, not here.)

## Evidence on Hand

- No real clients, testimonials, case studies, or press yet — Askale is pre-launch/portfolio-building. Future work must not fabricate client logos, quotes, review counts, or "trusted by" style claims.
- The FAQ content on the home page (`src/app/page.tsx`) already states the no-clients-yet trade honestly ("I'm a computer science student building a portfolio of real local work") — this candor is itself a confirmed brand/evidence fact, not something to soften.

## Product Principles

1. Honesty over inflation: never fabricate social proof; the "new agency, fair trade for a testimonial" framing is a feature, not a weakness to hide.
2. Low friction, fixed cost: every client-facing claim should reinforce flat pricing, no long contracts, and a clearly bounded process — ambiguity about cost or commitment is the main objection to remove.
3. Built for owners, not technologists: copy and UI must work for a non-technical, time-poor small-business owner on a phone, not for a technical evaluator.
4. Template discipline: anything built for Askale's own site should generalize cleanly to an arbitrary client site via `site.config.ts` and token-level theming, not one-off hacks.
5. Local-first SEO and speed: fast mobile load and real local-business schema/content outrank broad content-marketing tactics.

## Accessibility & Inclusion

No formal standard (e.g. WCAG certification) has been mandated, but the explicit requirement is that the site works well "for anyone" — i.e. general, inclusive accessibility for a broad, all-ages, mixed-ability local-business and consumer audience, not a narrow or niche-specific need. Follow standard accessibility best practice (contrast, keyboard/focus, semantic markup, legible type, large mobile tap targets) as a baseline for everyone, not as a checkbox for a specific population.
