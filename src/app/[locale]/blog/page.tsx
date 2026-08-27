import { getTranslations } from "next-intl/server";
import { getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_POSTS } from "@/graphql/cms/queries/post";
import { FadeIn } from "@/components/motion/FadeIn";
import { FeaturedPost } from "@/components/sections/FeaturedPost";
import { AllPostsSection } from "@/components/sections/AllPostsSection";
import type { CpPostsData } from "@/graphql/cms/queries/post";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("blog")} | Artify`,
    description: "Artify — мэдээ, нийтлэл.",
  };
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;

  const client = getStaticApolloClient();
  const { data } = await client.query<CpPostsData>({
    query: CP_POSTS,
    variables: { language: locale, status: "published", limit: 20 },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });

  const posts = data?.cpPosts ?? [];
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.publishedDate ?? 0).getTime();
    const dateB = new Date(b.publishedDate ?? 0).getTime();
    return dateB - dateA;
  });

  const featuredPost = sortedPosts[0] ?? null;
  const remainingPosts = sortedPosts.slice(1);

  return (
    <>
      <section className="px-3 pt-28 lg:px-6 lg:pt-32">
        <div className="relative overflow-hidden rounded-none px-6 py-16 text-center text-white lg:rounded-none lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
              alt="News background"
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
                Мэдээ
              </h1>
            </FadeIn>
          </div>
        </div>
      </section>

      <FeaturedPost post={featuredPost} />
      <AllPostsSection posts={remainingPosts} />
    </>
  );
}
