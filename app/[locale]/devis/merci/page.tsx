import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";
import { redirect } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "devis" });
  return { title: t("thankYouTitle"), robots: { index: false, follow: false } };
}

export default async function QuoteThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { ref } = await searchParams;
  if (!ref) redirect({ href: "/devis", locale });

  const t = await getTranslations("devis");

  return (
    <section className="py-24 sm:py-32">
      <Container className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-50">
          <CheckCircle2 className="text-accent-600" size={32} />
        </div>
        <h1 className="mt-6 text-balance font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">
          {t("thankYouTitle")}
        </h1>
        <p className="mt-4 text-slate-600">{t("thankYouBody")}</p>

        <div className="mt-8 rounded-xl bg-slate-50 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t("thankYouReference")}</p>
          <p className="mt-1 font-heading text-xl font-semibold text-ink-950">{ref}</p>
        </div>

        <div className="mt-10">
          <ButtonLink href="/">{t("backHome")}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
