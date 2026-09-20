"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useState, useEffect } from "react";

const LABELS: Record<string, string> = {
  en: "EN",
  mn: "МН",
};

export function LanguageSwitcher({
  locales,
  scrolled = true,
  id = "desktop",
}: {
  locales: string[];
  scrolled?: boolean;
  id?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      className={`relative flex h-[42px] items-center gap-1 border p-1 backdrop-blur-md transition-all duration-300 ${
        isDark
          ? "border-white/20 bg-white/10 shadow-none"
          : scrolled
          ? "border-[#0d1a46]/20 bg-white/50 shadow-[0_4px_24px_0_rgba(13,26,70,0.08),inset_0_1px_2px_0_rgba(255,255,255,0.7)]"
          : "border-white/30 bg-black/25 shadow-none"
      }`}
    >
      <div
        className={`flex h-full items-center pl-2 pr-1 transition-colors ${
          isDark
            ? "text-white"
            : scrolled
            ? "text-[#0d1a46]/70"
            : "text-white/80"
        }`}
      >
        <Globe size={15} className="opacity-80" />
      </div>

      <div className="flex h-full items-center gap-0.5">
        {locales.map((l) => {
          const isActive = l === locale;
          return (
            <Link
              key={l}
              href={pathname}
              locale={l}
              className={`relative z-10 flex h-full items-center justify-center px-3 text-xs font-bold tracking-wider transition-colors duration-200 ${
                isActive
                  ? isDark
                    ? "text-[#070e24] font-extrabold"
                    : scrolled
                    ? "text-white"
                    : "text-[#0d1a46]"
                  : isDark
                  ? "text-white/80 hover:text-white"
                  : scrolled
                  ? "text-[#0d1a46]/75 hover:text-[#0d1a46]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={`activeLangIndicator_${id}`}
                  className={`absolute inset-0 -z-10 shadow-sm ${
                    isDark
                      ? "bg-white"
                      : scrolled
                      ? "bg-gradient-to-br from-[#0d1a46] via-[#1a2e6e] to-[#0d1a46] before:pointer-events-none before:absolute before:inset-0 before:border before:border-sky-300/30"
                      : "bg-white"
                  }`}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                  }}
                />
              )}
              {LABELS[l] ?? l.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
