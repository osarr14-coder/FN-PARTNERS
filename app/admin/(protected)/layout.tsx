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
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (configured) {
    const user = await getUser();
    if (!user) redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col bg-ink-950 px-4 py-6">
        <p className="px-3 font-heading text-lg font-semibold text-white">FN Partners</p>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <link.icon size={17} />
              {link.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>
      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
