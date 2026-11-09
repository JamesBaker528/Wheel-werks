import { site, fullAddress } from "./site";

export const businessId = `${site.url}/#business`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TireShop", "AutoRepair"],
    "@id": businessId,
    name: site.name,
    url: site.url,
    image: `${site.url}/media/shop/storefront.jpg`,
    logo: `${site.url}/media/logo.png`,
    telephone: "+1-801-268-4132",
    faxNumber: "+1-801-268-4345",
    email: site.email,
    foundingDate: String(site.foundedYear),
    founder: { "@type": "Person", name: site.founder },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.links.googleBusiness,
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.schema,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: site.serviceAreas.map((a) => ({ "@type": "Place", name: `${a}, UT` })),
    sameAs: [site.links.facebook, site.links.instagram, site.links.yelp],
    description: `Wheel and tire specialists in Salt Lake City since ${site.foundedYear}. ${fullAddress}.`,
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": businessId },
    areaServed: { "@type": "City", name: "Salt Lake City" },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}
