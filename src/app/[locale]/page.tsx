import { getTranslations } from "next-intl/server";
import { getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_POSTS } from "@/graphql/cms/queries/post";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { CeoSection } from "@/components/sections/CeoSection";
import { CompletedWorkSection } from "@/components/sections/CompletedWorkSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactForm } from "@/components/sections/ContactForm";
import type { CpPostsData } from "@/graphql/cms/queries/post";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `Artify | ${t("label")}`,
    description: t("body"),
  };
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;

  const client = getStaticApolloClient();
  const { data } = await client.query<CpPostsData>({
    query: CP_POSTS,
    variables: { language: locale, status: "published", limit: 3 },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });

  return (
    <>
      <Hero />
      <AboutSection />
      <CeoSection />
      <CompletedWorkSection />
      <MarqueeSection />
      <BlogSection posts={data?.cpPosts ?? []} />
      <ContactForm locale={locale} />
    </>
  );
}
