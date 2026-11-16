import "server-only";

import { hasEnv } from "@/lib/env";

/**
 * Verifies a Cloudflare Turnstile token on the server.
 * Without TURNSTILE_SECRET_KEY (local dev) the check is skipped.
 */
export async function verifyTurnstile(token: string | null, ip: string) {
  if (!hasEnv("TURNSTILE_SECRET_KEY")) return { ok: true, skipped: true };
  if (!token) return { ok: false, skipped: false };

  const body = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY!,
    response: token,
    remoteip: ip,
  });
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = (await res.json()) as { success: boolean };
  return { ok: data.success, skipped: false };
}
