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
  params: { locale: string };
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
  params: { locale: string };
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
      <section className="px-3 pt-28 lg:px-6 lg:pt-32">
        <div className="relative overflow-hidden rounded-none px-6 py-16 text-center text-white lg:rounded-none lg:py-24">
          {/* Background Image (presentation asset — media manifest: reference) */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
              alt="News background"
              fill
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/80" />
          </div>

          <div className="relative z-10">
            <FadeIn>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                04 — Blog
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight lg:text-5xl">
                {page?.name}
              </h1>
            </FadeIn>

            {page?.description && (
              <FadeIn delay={0.2}>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 lg:text-lg">
                  {page.description}
                </p>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      <FeaturedPost post={featuredPost} />
      <AllPostsSection posts={remainingPosts} />
    </>
  );
}
