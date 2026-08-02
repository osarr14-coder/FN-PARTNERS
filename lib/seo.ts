import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const defaultOgImage = `${siteUrl}/images/og-image.png`;

export function buildMetadata({
  locale,
  pathname,
  title,
  description,
  image,
}: {
  locale: "fr" | "en";
  pathname: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const clean = pathname === "/" ? "" : pathname;
  const url = `${siteUrl}/${locale}${clean}`;
  const frUrl = `${siteUrl}/fr${clean}`;
  const enUrl = `${siteUrl}/en${clean}`;
  const ogImage = image || defaultOgImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { fr: frUrl, en: enUrl, "x-default": frUrl },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "FN Partners",
      locale: locale === "fr" ? "fr_MA" : "en_US",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
