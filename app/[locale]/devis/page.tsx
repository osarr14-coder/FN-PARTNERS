import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { DossierTag, cutCorner } from "@/components/dossier-tag";
import { QuoteForm } from "@/components/quote-form";
import { contact } from "@/content/company";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "devis" });
  return buildMetadata({ locale, pathname: "/devis", title: t("title"), description: t("subtitle") });
}

export default async function QuotePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("devis");

  const steps = [
    { title: t("processStep1Title"), body: t("processStep1Body") },
    { title: t("processStep2Title"), body: t("processStep2Body") },
    { title: t("processStep3Title"), body: t("processStep3Body") },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div>
          <DossierTag>{t("formEyebrow")}</DossierTag>
          <h1 className="mt-1.5 text-balance font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-xl text-slate-600">{t("subtitle")}</p>

          <div className="mt-12">
            <QuoteForm />
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className={`border border-slate-200 bg-white p-7 ${cutCorner}`}>
            <DossierTag>{t("processEyebrow")}</DossierTag>
            <h2 className="mt-3 font-heading text-lg font-semibold text-ink-950">{t("processTitle")}</h2>
            <ol className="mt-6 space-y-6">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-50 font-heading text-sm font-semibold text-accent-600">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-950">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={`border border-slate-200 bg-ink-950 p-7 ${cutCorner}`}>
            <h2 className="font-heading text-lg font-semibold text-white">{t("directContactTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{t("directContactBody")}</p>
            <div className="mt-5 space-y-3 text-sm text-slate-200">
              <a href={contact.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-white">
                <Phone size={16} className="shrink-0 text-accent-500" />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail size={16} className="shrink-0 text-accent-500" />
                {contact.email}
              </a>
            </div>
          </div>
        </aside>
      </Container>
    </section>
  );
}
