import { NextResponse, type NextRequest } from "next/server";

/** Case-only legacy redirects (/Tires → /tires) that next.config redirects can't express without looping. */
const CASE_ONLY = new Set(["/Tires", "/Services", "/About"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (CASE_ONLY.has(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/Tires", "/Services", "/About"] };
