"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!configured) return;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

function fromFormData(formData: FormData) {
  return {
    title_fr: String(formData.get("title_fr") ?? ""),
    title_en: String(formData.get("title_en") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt_fr: String(formData.get("excerpt_fr") ?? "") || null,
    excerpt_en: String(formData.get("excerpt_en") ?? "") || null,
    content_fr: String(formData.get("content_fr") ?? ""),
    content_en: String(formData.get("content_en") ?? ""),
    cover_image: String(formData.get("cover_image") ?? "") || null,
    published: formData.get("published") === "true",
  };
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  const supabase = createServiceClient();
  const { error } = await supabase.from("blog_posts").insert(fromFormData(formData));
  if (error) throw error;
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function updatePost(id: number, formData: FormData) {
  await requireAdmin();
  const supabase = createServiceClient();
  const { error } = await supabase
    .from("blog_posts")
    .update({ ...fromFormData(formData), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function deletePost(id: number) {
  await requireAdmin();
  const supabase = createServiceClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/articles");
}
