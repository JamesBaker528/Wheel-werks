import "server-only";
import type { QuoteData } from "@/lib/quote";
import { quoteServices } from "@/lib/content";
import type { CleanFile } from "./files";
import { hasSharedLimiter } from "./rateLimit";
import { hasSigningSecret } from "./token";

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Email delivery is enabled only when the email provider AND every abuse control is configured:
 * shared rate limiting (Upstash), bot verification (Turnstile) and the form-token signing secret.
 * Anything missing → the API answers 503 and the visitor is asked to call.
 */
export function missingDeliveryConfig(): string[] {
  const need: [string, boolean][] = [
    ["RESEND_API_KEY", !!process.env.RESEND_API_KEY],
    ["QUOTE_FROM_EMAIL", !!process.env.QUOTE_FROM_EMAIL],
    ["QUOTE_TO_EMAIL", !!process.env.QUOTE_TO_EMAIL],
    ["UPSTASH_REDIS_REST_URL / _TOKEN", hasSharedLimiter()],
    ["TURNSTILE_SECRET_KEY + NEXT_PUBLIC_TURNSTILE_SITE_KEY", !!process.env.TURNSTILE_SECRET_KEY && !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY],
    ["QUOTE_SIGNING_SECRET", hasSigningSecret()],
  ];
  return need.filter(([, ok]) => !ok).map(([k]) => k);
}
export const isDeliveryConfigured = () => missingDeliveryConfig().length === 0;

function rows(d: QuoteData): [string, string][] {
  const label = (id: string) => quoteServices.find((s) => s.id === id)?.label ?? id;
  const r: [string, unknown][] = [
    ["Services", d.services.map(label).join(", ")],
    ["Vehicle", `${d.year} ${d.make} ${d.model}`],
    ["Wheel diameter", d.wheelDiameter],
    ["Wheels needing service", d.wheelCount],
    ["Damage type", d.damageTypes?.join(", ")],
    ["When it happened", d.damageWhen],
    ["Losing air", d.losingAir],
    ["Vibration", d.vibrates],
    ["Vibration speed", d.vibrationSpeed],
    ["Desired finish", d.finishType],
    ["Desired color", d.color],
    ["Current condition", d.condition],
    ["Tire size", d.tireSize],
    ["Preferred tire brand", d.preferredBrand],
    ["Tire category", d.tireCategory],
    ["Number of tires", d.tireCount],
    ["Installation", d.installation],
    ["Wheel style / notes", d.wheelStyle],
    ["Name", d.name],
    ["Phone", d.phone],
    ["Email", d.email],
    ["Preferred contact", d.contactMethod],
    ["Notes", d.notes],
  ];
  return r.filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => [k, String(v)]);
}

/** Sends the lead via Resend's REST API (no SDK). Photos are attached in-memory and never written to disk. */
export async function deliverQuote(d: QuoteData, files: CleanFile[], meta: { ip: string; ua: string }) {
  const r = rows(d);
  const html = `<h2 style="font-family:sans-serif">New quote request — Wheel Werks website</h2>
<table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
${r.map(([k, v]) => `<tr><td style="color:#666;vertical-align:top;white-space:nowrap"><b>${esc(k)}</b></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`).join("\n")}
</table>
<p style="font-family:sans-serif;font-size:12px;color:#888">${files.length} photo(s) attached · Submitted ${esc(new Date().toISOString())} · IP ${esc(meta.ip)}</p>`;
  const text = r.map(([k, v]) => `${k}: ${v}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL,
      to: process.env.QUOTE_TO_EMAIL!.split(",").map((s) => s.trim()),
      reply_to: d.email,
      subject: `Quote request: ${d.year} ${d.make} ${d.model} — ${d.name}`.replace(/[\r\n]/g, " ").slice(0, 160),
      html,
      text,
      attachments: files.map((f) => ({ filename: f.filename, content: f.content.toString("base64") })),
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
}
