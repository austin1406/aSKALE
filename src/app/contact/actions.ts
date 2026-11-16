"use server";

import { headers } from "next/headers";
import { after } from "next/server";

import { inngest } from "@/inngest/client";
import { contactSchema, type ContactInput, type ContactState } from "@/lib/contact-schema";
import { hasEnv, isProd } from "@/lib/env";
import { checkContactRateLimit } from "@/lib/rate-limit";
import { sendContactEmails } from "@/lib/send-contact-emails";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyTurnstile } from "@/lib/turnstile";
import { site } from "@/site.config";

/**
 * Contact form handler. Order matters: cheap checks first, then storage, then the slow work
 * (emails) is handed to a background job so the visitor gets an instant answer.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";

  // 1. Validate every field on the server.
  const raw = Object.fromEntries(formData);
  const values = {
    name: String(raw.name ?? ""),
    email: String(raw.email ?? ""),
    phone: String(raw.phone ?? ""),
    business: String(raw.business ?? ""),
    message: String(raw.message ?? ""),
  };
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      fieldErrors[key] ??= issue.message;
    }
    // A filled honeypot means a bot: pretend it worked and drop it.
    if (fieldErrors.company_website) return { status: "success" };
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }
  const lead = { ...parsed.data };
  delete lead.company_website;

  // 2. Rate limit by IP.
  const rl = await checkContactRateLimit(ip);
  if (!rl.ok) {
    return { status: "error", message: "Too many messages from your connection. Please try again in a few minutes.", values };
  }

  // 3. Bot check.
  const ts = await verifyTurnstile(formData.get("cf-turnstile-response") as string | null, ip);
  if (!ts.ok) {
    return { status: "error", message: "We couldn't verify you're human. Please refresh and try again.", values };
  }

  // 4. Save the lead. The leads table has RLS on with no public policies; only this server key can write.
  let leadId: string | null = null;
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || null,
        business: lead.business || null,
        message: lead.message,
        source: "website_contact_form",
      })
      .select("id")
      .single();
    if (error) {
      console.error("[contact] Supabase insert failed", error.message);
      return { status: "error", message: `Something went wrong on our side. Please email ${site.email}.`, values };
    }
    leadId = data.id;
  } else if (isProd) {
    console.error("[contact] Supabase is not configured in production.");
  }

  // 5. Emails run in the background: an Inngest job when configured, otherwise after the response.
  if (hasEnv("INNGEST_EVENT_KEY") || process.env.INNGEST_DEV) {
    await inngest.send({ name: "contact/submitted", data: { ...lead, leadId } });
  } else {
    after(() => sendContactEmails(lead).catch((e) => console.error("[contact] email failed", e)));
  }

  return { status: "success" };
}
