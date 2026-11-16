import { cn } from "@/lib/utils";

/** A hand-drawn underline stroke for emphasis. */
export function Scribble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("h-3 w-full text-accent", className)}
    >
      <path
        d="M3 14 C 60 6, 120 4, 180 8 S 270 14, 297 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A handwritten margin note with a curved arrow. */
export function HandNote({
  children,
  className,
  arrow = "left",
}: {
  children: React.ReactNode;
  className?: string;
  arrow?: "left" | "down";
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-hand text-xl leading-none text-accent", className)}>
      {arrow === "left" && (
        <svg viewBox="0 0 40 24" aria-hidden="true" className="h-5 w-9 shrink-0">
          <path d="M38 6 C 26 2, 12 6, 5 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 9 L 5 17 L 13 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span>{children}</span>
      {arrow === "down" && (
        <svg viewBox="0 0 24 36" aria-hidden="true" className="h-8 w-5 shrink-0">
          <path d="M6 2 C 18 10, 18 22, 10 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M5 26 L 10 33 L 17 29" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}
