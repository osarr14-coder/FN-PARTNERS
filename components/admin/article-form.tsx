"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/button";
import type { BlogPost } from "@/lib/blog";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Enregistrement…" : label}
    </Button>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink-950 focus:border-ink-700 focus:outline-none focus:ring-1 focus:ring-ink-700";
const labelClass = "block text-sm font-medium text-ink-950";

export function ArticleForm({
  post,
  action,
  submitLabel,
}: {
  post?: BlogPost;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));

  return (
    <form action={action} className="max-w-3xl space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="title_fr">
            Titre (FR)
          </label>
          <input
            id="title_fr"
            name="title_fr"
            required
            defaultValue={post?.title_fr}
            className={`mt-1.5 ${inputClass}`}
            onChange={(e) => {
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="title_en">
            Titre (EN)
          </label>
          <input id="title_en" name="title_en" required defaultValue={post?.title_en} className={`mt-1.5 ${inputClass}`} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="slug">
          Slug (URL)
        </label>
        <input
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className={`mt-1.5 font-mono ${inputClass}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="excerpt_fr">
            Résumé (FR)
          </label>
          <textarea
            id="excerpt_fr"
            name="excerpt_fr"
            rows={2}
            defaultValue={post?.excerpt_fr ?? ""}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="excerpt_en">
            Résumé (EN)
          </label>
          <textarea
            id="excerpt_en"
            name="excerpt_en"
            rows={2}
            defaultValue={post?.excerpt_en ?? ""}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="content_fr">
            Contenu (FR)
          </label>
          <textarea
            id="content_fr"
            name="content_fr"
            required
            rows={12}
            defaultValue={post?.content_fr}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="content_en">
            Contenu (EN)
          </label>
          <textarea
            id="content_en"
            name="content_en"
            required
            rows={12}
            defaultValue={post?.content_en}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
      </div>
      <p className="text-xs text-slate-500">Une ligne vide sépare les paragraphes à l&apos;affichage.</p>

      <div>
        <label className={labelClass} htmlFor="cover_image">
          Image de couverture (URL)
        </label>
        <input
          id="cover_image"
          name="cover_image"
          type="url"
          defaultValue={post?.cover_image ?? ""}
          placeholder="https://…"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-slate-700">
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={post?.published}
          className="h-4 w-4 rounded border-slate-300"
        />
        Publié
      </label>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
