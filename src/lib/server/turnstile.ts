import "server-only";

/** Optional Cloudflare Turnstile check — enabled only when TURNSTILE_SECRET_KEY is set. */
export async function verifyTurnstile(token: string | null, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Unconfigured: allowed only outside production. In production delivery is also refused
  // (missingDeliveryConfig), so nothing is sent without human verification.
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const j = (await res.json()) as { success: boolean };
    return j.success === true;
  } catch {
    return false;
  }
}
