"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { BlogCardDto } from "@/api/cms/types/public";

interface AllPostsSectionProps {
  posts: BlogCardDto[];
}

function PostCard({ post, delay = 0 }: { post: BlogCardDto; delay?: number }) {
  const t = useTranslations("blog");

  return (
    <FadeIn delay={delay} direction="up">
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-none bg-card shadow-sm transition-all hover:shadow-md lg:rounded-none">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-secondary to-border">
            {post.thumbnailUrl && (
              <Image
                src={post.thumbnailUrl}
                alt={post.title}
                fill
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>

          <div className="flex flex-1 flex-col p-5 lg:p-6">
            <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary lg:text-xl">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground lg:text-base">
                {post.excerpt}
              </p>
            )}

            <div className="mt-auto pt-4">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {t("readMore")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}

export function AllPostsSection({ posts }: AllPostsSectionProps) {
  const t = useTranslations("blog");
  const [showAll, setShowAll] = useState(false);

  const visiblePosts = showAll ? posts : posts.slice(0, 4);

  if (posts.length === 0) {
    return (
      <section className="bg-secondary px-3 py-10 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-[1400px]">
          <FadeIn>
            <p className="text-center text-muted-foreground">{t("noPosts")}</p>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-secondary px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 text-center lg:mb-12">
            <h2 className="font-display text-2xl font-semibold text-foreground lg:text-4xl">
              {t("allPosts")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("allPostsSubtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visiblePosts.map((post, index) => (
            <PostCard key={post.id} post={post} delay={0.05 * index} />
          ))}
        </div>

        {posts.length > 4 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-none bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              {showAll ? (
                <>
                  {t("showLess")}
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  {t("viewAll")}
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
