import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText, LayoutDashboard, Newspaper } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/admin/logout-button";

async function getUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

const links = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/demandes", label: "Demandes de devis", icon: FileText },
  { href: "/admin/articles", label: "Articles", icon: Newspaper },
];

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  // Fail-closed : tant que Supabase n'est pas configuré, personne ne peut accéder à
  // l'espace admin — pas l'inverse.
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!configured) redirect("/admin/login");

  const user = await getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="flex items-center gap-4 overflow-x-auto bg-ink-950 px-4 py-3 lg:w-64 lg:shrink-0 lg:flex-col lg:items-stretch lg:overflow-visible lg:px-4 lg:py-6">
        <p className="shrink-0 font-heading text-lg font-semibold text-white lg:px-3">FN Partners</p>
        <nav className="flex shrink-0 items-center gap-1 lg:mt-8 lg:flex-1 lg:flex-col lg:items-stretch">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <link.icon size={17} />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto shrink-0 lg:ml-0">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
    </div>
  );
}
