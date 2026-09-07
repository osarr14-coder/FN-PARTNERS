import { NextResponse } from "next/server";
import { createClient, createServiceClient, ServiceNotConfiguredError } from "@/lib/supabase/server";
import { formatReferenceNumber } from "@/lib/quote-reference";
import { statusLabel } from "@/lib/quote-status";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET(request: Request) {
  // Fail-closed : tant que Supabase n'est pas configuré, l'export est refusé — pas
  // autorisé sans vérification.
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!configured) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const supabaseAuth = await createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const status = url.searchParams.get("status") ?? "";

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

    const header = [
      "Référence",
      "Date",
      "Nom",
      "Email",
      "Téléphone",
      "Société",
      "Fonction",
      "Secteur",
      "Pôle",
      "CA",
      "Effectif",
      "Localisation",
      "Urgence",
      "Budget",
      "Statut",
      "Message",
    ];

    const rows = (data ?? []).map((r) => [
      formatReferenceNumber(r.id, r.created_at),
      new Date(r.created_at).toLocaleDateString("fr-FR"),
      r.full_name,
      r.email,
      r.phone,
      r.company,
      r.role ?? "",
      r.sector,
      r.service_pole,
      r.revenue_range ?? "",
      r.headcount_range ?? "",
      r.location,
      r.urgency,
      r.budget_range ?? "",
      statusLabel(r.status),
      r.message,
    ]);

    const csv = [header, ...rows].map((row) => row.map((v) => csvEscape(String(v))).join(",")).join("\n");
    const body = "﻿" + csv;

    return new NextResponse(body, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="demandes-devis-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    if (error instanceof ServiceNotConfiguredError) {
      return NextResponse.json({ error: "service_not_configured" }, { status: 503 });
    }
    console.error("[api/admin/export] échec de l'export:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
