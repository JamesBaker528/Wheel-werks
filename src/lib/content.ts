import type { Faq } from "./services";

/**
 * Brands named on wheelwerks.net. Shown as typographic wordmarks (no logos) until
 * the owner confirms current dealer relationships and logo-usage rights.
 * Structured so a catalog/inventory source can replace this list later.
 */
export type Brand = { name: string; category: "Tires" | "Wheels"; positioning: string };

export const tireBrands: Brand[] = [
  { name: "Michelin", category: "Tires", positioning: "Premium touring, performance and truck tires" },
  { name: "Bridgestone", category: "Tires", positioning: "All-season, performance and winter options" },
  { name: "Toyo", category: "Tires", positioning: "Performance and light-truck favorites" },
  { name: "Pirelli", category: "Tires", positioning: "High-performance and luxury fitments" },
  { name: "Nexen", category: "Tires", positioning: "Value-focused everyday tires" },
  { name: "Continental", category: "Tires", positioning: "Touring and performance tires" },
  { name: "BFGoodrich", category: "Tires", positioning: "All-terrain and truck tires" },
  { name: "Firestone", category: "Tires", positioning: "Everyday car, truck and SUV tires" },
  { name: "Kumho", category: "Tires", positioning: "Performance and all-season value" },
  { name: "Uniroyal", category: "Tires", positioning: "Dependable all-season tires" },
];

export const wheelBrands: string[] = [
  "TSW", "American Racing", "Konig", "Fondmetal", "Mickey Thompson", "Dick Cepek", "Cragar", "Drifz",
  "Black Rock", "BMF", "Bravado Performance", "Cruiser Alloy", "Drop Stars", "Fesler", "Focal", "Gear",
  "ICW Racing", "Mamba", "Maxxim", "Monster", "Motiv", "OE Performance", "Pacer", "Platinum", "Privat",
  "RBP", "TIS", "Ultra Wheel", "Worx Alloy",
];

/**
 * Reviews: ONLY add verified reviews with source + permission where required.
 * Never invent text, names, ratings or counts.
 */
export type Review = { quote: string; author: string; source: string; sourceUrl?: string };
export const reviews: Review[] = [
  {
    quote: "I've used Wheel Werks for a few years now and I'm a big fan. They know their business and do wheels right.",
    author: "Customer review",
    source: "Yellow Pages",
    sourceUrl: "https://www.yellowpages.com/salt-lake-city-ut/rim-shops",
  },
];

/** Gallery: real shop photography from the existing site. Replace/add with owner photos. */
export type GalleryItem = { src: string; alt: string; category: "Customer Rides" | "Shop" | "Refinishing" | "Repair" | "Wheels" | "Tires"; w: number; h: number };
export const gallery: GalleryItem[] = [
  { src: "/media/shop/storefront.jpg", alt: "Wheel Werks storefront on 3900 South in Salt Lake City", category: "Shop", w: 1600, h: 1200 },
  { src: "/media/shop/powder-coated-colors.jpg", alt: "Wheels powder coated in green, orange and blue", category: "Refinishing", w: 400, h: 300 },
  { src: "/media/shop/showroom-wheel-wall.jpg", alt: "Showroom wall of aftermarket wheels", category: "Wheels", w: 800, h: 600 },
  { src: "/media/shop/bent-wheel-on-machine.jpg", alt: "Bent wheel on straightening equipment", category: "Repair", w: 400, h: 300 },
  { src: "/media/shop/custom-two-tone-wheel.jpg", alt: "Gloss black wheel with yellow two-tone barrel", category: "Refinishing", w: 400, h: 300 },
  { src: "/media/shop/powder-coat-booth.jpg", alt: "Wheel in the powder coating booth", category: "Refinishing", w: 326, h: 325 },
  { src: "/media/shop/wheel-welding.jpg", alt: "Technician welding an aluminum wheel", category: "Repair", w: 400, h: 231 },
  { src: "/media/shop/custom-wheel-display.jpg", alt: "Custom wheel display racks", category: "Wheels", w: 400, h: 300 },
  { src: "/media/shop/refinishing-shop.jpg", alt: "Refinishing shop with blasting cabinet", category: "Refinishing", w: 400, h: 300 },
  { src: "/media/shop/tire-storage-racks.jpg", alt: "Customer tires labeled on storage racks", category: "Tires", w: 400, h: 188 },
  { src: "/media/shop/tire-balancing.jpg", alt: "Tire on balancing machine", category: "Tires", w: 262, h: 300 },
  { src: "/media/shop/wheel-repair-detail.jpg", alt: "Wheel repair in progress", category: "Repair", w: 400, h: 167 },
  { src: "/media/shop/factory-take-off-wheels.jpg", alt: "Factory take-off wheels in the shop", category: "Wheels", w: 400, h: 300 },
];

/**
 * Before/after pairs. EMPTY until real Wheel Werks photos are supplied.
 * While empty, the slider renders a clearly labeled demonstration.
 */
export type BeforeAfter = { title: string; before: string; after: string; alt: string; service: string };
export const beforeAfter: BeforeAfter[] = [];

export const homeFaqs: Faq[] = [
  { q: "What does Wheel Werks specialize in?", a: "Wheels and tires — repair, straightening, welding, refinishing, powder coating, custom wheels, tire sales and installation, Road Force balancing and seasonal tire storage." },
  { q: "Can you repair a bent or cracked wheel?", a: "Often, yes. We straighten wheels to within 5/1000 of an inch and weld cracked wheels when a repair is appropriate. We'll assess yours in person." },
  { q: "Do I need an appointment?", a: "Call (801) 268-4132 to check timing, or send a quote request with photos and we'll get back to you." },
  { q: "Where are you located?", a: "123 East 3900 South in Salt Lake City — just east of the Astro Burger on State Street. It's our only location." },
  { q: "What are your hours?", a: "Monday through Friday 8 AM–6 PM and Saturday 9 AM–3 PM. Closed Sunday." },
  { q: "Can I send photos of my wheel damage?", a: "Yes. Our quote form lets you upload photos from your phone, which helps us understand the job before you come in." },
];

export const quoteServices = [
  { id: "wheel-repair", label: "Wheel repair", group: "repair" },
  { id: "bent-wheel", label: "Bent wheel", group: "repair" },
  { id: "curb-rash", label: "Curb rash", group: "repair" },
  { id: "cracked-wheel", label: "Cracked wheel assessment", group: "repair" },
  { id: "refinishing", label: "Wheel refinishing", group: "finish" },
  { id: "powder-coating", label: "Powder coating", group: "finish" },
  { id: "custom-wheels", label: "New custom wheels", group: "wheels" },
  { id: "tires", label: "Tires", group: "tires" },
  { id: "balancing", label: "Balancing or vibration issue", group: "balancing" },
  { id: "other", label: "Other", group: "other" },
] as const;
export type QuoteServiceId = (typeof quoteServices)[number]["id"];
