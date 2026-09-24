import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { formatCmsDate } from "@/lib/utils/format-date";
import type { BlogCardDto, CmsPageDto } from "@/api/cms/types/public";

export async function BlogSection({
  page,
  posts,
  locale,
}: {
  page: CmsPageDto | null;
  posts: BlogCardDto[];
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section className="bg-[#f8fafc] dark:bg-[#060b18] px-4 py-16 sm:px-6 lg:px-12 lg:py-24 border-t border-slate-200/80 dark:border-white/10">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end lg:mb-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0d1a46] dark:text-white lg:text-4xl">
                {page?.name || (locale === "mn" ? "Сүүлийн нийтлэлүүд" : "Latest Articles")}
              </h2>
              {page?.description && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base max-w-xl">
                  {page.description}
                </p>
              )}
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-[#0d1a46]/20 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0d1a46] shadow-sm transition-all hover:bg-[#0d1a46] hover:text-white dark:bg-[#070e24] dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-[#070e24]"
            >
              {t("viewAll")}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </FadeIn>

        {posts.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">{t("noPosts")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <FadeIn key={post.id} delay={0.1 * index} direction="up" className="h-full">
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="group relative flex h-full flex-col bg-slate-200/90 dark:bg-white/10 p-[1px] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#0d1a46]/50 dark:hover:bg-white/25 hover:shadow-xl [clip-path:polygon(22px_0,100%_0,100%_100%,0_100%,0_22px)]">
                    <article className="relative flex h-full flex-col justify-between bg-white dark:bg-[#070e24] [clip-path:polygon(21px_0,100%_0,100%_100%,0_100%,0_21px)]">
                      <div className="pointer-events-none absolute left-0 top-0 z-10 h-6 w-6 border-b border-r border-[#0d1a46]/15 bg-slate-100/80 dark:border-white/20 dark:bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />
                      
                      <div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                          {post.thumbnailUrl && (
                            <Image
                              src={post.thumbnailUrl}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>

                        <div className="p-5 lg:p-6">
                          <p className="font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            {formatCmsDate(post.publishedDate, locale)}
                          </p>
                          <h3 className="mt-2.5 font-display text-base font-bold leading-snug text-[#0d1a46] dark:text-white transition-colors group-hover:text-primary dark:group-hover:text-slate-300 sm:text-lg">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="p-5 pt-0 lg:p-6 lg:pt-0">
                        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0d1a46] dark:text-white group-hover:text-primary dark:group-hover:text-slate-300">
                          <span className="text-[#0d1a46] dark:text-white group-hover:text-primary dark:group-hover:text-slate-300 font-bold">{t("readMore")}</span>
                          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1 text-[#0d1a46] dark:text-white" />
                        </span>
                      </div>
                    </article>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
