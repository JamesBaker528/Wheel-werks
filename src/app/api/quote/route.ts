import { NextResponse, type NextRequest } from "next/server";
import { quoteSchema } from "@/lib/quote";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";
import { readPhotos } from "@/lib/server/files";
import { deliverQuote, isDeliveryConfigured, missingDeliveryConfig } from "@/lib/server/deliver";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { verifyToken } from "@/lib/server/token";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 4_400_000;

const json = (body: object, status = 200, headers?: Record<string, string>) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

/** Same-origin only. Browsers always send Origin on POST; a missing, "null" or malformed Origin is rejected. */
function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!origin || origin === "null" || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  // 1. Same-origin only (CSRF / cross-site posting).
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);

  // 2. Size guard before parsing (Vercel also enforces 4.5 MB at the edge).
  const len = Number(req.headers.get("content-length") || 0);
  if (!len) return json({ error: "length_required" }, 411);
  if (len > MAX_BODY) return json({ error: "too_large", message: "Your photos are too large. Please attach fewer or smaller photos." }, 413);

  // 3. Rate limit per client IP (Vercel-provided, not spoofable there).
  const ip = clientIp(req);
  const rl = await rateLimit(`quote:${ip}`);
  if (!rl.ok) return json({ error: "rate_limited", message: "Too many requests. Please wait a few minutes or call us." }, 429, { "Retry-After": String(rl.retryAfter) });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: "bad_request", message: "We couldn't read that submission." }, 400);
  }

  // 4. Bot checks: honeypot, server-signed form token (minimum fill time + expiry), Turnstile.
  const honeypot = form.get("company_website");
  if (typeof honeypot === "string" && honeypot.length > 0) return json({ ok: true, delivered: true }); // silently drop
  const token = verifyToken(form.get("form_token"));
  if (token === "too_fast") return json({ ok: true, delivered: true }); // silently drop scripted submits
  if (token !== "ok") return json({ error: "expired", message: "This form expired. Please refresh the page and try again." }, 400);
  // Not switched on yet → say so clearly (before Turnstile, which is also unconfigured until launch).
  const devLog = process.env.NODE_ENV !== "production" && process.env.QUOTE_DEV_LOG === "1";
  if (!isDeliveryConfigured() && !devLog) {
    return json({ error: "not_configured", message: `Online quote requests aren't switched on yet. Please call us at ${site.phone}.` }, 503);
  }
  if (!(await verifyTurnstile(form.get("cf-turnstile-response") as string | null, ip))) {
    return json({ error: "verification_failed", message: "Verification failed. Please try again." }, 400);
  }

  // 5. Authoritative validation.
  let raw: unknown;
  try {
    raw = JSON.parse(String(form.get("data") || "{}"));
  } catch {
    return json({ error: "bad_request", message: "Invalid submission." }, 400);
  }
  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    return json({ error: "invalid", message: "Please check the highlighted fields.", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) }, 422);
  }

  // 6. Photos: decoded and re-encoded server-side (strips all metadata).
  const photos = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  const { files, error } = await readPhotos(photos);
  if (error) return json({ error: "invalid_files", message: error }, 422);

  // 7. Delivery — never report success unless the provider accepted the email,
  //    and never deliver unless every abuse control is configured.
  if (!isDeliveryConfigured()) {
    console.info("[quote:dev] not delivered — missing:", missingDeliveryConfig().join(", "), { services: parsed.data.services, photos: files.length });
    return json({ ok: true, delivered: false, dev: true });
  }
  try {
    await deliverQuote(parsed.data, files, { ip, ua: req.headers.get("user-agent") || "" });
  } catch (e) {
    console.error("[quote] delivery failed", e instanceof Error ? e.message : e);
    return json({ error: "delivery_failed", message: `We couldn't send your request. Please call us at ${site.phone}.` }, 502);
  }
  return json({ ok: true, delivered: true });
}

export function GET() {
  return json({ error: "method_not_allowed" }, 405, { Allow: "POST" });
}
