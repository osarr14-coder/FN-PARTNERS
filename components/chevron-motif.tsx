const clip = "[clip-path:polygon(100%_0,40%_50%,100%_100%,78%_100%,18%_50%,78%_0)]";

// Motif géométrique décoratif — écho du mark du logo (chevrons imbriqués),
// réutilisé sur les fonds sombres pour unifier l'identité "dossier" introduite
// sur la page /services. Purement décoratif (aria-hidden), à poser dans un
// conteneur `relative overflow-hidden`.
//
// "hero" : la version pleine, réservée au premier fond sombre rencontré sur
// une page (l'ouverture). "quiet" : version réduite et repositionnée à
// gauche pour les fonds sombres secondaires de la même page (ex. la section
// géographie de l'accueil, juste après la section hero) — évite de rejouer
// exactement le même geste deux fois sur une seule page.
export function ChevronMotif({ variant = "hero" }: { variant?: "hero" | "quiet" }) {
  if (variant === "quiet") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className={`absolute -left-[220px] -bottom-[160px] h-[420px] w-[420px] bg-ink-800 opacity-70 ${clip}`} />
        <div className={`absolute -left-[280px] -bottom-[80px] h-[420px] w-[420px] bg-accent-500 opacity-25 ${clip}`} />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className={`absolute -right-[180px] -top-[140px] h-[620px] w-[620px] bg-ink-800 opacity-90 ${clip}`} />
      <div className={`absolute -right-[260px] -top-[40px] h-[620px] w-[620px] bg-ink-600 opacity-55 ${clip}`} />
      <div className={`absolute -right-[320px] top-[60px] h-[620px] w-[620px] bg-accent-500 opacity-35 ${clip}`} />
    </div>
  );
}
