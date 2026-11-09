# Content audit — wheelwerks.net (researched Nov 2026)

Source of truth for everything on the new site. All business facts live in `src/lib/site.ts`, service copy in `src/lib/services.ts`, brands/reviews/gallery in `src/lib/content.ts`.

## Verified from the existing site

| Item | Value | Source |
|---|---|---|
| Legal name | Wheel Werks Inc. | site header/footer |
| Founded | 1986, by Mike Pruess | /About |
| Address | 123 East 3900 South, Salt Lake City, UT 84107 ("just east of the Astro Burger on State Street"); one location | /About, footer |
| Phone / Fax | (801) 268-4132 / (801) 268-4345 | footer |
| Email | wheelwerksmatt@gmail.com | footer (Cloudflare-obfuscated) |
| Hours | Mon–Fri 8–6, Sat 9–3, Sun closed | /About, footer; matches Yelp |
| Social | Facebook /WheelWerksUT, Instagram @wheelwerksslc, Yelp wheel-werks-salt-lake-city-3, Google Maps place link | footer |
| Areas named | Salt Lake City, Midvale, North Salt Lake; "Salt Lake County, Utah County, Davis County, Provo, Bountiful or Ogden" | home, service pages |
| Amenity | Free Wi-Fi while you wait | home |

### Services (all listed on the current site)
Wheel repair (straightening to within 5/1000"), welding cracked/broken wheels, curb rash / gouges / machining / leaking bead seats, wheel refinishing (wet paint, chrome plating, polishing, machining, touch-ups), in-house powder coating & painting ("thousands of colors", own paint shop for color match), blasting & chemical stripping, custom wheels & fitment, quality used OEM / factory take-off wheels & tires with exchange, tire sales & installation, tire repair, rotation, computerized balancing, Professional Road Force balancing, hub-centric rings, TPMS service, nitrogen inflation, seasonal tire & wheel storage, eBay store link.

### Brands named on the site
- Tires (home copy): Toyo, Bridgestone, Pirelli, Michelin, Nexen. Tire brand pages: BFGoodrich, Bridgestone, Continental, Firestone, Kumho, Michelin, Toyo, Uniroyal. Firestone dealer locator also lists the shop.
- Wheels: 27 brands on /Wheels plus TSW and American Racing in the footer.

## Inconsistencies on the old site
- "For over 25 years" (home) vs "For over 30 years" (header) — both outdated. New site uses **Since 1986** and computes years automatically.
- Old /About/Reviews page shows "no reviews". Yelp lists the shop (search snippet: 4.3★ / 19 reviews — **not shown on the new site** until verified).
- Old site categorized as "Auto Repair & Mechanic Shop" with generic brake/heating blog posts that don't match the business — dropped.
- A separate "Wheel Werks" listing at 2033 S Main St appears in directories with the same phone — likely an old address. Owner should confirm and clean up listings (NAP consistency matters for local SEO).

## Weaknesses of the current site (addressed)
- Template (Net Driven/DNN) design, low-res 400px imagery, unresolved placeholders visible in markup (`[GEOPHONE]`, "Twitter Not Configured")
- Services split across two inconsistent URL trees (/Services and /Automotive-Services)
- No real quote flow (generic contact form), no photo upload
- Weak mobile experience, no sticky call action
- Generic "auto repair" positioning hides the shop's real differentiator: in-house wheel repair + refinishing
- No structured data for the actual business type; titles not targeted at wheel searches

## NEEDS OWNER CONFIRMATION before launch
1. Hours, email address (consider a @wheelwerks.net address), and whether the fax number should stay public.
2. Current tire & wheel brands carried, and permission to use brand logos (site currently uses text wordmarks only).
3. Chrome plating — still offered in-house or outsourced?
4. Whether quotes are free (site says "Request a Quote", not "Free Quote").
5. Turnaround times and any warranty/guarantee (none stated on the site — none are claimed).
6. Reviews: which reviews may be quoted; Google review link/Place ID. Only one public quote is used (Yellow Pages, anonymous).
7. Before/after photos — the slider shows a clearly labeled demo until real pairs are added.
8. Shop video footage for the hero (currently licensed stock, not shop footage).
9. Vector logo — the original 356px PNG is used in the header/footer; a vector or larger file would sharpen it on big screens.
10. ~~Brand color~~ Done: the site now uses the storefront teal (`#14cfcf`, token `--color-signal` in `globals.css`) and the original logo. Red is reserved for error messages.
11. Jobs page (old /Contact-Us/Jobs currently redirects to /contact) and the eBay store link.
12. Privacy policy, terms, data retention — legal review required.
