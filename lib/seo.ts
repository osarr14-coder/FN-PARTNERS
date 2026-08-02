import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

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
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
