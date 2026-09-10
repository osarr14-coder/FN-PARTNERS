import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button";
import { ChevronMotif } from "@/components/chevron-motif";
import { cutCorner } from "@/components/dossier-tag";
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
    {
      icon: MapPin,
      label: t("addressLabel"),
      values: [{ value: contact.addressLines[locale].join(", "), href: undefined }],
    },
    { icon: Phone, label: t("phoneLabel"), values: [{ value: contact.phone, href: contact.phoneHref }] },
    {
      icon: Mail,
      label: t("emailLabel"),
      values: [
        { value: contact.email, href: `mailto:${contact.email}` },
        { value: contact.emailFounder, href: `mailto:${contact.emailFounder}` },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <div key={card.label} className={`border border-slate-200 bg-white p-7 ${cutCorner}`}>
              <card.icon className="text-accent-600" size={26} strokeWidth={1.5} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">{card.label}</p>
              <div className="mt-1.5 space-y-1">
                {card.values.map((item) =>
                  item.href ? (
                    <a
                      key={item.value}
                      href={item.href}
                      className="block text-sm font-medium text-ink-900 hover:text-accent-600"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p key={item.value} className="text-sm font-medium leading-relaxed text-ink-900">
                      {item.value}
                    </p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl bg-ink-950 px-8 py-12 text-center sm:px-16">
          <ChevronMotif />
          <h2 className="relative text-balance font-heading text-2xl font-semibold text-white sm:text-3xl">
            {t("quoteTitle")}
          </h2>
          <p className="relative mx-auto mt-2 max-w-xl text-slate-300">{t("quoteSubtitle")}</p>
          <div className="relative mt-7">
            <ButtonLink href="/devis" variant="accent">
              {tc("requestQuote")}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
