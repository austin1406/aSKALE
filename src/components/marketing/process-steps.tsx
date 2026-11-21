import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Ruler } from "@/components/ruler";
import { cn } from "@/lib/utils";
import { steps } from "@/lib/content";

/** Full four-step process, used on the dedicated /process page and (compact) on the home page. */
export function ProcessSteps({ variant = "full" }: { variant?: "full" | "compact" }) {
  const items = variant === "compact" ? steps.slice(0, 4) : steps;

  return (
    <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-0">
      {items.map((step, i) => (
        <li key={step.title} className="relative md:pr-8">
          <div className="flex h-20 items-end gap-3">
            <span
              className={cn("w-1 rounded-full", i === items.length - 1 ? "bg-accent" : "bg-foreground")}
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
      {variant === "compact" && (
        <li className="relative flex items-end pb-1 md:col-span-4 md:mt-8 md:border-t md:border-border md:pt-6">
          <Link
            href="/process"
            className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-foreground underline underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See the full process <ArrowRight className="size-3.5" />
          </Link>
        </li>
      )}
    </ol>
  );
}
