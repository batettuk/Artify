"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowUpRight } from "lucide-react";
import Image from "@/components/common/Image";

interface OverlayLogo {
  src: string;
  width: number;
  height: number;
  tone: "dark" | "light";
}

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  cta: string;
  delay?: number;
  image: string;
  overlayLogo?: OverlayLogo;
}

function ProductCard({ title, description, href, external, cta, delay = 0, image, overlayLogo }: ProductCardProps) {
  const cardMedia = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {overlayLogo && (
          <div
            className={`absolute bottom-3 left-3 px-3 py-2 ${
              overlayLogo.tone === "dark" ? "bg-black/50" : "bg-white/85"
            }`}
          >
            <Image
              src={overlayLogo.src}
              alt=""
              width={overlayLogo.width}
              height={overlayLogo.height}
              className="h-6 w-auto object-contain lg:h-7"
            />
          </div>
        )}
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary lg:text-xl">
        {title}
      </h3>
    </>
  );

  return (
    <FadeIn delay={delay} direction="up">
      <div className="flex flex-col bg-card p-5 shadow-sm transition-all hover:shadow-md lg:p-8">
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
            {cardMedia}
          </a>
        ) : (
          <Link href={href} className="group block">
            {cardMedia}
          </Link>
        )}
        <div className="mt-2 flex flex-1 flex-col">
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground lg:text-base">
            {description}
          </p>
          {external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 self-start bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              {cta}
              <ArrowUpRight size={16} />
            </a>
          ) : (
            <Link
              href={href}
              className="mt-5 inline-flex items-center gap-2 self-start bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              {cta}
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

export function ProductsSection() {
  const t = useTranslations("products");

  return (
    <section className="px-3 py-10 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 text-center lg:mb-12">
            <h2 className="font-display text-2xl font-semibold text-foreground lg:text-4xl">
              {t("heading")}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProductCard
            title={t("blockAcademy.title")}
            description={t("blockAcademy.description")}
            href="/products/block-academy"
            cta={t("cta")}
            delay={0.1}
            image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
            overlayLogo={{
              src: "/images/partners/block-academy.png",
              width: 226,
              height: 63,
              tone: "dark",
            }}
          />
          <ProductCard
            title={t("techInvent.title")}
            description={t("techInvent.description")}
            href="https://www.techinvent.mn/en"
            external
            cta={t("visitWebsite")}
            delay={0.2}
            image="/images/products/tech-invent.png"
            overlayLogo={{
              src: "/images/partners/zehnder.png",
              width: 768,
              height: 479,
              tone: "light",
            }}
          />
          <ProductCard
            title={t("customMaterials.title")}
            description={t("customMaterials.description")}
            href="/products/custom-materials"
            cta={t("cta")}
            delay={0.3}
            image="/images/products/custom-materials.png"
          />
        </div>
      </div>
    </section>
  );
}
