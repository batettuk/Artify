import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { getHomeContent } from "@/features/home/server/get-home-content";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { CeoSection } from "@/components/sections/CeoSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { HomeCtaSection } from "@/components/sections/HomeCtaSection";

import { getPostBySlug } from "@/api/cms/server/queries/get-post-by-slug";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const [page, heroPost] = await Promise.all([
    getPageDetail({ slug: "home", language: locale }),
    getPostBySlug({ slug: "home-hero", language: locale }),
  ]);

  const title = heroPost?.title || page?.name || "Artify";
  const description = heroPost?.excerpt || heroPost?.content || page?.description || "";

  return {
    title: `${title} | Artify`,
    description,
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const { page, sectionPages, blogPosts, posts } =
    await getHomeContent(locale);

  if (!page) notFound();

  const heroHeading = posts.hero?.title || page.name;
  const heroBody = posts.hero?.excerpt || posts.hero?.content || page.description;

  return (
    <>
      <Hero
        heading={heroHeading}
        body={heroBody}
        videoUrl={page.videoUrl}
        locale={locale}
      />
      <AboutSection page={sectionPages.about} post={posts.about} />
      <CeoSection
        page={sectionPages.ceo}
        statementPost={posts.ceoStatement}
        credentialsPost={posts.ceoCredentials}
        locale={locale}
      />
      <BlogSection page={sectionPages.blog} posts={blogPosts} locale={locale} />
      <HomeCtaSection post={posts.homeCta} locale={locale} />
    </>
  );
}

