/**
 * Service page content. Every capability below is drawn from wheelwerks.net.
 * Do not add services, prices, turnaround times or guarantees without owner confirmation.
 */
export type Faq = { q: string; a: string };
export type Feature = { title: string; body: string };
export type Step = { title: string; body: string };
export type Img = { src: string; alt: string; kind: "shop" | "stock" };

export type ServicePage = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  heroImage: Img;
  intro: string[];
  features: Feature[];
  benefits: string[];
  process: Step[];
  gallery: Img[];
  faqs: Faq[];
  related: string[];
  quoteService: string; // preselects the quote form
  schemaServiceType: string;
};

const s = (src: string, alt: string): Img => ({ src: `/media/shop/${src}.jpg`, alt, kind: "shop" });
const k = (src: string, alt: string): Img => ({ src: `/media/stock/${src}.jpg`, alt, kind: "stock" });

export const defaultProcess: Step[] = [
  { title: "Reach out", body: "Call, stop by, or send photos of your wheels through our quote form." },
  { title: "Inspection", body: "We look at the wheel or tire in person and explain what can be done — and what can't." },
  { title: "The work", body: "Everything is handled in-house with our own equipment and our own experienced crew." },
  { title: "Back on the road", body: "We mount, balance and check everything before you drive away." },
];

