import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // Next.js injects inline bootstrap scripts; nonce-based CSP would force every page to render dynamically.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/**
 * NOTE: Next matches redirect sources case-insensitively, so legacy paths that differ from the new
 * path only by case (/Tires, /Services, /About) are handled in src/middleware.ts instead.
 *
 * Legacy wheelwerks.net (Net Driven) URLs → new pages. Permanent (308) to preserve search equity. */
const legacy: [string, string][] = [
  ["/Services/Wheel-Repair", "/wheel-repair"],
  ["/Automotive-Services/Wheel-Repair", "/wheel-repair"],
  ["/Services/Welding", "/wheel-repair#cracked-wheel-welding"],
  ["/Automotive-Services/Welding", "/wheel-repair#cracked-wheel-welding"],
  ["/Services/Wheel-Refinishing", "/wheel-refinishing-powder-coating"],
  ["/Services/Powder-Coating", "/wheel-refinishing-powder-coating"],
  ["/Automotive-Services/Powder-Coating", "/wheel-refinishing-powder-coating"],
  ["/Services/Blasting-and-Stripping", "/services#blasting-stripping"],
  ["/Services/Custom-Wheels", "/custom-wheels"],
  ["/Wheels", "/custom-wheels"],
  ["/Wheels/:path+", "/custom-wheels"],
  ["/Services/Factory-Take-Off-Wheels-and-Tires", "/services#factory-take-offs"],
  ["/Services/Professional-Road-Force-Balance", "/services#road-force-balancing"],
  ["/Automotive-Services/Professional-Road-Force-Balance", "/services#road-force-balancing"],
  ["/Services/Tire-Storage", "/services#tire-storage"],
  ["/Automotive-Services/Tire-Storage", "/services#tire-storage"],
  ["/Services/cat/tire-pressure-monitoring-system-tpms", "/services#tpms-nitrogen"],
  ["/Automotive-Services/cat/tire-pressure-monitoring-system-tpms", "/services#tpms-nitrogen"],
  ["/Services/cat/nitrogen-inflation", "/services#tpms-nitrogen"],
  ["/Automotive-Services/cat/nitrogen-inflation", "/services#tpms-nitrogen"],
  ["/Services/cat/tire-services", "/tires"],
  ["/Automotive-Services/cat/tire-services", "/tires"],
  ["/Services/cat/:path+", "/services"],
  ["/Services/Diagnostic-Center", "/contact"],
  ["/Automotive-Services", "/services"],
  ["/Tires/:path+", "/tires"],
  ["/shop-for-tires.aspx", "/tires"],
  ["/About/Photo-Gallery", "/gallery"],
  ["/About/Photo-Gallery/ID/54", "/gallery#customer-rides"],
  ["/About/Photo-Gallery/:path+", "/gallery"],
  ["/About/Videos", "/gallery"],
  ["/About/Reviews", "/#reviews-title"],
  ["/About/News", "/about"],
  ["/About/News/:path+", "/about"],
  ["/Contact-Us", "/contact"],
  ["/Contact-Us/Find-Us", "/contact"],
  ["/Contact-Us/Jobs", "/contact"], // VERIFY: owner may want a careers page
  ["/Contact/Find-Us", "/contact"],
  ["/sitemap.aspx", "/sitemap.xml"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return legacy.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/video/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
      { source: "/media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
    ];
  },
};

export default nextConfig;
