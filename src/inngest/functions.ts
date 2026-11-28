import * as Sentry from "@sentry/nextjs";

import { inngest } from "@/inngest/client";
import { sendContactEmails } from "@/lib/send-contact-emails";
import type { ContactInput } from "@/lib/contact-schema";

/**
 * Background job: email Austin about the lead and send the visitor a confirmation.
 * Runs outside the form request, with automatic retries if Resend has a hiccup.
 */
export const contactSubmitted = inngest.createFunction(
  {
    id: "contact-submitted-emails",
    triggers: [{ event: "contact/submitted" }],
    // After every retry has failed: report it to Sentry so it shows up on the admin page and emails you.
    onFailure: async ({ error }) => {
      Sentry.captureException(error, { tags: { job: "contact-submitted-emails" } });
      await Sentry.flush(2000);
    },
  },
  async ({ event, step }) => {
    const lead = event.data as ContactInput;
    await step.run("send-emails", () => sendContactEmails(lead));
  },
);

export const functions = [contactSubmitted];
