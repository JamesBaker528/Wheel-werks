import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/Section";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import { extraServices, services } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { EbayCta } from "@/components/EbayCta";

export const metadata = pageMeta({ title: extraServices.metaTitle, description: extraServices.metaDescription, path: "/services", image: "/og/services.jpg" });

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialty services"
        title="The details that make a smooth ride."
        lede="Road Force balancing, hub-centric fitment, seasonal tire storage, blasting and stripping, factory take-offs, TPMS and nitrogen — the specialty work most shops don't offer."
        image="/media/stock/gloss-black-wheel.jpg"
        imageAlt="Gloss black wheel with low-profile tire"
        crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]}
      />

      <nav aria-label="Core services" className="border-y border-white/[0.06] bg-carbon">
        <ul className="container-x flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
          {services.map((s) => (
            <li key={s.slug} className="shrink-0"><Link href={`/${s.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-5 text-sm text-silver hover:border-white/30 hover:text-chrome">{s.navLabel} <ArrowRight className="size-3.5" aria-hidden /></Link></li>
          ))}
        </ul>
      </nav>

      <div className="py-12 sm:py-20">
        {extraServices.items.map((item, i) => (
          <section key={item.id} id={item.id} aria-labelledby={`${item.id}-t`} className="scroll-mt-24 py-12 sm:py-16">
            <div className={`container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.07]">
                  <Image src={item.img.src} alt={item.img.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-1000 hover:scale-105" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${item.id}-t`} className="display mt-4 text-4xl sm:text-5xl">{item.title}</h2>
                {item.body.map((p) => <p key={p} className="mt-5 leading-relaxed text-silver/85">{p}</p>)}
                {"bullets" in item && item.bullets && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mute">{item.bulletsTitle}</p>
                    <ul className="mt-3 space-y-2">{item.bullets.map((b) => <li key={b} className="flex gap-3 text-chrome"><Check className="mt-1 size-4 shrink-0 text-signal" aria-hidden />{b}</li>)}</ul>
                  </div>
                )}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <Link href={`/contact?service=${item.quote}`} className="btn-primary">Request a Quote <ArrowRight className="size-4" aria-hidden /></Link>
                  {item.id === "factory-take-offs" && <EbayCta compact />}
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="faq" className="border-t border-white/[0.06] bg-carbon py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Good to know" id="faq" />
          <Reveal delay={0.1}><Faq items={extraServices.faqs} /></Reveal>
        </div>
      </section>
      <CtaBand />
      <JsonLd data={[serviceSchema("Road Force wheel balancing", extraServices.metaDescription, "/services"), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])]} />
    </>
  );
}
