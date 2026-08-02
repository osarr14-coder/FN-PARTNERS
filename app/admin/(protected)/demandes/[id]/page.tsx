import { notFound } from "next/navigation";
import { createServiceClient, ServiceNotConfiguredError } from "@/lib/supabase/server";
import { formatReferenceNumber } from "@/lib/quote-reference";
import { statusLabel } from "@/lib/quote-status";
import { StatusForm } from "@/components/admin/status-form";
import { updateStatus } from "../actions";

export const metadata = { title: "Détail de la demande" };

interface Attachment {
  name: string;
  path: string;
  size: number;
  type: string;
}

export default async function DemandeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = (() => {
    try {
      return createServiceClient();
    } catch (error) {
      if (error instanceof ServiceNotConfiguredError) return null;
      throw error;
    }
  })();

  if (!supabase) {
    return (
      <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Supabase n&apos;est pas encore configuré.
      </p>
    );
  }

  const { data: request, error } = await supabase.from("quote_requests").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!request) notFound();

  const attachments = (request.attachments ?? []) as Attachment[];
  const signedAttachments = await Promise.all(
    attachments.map(async (a) => {
      const { data } = await supabase.storage.from("quote-attachments").createSignedUrl(a.path, 60 * 10);
      return { ...a, url: data?.signedUrl ?? null };
    })
  );

  const referenceNumber = formatReferenceNumber(request.id, request.created_at);

  const fields: [string, string | null][] = [
    ["Téléphone", request.phone],
    ["Fonction", request.role],
    ["Secteur", request.sector],
    ["Pôle concerné", request.service_pole],
    ["Chiffre d'affaires", request.revenue_range],
    ["Effectif", request.headcount_range],
    ["Localisation", request.location],
    ["Urgence", request.urgency],
    ["Budget", request.budget_range],
    ["Langue de la demande", request.locale === "fr" ? "Français" : "English"],
    ["Statut", statusLabel(request.status)],
  ];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{referenceNumber}</p>
          <h1 className="mt-1 font-heading text-2xl font-semibold text-ink-950">{request.full_name}</h1>
          <p className="text-slate-500">
            {request.company} — {request.email}
          </p>
        </div>
        <StatusForm currentStatus={request.status} action={updateStatus.bind(null, request.id)} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description du besoin</p>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{request.message}</p>
          </div>

          {signedAttachments.length > 0 && (
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pièces jointes</p>
              <ul className="mt-3 space-y-2">
                {signedAttachments.map((a) => (
                  <li key={a.path}>
                    {a.url ? (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-ink-800 hover:text-accent-600"
                      >
                        {a.name}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400">{a.name} (lien indisponible)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <dl className="space-y-3 text-sm">
            {fields
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</dt>
                  <dd className="mt-0.5 text-slate-800">{value}</dd>
                </div>
              ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
