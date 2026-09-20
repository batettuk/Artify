import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import type { CmsPageDto } from "@/api/cms/types/public";

export function AboutSection({ page }: { page: CmsPageDto | null }) {
  if (!page) return null;

  return (
    <section className="bg-background px-4 py-12 sm:px-6 lg:px-12 lg:py-20" id="about">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Content Column with 45-Degree Angle Cut */}
          <div className="lg:col-span-6 flex flex-col">
            <FadeIn className="h-full flex flex-col">
              <div className="group relative flex h-full flex-col bg-slate-200/90 p-[1px] shadow-sm transition-all duration-300 hover:bg-[#0d1a46]/40 hover:shadow-xl dark:bg-white/10 dark:hover:bg-white/20 [clip-path:polygon(24px_0,100%_0,100%_100%,0_100%,0_24px)]">
                <div className="relative flex h-full flex-col justify-between bg-white dark:bg-[#070e24] p-6 sm:p-10 lg:p-12 [clip-path:polygon(23px_0,100%_0,100%_100%,0_100%,0_23px)]">
                  {/* Top-left chamfer accent & crosshairs */}
                  <div className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-b border-r border-[#0d1a46]/20 bg-slate-100/90 dark:border-white/20 dark:bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />
                  <div className="pointer-events-none absolute right-3 top-3 text-[#0d1a46]/20 dark:text-white/20 font-mono text-xs select-none">+</div>
                  <div className="pointer-events-none absolute right-3 bottom-3 text-[#0d1a46]/20 dark:text-white/20 font-mono text-xs select-none">+</div>
                  <div className="pointer-events-none absolute left-3 bottom-3 text-[#0d1a46]/20 dark:text-white/20 font-mono text-xs select-none">+</div>

                  <div>
                    <h2 className="font-display text-2xl font-bold leading-tight text-[#0d1a46] dark:text-white sm:text-3xl lg:text-4xl">
                      {page.name}
                    </h2>
                    
                    <CmsContent
                      html={page.description}
                      className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-[#0d1a46] dark:[&_h3]:text-white [&_h3]:lg:text-lg [&_p]:mt-2.5 [&_p:empty]:hidden [&_strong]:font-bold [&_strong]:text-[#0d1a46] dark:[&_strong]:text-white [&_p:first-of-type]:mt-4 [&_li]:text-slate-600 dark:[&_li]:text-slate-300"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* High-End Architectural Photography Showcase Column with 45-Degree Cuts - Single Long Photo */}
          <div className="lg:col-span-6 flex flex-col">
            <FadeIn delay={0.15} direction="up" className="relative h-full min-h-[420px] lg:min-h-[520px] flex flex-col">
              <div className="group relative flex h-full flex-col bg-slate-200/90 p-[1px] shadow-sm transition-all duration-300 hover:bg-[#0d1a46]/40 hover:shadow-xl dark:bg-white/10 dark:hover:bg-white/20 [clip-path:polygon(24px_0,100%_0,100%_100%,0_100%,0_24px)]">
                <div className="relative h-full w-full min-h-[420px] lg:min-h-[520px] overflow-hidden bg-slate-100 dark:bg-[#070e24] [clip-path:polygon(23px_0,100%_0,100%_100%,0_100%,0_23px)]">
                  <div className="pointer-events-none absolute left-0 top-0 z-20 h-7 w-7 border-b border-r border-white/30 bg-white/20 backdrop-blur-sm [clip-path:polygon(0_0,100%_0,0_100%)]" />
                  <Image
                    src="/images/about-1.jpg"
                    alt="Artify Construction & Engineering"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-full w-full object-cover object-[center_35%] transition-transform duration-700 hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-xs font-bold tracking-widest text-white uppercase">
                    <span>Architecture & Engineering</span>
                    <span>Air • Light • Heat • Space</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
