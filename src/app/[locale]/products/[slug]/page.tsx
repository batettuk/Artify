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
  const [product, allProducts, t] = await Promise.all([
    getProductDetail({ slug, language: locale }),
    getProducts(locale),
    getTranslations({ locale, namespace: "products" }),
  ]);
  if (!product) notFound();

  const otherProducts = allProducts.filter((p) => p.slug !== slug);
  const heroImage = product.thumbnailUrl || "/images/consulting-1.jpg";

  return (
    <article className="bg-background">
      {/* Full-bleed Edge-to-Edge Hero Banner */}
      <section className="relative flex min-h-[480px] w-full items-end overflow-hidden bg-[#070e24] pt-32 pb-16 lg:min-h-[560px] lg:pt-40 lg:pb-24">
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

            <FadeIn delay={0.25} className="flex flex-wrap items-center gap-4">
              {product.logoUrl && (
                <div className="flex h-12 items-center">
                  <Image
                    src={product.logoUrl}
                    alt={`${product.title} logo`}
                    width={200}
                    height={60}
                    className="h-8 w-auto max-w-[160px] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
                  />
                </div>
              )}

              {product.websiteUrl && (
                <a
                  href={product.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 bg-primary px-6 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {t("visitWebsite")}
                  <ArrowUpRight size={16} />
                </a>
              )}

              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 border border-white/40 bg-white/15 px-6 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#0d1a46]"
              >
                {locale === "mn" ? "Зөвлөгөө авах" : "Get Consultation"}
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Technical Specifications Bar */}
      <section className="border-y border-slate-200 bg-[#f8fafc] px-4 py-8 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
            <div className="border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">01 / СТАНДАРТ</span>
              <p className="mt-1 font-display text-sm font-bold text-[#0d1a46]">MNS & Европын норм</p>
            </div>
            <div className="border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">02 / ЧАНАР</span>
              <p className="mt-1 font-display text-sm font-bold text-[#0d1a46]">Мэргэшсэн инженерчлэл</p>
            </div>
            <div className="border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">03 / БАТАЛГАА</span>
              <p className="mt-1 font-display text-sm font-bold text-[#0d1a46]">100% Найдвартай шийдэл</p>
            </div>
            <div className="border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">04 / ЗОРИУЛАЛТ</span>
              <p className="mt-1 font-display text-sm font-bold text-[#0d1a46]">Бүх төрлийн барилга</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details & Content Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sticky Left Architectural Control Card */}
            <FadeIn className="lg:col-span-4">
              <div className="sticky top-28 relative space-y-6 border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                {/* Corner Crosshairs */}
                <div className="pointer-events-none absolute left-2 top-2 font-mono text-[10px] text-slate-300 select-none">+</div>
                <div className="pointer-events-none absolute right-2 top-2 font-mono text-[10px] text-slate-300 select-none">+</div>
                <div className="pointer-events-none absolute left-2 bottom-2 font-mono text-[10px] text-slate-300 select-none">+</div>
                <div className="pointer-events-none absolute right-2 bottom-2 font-mono text-[10px] text-slate-300 select-none">+</div>

                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0d1a46]">
                    {t("details")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-[#0d1a46]">
                    {product.title}
                  </h3>
                </div>

                {product.excerpt && (
                  <p className="text-sm leading-relaxed text-slate-600">
                    {product.excerpt}
                  </p>
                )}

                <div className="space-y-3 pt-2">
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center gap-2 bg-[#0d1a46] px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    <span>{locale === "mn" ? "Төслийн зөвлөгөө авах" : "Inquire for Consultation"}</span>
                    <ArrowUpRight size={15} />
                  </Link>

                  {product.websiteUrl && (
                    <a
                      href={product.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 border border-slate-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#0d1a46] transition-all hover:bg-slate-50"
                    >
                      <span>{t("visitWebsite")}</span>
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Right Detailed Solution Prose */}
            <FadeIn delay={0.1} className="lg:col-span-8">
              <div className="border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10 lg:p-14">
                {product.content ? (
                  <CmsContent
                    html={product.content}
                    className="prose max-w-none text-slate-700 prose-headings:font-display prose-headings:font-bold prose-headings:text-[#0d1a46] prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-primary prose-strong:text-[#0d1a46] prose-li:text-slate-600 prose-li:marker:text-primary"
                  />
                ) : (
                  <div className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-[#0d1a46] sm:text-3xl">
                      {product.title}
                    </h2>
                    <p className="text-base leading-relaxed text-slate-600">
                      {product.excerpt}
                    </p>
                    <div className="mt-8 border-t border-slate-100 pt-6">
                      <h4 className="font-display text-lg font-bold text-[#0d1a46]">
                        {locale === "mn" ? "Шийдлийн давуу талууд" : "Key Solution Features"}
                      </h4>
                      <ul className="mt-4 space-y-3 text-sm text-slate-600">
                        <li className="flex items-start gap-2.5">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-primary" />
                          <span>Инженерчлэлийн нарийн тооцоолол, стандартад бүрэн нийцсэн шийдэл</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-primary" />
                          <span>Эрчим хүчний хэмнэлт, эрүүл аюулгүй амьдрах орчны чанарын баталгаа</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-primary" />
                          <span>Мэргэжлийн инженер, зөвлөхүүдийн цогц дэмжлэг ба угсралт</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Related Products / Solutions Section */}
      {otherProducts.length > 0 && (
        <section className="border-t border-slate-200 bg-[#f8fafc] px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <FadeIn>
              <div className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0d1a46]/70">ARTIFY ECOSYSTEM</span>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#0d1a46] lg:text-3xl">
                    {locale === "mn" ? "Бусад бүтээгдэхүүн, үйлчилгээ" : "Explore Other Solutions"}
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 border border-[#0d1a46] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#0d1a46] transition-all hover:bg-[#0d1a46] hover:text-white"
                >
                  <span>{t("backToProducts")}</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {otherProducts.map((other, idx) => (
                <FadeIn key={other.id} delay={0.1 * (idx + 1)} direction="up" className="flex h-full flex-col">
                  {/* Outer container with 45-degree top-left chamfer border */}
                  <div className="group relative flex h-full flex-col bg-slate-200/90 p-[1px] transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#0d1a46]/50 hover:shadow-2xl [clip-path:polygon(22px_0,100%_0,100%_100%,0_100%,0_22px)]">
                    {/* Inner Card */}
                    <div className="relative flex h-full flex-col justify-between bg-white p-6 [clip-path:polygon(21px_0,100%_0,100%_100%,0_100%,0_21px)]">
                      <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-b border-r border-[#0d1a46]/15 bg-slate-100/80 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />
                      <div className="pointer-events-none absolute right-2.5 top-2.5 font-mono text-[10px] text-slate-300 select-none">+</div>
                      <div className="pointer-events-none absolute left-2.5 bottom-2.5 font-mono text-[10px] text-slate-300 select-none">+</div>
                      <div className="pointer-events-none absolute right-2.5 bottom-2.5 font-mono text-[10px] text-slate-300 select-none">+</div>

                      <div>
                        <div className="mb-4 flex items-center justify-between pl-3 text-xs font-bold uppercase tracking-widest text-[#0d1a46]/70">
                          <span className="font-mono text-[#0d1a46]">0{idx + 1} / PRODUCT</span>
                          <span className="border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                            ARTIFY
                          </span>
                        </div>

                        <Link
                          href={`/products/${other.slug}`}
                          className="block overflow-hidden bg-slate-200/80 p-[1px] [clip-path:polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]"
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 [clip-path:polygon(15px_0,100%_0,100%_100%,0_100%,0_15px)]">
                            {other.thumbnailUrl && (
                              <Image
                                src={other.thumbnailUrl}
                                alt={other.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            )}
                          </div>
                        </Link>

                        <Link href={`/products/${other.slug}`} className="block">
                          <h3 className="mt-5 flex h-[3.5rem] items-center font-display text-xl font-bold leading-tight text-[#0d1a46] transition-colors group-hover:text-primary">
                            <span className="line-clamp-2">{other.title}</span>
                          </h3>
                        </Link>

                        <p className="mt-3 flex h-[4.25rem] items-start text-sm leading-relaxed text-slate-600">
                          <span className="line-clamp-3">{other.excerpt}</span>
                        </p>
                      </div>

                      <div className="mt-6 border-t border-slate-100 pt-4">
                        <Link
                          href={`/products/${other.slug}`}
                          className="flex w-full items-center justify-between bg-[#0d1a46] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <span>{t("cta")}</span>
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
