# Admin login and leads dashboard

`/admin` shows every lead from the contact form and lets you move each one through the pipeline
(New → Contacted → Call booked → Proposal sent → Won / Lost / Parked). Only Supabase users marked
as admins can get in.

## How it is protected

- **Proxy** (`src/proxy.ts`): every request to `/admin` checks the Supabase session. Anyone who is
  not a signed-in admin is sent to `/admin/login`.
- **Page and actions** (`requireAdmin()` in `src/lib/admin-auth.ts`): check again right next to the
  data, so nothing admin-only runs on the proxy check alone.
- **Database** (RLS on `leads`): the dashboard reads and updates as the signed-in user with the
  public anon key, so the policies only let through users whose `app_metadata.role` is `admin`.
  Users can't change `app_metadata` themselves.
- **Login**: Zod validation, 5 attempts per IP per 10 minutes (Upstash), and the same error for a
  wrong password and an unknown email.
- **No sign-ups**: public sign-up is turned off in Supabase; admin accounts are created by hand.
- `/admin` is `noindex` and disallowed in `robots.txt`.

## One-time setup (per site)

1. **Public Supabase key in Vercel.** Supabase → Project Settings → API Keys → copy the
   **publishable** key (`sb_publishable_…`, or the legacy `anon` key). In Vercel → Settings →
   Environment Variables, add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with that value, **Production** only.
   It is safe in the browser; RLS protects the data.
2. **Turn off sign-ups.** Supabase → Authentication → Sign In / Providers → turn off
   **Allow new users to sign up**. Keep the Email provider on.
3. **Create your account.** Supabase → Authentication → Users → Add user → Create new user. Use your
   email and a long password from a password manager, and tick **Auto Confirm User**.
4. **Make it an admin.** Supabase → SQL Editor, run (with your email):
   ```sql
   update auth.users
   set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
   where email = 'you@example.com';
   ```
5. **Deploy** (merge the PR, or redeploy after step 1), then sign in at `https://<domain>/admin/login`.

## For client sites

Same steps with the client's Supabase project. Give the client their own admin user only if they
should see leads; you stay an admin for support.
