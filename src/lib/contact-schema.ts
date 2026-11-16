import { z } from "zod";

/** Shared by the form (client hints) and the server action (the real check). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().toLowerCase().email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+().\-\s]*$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (at least 10 characters).")
    .max(2000, "Please keep it under 2,000 characters."),
  // Honeypot: real people never see or fill this field.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof ContactInput, string>>;
      /** What the visitor typed, so the form can refill itself after an error. */
      values?: Partial<Record<keyof ContactInput, string>>;
    };
