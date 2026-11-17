-- Leads from the website contact form (and later: walk-ins, referrals, lead scoring).
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  phone text check (char_length(phone) <= 30),
  business text check (char_length(business) <= 120),
  message text not null check (char_length(message) <= 2000),
  source text not null default 'website_contact_form',
  stage text not null default 'new'
    check (stage in ('new', 'contacted', 'call_booked', 'proposal_sent', 'won', 'lost', 'parked'))
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_stage_idx on public.leads (stage);

-- Row level security: on, deny by default.
-- The website writes with the service role key on the server, which bypasses RLS.
-- No policies for anon, so the public API key can neither read nor write leads.
alter table public.leads enable row level security;

-- Signed-in admins (Austin) can read and update leads from a future dashboard.
create policy "Admins can read leads"
  on public.leads for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update leads"
  on public.leads for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

revoke all on public.leads from anon;
