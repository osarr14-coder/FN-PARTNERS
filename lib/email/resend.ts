import { Resend } from "resend";
import type { QuoteRequestInput } from "@/lib/validations/quote";
import { contact } from "@/content/company";
import {
  budgetRangeOptions,
  headcountRangeOptions,
  revenueRangeOptions,
  urgencyOptions,
} from "@/content/form-options";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function optionLabel(options: { value: string; label: { fr: string; en: string } }[], value: string, locale: "fr" | "en") {
  return options.find((o) => o.value === value)?.label[locale] ?? value;
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#5f5470;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 0;color:#2d1454;font-size:13px;">${value}</td></tr>`;
}

function firmEmailHtml(data: QuoteRequestInput, referenceNumber: string, attachmentCount: number) {
  const locale = data.locale;
  const rows = [
    row("Référence", referenceNumber),
    row("Nom complet", data.fullName),
    row("Email", data.email),
    row("Téléphone", data.phone),
    row("Société", data.company),
    row("Fonction", data.role ?? ""),
    row("Secteur", data.sector),
    row("Pôle concerné", data.servicePole),
    row("Chiffre d'affaires", data.revenueRange ? optionLabel(revenueRangeOptions, data.revenueRange, locale) : ""),
    row("Effectif", data.headcountRange ? optionLabel(headcountRangeOptions, data.headcountRange, locale) : ""),
    row("Localisation", data.location),
    row("Urgence", optionLabel(urgencyOptions, data.urgency, locale)),
    row("Budget", data.budgetRange ? optionLabel(budgetRangeOptions, data.budgetRange, locale) : ""),
    row("Pièces jointes", String(attachmentCount)),
  ].join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
      <h1 style="font-size:18px;color:#2d1454;">Nouvelle demande de devis — ${referenceNumber}</h1>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      <p style="margin-top:20px;color:#2d1454;font-size:13px;"><strong>Description du besoin :</strong></p>
      <p style="white-space:pre-wrap;color:#332b42;font-size:13px;line-height:1.5;">${data.message}</p>
    </div>
  `;
}

function prospectEmailHtml(data: QuoteRequestInput, referenceNumber: string) {
  const isFr = data.locale === "fr";
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
      <h1 style="font-size:18px;color:#2d1454;">${isFr ? "Votre demande a bien été reçue" : "We've received your request"}</h1>
      <p style="color:#332b42;font-size:14px;line-height:1.6;">
        ${isFr ? `Bonjour ${data.fullName},` : `Hello ${data.fullName},`}
      </p>
      <p style="color:#332b42;font-size:14px;line-height:1.6;">
        ${
          isFr
            ? `Nous vous remercions pour votre demande. Un membre de notre équipe reviendra vers vous très prochainement. Votre numéro de référence est :`
            : `Thank you for your request. A member of our team will get back to you shortly. Your reference number is:`
        }
      </p>
      <p style="font-size:18px;font-weight:bold;color:#9900ff;">${referenceNumber}</p>
      <p style="color:#332b42;font-size:14px;line-height:1.6;">
        ${
          isFr
            ? `Pour toute question, contactez-nous directement à ${contact.email} ou au ${contact.phone}.`
            : `For any question, feel free to reach us directly at ${contact.email} or ${contact.phone}.`
        }
      </p>
      <p style="margin-top:24px;color:#2d1454;font-size:14px;">FN Partners</p>
    </div>
  `;
}

export async function sendQuoteRequestEmails(
  data: QuoteRequestInput,
  referenceNumber: string,
  attachmentCount: number
) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY absente — envoi des emails ignoré (mode dégradé).");
    return;
  }

  const fromEmail = process.env.FROM_EMAIL;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  if (!fromEmail || !notificationEmail) {
    console.warn("[email] FROM_EMAIL ou NOTIFICATION_EMAIL absente — envoi des emails ignoré (mode dégradé).");
    return;
  }

  const results = await Promise.allSettled([
    resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      replyTo: data.email,
      subject: `Nouvelle demande de devis — ${referenceNumber}`,
      html: firmEmailHtml(data, referenceNumber, attachmentCount),
    }),
    resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject:
        data.locale === "fr"
          ? `Votre demande a bien été reçue — ${referenceNumber}`
          : `We've received your request — ${referenceNumber}`,
      html: prospectEmailHtml(data, referenceNumber),
    }),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[email] échec de l'envoi d'un email de demande de devis:", result.reason);
    }
  }
}
