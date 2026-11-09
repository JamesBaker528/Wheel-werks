import { ServicePageView, servicePage } from "@/components/ServicePageView";
import { SectionHeading } from "@/components/Section";
import { Brands } from "@/components/Brands";
import { pageMeta } from "@/lib/seo";

const page = servicePage("custom-wheels");
export const metadata = pageMeta({ title: page.metaTitle, description: page.metaDescription, path: "/custom-wheels", image: "/og/custom-wheels.jpg" });

export default function Page() {
  return (
    <ServicePageView
      page={page}
      extra={
        <section id="brands" aria-labelledby="brands-title" className="scroll-mt-24 py-20 sm:py-28">
          <div className="container-x">
            <SectionHeading eyebrow="Brands" title="Wheels & tires we work with" id="brands-title" />
            <div className="mt-14"><Brands /></div>
          </div>
        </section>
      }
    />
  );
}
