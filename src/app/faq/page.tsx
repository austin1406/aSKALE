import type { Metadata } from "next";

import { Section } from "@/components/marketing/section";
import { FaqList } from "@/components/marketing/faq-list";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { faqs } from "@/lib/content";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Common questions about ${site.name}'s pricing, process and what's included.`,
};

export default function FaqPage() {
  return (
    <>
      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-[2.1rem] leading-[1.05] font-medium sm:text-5xl">
              Questions, answered.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Something else?{" "}
              <a
                href={`mailto:${site.email}`}
                className="rounded-sm text-foreground underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Email me
              </a>
              .
            </p>
          </div>
          <FaqList items={faqs} />
        </div>
      </Section>

      <ClosingCta
        title="Still deciding?"
        body="The free audit call answers the rest, and there's no pressure to buy anything."
      />
    </>
  );
}
