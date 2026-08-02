import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form";
import { createServiceClient, ServiceNotConfiguredError } from "@/lib/supabase/server";
import { updatePost } from "../actions";

export const metadata = { title: "Modifier l'article" };

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
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

  const { data: post, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-ink-950">Modifier l&apos;article</h1>
      <div className="mt-6">
        <ArticleForm post={post} action={updatePost.bind(null, post.id)} submitLabel="Enregistrer" />
      </div>
    </div>
  );
}
