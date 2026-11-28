"use client";

import Script from "next/script";
import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { submitContact } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContactState } from "@/lib/contact-schema";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/*
 * Without an error callback, Turnstile throws visitor-side glitches (slow network,
 * blockers, a tab left in the background) as uncaught errors, which Sentry reports
 * as issues. Handling them here keeps Sentry for real bugs; the widget still retries
 * on its own, and the server still rejects any submit without a valid token.
 * Registered at module load so it exists before the widget renders.
 */
if (typeof window !== "undefined") {
  (window as unknown as { onTurnstileError?: (code: string) => boolean }).onTurnstileError = (code) => {
    console.warn(`[turnstile] challenge error ${code}; the widget will retry`);
    return true;
  };
}

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });
  const err = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const v = state.status === "error" ? (state.values ?? {}) : {};

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
        <CheckCircle2 className="size-7 text-success" />
        <p className="font-display text-2xl font-medium">Thanks, message received.</p>
        <p className="text-muted-foreground">
          I&apos;ll reply within one business day. A confirmation is on its way to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={err.name}>
          <Input id="name" name="name" defaultValue={v.name} autoComplete="name" required aria-invalid={!!err.name} />
        </Field>
        <Field id="business" label="Business name" optional error={err.business}>
          <Input id="business" name="business" defaultValue={v.business} autoComplete="organization" aria-invalid={!!err.business} />
        </Field>
        <Field id="email" label="Email" error={err.email}>
          <Input id="email" name="email" defaultValue={v.email} type="email" autoComplete="email" required aria-invalid={!!err.email} />
        </Field>
        <Field id="phone" label="Phone" optional error={err.phone}>
          <Input id="phone" name="phone" defaultValue={v.phone} type="tel" autoComplete="tel" aria-invalid={!!err.phone} />
        </Field>
      </div>
      <Field id="message" label="What's slowing you down?" error={err.message}>
        <Textarea
          id="message"
          name="message"
          defaultValue={v.message}
          required
          rows={5}
          placeholder="e.g. We miss calls while on jobs, and our website is hard to use on phones."
          aria-invalid={!!err.message}
        />
      </Field>

      {/* Honeypot, hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-theme="light"
            data-error-callback="onTurnstileError"
          />
        </>
      )}

      {state.status === "error" && (
        <p role="alert" className="rounded-lg bg-accent-soft px-3 py-2 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
