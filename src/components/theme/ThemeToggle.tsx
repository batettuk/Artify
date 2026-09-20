"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  scrolled?: boolean;
  className?: string;
}

export function ThemeToggle({ scrolled = true, className = "" }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`group relative flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden border backdrop-blur-md transition-all duration-300 [clip-path:polygon(8px_0,100%_0,100%_100%,0_100%,0_8px)] ${
        isDark
          ? "border-white/20 bg-white/10 text-white shadow-none hover:border-white/40 hover:bg-white/20"
          : scrolled
          ? "border-[#0d1a46]/20 bg-white/60 text-[#0d1a46] shadow-[0_4px_24px_0_rgba(13,26,70,0.08),inset_0_1px_2px_0_rgba(255,255,255,0.7)] hover:border-[#0d1a46]/40 hover:bg-white/80"
          : "border-white/30 bg-black/30 text-white shadow-none hover:border-white/60 hover:bg-white/15"
      } ${className}`}
      aria-label={isDark ? "Switch to daylight mode" : "Switch to midnight mode"}
      title={isDark ? "Dark Mode (Click for Daylight)" : "Light Mode (Click for Midnight)"}
    >
      {/* Corner chamfer indicator */}
      <span
        className={`pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 [clip-path:polygon(0_0,100%_0,0_100%)] transition-colors ${
          isDark
            ? "bg-white"
            : scrolled
            ? "bg-[#0d1a46]"
            : "bg-white"
        }`}
      />

      {/* Ambient hover radial glow */}
      <span
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          isDark
            ? "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_70%)]"
            : scrolled
            ? "bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2)_0%,transparent_70%)]"
            : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_70%)]"
        }`}
      />

      {/* Animated Celestial Moon / Vivid Solar Radiance */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark-theme-celestial" : "light-theme-solar"}
          initial={{ opacity: 0, rotate: isDark ? -120 : 120, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: isDark ? 120 : -120, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 24,
          }}
          className="relative z-10 flex h-5 w-5 items-center justify-center select-none"
        >
          {isDark ? (
            /* Custom Celestial Moon in crisp white with star pulses */
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-110 text-sky-200"
            >
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="currentColor"
              />
              <circle cx="19" cy="5" r="1.5" fill="#FFFFFF" className="animate-pulse" />
              <circle cx="15" cy="2" r="1" fill="#FFFFFF" opacity="0.8" />
            </svg>
          ) : (
            /* Custom Architectural Solar Radiance - High contrast vivid amber beams */
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              {/* Sun Center Orb with Warm Radiant Amber */}
              <circle
                cx="12"
                cy="12"
                r="4.5"
                fill="#F59E0B"
                className="drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]"
              />
              {/* Precision Cardinal Beams - High contrast amber on light background */}
              <g
                stroke={scrolled ? "#D97706" : "#FBBF24"}
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="12" y1="2" x2="12" y2="4.5" />
                <line x1="12" y1="19.5" x2="12" y2="22" />
                <line x1="2" y1="12" x2="4.5" y2="12" />
                <line x1="19.5" y1="12" x2="22" y2="12" />
              </g>
              {/* Diagonal Accent Flares - High contrast amber on light background */}
              <g
                stroke={scrolled ? "#D97706" : "#FBBF24"}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.9"
              >
                <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
                <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
                <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
              </g>
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
