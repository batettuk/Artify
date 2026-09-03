import { getTranslations } from "next-intl/server";
import { getContactInfo } from "@/api/cms/server/queries/get-contact-info";
import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactFormIsland } from "@/components/sections/client/ContactFormIsland";
import { submitContactForm } from "@/app/[locale]/contact/actions";
import { MapPin, Phone, Mail } from "lucide-react";
import type { CmsPageDto } from "@/api/cms/types/public";

interface ContactFormProps {
  page: CmsPageDto | null;
  textPage: CmsPageDto | null;
  locale: string;
}

export async function ContactForm({ page, textPage, locale }: ContactFormProps) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const contact = await getContactInfo(locale);
  const action = submitContactForm.bind(null, locale);

  return (
    <section className="bg-background px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 text-center lg:mb-12">
            <h2 className="font-display text-2xl font-semibold text-foreground lg:text-4xl">
              {page?.name ?? ""}
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="rounded-none bg-gradient-to-br from-primary to-accent p-6 text-white shadow-lg lg:rounded-none lg:p-12">
              {textPage && (
                <div className="mb-10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {textPage.name}
                  </span>
                  {textPage.description && (
                    <CmsContent
                      html={textPage.description}
                      className="mt-6 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg"
                    />
                  )}
                  {textPage.content && (
                    <CmsContent
                      html={textPage.content}
                      className="mt-6 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg"
                    />
                  )}
                </div>
              )}

              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-white/90 lg:text-base">
                  <MapPin size={20} className="mt-0.5 shrink-0" />
                  {contact.address}
                </li>
                <li className="flex items-center gap-3 text-sm text-white/90 lg:text-base">
                  <Phone size={20} className="shrink-0" />
                  {contact.phone}
                </li>
                <li className="flex items-center gap-3 text-sm text-white/90 lg:text-base">
                  <Mail size={20} className="shrink-0" />
                  {contact.email}
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <ContactFormIsland
              action={action}
              labels={{
                name: t("name"),
                email: t("email"),
                message: t("message"),
                submit: t("submit"),
                submitting: t("submitting"),
                success: t("success"),
                error: t("error"),
                invalidName: t("invalidName"),
                invalidEmail: t("invalidEmail"),
                invalidMessage: t("invalidMessage"),
              }}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
