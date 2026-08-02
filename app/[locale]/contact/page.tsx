import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";
import { contact } from "@/content/company";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildMetadata({ locale, pathname: "/contact", title: t("title"), description: t("subtitle") });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");

  const cards = [
    { icon: MapPin, label: t("addressLabel"), value: contact.addressLines[locale].join(", "), href: undefined },
    { icon: Phone, label: t("phoneLabel"), value: contact.phone, href: contact.phoneHref },
    { icon: Mail, label: t("emailLabel"), value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-200 p-7">
              <card.icon className="text-accent-600" size={26} strokeWidth={1.5} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">{card.label}</p>
              {card.href ? (
                <a href={card.href} className="mt-1.5 block text-sm font-medium text-ink-900 hover:text-accent-600">
                  {card.value}
                </a>
              ) : (
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink-900">{card.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-ink-950 px-8 py-12 text-center sm:px-16">
          <h2 className="text-balance font-heading text-2xl font-semibold text-white sm:text-3xl">
            {t("quoteTitle")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-300">{t("quoteSubtitle")}</p>
          <div className="mt-7">
            <ButtonLink href="/devis" variant="accent">
              {tc("requestQuote")}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
