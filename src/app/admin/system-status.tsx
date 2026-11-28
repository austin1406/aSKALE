import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  getDeploysStatus,
  getEmailStatus,
  getErrorsStatus,
  getJobsStatus,
  getSiteStatus,
  getUptimeStatus,
  type ServiceStatus,
} from "@/lib/status";

const checks = [
  { name: "Site & database", load: getSiteStatus },
  { name: "Uptime", load: getUptimeStatus },
  { name: "Errors", load: getErrorsStatus },
  { name: "Deploys", load: getDeploysStatus },
  { name: "Background jobs", load: getJobsStatus },
  { name: "Emails", load: getEmailStatus },
] as const;

const dot: Record<ServiceStatus["state"] | "ok" | "warn" | "down", string> = {
  ok: "bg-success",
  warn: "bg-warning",
  down: "bg-destructive",
  off: "bg-muted-foreground/40",
};
const label: Record<ServiceStatus["state"], string> = { ok: "OK", warn: "Check", down: "Problem", off: "Not connected" };

/** Admin "System status": one card per service, each loading on its own so a slow API never blocks the rest. */
export function SystemStatus() {
  return (
    <section aria-labelledby="status-heading">
      <h2 id="status-heading" className="font-display text-2xl font-medium">
        System status
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {checks.map((c) => (
          <Suspense key={c.name} fallback={<Card name={c.name} />}>
            <StatusCard name={c.name} load={c.load} />
          </Suspense>
        ))}
      </div>
    </section>
  );
}

async function StatusCard({ name, load }: { name: string; load: () => Promise<ServiceStatus> }) {
  return <Card name={name} status={await load()} />;
}

function Card({ name, status }: { name: string; status?: ServiceStatus }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium">{name}</h3>
        {status ? (
          <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span aria-hidden className={cn("size-2 rounded-full", dot[status.state])} />
            {label[status.state]}
          </span>
        ) : (
          <span className="font-mono text-xs text-muted-foreground">Checking…</span>
        )}
      </div>
      {status && (
        <>
          <p className="mt-2 text-sm">{status.summary}</p>
          {status.items && status.items.length > 0 && (
            <ul className="mt-3 space-y-2 border-t border-border pt-3 text-sm">
              {status.items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  {item.tone && <span aria-hidden className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", dot[item.tone])} />}
                  <span className="min-w-0">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="break-words underline underline-offset-4">
                        {item.label}
                      </a>
                    ) : (
                      <span className="break-words">{item.label}</span>
                    )}
                    {item.meta && <span className="block font-mono text-xs text-muted-foreground">{item.meta}</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {status.href && (
            <a
              href={status.href}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-accent underline-offset-4 hover:underline"
            >
              Open dashboard <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </>
      )}
    </div>
  );
}
