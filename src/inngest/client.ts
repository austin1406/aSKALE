import { Inngest } from "inngest";

import type { ContactInput } from "@/lib/contact-schema";

export type Events = {
  "contact/submitted": { data: ContactInput & { leadId: string | null } };
};

export const inngest = new Inngest({ id: "askale-site" });
