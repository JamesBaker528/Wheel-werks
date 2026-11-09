import Link from "next/link";
import { Phone, FileText } from "lucide-react";
import { site } from "@/lib/site";

/** Sticky bottom bar on small screens — the two highest-intent actions, always in reach. */
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/90 p-3 backdrop-blur-xl md:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <div className="grid grid-cols-2 gap-3">
        <a href={site.phoneHref} className="btn-ghost !min-h-12"><Phone className="size-4" aria-hidden /> Call</a>
        <Link href="/contact" className="btn-primary !min-h-12"><FileText className="size-4" aria-hidden /> Get a Quote</Link>
      </div>
    </div>
  );
}
