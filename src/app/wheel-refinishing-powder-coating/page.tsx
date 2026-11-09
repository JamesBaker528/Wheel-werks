import { ServicePageView, servicePage } from "@/components/ServicePageView";
import { pageMeta } from "@/lib/seo";

const page = servicePage("wheel-refinishing-powder-coating");
export const metadata = pageMeta({ title: page.metaTitle, description: page.metaDescription, path: "/wheel-refinishing-powder-coating", image: "/og/wheel-refinishing-powder-coating.jpg" });

export default function Page() {
  return <ServicePageView page={page} />;
}
