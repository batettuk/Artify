"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";

export function CeoSection() {
  const t = useTranslations("ceo");

  return (
    <section className="bg-secondary px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="up" className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden bg-card shadow-sm">
              <Image
                src="/images/ceo.png"
                alt={t("role")}
                fill
                className="h-full w-full object-cover object-top"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="order-1 lg:order-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t("label")}
              </span>
              <blockquote className="mt-4 font-display text-xl font-semibold leading-snug text-foreground lg:text-3xl">
                “{t("quote")}”
              </blockquote>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t("role")}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
