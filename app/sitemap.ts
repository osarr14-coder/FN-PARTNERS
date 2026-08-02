import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { servicePoles } from "@/content/company";
import { getPublishedPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

const staticPaths = ["/", "/a-propos", "/services", "/secteurs", "/actualites", "/contact", "/devis"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  const servicePaths = servicePoles.map((p) => `/services/${p.slug}`);
  const postPaths = posts.map((p) => `/actualites/${p.slug}`);
  const allPaths = [...staticPaths, ...servicePaths, ...postPaths];

  return allPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}${path === "/" ? "" : path}`])),
      },
    }))
  );
}
