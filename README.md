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
The form will **not** pretend to work. Until email is configured the API returns `503 not_configured` and the visitor is told to call.

1. Create a free [Resend](https://resend.com) account and verify the `wheelwerks.net` domain (DNS records).
2. In Vercel → Project → Settings → Environment Variables set `RESEND_API_KEY`, `QUOTE_FROM_EMAIL`, `QUOTE_TO_EMAIL`.
3. Recommended: add Upstash Redis (`UPSTASH_REDIS_REST_URL/TOKEN`) for shared rate limiting and Cloudflare Turnstile keys.
4. Submit a test request from the live site and confirm the email (with photos) arrives.

Protections: same-origin check, 4.4 MB body cap, per-IP rate limit (5 / 10 min), honeypot + minimum fill time, optional Turnstile, Zod validation server-side, magic-byte image checks, server-generated attachment names, HTML-escaped email body. Photos are resized in the browser (strips EXIF/GPS) and are attached to the email only — never stored on the server.

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
