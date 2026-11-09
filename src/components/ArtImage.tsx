import { getImageProps } from "next/image";
import { wideOf } from "@/lib/media";

/**
 * Full-bleed background image with art direction: a wide crop on tablets/desktops and the
 * original (usually portrait) photo on phones, so neither is stretched beyond its resolution.
 * Falls back to a single responsive image when no wide crop exists. Landscape-only sources
 * request extra width on phones because tall mobile sections crop them heavily.
 */
export function ArtImage({ src, alt, priority = false, className = "" }: { src: string; alt: string; priority?: boolean; className?: string }) {
  const wide = wideOf(src);
  const common = { alt, fill: true, priority, quality: 78 } as const;
  const tall = getImageProps({ ...common, src, sizes: wide ? "(max-width: 767px) 150vw, 100vw" : "(max-width: 767px) 250vw, 100vw" }).props;
  const cls = `absolute inset-0 h-full w-full object-cover ${className}`;
  if (!wide) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...tall} className={cls} style={undefined} />;
  }
  const desk = getImageProps({ ...common, src: wide, sizes: "100vw" }).props;
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desk.srcSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...tall} className={cls} style={undefined} />
    </picture>
  );
}
