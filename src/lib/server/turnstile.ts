import "server-only";

/** Optional Cloudflare Turnstile check — enabled only when TURNSTILE_SECRET_KEY is set. */
export async function verifyTurnstile(token: string | null, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      cache: "no-store",
    });
    const j = (await res.json()) as { success: boolean };
    return j.success === true;
  } catch {
    return false;
  }
}
