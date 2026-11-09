"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Background hero video. Licensed Pexels stock footage (see docs/ASSETS.md) — not shop footage.
 * Skips autoplay for reduced-motion users and on Save-Data connections; poster stays as the LCP image.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!reduce && !saveData) setEnabled(true);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!enabled || !v) return;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [enabled]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { setEnabled(true); v.play().then(() => setPlaying(true)).catch(() => {}); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
      >
        {enabled && <source src="/video/hero-720.webm" type="video/webm" media="(max-width: 900px)" />}
        {enabled && <source src="/video/hero-720.mp4" type="video/mp4" media="(max-width: 900px)" />}
        {enabled && <source src="/video/hero.webm" type="video/webm" />}
        {enabled && <source src="/video/hero.mp4" type="video/mp4" />}
      </video>
      <button
        type="button"
        onClick={toggle}
        className="absolute right-5 top-24 z-10 grid size-11 place-items-center rounded-full border border-white/20 bg-black/40 text-chrome backdrop-blur-md transition-colors hover:bg-black/60 sm:bottom-8 sm:right-8 sm:top-auto"
        aria-label={playing ? "Pause background video" : "Play background video"}
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
    </>
  );
}
