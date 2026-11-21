import type { Metadata } from "next";
import { Check } from "lucide-react";

import { LogoMark } from "@/components/logo";
import { Section } from "@/components/marketing/section";
import { ServiceAreaMap } from "@/components/marketing/service-area-map";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "About",
  description: `${site.owner} builds ${site.name}: real software for the shops, salons, clinics and contractors around ${site.areaServed.slice(0, 2).join(" and ")}.`,
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-[auto_1fr] md:gap-20">
          <figure className="mx-auto w-56 -rotate-2 rounded-sm bg-card p-3 pb-4 shadow-[var(--shadow-float)] md:mx-0">
            <div className="flex aspect-[4/5] items-center justify-center rounded-[2px] bg-gradient-to-br from-accent-soft via-muted to-[#e4dccb]">
              <LogoMark className="size-28" />
            </div>
            <figcaption className="mt-3 text-center font-hand text-2xl leading-none">
              {site.owner} · Richardson, TX
            </figcaption>
          </figure>
          <div className="max-w-2xl">
            <p className="font-display text-[1.75rem] leading-[1.2] text-balance sm:text-4xl">
              I&apos;m a computer science student building real software for the shops, salons,
              clinics and contractors around Richardson and Irving.
            </p>
            <p className="mt-6 text-muted-foreground text-pretty">
              My prices are low on purpose: I&apos;m building a portfolio of local work. You get a
              modern website and tools that save you time, built with the same stack software
              companies use. I get a project I&apos;m proud to show. If it works for you, I&apos;ll
              ask for a review.
            </p>
            <p className="mt-6 font-hand text-3xl text-accent">– {site.owner}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.15fr]">
          <div>
            <h2 className="font-display text-[2.1rem] leading-[1.05] font-medium text-balance sm:text-5xl">
              Local, and happy to stop by.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground text-pretty">
              Based between Richardson and Irving, working with businesses across north Dallas:
              Plano, Addison, Carrollton, Las Colinas, Garland and Dallas. We can meet at your shop,
              or do everything over a call.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {["Free audit, on a call or in person", "Replies within one business day", "Text me for small changes"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="size-4 text-accent" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-background p-4 shadow-[var(--shadow-soft)] sm:p-6">
            <ServiceAreaMap />
          </div>
        </div>
      </Section>

      <ClosingCta
        title="Let's see if it's a fit."
        body="A free 30-minute audit, on a call or in person, with no pressure to buy anything."
        secondaryHref="/services"
        secondaryLabel="See services"
      />
    </>
  );
}
