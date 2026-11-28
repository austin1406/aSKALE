/** One row on the admin "System status" panel. */
export type ServiceStatus = {
  /** ok = all good, warn = needs a look, down = broken, off = not connected yet (token missing). */
  state: "ok" | "warn" | "down" | "off";
  summary: string;
  items?: { label: string; meta?: string; href?: string; tone?: "ok" | "warn" | "down" }[];
  /** Where to click through for the full picture. */
  href?: string;
};

export const off = (summary: string, href?: string): ServiceStatus => ({ state: "off", summary, href });

/** fetch with a 5s timeout and JSON parsing; throws on non-2xx so callers can show "down". */
export async function getJson<T>(url: string, init: RequestInit = {}): Promise<{ data: T; res: Response }> {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(5000), cache: "no-store" });
  if (!res.ok) throw new Error(`${new URL(url).host} answered ${res.status}`);
  return { data: (await res.json()) as T, res };
}

export function ago(iso: string | number | null | undefined) {
  if (!iso) return "";
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 48) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}
