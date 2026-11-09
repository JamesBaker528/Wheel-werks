import { NextResponse } from "next/server";
import { issueToken } from "@/lib/server/token";
import { isDeliveryConfigured } from "@/lib/server/deliver";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Issues the signed, timestamped token the quote form must return when submitting. */
export function GET() {
  // `enabled` lets the form tell visitors up front when online quotes aren't switched on yet.
  return NextResponse.json({ token: issueToken(), enabled: isDeliveryConfigured() }, { headers: { "Cache-Control": "no-store" } });
}
