import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { ServicePage } from "@/lib/services";
import { getService } from "@/lib/services";
import { PageHero } from "./PageHero";
import { SectionHeading } from "./Section";
import { Process } from "./Process";
import { Faq } from "./Faq";
import { CtaBand } from "./CtaBand";
import { Reveal, Parallax } from "./Motion";
import { Gallery } from "./Gallery";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import type { ReactNode } from "react";
import { sizeOf } from "@/lib/media";

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function ServicePageView({ page, extra }: { page: ServicePage; extra?: ReactNode }) {
  const path = `/${page.slug}`;
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        image={page.heroImage.src}
        imageAlt={page.heroImage.alt}
        ctaHref={`/contact?service=${page.quoteService}`}
        crumbs={[{ name: "Home", href: "/" }, { name: page.navLabel, href: path }]}
      />

      {/* Explanation */}
      <section aria-labelledby="overview" className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Overview" title={page.metaTitle.replace(/( in Salt Lake City|, Utah).*$/, "").replace(/ \|.*$/, "")} id="overview">
              {page.intro.map((p) => <p key={p} className="mt-4 first:mt-0">{p}</p>)}
            </SectionHeading>
            <Reveal delay={0.1}>
              <ul className="mt-8 grid gap-3">
                {page.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-chrome"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-signal/15 text-signal"><Check className="size-3.5" aria-hidden /></span>{b}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Parallax className="aspect-[4/5] rounded-2xl border border-white/[0.07] sm:aspect-[4/3] lg:aspect-[4/5]" strength={50}>
              <Image src={page.gallery[0].src} alt={page.gallery[0].alt} fill quality={80} sizes={sizeOf(page.gallery[0].src).w > sizeOf(page.gallery[0].src).h ? "(min-width:1024px) 80vw, 160vw" : "(min-width:1024px) 50vw, 100vw"} className="object-cover" />
            </Parallax>
            {page.gallery[0].kind === "shop" && <p className="mt-3 text-xs text-mute">Photo from the Wheel Werks shop.</p>}
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="capabilities" className="border-y border-white/[0.06] bg-carbon py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Capabilities" title="What's included" id="capabilities" />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {page.features.map((f, i) => (
              <li key={f.title} id={slugify(f.title)} className="group scroll-mt-28 bg-carbon p-8 transition-colors hover:bg-graphite">
                <span className="font-display text-sm font-semibold text-signal-hi">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold uppercase">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-silver/75">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {extra}

      {/* Process */}
      <section aria-labelledby="process" className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Process" title="How it works" id="process" />
          <div className="mt-16"><Process steps={page.process} /></div>
        </div>
      </section>

      {/* Visual examples */}
      {page.gallery.length > 1 && (
        <section aria-labelledby="examples" className="bg-carbon py-20 sm:py-28">
          <div className="container-x">
            <SectionHeading eyebrow="In detail" title="The craft up close" id="examples" />
            <div className="mt-12"><Gallery items={page.gallery.map((g) => ({ src: g.src, alt: g.alt, category: "Shop", w: sizeOf(g.src).w, h: sizeOf(g.src).h }))} filters={false} /></div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section aria-labelledby="faq" className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="FAQ" title="Common questions" id="faq" />
            <Reveal delay={0.1} className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mute">Related services</p>
              <ul className="mt-4 space-y-2">
                {page.related.map((slug) => {
                  const r = getService(slug);
                  const label = r?.navLabel ?? (slug === "services" ? "Road Force Balancing & More" : "Gallery");
                  return <li key={slug}><Link href={`/${slug}`} className="inline-flex items-center gap-2 text-chrome hover:text-signal-hi">{label} <ArrowRight className="size-4" aria-hidden /></Link></li>;
                })}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}><Faq items={page.faqs} /></Reveal>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={[serviceSchema(page.schemaServiceType, page.metaDescription, path), breadcrumbSchema([{ name: "Home", path: "/" }, { name: page.navLabel, path }])]} />
    </>
  );
}

export function servicePage(slug: string): ServicePage {
  const p = getService(slug);
  if (!p) throw new Error(`Unknown service ${slug}`);
  return p;
}
