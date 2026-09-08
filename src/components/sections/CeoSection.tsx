import {
  decodeCustomFields,
  getStringValue,
} from "@/api/cms/server/custom-fields";
import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import { Quote, Sparkles, Award } from "lucide-react";
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
  const fields = decodeCustomFields(page.customFieldsData, "home-ceo-fields");
  const bottomText =
    getStringValue(fields, isEn ? "ceoRoleEn" : "ceoRole") ||
    (isEn ? "FOUNDER & CHIEF EXECUTIVE OFFICER" : "ҮҮСГЭН БАЙГУУЛАГЧ, ГҮЙЦЭТГЭХ ЗАХИРАЛ");
  const imageSrc = page.thumbnailUrl || "/images/ceo.png";

  const displayBadge = isEn ? "FOUNDER'S STATEMENT" : "ҮҮСГЭН БАЙГУУЛАГЧИЙН ҮГ";
  const ceoName = isEn ? "Munkhchuluun S." : "Мөнхчулуун С.";
  const ceoCredentials = isEn
    ? "Certified Civil Engineer • Certified Cost Estimator"
    : "Иргэний барилгын мэргэшсэн инженер, мэргэшсэн төсөвчин";

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] px-4 py-16 sm:px-6 lg:px-12 lg:py-24 border-y border-slate-200/80">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Main Executive Editorial Card */}
        <div className="relative overflow-hidden border border-slate-200/90 bg-white shadow-[0_20px_50px_-15px_rgba(13,26,70,0.07)]">
          {/* Architectural corner crosshair accents */}
          <div className="pointer-events-none absolute left-3 top-3 text-[#0d1a46]/20 font-mono text-xs select-none">
            +
          </div>
          <div className="pointer-events-none absolute right-3 top-3 text-[#0d1a46]/20 font-mono text-xs select-none">
            +
          </div>
          <div className="pointer-events-none absolute left-3 bottom-3 text-[#0d1a46]/20 font-mono text-xs select-none">
            +
          </div>
          <div className="pointer-events-none absolute right-3 bottom-3 text-[#0d1a46]/20 font-mono text-xs select-none">
            +
          </div>

          <div className="grid items-stretch lg:grid-cols-12">
            {/* CEO Portrait Column */}
            <div className="relative flex flex-col justify-end overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200/70 p-4 sm:p-8 lg:col-span-5 lg:p-10 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-200/80">
              {/* Soft radial backdrop behind the CEO */}
              <div className="pointer-events-none absolute inset-0 bg-radial from-sky-400/15 via-transparent to-transparent opacity-70" />
              
              <FadeIn direction="up" className="relative z-10 mx-auto flex w-full flex-col items-center justify-end">
                <div className="relative h-[440px] w-full max-w-[420px] sm:h-[520px] lg:h-[580px] xl:h-[620px] drop-shadow-[0_25px_35px_rgba(13,26,70,0.18)]">
                  <Image
                    src={imageSrc}
                    alt={page.name || "Artify CEO"}
                    fill
                    priority
                    className="h-full w-full object-contain object-bottom transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>

                {/* Grounding frame bar & badge */}
                <div className="w-full border-t border-[#0d1a46]/10 py-3.5 flex items-center justify-between text-[11px] font-bold tracking-[0.2em] text-[#0d1a46]/70 uppercase">
                  <span className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-[#0d1a46]" />
                    ARTIFY LEADERSHIP
                  </span>
                  <span>EST. 2014</span>
                </div>
              </FadeIn>
            </div>

            {/* CEO Editorial Quote & Vision Column */}
            <div className="relative flex flex-col justify-between p-8 sm:p-12 lg:col-span-7 lg:p-16">
              {/* Huge subtle watermarked quotation mark */}
              <div className="pointer-events-none absolute right-8 top-8 text-[#0d1a46]/[0.05] lg:right-12 lg:top-10 select-none">
                <Quote size={160} strokeWidth={1.2} />
              </div>

              <div className="relative z-10">
                <FadeIn delay={0.1}>
                  {/* Category Pill */}
                  <div className="inline-flex items-center gap-2 border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#0d1a46]">
                    <Sparkles className="h-3.5 w-3.5 text-[#0d1a46]" />
                    {displayBadge}
                  </div>

                  {/* Statement Quote */}
                  <div className="relative mt-8 lg:mt-10">
                    <Quote className="mb-4 text-[#0d1a46]/40" size={36} />
                    <CmsContent
                      html={page.description}
                      className="text-balance font-display text-2xl font-bold leading-relaxed text-[#0d1a46] sm:text-3xl lg:text-[32px] lg:leading-[1.4] [&_p]:leading-relaxed"
                    />
                  </div>
                </FadeIn>
              </div>

              {/* Author Credentials Block */}
              <div className="relative z-10 mt-10 border-t border-slate-200/80 pt-6 lg:mt-14">
                <FadeIn delay={0.2}>
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-[3px] shrink-0 bg-gradient-to-b from-[#0d1a46] to-sky-500 mt-1" />
                    <div>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {bottomText}:
                        </span>
                        <span className="text-base font-bold text-[#0d1a46] sm:text-lg">
                          {ceoName}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">
                        {ceoCredentials}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Artify Brand LLC
                      </p>
                    </div>
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
