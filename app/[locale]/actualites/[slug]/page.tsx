import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { getPublishedPostBySlug } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    pathname: `/actualites/${slug}`,
    title: locale === "fr" ? post.title_fr : post.title_en,
    description: (locale === "fr" ? post.excerpt_fr : post.excerpt_en) ?? "",
    ...(post.cover_image ? { image: post.cover_image } : {}),
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations("news");
  const dateLocale = locale === "fr" ? fr : enUS;
  const title = locale === "fr" ? post.title_fr : post.title_en;
  const content = locale === "fr" ? post.content_fr : post.content_en;
  const paragraphs = content.split(/\n{2,}/).filter(Boolean);

  return (
    <article className="py-20 sm:py-28">
      <Container className="mx-auto max-w-2xl">
        <ButtonLink href="/actualites" variant="ghost" className="px-0 text-sm">
          ← {t("backToList")}
        </ButtonLink>

        <p className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-400">
          {t("publishedOn")} {format(new Date(post.created_at), "d MMMM yyyy", { locale: dateLocale })}
        </p>
        <h1 className="mt-2 text-balance font-heading text-3xl font-semibold text-ink-950 sm:text-4xl">{title}</h1>

        {post.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_image} alt="" className="mt-8 aspect-video w-full rounded-2xl object-cover" />
        )}

        <div className="mt-8 space-y-5">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </article>
  );
}
