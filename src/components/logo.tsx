import { cn } from "@/lib/utils";
import { site } from "@/site.config";

/**
 * The Measuring A. The right leg is a ruler climbing to the peak:
 * measure first (ask), then rise (scale). Left leg = ink, ruler = terracotta.
 * Source files: "Personal Website/logos/askale-*.svg" in the project files.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={cn("size-9", className)}>
        <rect x="38" y="76" width="44" height="12" fill="var(--foreground)"/>
        <path d="M60 14 L60 56 L40 106 H22 Z" fill="var(--foreground)"/>
        <path d="M60 14 L98 106 H80 L60 56 Z" fill="var(--accent)"/>
        <line x1="70.66" y1="41.91" x2="63.54" y2="44.84" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="73.24" y1="48.16" x2="69.36" y2="49.76" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="75.83" y1="54.42" x2="71.95" y2="56.02" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="78.41" y1="60.67" x2="71.30" y2="63.61" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="81.00" y1="66.93" x2="77.11" y2="68.53" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="83.58" y1="73.19" x2="79.70" y2="74.79" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="86.16" y1="79.44" x2="79.05" y2="82.38" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="88.75" y1="85.70" x2="84.87" y2="87.30" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="91.33" y1="91.95" x2="87.45" y2="93.56" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="93.92" y1="98.21" x2="86.80" y2="101.15" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <LogoMark />
      <span className="text-[23px] leading-none font-bold tracking-[-0.045em]">{site.name.toLowerCase()}</span>
    </span>
  );
}
