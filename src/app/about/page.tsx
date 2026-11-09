import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/Section";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, Parallax } from "@/components/Motion";
import { pageMeta } from "@/lib/seo";
import { site, yearsInBusiness } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Wheel Werks — Family-Owned Since 1986",
  description: "Wheel Werks Inc. was founded in Salt Lake City in 1986 by Mike Pruess. Learn about our apprenticeship-trained crew, in-house equipment and one-location shop on 3900 South.",
  path: "/about",
  image: "/media/shop/storefront.jpg",
});

const timeline = [
  { y: "Early career", t: "From \"tire busting\" up", b: "Mike Pruess works his way up in the wheel and tire business — from busting tires to supervisory roles." },
  { y: String(site.foundedYear), t: "Wheel Werks Inc. is born", b: "Mike sees an opportunity in the market and becomes the \"chief cook and bottle washer,\" calling his own shots." },
  { y: "Today", t: "Still innovating", b: "Serving performance enthusiasts, truck owners and daily drivers with technology built for the most demanding wheel and tire combinations." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Since ${site.foundedYear}`}
        title="A lifetime in wheels & tires."
        lede={`${yearsInBusiness()} years. One location. A crew that stays. Wheel Werks is a family-owned Salt Lake City shop built by someone who has spent an entire career in this business.`}
        image="/media/shop/storefront.jpg"
        imageAlt="Wheel Werks shop exterior on 3900 South in Salt Lake City"
        crumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]}
      />

      <section aria-labelledby="story" className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow="Our story" title="Built on an apprenticeship" id="story">
            <p>Wheel Werks Inc. was founded in {site.foundedYear} by Mike Pruess. Mike has spent his entire career in the wheel and tire business, and early on he saw an opportunity in the market. Capitalizing on it, Wheel Werks was born.</p>
            <p className="mt-4">To this day we keep innovating in a changing market — for the performance enthusiast, for the car or truck owner who takes pride in &ldquo;their baby,&rdquo; and for the driver who just needs to get from here to there. Every one of them benefits from technology developed for the most expensive wheel and tire combinations.</p>
            <p className="mt-4">We still use the same apprenticeship approach Mike learned from — the difference is that our people now learn from a true wheel and tire master. Turnover is very low for our industry: our team has been here for years and knows our equipment inside and out.</p>
          </SectionHeading>
          <Reveal delay={0.1}>
            <Parallax className="aspect-[4/3] rounded-2xl border border-white/[0.07]" strength={40}>
              <Image src="/media/shop/showroom-wheel-wall.jpg" alt="Inside the Wheel Werks showroom" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </Parallax>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="timeline" className="border-y border-white/[0.06] bg-carbon py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Timeline" title="How we got here" id="timeline" />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.t} delay={i * 0.1} className="panel p-8">
                <p className="font-display text-4xl font-bold text-signal">{t.y}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold uppercase">{t.t}</h3>
                <p className="mt-2 leading-relaxed text-silver/75">{t.b}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="visit" className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.07]">
              <Image src="/media/shop/storefront.jpg" alt="Wheel Werks storefront" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <SectionHeading eyebrow="One location" title="Find us on 3900 South" id="visit">
            <p>{site.address.street}, {site.address.city} — {site.address.landmark.toLowerCase()}. Enjoy free Wi-Fi while you wait.</p>
            <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">Get directions</a>
          </SectionHeading>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
