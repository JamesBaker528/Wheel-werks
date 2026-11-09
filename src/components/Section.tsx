import type { ReactNode } from "react";
import { Reveal } from "./Motion";

export function SectionHeading({ eyebrow, title, children, align = "left", id }: { eyebrow: string; title: ReactNode; children?: ReactNode; align?: "left" | "center"; id?: string }) {
  return (
    <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 id={id} className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {children && <div className="mt-5 text-base leading-relaxed text-silver/80 sm:text-lg">{children}</div>}
    </Reveal>
  );
}
