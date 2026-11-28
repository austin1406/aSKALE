"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { isAdminClaims, requireAdmin } from "@/lib/admin-auth";
import { LEAD_STAGES } from "@/lib/leads";
import { checkLoginRateLimit } from "@/lib/rate-limit";
import { getSupabaseServer } from "@/lib/supabase/server";

export type LoginState = { error?: string; email?: string };

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  password: z.string().min(1, "Enter your password.").max(200),
});

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const parsed = loginSchema.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check your details.", email };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const rl = await checkLoginRateLimit(ip);
  if (!rl.ok) return { error: "Too many attempts. Try again in 10 minutes.", email };

  const supabase = await getSupabaseServer();
  if (!supabase) return { error: "Sign-in isn't set up on this deployment.", email };

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  // Same message for a wrong password and a missing account, so it doesn't reveal which emails exist.
  if (error || !data.user) return { error: "Wrong email or password.", email };

  if (!isAdminClaims(data.user)) {
    await supabase.auth.signOut();
    return { error: "This account doesn't have admin access.", email };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await getSupabaseServer();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

const stageSchema = z.object({
  id: z.string().uuid(),
  stage: z.enum(LEAD_STAGES),
});

export async function updateLeadStage(formData: FormData) {
  const { supabase } = await requireAdmin();
  const parsed = stageSchema.safeParse({ id: formData.get("id"), stage: formData.get("stage") });
  if (!parsed.success) return;

  // Runs as the signed-in admin, so the "Admins can update leads" RLS policy applies.
  const { error } = await supabase.from("leads").update({ stage: parsed.data.stage }).eq("id", parsed.data.id);
  if (error) console.error("[admin] stage update failed", error.message);
  revalidatePath("/admin");
}
