import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProductDetail } from "@/api/cms/server/queries/get-product-detail";
import { getProducts } from "@/api/cms/server/queries/get-products";
import { CmsContent } from "@/components/common/CmsContent";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Link, routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const products = await getProducts(locale);
      return products.map(({ slug }) => ({ locale, slug }));
    }),
  );
  return results.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductDetail({ slug, language: locale });
  if (!product) return {};

  return {
    title: `${product.title} | Artify`,
    description: product.excerpt ?? undefined,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [product, t] = await Promise.all([
    getProductDetail({ slug, language: locale }),
    getTranslations({ locale, namespace: "products" }),
  ]);
  if (!product) notFound();

  return (
    <article className="bg-background px-3 pb-20 pt-28 lg:px-6 lg:pb-28 lg:pt-36">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft size={16} />
            {t("backToProducts")}
          </Link>
        </FadeIn>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {t("detailLabel")}
              </span>
              <h1 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground lg:text-5xl">
                {product.title}
              </h1>
              {product.excerpt && (
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
                  {product.excerpt}
                </p>
              )}
              {product.websiteUrl && (
                <a
                  href={product.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-0"
                >
                  {t("visitWebsite")}
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} direction="left">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted shadow-sm">
              <Image
                src={product.thumbnailUrl}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
              {product.logoUrl && (
                <>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent lg:h-32" />
                  <Image
                    src={product.logoUrl}
                    alt={`${product.title} logo`}
                    width={240}
                    height={80}
                    className="absolute bottom-4 left-4 h-10 w-auto object-contain object-left lg:bottom-6 lg:left-6 lg:h-12"
                  />
                </>
              )}
            </div>
          </FadeIn>
        </div>

        {product.content && (
          <section id="details" className="grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
            <FadeIn className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {t("details")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <CmsContent
                html={product.content}
                className="prose max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:leading-relaxed prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-li:marker:text-primary"
              />
            </FadeIn>
          </section>
        )}
      </div>
    </article>
  );
}
