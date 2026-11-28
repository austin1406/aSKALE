import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { hasEnv } from "@/lib/env";

/**
 * Supabase client that acts as the signed-in user (session in cookies).
 * It uses the public anon key, so Row Level Security decides what it can read and change.
 * Returns null when the keys are missing (local dev without Supabase, preview links).
 */
export async function getSupabaseServer() {
  if (!hasEnv("NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY")) return null;
  const cookieStore = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) cookieStore.set(name, value, options);
        } catch {
          // Called from a Server Component, where cookies are read-only. The proxy refreshes the session instead.
        }
      },
    },
  });
}
