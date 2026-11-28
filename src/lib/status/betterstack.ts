import "server-only";

import { getJson, off, type ServiceStatus } from "./types";

type Monitor = {
  id: string;
  attributes: { url: string; pronounceable_name: string | null; status: string; last_checked_at: string | null };
};
type Sla = { data: { attributes: { availability: number } } };

const DASH = "https://uptime.betterstack.com/";

/** Uptime monitors from Better Stack, with 30-day availability. */
export async function uptimeStatus(): Promise<ServiceStatus> {
  const token = process.env.BETTERSTACK_API_TOKEN;
  if (!token) return off("Not connected: add BETTERSTACK_API_TOKEN", DASH);
  const headers = { Authorization: `Bearer ${token}` };

  const { data } = await getJson<{ data: Monitor[] }>("https://uptime.betterstack.com/api/v2/monitors", { headers });
  const from = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  const to = new Date().toISOString().slice(0, 10);

  const items = await Promise.all(
    data.data.map(async (m) => {
      let meta = m.attributes.status;
      try {
        const sla = await getJson<Sla>(
          `https://uptime.betterstack.com/api/v2/monitors/${m.id}/sla?from=${from}&to=${to}`,
          { headers },
        );
        meta = `${m.attributes.status} · ${sla.data.data.attributes.availability.toFixed(2)}% (30d)`;
      } catch {
        // Availability is a bonus; the up/down status still shows.
      }
      const up = m.attributes.status === "up";
      return {
        label: m.attributes.pronounceable_name || m.attributes.url,
        meta,
        tone: up ? ("ok" as const) : m.attributes.status === "down" ? ("down" as const) : ("warn" as const),
      };
    }),
  );

  const down = items.filter((i) => i.tone === "down").length;
  return {
    state: down ? "down" : items.some((i) => i.tone === "warn") ? "warn" : "ok",
    summary: down ? `${down} of ${items.length} monitors down` : `All ${items.length} monitors up`,
    items,
    href: DASH,
  };
}
