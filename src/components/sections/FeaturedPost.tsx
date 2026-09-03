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
    <section className="bg-background px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 text-center lg:mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("featured")}
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground lg:text-4xl">
              {t("featuredHeading")}
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Link href={`/blog/${post.slug}`} className="group block">
            <article className="overflow-hidden rounded-none bg-card shadow-md transition-all hover:shadow-lg lg:rounded-none">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-secondary to-border lg:aspect-auto lg:min-h-[400px]">
                  {post.thumbnailUrl && (
                    <Image
                      src={post.thumbnailUrl}
                      alt={post.title}
                      fill
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="flex flex-col justify-center p-6 lg:p-12">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    {post.publishedDate
                      ? new Date(post.publishedDate).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary lg:text-4xl">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="mt-4 line-clamp-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-8">
                    <span className="inline-flex items-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform group-hover:scale-105">
                      {t("readMore")}
                      <ArrowRight size={16} />
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
