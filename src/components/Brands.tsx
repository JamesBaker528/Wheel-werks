import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tireBrands, wheelBrands } from "@/lib/content";
import { Reveal } from "./Motion";

/** Typographic brand cards (no logos until usage rights are confirmed). Data-driven for a future catalog. */
export function Brands({ compact = false }: { compact?: boolean }) {
  const tires = compact ? tireBrands.slice(0, 6) : tireBrands;
  return (
    <div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tires.map((b, i) => (
          <Reveal as="li" key={b.name} delay={(i % 3) * 0.06}>
            <div className="panel group relative flex h-full flex-col justify-between overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
              <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] transition-transform duration-700 group-hover:scale-150" />
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-mute">{b.category}</p>
                <p className="mt-3 font-display text-4xl font-bold uppercase tracking-wide chrome-text">{b.name}</p>
                <p className="mt-2 text-sm text-silver/75">{b.positioning}</p>
              </div>
              <Link href={`/contact?service=tires&brand=${encodeURIComponent(b.name)}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-chrome hover:text-signal-hi">
                Request pricing &amp; availability <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-12">
        <p className="eyebrow">Wheel brands</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {(compact ? wheelBrands.slice(0, 14) : wheelBrands).map((w) => (
            <li key={w} className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider text-silver">{w}</li>
          ))}
          {compact && <li><Link href="/custom-wheels#brands" className="inline-block rounded-full border border-signal/50 px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider text-chrome hover:bg-signal/10">+ more</Link></li>}
        </ul>
        <p className="mt-6 text-xs text-mute">Brand availability changes — ask us for current options for your vehicle.</p>
      </Reveal>
    </div>
  );
}
