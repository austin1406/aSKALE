import "server-only";
import { Resend } from "resend";

import { contactConfirmationEmail, newLeadEmail } from "@/emails/contact";
import type { ContactInput } from "@/lib/contact-schema";
import { hasEnv } from "@/lib/env";

export async function sendContactEmails(lead: ContactInput) {
  if (!hasEnv("RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL")) {
    console.warn("[contact] Resend not configured; skipping emails.");
    return { sent: false };
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.CONTACT_FROM_EMAIL!;

  const notify = newLeadEmail(lead);
  const confirm = contactConfirmationEmail(lead);
  const results = await Promise.all([
    resend.emails.send({ from, to: process.env.CONTACT_TO_EMAIL!, replyTo: lead.email, ...notify }),
    resend.emails.send({ from, to: lead.email, ...confirm }),
  ]);
  const failed = results.find((r) => r.error);
  // Throwing lets the background job retry.
  if (failed?.error) throw new Error(`Resend error: ${failed.error.message}`);
  return { sent: true };
}
