import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";

import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a free 30-minute audit call with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.2fr] md:py-24">
      <div>
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-accent">●</span> Contact
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-[3.25rem] sm:leading-[1.02]">
          Book a free 30-minute audit
        </h1>
        <p className="mt-5 text-lg text-muted-foreground text-pretty">
          Tell me a little about your business. We&apos;ll hop on a call, look at how customers find
          you today, and I&apos;ll point out the quickest wins. No pressure to buy anything.
        </p>
        <ul className="mt-8 space-y-4 text-muted-foreground">
          <li className="flex items-center gap-3">
            <Mail className="size-5 text-accent" />
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              {site.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="size-5 text-accent" />
            {site.areaServed.join(" · ")}
          </li>
          <li className="flex items-center gap-3">
            <Clock className="size-5 text-accent" />
            Replies within one business day
          </li>
        </ul>
      </div>

      {/* The contact form (Zod + Turnstile + rate limit + Supabase + Resend) and the
          Cal.com booking embed land here in the next pull requests. */}
      <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground shadow-[var(--shadow-soft)]">
        <p className="font-medium text-foreground">Contact form and booking calendar coming next.</p>
        <p className="mt-2">
          For now, email{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
            {site.email}
          </a>{" "}
          and I&apos;ll get back to you.
        </p>
      </div>
    </section>
  );
}
