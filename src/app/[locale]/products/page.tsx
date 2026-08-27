import { getTranslations } from "next-intl/server";
import { getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_PAGE } from "@/graphql/cms/queries/page";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProductsSection } from "@/components/sections/ProductsSection";
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
    title: `${t("products")} | Artify`,
    description: "Artify — бүтээгдэхүүн, шийдэл.",
  };
}

export default async function ProductsPage({
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

  const page = data?.cpPages?.find((p) => p.slug === "products") ?? null;

  return (
    <>
      <section className="px-3 pt-28 lg:px-6 lg:pt-32">
        <div className="relative overflow-hidden rounded-none px-6 py-16 text-center text-white lg:rounded-none lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
              alt="Construction materials"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/80" />
          </div>

          <div className="relative z-10">
            <FadeIn>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                БҮТЭЭГДЭХҮҮН
              </span>
            </FadeIn>
          </div>
        </div>
      </section>

      <ProductsSection />

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
