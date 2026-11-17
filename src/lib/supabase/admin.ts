import "server-only";
import { createClient } from "@supabase/supabase-js";

import { hasEnv } from "@/lib/env";

/**
 * Server-only Supabase client using the service role key.
 * It bypasses RLS, so it must never be imported into client code
 * ("server-only" makes the build fail if that happens).
 */
export function getSupabaseAdmin() {
  if (!hasEnv("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY")) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
