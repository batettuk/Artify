"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { Building2, HardHat, Leaf } from "lucide-react";

const icons = {
  projects: Building2,
  experts: HardHat,
  sustainable: Leaf,
};

export function FeatureCards() {
  const t = useTranslations("features");

  const cards = [
    { key: "projects", icon: icons.projects },
    { key: "experts", icon: icons.experts },
    { key: "sustainable", icon: icons.sustainable },
  ];

  return (
    <section className="bg-secondary px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <FadeIn key={card.key} delay={index * 0.1} direction="up">
              <div className="group relative overflow-hidden rounded-3xl bg-card p-6 shadow-sm transition-all hover:shadow-md lg:rounded-[32px] lg:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground lg:text-xl">
                  {t(`${card.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground lg:text-base">
                  {t(`${card.key}.description`)}
                </p>
              </div>
            </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
