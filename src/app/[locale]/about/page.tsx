import { getTranslations } from "next-intl/server";
import { getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_PAGE } from "@/graphql/cms/queries/page";
import { FadeIn } from "@/components/motion/FadeIn";
import { AboutSection } from "@/components/sections/AboutSection";
import type { CpPageData } from "@/graphql/cms/queries/page";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("about")} | Artify`,
    description: "Artify — бидний тухай.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;

  const client = getStaticApolloClient();
  const { data } = await client.query<CpPageData>({
    query: CP_PAGE,
    variables: { language: locale },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });

  const page = data?.cpPages?.find((p) => p.slug === "about") ?? null;

  return (
    <>
      <section className="px-3 pt-28 lg:px-6 lg:pt-32">
        <div className="rounded-none bg-gradient-to-br from-primary to-accent px-6 py-16 text-center text-white lg:rounded-none lg:py-24">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              {page?.name ?? "About"}
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight lg:text-5xl">
              {page?.description ?? "12+ жилийн туршлага"}
            </h1>
          </FadeIn>
        </div>
      </section>

      <AboutSection />

      {page?.content && (
        <section className="px-3 py-10 lg:px-6">
          <div className="mx-auto max-w-[1400px] rounded-none bg-card p-6 shadow-sm lg:rounded-none lg:p-12">
            <FadeIn>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}
