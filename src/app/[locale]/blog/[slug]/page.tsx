import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_POSTS } from "@/graphql/cms/queries/post";
import { routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Calendar } from "lucide-react";
import type { CpPostsData, Post } from "@/graphql/cms/queries/post";

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const client = getStaticApolloClient();
      const { data } = await client.query<CpPostsData>({
        query: CP_POSTS,
        variables: { language: locale, status: "published", limit: 100 },
        context: { fetchOptions: { next: { revalidate: 60 } } },
      });
      return (data?.cpPosts ?? [])
        .filter((p: Post) => p.slug)
        .map((p: Post) => ({ locale, slug: p.slug as string }));
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
  const client = getStaticApolloClient();
  const { data } = await client.query<CpPostsData>({
    query: CP_POSTS,
    variables: { language: locale, status: "published", searchValue: slug, limit: 100 },
    context: { fetchOptions: { next: { revalidate: 60 } } },
    errorPolicy: "ignore",
  });

  const post = data?.cpPosts?.find((p: Post) => p.slug === slug);
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
  const client = getStaticApolloClient();
  const { data } = await client.query<CpPostsData>({
    query: CP_POSTS,
    variables: { language: locale, status: "published", searchValue: slug, limit: 100 },
    context: { fetchOptions: { next: { revalidate: 60 } } },
    errorPolicy: "ignore",
  });

  const post = data?.cpPosts?.find((p: Post) => p.slug === slug);
  if (!post) notFound();

  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("mn-MN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).replace(/\./g, ".")
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
          <FadeIn delay={0.3}>
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-none bg-muted shadow-lg lg:rounded-none">
              {post.thumbnail?.url ? (
                <img
                  src={post.thumbnail.url}
                  alt={post.title ?? ""}
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                  alt={post.title ?? ""}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </FadeIn>

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
                <div
                  className="prose prose-base max-w-none text-foreground prose-headings:font-display prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:marker:text-primary"
                  dangerouslySetInnerHTML={{ __html: post.content }}
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
                Бүх мэдээ рүү буцах
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </article>
  );
}
