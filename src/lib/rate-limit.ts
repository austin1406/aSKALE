import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { hasEnv } from "@/lib/env";

/**
 * 5 contact submissions per IP per 10 minutes (sliding window).
 * Without Upstash keys (local dev) limiting is skipped.
 */
const limiter = hasEnv("UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN")
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "rl:contact",
      analytics: false,
    })
  : null;

export async function checkContactRateLimit(ip: string) {
  if (!limiter) return { ok: true as const, skipped: true };
  const { success } = await limiter.limit(ip);
  return { ok: success, skipped: false };
}
