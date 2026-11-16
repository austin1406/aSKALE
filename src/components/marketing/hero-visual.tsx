import { CalendarCheck, MessageSquare, Star } from "lucide-react";

/**
 * A composed product shot: a sample client website in a browser frame,
 * with the automations around it (text-back, booking, review).
 * The business shown is fictional.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] pt-6 pb-16" aria-hidden="true">
      {/* Browser frame */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-float)]">
        <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
          <span className="size-2.5 rounded-full bg-input" />
          <span className="size-2.5 rounded-full bg-input" />
          <span className="size-2.5 rounded-full bg-input" />
          <span className="ml-3 flex-1 truncate rounded-md bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground">
            northsideplumbing.com
          </span>
        </div>
        <div className="p-5 pb-8 sm:p-7 sm:pb-10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight">Northside Plumbing</span>
            <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground">
              Book online
            </span>
          </div>
          <p className="mt-8 text-[22px] leading-tight font-semibold tracking-[-0.03em] sm:text-[26px]">
            Same-day plumbing in Richardson.
          </p>
          <p className="mt-2 max-w-[80%] text-[13px] text-muted-foreground">
            Licensed, insured, upfront pricing. Book a 2-hour window in under a minute.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {["Today 2–4 PM", "Today 4–6 PM", "Tue 8–10 AM"].map((slot, i) => (
              <span
                key={slot}
                className={
                  i === 0
                    ? "rounded-lg border border-foreground bg-foreground px-2 py-2 text-center text-[11px] font-medium text-background"
                    : "rounded-lg border border-border px-2 py-2 text-center text-[11px] text-muted-foreground"
                }
              >
                {slot}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-end gap-4 border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
            <span className="hidden sm:inline">
              <span className="text-success">●</span> Mobile score 98
            </span>
            <span>Loads in 0.8s</span>
          </div>
        </div>
      </div>

      {/* Missed-call text-back */}
      <div className="absolute bottom-0 -left-1 w-[68%] max-w-[270px] animate-rise rounded-2xl border border-border bg-card p-3.5 shadow-[var(--shadow-float)] [animation-delay:200ms] sm:-left-10">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <MessageSquare className="size-3.5" />
          Missed call · auto-reply sent
        </div>
        <p className="mt-2 rounded-xl rounded-tl-sm bg-muted px-3 py-2 text-[12px] leading-snug">
          Sorry we missed you! Book a time here or reply and we&apos;ll call right back.
        </p>
      </div>

      {/* New booking */}
      <div className="absolute top-0 right-3 animate-rise rounded-2xl border border-border bg-card px-3.5 py-3 shadow-[var(--shadow-float)] [animation-delay:350ms] sm:-right-8">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-accent-soft text-accent">
            <CalendarCheck className="size-3.5" />
          </span>
          <div>
            <p className="text-[12px] font-medium">New booking</p>
            <p className="font-mono text-[10.5px] text-muted-foreground">Today · 2:00 PM</p>
          </div>
        </div>
      </div>

      {/* Review */}
      <div className="absolute right-6 bottom-2 hidden animate-rise rounded-2xl border border-border bg-card px-3.5 py-3 shadow-[var(--shadow-float)] [animation-delay:500ms] sm:block">
        <div className="flex gap-0.5 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3 fill-current" />
          ))}
        </div>
        <p className="mt-1 text-[11.5px] text-muted-foreground">Review request sent</p>
      </div>
    </div>
  );
}
