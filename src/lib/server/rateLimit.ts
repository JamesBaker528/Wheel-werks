import "server-only";

/**
 * Rate limiting. Uses Upstash Redis (REST, no SDK) when UPSTASH_REDIS_REST_URL/TOKEN are set —
 * recommended on Vercel, where instances don't share memory. Falls back to a per-instance
 * in-memory window, which still blunts bursts from a single client.
 */
const mem = new Map<string, { n: number; reset: number }>();

export async function rateLimit(key: string, limit = 5, windowSec = 600): Promise<{ ok: boolean; retryAfter: number }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([["INCR", `rl:${key}`], ["EXPIRE", `rl:${key}`, windowSec, "NX"], ["TTL", `rl:${key}`]]),
        cache: "no-store",
      });
      const out = (await res.json()) as { result: number }[];
      const n = out[0]?.result ?? 0;
      return { ok: n <= limit, retryAfter: Math.max(1, out[2]?.result ?? windowSec) };
    } catch {
      /* fall through to memory */
    }
  }
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
