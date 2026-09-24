"use client";

import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import type { CmsPageDto, CmsPostDto } from "@/api/cms/types/public";

export function CeoSection({
  page,
  statementPost,
  credentialsPost,
  locale = "mn",
}: {
  page: CmsPageDto | null;
  statementPost?: CmsPostDto | null;
  credentialsPost?: CmsPostDto | null;
  locale?: string;
}) {
  if (!page && !statementPost) return null;

  const isEn = locale === "en";

  // Executive statement quote exclusively from CMS post
  const quoteContent = statementPost?.excerpt || page?.description || "";
  const ceoName = statementPost?.title || page?.name || "";
  const credentialsText = credentialsPost?.excerpt || "";


  const imageSrc = "/images/ceo.png";

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#030612] px-4 py-12 sm:px-6 lg:px-12 lg:py-20 transition-colors duration-500">
      <div className="mx-auto max-w-[1400px]">
        {/* Main Executive Editorial Presentation Card */}
        <div className="group relative flex h-full flex-col bg-slate-200/90 dark:bg-white/10 p-[1px] shadow-[0_20px_50px_-15px_rgba(13,26,70,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 [clip-path:polygon(24px_0,100%_0,100%_100%,0_100%,0_24px)]">
          <div className="relative overflow-hidden bg-white dark:bg-[#040817] [background:radial-gradient(circle_at_20%_25%,rgba(219,234,254,0.65)_0%,rgba(248,250,252,0.6)_45%,#ffffff_75%)] dark:[background:radial-gradient(circle_at_20%_25%,rgba(24,48,110,0.55)_0%,#040817_65%)] p-6 sm:p-10 lg:p-14 transition-colors duration-500 [clip-path:polygon(23px_0,100%_0,100%_100%,0_100%,0_23px)]">
            {/* Top-left corner chamfer decoration */}
            <div className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-b border-r border-[#0d1a46]/20 bg-slate-100/90 dark:border-white/20 dark:bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />

            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Brand Logo, Quote, Signature & Credentials */}
              <div className="flex flex-col justify-between lg:col-span-7">
                {/* Brand Logo Header (Navy in Light Mode, White in Dark Mode) */}
                <FadeIn delay={0.05}>
                  <div className="mb-8 sm:mb-10 lg:mb-12">
                    <Image
                      src="/images/artify-logo-navy.png"
                      alt="ARTIFY®"
                      width={280}
                      height={60}
                      priority
                      className="h-9 sm:h-11 lg:h-12 w-auto object-contain dark:hidden"
                    />
                    <Image
                      src="/images/artify-logo-white.png"
                      alt="ARTIFY®"
                      width={280}
                      height={60}
                      priority
                      className="h-9 sm:h-11 lg:h-12 w-auto object-contain hidden dark:block"
                    />
                  </div>
                </FadeIn>

                {/* Main Executive Quote */}
                <FadeIn delay={0.1}>
                  <div className="relative max-w-2xl">
                    <CmsContent
                      html={quoteContent}
                      className="font-display text-base font-medium leading-relaxed text-[#070e24] dark:text-white/95 sm:text-lg lg:text-xl lg:leading-[1.75] [&_strong]:font-bold [&_strong]:text-[#0d1a46] dark:[&_strong]:text-white [&_p]:leading-relaxed"
                    />
                  </div>
                </FadeIn>

                {/* Signature & Title Block */}
                <FadeIn delay={0.2}>
                  <div className="mt-8 flex flex-col items-end sm:mt-10 sm:pr-8">
                    <span className="font-mono text-[11px] font-medium tracking-wider text-slate-500 dark:text-slate-400 uppercase sm:text-xs">
                      Founder & CEO:
                    </span>
                    <span className="font-signature text-3xl font-bold tracking-wide text-[#0d1a46] dark:text-white drop-shadow-sm dark:drop-shadow-md sm:text-4xl lg:text-5xl mt-1 select-none">
                      {ceoName}
                    </span>
                  </div>
                </FadeIn>

                {/* Desktop only: Bottom Row with Learn More CTA & Credentials */}
                <FadeIn delay={0.25} className="hidden lg:block">
                  <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-slate-200 dark:border-white/10 pt-6 sm:flex-row sm:items-end">
                    {/* Learn More Executive Profile Button */}
                    <Link
                      href="/ceo"
                      className="group/btn inline-flex items-center justify-center gap-2 border border-[#0d1a46]/20 bg-[#070e24] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-[#0d1a46] active:scale-95 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-[#040817] dark:shadow-lg rounded-none w-full sm:w-auto"
                    >
                      <span>{isEn ? "Learn More About CEO" : "Дэлгэрэнгүй танилцах"}</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </Link>

                    {/* Official Engineering & Estimator Credentials from CMS */}
                    {credentialsText && (
                      <div className="text-left sm:text-right text-[11px] font-medium leading-tight text-slate-600 dark:text-slate-400 sm:text-xs">
                        <p>{credentialsText}</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              </div>


              {/* Right Column: High-Resolution CEO Cutout Portrait */}
              <div className="relative flex flex-col items-center justify-end lg:col-span-5">
                <FadeIn direction="up" delay={0.15} className="w-full">
                  <div className="relative mx-auto h-[380px] w-full max-w-[360px] sm:h-[480px] sm:max-w-[420px] lg:h-[560px] lg:max-w-[480px]">
                    <Image
                      src={imageSrc}
                      alt={ceoName}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="h-full w-full object-contain object-bottom transition-transform duration-700 hover:scale-[1.02] drop-shadow-[0_15px_30px_rgba(13,26,70,0.18)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                    />
                  </div>
                </FadeIn>

                {/* Mobile & Tablet only: Positioned directly on the bottom of the CEO picture */}
                <FadeIn delay={0.2} className="w-full lg:hidden mt-6">
                  <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10 pt-6 sm:flex-row sm:items-center">
                    <Link
                      href="/ceo"
                      className="group/btn inline-flex items-center justify-center gap-2 border border-[#0d1a46]/20 bg-[#070e24] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-[#0d1a46] active:scale-95 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-[#040817] dark:shadow-lg rounded-none w-full sm:w-auto"
                    >
                      <span>{isEn ? "Learn More About CEO" : "Дэлгэрэнгүй танилцах"}</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </Link>

                    {credentialsText && (
                      <div className="text-center sm:text-right text-[11px] font-medium leading-tight text-slate-600 dark:text-slate-400 sm:text-xs">
                        <p>{credentialsText}</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
