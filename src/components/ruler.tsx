import { cn } from "@/lib/utils";

/** Tick-mark strip used as a divider and accent across the site. */
export function Ruler({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("ruler h-3 w-full text-foreground/25", className)} />;
}
