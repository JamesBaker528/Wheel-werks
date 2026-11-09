import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const img = image ?? "/og.jpg";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.shortName}`, description, url: path, type: "website", images: [{ url: img, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}
