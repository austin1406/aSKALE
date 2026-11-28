import "server-only";
import { cacheLife } from "next/cache";

import { uptimeStatus } from "./betterstack";
import { jobsStatus } from "./inngest";
import { emailStatus } from "./resend";
import { errorsStatus } from "./sentry";
import { siteStatus } from "./site";
import type { ServiceStatus } from "./types";
import { deploysStatus } from "./vercel";

export type { ServiceStatus } from "./types";

async function safe(check: () => Promise<ServiceStatus>): Promise<ServiceStatus> {
  try {
    return await check();
  } catch (e) {
    return { state: "down", summary: `Couldn't check: ${e instanceof Error ? e.message : "unknown error"}` };
  }
}

/*
 * Each check is cached for about a minute, so opening /admin stays fast and
 * doesn't hit every service's API on each visit. These read only server env vars, never cookies.
 */
const minute = { stale: 30, revalidate: 60, expire: 300 };

export async function getSiteStatus() {
  "use cache";
  cacheLife(minute);
  return safe(siteStatus);
}
export async function getUptimeStatus() {
  "use cache";
  cacheLife(minute);
  return safe(uptimeStatus);
}
export async function getErrorsStatus() {
  "use cache";
  cacheLife(minute);
  return safe(errorsStatus);
}
export async function getDeploysStatus() {
  "use cache";
  cacheLife(minute);
  return safe(deploysStatus);
}
export async function getJobsStatus() {
  "use cache";
  cacheLife(minute);
  return safe(jobsStatus);
}
export async function getEmailStatus() {
  "use cache";
  cacheLife(minute);
  return safe(emailStatus);
}
