import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { ArrowRight } from "lucide-react";
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
    <section className="bg-secondary px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 text-center lg:mb-12">
            <h2 className="font-display text-2xl font-semibold text-foreground lg:text-4xl">
              {page?.name ?? ""}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {page?.description ?? ""}
            </p>
          </div>
        </FadeIn>
        <div className="mb-8 flex justify-end lg:mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">{t("noPosts")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <FadeIn key={post.id} delay={0.1 * index} direction="up">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="overflow-hidden bg-card shadow-sm transition-all hover:shadow-md">
                    <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-secondary to-border">
                      {post.thumbnailUrl && (
                        <Image
                          src={post.thumbnailUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-5 lg:p-6">
                      <p className="text-xs text-muted-foreground">
                        {post.publishedDate
                          ? new Date(post.publishedDate).toLocaleDateString(locale)
                          : ""}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {post.excerpt}
                        </p>
                      )}
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
