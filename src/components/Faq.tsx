import { Plus } from "lucide-react";
import type { Faq as FaqT } from "@/lib/services";
import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/schema";

/** Native <details> accordion — accessible and zero JS. */
export function Faq({ items, withSchema = true }: { items: FaqT[]; withSchema?: boolean }) {
  return (
    <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-medium text-chrome marker:hidden [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 transition-all duration-300 group-open:rotate-45 group-open:border-signal group-open:bg-signal/10">
              <Plus className="size-4" aria-hidden />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-silver/80">{f.a}</p>
        </details>
      ))}
      {withSchema && <JsonLd data={faqSchema(items)} />}
    </div>
  );
}
