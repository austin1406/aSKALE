import "server-only";
import { redirect } from "next/navigation";

import { getSupabaseServer } from "@/lib/supabase/server";

/** Admins are Supabase users whose app_metadata.role is "admin" (set by hand in Supabase, never by the user). */
export function isAdminClaims(subject: { app_metadata?: object } | null | undefined) {
  return (subject?.app_metadata as { role?: unknown } | undefined)?.role === "admin";
}

/**
 * Call at the top of every admin page and admin server action.
 * The proxy already redirects signed-out visitors, but this check sits next to the data,
 * so an admin action can never run without a verified admin session.
 */
export async function requireAdmin() {
  const supabase = await getSupabaseServer();
  if (!supabase) redirect("/admin/login");
  const { data } = await supabase.auth.getClaims();
  if (!isAdminClaims(data?.claims)) redirect("/admin/login");
  return { supabase, email: (data!.claims.email as string | undefined) ?? "" };
}
