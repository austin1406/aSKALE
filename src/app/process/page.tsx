import type { Metadata } from "next";

import { Section, SectionHeader } from "@/components/marketing/section";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { ClosingCta } from "@/components/marketing/closing-cta";

export const metadata: Metadata = {
  title: "Process",
  description: "Ask on day 0, live in about two weeks. No long discovery phase or jargon — you always know what's next and what it costs.",
};

export default function ProcessPage() {
  return (
    <>
      <Section>
        <SectionHeader
          title={<>Ask on day 0. Live in about two weeks.</>}
          body="No long discovery phase or jargon. You always know what's next and what it costs."
        />
        <ProcessSteps variant="full" />
      </Section>

      <ClosingCta
        title="Ready to start the clock?"
        body="Book the free audit call and we'll have a fixed-price proposal in your inbox the next day."
        secondaryHref="/pricing"
        secondaryLabel="See pricing"
      />
    </>
  );
}
