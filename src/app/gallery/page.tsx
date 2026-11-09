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

export const metadata = pageMeta({
  title: "Gallery — Wheel Repair & Powder Coating Work",
  description: "Photos from the Wheel Werks shop in Salt Lake City: powder coated wheels, custom finishes, wheel repair, welding and our showroom.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Craftsmanship you can see."
        lede="Custom colors, two-tone finishes, straightened and welded wheels, and the shop where it all happens."
        image="/media/shop/storefront.jpg"
        imageAlt="Wheel Werks storefront"
        crumbs={[{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }]}
      />
      <section aria-labelledby="ba" className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Before & after" title="Restorations" id="ba">
            <p>Drag the handle, use the arrow keys, or open full screen to compare.</p>
          </SectionHeading>
          <Reveal delay={0.1}><BeforeAfterSlider pairs={beforeAfter} /></Reveal>
        </div>
      </section>
      <section aria-labelledby="shop" className="border-t border-white/[0.06] bg-carbon py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="From the shop" title="Our work" id="shop" />
            <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0"><InstagramIcon className="size-4" /> More on Instagram</a>
          </div>
          <div className="mt-12"><Gallery items={gallery} /></div>
        </div>
      </section>
      <CtaBand title="Picture your wheels here." />
    </>
  );
}
