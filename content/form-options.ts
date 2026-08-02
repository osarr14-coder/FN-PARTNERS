import type { Bilingual } from "./company";

export const urgencyOptions: { value: string; label: Bilingual }[] = [
  { value: "normal", label: { fr: "Normal (plusieurs semaines)", en: "Standard (several weeks)" } },
  { value: "urgent", label: { fr: "Urgent (sous 2 semaines)", en: "Urgent (within 2 weeks)" } },
  { value: "tres_urgent", label: { fr: "Très urgent (sous 1 semaine)", en: "Very urgent (within 1 week)" } },
];

export const revenueRangeOptions: { value: string; label: Bilingual }[] = [
  { value: "lt_10m", label: { fr: "Moins de 10 MDH", en: "Under 10M MAD" } },
  { value: "10_50m", label: { fr: "10 à 50 MDH", en: "10 to 50M MAD" } },
  { value: "50_200m", label: { fr: "50 à 200 MDH", en: "50 to 200M MAD" } },
  { value: "gt_200m", label: { fr: "Plus de 200 MDH", en: "Over 200M MAD" } },
];

export const headcountRangeOptions: { value: string; label: Bilingual }[] = [
  { value: "lt_10", label: { fr: "Moins de 10", en: "Under 10" } },
  { value: "10_50", label: { fr: "10 à 50", en: "10 to 50" } },
  { value: "50_250", label: { fr: "50 à 250", en: "50 to 250" } },
  { value: "gt_250", label: { fr: "Plus de 250", en: "Over 250" } },
];

export const budgetRangeOptions: { value: string; label: Bilingual }[] = [
  { value: "not_defined", label: { fr: "Non défini", en: "Not defined yet" } },
  { value: "lt_50k", label: { fr: "Moins de 50 000 MAD", en: "Under 50,000 MAD" } },
  { value: "50_150k", label: { fr: "50 000 à 150 000 MAD", en: "50,000 to 150,000 MAD" } },
  { value: "gt_150k", label: { fr: "Plus de 150 000 MAD", en: "Over 150,000 MAD" } },
];

export const ACCEPTED_ATTACHMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
];

export const MAX_ATTACHMENTS = 5;
export const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024;
