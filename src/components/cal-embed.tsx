import { site } from "@/site.config";

/**
 * Inline Cal.com booking calendar. Set `calLink` in site.config.ts (e.g. "askale/audit")
 * and it appears; leave it empty and nothing renders.
 */
export function CalEmbed() {
  if (!site.calLink) return null;
  return (
    <iframe
      title="Book a free 30-minute audit call"
      src={`https://cal.com/${site.calLink}?embed=true&theme=light&layout=month_view`}
      className="h-[680px] w-full rounded-2xl border border-border bg-card"
      loading="lazy"
    />
  );
}
