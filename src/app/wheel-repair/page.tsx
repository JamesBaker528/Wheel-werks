import { ServicePageView, servicePage } from "@/components/ServicePageView";
import { pageMeta } from "@/lib/seo";

const page = servicePage("wheel-repair");
export const metadata = pageMeta({ title: page.metaTitle, description: page.metaDescription, path: "/wheel-repair", image: page.heroImage.src });

export default function Page() {
  return <ServicePageView page={page} />;
}
