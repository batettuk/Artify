"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "@/components/common/Image";

const partners = [
  { name: "Artify", logo: "/images/artify-logo-black.png", width: 4351, height: 472 },
  { name: "Remax Platinum", logo: "/images/partners/remax.png", width: 2000, height: 1000 },
  { name: "Tech Invent", logo: "/images/partners/tech-invent.png", width: 727, height: 308 },
  { name: "Zehnder", logo: "/images/partners/zehnder.png", width: 768, height: 479 },
  { name: "erxes", logo: "/images/partners/erxes.png", width: 626, height: 319 },
  { name: "Block MN", logo: "/images/partners/block-academy.png", width: 226, height: 63 },
];

function LogoItem({ partner }: { partner: typeof partners[number] }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-6 py-2 lg:px-10 lg:py-4">
      <Image
        src={partner.logo}
        alt={partner.name}
        width={partner.width}
        height={partner.height}
        className="h-12 w-auto max-w-[160px] object-contain grayscale brightness-0 lg:h-14 lg:max-w-[200px]"
      />
    </div>
  );
}

export function MarqueeSection() {
  const t = useTranslations("partners");
  const doubled = [...partners, ...partners];

  return (
    <section className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1600px]">
        <FadeIn>
          <h2 className="mb-6 text-center font-display text-2xl font-semibold text-foreground lg:mb-8 lg:text-4xl">
            {t("label")}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="overflow-hidden bg-white/80 px-4 py-5 shadow-sm backdrop-blur lg:px-8 lg:py-7">
            <div className="flex w-max animate-marquee items-center">
              {doubled.map((partner, index) => (
                <LogoItem key={`${partner.name}-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
