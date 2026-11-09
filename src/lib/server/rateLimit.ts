import "server-only";
import type { NextRequest } from "next/server";

/**
 * Client IP as seen by Vercel's edge. Vercel overwrites these headers, so clients can't spoof them;
 * outside Vercel we fall back to the first X-Forwarded-For hop.
 */
export function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  );
}

/** A limiter shared across serverless instances is required before the form may deliver email. */
export const hasSharedLimiter = () => Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

const mem = new Map<string, { n: number; reset: number }>();

function memoryLimit(key: string, limit: number, windowSec: number) {
  const now = Date.now();
  const e = mem.get(key);
  if (!e || e.reset < now) {
    mem.set(key, { n: 1, reset: now + windowSec * 1000 });
    if (mem.size > 5000) for (const [k, v] of mem) if (v.reset < now) mem.delete(k);
    return { ok: true, retryAfter: 0 };
  }
  e.n++;
  return { ok: e.n <= limit, retryAfter: Math.ceil((e.reset - now) / 1000) };
}

/**
 * Upstash Redis (REST, no SDK) when configured; otherwise a per-instance memory window, which only
 * blunts bursts that land on the same instance. Delivery is refused without the shared limiter
 * (see isDeliveryConfigured), so the memory fallback never protects a live mailbox on its own.
 * Fails CLOSED if Upstash is configured but unreachable.
 */
export async function rateLimit(key: string, limit = 5, windowSec = 600): Promise<{ ok: boolean; retryAfter: number }> {
  const local = memoryLimit(key, limit, windowSec);
  if (!hasSharedLimiter()) return local;
  try {
    const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", `rl:${key}`], ["EXPIRE", `rl:${key}`, windowSec, "NX"], ["TTL", `rl:${key}`]]),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`upstash ${res.status}`);
    const out = (await res.json()) as { result: number }[];
    const n = out[0]?.result ?? Infinity;
    return { ok: n <= limit && local.ok, retryAfter: Math.max(1, out[2]?.result ?? windowSec) };
  } catch (e) {
    console.error("[rateLimit] shared limiter unavailable — failing closed", e instanceof Error ? e.message : e);
    return { ok: false, retryAfter: 60 };
  }
}
