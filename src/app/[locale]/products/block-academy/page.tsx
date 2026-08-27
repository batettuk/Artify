import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: `${t("blockAcademy.title")} | Artify`,
    description: t("blockAcademy.description"),
  };
}

export default async function BlockAcademyPage({
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
            {t("blockAcademy.title")}
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80"
              alt={t("blockAcademy.title")}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 px-4 py-2.5">
              <Image
                src="/images/partners/block-academy.png"
                alt="Block Academy"
                width={226}
                height={63}
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-8 max-w-3xl">
            <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
              {t("blockAcademy.description")}
            </p>
            <a
              href="https://block-academy.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              {t("visitWebsite")}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
