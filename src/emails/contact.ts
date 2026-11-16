import type { ContactInput } from "@/lib/contact-schema";
import { site } from "@/site.config";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const shell = (body: string) => `<!doctype html><html><body style="margin:0;background:#f7f1e6;font-family:Arial,sans-serif;color:#241c15">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
<p style="font-weight:700;font-size:20px;margin:0 0 24px">${esc(site.name.toLowerCase())}</p>
${body}
<p style="margin-top:32px;font-size:12px;color:#6b5f52">${esc(site.name)} · ${esc(site.areaServed.slice(0, 2).join(" · "))}</p>
</div></body></html>`;

/** Notification to Austin about a new lead. */
export function newLeadEmail(lead: ContactInput) {
  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Business", lead.business],
  ];
  return {
    subject: `New lead: ${lead.name}${lead.business ? ` (${lead.business})` : ""}`,
    html: shell(`<h1 style="font-size:22px;margin:0 0 16px">New contact form message</h1>
<table style="border-collapse:collapse;font-size:14px">${rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#6b5f52">${k}</td><td>${esc(v!)}</td></tr>`)
      .join("")}</table>
<p style="white-space:pre-wrap;background:#fffbf4;border:1px solid #e3d7c3;border-radius:12px;padding:16px;font-size:14px">${esc(lead.message)}</p>`),
  };
}

/** Confirmation sent to the person who filled in the form. */
export function contactConfirmationEmail(lead: ContactInput) {
  const first = lead.name.split(" ")[0];
  return {
    subject: `Thanks, ${first}. I got your message`,
    html: shell(`<h1 style="font-size:22px;margin:0 0 16px">Thanks, ${esc(first)}!</h1>
<p style="font-size:15px;line-height:1.6">I got your message and I'll get back to you within one business day.</p>
<p style="font-size:15px;line-height:1.6">If you'd like to pick a time for your free 30-minute audit call now, you can book it here:
<a href="${site.url}${site.bookingUrl}" style="color:#b9532a">${site.url}${site.bookingUrl}</a></p>
<p style="font-size:15px;line-height:1.6">– ${esc(site.owner)}</p>`),
  };
}
