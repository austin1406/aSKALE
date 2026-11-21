import type { Metadata } from "next";

import { Section, SectionHeader } from "@/components/marketing/section";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Fixed prices for local businesses in ${site.areaServed.slice(0, 2).join(" and ")}: a ${"$" + site.pricing[0].setup} website or a ${"$" + site.pricing[1].setup} website with automations, no long contracts.`,
};

export default function PricingPage() {
  return (
    <Section>
      <SectionHeader
        title="Two plans. One-time setup, small monthly fee."
        body="Fixed prices, agreed before any work starts. Cancel the monthly service anytime with 30 days' notice."
      />
      <PricingCards variant="full" />
    </Section>
  );
}
