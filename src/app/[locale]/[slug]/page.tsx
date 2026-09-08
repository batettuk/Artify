import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { getPageSlugs } from "@/api/cms/server/queries/get-pages";
import { routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { CmsContent } from "@/components/common/CmsContent";
import Image from "@/components/common/Image";

const DEDICATED_ROUTE_SLUGS = new Set([
  "home",
  "about",
  "blog",
  "contact",
  "products",
  "ceo",
  "/ceo",
  "partners",
  "testimonials",
]);

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const slugs = await getPageSlugs(locale);
      return slugs
        .filter((slug) => !DEDICATED_ROUTE_SLUGS.has(slug))
        .map((slug) => ({ locale, slug }));
    })
  );
  return results.flat();
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await getPageDetail({ slug, language: locale });
  if (!page) return {};

  return {
    title: `${page.name} | Artify`,
    description: page.description ?? undefined,
  };
}

export default async function CmsPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = await params;
  const page = await getPageDetail({ slug, language: locale });
  if (!page) notFound();

  return (
    <article className="bg-background">
      {/* Full-bleed Edge-to-Edge Hero Banner */}
      <section className="relative flex min-h-[440px] w-full items-end overflow-hidden bg-[#070e24] pt-32 pb-16 lg:min-h-[500px] lg:pt-40 lg:pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/about-1.jpg"
            alt={page.name}
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
            <span className="inline-block border border-sky-400/30 bg-sky-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-300 backdrop-blur-sm">
              ARTIFY — {slug.toUpperCase()}
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {page.name}
            </h1>
          </FadeIn>

          {page.description && (
            <FadeIn delay={0.2}>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-200 lg:text-lg">
                {page.description}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Content Section */}
      {page.content && (
        <div className="px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-4xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10 lg:p-14">
            <FadeIn>
              <CmsContent
                html={page.content}
                className="prose max-w-none text-slate-700 prose-headings:font-display prose-headings:font-bold prose-headings:text-[#0d1a46] prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-primary prose-strong:text-[#0d1a46] prose-ul:text-slate-600 prose-li:marker:text-primary"
              />
            </FadeIn>
          </div>
        </div>
      )}
    </article>
  );
}
