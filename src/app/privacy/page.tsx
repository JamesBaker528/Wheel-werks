import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = { ...pageMeta({ title: "Privacy Policy", description: "How Wheel Werks Inc. handles information submitted through this website.", path: "/privacy" }), robots: { index: false } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="DRAFT">
      <p>This draft describes how {site.name} handles information you submit through this website.</p>
      <h2>What we collect</h2>
      <ul><li>Information you enter in the quote form: name, phone, email, vehicle details and notes.</li><li>Photos you choose to upload. Photos are resized in your browser and re-processed on our server, which removes embedded data such as camera details and GPS location.</li><li>Basic technical data (IP address, browser) used to prevent abuse. If analytics is enabled, aggregated usage data via Google Analytics.</li></ul>
      <h2>How we use it</h2>
      <p>Only to respond to your request and provide service. We do not sell your information.</p>
      <h2>How it&rsquo;s handled</h2>
      <p>Quote requests are emailed to the shop through an email delivery provider. Uploaded photos are attached to that email and are not stored on the website&rsquo;s servers. [Owner to confirm: how long emails are retained, and who has access.]</p>
      <h2>Your choices</h2>
      <p>To ask about or delete information you&rsquo;ve sent us, call {site.phone} or email {site.email}.</p>
    </LegalPage>
  );
}
