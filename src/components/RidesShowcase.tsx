"use client";

import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { rides, rideAlt } from "@/lib/rides";

const INTERVAL = 4800; // ms per photo
const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Cinematic "Customer Rides" slideshow.
 * Transition: the incoming photo wipes in behind a red light sweep while the outgoing one sinks and dims;
 * the active photo slowly pushes in (Ken Burns). Low-res source photos are shown at native size over a
 * blurred, darkened copy of themselves so they stay sharp on large screens.
 * Autoplay pauses on hover/focus, off-screen, in background tabs, and is off for reduced-motion users.
 */
export function RidesShowcase({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const [[index, dir], setSlide] = useState<[number, number]>([0, 1]);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userNav, setUserNav] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; id: number } | null>(null);

  const n = rides.length;
  const ride = rides[index];
  const autoplay = playing && !hovered && visible && !reduce;

  const go = useCallback((to: number, d: number, byUser = true) => {
    setSlide([((to % n) + n) % n, d]);
    if (byUser) setUserNav(true);
  }, [n]);
  const next = useCallback((byUser = true) => go(index + 1, 1, byUser), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  // Autoplay timer (restarts on every slide change).
  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => next(false), INTERVAL);
    return () => window.clearTimeout(t);
  }, [autoplay, index, next]);

  // Only run while on screen and while the tab is visible.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !document.hidden), { threshold: 0.35 });
    io.observe(el);
    const onVis = () => setVisible((v) => v && !document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  // Preload neighbours so transitions never wait on the network.
  useEffect(() => {
    [index + 1, index - 1].forEach((i) => {
      const r = rides[(i + n) % n];
      const img = new window.Image();
      img.src = `/_next/image?url=${encodeURIComponent(r.src)}&w=828&q=75`;
    });
  }, [index, n]);

  // Keep the active thumbnail centred in the filmstrip (horizontal scroll only — never moves the page).
  useEffect(() => {
    const s = strip.current;
    const t = s?.querySelector<HTMLElement>(`[data-i="${index}"]`);
    if (!s || !t) return;
    s.scrollTo({ left: t.offsetLeft - s.clientWidth / 2 + t.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [index, reduce]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  };

  // Swipe
  const onDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, id: e.pointerId }; };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 45) { if (dx < 0) next(); else prev(); }
  };

  const variants = {
    enter: (d: number) => reduce
      ? { opacity: 0 }
      : { clipPath: d > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)", scale: 1.14, filter: "brightness(1.8) saturate(0.6)" },
    center: reduce
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "brightness(1) saturate(1)", transition: { duration: 1.05, ease } },
    exit: (d: number) => reduce
      ? { opacity: 0, transition: { duration: 0.4 } }
      : { scale: 0.9, x: d > 0 ? "-6%" : "6%", opacity: 0, filter: "brightness(0.35)", transition: { duration: 1.05, ease } },
  };

  return (
    <div
      ref={root}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => !root.current?.contains(e.relatedTarget as Node) && setHovered(false)}
    >
      {/* Stage */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer rides"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current = null)}
        className={`group relative isolate touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 bg-ink ${compact ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10]"}`}
      >
        {/* Blurred ambient backdrop (crossfades) */}
        <AnimatePresence initial={false}>
          <m.div key={`bg-${index}`} className="absolute inset-0 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1.2 } }} exit={{ opacity: 0, transition: { duration: 1.2 } }}>
            <Image src={ride.src} alt="" fill sizes="10vw" className="scale-125 object-cover opacity-50 blur-2xl" />
          </m.div>
        </AnimatePresence>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,9,10,0.85)_100%)]" />

        {/* Photo */}
        <AnimatePresence initial={false} custom={dir}>
          <m.div key={index} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" className="absolute inset-0 grid place-items-center justify-items-center p-4 sm:p-8">
            <m.div
              className="relative h-full w-full"
              style={{ maxWidth: ride.w }}
              initial={{ scale: 1 }}
              animate={reduce ? undefined : { scale: 1.06 }}
              transition={{ duration: INTERVAL / 1000 + 1.2, ease: "linear" }}
            >
              <Image
                src={ride.src}
                alt={rideAlt(index)}
                fill
                priority={index === 0}
                sizes="(min-width:1280px) 1100px, 100vw"
                className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.75)]"
                draggable={false}
              />
            </m.div>
          </m.div>
        </AnimatePresence>

        {/* Teal light sweep riding the wipe edge */}
        {!reduce && (
          <m.div
            key={`sweep-${index}`}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 z-10 w-[18%]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(20,207,207,0.5) 45%, rgba(255,255,255,0.7) 50%, rgba(20,207,207,0.5) 55%, transparent)", mixBlendMode: "screen" }}
            initial={{ left: dir > 0 ? "100%" : "-18%", opacity: index === 0 && !userNav ? 0 : 1 }}
            animate={{ left: dir > 0 ? "-18%" : "100%", opacity: [1, 1, 0] }}
            transition={{ duration: 1.05, ease }}
          />
        )}

        {/* HUD */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4 sm:p-6">
          <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-chrome backdrop-blur-md">Customer rides</span>
          <span className="font-display text-2xl font-bold tabular-nums text-chrome sm:text-4xl" aria-live={userNav ? "polite" : "off"} aria-atomic>
            <span className="sr-only">Photo </span>{String(index + 1).padStart(2, "0")}<span className="text-mute"> / {n}</span>
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
          <div className="flex gap-2">
            <button type="button" onClick={prev} aria-label="Previous photo" className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/50 text-chrome backdrop-blur-md transition-colors hover:border-signal hover:bg-signal hover:text-ink"><ChevronLeft className="size-5" /></button>
            <button type="button" onClick={() => next()} aria-label="Next photo" className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/50 text-chrome backdrop-blur-md transition-colors hover:border-signal hover:bg-signal hover:text-ink"><ChevronRight className="size-5" /></button>
          </div>
          {!reduce && (
            <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause slideshow" : "Play slideshow"} className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/50 text-chrome backdrop-blur-md hover:bg-black/70">
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
          )}
        </div>

        {/* Autoplay progress */}
        {!reduce && (
          <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-0.5 bg-white/10">
            <div
              key={`p-${index}-${autoplay}`}
              className="h-full origin-left bg-signal"
              style={{ animation: autoplay ? `ride-progress ${INTERVAL}ms linear forwards` : "none", transform: autoplay ? undefined : "scaleX(0)" }}
            />
          </div>
        )}
      </div>

      {/* Filmstrip */}
      <div ref={strip} className="relative mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]" aria-label="Choose a photo">
        {rides.map((r, i) => (
          <button
            key={r.src}
            type="button"
            data-i={i}
            onClick={() => go(i, i >= index ? 1 : -1)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-all duration-300 sm:h-16 sm:w-24 ${i === index ? "border-signal opacity-100" : "border-white/10 opacity-45 hover:opacity-90"}`}
          >
            <Image src={r.src} alt="" fill sizes="96px" className="object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
