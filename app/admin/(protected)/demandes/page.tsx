import Link from "next/link";
import { Download } from "lucide-react";
import { createServiceClient, ServiceNotConfiguredError } from "@/lib/supabase/server";
import { formatReferenceNumber } from "@/lib/quote-reference";
import { QUOTE_STATUSES, statusColor, statusLabel } from "@/lib/quote-status";

export const metadata = { title: "Demandes de devis" };

interface QuoteRequestRow {
  id: number;
  full_name: string;
  email: string;
  company: string;
  status: string;
  created_at: string;
}

async function getQuoteRequests(q: string, status: string) {
  try {
    const supabase = createServiceClient();
    let query = supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);
    if (q) {
      const like = `%${q}%`;
      query = query.or(`full_name.ilike.${like},email.ilike.${like},company.ilike.${like}`);
    }
    const { data, error } = await query;
    if (error) throw error;
    return { requests: (data ?? []) as QuoteRequestRow[], configured: true };
  } catch (error) {
    if (error instanceof ServiceNotConfiguredError) return { requests: [], configured: false };
    throw error;
  }
}

export default async function AdminDemandesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;
  const { requests, configured } = await getQuoteRequests(q, status);
  const exportQuery = new URLSearchParams({ ...(q && { q }), ...(status && { status }) }).toString();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold text-ink-950">Demandes de devis</h1>
        <a
          href={`/api/admin/export${exportQuery ? `?${exportQuery}` : ""}`}
          className="inline-flex items-center gap-2 rounded-full border border-ink-900/20 px-5 py-2.5 text-sm font-medium text-ink-900 hover:bg-ink-900/5"
        >
          <Download size={16} /> Exporter (CSV / Excel)
        </a>
      </div>

      {!configured && (
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase n&apos;est pas encore configuré.
        </p>
      )}

      <form method="get" className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Nom, email, société…"
          className="w-64 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink-950 focus:border-ink-700 focus:outline-none focus:ring-1 focus:ring-ink-700"
        />
        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink-950 focus:border-ink-700 focus:outline-none focus:ring-1 focus:ring-ink-700"
        >
          <option value="">Tous les statuts</option>
          {QUOTE_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-ink-800"
        >
          Filtrer
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Référence</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Société</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium">Reçu le</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-5 py-3.5">
                  <Link href={`/admin/demandes/${r.id}`} className="font-medium text-ink-900 hover:text-accent-600">
                    {formatReferenceNumber(r.id, r.created_at)}
                  </Link>
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-ink-950">{r.full_name}</p>
                  <p className="text-slate-500">{r.email}</p>
                </td>
                <td className="px-5 py-3.5 text-slate-700">{r.company}</td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor(r.status)}`}>
                    {statusLabel(r.status)}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-500">{new Date(r.created_at).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                  Aucune demande trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
