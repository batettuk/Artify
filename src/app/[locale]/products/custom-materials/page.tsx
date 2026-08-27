import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: `${t("customMaterials.title")} | Artify`,
    description: t("customMaterials.description"),
  };
}

export default async function CustomMaterialsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <section className="px-3 pt-28 lg:px-6 lg:pt-32">
      <div className="mx-auto max-w-[1400px] pb-16">
        <FadeIn>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {t("backToProducts")}
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="mt-6 font-display text-3xl font-semibold text-foreground lg:text-5xl">
            {t("customMaterials.title")}
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-muted">
            <Image
              src="/images/products/custom-materials.png"
              alt={t("customMaterials.title")}
              fill
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-8 max-w-3xl">
            <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
              {t("customMaterials.description")}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
