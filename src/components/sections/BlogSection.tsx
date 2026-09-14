import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
    <section className="bg-[#f8fafc] px-4 py-16 sm:px-6 lg:px-12 lg:py-24 border-t border-slate-200/80">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end lg:mb-12">
            <div>
              <span className="inline-block border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0d1a46] mb-3">
                04 — Artify News
              </span>
              <h2 className="font-display text-2xl font-bold text-[#0d1a46] lg:text-4xl">
                {page?.name || (locale === "mn" ? "Сүүлийн нийтлэлүүд" : "Latest Articles")}
              </h2>
              {page?.description && (
                <p className="mt-2 text-sm text-slate-600 sm:text-base max-w-xl">
                  {page.description}
                </p>
              )}
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-[#0d1a46]/20 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0d1a46] shadow-sm transition-all hover:bg-[#0d1a46] hover:text-white"
            >
              {t("viewAll")}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </FadeIn>

        {posts.length === 0 ? (
          <p className="text-slate-500">{t("noPosts")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <FadeIn key={post.id} delay={0.1 * index} direction="up" className="h-full">
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="group relative flex h-full flex-col bg-slate-200/90 p-[1px] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#0d1a46]/50 hover:shadow-xl [clip-path:polygon(22px_0,100%_0,100%_100%,0_100%,0_22px)]">
                    <article className="relative flex h-full flex-col justify-between bg-white [clip-path:polygon(21px_0,100%_0,100%_100%,0_100%,0_21px)]">
                      <div className="pointer-events-none absolute left-0 top-0 z-10 h-6 w-6 border-b border-r border-[#0d1a46]/15 bg-slate-100/80 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />
                      
                      <div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
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
                            {post.publishedDate
                              ? new Date(post.publishedDate).toLocaleDateString(locale, {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : ""}
                          </p>
                          <h3 className="mt-2.5 font-display text-base font-bold leading-snug text-[#0d1a46] transition-colors group-hover:text-primary sm:text-lg">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="p-5 pt-0 lg:p-6 lg:pt-0">
                        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0d1a46] group-hover:text-primary">
                          {t("readMore")}
                          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
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
