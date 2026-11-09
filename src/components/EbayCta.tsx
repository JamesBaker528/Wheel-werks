import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { site } from "@/lib/site";

/** Link to the shop's eBay store (carried over from the original wheelwerks.net). */
export function EbayCta({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <a href={site.links.ebay} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 font-semibold text-chrome hover:text-signal-hi ${className}`}>
        <ShoppingBag className="size-4 text-signal" aria-hidden /> Shop our eBay store <ArrowUpRight className="size-4" aria-hidden />
      </a>
    );
  }
  return (
    <a
      href={site.links.ebay}
      target="_blank"
      rel="noopener noreferrer"
      className={`panel teal-glow group flex flex-col gap-5 p-6 transition-colors hover:border-signal/40 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${className}`}
    >
      <span className="flex items-center gap-5">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-signal/10 text-signal transition-colors group-hover:bg-signal group-hover:text-ink">
          <ShoppingBag className="size-6" aria-hidden />
        </span>
        <span>
          <span className="block font-display text-2xl font-bold uppercase text-chrome sm:text-3xl">Check out our eBay store</span>
          <span className="mt-1 block text-sm text-silver/80">Browse wheels and tires Wheel Werks has listed for sale online.</span>
        </span>
      </span>
      <span className="btn-ghost shrink-0 group-hover:border-signal">View on eBay <ArrowUpRight className="size-4" aria-hidden /></span>
    </a>
  );
}
