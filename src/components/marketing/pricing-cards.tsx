import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn, usd } from "@/lib/utils";
import { site } from "@/site.config";

/**
 * The two pricing tiers. `variant="full"` (the /pricing page) lists every feature;
 * `variant="compact"` (the home page teaser) shows the price and blurb only.
 */
export function PricingCards({ variant = "full" }: { variant?: "full" | "compact" }) {
  return (
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

            {variant === "full" ? (
              <>
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
                  className={cn("mt-8 w-full", featured && "bg-background text-foreground hover:bg-background/90")}
                  variant={featured ? "default" : "outline"}
                >
                  <Link href={site.bookingUrl}>Start with a free audit</Link>
                </Button>
              </>
            ) : (
              <Link
                href="/pricing"
                className={cn(
                  "mt-8 inline-flex items-center gap-1.5 border-t pt-6 text-sm font-medium underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  featured
                    ? "border-background/15 text-background hover:text-background/80 focus-visible:ring-offset-foreground"
                    : "border-border text-foreground hover:text-accent focus-visible:ring-offset-background",
                )}
              >
                See what&apos;s included <ArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
