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

  const heroImage = post.thumbnailUrl || "/images/about-2.jpg";

  return (
    <article className="bg-background">
      {/* Full-bleed Edge-to-Edge Hero Banner */}
      <section className="relative flex min-h-[460px] w-full items-end overflow-hidden bg-[#070e24] pt-32 pb-16 lg:min-h-[540px] lg:pt-40 lg:pb-20">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e24] via-[#070e24]/65 to-[#070e24]/35" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
            >
              <ArrowLeft size={14} />
              {t("backToAll")}
            </Link>
          </FadeIn>

          <div className="mt-6 max-w-4xl">
            <FadeIn delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]">
                <span className="border border-sky-400/30 bg-sky-400/10 px-3.5 py-1 text-sky-300 backdrop-blur-sm">
                  04 — {locale === "mn" ? "Мэдээ, Нийтлэл" : "News & Insights"}
                </span>
                {formattedDate && (
                  <span className="flex items-center gap-1.5 border border-white/20 bg-white/10 px-3 py-1 text-white/90 backdrop-blur-sm">
                    <Calendar size={13} className="text-sky-300" />
                    {formattedDate}
                  </span>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
            </FadeIn>

            {post.excerpt && (
              <FadeIn delay={0.2}>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-200 lg:text-lg">
                  {post.excerpt}
                </p>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Article Content Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl">
          {post.content && (
            <FadeIn delay={0.1}>
              <div className="border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10 lg:p-14">
                <CmsContent
                  html={post.content}
                  className="prose max-w-none text-slate-700 prose-headings:font-display prose-headings:font-bold prose-headings:text-[#0d1a46] prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-primary prose-strong:text-[#0d1a46] prose-ul:text-slate-600 prose-li:marker:text-primary"
                />
              </div>
            </FadeIn>
          )}

          {/* Back to all news button */}
          <FadeIn delay={0.2}>
            <div className="mt-12 flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border border-slate-300 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#0d1a46] shadow-sm transition-all hover:bg-[#0d1a46] hover:text-white"
              >
                <ArrowLeft size={15} />
                {t("backToAll")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </article>
  );
}