export const services: ServicePage[] = [
  {
    slug: "wheel-repair",
    navLabel: "Wheel Repair",
    eyebrow: "Wheel Repair · Straightening · Welding",
    title: "Bent, cracked or curbed? We bring wheels back.",
    metaTitle: "Wheel Repair & Bent Rim Straightening in Salt Lake City",
    metaDescription:
      "Bent rim straightening, curb rash repair and cracked wheel welding at Wheel Werks in Salt Lake City. In-house equipment, serving the valley since 1986.",
    lede: "One replacement wheel can cost as much as a whole new set — if you can still find it. We can usually repair your damaged wheels for a fraction of that cost.",
    heroImage: s("bent-wheel-on-machine", "Bent alloy wheel mounted on a straightening machine at Wheel Werks"),
    intro: [
      "Wheel styles change every year or so and get discontinued just like vehicle models. When a wheel is bent, cracked or scraped up, replacing a single one can be expensive or impossible.",
      "Our crew straightens wheels professionally on state-of-the-art equipment, to within 5/1000 of an inch. We also weld cracked or broken wheels, then refinish them so the repair disappears.",
    ],
    features: [
      { title: "Bent wheel straightening", body: "Precision straightening to within 5/1000 of an inch on dedicated wheel equipment." },
      { title: "Curb rash repair", body: "We smooth curb rash, fill gouges and machine flat surfaces back to a clean edge." },
      { title: "Cracked wheel welding", body: "Cracked or broken wheels are assessed and, where appropriate, welded and refinished." },
      { title: "Leaking bead seats", body: "Corroded bead seats that slowly leak air are cleaned up and repaired." },
      { title: "Machining & refinishing", body: "After repair, we refinish or machine the face so the wheel looks right again." },
      { title: "Honest assessment", body: "Not every wheel should be repaired. We'll tell you when replacement is the better call." },
    ],
    benefits: [
      "Save hundreds compared to replacing a discontinued wheel",
      "Keep your matched factory set",
      "Fix vibration and slow leaks at the source",
      "Repair and refinish under one roof",
    ],
    process: [
      { title: "Send photos or stop by", body: "Photos help us give you an idea of what's involved before you come in." },
      { title: "Damage assessment", body: "We inspect the wheel on the machine to check bends, cracks and bead seats." },
      { title: "Straighten, weld & machine", body: "The wheel is straightened, welded if needed, and surfaces are machined." },
      { title: "Refinish, mount & balance", body: "We refinish to match, mount the tire and balance the assembly." },
    ],
    gallery: [
      s("bent-wheel-on-machine", "Bent wheel being assessed on shop equipment"),
      s("wheel-welding", "Technician welding a cracked aluminum wheel"),
      s("wheel-repair-detail", "Wheel repair in progress at Wheel Werks"),
    ],
    faqs: [
      { q: "Can a bent rim really be straightened safely?", a: "In many cases, yes. We straighten wheels on dedicated equipment to within 5/1000 of an inch. If a wheel is too far gone, we'll tell you and help you find a replacement." },
      { q: "Do you repair cracked wheels?", a: "We weld cracked or broken wheels where a repair is appropriate, then refinish them. Every cracked wheel needs to be assessed in person first." },
      { q: "Can you fix curb rash?", a: "Yes. We smooth curb rash, fill gouges, and machine or refinish the face so it matches the rest of the wheel." },
      { q: "My tire keeps losing air — could it be the wheel?", a: "It might be. Corroded or damaged bead seats are a common cause of slow leaks, and we repair those too." },
      { q: "How much does wheel repair cost?", a: "It depends on the wheel and the damage. Send us photos through the quote form or call (801) 268-4132 and we'll walk you through it." },
    ],
    related: ["wheel-refinishing-powder-coating", "services", "tires"],
    quoteService: "wheel-repair",
    schemaServiceType: "Wheel repair",
  },
  {
    slug: "wheel-refinishing-powder-coating",
    navLabel: "Refinishing & Powder Coating",
    eyebrow: "Refinishing · Powder Coating · Polishing",
    title: "Factory-fresh or completely yours.",
    metaTitle: "Wheel Refinishing & Powder Coating in Salt Lake City, Utah",
    metaDescription:
      "In-house wheel powder coating, painting, polishing, machining and chrome plating in Salt Lake City. Thousands of colors, factory color matching and custom finishes.",
    lede: "Restore your wheels to the shine they had on day one — or create a look nobody else has. Powder coating, paint, polishing and machining, all done in-house.",
    heroImage: s("powder-coated-colors", "Wheels powder coated in green, orange and blue at Wheel Werks"),
    intro: [
      "Wheel refinishing is the art of re-engineering the look of your wheels. We perform all types of refinishing, from simple painting to polishing, and we can restore wheels to factory condition or build a custom look to fit your style.",
      "Our own paint shop means we can get the color match right. We strip old coatings without damaging the wheel underneath, and we can combine premium paint with machining for a finish you won't see on every other car.",
    ],
    features: [
      { title: "Powder coating", body: "Durable in-house powder coating with thousands of colors available." },
      { title: "Wet painting & color matching", body: "Our own paint shop helps us match factory colors when repairing wheels." },
      { title: "Polishing", body: "Bring back a bright, reflective finish on polished wheels." },
      { title: "Machining", body: "Machined faces and lips for a two-tone or factory diamond-cut look." },
      { title: "Chrome plating", body: "Chrome plating is among the refinishing options we offer — ask us about your wheel." },
      { title: "Blasting & stripping", body: "Automated blasting equipment and chemical stripping remove old finishes cleanly." },
    ],
    benefits: [
      "Factory restoration or fully custom colors",
      "Old finish removed without harming the wheel",
      "Paint and machining combined for exclusive looks",
      "Touch-ups available for minor damage",
    ],
    process: [
      { title: "Pick your look", body: "Bring inspiration photos or match the original. Thousands of colors are available." },
      { title: "Strip & prep", body: "Old coatings are blasted or chemically stripped and any damage is repaired." },
      { title: "Coat, paint or polish", body: "Your finish is applied in our own shop — powder, paint, polish or machining." },
      { title: "Mount & balance", body: "Tires are mounted and balanced so the wheels are ready to drive." },
    ],
    gallery: [
      s("powder-coated-colors", "Custom powder coated wheels in several colors"),
      s("powder-coat-booth", "Wheel being sprayed in the powder coating booth"),
      s("custom-two-tone-wheel", "Gloss black wheel with a yellow two-tone barrel"),
      s("refinishing-shop", "Wheel Werks refinishing shop with blasting cabinet and spray booth"),
    ],
    faqs: [
      { q: "What colors can you powder coat wheels?", a: "Thousands of colors are available, from factory silver to bold custom shades. Bring a reference photo and we'll help you choose." },
      { q: "Can you match my factory finish?", a: "That's one of the reasons we run our own paint shop — to get the color match right when restoring wheels." },
      { q: "Powder coat or paint — which is better?", a: "It depends on the wheel and the look you want. We'll recommend the best finish for your wheel and how you drive." },
      { q: "Do you remove the old finish first?", a: "Yes. We use automated blasting equipment and chemical stripping to remove old coatings without damaging the wheel underneath." },
      { q: "Can you fix curb rash at the same time?", a: "Yes. Repairs are done before refinishing, so you get a straight, clean wheel with a fresh finish." },
    ],
    related: ["wheel-repair", "custom-wheels", "gallery"],
    quoteService: "powder-coating",
    schemaServiceType: "Wheel refinishing and powder coating",
  },
  {
    slug: "custom-wheels",
    navLabel: "Custom Wheels",
    eyebrow: "Custom Wheels · Fitment · Take-offs",
    title: "The right wheel, fitted right.",
    metaTitle: "Custom Wheels & Fitment in Salt Lake City",
    metaDescription:
      "Custom wheels, stock and custom fitment, and factory take-off wheels and tires at Wheel Werks in Salt Lake City. Get expert help choosing the right wheel and finish.",
    lede: "We specialize in stock and custom wheel fitments and applications — new, used, or quality used OEM. Tell us what you drive and how you drive it.",
    heroImage: k("bronze-wheel", "Bronze multi-spoke wheel on a black performance car"),
    intro: [
      "The wheels you choose depend on your vehicle's use and your driving conditions. Talk to our team and we'll give you options that fit — and that look right on your car or truck.",
      "After choosing a wheel, pick a finish: polished, painted, powder coated or chrome plated. And if you're upgrading, we can usually take your factory wheels and tires in exchange toward your new set.",
    ],
    features: [
      { title: "Stock & custom fitment", body: "Help with sizing, offset and fitment for your exact vehicle." },
      { title: "New custom wheels", body: "Access to a wide range of aftermarket wheel brands and styles." },
      { title: "Quality used OEM wheels", body: "Factory take-off wheels and tires, often at lower than new cost." },
      { title: "Take-off exchange", body: "In most cases we'll give you an exchange toward new wheels for your factory set." },
      { title: "Finish options", body: "Polished, painted, powder coated or chrome — or have us customize them." },
      { title: "Mount, balance & install", body: "We mount tires, balance the assembly and install it on your vehicle." },
    ],
    benefits: [
      "Fitment expertise for cars, trucks and SUVs",
      "Trade-in value for your factory wheels",
      "Custom finishes from our in-house shop",
      "Tires, wheels and installation in one visit",
    ],
    process: [
      { title: "Tell us about your vehicle", body: "Year, make, model, and the look and use you have in mind." },
      { title: "Choose wheel & finish", body: "We narrow down styles and sizes that fit, then pick a finish." },
      { title: "Exchange your take-offs", body: "Ask about an exchange for your factory wheels and tires." },
      { title: "Mount, balance, install", body: "Your new set goes on balanced and ready to drive." },
    ],
    gallery: [
      s("custom-wheel-display", "Wall of custom wheels in the Wheel Werks showroom"),
      s("showroom-wheel-wall", "Showroom display with aftermarket wheels"),
      s("factory-take-off-wheels", "Factory take-off wheels available at Wheel Werks"),
    ],
    faqs: [
      { q: "Will these wheels fit my vehicle?", a: "Fitment is one of our specialties. Give us your year, make and model and we'll help you find wheels with the right size and offset." },
      { q: "Do you sell used wheels?", a: "Yes — we offer quality used OEM wheels, including factory take-offs, often at a lower cost than new. Call to see what's in stock." },
      { q: "Can I trade in my factory wheels?", a: "In most cases we'll take your factory wheels and/or tires and give you an exchange toward your new ones." },
      { q: "Can you change the finish on new wheels?", a: "Yes. Polished, painted, powder coated or chrome plated — our in-house shop can customize them." },
      { q: "Do you list prices online?", a: "Pricing and availability change often, so request a quote and we'll get you current options." },
    ],
    related: ["tires", "wheel-refinishing-powder-coating", "services"],
    quoteService: "custom-wheels",
    schemaServiceType: "Custom wheel sales and fitment",
  },
  {
    slug: "tires",
    navLabel: "Tires",
    eyebrow: "Tires · Installation · TPMS",
    title: "Tires matched to how you drive.",
    metaTitle: "Tires & Tire Installation in Salt Lake City",
    metaDescription:
      "Tire sales, installation, repair, rotation, computerized balancing, TPMS service and nitrogen inflation at Wheel Werks in Salt Lake City. Top brands, expert advice.",
    lede: "Tires are the only connection between your vehicle and the road. We'll help you choose the right set for Utah weather and your budget — then install it properly.",
    heroImage: k("black-wheel-red-caliper", "Black performance wheel and tire with a red brake caliper"),
    intro: [
      "We carry tires from top brands and help you pick the right one for your vehicle, your driving, and Utah's seasons. Our staff can explain sidewall markings, the right time to replace, and how to get the most life from a set.",
      "Every installation is inflated to the manufacturer's specifications, and we can handle rotation, repair, balancing and TPMS service while you wait — with free Wi-Fi.",
    ],
    features: [
      { title: "Tire sales & installation", body: "Car, truck and SUV tires from leading brands, installed to spec." },
      { title: "Tire repair", body: "We'll check whether a damaged tire can be safely repaired." },
      { title: "Rotation", body: "Regular rotation evens out wear and extends tread life." },
      { title: "Computerized balancing", body: "Computerized wheel balancing, plus Road Force balancing for stubborn vibrations." },
      { title: "TPMS service", body: "Testing and service of tire pressure monitoring systems, including valve components." },
      { title: "Nitrogen inflation", body: "Refill nitrogen-filled tires or switch to nitrogen inflation." },
    ],
    benefits: [
      "Honest advice on the right tire for your vehicle",
      "Installed and inflated to manufacturer spec",
      "Seasonal tire storage available",
      "Wheels, tires and balancing under one roof",
    ],
    process: [
      { title: "Tell us your size & needs", body: "Know your tire size? Great. If not, your year, make and model works." },
      { title: "Compare options", body: "We'll recommend tires by category and brand to match your budget." },
      { title: "Mount & balance", body: "Tires are mounted, balanced and inflated to spec." },
      { title: "TPMS check", body: "We make sure your tire pressure monitoring system is working." },
    ],
    gallery: [
      s("tire-balancing", "Tire on a balancing machine at Wheel Werks"),
      s("tire-storage-racks", "Labeled customer tires on storage racks"),
    ],
    faqs: [
      { q: "Which tire brands do you carry?", a: "We carry tires from leading brands. Call or request a quote with your size and we'll check current availability and pricing." },
      { q: "How often should I check tire pressure?", a: "At least once a month, with cold tires. If you've been driving, give them about three hours to cool before checking." },
      { q: "My TPMS light is on — what should I do?", a: "Check and inflate your tires to the pressure on your door placard. If the light stays on, bring it in and we'll test the system." },
      { q: "Do you store seasonal tires?", a: "Yes. Many customers store snow tires with us. Every set is labeled and inventoried, and we swap them when the weather changes." },
      { q: "Why does my car vibrate at highway speed?", a: "Vibration between roughly 50 and 70 mph is often a balance issue. Our Road Force balancing can find problems a standard balancer misses." },
    ],
    related: ["services", "custom-wheels", "wheel-repair"],
    quoteService: "tires",
    schemaServiceType: "Tire sales and installation",
  },
];

