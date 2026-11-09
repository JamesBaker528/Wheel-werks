"use client";

import { LazyMotion, domAnimation, MotionConfig, m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Loads the small DOM animation feature set once; respects OS reduced-motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

/** Scroll-triggered fade + rise. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" }) {
  const C = m[as];
  return (
    <C
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </C>
  );
}

/** Subtle vertical parallax for imagery. Wrap an absolutely positioned image. */
export function Parallax({ children, className, strength = 60 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-strength, strength]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <m.div style={{ y }} className="absolute -inset-y-[80px] inset-x-0">
        {children}
      </m.div>
    </div>
  );
}
