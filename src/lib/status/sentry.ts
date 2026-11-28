import "server-only";

import { ago, getJson, off, type ServiceStatus } from "./types";

type Issue = { id: string; title: string; culprit: string; count: string; lastSeen: string; permalink: string };

/** Unresolved Sentry issues from the last 14 days. */
export async function errorsStatus(): Promise<ServiceStatus> {
  const token = process.env.SENTRY_READ_TOKEN;
  const org = process.env.SENTRY_ORG;
  const project = process.env.SENTRY_PROJECT;
  const dash = org ? `https://${org}.sentry.io/issues/` : "https://sentry.io";
  if (!token || !org || !project) return off("Not connected: add SENTRY_READ_TOKEN, SENTRY_ORG, SENTRY_PROJECT", dash);

  const { data, res } = await getJson<Issue[]>(
    `https://sentry.io/api/0/projects/${org}/${project}/issues/?query=is:unresolved&statsPeriod=14d&limit=5`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const total = Number(res.headers.get("x-hits") ?? data.length);

  return {
    state: total === 0 ? "ok" : "warn",
    summary: total === 0 ? "No unresolved errors" : `${total} unresolved error${total === 1 ? "" : "s"}`,
    items: data.map((i) => ({
      label: i.title,
      meta: `${i.count}× · last ${ago(i.lastSeen)}${i.culprit ? ` · ${i.culprit}` : ""}`,
      href: i.permalink,
      tone: "warn" as const,
    })),
    href: dash,
  };
}
