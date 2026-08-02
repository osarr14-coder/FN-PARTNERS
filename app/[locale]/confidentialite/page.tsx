import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { privacySections } from "@/content/privacy";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return buildMetadata({ locale, pathname: "/confidentialite", title: t("title"), description: t("subtitle") });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <section className="py-20 sm:py-28">
      <Container className="mx-auto max-w-2xl">
        <h1 className="text-balance font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-slate-600">{t("subtitle")}</p>
        <p className="mt-1 text-xs text-slate-400">{t("lastUpdated")}</p>

        <div className="mt-12 space-y-10">
          {privacySections.map((section) => (
            <div key={section.heading[locale]}>
              <h2 className="font-heading text-lg font-semibold text-ink-950">{section.heading[locale]}</h2>
              <div className="mt-2.5 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph[locale]} className="leading-relaxed text-slate-600">
                    {paragraph[locale]}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
