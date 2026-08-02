import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Link } from "@/i18n/navigation";
import { getPublishedPosts } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return buildMetadata({ locale, pathname: "/actualites", title: t("title"), description: t("subtitle") });
}

export default async function NewsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const posts = await getPublishedPosts();
  const dateLocale = locale === "fr" ? fr : enUS;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        {posts.length === 0 ? (
          <p className="mt-12 text-slate-500">{t("empty")}</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/actualites/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 transition-shadow hover:shadow-md"
              >
                {post.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.cover_image} alt="" className="h-44 w-full object-cover" />
                ) : (
                  <div className="h-44 w-full bg-ink-950" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {t("publishedOn")} {format(new Date(post.created_at), "d MMMM yyyy", { locale: dateLocale })}
                  </p>
                  <h2 className="mt-2 font-heading text-lg font-semibold text-ink-950 group-hover:text-accent-600">
                    {locale === "fr" ? post.title_fr : post.title_en}
                  </h2>
                  {(locale === "fr" ? post.excerpt_fr : post.excerpt_en) && (
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {locale === "fr" ? post.excerpt_fr : post.excerpt_en}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
