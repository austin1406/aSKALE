import type { faqs } from "@/lib/content";

/** Accordion list of FAQ entries, shared by the /faq page and the home page teaser. */
export function FaqList({ items }: { items: readonly (typeof faqs)[number][] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="relative size-3 shrink-0 text-muted-foreground">
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform group-open:scale-y-0" />
            </span>
          </summary>
          <p className="-mt-1 pb-5 text-muted-foreground text-pretty">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
