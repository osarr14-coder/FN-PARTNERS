export function formatReferenceNumber(id: number, createdAt: string | Date) {
  const year = new Date(createdAt).getFullYear();
  return `FNP-${year}-${String(id).padStart(6, "0")}`;
}
