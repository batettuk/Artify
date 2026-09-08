import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import type { CmsPageDto } from "@/api/cms/types/public";

export function AboutSection({ page }: { page: CmsPageDto | null }) {
  if (!page) return null;

  return (
    <section className="bg-background px-4 py-12 sm:px-6 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Content Column */}
          <div className="lg:col-span-6 flex flex-col">
            <FadeIn className="h-full flex flex-col">
              <div className="h-full flex flex-col justify-between border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
                <div>
                  <div className="inline-flex items-center gap-2 border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0d1a46] mb-6">
                    01 — Artify Brand
                  </div>

                  <h2 className="font-display text-2xl font-bold leading-tight text-[#0d1a46] sm:text-3xl lg:text-4xl">
                    {page.name}
                  </h2>
                  
                  <CmsContent
                    html={page.description}
                    className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-base [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-[#0d1a46] [&_h3]:lg:text-lg [&_p]:mt-2.5 [&_p:empty]:hidden [&_strong]:font-bold [&_strong]:text-[#0d1a46] [&_p:first-of-type]:mt-4"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* High-End Architectural Photography Showcase Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <FadeIn delay={0.15} direction="up" className="relative flex-1 min-h-[260px] overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm flex flex-col">
              <div className="relative h-full w-full min-h-[260px]">
                <Image
                  src="/images/about-1.jpg"
                  alt="Artify Construction & Engineering"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover object-[center_30%] transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bold tracking-widest text-white uppercase">
                  <span>Architecture & Engineering</span>
                  <span>EST. 2014</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.25} direction="up" className="relative flex-1 min-h-[260px] overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm flex flex-col">
              <div className="relative h-full w-full min-h-[260px]">
                <Image
                  src="/images/about-2.jpg"
                  alt="Artify Modern Living Space"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover object-[center_35%] transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bold tracking-widest text-white uppercase">
                  <span>Quality of Life</span>
                  <span>Air • Light • Heat • Space • Water</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
