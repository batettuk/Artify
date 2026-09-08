import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import EmptyState from "@/components/common/EmptyState";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowUpRight } from "lucide-react";
import Image from "@/components/common/Image";
import type { CmsPageDto, ProductCardDto } from "@/api/cms/types/public";

function ProductCard({
  product,
  ctaLabel,
  index,
  delay = 0,
}: {
  product: ProductCardDto;
  ctaLabel: string;
  index: number;
  delay?: number;
}) {
  const indexNum = String(index + 1).padStart(2, "0");

  return (
    <FadeIn delay={delay} direction="up" className="flex h-full flex-col">
      {/* Outer container with 45-degree top-left chamfer border */}
      <div className="group relative flex h-full flex-col bg-slate-200/90 p-[1px] transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#0d1a46]/50 hover:shadow-2xl [clip-path:polygon(22px_0,100%_0,100%_100%,0_100%,0_22px)]">
        {/* Inner Card */}
        <div className="relative flex h-full flex-col justify-between bg-white p-6 [clip-path:polygon(21px_0,100%_0,100%_100%,0_100%,0_21px)]">
          {/* Top-left chamfer geometric line accent */}
          <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-b border-r border-[#0d1a46]/15 bg-slate-100/80 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />

          {/* Subtle Architectural Corner Marks */}
          <div className="pointer-events-none absolute right-2.5 top-2.5 font-mono text-[10px] text-slate-300 select-none">
            +
          </div>
          <div className="pointer-events-none absolute left-2.5 bottom-2.5 font-mono text-[10px] text-slate-300 select-none">
            +
          </div>
          <div className="pointer-events-none absolute right-2.5 bottom-2.5 font-mono text-[10px] text-slate-300 select-none">
            +
          </div>

          <div>
            {/* Top Metadata Header */}
            <div className="mb-4 flex items-center justify-between pl-3 text-xs font-bold uppercase tracking-widest text-[#0d1a46]/70">
              <span className="font-mono text-[#0d1a46]">{indexNum} / PRODUCT</span>
              <span className="border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                ARTIFY SOLUTION
              </span>
            </div>

            {/* Locked Aspect Ratio Media Container with matching top-left cut */}
            <Link
              href={`/products/${product.slug}`}
              className="block overflow-hidden bg-slate-200/80 p-[1px] [clip-path:polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 [clip-path:polygon(15px_0,100%_0,100%_100%,0_100%,0_15px)]">
                {product.thumbnailUrl && (
                  <Image
                    src={product.thumbnailUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {product.logoUrl && (
                  <div className="absolute bottom-3 left-3 flex items-center">
                    <Image
                      src={product.logoUrl}
                      alt={`${product.title} logo`}
                      width={200}
                      height={60}
                      className="h-5 w-auto max-w-[130px] object-contain object-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                )}
              </div>
            </Link>

            {/* Uniform Title with Fixed Height */}
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="mt-5 flex h-[3.5rem] items-center font-display text-xl font-bold leading-tight text-[#0d1a46] transition-colors group-hover:text-primary">
                <span className="line-clamp-2">{product.title}</span>
              </h3>
            </Link>

            {/* Uniform Excerpt with Fixed Height */}
            <p className="mt-3 flex h-[4.25rem] items-start text-sm leading-relaxed text-slate-600">
              <span className="line-clamp-3">{product.excerpt}</span>
            </p>
          </div>

          {/* Bottom Technical Spec Bar & Full-Width Button */}
          <div className="mt-6 border-t border-slate-100 pt-4">
            <Link
              href={`/products/${product.slug}`}
              className="flex w-full items-center justify-between bg-[#0d1a46] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all group-hover:bg-primary group-hover:text-primary-foreground"
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
    <section className="px-4 py-16 sm:px-6 lg:px-12 lg:py-20 bg-[#f8fafc] border-b border-slate-200/80">
      <div className="mx-auto max-w-[1400px]">
        {products.length === 0 ? (
          <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
        ) : (
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${products.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} items-stretch`}>
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                ctaLabel={t("cta")}
                delay={0.08 * (index + 1)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
