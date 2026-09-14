import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/motion/FadeIn";
import { CmsContent } from "@/components/common/CmsContent";
import { ErxesFormEmbed } from "@/components/sections/client/ErxesFormEmbed";
import {
  Phone,
  Mail,
  ShieldCheck,
  ArrowUpRight,
  HelpCircle,
} from "lucide-react";
import type { CmsPageDto } from "@/api/cms/types/public";

// Custom SVG Icons for social handles
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export async function ContactForm({
  page,
  textPage,
  locale,
}: {
  page: CmsPageDto | null;
  textPage: CmsPageDto | null;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "contact" });

  const phone = "+976 7771 0155";
  const email = "info@artifybrand.com";
  const facebookUrl = "https://www.facebook.com/artify.mn";
  const instagramUrl = "https://www.instagram.com/artify.mn";

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Main Dual Column Layout Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Architectural Direct Inquiry Card */}
            <div className="flex flex-col lg:col-span-5">
              <FadeIn className="h-full">
                <div className="group relative flex h-full flex-col bg-[#0d1a46]/80 p-[1px] shadow-2xl [clip-path:polygon(24px_0,100%_0,100%_100%,0_100%,0_24px)]">
                  <div className="relative h-full flex flex-col justify-between bg-[#070e24] p-8 text-white sm:p-10 lg:p-12 [clip-path:polygon(23px_0,100%_0,100%_100%,0_100%,0_23px)]">
                    {/* Top-left corner chamfer decoration */}
                    <div className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-b border-r border-white/20 bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />

                    {/* Subtle corner crosshairs */}
                    <div className="pointer-events-none absolute right-4 top-4 font-mono text-xs text-white/20 select-none">+</div>
                    <div className="pointer-events-none absolute right-4 bottom-4 font-mono text-xs text-white/20 select-none">+</div>

                    <div>
                      <div className="inline-flex items-center gap-2 border border-sky-400/30 bg-sky-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-300 mb-6">
                        01 — {t("channelsHeading")}
                      </div>

                      <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                        {textPage?.name || (locale === "mn" ? "Амьдралын чанарыг хамтдаа урлая" : "Crafting Quality of Life Together")}
                      </h2>

                      {textPage?.description && (
                        <CmsContent
                          html={textPage.description}
                          className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base [&_p]:mt-3 [&_strong]:text-white"
                        />
                      )}

                      {/* Direct Contact Buttons */}
                      <div className="mt-8 space-y-4">
                        <a
                          href={`tel:${phone.replace(/\s+/g, '')}`}
                          className="group/btn flex items-center justify-between border border-white/20 bg-white/10 p-4 transition-all hover:bg-white hover:text-[#070e24]"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="flex h-10 w-10 items-center justify-center bg-white/15 text-white transition-colors group-hover/btn:bg-[#070e24] group-hover/btn:text-white">
                              <Phone size={18} />
                            </div>
                            <div>
                              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 group-hover/btn:text-slate-600">
                                {t("callDirect")}
                              </span>
                              <span className="font-display text-sm font-bold text-white group-hover/btn:text-[#070e24]">
                                {phone}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight size={16} className="text-white/60 transition-transform group-hover/btn:text-[#070e24] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>

                        <a
                          href={`mailto:${email}`}
                          className="group/btn flex items-center justify-between border border-white/20 bg-white/10 p-4 transition-all hover:bg-white hover:text-[#070e24]"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="flex h-10 w-10 items-center justify-center bg-white/15 text-white transition-colors group-hover/btn:bg-[#070e24] group-hover/btn:text-white">
                              <Mail size={18} />
                            </div>
                            <div>
                              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 group-hover/btn:text-slate-600">
                                {t("emailDirect")}
                              </span>
                              <span className="font-display text-sm font-bold text-white group-hover/btn:text-[#070e24]">
                                {email}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight size={16} className="text-white/60 transition-transform group-hover/btn:text-[#070e24] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>

                    <div className="mt-10 border-t border-white/15 pt-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5 text-xs text-slate-300">
                          <ShieldCheck size={16} className="text-sky-400" />
                          <span>{t("responseTime")}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <a
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="flex h-9 w-9 items-center justify-center border border-white/20 bg-white/10 text-white transition-all hover:bg-white hover:text-[#070e24]"
                          >
                            <FacebookIcon size={16} />
                          </a>
                          <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="flex h-9 w-9 items-center justify-center border border-white/20 bg-white/10 text-white transition-all hover:bg-white hover:text-[#070e24]"
                          >
                            <InstagramIcon size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: erxes Embedded Consultation Form */}
            <div className="lg:col-span-7">
              <FadeIn direction="up" delay={0.1}>
                <ErxesFormEmbed locale={locale} />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Architectural FAQ Grid Section */}
      <section className="border-t border-slate-200 bg-[#f8fafc] px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <FadeIn>
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
              <div>
                <div className="inline-flex items-center gap-2 border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0d1a46]">
                  FAQ & Inquiries
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-[#0d1a46] sm:text-3xl">
                  {t("faqTitle")}
                </h3>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
                {locale === "mn"
                  ? "Төсөл эхлүүлэх, инженерийн үзлэг хийлгэх, хамтран ажиллахтай холбоотой нийтлэг асуултууд."
                  : "Common questions regarding project initiation, engineering site visits, and partnerships."}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {faqs.map((faq, idx) => (
              <FadeIn key={idx} delay={0.08 * (idx + 1)} className="h-full">
                <div className="group relative flex h-full flex-col bg-slate-200/90 p-[1px] shadow-sm transition-all duration-300 hover:bg-[#0d1a46]/50 hover:shadow-xl [clip-path:polygon(20px_0,100%_0,100%_100%,0_100%,0_20px)]">
                  <div className="relative flex h-full flex-col justify-between bg-white p-6 sm:p-8 [clip-path:polygon(19px_0,100%_0,100%_100%,0_100%,0_19px)]">
                    {/* Top-left corner chamfer decoration */}
                    <div className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-b border-r border-[#0d1a46]/15 bg-slate-100/80 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />

                    {/* Subtle corner crosshairs */}
                    <div className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] text-slate-300 select-none">+</div>
                    <div className="pointer-events-none absolute right-3 bottom-3 font-mono text-[10px] text-slate-300 select-none">+</div>

                    <div>
                      <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#0d1a46]/80">
                        <HelpCircle size={15} className="text-primary shrink-0" />
                        <span>0{idx + 1} / QUESTION</span>
                      </div>
                      <h4 className="mt-3 font-display text-base font-bold text-[#0d1a46] sm:text-lg">
                        {faq.q}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
