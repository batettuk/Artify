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
        <article className="flex h-full flex-col overflow-hidden border border-slate-200/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
            {post.thumbnailUrl && (
              <Image
                src={post.thumbnailUrl}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>

          <div className="flex flex-1 flex-col justify-between p-5 lg:p-6">
            <div>
              <h3 className="font-display text-lg font-bold text-[#0d1a46] transition-colors group-hover:text-primary">
                {post.title}
              </h3>

              {post.excerpt && (
                <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {post.excerpt}
                </p>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0d1a46] group-hover:text-primary">
                {t("readMore")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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
      <section className="bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1400px]">
          <FadeIn>
            <p className="text-center text-slate-500">{t("noPosts")}</p>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f8fafc] border-t border-slate-200/80 px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-10 text-center lg:mb-14">
            <span className="inline-block border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0d1a46] mb-3">
              {t("allPosts")}
            </span>
            <h2 className="font-display text-2xl font-bold text-[#0d1a46] lg:text-3xl">
              {t("allPostsSubtitle")}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visiblePosts.map((post, index) => (
            <PostCard key={post.id} post={post} delay={0.05 * index} />
          ))}
        </div>

        {posts.length > 4 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-[#0d1a46] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 shadow-sm"
            >
              {showAll ? (
                <>
                  {t("showLess")}
                  <ChevronUp size={15} />
                </>
              ) : (
                <>
                  {t("viewAll")}
                  <ChevronDown size={15} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
