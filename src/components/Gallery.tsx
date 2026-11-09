"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import type { GalleryItem } from "@/lib/content";

/** Filterable masonry gallery with an accessible <dialog> lightbox (focus trap + Esc handled natively). */
export function Gallery({ items, filters = true }: { items: GalleryItem[]; filters?: boolean }) {
  const cats = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const shown = cat === "All" ? items : items.filter((i) => i.category === cat);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const go = (dir: number) => setOpen((o) => (o === null ? o : (o + dir + shown.length) % shown.length));

  return (
    <div>
      {filters && (
        <div role="group" aria-label="Filter gallery" className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} type="button" aria-pressed={c === cat} onClick={() => setCat(c)} className={`min-h-11 rounded-full border px-5 text-sm transition-colors ${c === cat ? "border-signal bg-signal/15 text-chrome" : "border-white/10 text-silver hover:border-white/30"}`}>
              {c}
            </button>
          ))}
        </div>
      )}
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {shown.map((g, i) => (
          <li key={g.src} className="break-inside-avoid">
            <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-xl border border-white/[0.07] bg-graphite text-left">
              <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-sm text-chrome">{g.alt}</span>
                <Expand className="size-4 shrink-0 text-chrome" aria-hidden />
              </span>
              <span className="sr-only">Open larger view</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dlg} onClose={() => setOpen(null)} onClick={(e) => e.target === dlg.current && setOpen(null)} onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }} aria-label="Image viewer" className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90">
        {open !== null && shown[open] && (
          <figure className="relative flex h-[100dvh] w-screen flex-col items-center justify-center p-4 sm:p-10">
            <Image src={shown[open].src} alt={shown[open].alt} width={shown[open].w} height={shown[open].h} sizes="100vw" className="max-h-[80vh] w-auto rounded-lg object-contain" />
            <figcaption className="mt-4 text-center text-sm text-silver">{shown[open].alt}</figcaption>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X className="size-5" /></button>
            {shown.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft className="size-5" /></button>
                <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight className="size-5" /></button>
              </>
            )}
          </figure>
        )}
      </dialog>
    </div>
  );
}
