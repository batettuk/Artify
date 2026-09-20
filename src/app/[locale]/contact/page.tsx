import { getTranslations } from "next-intl/server";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { getContactInfo } from "@/api/cms/server/queries/get-contact-info";
import { ContactForm } from "@/components/sections/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const page = await getPageDetail({ slug: "contact", language: locale });
  const isEn = locale === "en";
  const title = page?.name || (isEn ? "Contact & Inquiries" : "Холбоо барих");
  let description = page?.description || t("body");
  if (description.includes("<") || description.includes("Address:") || description.includes("Phone:")) {
    description = t("body");
  }
  return {
    title: `${title} | Artify`,
    description,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const [page, textPage, contactInfo] = await Promise.all([
    getPageDetail({ slug: "contact", language: locale }),
    getPageDetail({ slug: "contact-text", language: locale }),
    getContactInfo(locale),
  ]);

  const isEn = locale === "en";
  const heroHeading = page?.name || (isEn ? "Contact & Inquiries" : "Холбоо барих");
  let heroBody = page?.description || t("body");
  if (heroBody.includes("<") || heroBody.includes("Address:") || heroBody.includes("Phone:")) {
    heroBody = t("body");
  }

  return (
    <>
      {/* Full-bleed Edge-to-Edge Hero Banner */}
      <section className="relative flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-[#070e24] pt-32 pb-20 lg:min-h-[540px] lg:pt-40 lg:pb-28">
        <div className="absolute inset-0">
          <Image
            src="/images/consulting-2.jpg"
            alt="Artify Contact & Consultation"
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center scale-[1.01]"
          />
          {/* Subtle cinematic gradient overlay preserving image clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#070e24]/60 to-[#070e24]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white lg:px-12">
          <FadeIn>
            <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {heroHeading}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200 lg:text-lg">
              {heroBody}
            </p>
          </FadeIn>
        </div>
      </section>

      <ContactForm
        page={page}
        textPage={textPage}
        locale={locale}
        phone={contactInfo.phone}
        email={contactInfo.email}
        address={contactInfo.address}
        hours={contactInfo.hours}
        facebookUrl={contactInfo.facebook || undefined}
        instagramUrl={contactInfo.instagram || undefined}
      />
    </>
  );
}
