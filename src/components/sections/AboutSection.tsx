"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";

export function AboutSection() {
  const t = useTranslations("about");
  const ubPoints = t.raw("ubPoints") as string[];

  return (
    <section className="bg-background px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="h-full">
            <div className="h-full bg-card p-6 shadow-sm lg:p-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t("label")}
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-foreground lg:text-4xl">
                {t("heading")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {t("intro")}
              </p>

              <h3 className="mt-8 font-display text-lg font-semibold text-foreground lg:text-xl">
                {t("ubTitle")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {t("ubIntro")}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {ubPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-foreground lg:text-base">
                {t("ubBold")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {t("ubBody")}
              </p>

              <h3 className="mt-8 font-display text-lg font-semibold text-foreground lg:text-xl">
                {t("smartTitle")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {t("smartBody1")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {t("smartBody2")}
              </p>

              <h3 className="mt-8 font-display text-lg font-semibold text-foreground lg:text-xl">
                {t("solutionTitle")}
              </h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-primary lg:text-base">
                {t("solutionElements")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {t("solutionBody")}
              </p>

              <h3 className="mt-8 font-display text-lg font-semibold text-foreground lg:text-xl">
                {t("partnerTitle")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {t("partnerBody1")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {t("partnerBody2")}
              </p>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-foreground lg:text-base">
                {t("closing")}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="up" className="h-full">
            <div className="relative h-full min-h-[320px] overflow-hidden bg-card shadow-sm lg:min-h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
                alt="Construction team at work"
                fill
                className="h-full w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
