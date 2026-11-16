import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-16 border-t border-border", className)}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">{children}</div>
    </section>
  );
}

/** Left-aligned heading with a small numbered label, e.g. "01 · Services". */
export function SectionHeader({
  index,
  label,
  title,
  body,
  className,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-[1fr_1fr] md:items-end", className)}>
      <div>
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-accent">{index}</span> · {label}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-[2.75rem] sm:leading-[1.05]">
          {title}
        </h2>
      </div>
      {body && <p className="max-w-md text-muted-foreground text-pretty md:justify-self-end">{body}</p>}
    </div>
  );
}
