import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";
import { ChevronMotif } from "@/components/chevron-motif";
import { DossierTag, cutCorner } from "@/components/dossier-tag";
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
            {values.map((value, i) => (
              <div key={value.title[locale]} className={`border border-slate-200 bg-white p-7 ${cutCorner}`}>
                <DossierTag>Valeur · {String(i + 1).padStart(2, "0")}</DossierTag>
                <h3 className="mt-3 font-heading text-lg font-semibold text-ink-950">{value.title[locale]}</h3>
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
          <div className="flex flex-wrap items-center gap-6">
            <Image
              src="/images/fedoua-nasri.jpg"
              alt={founder.name}
              width={128}
              height={128}
              className="h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-accent-50 sm:h-32 sm:w-32"
            />
            <div>
              <DossierTag>{t("founderEyebrow")}</DossierTag>
              <h2 className="mt-1.5 text-balance font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">
                {founder.name}
              </h2>
              <p className="mt-1.5 text-slate-600">{founder.title[locale]}</p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t("founderExperienceTitle")}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {founder.experience.map((role, i) => (
                <div key={role.organization} className={`border border-slate-200 bg-white p-6 ${cutCorner}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <DossierTag>{String(i + 1).padStart(2, "0")}</DossierTag>
                    <span className="font-mono text-xs text-slate-400">{role.duration[locale]}</span>
                  </div>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-ink-950">{role.organization}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {role.highlights.map((h) => (
                      <li key={h[locale]} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                        {h[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
        <ChevronMotif />
        <Container className="relative">
          <SectionHeading eyebrow="International" title={t("geographyTitle")} light />
          <div className="mt-8 flex flex-wrap gap-3">
            {geography.map((country) => (
              <span
                key={country}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200"
              >
                {country}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/devis" variant="accent">
              {tc("requestQuote")}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
