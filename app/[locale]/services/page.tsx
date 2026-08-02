import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2, Landmark, Settings2, ShieldCheck } from "lucide-react";
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

const poleCodes: Record<string, string> = {
  "corporate-finance": "CF",
  "audit-revision": "AR",
  "management-organisation": "MO",
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

        <div className="dossier-explorer relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr] lg:items-start">
          {servicePoles.map((pole) => (
            <input key={pole.slug} type="radio" name="pole" id={`pole-${poleCodes[pole.slug].toLowerCase()}`} defaultChecked={pole.slug === servicePoles[0].slug} />
          ))}

          <nav className="flex gap-3 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
            {servicePoles.map((pole) => {
              const code = poleCodes[pole.slug];
              return (
                <label
                  key={pole.slug}
                  htmlFor={`pole-${code.toLowerCase()}`}
                  className="block shrink-0 cursor-pointer border border-slate-200 bg-white px-5 py-4 transition-colors [clip-path:polygon(0_0,calc(100%-14px)_0,100%_100%,0_100%)] lg:w-full"
                  style={{ minWidth: "230px" }}
                >
                  <span className="dossier-code block font-mono text-[0.68rem] tracking-wider text-slate-400">
                    {t("dossierLabel").toUpperCase()} · {code}
                  </span>
                  <span className="mt-1 block font-heading text-base font-semibold text-ink-950">{pole.name[locale]}</span>
                  <span className="mt-1 block text-sm leading-snug text-slate-600">{pole.summary[locale]}</span>
                </label>
              );
            })}
          </nav>

          <div className="dossier-panels">
            {servicePoles.map((pole) => {
              const code = poleCodes[pole.slug];
              const Icon = poleIcons[pole.slug];
              return (
                <article key={pole.slug} id={`panel-${code.toLowerCase()}`} className="dossier-panel border border-slate-200 bg-white p-6 sm:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent-50">
                        <Icon className="text-accent-600" size={22} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-mono text-xs font-semibold tracking-wider text-accent-600">
                          {t("dossierLabel").toUpperCase()} · {code}
                        </p>
                        <h2 className="mt-1 font-heading text-2xl font-semibold text-ink-950">{pole.name[locale]}</h2>
                        <p className="mt-1.5 max-w-md text-sm text-slate-600">{pole.summary[locale]}</p>
                      </div>
                    </div>
                    <ButtonLink href="/devis" variant="accent" className="shrink-0">
                      {tc("requestQuote")}
                    </ButtonLink>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t("itemsTitle")}</p>
                      <ul className="mt-4 space-y-2.5">
                        {pole.items.map((item) => (
                          <li key={item[locale]} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                            <CheckCircle2 className="mt-0.5 shrink-0 text-accent-600" size={16} />
                            {item[locale]}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t("benefitsTitle")}</p>
                      <div className="mt-4 space-y-3">
                        {pole.benefits.map((benefit) => (
                          <p key={benefit[locale]} className="bg-accent-50 p-4 text-sm leading-relaxed text-ink-900">
                            {benefit[locale]}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-5 border-t border-slate-200 pt-8 sm:grid-cols-4">
                    <p className="col-span-full text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t("processTitle")}
                    </p>
                    {pole.process.map((step, i) => (
                      <div key={step[locale]}>
                        <span className="font-heading text-2xl font-semibold text-accent-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step[locale]}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200 pt-2">
                    <p className="pt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">{t("faqTitle")}</p>
                    {pole.faq.map((entry) => (
                      <details key={entry.question[locale]} className="group py-4">
                        <summary className="cursor-pointer list-none font-heading text-base font-semibold text-ink-950 marker:content-none">
                          {entry.question[locale]}
                        </summary>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{entry.answer[locale]}</p>
                      </details>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <Link
                      href={`/services/${pole.slug}`}
                      className="text-sm font-medium text-ink-800 hover:text-accent-600"
                    >
                      {t("viewFullSheet")} →
                    </Link>
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
