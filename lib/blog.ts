import { createClient } from "@/lib/supabase/server";

export interface BlogPost {
  id: number;
  slug: string;
  title_fr: string;
  title_en: string;
  excerpt_fr: string | null;
  excerpt_en: string | null;
  content_fr: string;
  content_en: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.warn("[blog] impossible de charger les articles (Supabase non configuré ?) :", error);
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw error;
    return data;
  } catch (error) {
    console.warn("[blog] impossible de charger l'article:", error);
    return null;
  }
}
