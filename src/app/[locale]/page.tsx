import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { getHomeContent } from "@/features/home/server/get-home-content";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { CeoSection } from "@/components/sections/CeoSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { HomeCtaSection } from "@/components/sections/HomeCtaSection";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPageDetail({ slug: "home", language: locale });

  return page
    ? { title: `${page.name} | Artify`, description: page.description ?? undefined }
    : { title: "Artify" };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const { page, sectionPages, blogPosts } =
    await getHomeContent(locale);

  if (!page) notFound();

  return (
    <>
      <Hero heading={page.name} body={page.description} videoUrl={page.videoUrl} />
      <AboutSection page={sectionPages.about} />
      <CeoSection page={sectionPages.ceo} locale={locale} />
      <BlogSection page={sectionPages.blog} posts={blogPosts} locale={locale} />
      <HomeCtaSection locale={locale} />
    </>
  );
}