export const extraServices = {
  slug: "services",
  metaTitle: "Road Force Balancing, Tire Storage & More | Salt Lake City",
  metaDescription:
    "Road Force balancing, hub-centric rings, seasonal tire storage, blasting and stripping, factory take-offs, TPMS and nitrogen inflation at Wheel Werks, Salt Lake City.",
  items: [
    {
      id: "road-force-balancing",
      title: "Professional Road Force Balancing",
      img: s("tire-balancing", "Wheel and tire assembly on a balancing machine"),
      body: [
        "Tires that are out of balance cause vibrations at certain speeds. Road Force balancing simulates the weight of the car on the wheel and measures the high, low, stiff and soft spots of the tire, so we can refine where the tire sits on the wheel.",
        "It also measures balance front-to-back and around the circumference, minimizing vibration that a standard balance can miss.",
      ],
      bullets: ["Vibration in the steering wheel, seat or floor at certain speeds", "Shaking between about 50 and 70 mph", "Scalloped or erratic tire wear"],
      bulletsTitle: "Signs you need it",
      quote: "balancing",
    },
    {
      id: "hub-centric-rings",
      title: "Hub-Centric Fitment",
      img: k("black-rim-garage", "Close-up of a black alloy wheel center"),
      body: [
        "Wheels are centered by the hub. If an aftermarket wheel doesn't fit snugly on the hub, it can sit slightly off center — and even tenths of a millimeter can cause vibration.",
        "We can make wheels hub-centric with high-tolerance hub rings that fit the wheel snugly to your vehicle's hub.",
      ],
      quote: "balancing",
    },
    {
      id: "tire-storage",
      title: "Seasonal Tire & Wheel Storage",
      img: s("tire-storage-racks", "Customer tires labeled and stored on racks"),
      body: [
        "Many customers store their snow tires with us during warmer months and swap them when winter arrives. Each set is labeled and inventoried and kept in a secure, controlled environment.",
        "Storage is offered at reasonable rates — call to ask about our storage program.",
      ],
      quote: "tires",
    },
    {
      id: "blasting-stripping",
      title: "Blasting & Stripping",
      img: s("refinishing-shop", "Blasting cabinet and spray booth in the Wheel Werks shop"),
      body: [
        "Need the old finish taken off your wheels? We have professional automated blasting equipment, and we chemically strip wheels too.",
      ],
      quote: "powder-coating",
    },
    {
      id: "factory-take-offs",
      title: "Factory Take-Off Wheels & Tires",
      img: s("factory-take-off-wheels", "Factory take-off wheels for sale"),
      body: [
        "When customers upgrade, we usually take their factory wheels and/or tires in exchange toward the new set. We pass the savings on by selling those take-offs at lower than new cost.",
        "Call to see whether we have what you're looking for in stock.",
      ],
      quote: "custom-wheels",
    },
    {
      id: "tpms-nitrogen",
      title: "TPMS Service & Nitrogen Inflation",
      img: k("gloss-black-wheel", "Gloss black wheel and low-profile tire"),
      body: [
        "During TPMS service we test the system to make sure it's working correctly. If we find damage, we may need to replace valve cores, valve nuts, seals, seal washers or caps.",
        "We also offer nitrogen inflation — refills for nitrogen-filled tires, or switching your tires over.",
      ],
      quote: "tires",
    },
  ],
  faqs: [
    { q: "Is Road Force balancing different from an alignment?", a: "Yes. They're often confused. Balancing addresses weight and uniformity of the wheel-and-tire assembly; alignment addresses suspension angles." },
    { q: "Do hub-centric rings really matter?", a: "If an aftermarket wheel's center bore is larger than your hub, the wheel can sit slightly off center. High-tolerance rings remove that gap." },
    { q: "How does tire storage work?", a: "We label and inventory your tires, store them in a secure controlled space, and swap them when the season changes. Call for current rates." },
  ] as Faq[],
};

export const getService = (slug: string) => services.find((x) => x.slug === slug);
