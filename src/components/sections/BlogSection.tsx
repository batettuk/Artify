"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/graphql/cms/queries/post";

interface BlogSectionProps {
  posts: Post[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const t = useTranslations("blog");

  return (
    <section className="bg-secondary px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 text-center lg:mb-12">
            <h2 className="font-display text-2xl font-semibold text-foreground lg:text-4xl">
              {t("heading")}
            </h2>
          </div>
        </FadeIn>

        <div className="mb-8 flex justify-end lg:mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-none border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>

        {posts.length === 0 ? (
          <FadeIn>
            <p className="text-muted-foreground">{t("noPosts")}</p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post, index) => (
              <FadeIn key={post._id} delay={0.1 * index} direction="up">
                <Link href={`/blog/${post.slug ?? post._id}`} className="group block">
                  <article className="overflow-hidden rounded-none bg-card shadow-sm transition-all hover:shadow-md lg:rounded-none">
                    <div className="aspect-[16/10] w-full bg-gradient-to-br from-secondary to-border">
                    </div>
                    <div className="p-5 lg:p-6">
                      <p className="text-xs text-muted-foreground">
                        {post.publishedDate
                          ? new Date(post.publishedDate).toLocaleDateString()
                          : ""}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {post.title ?? ""}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {post.excerpt ?? ""}
                      </p>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
