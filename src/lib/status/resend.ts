import "server-only";

import { ago, getJson, off, type ServiceStatus } from "./types";

type Email = { id: string; to: string[]; subject: string; created_at: string; last_event: string };

const DASH = "https://resend.com/emails";
const BAD = new Set(["bounced", "complained", "failed", "delivery_delayed"]);

/** The last 10 emails and whether they were delivered. Listing needs a full-access Resend key. */
export async function emailStatus(): Promise<ServiceStatus> {
  const key = process.env.RESEND_ADMIN_API_KEY || process.env.RESEND_API_KEY;
  if (!key) return off("Not connected: RESEND_API_KEY missing", DASH);

  let emails: Email[];
  try {
    const { data } = await getJson<{ data: Email[] }>("https://api.resend.com/emails?limit=10", {
      headers: { Authorization: `Bearer ${key}` },
    });
    emails = data.data;
  } catch (e) {
    if (e instanceof Error && /(401|403)/.test(e.message)) {
      return off("Needs a full-access key: add RESEND_ADMIN_API_KEY", DASH);
    }
    throw e;
  }

  const bad = emails.filter((m) => BAD.has(m.last_event));
  return {
    state: bad.length ? "warn" : "ok",
    summary: emails.length === 0 ? "No emails sent yet" : bad.length ? `${bad.length} of the last ${emails.length} emails had a problem` : `Last ${emails.length} emails delivered`,
    items: emails.slice(0, 5).map((m) => ({
      label: m.subject,
      meta: `${m.last_event.replace("_", " ")} · ${ago(m.created_at)}`,
      tone: BAD.has(m.last_event) ? ("warn" as const) : ("ok" as const),
    })),
    href: DASH,
  };
}
