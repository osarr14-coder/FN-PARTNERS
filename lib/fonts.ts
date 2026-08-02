import { Playfair_Display, Inter } from "next/font/google";

// Playfair pour les titres (registre "cabinet de conseil premium"), Inter pour le
// texte courant — les deux via next/font (auto-hébergées, pas de dépendance CDN).
// Centralisé ici pour être partagé par les deux root layouts (site public + admin,
// voir la note dans app/[locale]/layout.tsx sur les root layouts multiples).
export const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});
