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
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {product.thumbnailUrl && (
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {product.logoUrl && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
            <Image
              src={product.logoUrl}
              alt={`${product.title} logo`}
              width={226}
              height={63}
              className="absolute bottom-3 left-3 h-6 w-auto object-contain object-left lg:h-7"
            />
          </>
        )}
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-[#0d1a46] transition-colors group-hover:text-primary lg:text-xl">
        {product.title}
      </h3>
    </>
  );

  const ctaButton = (
    <span className="mt-5 inline-flex items-center gap-2 self-start bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
      {ctaLabel}
      <ArrowUpRight size={16} />
    </span>
  );

  return (
    <FadeIn delay={delay} direction="up">
      <div className="flex flex-col bg-card p-5 shadow-sm transition-all hover:shadow-md lg:p-8">
        <Link href={`/products/${product.slug}`} className="group block">
          {cardMedia}
        </Link>
        <div className="mt-2 flex flex-1 flex-col">
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground lg:text-base">
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
  page,
  products,
  locale,
}: {
  page: CmsPageDto | null;
  products: ProductCardDto[];
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <section className="px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 text-center lg:mb-12">
            <h2 className="font-display text-2xl font-semibold text-[#0d1a46] lg:text-4xl">
              {page?.name}
            </h2>
            {page?.description && (
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {page.description}
              </p>
            )}
          </div>
        </FadeIn>

        {products.length === 0 ? (
          <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
