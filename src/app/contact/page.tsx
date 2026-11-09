import { Suspense } from "react";
import { MapPin, Phone, Mail, Clock, Navigation, Printer } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Request a Quote — Wheel Repair & Tires",
  description: "Request a quote from Wheel Werks in Salt Lake City. Upload photos of wheel damage, tell us about your vehicle, or call (801) 268-4132. 123 East 3900 South.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(20,207,207,0.14),transparent_60%)]" />
        <div className="container-x">
          <p className="eyebrow rise">Contact &amp; quote</p>
          <h1 className="display rise mt-6 max-w-4xl text-5xl sm:text-7xl" style={{ animationDelay: "100ms" }}>Let&rsquo;s look at your wheels.</h1>
          <p className="rise mt-6 max-w-2xl text-lg text-silver/85" style={{ animationDelay: "200ms" }}>Tell us what&rsquo;s going on and attach a few photos. Prefer to talk? Call the shop — we&rsquo;re happy to help.</p>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <Suspense fallback={<div className="panel h-[560px] animate-pulse" />}>
              <QuoteForm />
            </Suspense>

            <aside className="grid gap-5 self-start lg:sticky lg:top-28">
              <a href={site.phoneHref} className="panel group flex items-center gap-4 p-6 hover:border-signal/50">
                <span className="grid size-12 place-items-center rounded-full bg-signal text-ink"><Phone className="size-5" aria-hidden /></span>
                <span><span className="block text-xs uppercase tracking-[0.2em] text-mute">Call the shop</span><span className="font-display text-3xl font-bold text-chrome">{site.phone}</span></span>
              </a>
              <div className="panel p-6">
                <ul className="space-y-5 text-sm">
                  <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden /><address className="not-italic"><span className="text-chrome">{site.name}</span><br />{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postalCode}<br /><span className="text-mute">{site.address.landmark}</span><br /><span className="font-semibold text-signal">Look for the teal building.</span></address></li>
                  <li className="flex gap-3"><Clock className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden /><div>{site.hours.map((h) => <p key={h.days}><span className="text-chrome">{h.days}:</span> {h.open} – {h.close}</p>)}<p>Sunday: Closed</p></div></li>
                  <li className="flex gap-3"><Mail className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden /><a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a></li>
                  <li className="flex gap-3"><Printer className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden /><span>Fax {site.fax}</span></li>
                </ul>
                <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6 w-full"><Navigation className="size-4" aria-hidden /> Get directions</a>
              </div>
              <a href={site.links.googleBusiness} target="_blank" rel="noopener noreferrer" className="panel block overflow-hidden">
                <div className="relative grid aspect-[16/10] place-items-center bg-[linear-gradient(135deg,#16191c,#0e1012)]">
                  <div aria-hidden className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
                  <div className="relative text-center"><MapPin className="mx-auto size-10 text-signal" aria-hidden /><p className="mt-2 font-display text-xl font-semibold uppercase text-chrome">View on Google Maps</p><p className="text-xs text-mute">3900 South &amp; State Street</p></div>
                </div>
              </a>
            </aside>
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
