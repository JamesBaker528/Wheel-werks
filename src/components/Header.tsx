"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X, ArrowRight } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl" : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative whitespace-nowrap rounded-full px-3 py-2 text-[0.82rem] font-medium transition-colors ${active ? "text-chrome" : "text-silver/80 hover:text-chrome"}`}
                  >
                    {item.label}
                    <span className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-signal transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-chrome transition-colors hover:text-white md:inline-flex">
            <Phone className="size-4 text-signal" aria-hidden />
            {site.phone}
          </a>
          <Link href="/contact" className="btn-primary hidden !min-h-10 whitespace-nowrap !px-5 sm:inline-flex">
            Request a Quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-12 place-items-center rounded-full border border-white/15 bg-white/5 text-chrome xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/[0.06] bg-ink xl:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-6">
          <Link href="/" className="border-b border-white/[0.06] py-4 font-display text-2xl font-semibold uppercase text-chrome">Home</Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="flex items-center justify-between border-b border-white/[0.06] py-4 font-display text-2xl font-semibold uppercase text-chrome"
            >
              {item.label}
              <ArrowRight className="size-5 text-signal" aria-hidden />
            </Link>
          ))}
          <div className="mt-8 grid gap-3">
            <Link href="/contact" className="btn-primary">Request a Quote</Link>
            <a href={site.phoneHref} className="btn-ghost"><Phone className="size-4" aria-hidden /> Call {site.phone}</a>
          </div>
          <p className="mt-6 text-sm text-mute">Mon–Fri 8–6 · Sat 9–3 · {site.address.street}</p>
        </nav>
      </div>
    </header>
  );
}
