"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { ArrowRight, Calendar } from "lucide-react";
import type { BlogCardDto } from "@/api/cms/types/public";

interface FeaturedPostProps {
  post: BlogCardDto | null;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const t = useTranslations("blog");
  const locale = useLocale();

  if (!post) return null;

  return (
    <section className="bg-background px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn delay={0.1}>
          <Link href={`/blog/${post.slug}`} className="group block">
            <article className="overflow-hidden border border-slate-200/90 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
              <div className="grid lg:grid-cols-12">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 lg:col-span-7 lg:aspect-auto lg:min-h-[440px]">
                  {post.thumbnailUrl && (
                    <Image
                      src={post.thumbnailUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-12">
                  <div>
                    <div className="inline-flex items-center gap-2 border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0d1a46] mb-4">
                      {t("featured")}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Calendar size={14} className="text-primary" />
                      {post.publishedDate
                        ? new Date(post.publishedDate).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-[#0d1a46] transition-colors group-hover:text-primary lg:text-3xl">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100">
                    <span className="inline-flex items-center gap-2 bg-[#0d1a46] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      {t("readMore")}
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
