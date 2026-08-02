import { headingFont, bodyFont } from "@/lib/fonts";
import "../globals.css";

// Root layout indépendant pour /admin — voir la note dans app/[locale]/layout.tsx
// sur les root layouts multiples. lang="fr" est statique (outil interne
// francophone), pas besoin de lire la requête.
export const metadata = {
  title: {
    template: "%s — Admin FN Partners",
    default: "Admin FN Partners",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50">{children}</body>
    </html>
  );
}
