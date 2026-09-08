import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2, ChevronDown, Landmark, Settings2, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { servicePoles } from "@/content/company";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

const poleIcons: Record<string, typeof Landmark> = {
  "corporate-finance": Landmark,
  "audit-revision": ShieldCheck,
  "management-organisation": Settings2,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return buildMetadata({ locale, pathname: "/services", title: t("title"), description: t("subtitle") });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tc = await getTranslations("common");

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h1 className="text-balance font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">{t("subtitle")}</p>

        <div className="mt-14 divide-y divide-slate-200 border-y border-slate-200">
          {servicePoles.map((pole, i) => {
            const Icon = poleIcons[pole.slug];
            return (
              <details key={pole.slug} className="group py-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start gap-4 marker:content-none">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent-50">
                    <Icon className="text-accent-600" size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <span className="block font-heading text-lg font-semibold text-ink-950">{pole.name[locale]}</span>
                    <span className="mt-1 block text-sm text-slate-600">{pole.summary[locale]}</span>
                  </div>
                  <ChevronDown
                    className="mt-2 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    size={18}
                  />
                </summary>
                <div className="mt-6 pl-14">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t("itemsTitle")}</p>
                  <ul className="mt-4 space-y-2.5">
                    {pole.items.map((item) => (
                      <li key={item[locale]} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-accent-600" size={16} />
                        {item[locale]}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href={`/services/${pole.slug}`}
                      className="text-sm font-medium text-ink-800 hover:text-accent-600"
                    >
                      {t("viewFullSheet")} →
                    </Link>
                  </div>
                </div>
              </details>
            );
          })}
        </div>

        <div className="mt-10 bg-accent-50 px-6 py-10 text-center sm:px-10">
          <h2 className="text-balance font-heading text-xl font-semibold text-ink-950 sm:text-2xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">{t("ctaSubtitle")}</p>
          <div className="mt-6">
            <ButtonLink href="/devis" variant="accent">
              {tc("requestQuote")}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
