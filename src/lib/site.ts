/**
 * Single source of truth for business facts.
 * Everything here was taken from wheelwerks.net (Nov 2026) — see docs/CONTENT-AUDIT.md.
 * Items marked VERIFY must be confirmed by the owner before launch.
 */
export const site = {
  name: "Wheel Werks Inc.",
  shortName: "Wheel Werks",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.wheelwerks.net").replace(/\/$/, ""),
  foundedYear: 1986,
  founder: "Mike Pruess",
  phone: "(801) 268-4132",
  phoneHref: "tel:+18012684132",
  fax: "(801) 268-4345",
  email: "wheelwerksmatt@gmail.com", // VERIFY: shown on current site; consider a domain address
  address: {
    street: "123 East 3900 South",
    city: "Salt Lake City",
    region: "UT",
    postalCode: "84107",
    country: "US",
    landmark: "Just east of the Astro Burger on State Street",
  },
  geo: { lat: 40.68741, lng: -111.8874 },
  hours: [
    { days: "Monday – Friday", short: "Mon–Fri", open: "8:00 AM", close: "6:00 PM", schema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { days: "Saturday", short: "Sat", open: "9:00 AM", close: "3:00 PM", schema: ["Saturday"], opens: "09:00", closes: "15:00" },
  ],
  closed: "Sunday",
  serviceAreas: ["Salt Lake City", "Midvale", "North Salt Lake", "Salt Lake County", "Davis County", "Utah County"],
  links: {
    googleBusiness:
      "https://www.google.com/maps/place/Wheel+Werks+Inc./@40.6873782,-111.8874316,21z/data=!4m5!3m4!1s0x0:0x6eee72b0d81367ab!8m2!3d40.6874029!4d-111.8873556",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Wheel+Werks+Inc%2C+123+E+3900+S%2C+Salt+Lake+City%2C+UT+84107",
    yelp: "https://www.yelp.com/biz/wheel-werks-salt-lake-city-3",
    facebook: "https://www.facebook.com/WheelWerksUT/",
    instagram: "https://www.instagram.com/wheelwerksslc/",
    ebay: "https://www.ebay.com/usr/blowoutwheels", // from the old site's /Ebay page — VERIFY still active
  },
} as const;

export const yearsInBusiness = () => new Date().getFullYear() - site.foundedYear;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const nav = [
  { href: "/wheel-repair", label: "Wheel Repair" },
  { href: "/wheel-refinishing-powder-coating", label: "Powder Coating" },
  { href: "/custom-wheels", label: "Custom Wheels" },
  { href: "/tires", label: "Tires" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
] as const;
