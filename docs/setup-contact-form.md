# Setting up the contact form

The form works locally with no keys: it validates input and shows the thank-you message, and it logs which services are not configured yet. Add each service below to turn on that part. Put every key in `.env.local` for local dev, and in **Vercel → Project → Settings → Environment Variables** for the live site. Never commit keys.

## 1. Supabase (stores leads)
1. Create a project at supabase.com (region: US East or US Central).
2. Settings → API: copy the **Project URL** into `NEXT_PUBLIC_SUPABASE_URL` and the **service_role** key into `SUPABASE_SERVICE_ROLE_KEY` (server only; never `NEXT_PUBLIC_`).
3. Create the `leads` table by running the migration:
   ```bash
   npx supabase login
   npx supabase link --project-ref <your-project-ref>
   npx supabase db push
   ```
   This applies `supabase/migrations/*_create_leads.sql`. Row level security is on: the public key can't read or write leads; only the server can.

## 2. Resend (emails)
1. Create an account at resend.com and an API key → `RESEND_API_KEY`.
2. Until your domain is verified, use `CONTACT_FROM_EMAIL="Askale <onboarding@resend.dev>"`. Note that this test sender can only deliver to your own Resend account email. After you buy the domain, verify it in Resend (see `setup/custom-domain-porkbun.md`) and switch to `hello@yourdomain.com`.
3. `CONTACT_TO_EMAIL` = the inbox where you want new leads.

## 3. Upstash (rate limiting)
Create a free Redis database at upstash.com → copy the **REST URL** and **REST token** into `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`. Limit: 5 messages per visitor per 10 minutes.

## 4. Cloudflare Turnstile (bot protection)
Cloudflare dashboard → Turnstile → Add site (add `localhost` and your domain) → site key into `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, secret into `TURNSTILE_SECRET_KEY`. The widget appears on the form once the site key is set.

## 5. Inngest (background jobs)
- **Local:** run `npx inngest-cli@latest dev` in a second terminal and set `INNGEST_DEV=1`. Open http://localhost:8288 to watch jobs run.
- **Live:** install the Inngest integration from the Vercel marketplace; it sets `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` for you.
- Without Inngest, emails are sent right after the response using Next's `after()`, so the form still works.

## 6. Cal.com (booking)
Create an event type (e.g. "Free 30-minute audit") and set `calLink` in `src/site.config.ts` to `your-username/your-event`. The calendar then appears under the form on `/contact`.

## How a submission flows
1. Zod validates every field on the server (the honeypot field catches simple bots).
2. Upstash rate-limits by IP.
3. Turnstile confirms a human.
4. The lead is saved to Supabase.
5. An Inngest job emails you the lead and sends the visitor a confirmation, with automatic retries.
