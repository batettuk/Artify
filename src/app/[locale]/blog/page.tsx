import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/api/cms/server/queries/get-blog-posts";
import { getFeaturedPosts } from "@/api/cms/server/queries/get-featured-posts";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { FeaturedPost } from "@/components/sections/FeaturedPost";
import { AllPostsSection } from "@/components/sections/AllPostsSection";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const page = await getPageDetail({ slug: "blog", language: locale });
  return {
    title: `${page?.name ?? t("blog")} | Artify`,
    description: page?.description ?? "Artify — мэдээ, нийтлэл.",
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [page, featuredPosts, posts] = await Promise.all([
    getPageDetail({ slug: "blog", language: locale }),
    getFeaturedPosts({ language: locale, limit: 1 }),
    getBlogPosts({ language: locale, limit: 20 }),
  ]);

  const featuredPost = featuredPosts[0] ?? null;
  const remainingPosts = featuredPost
    ? posts.filter((post) => post.id !== featuredPost.id)
    : posts;

  return (
    <>
      {/* Full-bleed Edge-to-Edge Hero Banner */}
      <section className="relative flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-[#070e24] pt-32 pb-20 lg:min-h-[540px] lg:pt-40 lg:pb-28">
        <div className="absolute inset-0">
          <Image
            src="/images/about-2.jpg"
            alt="Artify News & Insights"
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center scale-[1.01]"
          />
          {/* Subtle cinematic gradient overlay preserving image clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e24] via-[#070e24]/55 to-[#070e24]/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white lg:px-12">
          <FadeIn>
            <span className="inline-block border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-sky-300 backdrop-blur-sm">
              04 — {locale === "mn" ? "Мэдээ, Нийтлэл" : "News & Insights"}
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {page?.name || (locale === "mn" ? "Сүүлийн Үеийн Мэдээ" : "Latest Articles")}
            </h1>
          </FadeIn>

          {page?.description && (
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200 lg:text-lg">
                {page.description}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      <FeaturedPost post={featuredPost} />
      <AllPostsSection posts={remainingPosts} />
    </>
  );
}
