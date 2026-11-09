import { NextResponse, type NextRequest } from "next/server";
import { quoteSchema } from "@/lib/quote";
import { rateLimit } from "@/lib/server/rateLimit";
import { readPhotos } from "@/lib/server/files";
import { deliverQuote, isDeliveryConfigured } from "@/lib/server/deliver";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body: object, status = 200, headers?: Record<string, string>) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(req: NextRequest) {
  // 1. Same-origin only (blocks cross-site form posts).
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ error: "forbidden" }, 403);

  // 2. Size guard before parsing.
  const len = Number(req.headers.get("content-length") || 0);
  if (len > 4_400_000) return json({ error: "too_large", message: "Your photos are too large. Please attach fewer or smaller photos." }, 413);

  // 3. Rate limit per IP.
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  const rl = await rateLimit(`quote:${ip}`);
  if (!rl.ok) return json({ error: "rate_limited", message: "Too many requests. Please wait a few minutes or call us." }, 429, { "Retry-After": String(rl.retryAfter) });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: "bad_request", message: "We couldn't read that submission." }, 400);
  }

  // 4. Bot checks: honeypot + minimum fill time + optional Turnstile.
  const honeypot = form.get("company_website");
  const started = Number(form.get("started_at") || 0);
  if ((typeof honeypot === "string" && honeypot.length > 0) || !started || Date.now() - started < 4000) {
    return json({ ok: true, delivered: true }); // silently accept, never deliver
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

  const photos = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  const { files, error } = await readPhotos(photos);
  if (error) return json({ error: "invalid_files", message: error }, 422);

  // 6. Delivery — never report success unless an email was actually accepted by the provider.
  if (!isDeliveryConfigured()) {
    if (process.env.NODE_ENV !== "production" && process.env.QUOTE_DEV_LOG === "1") {
      console.info("[quote:dev] not delivered — email not configured", { ...parsed.data, photos: files.length });
      return json({ ok: true, delivered: false, dev: true });
    }
    return json({ error: "not_configured", message: `Online quote requests aren't switched on yet. Please call us at ${site.phone}.` }, 503);
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
