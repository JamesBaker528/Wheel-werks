import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Terms of Use", description: "Terms of use for the Wheel Werks Inc. website.", path: "/terms" }), robots: { index: false } };

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="DRAFT">
      <p>Information on this website is provided for general guidance. Services, brands and availability may change; contact the shop to confirm.</p>
      <h2>Quotes</h2>
      <p>Submitting a quote request does not create a contract. Any estimate depends on in-person inspection of your wheels, tires and vehicle.</p>
      <h2>Images</h2>
      <p>Some images on this site are licensed stock photography and are identified as such where they appear alongside shop work.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be directed to the shop by phone.</p>
    </LegalPage>
  );
}
