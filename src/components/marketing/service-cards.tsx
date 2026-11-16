import { Bot, CalendarCheck, Gauge, MessageSquare, Star, Workflow } from "lucide-react";

import { cn } from "@/lib/utils";

/** Bento grid of services. Each card carries a small, real-looking UI preview. */
export function ServiceCards() {
  return (
    <div className="grid gap-4 md:grid-cols-6">
      <Card className="md:col-span-4" icon={Gauge} title="A website that earns its keep" body="Fast, mobile-first, and clear about what you do, where, and how to reach you. Set up so Google can find you locally.">
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            ["98", "Performance"],
            ["100", "SEO"],
            ["0.8s", "Load time"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-border bg-background px-3 py-3">
              <p className="text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="md:col-span-2" icon={CalendarCheck} title="Online booking" body="Customers pick a time, any hour. Reminders cut no-shows.">
        <div className="mt-6 space-y-2">
          {[
            ["Mon", "9:00 AM", true],
            ["Mon", "1:30 PM", false],
          ].map(([d, t, taken]) => (
            <div key={String(t)} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 font-mono text-[11px]">
              <span>
                {d} · {t}
              </span>
              <span className={taken ? "text-muted-foreground" : "text-success"}>{taken ? "Booked" : "Open"}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="md:col-span-2" icon={MessageSquare} title="Missed-call text-back" body="Miss a call on a job? The caller gets a text in seconds, not a voicemail.">
        <div className="mt-6 space-y-1.5 text-[12px]">
          <p className="w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-muted px-3 py-2">Hi! Sorry we missed you. How can we help?</p>
          <p className="ml-auto w-fit max-w-[85%] rounded-xl rounded-tr-sm bg-foreground px-3 py-2 text-background">Need a quote for a water heater</p>
        </div>
      </Card>

      <Card className="md:col-span-2" icon={Star} title="More Google reviews" body="A short, friendly review request goes out after every job.">
        <div className="mt-6 flex items-end gap-3">
          <p className="text-4xl font-semibold tracking-tight tabular-nums">4.9</p>
          <div className="pb-1.5">
            <div className="flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-current" />
              ))}
            </div>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">+18 this month</p>
          </div>
        </div>
      </Card>

      <Card className="md:col-span-2" icon={Bot} title="AI chat for your FAQs" body="Answers the questions you hear daily, in your words, with your prices.">
        <div className="mt-6 rounded-xl border border-border bg-background p-3 text-[12px]">
          <p className="text-muted-foreground">Do you work Saturdays?</p>
          <p className="mt-1.5">Yes, 8 AM to 2 PM. Want me to find you a slot?</p>
        </div>
      </Card>

      <Card className="md:col-span-6" icon={Workflow} title="Custom automations" body="Quotes, follow-ups, invoices, weekly reports. If you do it by hand every week, it can probably run on its own." horizontal>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground md:justify-end">
          {["Form submitted", "Lead saved", "Quote drafted", "Follow-up in 2 days"].map((step, i, all) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-background px-3 py-1.5 text-foreground">{step}</span>
              {i < all.length - 1 && <span aria-hidden>→</span>}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  body,
  className,
  horizontal,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  className?: string;
  horizontal?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-soft)]",
        horizontal && "md:grid md:grid-cols-[1fr_1.2fr] md:items-center md:gap-8",
        className,
      )}
    >
      <div>
        <Icon className="size-5 text-accent" />
        <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{body}</p>
      </div>
      {horizontal ? <div className="mt-6 md:mt-0">{children}</div> : children}
    </div>
  );
}
