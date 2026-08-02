import { ArticleForm } from "@/components/admin/article-form";
import { createPost } from "../actions";

export const metadata = { title: "Nouvel article" };

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-ink-950">Nouvel article</h1>
      <div className="mt-6">
        <ArticleForm action={createPost} submitLabel="Créer l'article" />
      </div>
    </div>
  );
}
