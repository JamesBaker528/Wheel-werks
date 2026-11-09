import type { Step } from "@/lib/services";
import { Reveal } from "./Motion";

export function Process({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-signal/0 via-signal/60 to-signal/0 lg:block" />
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.1} className="relative">
          <div className="relative z-10 grid size-14 place-items-center rounded-full border border-white/10 bg-graphite font-display text-xl font-bold text-chrome shadow-[0_0_0_6px_var(--color-ink)]">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-6 font-display text-2xl font-semibold uppercase">{s.title}</h3>
          <p className="mt-2 leading-relaxed text-silver/75">{s.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
