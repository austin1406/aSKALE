import Link from "next/link";

import { Logo } from "@/components/logo";
import { site } from "@/site.config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_0.9fr_0.9fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">{site.description}</p>
        </div>
        <FooterCol title="Site">
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/process">Process</Link>
        </FooterCol>
        <FooterCol title="Company">
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/privacy">Privacy</Link>
        </FooterCol>
        <FooterCol title="Contact">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href={site.bookingUrl}>Book a free audit</Link>
          <span>{site.areaServed.slice(0, 2).join(" · ")}</span>
        </FooterCol>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 font-mono text-xs text-muted-foreground sm:px-6">
          {site.name} · Built in Texas
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <div className="mt-3 flex flex-col gap-2.5 text-sm text-muted-foreground [&_a:hover]:text-foreground [&_a]:rounded-sm [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-2 [&_a]:focus-visible:ring-ring">
        {children}
      </div>
    </div>
  );
}
