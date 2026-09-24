"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowRight } from "lucide-react";

function formatHeroHeading(text: string | null | undefined): string {
  if (!text) return "";
  const clean = text.replace(/<br\s*\/?>/gi, "\n");
  if (clean.includes("\n")) {
    return clean;
  }
  // Cut specifically on "бодит" (bodit)
  if (/бодит/i.test(clean)) {
    return clean.replace(/(бодит)\s+/i, "$1\n");
  }
  if (/bodit/i.test(clean)) {
    return clean.replace(/(bodit)\s+/i, "$1\n");
  }
  if (/true value/i.test(clean)) {
    return clean.replace(/(true value)\s+/i, "$1\n");
  }
  if (/value/i.test(clean)) {
    return clean.replace(/(value)\s+/i, "$1\n");
  }
  return clean;
}

function formatHeroBody(text: string | null | undefined): string {
  if (!text) return "";
  const clean = text.replace(/<br\s*\/?>/gi, "\n");
  if (clean.includes("\n")) {
    return clean;
  }
  if (clean.includes("хэрэгжүүлж байна.")) {
    return clean.replace(/(хэрэгжүүлж байна\.)\s+/, "$1\n");
  }
  if (/high-value projects\.\s+/i.test(clean)) {
    return clean.replace(/(high-value projects\.)\s+/i, "$1\n");
  }
  return clean;
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
  const sectionRef = useRef<HTMLElement>(null);

  const displayHeading = formatHeroHeading(heading);
  const displayBody = formatHeroBody(body);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.muted = true;

    // Do not autoplay if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    let isSectionVisible = true;

    const playVideo = () => {
      if (isSectionVisible && !document.hidden) {
        video.play().catch(() => {});
      }
    };

    const pauseVideo = () => {
      video.pause();
    };

    // Pause video immediately when scrolled out of view to save CPU and GPU
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isSectionVisible = entry.isIntersecting;
          if (entry.isIntersecting) {
            playVideo();
          } else {
            pauseVideo();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    // Pause video when tab is hidden or minimized
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseVideo();
      } else if (isSectionVisible) {
        playVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-[80vh] lg:h-[80vh] w-full items-center justify-center overflow-hidden">
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
          <h1 className="font-display text-3xl font-bold leading-tight text-white whitespace-pre-line sm:text-4xl lg:text-5xl xl:text-6xl drop-shadow-sm">
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

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 [background:radial-gradient(circle,rgba(63,87,142,0.25)_0%,transparent_70%)] lg:h-96 lg:w-96" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 [background:radial-gradient(circle,rgba(63,87,142,0.25)_0%,transparent_70%)] lg:h-96 lg:w-96" />
    </section>
  );
}

