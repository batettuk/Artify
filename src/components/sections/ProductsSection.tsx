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
  delay = 0,
}: {
  product: ProductCardDto;
  ctaLabel: string;
  delay?: number;
}) {
  const cardMedia = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
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
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center border border-white/20 bg-black/40 px-2.5 py-1 backdrop-blur-md">
              <Image
                src={product.logoUrl}
                alt={`${product.title} logo`}
                width={200}
                height={60}
                className="h-5 w-auto object-contain object-left"
              />
            </div>
          </>
        )}
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-[#0d1a46] transition-colors group-hover:text-primary">
        {product.title}
      </h3>
    </>
  );

  const ctaButton = (
    <span className="mt-5 inline-flex items-center gap-2 self-start bg-[#0d1a46] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all group-hover:bg-primary group-hover:text-primary-foreground">
      {ctaLabel}
      <ArrowUpRight size={15} />
    </span>
  );

  return (
    <FadeIn delay={delay} direction="up">
      <div className="group flex h-full flex-col border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg lg:p-7">
        <Link href={`/products/${product.slug}`} className="block">
          {cardMedia}
        </Link>
        <div className="mt-2 flex flex-1 flex-col justify-between">
          <p className="flex-1 text-sm leading-relaxed text-slate-600">
            {product.excerpt}
          </p>
          <Link href={`/products/${product.slug}`} className="self-start">
            {ctaButton}
          </Link>
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
    <section className="px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        {products.length === 0 ? (
          <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                ctaLabel={t("cta")}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
