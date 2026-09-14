"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  scrolled?: boolean;
  className?: string;
}

export function ThemeToggle({ scrolled = true, className = "" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
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
      className={`relative flex h-[42px] w-[42px] items-center justify-center border backdrop-blur-md transition-all duration-300 ${
        isDark
          ? "border-white/20 bg-white/10 text-amber-300 hover:bg-white/20 hover:text-amber-200"
          : scrolled
          ? "border-[#0d1a46]/20 bg-white/50 text-[#0d1a46] hover:bg-[#0d1a46]/10 shadow-[0_4px_24px_0_rgba(13,26,70,0.08),inset_0_1px_2px_0_rgba(255,255,255,0.7)]"
          : "border-white/30 bg-black/25 text-white hover:bg-white/20"
      } ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.div
            key={isDark ? "dark" : "light"}
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {isDark ? (
              <Sun size={18} className="text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
            ) : (
              <Moon size={18} className={scrolled ? "text-[#0d1a46]" : "text-white"} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
