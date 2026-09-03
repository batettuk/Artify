import { getTranslations } from "next-intl/server";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { getProducts } from "@/api/cms/server/queries/get-products";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { CmsContent } from "@/components/common/CmsContent";
import Image from "@/components/common/Image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const page = await getPageDetail({ slug: "products", language: locale });
  return {
    title: `${page?.name ?? t("products")} | Artify`,
    description: page?.description ?? undefined,
  };
}

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;

  const [page, products] = await Promise.all([
    getPageDetail({ slug: "products", language: locale }),
    getProducts(locale),
  ]);

  return (
    <>
      <section className="px-3 pt-28 lg:px-6 lg:pt-32">
        <div className="relative overflow-hidden rounded-none px-6 py-16 text-center text-white lg:rounded-none lg:py-24">
          {/* Background Image (presentation asset — media manifest: reference) */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
              alt="Construction materials"
              fill
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/80" />
          </div>

          <div className="relative z-10">
            <FadeIn>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                {page?.name}
              </span>
            </FadeIn>
          </div>
        </div>
      </section>

      <ProductsSection page={page} products={products} locale={locale} />

      {page?.content && (
        <section className="px-3 py-10 lg:px-6">
          <div className="mx-auto max-w-[1400px] rounded-none bg-card p-6 shadow-sm lg:rounded-none lg:p-12">
            <FadeIn>
              <CmsContent
                html={page.content}
                className="prose max-w-none"
              />
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}
