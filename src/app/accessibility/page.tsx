import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "Accessibility", description: "Wheel Werks is committed to an accessible website.", path: "/accessibility" });

export default function Accessibility() {
  return (
    <LegalPage title="Accessibility" updated="DRAFT">
      <p>We want everyone to be able to use this website. It is designed to meet WCAG 2.2 Level AA: keyboard navigation, screen-reader labels, sufficient color contrast and support for reduced-motion settings.</p>
      <p>If anything on the site is hard to use, please call {site.phone} and we&rsquo;ll help you directly and fix the issue.</p>
    </LegalPage>
  );
}
