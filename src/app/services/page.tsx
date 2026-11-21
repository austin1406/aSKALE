import type { Metadata } from "next";

import { Section, SectionHeader } from "@/components/marketing/section";
import { ServiceCards } from "@/components/marketing/service-cards";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Services",
  description: `Websites and automations for local businesses in ${site.areaServed.slice(0, 2).join(" and ")}: booking, missed-call text-back, review requests and AI chat.`,
};

export default function ServicesPage() {
  return (
    <>
      <Section>
        <SectionHeader
          title="Everything a local business needs online. Nothing it doesn't."
          body="Start with a website, then add the automations that actually save you time. Each piece is built once and reused, so you get it fast and at a fair price."
        />
        <div className="mt-14">
          <ServiceCards />
        </div>
      </Section>

      <ClosingCta
        title="See what each tier costs."
        body="Two fixed-price plans, one-time setup plus a small monthly fee."
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />
    </>
  );
}
