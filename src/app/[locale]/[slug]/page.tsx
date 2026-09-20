import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { getPageSlugs } from "@/api/cms/server/queries/get-pages";
import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const slugs = await getPageSlugs(locale);
      return slugs
        .filter((slug) => !["home", "blog", "products", "contact"].includes(slug))
        .map((slug) => ({ locale, slug }));
    }),
  );
  return results.flat();
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await getPageDetail({ slug, language: locale });
  if (!page) return {};

  return {
    title: `${page.name} | Artify`,
    description: page.description ?? undefined,
  };
}

export default async function DynamicPage({
  params,
}: PageProps<"/[locale]/[slug]">) {
  const { locale, slug } = await params;
  const page = await getPageDetail({ slug, language: locale });
  if (!page) notFound();

  return (
    <article className="bg-background">
      {/* Full-bleed Edge-to-Edge Hero Banner */}
      <section className="relative flex min-h-[460px] w-full items-end overflow-hidden bg-[#070e24] pt-32 pb-16 lg:min-h-[520px] lg:pt-40 lg:pb-24">
        <div className="absolute inset-0">
          <Image
            src={page.thumbnailUrl || "/images/about-1.jpg"}
            alt={page.name}
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center scale-[1.01]"
          />
          {/* Subtle cinematic gradient overlay preserving image clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e24] via-[#070e24]/60 to-[#070e24]/30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <FadeIn delay={0.1}>
            
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl max-w-4xl">
              {page.name}
            </h1>
          </FadeIn>

          {page.description && (
            <FadeIn delay={0.2}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 lg:text-lg">
                {page.description}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-[1000px] px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <FadeIn delay={0.1}>
          <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-headings:text-[#0d1a46] dark:prose-headings:text-white prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-strong:text-[#0d1a46] dark:prose-strong:text-white">
            <CmsContent html={page.content} />
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
