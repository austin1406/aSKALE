import { cn } from "@/lib/utils";
import { site } from "@/site.config";

/**
 * The Ruler A: an A whose crossbar is a ruler. Measure first (ask), then build (scale).
 * Ink tile, paper A, terracotta ruler.
 */
export function LogoMark({ className }: { className?: string }) {
  const ticks = Array.from({ length: 9 }, (_, i) => 35 + i * 6.25);
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={cn("size-8", className)}>
      <rect x="4" y="4" width="112" height="112" rx="28" fill="var(--foreground)" />
      <g transform="translate(60 62) scale(.78) translate(-60 -60)">
        <path d="M60 16 L96 104 H79 L60 54 L41 104 H24 Z" fill="var(--background)" />
        <rect x="30" y="68" width="60" height="13" rx="2.5" fill="var(--accent)" />
        {ticks.map((x, i) => (
          <line
            key={x}
            x1={x}
            y1="68"
            x2={x}
            y2={i % 4 === 0 ? 77 : 73}
            stroke="var(--background)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[22px] leading-none font-bold tracking-[-0.04em]">{site.name.toLowerCase()}</span>
    </span>
  );
}
