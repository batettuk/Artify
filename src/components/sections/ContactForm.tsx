"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { MapPin, Phone, Mail } from "lucide-react";

interface ContactFormProps {
  locale: string;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-background px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 text-center lg:mb-12">
            <h2 className="font-display text-2xl font-semibold text-foreground lg:text-4xl">
              {t("label")}
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="rounded-none bg-gradient-to-br from-primary to-accent p-6 text-white shadow-lg lg:rounded-none lg:p-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                {t("label")}
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-tight lg:text-4xl">
                {t("heading")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/90 lg:text-base">
                {t("body")}
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3 text-sm text-white/90 lg:text-base">
                  <MapPin size={20} className="mt-0.5 shrink-0" />
                  {t("address")}
                </li>
                <li className="flex items-center gap-3 text-sm text-white/90 lg:text-base">
                  <Phone size={20} className="shrink-0" />
                  {t("phone")}
                </li>
                <li className="flex items-center gap-3 text-sm text-white/90 lg:text-base">
                  <Mail size={20} className="shrink-0" />
                  {t("emailAddress")}
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-none bg-card p-6 shadow-sm lg:rounded-none lg:p-10"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    {t("name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-2 block w-full rounded-none border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 block w-full rounded-none border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">
                    {t("message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="mt-2 block w-full rounded-none border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
                  ></textarea>
                </div>
              </div>

              {submitted ? (
                <p className="mt-6 text-sm font-medium text-success">{t("success")}</p>
              ) : (
                <button
                  type="submit"
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-none bg-primary px-8 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  {t("submit")}
                </button>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
