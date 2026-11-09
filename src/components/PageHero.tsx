import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, lede, image, imageAlt, ctaHref = "/contact", crumbs, children }: { eyebrow: string; title: string; lede: string; image: string; imageAlt: string; ctaHref?: string; crumbs?: { name: string; href: string }[]; children?: ReactNode }) {
  return (
    <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden pb-16 pt-36 sm:pb-24">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover fade-in" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,9,10,0.55)_0%,rgba(8,9,10,0.75)_55%,var(--color-ink)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
      <div className="container-x">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i === crumbs.length - 1 ? <span aria-current="page" className="text-silver">{c.name}</span> : <Link href={c.href} className="hover:text-white">{c.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="display rise mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-8xl" style={{ animationDelay: "120ms" }}>{title}</h1>
        <p className="rise mt-6 max-w-2xl text-lg leading-relaxed text-silver/90 sm:text-xl" style={{ animationDelay: "240ms" }}>{lede}</p>
        <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
          <Link href={ctaHref} className="btn-primary group">Request a Quote <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></Link>
          <a href={site.phoneHref} className="btn-ghost"><Phone className="size-4" aria-hidden /> Call {site.phone}</a>
        </div>
        {children}
      </div>
    </section>
  );
}
