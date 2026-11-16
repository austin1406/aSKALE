import { cn } from "@/lib/utils";
import { site } from "@/site.config";

/** Three rising bars on a baseline: a scale, measured. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-6", className)}>
      <rect x="2" y="13" width="5" height="8" rx="1.25" fill="currentColor" opacity="0.3" />
      <rect x="9.5" y="8" width="5" height="13" rx="1.25" fill="currentColor" opacity="0.6" />
      <rect x="17" y="2" width="5" height="19" rx="1.25" fill="var(--accent)" />
      <rect x="1" y="22.25" width="22" height="1.25" rx="0.6" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-display text-[23px] font-medium italic leading-none">{site.name.toLowerCase()}</span>
    </span>
  );
}
