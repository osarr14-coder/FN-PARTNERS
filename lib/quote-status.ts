export const QUOTE_STATUSES = [
  { value: "nouveau", label: "Nouveau", color: "bg-blue-50 text-blue-700" },
  { value: "en_cours", label: "En cours", color: "bg-amber-50 text-amber-700" },
  { value: "devis_envoye", label: "Devis envoyé", color: "bg-purple-50 text-purple-700" },
  { value: "mission_gagnee", label: "Mission gagnée", color: "bg-green-50 text-green-700" },
  { value: "mission_perdue", label: "Mission perdue", color: "bg-red-50 text-red-700" },
] as const;

export function statusLabel(value: string) {
  return QUOTE_STATUSES.find((s) => s.value === value)?.label ?? value;
}

export function statusColor(value: string) {
  return QUOTE_STATUSES.find((s) => s.value === value)?.color ?? "bg-slate-100 text-slate-600";
}
