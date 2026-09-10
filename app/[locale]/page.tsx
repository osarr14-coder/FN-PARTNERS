import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Award,
  Building2,
  Calculator,
  ClipboardCheck,
  Database,
  FileCheck2,
  GraduationCap,
  Landmark,
  Layers3,
  LineChart,
  PieChart,
  Scale,
  ScrollText,
  SearchCheck,
  Settings2,
  ShieldCheck,
  TrendingUp,
  Users2,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { ChevronMotif } from "@/components/chevron-motif";
import { DossierTag, cutCorner } from "@/components/dossier-tag";
import { PresenceMap } from "@/components/presence-map";
import { company, contact, geography, practiceAreas, servicePoles, strengths } from "@/content/company";
import type { Locale } from "@/i18n/routing";
import { buildMetadata, siteUrl } from "@/lib/seo";

const strengthIcons = [Award, Users2, Database, GraduationCap, TrendingUp, Layers3];
const poleIcons = [Landmark, ShieldCheck, Settings2];
const practiceIcons = [
  ShieldCheck,
  FileCheck2,
  SearchCheck,
  ScrollText,
  ClipboardCheck,
  Calculator,
  PieChart,
  LineChart,
  Scale,
  Building2,
];

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
    areaServed: geography.map((country) => country[locale]),
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <section className="relative overflow-hidden bg-ink-950">
        <ChevronMotif />
        <Container className="relative py-16 sm:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <DossierTag light>{t("heroEyebrow")}</DossierTag>
              <h1 className="mt-3 max-w-2xl text-balance font-heading text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl">
                {company.tagline[locale]}
              </h1>
            </div>
            <div className="inline-flex max-w-[16rem] shrink-0 items-center gap-2.5 self-start rounded-xl bg-white/95 py-2.5 pl-3 pr-4 shadow-lg sm:max-w-[15rem] sm:self-center sm:gap-3">
              <Image
                src="/images/logos/oec-morocco.png"
                alt="Ordre des Experts Comptables"
                width={700}
                height={485}
                className="h-9 w-auto shrink-0 sm:h-11"
              />
              <p className="text-xs font-medium leading-snug text-ink-900 sm:text-sm">{t("oecBadge")}</p>
            </div>
          </div>
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
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <Image
                src="/images/fn-partners-logo.png"
                alt={company.name}
                width={1860}
                height={800}
                className="h-12 w-auto sm:h-14"
              />
              <span className="font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">{company.name}</span>
            </div>
            <p className="mt-3 leading-relaxed text-slate-600">{t("strengthsSubtitle")}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((item, i) => {
              const Icon = strengthIcons[i];
              return (
                <div key={item.title[locale]} className={`border border-slate-200 bg-white p-6 ${cutCorner}`}>
                  <Icon className="text-accent-600" size={28} strokeWidth={1.5} />
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
            <SectionHeading title={t("servicesTitle")} subtitle={t("servicesSubtitle")} />
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
                  <Icon className="text-ink-800" size={30} strokeWidth={1.5} />
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

      <section className="overflow-hidden py-20 sm:py-28">
        <Container>
          <SectionHeading title={t("practiceTitle")} subtitle={t("practiceSubtitle")} align="center" />
        </Container>
        <div className="relative mt-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />
          <div className="flex w-max gap-5 animate-marquee">
            {[...practiceAreas, ...practiceAreas].map((area, i) => {
              const Icon = practiceIcons[i % practiceAreas.length];
              return (
                <div
                  key={i}
                  className={`flex w-64 shrink-0 items-center gap-3 border border-slate-200 bg-white p-5 ${cutCorner}`}
                >
                  <Icon className="shrink-0 text-accent-600" size={24} strokeWidth={1.5} />
                  <span className="text-sm font-medium text-ink-900">{area.label[locale]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
        <Image
          src="/images/office-analysis.jpg"
          alt=""
          fill
          className="animate-kenburns object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink-950/70" aria-hidden="true" />
        <ChevronMotif variant="quiet" />
        <Container className="relative">
          <SectionHeading eyebrow="International" title={t("geographyTitle")} subtitle={t("geographySubtitle")} light />
          <PresenceMap locale={locale} />
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
