import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";

import { CalEmbed } from "@/components/cal-embed";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a free 30-minute audit call with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.2fr] md:py-24">
      <div>
        <p className="font-hand text-2xl leading-none text-accent">Say hello</p>
        <h1 className="font-display mt-4 text-[2.6rem] leading-[1] font-medium text-balance sm:text-6xl">
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

      <div id="book" className="scroll-mt-24 space-y-6">
        <ContactForm />
        {site.calLink && (
          <div>
            <p className="mb-3 font-hand text-2xl text-accent">or pick a time yourself</p>
            <CalEmbed />
          </div>
        )}
      </div>
    </section>
  );
}
