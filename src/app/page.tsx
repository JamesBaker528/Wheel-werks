import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Phone, MapPin, Clock, Wrench, Paintbrush, Gauge, Users, ShieldCheck, Warehouse } from "lucide-react";
import { HeroVideo } from "@/components/HeroVideo";
import { ServiceCards, type Card } from "@/components/ServiceCards";
import { BeforeAfterSlider } from "@/components/BeforeAfter";
import { SectionHeading } from "@/components/Section";
import { Brands } from "@/components/Brands";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Gallery } from "@/components/Gallery";
import { Faq } from "@/components/Faq";
import { Reveal, Parallax } from "@/components/Motion";
import { site, yearsInBusiness } from "@/lib/site";
import { beforeAfter, gallery, homeFaqs } from "@/lib/content";
import { defaultProcess } from "@/lib/services";

const cards: Card[] = [
  { href: "/wheel-repair", tag: "Repair", title: "Wheel Repair", body: "Bent wheel straightening to within 5/1000\", curb rash, gouges and leaking bead seats.", img: "/media/stock/black-rim-garage.jpg", alt: "Black alloy wheel in a dim garage" },
  { href: "/wheel-repair#cracked-wheel-welding", tag: "Welding", title: "Cracked Wheels", body: "Cracked or broken wheels assessed and welded where appropriate — then refinished.", img: "/media/stock/spinning-wheel.jpg", alt: "Close-up of a wheel in motion" },
  { href: "/wheel-refinishing-powder-coating", tag: "Finish", title: "Powder Coating", body: "In-house powder coating, paint, polishing and machining. Thousands of colors.", img: "/media/stock/bronze-wheel.jpg", alt: "Bronze finished wheel on a black car" },
  { href: "/custom-wheels", tag: "Wheels", title: "Custom Wheels", body: "Stock and custom fitment, new wheels, quality used OEM and take-off exchanges.", img: "/media/stock/performance-wheel-red.jpg", alt: "Black performance wheel on a red sports car" },
  { href: "/tires", tag: "Tires", title: "Tires & TPMS", body: "Tire sales, installation, repair, rotation, TPMS service and nitrogen.", img: "/media/stock/black-wheel-red-caliper.jpg", alt: "Black wheel with red brake caliper" },
  { href: "/services#road-force-balancing", tag: "Balance", title: "Road Force Balancing", body: "Chase down vibrations a standard balance misses. Plus seasonal tire storage.", img: "/media/stock/gloss-black-wheel.jpg", alt: "Gloss black wheel and low-profile tire" },
];

const why = [
  { Icon: Users, title: `Family-owned since ${site.foundedYear}`, body: "Founded by Mike Pruess, who has spent his entire career in the wheel and tire business." },
  { Icon: Wrench, title: "Everything in-house", body: "Straightening, welding, blasting, powder coating, paint and machining — under one roof." },
  { Icon: ShieldCheck, title: "Honesty first", body: "We'll tell you when a wheel can be saved — and when it shouldn't be." },
  { Icon: Gauge, title: "Precision equipment", body: "Straightening to within 5/1000 of an inch and Road Force balancing for a smooth ride." },
  { Icon: Paintbrush, title: "Our own paint shop", body: "The right color match for factory restorations, and thousands of custom colors." },
  { Icon: Warehouse, title: "A crew that stays", body: "Very low turnover. Our team trains through an apprenticeship and has been here for years." },
];

