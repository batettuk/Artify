"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowRight } from "lucide-react";

function formatHeroHeading(text: string | null | undefined, locale?: string): string {
  if (!text) {
    return locale === "en"
      ? "What is the true value\nof your project?"
      : "Таны төслийн бодит\nүнэ цэн юу вэ?";
  }
  if (text.includes("\n")) {
    return text;
  }
  if (/таны төслийн бодит/i.test(text)) {
    return text.replace(/^(таны төслийн бодит)\s+(.*)$/i, "$1\n$2");
  }
  if (/^what is the true value/i.test(text)) {
    return text.replace(/^(what is the true value)\s+(.*)$/i, "$1\n$2");
  }
  return text;
}

function formatHeroBody(text: string | null | undefined, locale?: string): string {
  if (!text || text.includes("Барилгын төсөл бүрийн") || text.includes("Engineering intellect")) {
    return locale === "en"
      ? "You are implementing high-value projects.\nBut how do you truly differentiate from competitors?"
      : "Та илүү чанартай, үнэ цэнтэй төсөл хэрэгжүүлж байна.\nГэвч өрсөлдөгчөөсөө хэрхэн ялгарах вэ?";
  }
  if (text.includes("\n")) {
    return text;
  }
  if (text.includes("хэрэгжүүлж байна.")) {
    return text.replace(/(хэрэгжүүлж байна\.)\s+/, "$1\n");
  }
  if (/high-value projects\.\s+/i.test(text)) {
    return text.replace(/(high-value projects\.)\s+/i, "$1\n");
  }
  return text;
}

export function Hero({
  heading,
  body,
  videoUrl,
  locale,
}: {
  heading: string;
  body: string | null;
  videoUrl: string | null;
  locale?: string;
}) {
  const t = useTranslations("hero");
  const videoRef = useRef<HTMLVideoElement>(null);

  const displayHeading = formatHeroHeading(heading, locale);
  const displayBody = formatHeroBody(body, locale);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.error("Video autoplay failed:", err);
      });
    }
  }, []);

  return (
    <section className="relative flex min-h-[80vh] lg:h-[80vh] w-full items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoUrl || "/videos/hero.mp4"} type="video/mp4" />
      </video>
      {/* Cinematic dark overlay gradient for readability and seamless transparent header */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center lg:px-12 lg:py-24">
        <FadeIn delay={0.1}>
          <h1 className="font-display text-2xl font-bold leading-tight text-white whitespace-pre-line sm:text-3xl lg:text-4xl xl:text-5xl">
            {displayHeading}
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 whitespace-pre-line font-medium sm:text-base lg:text-lg">
            {displayBody}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-11 items-center gap-2 bg-white px-7 text-xs font-bold uppercase tracking-wider text-[#070e24] shadow-lg transition-all hover:scale-105 hover:bg-white/90"
            >
              {t("ctaPrimary")}
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center border-2 border-white/60 bg-black/20 px-7 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </FadeIn>
      </div>

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 bg-primary/20 blur-3xl lg:h-96 lg:w-96" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 bg-primary/20 blur-3xl lg:h-96 lg:w-96" />
    </section>
  );
}
