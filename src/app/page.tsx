import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { HeroVisual } from "@/components/marketing/hero-visual";
import { Section, SectionHeader } from "@/components/marketing/section";
import { ServiceAreaMap } from "@/components/marketing/service-area-map";
import { ServiceCards } from "@/components/marketing/service-cards";
import { HandNote, Scribble } from "@/components/hand";
import { Ruler } from "@/components/ruler";
import { Button } from "@/components/ui/button";
import { cn, usd } from "@/lib/utils";
import { site } from "@/site.config";

const steps = [
  {
    mark: "Ask",
    when: "Day 0",
    title: "Free audit call",
    body: "30 minutes on how customers find you and what eats your week. You leave with a list of quick wins.",
  },
  {
    mark: "Plan",
    when: "Day 1",
    title: "One-page proposal",
    body: "What I'll build, what changes for you, a fixed price and a date. No hourly billing.",
  },
  {
    mark: "Build",
    when: "Week 1–2",
    title: "Build and review",
    body: "A live preview link you can click through, with two rounds of changes before anything goes live.",
  },
  {
    mark: "Scale",
    when: "Ongoing",
    title: "Launch and look after it",
    body: "Your domain connected, a short walkthrough video, then monthly updates, monitoring and small changes.",
  },
];

const faqs = [
  {
    q: "Why are your prices so low?",
    a: "I'm a computer science student building a portfolio of real local work. The lower price is a trade: if you're happy, I ask for a testimonial and a Google review.",
  },
  {
    q: "What does the monthly fee cover?",
    a: "Hosting, security and software updates, uptime monitoring, small text and photo changes, and keeping any automations running.",
  },
  {
    q: "Who owns the website?",
    a: "You do. The domain, content and data are in your name. The monthly service can be cancelled with 30 days' notice.",
  },
  {
    q: "How long does it take?",
    a: "Most websites go live in one to two weeks once I have your content and photos. Each automation adds a few days.",
  },
  {
    q: "Do I need to be good with tech?",
    a: "No. I set everything up, record a short walkthrough, and you can text me for small changes.",
  },
  {
    q: "I already have a website. Can you just add automations?",
    a: "Often, yes. On the audit call we'll look at what you have and whether it's worth keeping.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-10">
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28">
          <div className="animate-rise">
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pr-3 pl-1 text-xs text-muted-foreground shadow-[var(--shadow-soft)] transition-colors hover:text-foreground"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-foreground px-2 py-0.5 font-medium text-background">
                <span className="size-1.5 rounded-full bg-success" />
                Open
              </span>
              Taking new clients · websites from {usd(site.pricing[0].setup)}
              <ArrowRight className="size-3" />
            </Link>
            <h1 className="font-display mt-7 text-[2.9rem] leading-[1] font-medium sm:text-[4.2rem] lg:text-[4.6rem]">
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
                <Link href="/#services">See what I build</Link>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                ["1–2 wks", "to go live"],
                ["Fixed", "pricing"],
                ["You own", "everything"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-[15px] font-semibold tracking-tight">{v}</dd>
                  <dd className="text-sm text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
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

      {/* Services */}
      <Section id="services">
        <SectionHeader
          index="01"
          label="Services"
          title="Everything a local business needs online. Nothing it doesn't."
          body="Start with a website, then add the automations that actually save you time. Each piece is built once and reused, so you get it fast and at a fair price."
        />
        <div className="mt-14">
          <ServiceCards />
        </div>
      </Section>

      {/* Process */}
      <Section id="process" className="bg-card">
        <SectionHeader
          index="02"
          label="Process"
          title={<>Ask on day 0. Live in about two weeks.</>}
          body="No long discovery phase or jargon. You always know what's next and what it costs."
        />
        <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-0">
          {steps.map((step, i) => (
            <li key={step.title} className="relative md:pr-8">
              <div className="flex h-20 items-end gap-3">
                <span
                  className={cn(
                    "w-1 rounded-full",
                    i === steps.length - 1 ? "bg-accent" : "bg-foreground",
                  )}
                  style={{ height: `${28 + i * 14}px` }}
                />
                <span className="font-display text-4xl font-medium italic leading-none">{step.mark}</span>
              </div>
              <Ruler className="mt-3 text-foreground/20" />
              <p className="mt-5 font-mono text-xs text-muted-foreground">{step.when}</p>
              <h3 className="mt-1.5 font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Pricing */}
      <Section id="pricing">
        <SectionHeader
          index="03"
          label="Pricing"
          title="Two plans. One-time setup, small monthly fee."
          body="Fixed prices, agreed before any work starts. Cancel the monthly service anytime with 30 days' notice."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {site.pricing.map((plan) => {
            const featured = "featured" in plan && plan.featured;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-7 sm:p-8",
                  featured
                    ? "border-foreground bg-foreground text-background shadow-[var(--shadow-float)]"
                    : "border-border bg-card",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
                  {featured && (
                    <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] text-accent-foreground">
                      Recommended
                    </span>
                  )}
                </div>
                <p className={cn("mt-2 text-sm", featured ? "text-background/65" : "text-muted-foreground")}>
                  {plan.blurb}
                </p>
                <div className="mt-8 flex items-end gap-3">
                  <p className="font-display text-6xl font-medium tabular-nums">{usd(plan.setup)}</p>
                  <p className={cn("pb-1.5 text-sm", featured ? "text-background/65" : "text-muted-foreground")}>
                    setup
                    <br />+ {usd(plan.monthly)}/mo
                  </p>
                </div>
                <ul
                  className={cn(
                    "mt-8 flex-1 space-y-3 border-t pt-6 text-sm",
                    featured ? "border-background/15" : "border-border",
                  )}
                >
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-accent" : "text-foreground")} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "mt-8 w-full",
                    featured && "bg-background text-foreground hover:bg-background/90",
                  )}
                  variant={featured ? "default" : "outline"}
                >
                  <Link href={site.bookingUrl}>Start with a free audit</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Service area */}
      <Section id="area">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="font-hand text-2xl leading-none text-accent">Where I work</p>
            <h2 className="font-display mt-3 text-[2.1rem] leading-[1.05] font-medium text-balance sm:text-5xl">
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
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:p-6">
            <ServiceAreaMap />
          </div>
        </div>
      </Section>

      {/* About */}
      <Section id="about" className="bg-card">
        <div className="grid items-center gap-12 md:grid-cols-[auto_1fr] md:gap-20">
          <figure className="mx-auto w-56 -rotate-2 rounded-sm bg-card p-3 pb-4 shadow-[var(--shadow-float)] md:mx-0">
            {/* Swap for a real photo: put it in /public and use next/image here. */}
            <div className="font-display flex aspect-[4/5] items-center justify-center rounded-[2px] bg-gradient-to-br from-accent-soft via-muted to-[#e4dccb] text-7xl font-medium italic text-accent/80">
              {site.owner.slice(0, 1)}
            </div>
            <figcaption className="mt-3 text-center font-hand text-2xl leading-none">
              {site.owner} · Richardson, TX
            </figcaption>
          </figure>
          <div className="max-w-2xl">
            <p className="font-hand text-2xl leading-none text-accent">About</p>
            <p className="font-display mt-3 text-[1.75rem] leading-[1.2] text-balance sm:text-4xl">
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

      {/* FAQ */}
      <Section id="faq">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-hand text-2xl leading-none text-accent">FAQ</p>
            <h2 className="font-display mt-3 text-[2.1rem] leading-[1.05] font-medium sm:text-5xl">
              Questions, answered.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Something else?{" "}
              <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-4">
                Email me
              </a>
              .
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="relative size-3 shrink-0 text-muted-foreground">
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="-mt-1 pb-5 text-muted-foreground text-pretty">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
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
