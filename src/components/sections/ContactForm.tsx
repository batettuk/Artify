import { getTranslations } from "next-intl/server";
import { getContactInfo } from "@/api/cms/server/queries/get-contact-info";
import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import { ErxesFormEmbed } from "@/components/sections/client/ErxesFormEmbed";
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUpRight, HelpCircle } from "lucide-react";
import type { CmsPageDto } from "@/api/cms/types/public";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface ContactFormProps {
  page: CmsPageDto | null;
  textPage: CmsPageDto | null;
  locale: string;
}

export async function ContactForm({ page, textPage, locale }: ContactFormProps) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const contact = await getContactInfo(locale);

  const phone = contact.phone || "+976 7771 0155";
  const email = contact.email || "info@artifybrand.com";
  const address = contact.address || (locale === "mn" ? "Улаанбаатар хот, Монгол" : "Ulaanbaatar, Mongolia");
  const facebookUrl = contact.facebook || "https://www.facebook.com/artify.mn";
  const instagramUrl = contact.instagram || "https://www.instagram.com/artify.mn";

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <div className="bg-background">
      {/* 4-Item Contact Specification Bar */}
      <section className="border-b border-slate-200 bg-[#f8fafc] px-4 py-8 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="group block border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0d1a46]/30 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">01 / HOTLINE</span>
                <Phone size={14} className="text-[#0d1a46] opacity-60 transition-transform group-hover:scale-110" />
              </div>
              <p className="mt-2 font-display text-sm font-bold text-[#0d1a46] sm:text-base">{phone}</p>
              <span className="mt-1 block text-[11px] text-slate-500">{locale === "mn" ? "Шууд холбогдох" : "Instant Call"}</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="group block border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0d1a46]/30 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">02 / DISPATCH</span>
                <Mail size={14} className="text-[#0d1a46] opacity-60 transition-transform group-hover:scale-110" />
              </div>
              <p className="mt-2 font-display text-sm font-bold text-[#0d1a46] sm:text-base">{email}</p>
              <span className="mt-1 block text-[11px] text-slate-500">{locale === "mn" ? "Имэйл харилцаа" : "24h Response"}</span>
            </a>

            <div className="border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">03 / LOCATION</span>
                <MapPin size={14} className="text-[#0d1a46] opacity-60" />
              </div>
              <p className="mt-2 font-display text-sm font-bold text-[#0d1a46] sm:text-base">{address}</p>
              <span className="mt-1 block text-[11px] text-slate-500">{locale === "mn" ? "Төв оффис" : "Headquarters"}</span>
            </div>

            <div className="border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">04 / SCHEDULE</span>
                <Clock size={14} className="text-[#0d1a46] opacity-60" />
              </div>
              <p className="mt-2 font-display text-sm font-bold text-[#0d1a46] sm:text-base">09:00 – 18:00</p>
              <span className="mt-1 block text-[11px] text-slate-500">{locale === "mn" ? "Даваа – Баасан" : "Mon – Fri active"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Form & Headquarters Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Headquarters Architectural Information Card */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <FadeIn className="h-full flex flex-col">
                <div className="relative h-full flex flex-col justify-between border border-[#0d1a46]/20 bg-[#070e24] p-8 text-white shadow-2xl sm:p-10 lg:p-12 [clip-path:polygon(22px_0,100%_0,100%_100%,0_100%,0_22px)]">
                  {/* Top-left chamfer geometric accent */}
                  <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-b border-r border-white/20 bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />

                  {/* Corner Crosshairs */}
                  <div className="pointer-events-none absolute right-3 top-3 font-mono text-xs text-white/20 select-none">+</div>
                  <div className="pointer-events-none absolute left-3 bottom-3 font-mono text-xs text-white/20 select-none">+</div>
                  <div className="pointer-events-none absolute right-3 bottom-3 font-mono text-xs text-white/20 select-none">+</div>

                  <div>
                    <div className="inline-flex items-center gap-2 border border-sky-400/30 bg-sky-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-300 backdrop-blur-sm mb-6">
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
                        className="group flex items-center justify-between border border-white/20 bg-white/10 p-4 transition-all hover:bg-white hover:text-[#070e24]"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-10 w-10 items-center justify-center bg-white/15 text-white transition-colors group-hover:bg-[#070e24] group-hover:text-white">
                            <Phone size={18} />
                          </div>
                          <div>
                            <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 group-hover:text-slate-600">
                              {t("callDirect")}
                            </span>
                            <span className="font-display text-sm font-bold text-white group-hover:text-[#070e24]">
                              {phone}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight size={16} className="text-white/60 transition-transform group-hover:text-[#070e24] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>

                      <a
                        href={`mailto:${email}`}
                        className="group flex items-center justify-between border border-white/20 bg-white/10 p-4 transition-all hover:bg-white hover:text-[#070e24]"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-10 w-10 items-center justify-center bg-white/15 text-white transition-colors group-hover:bg-[#070e24] group-hover:text-white">
                            <Mail size={18} />
                          </div>
                          <div>
                            <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 group-hover:text-slate-600">
                              {t("emailDirect")}
                            </span>
                            <span className="font-display text-sm font-bold text-white group-hover:text-[#070e24]">
                              {email}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight size={16} className="text-white/60 transition-transform group-hover:text-[#070e24] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              <FadeIn key={idx} delay={0.08 * (idx + 1)}>
                <div className="relative flex h-full flex-col justify-between border border-slate-200/90 bg-white p-6 shadow-sm transition-all hover:border-[#0d1a46]/30 hover:shadow-md sm:p-8">
                  {/* Subtle corner crosshairs */}
                  <div className="pointer-events-none absolute right-2.5 top-2.5 font-mono text-[10px] text-slate-300 select-none">+</div>
                  <div className="pointer-events-none absolute right-2.5 bottom-2.5 font-mono text-[10px] text-slate-300 select-none">+</div>

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
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
