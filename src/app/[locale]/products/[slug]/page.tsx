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

  const heroImage = product.thumbnailUrl || "/images/consulting-1.jpg";

  return (
    <article className="bg-background">
      {/* Full-bleed Edge-to-Edge Hero Banner */}
      <section className="relative flex min-h-[460px] w-full items-end overflow-hidden bg-[#070e24] pt-32 pb-16 lg:min-h-[540px] lg:pt-40 lg:pb-20">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={product.title}
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center scale-[1.01]"
          />
          {/* Subtle cinematic gradient overlay preserving image clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e24] via-[#070e24]/65 to-[#070e24]/35" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <FadeIn>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
            >
              <ArrowLeft size={14} />
              {t("backToProducts")}
            </Link>
          </FadeIn>

          <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <FadeIn delay={0.1}>
                <span className="inline-block border border-sky-400/30 bg-sky-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-300 backdrop-blur-sm">
                  02 — {t("detailLabel")}
                </span>
              </FadeIn>

              <FadeIn delay={0.15}>
                <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {product.title}
                </h1>
              </FadeIn>

              {product.excerpt && (
                <FadeIn delay={0.2}>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 lg:text-lg">
                    {product.excerpt}
                  </p>
                </FadeIn>
              )}
            </div>

            <FadeIn delay={0.25} className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              {product.logoUrl && (
                <div className="flex h-12 items-center border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <Image
                    src={product.logoUrl}
                    alt={`${product.title} logo`}
                    width={200}
                    height={60}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              )}

              {product.websiteUrl && (
                <a
                  href={product.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {t("visitWebsite")}
                  <ArrowUpRight size={17} />
                </a>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main Details & Content Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          {product.content ? (
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <FadeIn className="lg:col-span-4">
                <div className="sticky top-28 space-y-6 border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {t("details")}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#0d1a46]">
                    {product.title}
                  </h3>
                  {product.excerpt && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {product.excerpt}
                    </p>
                  )}
                  {product.websiteUrl && (
                    <a
                      href={product.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 bg-[#0d1a46] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                    >
                      {t("visitWebsite")}
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </FadeIn>

              <FadeIn delay={0.1} className="lg:col-span-8">
                <div className="border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
                  <CmsContent
                    html={product.content}
                    className="prose max-w-none text-slate-700 prose-headings:font-display prose-headings:font-bold prose-headings:text-[#0d1a46] prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-primary prose-strong:text-[#0d1a46] prose-li:text-slate-600 prose-li:marker:text-primary"
                  />
                </div>
              </FadeIn>
            </div>
          ) : (
            <div className="border border-slate-200/80 bg-white p-8 text-center sm:p-12">
              <FadeIn>
                <p className="text-base text-muted-foreground">
                  {locale === "mn"
                    ? "Дэлгэрэнгүй мэдээлэл удахгүй нийтлэгдэнэ."
                    : "Detailed information will be published soon."}
                </p>
              </FadeIn>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
