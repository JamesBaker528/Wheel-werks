"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "./Motion";

export type Card = { href: string; title: string; body: string; img: string; alt: string; tag: string };

/** Cards with a cursor-tracked light sheen and slow image push-in. Touch gets the same lift on press. */
export function ServiceCards({ cards }: { cards: Card[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => (
        <Reveal as="li" key={c.href} delay={(i % 3) * 0.08}>
          <CardItem c={c} />
        </Reveal>
      ))}
    </ul>
  );
}

function CardItem({ c }: { c: Card }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Link
      ref={ref}
      href={c.href}
      onPointerMove={onMove}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/[0.08] bg-graphite p-6 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] active:scale-[0.99] sm:p-7"
    >
      <Image src={c.img} alt={c.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.12), transparent 45%)" }}
      />
      <span className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-silver backdrop-blur-md sm:left-7 sm:top-7">{c.tag}</span>
      <span className="absolute right-6 top-6 grid size-11 place-items-center rounded-full bg-white/10 text-chrome backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-signal sm:right-7 sm:top-7">
        <ArrowUpRight className="size-5" aria-hidden />
      </span>
      <div className="relative">
        <h3 className="font-display text-3xl font-bold uppercase leading-none">{c.title}</h3>
        <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-silver/85 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100 group-focus-visible:max-h-32 group-focus-visible:opacity-100 max-lg:max-h-32 max-lg:opacity-100">
          {c.body}
        </p>
      </div>
    </Link>
  );
}
