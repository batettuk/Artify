import { FadeIn } from "@/components/motion/FadeIn";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import Image from "@/components/common/Image";

export function HomeCtaSection({ locale }: { locale: string }) {
  return (
    <section className="relative overflow-hidden bg-[#070e24] px-4 py-16 text-white sm:px-6 lg:px-12 lg:py-24 border-t border-white/10">
      <div className="absolute inset-0">
        <Image
          src="/images/consulting-1.jpg"
          alt="Artify Construction & Quality of Life"
          fill
          sizes="100vw"
          className="h-full w-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070e24] via-[#070e24]/90 to-[#070e24]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            
            <FadeIn delay={0.1}>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                {locale === "mn"
                  ? "Барилгын төслөө чанарын шинэ түвшинд хүргэхэд бэлэн үү?"
                  : "Ready to elevate your project to a new standard of living?"}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                {locale === "mn"
                  ? "Инженерийн нарийн тооцоолол, ухаалаг агааржуулалт, захиалгат ховор материалын цогц шийдлээр амьдралын чанарыг урлана."
                  : "From precision engineering and smart ventilation to bespoke fabrication, we craft environments where you truly thrive."}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 bg-white px-6 text-xs font-bold uppercase tracking-widest text-[#070e24] shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 hover:bg-slate-100"
            >
              <span>{locale === "mn" ? "Зөвлөгөө авах" : "Get Consultation"}</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/products"
              className="inline-flex h-12 items-center gap-2 border border-white/30 bg-white/10 px-6 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#0d1a46]"
            >
              <span>{locale === "mn" ? "Бүтээгдэхүүн үзэх" : "Explore Solutions"}</span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
