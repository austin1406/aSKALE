import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/site.config";

/** The small closing-CTA band used at the end of every dedicated sub-page. */
export function ClosingCta({
  title,
  body,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  body: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 rounded-3xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <h2 className="font-display text-2xl font-medium text-balance sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-md text-muted-foreground text-pretty">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {secondaryHref && secondaryLabel && (
            <Button asChild size="lg" variant="outline">
              <Link href={secondaryHref}>
                {secondaryLabel} <ArrowRight />
              </Link>
            </Button>
          )}
          <Button asChild size="lg">
            <Link href={site.bookingUrl}>Book a free audit</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
