import Image from "next/image";

/**
 * The original Wheel Werks Inc. logo (chrome swoosh + teal lettering), trimmed of its transparent
 * padding. Source is 322×116 px — sharp up to ~160 CSS px wide on 2× screens.
 * Replace public/media/logo-trim.png with a vector/higher-res version when the owner supplies one.
 */
export function Wordmark({ className = "", priority = false, size = "md" }: { className?: string; priority?: boolean; size?: "md" | "lg" }) {
  const h = size === "lg" ? 58 : 46;
  return (
    <Image
      src="/media/logo-trim.png"
      alt="Wheel Werks Inc."
      width={Math.round((322 / 116) * h)}
      height={h}
      priority={priority}
      unoptimized
      className={`h-auto w-auto select-none drop-shadow-[0_2px_12px_rgba(20,207,207,0.18)] ${className}`}
      style={{ height: h, width: "auto" }}
    />
  );
}
