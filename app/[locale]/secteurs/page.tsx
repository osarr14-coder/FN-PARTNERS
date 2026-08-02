import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Building2, Factory, GraduationCap, MoreHorizontal, ShoppingCart, Sprout, Users } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";
import { sectors } from "@/content/company";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

const sectorIcons = [Factory, Building2, ShoppingCart, Sprout, Users, GraduationCap, MoreHorizontal];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sectors" });
  return buildMetadata({ locale, pathname: "/secteurs", title: t("title"), description: t("subtitle") });
}

export default async function SectorsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sectors");
  const tc = await getTranslations("common");

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => {
            const Icon = sectorIcons[i];
            return (
              <div key={sector.value} className="rounded-2xl border border-slate-200 p-7">
                <Icon className="text-accent-600" size={26} strokeWidth={1.5} />
                <p className="mt-4 font-heading text-lg font-semibold text-ink-950">{sector.label[locale]}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-14">
          <ButtonLink href="/devis" variant="accent">
            {tc("requestQuote")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
