import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/Section";
import { Gallery } from "@/components/Gallery";
import { BeforeAfterSlider } from "@/components/BeforeAfter";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Motion";
import { beforeAfter, gallery } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/SocialIcons";
import { RidesShowcase } from "@/components/RidesShowcase";
import { rides, rideAlt } from "@/lib/rides";

const allItems = [
  ...gallery,
  ...rides.map((r, i) => ({ src: r.src, alt: rideAlt(i), category: "Customer Rides" as const, w: r.w, h: r.h })),
];

export const metadata = pageMeta({
  title: "Gallery — Customer Rides, Wheel Repair & Powder Coating",
  description: "90+ customer rides plus photos from the Wheel Werks shop in Salt Lake City: custom wheels, powder coated finishes, wheel repair, welding and our showroom.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Craftsmanship you can see."
        lede="Customer rides, custom colors, two-tone finishes, straightened and welded wheels — and the shop where it all happens."
        image="/media/rides/ride-05.jpg"
        imageAlt="Customer car with custom wheels outside Wheel Werks"
        crumbs={[{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }]}
      />
      <section id="customer-rides" aria-labelledby="rides" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Customer rides" title={<>{rides.length} rides. <span className="text-signal">One shop.</span></>} id="rides">
            <p>Cars, trucks and SUVs from our customers — many photographed right outside the shop on 3900 South. Swipe, use the arrows, or pick a photo from the strip.</p>
          </SectionHeading>
          <Reveal delay={0.1} className="mt-12"><RidesShowcase /></Reveal>
        </div>
      </section>

      <section aria-labelledby="ba" className="border-t border-white/[0.06] bg-carbon py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Before & after" title="Restorations" id="ba">
            <p>Drag the handle, use the arrow keys, or open full screen to compare.</p>
          </SectionHeading>
          <Reveal delay={0.1}><BeforeAfterSlider pairs={beforeAfter} /></Reveal>
        </div>
      </section>
      <section aria-labelledby="shop" className="border-t border-white/[0.06] py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Browse everything" title="All photos" id="shop" />
            <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0"><InstagramIcon className="size-4" /> More on Instagram</a>
          </div>
          <div className="mt-12"><Gallery items={allItems} /></div>
        </div>
      </section>
      <CtaBand title="Picture your wheels here." />
    </>
  );
}
