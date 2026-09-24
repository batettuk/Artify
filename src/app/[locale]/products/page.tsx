import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { getProducts } from "@/api/cms/server/queries/get-products";
import { getPostBySlug } from "@/api/cms/server/queries/get-post-by-slug";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProductsSection } from "@/components/sections/ProductsSection";
import Image from "@/components/common/Image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPageDetail({ slug: "products", language: locale });
  return {
    title: `${page?.name ?? "Products"} | Artify`,
    description: page?.description ?? undefined,
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [page, products, academyPost] = await Promise.all([
    getPageDetail({ slug: "products", language: locale }),
    getProducts(locale),
    getPostBySlug({ slug: "academy-portal", language: locale }),
  ]);

  return (
    <>
      {/* Full-bleed Edge-to-Edge Hero Banner */}
      <section className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden bg-[#070e24] pt-32 pb-20 lg:min-h-[460px] lg:pt-36 lg:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/consulting-1.jpg"
            alt="Artify Products & Solutions"
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-[center_28%] transition-transform duration-700"
          />
          {/* Subtle cinematic gradient overlay preserving image clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#070e24]/60 to-[#070e24]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white lg:px-12">
          <FadeIn>
            <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {page?.name || ""}
            </h1>
          </FadeIn>

          {page?.description && (
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white drop-shadow-sm lg:text-lg">
                {page.description}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      <ProductsSection
        page={page}
        products={products}
        academyPost={academyPost}
        locale={locale}
      />
    </>
  );
}
