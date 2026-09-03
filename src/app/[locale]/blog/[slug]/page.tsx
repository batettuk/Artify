import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/api/cms/server/queries/get-blog-posts";
import { getPostDetail } from "@/api/cms/server/queries/get-post-detail";
import { routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { CmsContent } from "@/components/common/CmsContent";
import Image from "@/components/common/Image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Calendar } from "lucide-react";

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const posts = await getBlogPosts({ language: locale, limit: 100 });
      return posts.map((post) => ({ locale, slug: post.slug }));
    })
  );
  return results.flat();
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostDetail({ slug, language: locale });
  if (!post) return {};

  return {
    title: `${post.title} | Artify`,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = await getPostDetail({ slug, language: locale });
  if (!post) notFound();

  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  return (
    <article className="bg-background">
      {/* Hero Section with Dark Background */}
      <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] px-3 pt-28 lg:px-6 lg:pt-32">
        <div className="mx-auto max-w-[1280px] pb-16 lg:pb-24">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-2 text-sm text-[#f97316]">
              <Calendar size={16} />
              {formattedDate}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="mt-4 font-display text-xl font-semibold leading-tight text-white lg:text-3xl xl:text-4xl">
              {post.title}
            </h1>
          </FadeIn>
        </div>

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="px-3 py-10 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-[1280px]">
          {/* Featured Image */}
          {post.thumbnailUrl && (
            <FadeIn delay={0.3}>
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-none bg-muted shadow-lg lg:rounded-none">
                <Image
                  src={post.thumbnailUrl}
                  alt={post.title}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            </FadeIn>
          )}

          {post.excerpt && (
            <FadeIn delay={0.4}>
              <div className="mx-auto mt-8 max-w-2xl">
                <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                  {post.excerpt}
                </p>
              </div>
            </FadeIn>
          )}

          {post.content && (
            <FadeIn delay={0.5}>
              <div className="mx-auto mt-8 max-w-2xl">
                <CmsContent
                  html={post.content}
                  className="prose prose-base max-w-none text-foreground prose-headings:font-display prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:marker:text-primary"
                />
              </div>
            </FadeIn>
          )}

          {/* Back to all news link at bottom */}
          <FadeIn delay={0.6}>
            <div className="mt-16 border-t border-border pt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-none border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <ArrowLeft size={16} />
                {t("backToAll")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </article>
  );
}
