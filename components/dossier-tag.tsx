import { cn } from "@/lib/utils";

// Étiquette technique en mono, utilisée comme code de référence sur les cartes
// et fiches — vocabulaire visuel du "dossier" introduit sur /services, étendu
// au reste du site pour la cohérence.
export function DossierTag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        "font-mono text-[0.68rem] font-semibold uppercase tracking-wider",
        light ? "text-accent-50/70" : "text-accent-600"
      )}
    >
      {children}
    </p>
  );
}

// Coin coupé façon intercalaire de classeur — remplace le rounded-2xl générique
// sur les grilles de cartes du site pour rester cohérent avec les onglets du
// dossier explorable.
export const cutCorner = "[clip-path:polygon(0_0,calc(100%-14px)_0,100%_100%,0_100%)]";
