import { getTranslations } from "next-intl/server";
import { AFRICA_CROP_VIEWBOX, AFRICA_LABEL_POSITION, AFRICA_PATH, AFRICA_POINTS } from "./africa-map-data";
import { geography } from "@/content/company";
import type { Locale } from "@/i18n/routing";

// Carte de présence animée — contour réel du continent (voir
// africa-map-data.ts), recadré sur l'Afrique du Nord-Ouest où se
// concentrent les missions du cabinet, avec un repère qui pulse pour
// chaque pays. Les pays hors continent (France) sont listés à part, sous
// la carte.
export async function PresenceMap({ locale }: { locale: Locale }) {
  const t = await getTranslations("common");
  const africanCountries = geography.filter((c) => c.fr in AFRICA_POINTS);
  const otherCountries = geography.filter((c) => !(c.fr in AFRICA_POINTS));
  const { x: cropX, y: cropY, width: cropW, height: cropH } = AFRICA_CROP_VIEWBOX;

  return (
    <div>
      <div className="relative mx-auto max-w-sm lg:mx-0">
        <svg viewBox={`${cropX} ${cropY} ${cropW} ${cropH}`} className="w-full" aria-hidden="true">
          <path d={AFRICA_PATH} className="fill-white/10" stroke="white" strokeOpacity={0.2} strokeWidth={1.5} />
        </svg>
        {africanCountries.map((country) => {
          const [px, py] = AFRICA_POINTS[country.fr];
          const labelPos = AFRICA_LABEL_POSITION[country.fr] ?? "bottom";
          const labelClass = {
            top: "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
            bottom: "top-full left-1/2 mt-1.5 -translate-x-1/2",
            left: "right-full top-1/2 mr-2 -translate-y-1/2",
            right: "left-full top-1/2 ml-2 -translate-y-1/2",
          }[labelPos];
          return (
            <div
              key={country.fr}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${((px - cropX) / cropW) * 100}%`, top: `${((py - cropY) / cropH) * 100}%` }}
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-500 ring-2 ring-ink-950" />
              </span>
              <span className={`absolute whitespace-nowrap text-xs font-medium text-slate-200 sm:text-sm ${labelClass}`}>
                {country[locale]}
              </span>
            </div>
          );
        })}
      </div>
      {otherCountries.length > 0 && (
        <p className="mt-6 text-center text-sm text-slate-400 lg:text-left">
          {t("alsoIn")} {otherCountries.map((c) => c[locale]).join(", ")}
        </p>
      )}
    </div>
  );
}
