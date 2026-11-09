import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Server-issued form token (replaces the client-supplied `started_at`).
 * Format: base64url(issuedAtMs.nonce).hmac — the timestamp can't be forged without QUOTE_SIGNING_SECRET.
 */
const MIN_AGE_MS = 4_000; // humans don't finish the form in under 4 s
const MAX_AGE_MS = 2 * 60 * 60 * 1000; // tokens expire after 2 h
const devSecret = randomBytes(32).toString("hex"); // dev/test only; regenerated each process

function secret(): string | null {
  const s = process.env.QUOTE_SIGNING_SECRET;
  if (s && s.length >= 32) return s;
  return process.env.NODE_ENV === "production" ? null : devSecret;
}

export const hasSigningSecret = () => secret() !== null;

const sign = (payload: string, key: string) => createHmac("sha256", key).update(payload).digest("base64url");

export function issueToken(now = Date.now()): string | null {
  const key = secret();
  if (!key) return null;
  const payload = Buffer.from(`${now}.${randomBytes(9).toString("base64url")}`).toString("base64url");
  return `${payload}.${sign(payload, key)}`;
}

export function verifyToken(token: unknown, now = Date.now()): "ok" | "invalid" | "too_fast" | "expired" {
  const key = secret();
  if (!key || typeof token !== "string" || token.length > 200) return "invalid";
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return "invalid";
  const expected = Buffer.from(sign(payload, key));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid";
  const issued = Number(Buffer.from(payload, "base64url").toString().split(".")[0]);
  if (!Number.isFinite(issued)) return "invalid";
  const age = now - issued;
  if (age < MIN_AGE_MS) return "too_fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}
