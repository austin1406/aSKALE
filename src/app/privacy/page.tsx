import type { Metadata } from "next";

import { site } from "@/site.config";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6 md:py-24 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-3 [&_p]:text-muted-foreground">
      <h1 className="text-4xl font-semibold tracking-[-0.04em]">Privacy policy</h1>
      <p>Last updated: November 2026</p>

      <h2>What we collect</h2>
      <p>
        When you fill in the contact form or book a call, we collect your name, email, phone number
        (if given), business name and your message. We use basic, privacy-friendly analytics to count
        page visits.
      </p>

      <h2>How we use it</h2>
      <p>
        Only to reply to you, schedule calls, and send you a proposal you asked for. We never sell
        your information or add you to mailing lists without asking.
      </p>

      <h2>Who processes it</h2>
      <p>
        Your details are stored with Supabase (database), emails are sent through Resend, bookings
        are handled by Cal.com, and the site is hosted on Vercel.
      </p>

      <h2>Your choices</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> to see, correct or delete the
        information we hold about you.
      </p>
    </article>
  );
}
