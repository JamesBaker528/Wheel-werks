"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, ChevronsLeftRight } from "lucide-react";
import type { BeforeAfter as Pair } from "@/lib/content";

const DEMO: Pair & { demo: true } = {
  title: "Slider demonstration",
  before: "/media/stock/black-rim-garage.jpg",
  after: "/media/stock/black-rim-garage.jpg",
  alt: "Black alloy wheel (stock photo used only to demonstrate the comparison slider)",
  service: "Demo",
  demo: true,
};

/**
 * Drag / touch / keyboard comparison slider with fullscreen view.
 * With no real pairs supplied it renders ONE clearly labeled demo (filter-simulated "before"),
 * so it is never presented as an actual Wheel Werks restoration.
 */
export function BeforeAfterSlider({ pairs }: { pairs: Pair[] }) {
  const items: (Pair & { demo?: boolean })[] = pairs.length ? pairs : [DEMO];
  const [idx, setIdx] = useState(0);
  const item = items[idx];
  return (
    <div>
      <Compare key={item.after} item={item} />
      {items.length > 1 && (
        <div role="tablist" aria-label="Choose a comparison" className="mt-5 flex flex-wrap gap-2">
          {items.map((p, i) => (
            <button key={p.after} role="tab" aria-selected={i === idx} onClick={() => setIdx(i)} className={`rounded-full border px-4 py-2 text-sm transition-colors ${i === idx ? "border-signal bg-signal/15 text-chrome" : "border-white/10 text-silver hover:border-white/30"}`}>
              {p.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Compare({ item }: { item: Pair & { demo?: boolean } }) {
  const [pos, setPos] = useState(50);
  const [full, setFull] = useState(false);
  const [dragging, setDragging] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  const setFromX = useCallback((clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    setFromX(e.clientX);
  };
  const onMove = (e: React.PointerEvent) => dragging && setFromX(e.clientX);
  const onUp = () => setDragging(false);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const map: Record<string, number> = { ArrowLeft: pos - step, ArrowDown: pos - step, ArrowRight: pos + step, ArrowUp: pos + step, Home: 0, End: 100, PageDown: pos - 10, PageUp: pos + 10 };
    if (e.key in map) { e.preventDefault(); setPos(Math.min(100, Math.max(0, map[e.key]))); }
  };

  // Fullscreen: native API where supported, CSS overlay fallback (iOS Safari).
  const toggleFull = async () => {
    const el = wrap.current;
    if (!el) return;
    if (!full) {
      if (el.requestFullscreen) { try { await el.requestFullscreen(); } catch { /* fall back */ } }
      setFull(true);
    } else {
      if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
      setFull(false);
    }
  };
  useEffect(() => {
    const onFs = () => { if (!document.fullscreenElement) setFull(false); };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    document.addEventListener("fullscreenchange", onFs);
    window.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("fullscreenchange", onFs); window.removeEventListener("keydown", onEsc); };
  }, []);

  const demoFilter = item.demo ? { filter: "grayscale(0.85) brightness(0.5) contrast(1.35) sepia(0.35)" } : undefined;

  return (
    <div ref={wrap} className={full ? "fixed inset-0 z-[90] flex items-center justify-center bg-black p-4" : "relative"}>
      <div
        ref={frame}
        className={`relative w-full touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 bg-carbon ${full ? "h-full max-h-[90vh]" : "aspect-[4/5] sm:aspect-[16/10]"} ${dragging ? "cursor-grabbing" : "cursor-ew-resize"}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {/* AFTER (base) */}
        <Image src={item.after} alt={`After: ${item.alt}`} fill sizes={full ? "100vw" : "(min-width:1024px) 60vw, 100vw"} className={`object-cover ${item.demo ? "object-[50%_60%]" : ""}`} draggable={false} />
        {/* BEFORE (clipped) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={item.before} alt={`Before: ${item.alt}`} fill sizes={full ? "100vw" : "(min-width:1024px) 60vw, 100vw"} className={`object-cover ${item.demo ? "object-[50%_60%]" : ""}`} style={demoFilter} draggable={false} />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-chrome backdrop-blur-md">Before</span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-signal px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink">After</span>

        {item.demo && (
          <span className="pointer-events-none absolute bottom-4 left-4 right-20 w-fit rounded-xl border border-white/15 bg-black/70 px-4 py-2 text-xs text-silver backdrop-blur-md">
            Interactive demo using a stock photo — real Wheel Werks before &amp; after photos coming soon
          </span>
        )}

        {/* Handle */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
          <div
            role="slider"
            tabIndex={0}
            aria-label="Before and after comparison. Use arrow keys to reveal."
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% before image shown`}
            onKeyDown={onKey}
            className="pointer-events-auto absolute left-0 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-ink/70 text-white shadow-2xl backdrop-blur-md transition-transform hover:scale-110"
          >
            <ChevronsLeftRight className="size-6" aria-hidden />
          </div>
        </div>

        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={toggleFull}
          aria-label={full ? "Exit full screen" : "View full screen"}
          className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full border border-white/20 bg-black/60 text-chrome backdrop-blur-md hover:bg-black/80"
        >
          {full ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
        </button>
      </div>
    </div>
  );
}
