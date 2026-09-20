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
  params: Promise<{ locale: string; slug: string }>;
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
  params: Promise<{ locale: string; slug: string }>;
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

  const heroImage = post.thumbnailUrl || "/images/about-2.jpg";

  return (
    <article className="bg-background">
      {/* Full-bleed Edge-to-Edge Hero Banner */}
      <section className="relative flex min-h-[480px] w-full items-end overflow-hidden bg-[#070e24] pt-32 pb-16 lg:min-h-[560px] lg:pt-40 lg:pb-24">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center scale-[1.01]"
          />
          {/* Subtle cinematic gradient overlay preserving image clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e24] via-[#070e24]/60 to-[#070e24]/30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 transition-colors hover:text-white mb-6"
            >
              <ArrowLeft size={14} />
              {t("backToAll")}
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-white/90 mb-4">
              
              {formattedDate && (
                <span className="flex items-center gap-1.5 border border-white/20 bg-white/10 px-3 py-1 text-white backdrop-blur-sm">
                  <Calendar size={13} className="text-white/80" />
                  {formattedDate}
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl max-w-4xl">
              {post.title}
            </h1>
          </FadeIn>

          {post.excerpt && (
            <FadeIn delay={0.2}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 lg:text-lg">
                {post.excerpt}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-[1000px] px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <FadeIn delay={0.1}>
          <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-headings:text-[#0d1a46] dark:prose-headings:text-white prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-strong:text-[#0d1a46] dark:prose-strong:text-white">
            <CmsContent html={post.content} />
          </div>
        </FadeIn>

        <div className="mt-16 border-t border-slate-200/80 pt-8 dark:border-white/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#0d1a46] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#070e24]"
          >
            <ArrowLeft size={15} className="text-white dark:text-[#070e24]" />
            <span className="text-white dark:text-[#070e24] font-bold">{t("backToAll")}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
