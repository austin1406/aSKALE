import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ServiceStatus } from "./types";

/** Is the database answering? Same check /api/health runs for Better Stack. */
export async function checkDatabase(): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;
  const { error } = await supabase.from("leads").select("id", { count: "exact", head: true });
  return !error;
}

export async function siteStatus(): Promise<ServiceStatus> {
  const started = Date.now();
  const dbOk = await checkDatabase();
  const ms = Date.now() - started;
  const ref = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/^https:\/\/([^.]+)\./)?.[1];

  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);
  const msg = process.env.VERCEL_GIT_COMMIT_MESSAGE?.split("\n")[0];
  return {
    state: dbOk ? "ok" : "down",
    summary: dbOk ? `Site and database up (database answered in ${ms} ms)` : "Database not reachable",
    items: sha ? [{ label: `Live code: ${sha}`, meta: msg }] : undefined,
    href: ref ? `https://supabase.com/dashboard/project/${ref}` : "https://supabase.com/dashboard",
  };
}
