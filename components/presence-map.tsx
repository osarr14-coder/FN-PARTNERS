import { geography } from "@/content/company";
import type { Locale } from "@/i18n/routing";

// Représentation animée des zones d'intervention du cabinet — remplace la
// simple liste de pastilles par une ligne de repères qui pulsent, en écho à
// la carte de présence des plaquettes commerciales (Maroc, Afrique de
// l'Ouest, France, Algérie).
export function PresenceMap({ locale }: { locale: Locale }) {
  return (
    <div className="relative mt-10">
      <div className="absolute inset-x-0 top-[7px] hidden h-px bg-white/15 sm:block" />
      <div className="relative flex flex-wrap items-start justify-between gap-x-6 gap-y-8">
        {geography.map((country, i) => (
          <div key={country.fr} className="flex flex-col items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75"
                style={{ animationDelay: `${i * 0.35}s`, animationDuration: "2.4s" }}
              />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent-500" />
            </span>
            <span className="text-sm font-medium text-slate-200">{country[locale]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