export default function Home() {
  return (
    <>
      {/* 1 — Cinematic hero */}
      <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-32 pt-32 sm:items-center sm:pb-20">
        <Image src="/video/hero-poster.jpg" alt="" fill priority sizes="100vw" className="-z-30 object-cover" />
        <HeroVideo />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(8,9,10,0.55)_55%,rgba(8,9,10,0.95)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
        <div className="grain absolute inset-0 -z-10" />
        <div className="container-x">
          <p className="eyebrow rise">Salt Lake City · Since {site.foundedYear}</p>
          <h1 id="hero-title" className="display mt-6 text-[clamp(3.2rem,11vw,9.5rem)]">
            <span className="rise block chrome-text" style={{ animationDelay: "100ms" }}>Precision.</span>
            <span className="rise block chrome-text" style={{ animationDelay: "220ms" }}>Performance.</span>
            <span className="rise block" style={{ animationDelay: "340ms" }}>Perfection<span className="text-signal">.</span></span>
          </h1>
          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-silver/90 sm:text-xl" style={{ animationDelay: "480ms" }}>
            Expert wheel repair, refinishing, custom wheels, and tire services in Salt Lake City.
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "600ms" }}>
            <Link href="/contact" className="btn-primary group">Request a Quote <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></Link>
            <Link href="#services" className="btn-ghost">Explore Our Services</Link>
          </div>
        </div>
        <a href="#credibility" className="fade-in absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-mute sm:flex" style={{ animationDelay: "1.2s" }}>
          Scroll
          <span className="relative block h-12 w-px overflow-hidden bg-white/15"><span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-signal" /></span>
          <ChevronDown className="sr-only" />
        </a>
      </section>

      {/* 2 — Credibility */}
      <section id="credibility" aria-labelledby="cred-title" className="relative border-y border-white/[0.06] bg-carbon py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Trusted local specialists" title={<>The valley&rsquo;s wheel &amp; tire <span className="text-signal">specialists</span></>} id="cred-title">
              <p>Wheel Werks Inc. has been the Salt Lake Valley&rsquo;s go-to for all things wheel and tire since {site.foundedYear}. Performance enthusiasts, truck owners, and daily drivers all get the same thing here: honesty, professionalism, and the equipment to do the job right in-house.</p>
            </SectionHeading>
            <Reveal delay={0.15}>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-chrome hover:text-signal-hi">Our story <ArrowRight className="size-4" aria-hidden /></Link>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
              {[
                { k: `${yearsInBusiness()}+`, v: "Years in business" },
                { k: site.foundedYear, v: "Family-owned since" },
                { k: "5/1000″", v: "Straightening accuracy" },
                { k: "1000s", v: "Powder coat colors" },
              ].map((s) => (
                <div key={s.v} className="bg-carbon p-6 sm:p-8">
                  <dt className="sr-only">{s.v}</dt>
                  <dd className="font-display text-5xl font-bold chrome-text sm:text-6xl">{s.k}</dd>
                  <dd className="mt-2 text-xs uppercase tracking-[0.2em] text-mute">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 3 — Services */}
      <section id="services" aria-labelledby="services-title" className="py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="What we do" title="Every wheel. Every tire. In-house." id="services-title" />
            <Reveal><Link href="/services" className="btn-ghost shrink-0">All services <ArrowRight className="size-4" aria-hidden /></Link></Reveal>
          </div>
          <div className="mt-14"><ServiceCards cards={cards} /></div>
        </div>
      </section>

      {/* 4 — Before / after */}
      <section aria-labelledby="ba-title" className="relative overflow-hidden bg-carbon py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Restoration" title={<>Drag to see the <span className="text-signal">difference</span></>} id="ba-title">
            <p>Curb rash, bent lips, faded or peeling finishes — we restore wheels to factory condition or build something entirely new. Slide the handle, use your arrow keys, or open full screen.</p>
            <Link href="/gallery" className="mt-8 inline-flex items-center gap-2 font-semibold text-chrome hover:text-signal-hi">See the shop gallery <ArrowRight className="size-4" aria-hidden /></Link>
          </SectionHeading>
          <Reveal delay={0.1}><BeforeAfterSlider pairs={beforeAfter} /></Reveal>
        </div>
      </section>

      {/* 5 — Why choose */}
      <section aria-labelledby="why-title" className="relative py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Why Wheel Werks" title="Not a tire chain. A wheel shop." id="why-title">
              <p>Most tire shops send wheel work out. We built our shop around it — so the people who straighten your wheel are the same people who refinish, mount and balance it.</p>
            </SectionHeading>
            <Reveal delay={0.15}>
              <Parallax className="mt-10 hidden aspect-[4/3] rounded-2xl border border-white/[0.07] lg:block" strength={40}>
                <Image src="/media/shop/storefront.jpg" alt="The Wheel Werks shop on 3900 South in Salt Lake City" fill sizes="40vw" className="object-cover" />
              </Parallax>
            </Reveal>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {why.map(({ Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={(i % 2) * 0.08} className="panel p-7 transition-colors hover:border-white/15">
                <span className="grid size-12 place-items-center rounded-xl bg-signal/10 text-signal"><Icon className="size-6" aria-hidden /></span>
                <h3 className="mt-6 font-display text-2xl font-semibold uppercase">{title}</h3>
                <p className="mt-2 leading-relaxed text-silver/75">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Brands */}
      <section aria-labelledby="brands-title" className="border-y border-white/[0.06] bg-carbon py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Brands" title="Top tire & wheel brands" id="brands-title">
            <p>We carry leading tire brands and a wide range of aftermarket wheels. Tell us your vehicle and we&rsquo;ll check what&rsquo;s available.</p>
          </SectionHeading>
          <div className="mt-14"><Brands compact /></div>
        </div>
      </section>

      {/* 7 — Process */}
      <section aria-labelledby="process-title" className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="Simple from first photo to final balance" id="process-title" />
          <div className="mt-16"><Process steps={defaultProcess} /></div>
        </div>
      </section>

      {/* 8 — Reviews */}
      <section aria-labelledby="reviews-title" className="bg-carbon py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Customer reviews" title="Word gets around" id="reviews-title" />
          <div className="mt-14"><Reviews /></div>
        </div>
      </section>

      {/* 9 — Gallery */}
      <section aria-labelledby="gallery-title" className="py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Inside the shop" title="Real work. Real shop." id="gallery-title" />
            <Reveal><Link href="/gallery" className="btn-ghost shrink-0">Full gallery <ArrowRight className="size-4" aria-hidden /></Link></Reveal>
          </div>
          <div className="mt-14"><Gallery items={gallery.slice(0, 6)} filters={false} /></div>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-white/[0.06] bg-carbon py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" id="faq-title">
            <p>Don&rsquo;t see yours? Call <a href={site.phoneHref} className="font-semibold text-chrome hover:text-signal-hi">{site.phone}</a>.</p>
          </SectionHeading>
          <Reveal delay={0.1}><Faq items={homeFaqs} /></Reveal>
        </div>
      </section>

      {/* 11 — Final conversion */}
      <section aria-labelledby="final-title" className="relative isolate overflow-hidden py-24 sm:py-32">
        <Image src="/media/stock/performance-wheel-red.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink" />
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Let&rsquo;s get started</p>
            <h2 id="final-title" className="display mt-5 text-5xl sm:text-7xl">Send photos.<br />Get answers.</h2>
            <p className="mt-6 max-w-xl text-lg text-silver/85">Our quote form walks you through it in about two minutes — and you can upload photos of the damage straight from your phone.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary group">Request a Quote <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></Link>
              <a href={site.phoneHref} className="btn-ghost"><Phone className="size-4" aria-hidden /> {site.phone}</a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="panel p-8">
            <ul className="space-y-6">
              <li className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-signal" aria-hidden /><div><p className="font-semibold text-chrome">{site.address.street}</p><p>{site.address.city}, {site.address.region} {site.address.postalCode}</p><p className="text-sm text-mute">{site.address.landmark}</p><a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-chrome hover:text-signal-hi">Get directions <ArrowRight className="size-3.5" aria-hidden /></a></div></li>
              <li className="flex gap-4"><Clock className="mt-1 size-5 shrink-0 text-signal" aria-hidden /><div>{site.hours.map((h) => <p key={h.days}><span className="text-chrome">{h.short}</span> {h.open} – {h.close}</p>)}<p className="text-mute">Sun Closed</p></div></li>
              <li className="flex gap-4"><Phone className="mt-1 size-5 shrink-0 text-signal" aria-hidden /><a href={site.phoneHref} className="font-display text-3xl font-bold text-chrome hover:text-signal-hi">{site.phone}</a></li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
