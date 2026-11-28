# Admin "System status" panel

The top of `/admin` shows one card per service, each with a dot (OK / Check / Problem / Not connected),
a one-line summary, the latest few items, and a link to that service's dashboard.

| Card | Source | Needs |
|---|---|---|
| Site & database | Supabase read (same as `/api/health`) + the live commit | nothing extra |
| Uptime | Better Stack monitors + 30-day availability | `BETTERSTACK_API_TOKEN` |
| Errors | Unresolved Sentry issues (14 days) | `SENTRY_READ_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` |
| Deploys | Last 5 production deploys; warns if a deploy failed or the live site isn't on the newest build | `VERCEL_API_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID` |
| Background jobs | Inngest runs for `contact/submitted` in the last 7 days, failed count | nothing extra (uses `INNGEST_SIGNING_KEY`) |
| Emails | Last 10 Resend emails and their delivery status | a full-access Resend key (see below) |

Results are cached for about a minute. A card without its keys shows "Not connected" and the rest still work.
A background job that fails after all retries is also sent to Sentry, so it shows on the Errors card and emails you.

## Setup

Add each value in **Vercel → Settings → Environment Variables**, **Production** only, type **Secret**
(IDs and slugs can be Config). Redeploy once at the end.

1. **Better Stack**: Settings → **API tokens** → copy the **Uptime** team token → `BETTERSTACK_API_TOKEN`.
2. **Sentry**: avatar (bottom left) → **User Settings → Personal Tokens** → **Create New Token**, scopes
   `project:read`, `event:read`, `org:read` → `SENTRY_READ_TOKEN`. Also set `SENTRY_ORG` (the part before
   `.sentry.io`, e.g. `askale`) and `SENTRY_PROJECT` (e.g. `javascript-nextjs`).
3. **Vercel**: **Account Settings → Tokens** → create one scoped to the site's team, with an expiry
   (e.g. 1 year) → `VERCEL_API_TOKEN`. Vercel tokens can't be read-only, so treat it like a password.
   Project → Settings → General → **Project ID** → `VERCEL_PROJECT_ID`. Team → Settings → General →
   **Team ID** → `VERCEL_TEAM_ID`.
4. **Resend**: if the Emails card says it needs a full-access key, create one under **API Keys**
   (Permission: Full access) → `RESEND_ADMIN_API_KEY`. The sending key stays as it is.
5. **Inngest**: nothing to do.

When a token expires, its card switches to "Problem" with the error, so you'll notice.
