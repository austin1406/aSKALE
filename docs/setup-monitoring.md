# CI and monitoring

## CI (already on)
Every pull request runs `.github/workflows/ci.yml`:
- **Lint, type check, build.** A red check means don't merge yet.
- **Secret scan (gitleaks).** Fails if any commit in the PR contains something that looks like an API key or password. If it fires: rotate (replace) that key in the service's dashboard, then remove it from the code.

Dependabot (`.github/dependabot.yml`) opens weekly update PRs; CI checks each one, then you merge.

Recommended: GitHub → Settings → Branches → add a rule for `main` that requires the two CI checks to pass before merging.

## Sentry (error alerts)
1. Create a free account at sentry.io, then a **Next.js** project named after the site (one project per client site, all in one Sentry org).
2. Copy the **DSN** into `NEXT_PUBLIC_SENTRY_DSN` (Vercel env vars, all environments). Sentry stays off until this is set.
3. For readable stack traces, create an auth token (Settings → Auth Tokens) and set `SENTRY_AUTH_TOKEN`, `SENTRY_ORG` and `SENTRY_PROJECT` in Vercel.
4. Sentry emails you on new errors by default. Each error is tagged with the site name.

## Better Stack (uptime), at launch
Add a monitor for the live URL (every 3 minutes, email alert). One Better Stack account covers every client site.
