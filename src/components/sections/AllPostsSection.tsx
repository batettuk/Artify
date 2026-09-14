"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import type { BlogCardDto } from "@/api/cms/types/public";

interface AllPostsSectionProps {
  posts: BlogCardDto[];
}

function PostCard({ post, delay = 0 }: { post: BlogCardDto; delay?: number }) {
  const t = useTranslations("blog");

  return (
    <FadeIn delay={delay} direction="up" className="h-full">
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="p-5 lg:p-6">
                <h3 className="font-display text-base font-bold text-[#0d1a46] transition-colors group-hover:text-primary sm:text-lg">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 pt-0 lg:p-6 lg:pt-0">
              <div className="pt-3 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0d1a46] group-hover:text-primary">
                  {t("readMore")}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </article>
        </div>
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
