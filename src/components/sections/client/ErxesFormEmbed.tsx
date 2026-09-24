"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    erxesSettings?: {
      forms?: Array<{
        form_id: string;
        channel_id: string;
      }>;
    };
  }
}

export function ErxesFormEmbed({ locale = "mn" }: { locale?: string }) {
  const isEn = locale === "en";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.erxesSettings = {
      forms: [
        {
          form_id: "XjkU_8",
          channel_id: "0eDyTpGrVBoKY0ukuYXRM",
        },
      ],
    };

    // One-time cleanup for any rogue .hidden CSS rule injected by erxes widget
    const timer = setTimeout(() => {
      document.querySelectorAll("style:not([data-erxes-sanitized])").forEach((styleEl) => {
        if (styleEl.textContent && styleEl.textContent.includes(".hidden")) {
          styleEl.setAttribute("data-erxes-sanitized", "true");
          styleEl.textContent = styleEl.textContent.replace(
            /\.hidden\s*\{\s*display:\s*none\s*!important;?\s*\}/g,
            "/* neutralized erxes rogue .hidden rule */"
          );
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  return (
    <>
      <Script
        id="erxes-form-settings"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.erxesSettings = {
              forms: [
                {
                  form_id: 'XjkU_8',
                  channel_id: '0eDyTpGrVBoKY0ukuYXRM',
                },
              ],
            };
          `,
        }}
      />
      <Script
        id="erxes-form-bundle"
        src="https://artifynew.nextwidgets.erxes.io/formBundle.js"
        strategy="afterInteractive"
      />

      <div className="relative border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#070e24] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_-15px_rgba(13,26,70,0.07)] [clip-path:polygon(22px_0,100%_0,100%_100%,0_100%,0_22px)]">
        {/* Top-left chamfer geometric accent */}
        <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-b border-r border-[#0d1a46]/20 bg-slate-100 dark:border-white/20 dark:bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />

        {/* Subtle Architectural Corner Accents */}
        <div className="pointer-events-none absolute right-3 top-3 font-mono text-xs text-slate-300 dark:text-white/20 select-none">+</div>
        <div className="pointer-events-none absolute left-3 bottom-3 font-mono text-xs text-slate-300 dark:text-white/20 select-none">+</div>
        <div className="pointer-events-none absolute right-3 bottom-3 font-mono text-xs text-slate-300 dark:text-white/20 select-none">+</div>

        {/* Card Header */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
          <div>
            <h3 className="mt-1 font-display text-xl font-bold text-[#0d1a46] dark:text-white sm:text-2xl">
              {isEn ? "Request a Consultation" : "Зөвлөгөө авах хүсэлт"}
            </h3>
          </div>
          <span className="border border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            erxes CRM
          </span>
        </div>

        {/* Embedded erxes form container */}
        <div className="w-full min-h-[380px] overflow-hidden" ref={containerRef}>
          <div data-erxes-embed="XjkU_8"></div>
        </div>
      </div>
    </>
  );
}
