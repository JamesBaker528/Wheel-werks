# Wheel Werks Inc. — website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide · deploys on Vercel.

## Quick start
```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Where things live
| What | File |
|---|---|
| Business facts (NAP, hours, links) | `src/lib/site.ts` |
| Service page copy, FAQs, process | `src/lib/services.ts` |
| Brands, reviews, gallery, before/after, home FAQs, quote options | `src/lib/content.ts` |
| Quote validation (shared client/server) | `src/lib/quote.ts` |
| Quote API (rate limit, bot checks, file sniffing, email) | `src/app/api/quote/route.ts`, `src/lib/server/*` |
| Design tokens & utilities | `src/app/globals.css` |
| Legacy URL redirects + security headers/CSP | `next.config.ts`, `src/middleware.ts` |
| SEO: metadata helper, JSON-LD, sitemap, robots | `src/lib/seo.ts`, `src/lib/schema.ts`, `src/app/sitemap.ts`, `src/app/robots.ts` |

Content research and the owner-confirmation checklist: **`docs/CONTENT-AUDIT.md`**. Image/video licensing: **`docs/ASSETS.md`**.

## Pages
`/` · `/wheel-repair` · `/wheel-refinishing-powder-coating` · `/custom-wheels` · `/tires` · `/services` (Road Force, hub-centric, storage, blasting, take-offs, TPMS/nitrogen) · `/gallery` · `/about` · `/contact` (quote form) · `/privacy` · `/terms` · `/accessibility`

All old wheelwerks.net URLs (`/Services/...`, `/Automotive-Services/...`, `/Tires/...`, `/About/...`, `/Contact-Us/...`) 308-redirect to the new pages.

## Quote form — how delivery works
The form will **not** pretend to work. It delivers email only when the email provider **and every abuse control** are configured; otherwise the form shows a "call us" notice and the API returns `503 not_configured`.

Required in Vercel → Project → Settings → Environment Variables (Production):

| Variable | Get it from |
|---|---|
| `RESEND_API_KEY`, `QUOTE_FROM_EMAIL`, `QUOTE_TO_EMAIL` | [Resend](https://resend.com) (free) — verify the `wheelwerks.net` domain first |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | [Upstash](https://upstash.com) Redis (free) — shared rate limiting |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile (free) — add the site's domain(s) |
| `QUOTE_SIGNING_SECRET` | already set |

Redeploy, submit a test request from the live site and confirm the email (with photos) arrives.

Protections: strict same-origin check (missing/`null` Origin rejected), body-size cap, per-IP rate limit (5 / 10 min, Vercel client IP, shared via Upstash, fails closed), honeypot, server-signed form token (≥ 4 s fill time, 2 h expiry), Turnstile, `zod/mini` validation on client and server, HTML-escaped email body. Photos are re-encoded in the browser **and** decoded + re-encoded server-side with sharp (removes EXIF/GPS, rejects non-images); they're attached to the email only — never stored.

## Deploy (Vercel)
1. Import the GitHub repo in Vercel (framework auto-detected).
2. Set env vars (above) and `NEXT_PUBLIC_SITE_URL`.
3. Add the domain `www.wheelwerks.net` (+ apex redirect). HTTPS is automatic.
4. Search Console: set `NEXT_PUBLIC_GSC_VERIFICATION` or verify via DNS; submit `/sitemap.xml`.
5. GA4: set `NEXT_PUBLIC_GA_ID` (the quote form fires a `generate_lead` event).
6. Update the Google Business Profile website link if it changes.

Preview deployments are automatically `noindex` (see `robots.ts`).

## Quality checks run before handoff
- `npm run build` + `tsc --noEmit`: clean
- All routes 200, legacy redirects 308, 404 page works
- No horizontal overflow at 390px and 1440px; no console/CSP errors
- Quote flow tested end-to-end (step validation, conditional fields, server validation, bad-file rejection, honeypot, rate limit)
- Lighthouse (local): desktop 99–100 in all categories; mobile Accessibility/Best Practices/SEO 96–100, Performance ~88 simulated (observed LCP ≈ 0.15 s, CLS 0)
