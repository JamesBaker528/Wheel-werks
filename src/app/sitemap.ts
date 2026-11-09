import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: [string, number][] = [
    ["/", 1], ["/wheel-repair", 0.9], ["/wheel-refinishing-powder-coating", 0.9], ["/custom-wheels", 0.9], ["/tires", 0.9],
    ["/services", 0.8], ["/gallery", 0.6], ["/about", 0.6], ["/contact", 0.8], ["/accessibility", 0.2],
  ];
  const now = new Date();
  return routes.map(([p, priority]) => ({ url: `${site.url}${p === "/" ? "" : p}`, lastModified: now, changeFrequency: "monthly", priority }));
}
