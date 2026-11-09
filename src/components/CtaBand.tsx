import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./Motion";

export function CtaBand({ title = "Ready when your wheels are.", body = "Send us a few photos and the details — we'll get back to you with options. Or call the shop and talk to someone who's done this for years." }: { title?: string; body?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden py-28 sm:py-36">
      <Image src="/media/stock/black-wheel-red-caliper.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-center opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Request a quote</p>
          <h2 id="cta-title" className="display mt-5 text-5xl sm:text-6xl lg:text-7xl">{title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-silver/85">{body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary group">Request a Quote <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></Link>
            <a href={site.phoneHref} className="btn-ghost"><Phone className="size-4" aria-hidden /> {site.phone}</a>
            <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MapPin className="size-4" aria-hidden /> Directions</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
