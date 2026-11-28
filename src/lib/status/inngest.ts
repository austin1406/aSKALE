import "server-only";

import { ago, getJson, off, type ServiceStatus } from "./types";

type Event = { internal_id: string; name: string; received_at: string };
type Run = { run_id: string; status: "Running" | "Completed" | "Failed" | "Cancelled"; run_started_at: string };

const DASH = "https://app.inngest.com";

/** Background jobs from the last 7 days: how many ran and how many failed after all retries. */
export async function jobsStatus(): Promise<ServiceStatus> {
  const key = process.env.INNGEST_SIGNING_KEY;
  if (!key) return off("Not connected: INNGEST_SIGNING_KEY missing", DASH);
  const headers = { Authorization: `Bearer ${key}` };

  const since = new Date(Date.now() - 7 * 864e5).toISOString();
  const { data } = await getJson<{ data: Event[] }>(
    `https://api.inngest.com/v1/events?name=contact/submitted&received_after=${encodeURIComponent(since)}&limit=20`,
    { headers },
  );

  const runs = (
    await Promise.all(
      data.data.map((e) =>
        getJson<{ data: Run[] }>(`https://api.inngest.com/v1/events/${e.internal_id}/runs`, { headers })
          .then((r) => r.data.data)
          .catch(() => [] as Run[]),
      ),
    )
  ).flat();

  const failed = runs.filter((r) => r.status === "Failed");
  const last = data.data[0];
  return {
    state: failed.length ? "down" : "ok",
    summary: failed.length
      ? `${failed.length} failed job${failed.length === 1 ? "" : "s"} in the last 7 days`
      : `${runs.length} job${runs.length === 1 ? "" : "s"} ran in the last 7 days, none failed`,
    items: last ? [{ label: "Last contact-form job", meta: ago(last.received_at) }] : undefined,
    href: DASH,
  };
}
