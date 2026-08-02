import Link from "next/link";
import { Plus } from "lucide-react";
import { createServiceClient, ServiceNotConfiguredError } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/blog";
import { deletePost } from "./actions";

export const metadata = { title: "Articles" };

async function getPosts(): Promise<{ posts: BlogPost[]; configured: boolean }> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return { posts: data ?? [], configured: true };
  } catch (error) {
    if (error instanceof ServiceNotConfiguredError) return { posts: [], configured: false };
    throw error;
  }
}

export default async function AdminArticlesPage() {
  const { posts, configured } = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-ink-950">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-ink-800"
        >
          <Plus size={16} /> Nouvel article
        </Link>
      </div>

      {!configured && (
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase n&apos;est pas encore configuré.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Titre</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium">Créé le</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-5 py-3.5 font-medium text-ink-950">{post.title_fr}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      post.published ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {post.published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-500">{new Date(post.created_at).toLocaleDateString("fr-FR")}</td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/articles/${post.id}`} className="text-ink-800 hover:text-accent-600">
                      Modifier
                    </Link>
                    <form action={deletePost.bind(null, post.id)}>
                      <button type="submit" className="text-red-600 hover:text-red-800">
                        Supprimer
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-slate-400">
                  Aucun article pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
