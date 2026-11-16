import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Globe,
  MessageSquareText,
  PhoneMissed,
  Star,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, usd } from "@/lib/utils";
import { site } from "@/site.config";

const problems = [
  "Your website is slow, outdated, or hard to use on a phone",
  "Customers have to call during business hours to book",
  "Missed calls turn into lost jobs",
  "Reviews pile up with no reply, or never get asked for",
];

const services = [
  {
    icon: Globe,
    title: "Websites that bring in calls",
    body: "Fast, mobile-first sites with your services, hours and a clear way to reach you. Built so Google can find you locally.",
  },
  {
    icon: CalendarCheck,
    title: "Online booking",
    body: "Customers book a time themselves, any hour. Reminders go out automatically so fewer people no-show.",
  },
  {
    icon: PhoneMissed,
    title: "Missed-call text-back",
    body: "Miss a call while you're on a job? The caller gets a friendly text right away, so they don't call the next shop.",
  },
  {
    icon: Star,
    title: "Review requests",
    body: "After each job, customers get a simple link to leave a Google review. More reviews, better ranking.",
  },
  {
    icon: MessageSquareText,
    title: "AI chat for your FAQs",
    body: "A chat on your site that answers the questions you hear every day, using your own prices and policies.",
  },
  {
    icon: Zap,
    title: "Custom automations",
    body: "Something eating your week? Quotes, follow-ups, reports. If it's repetitive, we can probably automate it.",
  },
];

const steps = [
  {
    title: "Free 30-minute audit call",
    body: "We talk about how customers find you and what takes up your time. I'll point out the quickest wins.",
  },
  {
    title: "A one-page proposal",
    body: "Within 24 hours: what I'll build, what changes for you, a fixed price and a timeline. No hourly billing.",
  },
  {
    title: "Build and review",
    body: "You get a live preview link and two rounds of changes. You approve before anything goes live.",
  },
  {
    title: "Launch and look after it",
    body: "I connect your domain, show you how everything works, and keep it running and updated every month.",
  },
];

const faqs = [
  {
    q: "Why are your prices so low?",
    a: "I'm a computer science student building a portfolio of local work. In exchange for the lower price, I ask happy clients for a testimonial and a Google review.",
  },
  {
    q: "What does the monthly fee cover?",
    a: "Hosting, security and software updates, uptime monitoring, small content changes, and keeping any automations running.",
  },
  {
    q: "Who owns the website?",
    a: "You do. Your domain, content and data are in your name, and you can cancel the monthly service with 30 days' notice.",
  },
  {
    q: "How long does it take?",
    a: "Most websites go live in one to two weeks once I have your content and photos. Automations add a few days each.",
  },
  {
    q: "Do I need to be good with tech?",
    a: "No. I set everything up, record a short walkthrough video, and you can text me for small changes.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 md:grid-cols-[1.25fr_1fr] md:items-center md:pt-24">
          <div>
            <Badge>
              <span className="size-1.5 rounded-full bg-accent" />
              Local to {site.areaServed.slice(0, 2).join(" & ")}
            </Badge>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
              More calls and bookings, <span className="italic text-accent">less busywork.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
              I build fast websites and simple automations for local businesses, at fixed prices
              that make sense for a small shop. No contracts, no jargon.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href={site.bookingUrl}>
                  Book a free 30-minute audit <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#pricing">See pricing</Link>
              </Button>
            </div>
          </div>

          <Card className="p-6 shadow-[0_1px_0_#e4ded3,0_20px_50px_-25px_rgba(22,25,29,0.25)] sm:p-8">
            <p className="text-sm font-medium text-muted-foreground">Sound familiar?</p>
            <ul className="mt-4 space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] leading-snug">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
              Each of these is fixable in days, not months.
            </p>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-20 border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow="Services" title="Pick what helps, skip what doesn't" />
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon className="size-6 text-accent" strokeWidth={1.75} />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow="How it works" title="From first call to live, in four steps" />
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="border-t-2 border-foreground pt-5">
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="Pricing"
            title="Two simple options. Fixed prices."
            body="A one-time setup fee, then a small monthly fee for hosting, updates and support. Cancel anytime with 30 days' notice."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {site.pricing.map((plan) => {
              const featured = "featured" in plan && plan.featured;
              return (
                <Card
                  key={plan.id}
                  className={cn(
                    "flex flex-col",
                    featured && "border-foreground bg-primary text-primary-foreground",
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      {featured && (
                        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                          Most value
                        </span>
                      )}
                    </div>
                    <CardDescription className={cn(featured && "text-primary-foreground/70")}>
                      {plan.blurb}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="flex items-baseline gap-2">
                      <span className="font-display text-5xl font-semibold">{usd(plan.setup)}</span>
                      <span className={cn("text-sm", featured ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        setup
                      </span>
                    </p>
                    <p className={cn("mt-1 text-sm", featured ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      then {usd(plan.monthly)}/month
                    </p>
                    <ul className="mt-6 flex-1 space-y-3 text-sm">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="mt-8 w-full"
                      variant={featured ? "accent" : "default"}
                    >
                      <Link href={site.bookingUrl}>Start with a free audit</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="About" title={`Hi, I'm ${site.owner}.`} align="left" />
          <div className="space-y-4 text-lg text-muted-foreground text-pretty">
            <p>
              I&apos;m a computer science student working with businesses around Richardson and
              Irving. I build the same kind of software I study, but for the shops, salons,
              clinics and contractors down the street.
            </p>
            <p>
              My prices are low on purpose: I&apos;m building a portfolio of real local work. You
              get a modern website and tools that save you time, and I get a project I&apos;m proud
              to show. If it works for you, I&apos;ll ask for a review.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-border bg-card">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-10 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {f.q}
                  <span className="text-xl text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Not sure what you need?
            </h2>
            <p className="mt-2 text-primary-foreground/70">
              Book a free 30-minute call. You&apos;ll leave with a list of quick wins, whether you hire me or not.
            </p>
          </div>
          <Button asChild size="lg" variant="accent">
            <Link href={site.bookingUrl}>
              Book a free audit <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="text-sm font-medium uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {body && <p className="mt-4 text-muted-foreground text-pretty">{body}</p>}
    </div>
  );
}
