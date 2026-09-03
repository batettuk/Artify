import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import type { CmsPageDto } from "@/api/cms/types/public";

export function AboutSection({ page }: { page: CmsPageDto | null }) {
  if (!page) return null;

  return (
    <section className="bg-background px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="h-full">
            <div className="h-full bg-card p-6 shadow-sm lg:p-12">
              <h2 className="font-display text-2xl font-semibold leading-tight text-foreground lg:text-4xl">
                {page.name}
              </h2>
              <CmsContent
                html={page.description}
                className="text-sm leading-relaxed text-muted-foreground lg:text-base [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:lg:text-xl [&_p]:mt-3 [&_p:empty]:hidden [&_strong]:font-semibold [&_strong]:text-foreground [&_p:first-of-type]:mt-4"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="up" className="h-full">
            <div className="relative h-full min-h-[320px] overflow-hidden bg-card shadow-sm lg:min-h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
                alt="Construction team at work"
                fill
                className="h-full w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
