import { z } from "zod";

export function quoteRequestSchema(locale: "fr" | "en") {
  const msg = {
    required: locale === "fr" ? "Champ requis" : "Required field",
    email: locale === "fr" ? "Adresse email invalide" : "Invalid email address",
    consent:
      locale === "fr"
        ? "L'acceptation de la politique de confidentialité est requise"
        : "You must accept the privacy policy",
    message:
      locale === "fr"
        ? "Merci de détailler votre besoin (20 caractères minimum)"
        : "Please provide more detail (20 characters minimum)",
  };

  return z.object({
    fullName: z.string().min(2, msg.required).max(120),
    email: z.string().email(msg.email),
    phone: z.string().min(6, msg.required).max(30),
    company: z.string().min(2, msg.required).max(160),
    role: z.string().max(120).optional().or(z.literal("")),
    sector: z.string().min(1, msg.required),
    servicePole: z.string().min(1, msg.required),
    revenueRange: z.string().optional().or(z.literal("")),
    headcountRange: z.string().optional().or(z.literal("")),
    location: z.string().min(2, msg.required).max(160),
    urgency: z.enum(["normal", "urgent", "tres_urgent"]),
    budgetRange: z.string().optional().or(z.literal("")),
    message: z.string().min(20, msg.message).max(4000),
    consent: z.literal(true, { error: msg.consent }),
    locale: z.enum(["fr", "en"]),
  });
}

export type QuoteRequestInput = z.infer<ReturnType<typeof quoteRequestSchema>>;
