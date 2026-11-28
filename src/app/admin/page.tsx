import { Suspense } from "react";

import { signOut } from "@/app/admin/actions";
import { StageSelect } from "@/app/admin/stage-select";
import { SystemStatus } from "@/app/admin/system-status";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-auth";
import { LEAD_STAGES, STAGE_LABELS, type Lead } from "@/lib/leads";

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading leads…</p>}>
      <Dashboard />
    </Suspense>
  );
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Chicago",
});

async function Dashboard() {
  const { supabase, email } = await requireAdmin();
  // Reads as the signed-in admin: the "Admins can read leads" RLS policy decides what comes back.
  const { data, error } = await supabase
    .from("leads")
    .select("id, created_at, name, email, phone, business, message, source, stage")
    .order("created_at", { ascending: false })
    .limit(200);
  const leads = (data ?? []) as Lead[];
  const counts = Object.fromEntries(LEAD_STAGES.map((s) => [s, leads.filter((l) => l.stage === s).length]));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium">Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as {email}</p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="ghost" size="sm">
            Sign out
          </Button>
        </form>
      </div>

      <div className="mt-10">
        <SystemStatus />
      </div>

      <h2 className="font-display mt-12 text-2xl font-medium">Pipeline</h2>
      <ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
        {LEAD_STAGES.map((s) => (
          <li key={s} className="rounded-full border border-border bg-card px-3 py-1">
            {STAGE_LABELS[s]}: {counts[s]}
          </li>
        ))}
      </ul>

      {error && (
        <p role="alert" className="mt-6 rounded-lg bg-accent-soft px-3 py-2 text-sm text-destructive">
          Couldn&apos;t load leads: {error.message}
        </p>
      )}

      {!error && leads.length === 0 && <p className="mt-10 text-muted-foreground">No leads yet.</p>}

      <ul className="mt-8 space-y-4">
        {leads.map((lead) => (
          <li key={lead.id} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium">
                  {lead.name}
                  {lead.business && <span className="text-muted-foreground"> · {lead.business}</span>}
                </p>
                <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <a className="text-accent underline underline-offset-4" href={`mailto:${lead.email}`}>
                    {lead.email}
                  </a>
                  {lead.phone && (
                    <a className="text-accent underline underline-offset-4" href={`tel:${lead.phone}`}>
                      {lead.phone}
                    </a>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <time className="font-mono text-xs text-muted-foreground" dateTime={lead.created_at}>
                  {dateFmt.format(new Date(lead.created_at))}
                </time>
                <StageSelect id={lead.id} stage={lead.stage} />
              </div>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{lead.message}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
