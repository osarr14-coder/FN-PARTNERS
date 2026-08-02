import Link from "next/link";
import { FileText, Newspaper } from "lucide-react";
import { createServiceClient, ServiceNotConfiguredError } from "@/lib/supabase/server";

export const metadata = { title: "Tableau de bord" };

async function getCounts() {
  try {
    const supabase = createServiceClient();
    const [{ count: quoteCount }, { count: newCount }, { count: postCount }] = await Promise.all([
      supabase.from("quote_requests").select("*", { count: "exact", head: true }),
      supabase.from("quote_requests").select("*", { count: "exact", head: true }).eq("status", "nouveau"),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    ]);
    return { quoteCount: quoteCount ?? 0, newCount: newCount ?? 0, postCount: postCount ?? 0, configured: true };
  } catch (error) {
    if (error instanceof ServiceNotConfiguredError) {
      return { quoteCount: 0, newCount: 0, postCount: 0, configured: false };
    }
    throw error;
  }
}

export default async function AdminDashboardPage() {
  const { quoteCount, newCount, postCount, configured } = await getCounts();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-ink-950">Tableau de bord</h1>

      {!configured && (
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase n&apos;est pas encore configuré (variables d&apos;environnement manquantes) — les chiffres
          ci-dessous sont vides tant que la base n&apos;est pas connectée.
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          href="/admin/demandes"
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50">
              <FileText className="text-accent-600" size={20} />
            </div>
            <p className="text-sm font-medium text-slate-600">Demandes de devis</p>
          </div>
          <p className="mt-4 font-heading text-3xl font-semibold text-ink-950">{quoteCount}</p>
          <p className="mt-1 text-sm text-slate-500">{newCount} nouvelle(s)</p>
        </Link>

        <Link
          href="/admin/articles"
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50">
              <Newspaper className="text-accent-600" size={20} />
            </div>
            <p className="text-sm font-medium text-slate-600">Articles</p>
          </div>
          <p className="mt-4 font-heading text-3xl font-semibold text-ink-950">{postCount}</p>
          <p className="mt-1 text-sm text-slate-500">Publiés et brouillons</p>
        </Link>
      </div>
    </div>
  );
}
