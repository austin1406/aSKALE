import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { site } from "@/site.config";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={site.bookingUrl}>Book a free audit</Link>
          </Button>

          {/* Mobile menu: native <details>, no client JS needed. */}
          <details className="group relative md:hidden">
            <summary
              aria-label="Open menu"
              className="flex size-9 cursor-pointer list-none items-center justify-center rounded-full border border-border bg-card [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-4" />
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-float)]">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild size="sm" className="mt-2 w-full">
                <Link href={site.bookingUrl}>Book a free audit</Link>
              </Button>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
