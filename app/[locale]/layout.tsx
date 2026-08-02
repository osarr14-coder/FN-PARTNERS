import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { headingFont, bodyFont } from "@/lib/fonts";
import { siteUrl } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import "../globals.css";

// Root layout du site public (/[locale]/...). /admin a son propre root layout
// (app/admin/layout.tsx) : Next.js permet plusieurs root layouts distincts tant
// qu'ils sont chacun directement sous app/ sans layout partagé au-dessus qui
// définirait aussi <html>. Ça évite de lire la locale depuis la requête (cookies/
// headers) dans un layout commun, ce qui rendrait tout le site non-statique —
// ici la locale vient de generateStaticParams, donc les pages restent statiques.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FN Partners — Conseil en finance et expertise comptable",
    template: "%s — FN Partners",
  },
  description:
    "FN Partners, cabinet de conseil spécialisé dans les métiers de la finance et de l'expertise comptable à Casablanca, au service des entreprises et groupes marocains.",
  openGraph: {
    siteName: "FN Partners",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
