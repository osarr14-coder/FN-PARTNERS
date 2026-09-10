import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";
import { ChevronMotif } from "@/components/chevron-motif";
import { DossierTag, cutCorner } from "@/components/dossier-tag";
import { PresenceMap } from "@/components/presence-map";
import { company, founder, geography, servicePoles, values } from "@/content/company";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return buildMetadata({ locale, pathname: "/a-propos", title: t("title"), description: company.about[locale] });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tc = await getTranslations("common");

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={t("leadEyebrow")} title={t("title")} />
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">{company.about[locale]}</p>
          </div>

          <div className={`border border-slate-200 bg-white p-7 ${cutCorner}`}>
            <DossierTag>Dossier · FN</DossierTag>
            <dl className="mt-5 space-y-6">
              <div>
                <dt className="font-heading text-3xl font-semibold text-ink-950">
                  20 <span className="text-lg font-medium text-slate-500">{t("factYears")}</span>
                </dt>
                <dd className="mt-1 text-sm text-slate-600">{t("factExperienceLabel")}</dd>
              </div>
              <div>
                <dt className="font-heading text-3xl font-semibold text-ink-950">{servicePoles.length}</dt>
                <dd className="mt-1 text-sm text-slate-600">{t("factPolesLabel")}</dd>
              </div>
              <div>
                <dt className="font-heading text-3xl font-semibold text-ink-950">{geography.length}</dt>
                <dd className="mt-1 text-sm text-slate-600">{t("factCountriesLabel")}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={company.name} title={t("valuesTitle")} subtitle={t("valuesSubtitle")} />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title[locale]} className={`border border-slate-200 bg-white p-7 ${cutCorner}`}>
                <h3 className="font-heading text-lg font-semibold text-ink-950">{value.title[locale]}</h3>
                <ul className="mt-4 space-y-2.5">
                  {value.points.map((point) => (
                    <li key={point[locale]} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                      {point[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div
            className={`grid grid-cols-1 items-center gap-10 border border-slate-200 bg-white p-8 sm:p-12 lg:grid-cols-[auto_1fr] ${cutCorner}`}
          >
            <Image
              src="/images/fedoua-nasri.jpg"
              alt={founder.name}
              width={224}
              height={224}
              className="h-40 w-40 shrink-0 rounded-full object-cover ring-4 ring-accent-50 sm:h-52 sm:w-52"
            />
            <div>
              <DossierTag>{t("founderEyebrow")}</DossierTag>
              <h2 className="mt-2 text-balance font-heading text-4xl font-semibold text-ink-950 sm:text-5xl">
                {founder.name}
              </h2>
              <p className="mt-2 text-lg text-slate-600">{founder.title[locale]}</p>
              <div className="mt-6">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-ink-800 transition-colors hover:border-ink-900/40 hover:text-accent-600"
                >
                  {t("founderLinkedin")}
                  <ExternalLink size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
        <ChevronMotif />
        <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading eyebrow="International" title={t("geographyTitle")} light />
            <div className="mt-10">
              <ButtonLink href="/devis" variant="accent">
                {tc("requestQuote")}
              </ButtonLink>
            </div>
          </div>
          <PresenceMap locale={locale} />
        </Container>
      </section>
    </>
  );
}
