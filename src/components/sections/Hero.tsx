"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowRight } from "lucide-react";

export function Hero({
  heading,
  body,
  videoUrl,
}: {
  heading: string;
  body: string | null;
  videoUrl: string | null;
}) {
  const t = useTranslations("hero");
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section className="mx-3 mt-20 lg:mx-6 lg:mt-24">
      <div className="relative flex min-h-[85vh] items-center overflow-hidden px-6 py-16 lg:min-h-[90vh] lg:px-16 lg:py-28">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80"
        >
          {videoUrl && <source src={videoUrl} type="video/mp4" />}
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <span className="inline-block bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              {t("label")}
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-6 font-display text-2xl font-semibold leading-tight text-white lg:text-4xl xl:text-5xl">
              {heading}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 lg:text-lg">
              {body}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-12 items-center gap-2 bg-white px-6 text-sm font-semibold text-primary transition-transform hover:scale-105"
              >
                {t("ctaPrimary")}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center border-2 border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 bg-white/10 blur-3xl lg:h-96 lg:w-96">
        </div>
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 bg-white/10 blur-3xl lg:h-96 lg:w-96">
        </div>
      </div>
    </section>
  );
}
