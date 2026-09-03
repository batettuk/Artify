import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { getPageSlugs } from "@/api/cms/server/queries/get-pages";
import { routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { CmsContent } from "@/components/common/CmsContent";

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
    <article className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-20 lg:py-32">
        <FadeIn>
          <h1 className="text-4xl font-light tracking-tight text-foreground lg:text-6xl">
            {page.name}
          </h1>
        </FadeIn>

        {page.description && (
          <FadeIn delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{page.description}</p>
          </FadeIn>
        )}

        {page.content && (
          <FadeIn delay={0.2}>
            <CmsContent
              html={page.content}
              className="prose prose-invert mt-12 max-w-none"
            />
          </FadeIn>
        )}
      </div>
    </article>
  );
}
