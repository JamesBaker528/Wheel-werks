import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ShoppingBag, ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { FacebookIcon, InstagramIcon, YelpIcon } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="teal-glow relative bg-carbon pb-28 pt-20 md:pb-12">
      <div aria-hidden className="teal-rule absolute inset-x-0 top-0" />
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Wordmark size="lg" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute">
            Wheel and tire specialists serving the Salt Lake Valley since {site.foundedYear}. Repair, refinishing, custom wheels and tires — all in-house.
          </p>
          <div className="mt-6 flex gap-2">
            {[
              { href: site.links.facebook, label: "Wheel Werks on Facebook", Icon: FacebookIcon },
              { href: site.links.instagram, label: "Wheel Werks on Instagram", Icon: InstagramIcon },
              { href: site.links.yelp, label: "Wheel Werks on Yelp", Icon: YelpIcon },
              { href: site.links.ebay, label: "Wheel Werks on eBay", Icon: ShoppingBag },
            ].map(({ href, label, Icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full border border-white/10 text-silver transition-colors hover:border-signal hover:text-white">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer services">
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-mute font-sans">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-silver transition-colors hover:text-white">{n.label}</Link></li>
            ))}
            <li><Link href="/contact" className="text-silver transition-colors hover:text-white">Contact & Quote</Link></li>
            <li><a href={site.links.ebay} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-silver transition-colors hover:text-white">Our eBay Store <ArrowUpRight className="size-3.5" aria-hidden /></a></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-mute font-sans">Hours</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {site.hours.map((h) => (
              <li key={h.days} className="flex gap-3"><Clock className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden /><span><span className="text-chrome">{h.days}</span><br />{h.open} – {h.close}</span></li>
            ))}
            <li className="pl-7 text-mute">{site.closed}: Closed</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-mute font-sans">Visit the shop</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                <MapPin className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden />
                <span>{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postalCode}<br /><span className="text-mute">{site.address.landmark}</span></span>
              </a>
            </li>
            <li><a href={site.phoneHref} className="flex gap-3 font-semibold text-chrome hover:text-white"><Phone className="size-4 text-signal" aria-hidden />{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-white"><Mail className="size-4 shrink-0 text-signal" aria-hidden />{site.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-16">
        <div className="hairline" />
        <div className="mt-6 flex flex-col gap-3 text-xs text-mute md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link href="/accessibility" className="hover:text-white">Accessibility</Link></li>
            <li><a href="/sitemap.xml" className="hover:text-white">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
