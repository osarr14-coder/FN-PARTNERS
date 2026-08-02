import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { QuoteForm } from "@/components/quote-form";
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

  return (
    <section className="py-20 sm:py-28">
      <Container className="mx-auto max-w-3xl">
        <h1 className="text-balance font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-slate-600">{t("subtitle")}</p>

        <div className="mt-12">
          <QuoteForm />
        </div>
      </Container>
    </section>
  );
}
