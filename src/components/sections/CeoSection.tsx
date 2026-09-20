"use client";

import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import type { CmsPageDto } from "@/api/cms/types/public";

export function CeoSection({
  page,
  locale = "mn",
}: {
  page: CmsPageDto | null;
  locale?: string;
}) {
  if (!page) return null;

  const isEn = locale === "en";
  const defaultQuote = isEn
    ? "“The construction industry is a multidimensional space where knowledge, technology, and craftsmanship from diverse disciplines converge. Artify aspires to be the premier platform where the industry's finest come together.”"
    : "“Барилгын салбар бол олон салбарын мэдлэг, технологи, ур чадвар нэгддэг өргөн хүрээний орон зай. Салбарын шилдэгүүд нэгдэх талбар нь Артифай байхыг зорьдог.”";

  // The homepage CEO presentation card exclusively features the executive statement quote.
  let quoteContent = defaultQuote;
  if (page.description) {
    const raw = page.description.trim();
    const quoteMatch = raw.match(/^[“"][^“”"]+[”"]/);
    if (quoteMatch) {
      quoteContent = quoteMatch[0].trim();
    } else {
      const firstParagraph = raw.split(/\r?\n\r?\n|\r?\n/)[0]?.trim();
      if (firstParagraph && (firstParagraph.startsWith("“") || firstParagraph.startsWith("\""))) {
        quoteContent = firstParagraph;
      }
    }
  }

  const imageSrc = "/images/ceo.png";

  return (
    <section className="relative overflow-hidden bg-[#030612] px-4 py-12 sm:px-6 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Main Executive Editorial Presentation Card */}
        <div className="group relative flex h-full flex-col bg-white/10 p-[1px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 [clip-path:polygon(24px_0,100%_0,100%_100%,0_100%,0_24px)]">
          <div className="relative overflow-hidden bg-[#040817] [background:radial-gradient(circle_at_20%_25%,rgba(24,48,110,0.55)_0%,#040817_65%)] p-6 sm:p-10 lg:p-14 [clip-path:polygon(23px_0,100%_0,100%_100%,0_100%,0_23px)]">
            {/* Top-left corner chamfer decoration */}
            <div className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-b border-r border-white/20 bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />

            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Brand Logo, Quote, Signature & Credentials */}
              <div className="flex flex-col justify-between lg:col-span-7">
                {/* Brand Logo Header */}
                <FadeIn delay={0.05}>
                  <div className="mb-8 sm:mb-10 lg:mb-12">
                    <Image
                      src="/images/artify-logo-white.png"
                      alt="ARTIFY®"
                      width={280}
                      height={60}
                      priority
                      className="h-9 sm:h-11 lg:h-12 w-auto object-contain"
                    />
                  </div>
                </FadeIn>

                {/* Main Executive Quote */}
                <FadeIn delay={0.1}>
                  <div className="relative max-w-2xl">
                    <CmsContent
                      html={quoteContent}
                      className="font-display text-base font-medium leading-relaxed text-white/95 sm:text-lg lg:text-xl lg:leading-[1.75] [&_strong]:font-bold [&_strong]:text-white [&_p]:leading-relaxed"
                    />
                  </div>
                </FadeIn>

                {/* Signature & Title Block */}
                <FadeIn delay={0.2}>
                  <div className="mt-8 flex flex-col items-end sm:mt-10 sm:pr-8">
                    <span className="font-mono text-[11px] font-medium tracking-wider text-slate-400 uppercase sm:text-xs">
                      Founder & CEO:
                    </span>
                    <span className="font-signature text-3xl font-bold tracking-wide text-white drop-shadow-md sm:text-4xl lg:text-5xl mt-1 select-none">
                      Munkhchuluun S.
                    </span>
                  </div>
                </FadeIn>

                {/* Bottom Row: Learn More CTA & Official Credentials */}
                <FadeIn delay={0.25}>
                  <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-end">
                    {/* Learn More Executive Profile Button */}
                    <Link
                      href="/ceo"
                      className="group/btn inline-flex items-center gap-2 border border-white/30 bg-white/10 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#040817] shadow-lg rounded-none active:scale-95"
                    >
                      <span>{isEn ? "Learn More About CEO" : "Дэлгэрэнгүй танилцах"}</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </Link>

                    {/* Official Engineering & Estimator Credentials */}
                    <div className="text-left sm:text-right text-[11px] font-medium leading-tight text-slate-400 sm:text-xs">
                      <p>{isEn ? "Certified Civil Engineer," : "Иргэний барилгын мэргэшсэн инженер,"}</p>
                      <p className="mt-0.5">{isEn ? "Certified Cost Estimator" : "мэргэшсэн төсөвчин"}</p>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Right Column: High-Resolution CEO Cutout Portrait */}
              <div className="relative flex flex-col items-center justify-end lg:col-span-5">
                <FadeIn direction="up" delay={0.15} className="w-full">
                  <div className="relative mx-auto h-[380px] w-full max-w-[360px] sm:h-[480px] sm:max-w-[420px] lg:h-[560px] lg:max-w-[480px]">
                    <Image
                      src={imageSrc}
                      alt={page.name || "Munkhchuluun S. - Founder & CEO"}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="h-full w-full object-contain object-bottom transition-transform duration-700 hover:scale-[1.02] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                    />
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
