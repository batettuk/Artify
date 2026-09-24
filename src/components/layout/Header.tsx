"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail, Clock, Globe } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import NextImage from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SearchBar } from "@/components/layout/SearchBar";
import { useTheme } from "@/components/theme/ThemeProvider";
import { routing } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import type { MenuItemDto } from "@/api/cms/types/public";

interface HeaderProps {
  locale: string;
  navItems?: MenuItemDto[];
}

export default function Header({ locale, navItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const t = useTranslations("nav");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  // Scroll detection: throttled with requestAnimationFrame for 60/120Hz smooth performance
  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        rafId = null;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);


  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const staticNav = [
    { href: "/", label: t("home") || (locale === "mn" ? "Нүүр" : "Home") },
    { href: "/products", label: t("products") || (locale === "mn" ? "Бүтээгдэхүүн" : "Products") },
    { href: "/blog", label: t("blog") || (locale === "mn" ? "Мэдээ" : "Blog") },
    { href: "/contact", label: t("contact") || (locale === "mn" ? "Холбоо барих" : "Contact") },
  ];

  const links =
    navItems && navItems.length > 0
      ? navItems.map((item) => ({ href: item.url, label: item.label }))
      : staticNav;

  // In dark mode -> ALWAYS white logo.
  // In light mode -> white logo on top of dark hero banner (!scrolled && !mobileOpen), navy logo when scrolled or when mobile menu is open.
  const logoSrc = isDark || (!scrolled && !mobileOpen)
    ? "/images/artify-logo-white.png"
    : "/images/artify-logo-navy.png";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 ease-out ${
          mobileOpen
            ? isDark
              ? "border-b border-white/10 bg-[#070e24]/95 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-[180%] lg:py-3"
              : "border-b border-[#0d1a46]/10 bg-white/95 py-2.5 shadow-[0_4px_30px_rgba(13,26,70,0.08)] backdrop-blur-xl backdrop-saturate-[180%] lg:py-3"
            : scrolled
            ? isDark
              ? "border-b border-white/10 bg-[#070e24]/95 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-[180%] lg:py-3"
              : "border-b border-[#0d1a46]/10 bg-white/95 py-2.5 shadow-[0_4px_30px_rgba(13,26,70,0.08)] backdrop-blur-xl backdrop-saturate-[180%] lg:py-3"
            : "border-b border-transparent bg-transparent py-3.5 shadow-none lg:py-5"
        }`}
      >
        <div className="relative mx-auto flex max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="relative z-10 flex items-center justify-start shrink-0"
          >
            <NextImage
              src={logoSrc}
              alt="Artify Brand"
              width={4351}
              height={472}
              priority
              unoptimized
              className="h-7 sm:h-8 w-auto transition-transform hover:opacity-90 lg:h-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation (Desktops & Laptops >= 1280px) */}
          <nav
            data-desktop-nav
            className="max-xl:!hidden xl:!flex items-center gap-1 lg:gap-2"
          >
            {links.map((link) => {
              const linkIsHome = link.href === "/" || link.href === "";
              const isActive = linkIsHome
                ? pathname === "/" || pathname === ""
                : pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex h-[40px] items-center px-3 lg:px-5 text-sm lg:text-base font-bold tracking-tight transition-colors duration-200 ${
                    isDark || !scrolled
                      ? isActive
                        ? "text-white font-extrabold"
                        : "text-white/80 hover:text-white"
                      : isActive
                      ? "text-[#0d1a46] font-extrabold"
                      : "text-[#0d1a46]/75 hover:text-[#0d1a46]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-3 right-3 lg:left-5 lg:right-5 h-[2px] rounded-none transition-colors ${
                        isDark || !scrolled ? "bg-white" : "bg-[#0d1a46]"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search, Theme Toggle, Language, Spinning Hamburger Trigger */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            {/* Real-time Interactive Search Bar (Desktop >= 1280px) */}
            <div data-desktop-search className="max-xl:!hidden xl:!block">
              <SearchBar locale={locale} scrolled={scrolled} />
            </div>

            {/* Dark Mode Theme Toggle */}
            <ThemeToggle scrolled={scrolled} />

            {/* Desktop Language Switcher (Desktop >= 1280px) */}
            <div data-desktop-lang className="max-xl:!hidden xl:!block">
              <LanguageSwitcher locales={[...routing.locales]} scrolled={scrolled} id="desktop" />
            </div>

            {/* Spinning Hamburger / Close Button (iPads, Tablets & Mobile < 1280px) */}
            <motion.button
              whileTap={{ scale: 0.9, rotate: mobileOpen ? -15 : 15 }}
              className={`group relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center border backdrop-blur-md transition-all duration-300 xl:!hidden [clip-path:polygon(8px_0,100%_0,100%_100%,0_100%,0_8px)] ${
                mobileOpen
                  ? isDark
                    ? "border-white/40 bg-white/15 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    : "border-[#0d1a46]/30 bg-[#0d1a46]/10 text-[#0d1a46] shadow-[0_0_20px_rgba(13,26,70,0.1)]"
                  : isDark || !scrolled
                  ? "border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20 active:scale-95"
                  : "border-[#0d1a46]/20 bg-white/80 text-[#0d1a46] hover:border-[#0d1a46]/40 hover:bg-[#0d1a46]/10 active:scale-95"
              }`}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {/* Corner chamfer indicator */}
              <span
                className={`pointer-events-none absolute left-0 top-0 h-2 w-2 [clip-path:polygon(0_0,100%_0,0_100%)] transition-colors ${
                  mobileOpen
                    ? isDark
                      ? "bg-white"
                      : "bg-[#0d1a46]"
                    : isDark || !scrolled
                    ? "bg-white"
                    : "bg-[#0d1a46]"
                }`}
              />

              <AnimatePresence mode="popLayout" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close-icon"
                    initial={{ rotate: -180, scale: 0.3, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 180, scale: 0.3, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    className="flex items-center justify-center"
                  >
                    <X size={20} className={isDark ? "text-white" : "text-[#0d1a46]"} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{ rotate: 180, scale: 0.3, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -180, scale: 0.3, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    className="flex items-center justify-center"
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Fullscreen Collapsible Drawer (iPads, Tablets & Mobile < 1280px) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`fixed inset-0 z-[9990] flex flex-col pt-20 sm:pt-24 xl:!hidden overflow-hidden transition-colors duration-300 ${
              isDark
                ? "bg-[#070e24] text-white [background:radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(30,64,175,0.22),#070e24_70%)]"
                : "bg-[#f8fafc] text-[#070e24] [background:radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(13,26,70,0.06),#f8fafc_70%)]"
            }`}
          >
            {/* Ambient Lighting Orbs - hardware accelerated zero-filter radial gradients */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              {isDark ? (
                <>
                  <div className="absolute -top-24 right-1/4 h-80 w-80 rounded-full [background:radial-gradient(circle,rgba(37,99,235,0.18)_0%,transparent_70%)]" />
                  <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full [background:radial-gradient(circle,rgba(14,165,233,0.12)_0%,transparent_70%)]" />
                  <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full [background:radial-gradient(circle,rgba(79,70,229,0.12)_0%,transparent_70%)]" />
                </>
              ) : (
                <>
                  <div className="absolute -top-24 right-1/4 h-80 w-80 rounded-full [background:radial-gradient(circle,rgba(96,165,250,0.12)_0%,transparent_70%)]" />
                  <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full [background:radial-gradient(circle,rgba(125,211,252,0.15)_0%,transparent_70%)]" />
                  <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full [background:radial-gradient(circle,rgba(203,213,225,0.2)_0%,transparent_70%)]" />
                </>
              )}
            </div>


            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 md:px-12">
              <div className="mx-auto max-w-2xl">
                {/* Search Bar in Mobile/Tablet Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.04 }}
                  className="mb-6"
                >
                  <SearchBar
                    locale={locale}
                    isMobile
                    isDark={isDark}
                    onCloseMobile={() => setMobileOpen(false)}
                  />
                </motion.div>

                {/* Directory Header Bar */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.08 }}
                  className={`mb-3.5 flex items-center justify-between border-b pb-2.5 ${
                    isDark ? "border-white/10" : "border-[#0d1a46]/10"
                  }`}
                >
                  <span className={`font-mono text-[11px] font-bold uppercase tracking-[0.25em] ${
                    isDark ? "text-sky-300" : "text-[#0d1a46]"
                  }`}>
                    {locale === "mn" ? "Үндсэн цэс" : "Directory"}
                  </span>
                  <span className={`font-mono text-[10px] ${
                    isDark ? "text-white/40" : "text-slate-400"
                  }`}>
                    0{links.length} {locale === "mn" ? "Хэсэг" : "Items"}
                  </span>
                </motion.div>

                {/* Navigation Links — Words Pop Out with 3D Spring Physics */}
                <nav className="flex flex-col gap-3 [perspective:1000px]">
                  {links.map((link, index) => {
                    const linkIsHome = link.href === "/" || link.href === "";
                    const isActive = linkIsHome
                      ? pathname === "/" || pathname === ""
                      : pathname === link.href || pathname.startsWith(link.href + "/");
                    const num = String(index + 1).padStart(2, "0");

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, scale: 0.8, y: 35, rotateX: 18, filter: "blur(6px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.88, y: -16, filter: "blur(3px)" }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 22,
                          delay: 0.08 + index * 0.065,
                        }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className="transform-gpu"
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`group relative flex items-center justify-between overflow-hidden border p-4 sm:p-5 transition-all duration-300 [clip-path:polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)] ${
                            isActive
                              ? isDark
                                ? "border-sky-400/50 bg-gradient-to-r from-blue-900/40 via-sky-950/30 to-white/[0.04] shadow-[0_8px_32px_rgba(30,58,138,0.35)]"
                                : "border-[#0d1a46] bg-gradient-to-r from-blue-50/90 via-sky-50/40 to-white shadow-[0_8px_30px_rgba(13,26,70,0.1)]"
                              : isDark
                              ? "border-white/12 bg-white/[0.03] hover:border-white/35 hover:bg-white/[0.07]"
                              : "border-slate-200/90 bg-white hover:border-[#0d1a46]/30 hover:bg-slate-50/90 shadow-sm hover:shadow-md"
                          }`}
                        >
                          {/* Background Large Monospace Number Watermark */}
                          <span className={`pointer-events-none absolute right-16 sm:right-20 top-1/2 -translate-y-1/2 select-none font-mono text-5xl sm:text-6xl font-black group-hover:scale-110 transition-all duration-300 ${
                            isDark
                              ? "text-white/[0.03] group-hover:text-white/[0.07]"
                              : "text-[#0d1a46]/[0.05] group-hover:text-[#0d1a46]/[0.08]"
                          }`}>
                            {num}
                          </span>

                          {/* Active route glowing left accent border */}
                          {isActive && (
                            <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                              isDark
                                ? "bg-gradient-to-b from-sky-400 via-white to-blue-500 shadow-[0_0_16px_rgba(56,189,248,0.9)]"
                                : "bg-[#070e24] shadow-[0_0_12px_rgba(7,14,36,0.5)]"
                            }`} />
                          )}

                          {/* Corner chamfer accent */}
                          <div
                            className={`pointer-events-none absolute left-0 top-0 h-4 w-4 border-b border-r transition-colors [clip-path:polygon(0_0,100%_0,0_100%)] ${
                              isActive
                                ? isDark
                                  ? "border-sky-400 bg-sky-400"
                                  : "border-[#0d1a46] bg-[#070e24]"
                                : isDark
                                ? "border-white/20 bg-white/10 group-hover:bg-white/40"
                                : "border-slate-300 bg-slate-100 group-hover:bg-[#070e24]/15"
                            }`}
                          />

                          <div className="relative z-10 flex items-center gap-3.5 sm:gap-5 pl-2.5 sm:pl-3">
                            {/* Clean Index number */}
                            <span className={`font-mono text-sm sm:text-base font-bold tracking-widest transition-colors ${
                              isActive
                                ? isDark ? "text-sky-300 font-extrabold" : "text-[#0d1a46] font-extrabold"
                                : isDark ? "text-white/40 group-hover:text-white/70" : "text-slate-400 group-hover:text-[#070e24]"
                            }`}>
                              {num}
                            </span>

                            {/* Main Page Word (POPS OUT!) */}
                            <h3
                              className={`font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-1 ${
                                isDark
                                  ? isActive
                                    ? "text-white drop-shadow-[0_4px_20px_rgba(56,189,248,0.4)]"
                                    : "text-white/90 group-hover:text-white"
                                  : isActive
                                  ? "text-[#070e24] drop-shadow-[0_2px_12px_rgba(7,14,36,0.15)]"
                                  : "text-[#0d1a46] group-hover:text-black"
                              }`}
                            >
                              {link.label}
                            </h3>

                            {isActive && (
                              <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest ${
                                isDark
                                  ? "border-sky-400/30 bg-sky-400/10 text-sky-300"
                                  : "border-[#0d1a46]/20 bg-[#0d1a46]/10 text-[#070e24]"
                              }`}>
                                <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                                  isDark ? "bg-sky-400" : "bg-[#070e24]"
                                }`} />
                                ACTIVE
                              </span>
                            )}
                          </div>

                          {/* Arrow Action Badge */}
                          <div
                            className={`relative z-10 flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center border transition-all duration-300 [clip-path:polygon(8px_0,100%_0,100%_100%,0_100%,0_8px)] ${
                              isDark
                                ? isActive
                                  ? "border-sky-400 bg-sky-400 text-[#070e24] shadow-[0_0_20px_rgba(56,189,248,0.5)] scale-105"
                                  : "border-white/20 bg-white/5 text-white/70 group-hover:border-white group-hover:bg-white group-hover:text-[#070e24] group-hover:scale-105"
                                : isActive
                                ? "border-[#070e24] bg-[#070e24] text-white shadow-md scale-105"
                                : "border-slate-300 bg-slate-100 text-[#0d1a46] group-hover:border-[#070e24] group-hover:bg-[#070e24] group-hover:text-white group-hover:scale-105"
                            }`}
                          >
                            <ArrowUpRight
                              size={18}
                              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12"
                            />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Dedicated Mobile Language Switcher Segmented Control */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.35 }}
                  className="mt-6"
                >
                  <span className={`mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.25em] ${
                    isDark ? "text-white/70" : "text-slate-500"
                  }`}>
                    {locale === "mn" ? "Хэл сонгох" : "Language"}
                  </span>
                  <div className={`border p-1 backdrop-blur-sm ${
                    isDark ? "border-white/15 bg-white/[0.04]" : "border-slate-200 bg-white/80"
                  }`}>
                    <div className="grid grid-cols-2 gap-1">
                      {routing.locales.map((l) => {
                        const isActive = l === locale;
                        return (
                          <Link
                            key={l}
                            href={pathname}
                            locale={l}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                              isActive
                                ? isDark
                                  ? "bg-white text-[#070e24] shadow-sm font-extrabold"
                                  : "bg-[#070e24] text-white shadow-sm font-extrabold"
                                : isDark
                                ? "text-slate-300 hover:text-white hover:bg-white/10"
                                : "text-slate-600 hover:text-[#070e24] hover:bg-slate-100"
                            }`}
                          >
                            <Globe size={13} className={isActive ? (isDark ? "text-[#070e24]" : "text-white") : (isDark ? "text-white" : "text-slate-600")} />
                            <span>{l === "mn" ? "Монгол (MN)" : "English (EN)"}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Quick Contact & Consultation Request */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.42 }}
                  className="mt-7 space-y-3.5 pb-10"
                >
                  {/* Consultation Direct Button */}
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className={`group flex w-full items-center justify-between px-5 py-3.5 text-xs font-bold uppercase tracking-widest shadow-lg transition-all active:scale-[0.99] ${
                      isDark
                        ? "bg-white text-[#070e24] hover:bg-slate-100"
                        : "bg-[#070e24] text-white hover:bg-[#0d1a46]"
                    }`}
                  >
                    <span>{locale === "mn" ? "Зөвлөгөө авах хүсэлт" : "Request Consultation"}</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  {/* Direct Hotline Strip */}
                  <div className={`border p-3.5 backdrop-blur-sm ${
                    isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"
                  }`}>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
                      <a
                        href="tel:+97677710155"
                        className={`flex items-center gap-2.5 transition-colors ${
                          isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-[#070e24]"
                        }`}
                      >
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center border ${
                          isDark ? "border-white/15 bg-white/5 text-white" : "border-slate-300 bg-slate-100 text-[#070e24]"
                        }`}>
                          <Phone size={13} />
                        </div>
                        <span className="font-mono font-medium">+976 77710 155</span>
                      </a>

                      <a
                        href="mailto:info@artifybrand.com"
                        className={`flex items-center gap-2.5 transition-colors ${
                          isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-[#070e24]"
                        }`}
                      >
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center border ${
                          isDark ? "border-white/15 bg-white/5 text-white" : "border-slate-300 bg-slate-100 text-[#070e24]"
                        }`}>
                          <Mail size={13} />
                        </div>
                        <span className="truncate font-mono font-medium">info@artifybrand.com</span>
                      </a>
                    </div>

                    <div className={`mt-2.5 flex items-center gap-2 border-t pt-2 text-[11px] ${
                      isDark ? "border-white/5 text-slate-400" : "border-slate-100 text-slate-500"
                    }`}>
                      <Clock size={12} className={isDark ? "text-white/70" : "text-[#070e24]/70"} />
                      <span>{locale === "mn" ? "Даваа – Баасан: 09:00 – 18:00 (GMT+8)" : "Mon – Fri: 09:00 – 18:00 (GMT+8)"}</span>
                    </div>
                  </div>

                  {/* Brand Footnote */}
                  <div className={`flex items-center justify-between text-[10px] font-mono pt-2 ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}>
                    <span>ARTIFY BRAND © 2026</span>
                    <span>CRAFTING QUALITY OF LIFE</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
