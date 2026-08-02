import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Building2,
  Factory,
  Landmark,
  MoreHorizontal,
  Rocket,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Users,
} from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { DossierTag, cutCorner } from "@/components/dossier-tag";
import { sectors, servicePoles } from "@/content/company";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

const sectorIcons = [Factory, Building2, ShoppingCart, Sprout, Users, Rocket, MoreHorizontal];
const poleIcons: Record<string, typeof Landmark> = {
  "corporate-finance": Landmark,
  "audit-revision": ShieldCheck,
  "management-organisation": Settings2,
};
const sectorIds = sectors.map((_, i) => `sector-${String(i + 1).padStart(2, "0")}`);

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sectors" });
  return buildMetadata({ locale, pathname: "/secteurs", title: t("title"), description: t("subtitle") });
}

export default async function SectorsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sectors");
  const tc = await getTranslations("common");

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h1 className="text-balance font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">{t("subtitle")}</p>

        <div className="sector-explorer relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr] lg:items-start">
          {sectors.map((sector, i) => (
            <input key={sector.value} type="radio" name="sector" id={sectorIds[i]} defaultChecked={i === 0} />
          ))}

          <nav className="flex gap-3 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
            {sectors.map((sector, i) => {
              const Icon = sectorIcons[i];
              return (
                <label
                  key={sector.value}
                  htmlFor={sectorIds[i]}
                  className="flex shrink-0 cursor-pointer items-center gap-3 border border-slate-200 bg-white px-4 py-3 transition-colors [clip-path:polygon(0_0,calc(100%-12px)_0,100%_100%,0_100%)] lg:w-full"
                  style={{ minWidth: "210px" }}
                >
                  <Icon className="shrink-0 text-slate-400" size={18} strokeWidth={1.5} />
                  <span>
                    <span className="dossier-code block font-mono text-[0.64rem] tracking-wider text-slate-400">
                      {t("sectorLabel").toUpperCase()} · {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block font-heading text-sm font-semibold text-ink-950">
                      {sector.label[locale]}
                    </span>
                  </span>
                </label>
              );
            })}
          </nav>

          <div className="dossier-panels">
            {sectors.map((sector, i) => {
              const Icon = sectorIcons[i];
              const isOther = sector.value === "autre";
              return (
                <article
                  key={sector.value}
                  id={`sector-panel-${String(i + 1).padStart(2, "0")}`}
                  className="dossier-panel border border-slate-200 bg-white p-6 sm:p-10"
                >
                  <div className="flex items-start gap-4 border-b border-slate-200 pb-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent-50">
                      <Icon className="text-accent-600" size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <DossierTag>
                        {t("sectorLabel")} · {String(i + 1).padStart(2, "0")}
                      </DossierTag>
                      <h2 className="mt-1 font-heading text-2xl font-semibold text-ink-950">
                        {sector.label[locale]}
                      </h2>
                    </div>
                  </div>

                  <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600">
                    {isOther ? t("otherSectorIntro") : t("sectorIntro", { sector: sector.label[locale] })}
                  </p>

                  <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("polesTitle")}
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {servicePoles.map((pole) => {
                      const PoleIcon = poleIcons[pole.slug];
                      return (
                        <div key={pole.slug} className={`border border-slate-200 bg-slate-50 p-4 ${cutCorner}`}>
                          <PoleIcon className="text-accent-600" size={18} strokeWidth={1.5} />
                          <p className="mt-2 font-heading text-sm font-semibold text-ink-950">{pole.name[locale]}</p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-600">{pole.summary[locale]}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8">
                    <ButtonLink href="/devis" variant="accent">
                      {tc("requestQuote")}
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
