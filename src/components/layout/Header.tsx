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

  // Scroll detection: transparent at top over dark hero banners, solid frosted-glass when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
  // In light mode -> white logo on top of dark hero banner (!scrolled), navy logo when scrolled down onto light page.
  const logoSrc = isDark || !scrolled
    ? "/images/artify-logo-white.png"
    : "/images/artify-logo-navy.png";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 ease-out ${
          scrolled
            ? isDark
              ? "border-b border-white/10 bg-[#070e24]/95 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-[180%] lg:py-3"
              : "border-b border-[#0d1a46]/10 bg-white/95 py-2.5 shadow-[0_4px_30px_rgba(13,26,70,0.08)] backdrop-blur-xl backdrop-saturate-[180%] lg:py-3"
            : "border-b border-transparent bg-transparent py-3.5 shadow-none lg:py-5"
        }`}
      >
        <div className="relative mx-auto flex max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center justify-start shrink-0">
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

          {/* Actions: Search, Theme Toggle, Language, Hamburger Trigger */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            {/* Real-time Interactive Search Bar (Desktop >= 1280px) */}
            <div data-desktop-search className="max-xl:!hidden xl:!block">
              <SearchBar locale={locale} isDark={isDark || !scrolled} scrolled={scrolled} />
            </div>

            {/* Dark Mode Theme Toggle */}
            <ThemeToggle scrolled={scrolled} />

            {/* Desktop Language Switcher (Desktop >= 1280px) */}
            <div data-desktop-lang className="max-xl:!hidden xl:!block">
              <LanguageSwitcher locales={[...routing.locales]} scrolled={scrolled} id="desktop" />
            </div>

            {/* Collapsible Hamburger Trigger (iPads, Tablets & Mobile < 1280px) */}
            <button
              className={`flex h-10 w-10 items-center justify-center border backdrop-blur-md transition-all xl:!hidden ${
                isDark || !scrolled
                  ? "border-white/20 bg-white/10 text-white hover:bg-white/20 active:scale-95"
                  : "border-[#0d1a46]/20 bg-white/80 text-[#0d1a46] hover:bg-[#0d1a46]/10 active:scale-95"
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Collapsible Drawer (iPads, Tablets & Mobile < 1280px) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#070e24] text-white xl:!hidden"
          >
            {/* Top Navigation Bar inside Drawer */}
            <div className="relative z-10 flex h-20 items-center justify-between border-b border-white/10 px-5 sm:px-7 md:px-12">
              <div className="mx-auto flex w-full max-w-2xl items-center justify-between">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                  <NextImage
                    src="/images/artify-logo-white.png"
                    alt="Artify Brand"
                    width={4351}
                    height={472}
                    unoptimized
                    className="h-7 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
                  aria-label="Close mobile menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Mobile/Tablet Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7 md:px-12">
              <div className="mx-auto max-w-2xl">
                {/* Search Bar in Mobile/Tablet Menu */}
                <div className="mb-6">
                  <SearchBar
                    locale={locale}
                    isMobile
                    isDark
                    onCloseMobile={() => setMobileOpen(false)}
                  />
                </div>

                {/* Navigation Links */}
                <div>
                  <span className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                    {locale === "mn" ? "Үндсэн цэс" : "Navigation"}
                  </span>

                <nav className="flex flex-col divide-y divide-white/10 border-y border-white/10">
                  {links.map((link, index) => {
                    const linkIsHome = link.href === "/" || link.href === "";
                    const isActive = linkIsHome
                      ? pathname === "/" || pathname === ""
                      : pathname === link.href || pathname.startsWith(link.href + "/");
                    const num = String(index + 1).padStart(2, "0");

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * (index + 1), duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`group flex items-center justify-between py-3.5 transition-all ${
                            isActive ? "text-white font-extrabold" : "text-white/85 hover:text-white font-medium"
                          }`}
                        >
                          <div className="flex items-baseline gap-3">
                            <span className="font-mono text-xs font-bold text-white/60">
                              {num}
                            </span>
                            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight uppercase">
                              {link.label}
                            </span>
                          </div>

                          <div
                            className={`flex h-8 w-8 items-center justify-center border transition-all ${
                              isActive
                                ? "border-white bg-white text-[#070e24]"
                                : "border-white/20 bg-white/5 text-white group-hover:border-white group-hover:bg-white/20"
                            }`}
                          >
                            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Dedicated Mobile Language Switcher Segmented Control */}
                <div className="mt-6">
                  <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                    {locale === "mn" ? "Хэл сонгох" : "Language"}
                  </span>
                  <div className="border border-white/15 bg-white/[0.04] p-1 backdrop-blur-sm">
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
                                ? "bg-white text-[#070e24] shadow-sm font-extrabold"
                                : "text-slate-300 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <Globe size={13} className={isActive ? "text-[#070e24]" : "text-white"} />
                            <span>{l === "mn" ? "Монгол (MN)" : "English (EN)"}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact & Consultation Request */}
              <div className="mt-8 space-y-4">
                {/* Consultation Direct Button */}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-between bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-[#070e24] shadow-lg transition-transform hover:bg-slate-100 active:scale-[0.99]"
                >
                  <span>{locale === "mn" ? "Зөвлөгөө авах хүсэлт" : "Request Consultation"}</span>
                  <ArrowUpRight size={16} />
                </Link>

                {/* Direct Hotline Strip */}
                <div className="border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-sm">
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
                    <a
                      href="tel:+97677710155"
                      className="flex items-center gap-2.5 text-slate-300 transition-colors hover:text-white"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/15 bg-white/5 text-white">
                        <Phone size={13} />
                      </div>
                      <span className="font-mono font-medium">+976 77710 155</span>
                    </a>

                    <a
                      href="mailto:info@artifybrand.com"
                      className="flex items-center gap-2.5 text-slate-300 transition-colors hover:text-white"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/15 bg-white/5 text-white">
                        <Mail size={13} />
                      </div>
                      <span className="truncate font-mono font-medium">info@artifybrand.com</span>
                    </a>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2 border-t border-white/5 pt-2 text-[11px] text-slate-400">
                    <Clock size={12} className="text-white/70" />
                    <span>{locale === "mn" ? "Даваа – Баасан: 09:00 – 18:00 (GMT+8)" : "Mon – Fri: 09:00 – 18:00 (GMT+8)"}</span>
                  </div>
                </div>

                {/* Brand Footnote */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>ARTIFY BRAND © 2026</span>
                  <span>CRAFTING QUALITY OF LIFE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
