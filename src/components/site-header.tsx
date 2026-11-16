import Link from "next/link";

import { Button } from "@/components/ui/button";
import { site } from "@/site.config";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm">
          <Link href={site.bookingUrl}>Book a free audit</Link>
        </Button>
      </div>
    </header>
  );
}
