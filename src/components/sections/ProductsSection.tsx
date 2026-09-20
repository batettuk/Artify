import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import EmptyState from "@/components/common/EmptyState";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "@/components/common/Image";
import type { CmsPageDto, ProductCardDto } from "@/api/cms/types/public";

function ProductCard({
  product,
  ctaLabel,
  delay = 0,
}: {
  product: ProductCardDto;
  ctaLabel: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} direction="up" className="flex h-full flex-col">
      {/* Outer container with 45-degree top-left chamfer cut border */}
      <div className="group relative flex h-full flex-col bg-slate-200/90 p-[1px] transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#0d1a46]/50 hover:shadow-2xl [clip-path:polygon(22px_0,100%_0,100%_100%,0_100%,0_22px)] dark:bg-white/10 dark:hover:bg-white/30">
        {/* Inner Card */}
        <div className="relative flex h-full flex-col justify-between bg-white p-5 sm:p-6 [clip-path:polygon(21px_0,100%_0,100%_100%,0_100%,0_21px)] dark:bg-[#0b132b]">
          {/* Top-left chamfer geometric line accent */}
          <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-b border-r border-[#0d1a46]/15 bg-slate-100/80 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80 dark:border-white/20 dark:bg-white/10" />

          {/* Subtle Architectural Corner Marks */}
          <div className="pointer-events-none absolute right-2.5 top-2.5 font-mono text-[10px] text-slate-400 select-none dark:text-white/60">
            +
          </div>
          <div className="pointer-events-none absolute left-2.5 bottom-2.5 font-mono text-[10px] text-slate-400 select-none dark:text-white/40">
            +
          </div>
          <div className="pointer-events-none absolute right-2.5 bottom-2.5 font-mono text-[10px] text-slate-400 select-none dark:text-white/40">
            +
          </div>

          <div>
            {/* Full Height Proportional Image Container - Not cut in half */}
            <Link
              href={`/products/${product.slug}`}
              className="block overflow-hidden bg-slate-100 dark:bg-slate-900"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                {product.thumbnailUrl && (
                  <Image
                    src={product.thumbnailUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {product.logoUrl && (
                  <div className="pointer-events-none absolute bottom-3.5 left-3.5 flex items-center">
                    <Image
                      src={product.logoUrl}
                      alt={`${product.title} logo`}
                      width={180}
                      height={50}
                      className="h-5 w-auto max-w-[120px] object-contain object-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                    />
                  </div>
                )}
              </div>
            </Link>

            {/* Title with Uniform Height */}
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="mt-5 flex min-h-[3rem] items-center font-display text-lg sm:text-xl font-bold leading-tight text-[#0d1a46] transition-colors group-hover:text-primary dark:!text-white">
                <span className="line-clamp-2 text-inherit dark:!text-white">{product.title}</span>
              </h3>
            </Link>

            {/* Description on the bottom */}
            <p className="mt-2.5 flex min-h-[4rem] items-start text-xs sm:text-sm leading-relaxed text-slate-600 dark:!text-white">
              <span className="line-clamp-3 text-inherit dark:!text-white">{product.excerpt}</span>
            </p>
          </div>

          {/* Full-Width Square Button at the bottom */}
          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/10">
            <Link
              href={`/products/${product.slug}`}
              className="flex w-full items-center justify-between rounded-none bg-[#0d1a46] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all group-hover:bg-primary group-hover:text-primary-foreground dark:bg-white dark:text-[#070e24] dark:group-hover:bg-slate-200"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export async function ProductsSection({
  products,
  locale,
}: {
  page?: CmsPageDto | null;
  products: ProductCardDto[];
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-12 lg:py-20 bg-[#f8fafc] border-b border-slate-200/80 dark:bg-[#060b18] dark:border-white/10">
      <div className="mx-auto max-w-[1400px]">
        {products.length === 0 ? (
          <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
        ) : (
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${products.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} items-stretch`}>
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                ctaLabel={t("cta")}
                delay={0.08 * (index + 1)}
              />
            ))}
          </div>
        )}

        {/* Artify Academy Portal Highlight Card */}
        <div className="mt-12 sm:mt-16 group relative bg-slate-200/90 p-[1px] shadow-sm transition-all duration-300 [clip-path:polygon(20px_0,100%_0,100%_100%,0_100%,0_20px)] dark:bg-white/10">
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#070e24] p-6 sm:p-8 [clip-path:polygon(19px_0,100%_0,100%_100%,0_100%,0_19px)] text-white">
            <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-b border-r border-white/20 bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />
            <div className="max-w-2xl">
              <span className="inline-block border border-white/20 bg-white/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-white mb-2">
                academy.artify.mn
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                {locale === "mn" ? "Artify Академи — Сургалтын нэгдсэн систем" : "Artify Academy — Training & Certification"}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-white leading-relaxed">
                {locale === "mn"
                  ? "Барилгын салбарын инженер, техникийн ажилтнууд болон борлуулагчдад зориулсан мэргэшсэн сургалтын систем."
                  : "Specialized engineering calculation modules, property sales masterclasses, and certified workforce development."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href="https://academy.artify.mn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-none bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#070e24] shadow-md transition-all hover:bg-slate-200 w-full sm:w-auto"
              >
                <span>academy.artify.mn</span>
                <ExternalLink size={15} />
              </a>
              <a
                href="https://www.facebook.com/block.mn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-none border border-white/30 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-white/20 w-full sm:w-auto"
              >
                <span>Block Academy (FB)</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
