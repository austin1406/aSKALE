import "server-only";

import { ago, getJson, off, type ServiceStatus } from "./types";

type Deployment = {
  uid: string;
  state: "READY" | "ERROR" | "BUILDING" | "QUEUED" | "INITIALIZING" | "CANCELED";
  created: number;
  inspectorUrl: string | null;
  meta?: { githubCommitSha?: string; githubCommitMessage?: string; githubCommitRef?: string };
};

/**
 * Recent production deploys, and whether the live code is the newest build.
 * Catches a failed deploy or an older build accidentally promoted to production.
 */
export async function deploysStatus(): Promise<ServiceStatus> {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  if (!token || !projectId) return off("Not connected: add VERCEL_API_TOKEN, VERCEL_PROJECT_ID", "https://vercel.com/dashboard");

  const qs = new URLSearchParams({ projectId, target: "production", limit: "5" });
  if (teamId) qs.set("teamId", teamId);
  const { data } = await getJson<{ deployments: Deployment[] }>(`https://api.vercel.com/v6/deployments?${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const deploys = data.deployments;
  const newestReady = deploys.find((d) => d.state === "READY");
  const liveSha = process.env.VERCEL_GIT_COMMIT_SHA;
  const latest = deploys[0];

  let state: ServiceStatus["state"] = "ok";
  let summary = latest ? `Last deploy ${ago(latest.created)}` : "No production deploys yet";
  if (latest?.state === "ERROR") {
    state = "down";
    summary = "Latest deploy failed";
  } else if (liveSha && newestReady?.meta?.githubCommitSha && newestReady.meta.githubCommitSha !== liveSha) {
    state = "warn";
    summary = "Live site isn't running the newest build";
  }

  return {
    state,
    summary,
    items: deploys.map((d) => ({
      label: d.meta?.githubCommitMessage?.split("\n")[0] || d.uid,
      meta: `${d.state.toLowerCase()} · ${ago(d.created)}${d.meta?.githubCommitSha ? ` · ${d.meta.githubCommitSha.slice(0, 7)}` : ""}${
        liveSha && d.meta?.githubCommitSha === liveSha ? " · live" : ""
      }`,
      href: d.inspectorUrl ?? undefined,
      tone: d.state === "ERROR" ? ("down" as const) : d.state === "READY" ? ("ok" as const) : ("warn" as const),
    })),
    href: newestReady?.inspectorUrl ?? "https://vercel.com/dashboard",
  };
}
