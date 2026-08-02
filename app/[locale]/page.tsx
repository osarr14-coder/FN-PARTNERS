import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Award, Database, GraduationCap, Landmark, Layers3, Settings2, ShieldCheck, TrendingUp, Users2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { ChevronMotif } from "@/components/chevron-motif";
import { DossierTag, cutCorner } from "@/components/dossier-tag";
import { company, contact, geography, references, servicePoles, strengths } from "@/content/company";
import type { Locale } from "@/i18n/routing";
import { buildMetadata, siteUrl } from "@/lib/seo";

const strengthIcons = [Award, Users2, Database, GraduationCap, TrendingUp, Layers3];
const poleIcons = [Landmark, ShieldCheck, Settings2];
const poleCodes = ["CF", "AR", "MO"];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    pathname: "/",
    title: company.tagline[locale],
    description: company.about[locale],
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.name,
    description: company.about[locale],
    url: `${siteUrl}/${locale}`,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLines[locale][0],
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    areaServed: geography,
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <section className="relative overflow-hidden bg-ink-950">
        <ChevronMotif />
        <Container className="relative py-16 sm:py-20">
          <DossierTag light>{t("heroEyebrow")}</DossierTag>
          <h1 className="mt-3 max-w-2xl text-balance font-heading text-4xl font-semibold text-white sm:text-5xl">
            {company.tagline[locale]}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">{t("heroLead")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/devis" variant="accent">
              {tc("requestQuote")}
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              {tc("contactExpert")}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={company.name} title={t("strengthsTitle")} subtitle={t("strengthsSubtitle")} />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((item, i) => {
              const Icon = strengthIcons[i];
              return (
                <div key={item.title[locale]} className={`border border-slate-200 bg-white p-6 ${cutCorner}`}>
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="text-accent-600" size={28} strokeWidth={1.5} />
                    <DossierTag>{String(i + 1).padStart(2, "0")}</DossierTag>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-ink-950">{item.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description[locale]}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Expertise" title={t("servicesTitle")} subtitle={t("servicesSubtitle")} />
            <ButtonLink href="/services" variant="outline" className="shrink-0">
              {t("servicesCta")}
            </ButtonLink>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {servicePoles.map((pole, i) => {
              const Icon = poleIcons[i];
              return (
                <Link
                  key={pole.slug}
                  href={`/services/${pole.slug}`}
                  className={`group flex flex-col border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-ink-900/20 ${cutCorner}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="text-ink-800" size={30} strokeWidth={1.5} />
                    <DossierTag>Dossier · {poleCodes[i]}</DossierTag>
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-semibold text-ink-950">{pole.name[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{pole.summary[locale]}</p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-600">
                    {pole.items.slice(0, 3).map((item) => (
                      <li key={item[locale]} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                        {item[locale]}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 text-sm font-medium text-ink-800 group-hover:text-accent-600">
                    {tc("readMore")} →
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Track record" title={t("referencesTitle")} subtitle={t("referencesSubtitle")} />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {references.map((ref, i) => (
              <div key={ref.name} className={`border border-slate-200 bg-white p-6 ${cutCorner}`}>
                <DossierTag>Réf · {String(i + 1).padStart(2, "0")}</DossierTag>
                <p className="mt-2 font-heading text-base font-semibold text-ink-950">{ref.name}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                  {ref.missions.slice(0, 2).map((mission) => (
                    <li key={mission[locale]}>{mission[locale]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
        <ChevronMotif />
        <Container className="relative">
          <SectionHeading eyebrow="International" title={t("geographyTitle")} subtitle={t("geographySubtitle")} light />
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
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="rounded-3xl bg-accent-50 px-8 py-14 text-center sm:px-16">
          <h2 className="text-balance font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">{t("ctaSubtitle")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/devis" variant="primary">
              {tc("requestQuote")}
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              {tc("contactExpert")}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
