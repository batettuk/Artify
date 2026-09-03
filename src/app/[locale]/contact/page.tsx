import { getTranslations } from "next-intl/server";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { ContactForm } from "@/components/sections/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const page = await getPageDetail({ slug: "contact", language: locale });
  return {
    title: `${page?.name ?? t("contact")} | Artify`,
    description: page?.description ?? undefined,
  };
}

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const [page, textPage] = await Promise.all([
    getPageDetail({ slug: "contact", language: locale }),
    getPageDetail({ slug: "contact-text", language: locale }),
  ]);

  return (
    <>
      <section className="px-3 pt-28 lg:px-6 lg:pt-32">
        <div className="relative overflow-hidden rounded-none px-6 py-16 text-center text-white lg:rounded-none lg:py-24">
          {/* Background Image (presentation asset — media manifest: reference) */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
              alt="Contact background"
              fill
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/80" />
          </div>

          <div className="relative z-10">
            <FadeIn>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                05 — Contact
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight lg:text-5xl">
                {page?.name}
              </h1>
            </FadeIn>

            {page?.description && (
              <FadeIn delay={0.2}>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 lg:text-lg">
                  {page.description}
                </p>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      <ContactForm page={page} textPage={textPage} locale={locale} />
    </>
  );
}
