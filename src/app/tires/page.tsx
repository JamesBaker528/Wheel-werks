import { ServicePageView, servicePage } from "@/components/ServicePageView";
import { pageMeta } from "@/lib/seo";

const page = servicePage("tires");
export const metadata = pageMeta({ title: page.metaTitle, description: page.metaDescription, path: "/tires", image: page.heroImage.src });

export default function Page() {
  return <ServicePageView page={page} />;
}
