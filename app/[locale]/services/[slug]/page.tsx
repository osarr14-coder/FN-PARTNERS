import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2, Landmark, Settings2, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { routing, type Locale } from "@/i18n/routing";
import { company, servicePoles } from "@/content/company";
import { buildMetadata, siteUrl } from "@/lib/seo";

const poleIcons: Record<string, typeof Landmark> = {
  "corporate-finance": Landmark,
  "audit-revision": ShieldCheck,
  "management-organisation": Settings2,
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => servicePoles.map((pole) => ({ locale, slug: pole.slug })));
}

function getPole(slug: string) {
  return servicePoles.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const pole = getPole(slug);
  if (!pole) return {};
  return buildMetadata({
    locale,
    pathname: `/services/${slug}`,
    title: pole.name[locale],
    description: pole.summary[locale],
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const pole = getPole(slug);
  if (!pole) notFound();

  const t = await getTranslations("services");
  const tc = await getTranslations("common");
  const Icon = poleIcons[pole.slug] ?? Landmark;
  const otherPoles = servicePoles.filter((p) => p.slug !== pole.slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: pole.name[locale],
    name: pole.name[locale],
    description: pole.summary[locale],
    url: `${siteUrl}/${locale}/services/${pole.slug}`,
    provider: {
      "@type": "ProfessionalService",
      name: company.name,
      url: siteUrl,
    },
    areaServed: "MA",
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <section className="bg-ink-950 py-20 sm:py-28">
        <Container>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
            <Icon className="text-accent-500" size={28} strokeWidth={1.5} />
          </div>
          <h1 className="mt-6 max-w-2xl text-balance font-heading text-4xl font-semibold text-white sm:text-5xl">
            {pole.name[locale]}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{pole.summary[locale]}</p>
          <div className="mt-9">
            <ButtonLink href="/devis" variant="accent">
              {tc("requestQuote")}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">{t("itemsTitle")}</p>
              <ul className="mt-5 space-y-3">
                {pole.items.map((item) => (
                  <li key={item[locale]} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-accent-600" size={18} />
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">{t("benefitsTitle")}</p>
              <div className="mt-5 space-y-4">
                {pole.benefits.map((benefit) => (
                  <p key={benefit[locale]} className="rounded-xl bg-slate-50 p-5 text-sm leading-relaxed text-slate-700">
                    {benefit[locale]}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <SectionHeading title={t("processTitle")} align="center" />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pole.process.map((step, i) => (
              <div key={step[locale]} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <span className="font-heading text-2xl font-semibold text-accent-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{step[locale]}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="mx-auto max-w-3xl">
          <SectionHeading title={t("faqTitle")} align="center" />
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {pole.faq.map((entry) => (
              <details key={entry.question[locale]} className="group p-6">
                <summary className="cursor-pointer list-none font-heading text-base font-semibold text-ink-950 marker:content-none">
                  {entry.question[locale]}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{entry.answer[locale]}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-accent-50 py-16">
        <Container className="text-center">
          <h2 className="text-balance font-heading text-2xl font-semibold text-ink-950 sm:text-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">{t("ctaSubtitle")}</p>
          <div className="mt-7">
            <ButtonLink href="/devis" variant="primary">
              {tc("requestQuote")}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t("otherServicesTitle")}</p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {otherPoles.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="rounded-xl border border-slate-200 p-5 transition-colors hover:border-ink-900/30"
              >
                <p className="font-heading font-semibold text-ink-950">{other.name[locale]}</p>
                <p className="mt-1 text-sm text-slate-600">{other.summary[locale]}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
