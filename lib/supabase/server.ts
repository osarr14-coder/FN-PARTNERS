import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Client Supabase côté serveur (Server Components, Route Handlers, Server Actions) —
// lit/écrit les cookies de session pour l'auth admin (voir lib/supabase/client.ts
// pour l'équivalent navigateur).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // appelé depuis un Server Component sans réponse mutable — ignoré, le
          // middleware se charge du rafraîchissement de session dans ce cas.
        }
      },
    },
  });
}

export class ServiceNotConfiguredError extends Error {
  constructor() {
    super("Supabase n'est pas configuré (variables d'environnement manquantes).");
    this.name = "ServiceNotConfiguredError";
  }
}

// Client "admin" avec la clé de service — bypass RLS, réservé aux routes serveur qui
// doivent lire/écrire toutes les données (ex. export CRM). Ne jamais exposer côté
// client.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new ServiceNotConfiguredError();

  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
