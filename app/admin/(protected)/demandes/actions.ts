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

export async function updateStatus(id: number, formData: FormData) {
  await requireAdmin();
  const status = String(formData.get("status") ?? "");
  const supabase = createServiceClient();
  const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
  if (error) throw error;
  revalidatePath(`/admin/demandes/${id}`);
  revalidatePath("/admin/demandes");
}
