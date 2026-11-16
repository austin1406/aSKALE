import { cn } from "@/lib/utils";
import { site } from "@/site.config";

/** Three rising bars: small business, scaled up. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-6", className)}>
      <rect x="2" y="13" width="5" height="9" rx="1.5" fill="currentColor" opacity="0.35" />
      <rect x="9.5" y="8" width="5" height="14" rx="1.5" fill="currentColor" opacity="0.65" />
      <rect x="17" y="2" width="5" height="20" rx="1.5" fill="var(--accent)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-[-0.02em]">{site.name}</span>
    </span>
  );
}
