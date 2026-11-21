import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { HeroVisual } from "@/components/marketing/hero-visual";
import { Section, SectionHeader } from "@/components/marketing/section";
import { ServiceCards } from "@/components/marketing/service-cards";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { HandNote, Scribble } from "@/components/hand";
import { Ruler } from "@/components/ruler";
import { Button } from "@/components/ui/button";
import { usd } from "@/lib/utils";
import { site } from "@/site.config";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-10">
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28">
          <div className="animate-rise">
            <Link
              href="/pricing"
              className="font-hand inline-block text-xl leading-none text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Taking new clients — websites from {usd(site.pricing[0].setup)}
            </Link>
            <h1 className="font-display mt-5 text-[2.9rem] leading-[1] font-medium sm:text-[4.2rem] lg:text-[4.6rem]">
              <span className="block text-balance">Ask what&apos;s slowing you down.</span>
              <span className="relative mt-1 inline-block italic text-accent">
                Then scale.
                <Scribble className="absolute -bottom-3 left-0" />
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
              I&apos;m {site.owner}, and {site.name} is how I help local businesses in{" "}
              {site.areaServed.slice(0, 2).join(" and ").replaceAll(", TX", "")} get more calls,
              more bookings and fewer hours lost to admin, with fast websites and simple
              automations at fixed prices.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href={site.bookingUrl}>
                  Book a free 30-min audit <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/services">See what I build</Link>
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-border pt-6 text-sm">
              {["1–2 weeks to go live", "Fixed pricing", "You own everything"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-rise [animation-delay:120ms]">
            <HeroVisual />
            <div className="mt-1 flex justify-center sm:justify-start sm:pl-10">
              <HandNote arrow="left" className="-rotate-2">what your customers see (example shop)</HandNote>
            </div>
          </div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between font-hand text-xl leading-none">
            <span className="text-muted-foreground">ask</span>
            <span className="text-accent">then scale →</span>
          </div>
          <Ruler className="mt-2 text-foreground/20" />
        </div>
      </section>

      {/* Services teaser */}
      <Section>
        <SectionHeader
          title="Everything a local business needs online. Nothing it doesn't."
          body="Start with a website, then add the automations that actually save you time."
        />
        <div className="mt-14">
          <ServiceCards variant="compact" />
        </div>
      </Section>

      {/* Process teaser */}
      <Section className="bg-card">
        <SectionHeader
          title={<>Ask on day 0. Live in about two weeks.</>}
          body="No long discovery phase or jargon. You always know what's next and what it costs."
        />
        <ProcessSteps variant="compact" />
      </Section>

      {/* Pricing teaser */}
      <Section>
        <SectionHeader
          title="Two plans. One-time setup, small monthly fee."
          body="Fixed prices, agreed before any work starts. Cancel the monthly service anytime with 30 days' notice."
        />
        <PricingCards variant="compact" />
      </Section>

      {/* Closing CTA */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-foreground px-6 py-14 text-background sm:px-12 sm:py-16">
          <Ruler className="absolute inset-x-0 bottom-0 h-4 text-background/20" />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_auto] md:items-end">
            <div>
              <h2 className="font-display text-4xl leading-[1.02] font-medium text-balance sm:text-6xl">
                Not sure where to start? Ask.
              </h2>
              <p className="mt-4 max-w-lg text-background/65">
                Book a free 30-minute audit. You&apos;ll get a short list of quick wins for your
                business, whether you hire me or not.
              </p>
            </div>
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
              <Link href={site.bookingUrl}>
                Book a free audit <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
