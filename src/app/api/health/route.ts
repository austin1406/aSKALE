import { connection } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Health check for uptime monitoring (Better Stack).
 *
 * Returns 200 when the app is up and the database answers, 503 otherwise.
 * The tiny database read on every check also keeps a free-plan Supabase
 * project from pausing after a week without traffic.
 * It reveals no data: only a status and the check time.
 */
export async function GET() {
  // Always run at request time; a prerendered health check would prove nothing.
  await connection();

  const checkedAt = new Date().toISOString();
  const headers = { "Cache-Control": "no-store" };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return Response.json({ status: "error", database: "not configured", checkedAt }, { status: 503, headers });
  }

  const { error } = await supabase.from("leads").select("id", { count: "exact", head: true });
  if (error) {
    console.error("[health] database check failed:", error.message);
    return Response.json({ status: "error", database: "unreachable", checkedAt }, { status: 503, headers });
  }

  return Response.json({ status: "ok", database: "ok", checkedAt }, { headers });
}
