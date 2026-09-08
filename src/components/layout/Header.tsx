"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search, ArrowUpRight, Phone, Mail, Clock, MapPin } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import Image from "@/components/common/Image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { routing } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItemDto } from "@/api/cms/types/public";

interface HeaderProps {
  locale: string;
  navItems: MenuItemDto[];
}

export default function Header({ locale, navItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection for sticky header transition
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

  const links = navItems.map((item) => ({ href: item.url, label: item.label }));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-out ${
          scrolled
            ? "border-b border-[#0d1a46]/10 bg-white/90 py-3 shadow-[0_4px_30px_rgba(13,26,70,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl backdrop-saturate-[180%] lg:py-3.5"
            : "border-b border-transparent bg-transparent py-5 shadow-none lg:py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-start">
            <Image
              src={scrolled ? "/images/artify-logo-navy.png" : "/images/artify-logo-white.png"}
              alt="Artify"
              width={4351}
              height={472}
              priority
              className="h-8 w-auto transition-transform hover:opacity-90 lg:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1.5 lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex h-[42px] items-center px-5 text-base font-semibold tracking-tight transition-all lg:text-[17px] ${
                  scrolled
                    ? "text-[#0d1a46] hover:bg-[#0d1a46]/10 hover:text-[#0d1a46]"
                    : "text-white hover:bg-white/15 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search */}
            <div
              className={`hidden md:flex h-[42px] items-center overflow-hidden border backdrop-blur-md transition-all duration-300 ${
                scrolled
                  ? "border-[#0d1a46]/20 bg-white/50 shadow-[0_4px_24px_0_rgba(13,26,70,0.08),inset_0_1px_2px_0_rgba(255,255,255,0.7)]"
                  : "border-white/30 bg-black/25 shadow-none"
              } ${searchOpen ? "w-56 px-2" : "w-[42px]"}`}
            >
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center transition-colors ${
                  scrolled ? "text-[#0d1a46] hover:text-[#0d1a46]/80" : "text-white hover:text-white/80"
                }`}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <input
                type="text"
                placeholder={locale === "mn" ? "Хайх..." : "Search..."}
                className={`h-full w-full bg-transparent px-1 text-sm font-medium outline-none transition-colors ${
                  scrolled
                    ? "text-[#0d1a46] placeholder:text-[#0d1a46]/60"
                    : "text-white placeholder:text-white/70"
                } ${searchOpen ? "opacity-100" : "w-0 opacity-0"}`}
              />
            </div>

            {/* Desktop Language Switcher */}
            <div className="hidden lg:block">
              <LanguageSwitcher locales={[...routing.locales]} scrolled={scrolled} />
            </div>

            {/* Mobile Hamburger Trigger */}
            <button
              className={`flex h-10 w-10 items-center justify-center border backdrop-blur-md transition-all lg:hidden ${
                scrolled
                  ? "border-[#0d1a46]/20 bg-white/80 text-[#0d1a46] hover:bg-[#0d1a46]/10 active:scale-95"
                  : "border-white/30 bg-black/35 text-white hover:bg-white/20 active:scale-95"
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Fullscreen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#070e24] text-white lg:hidden"
          >
            {/* Background Ambient Glow & Architectural Grid */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1b3175_0%,transparent_60%)] opacity-40" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#0d1a46_0%,transparent_50%)] opacity-30" />

            {/* Top Navigation Bar inside Drawer */}
            <div className="relative z-10 flex h-20 items-center justify-between border-b border-white/10 px-5 sm:px-7">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Image
                  src="/images/artify-logo-white.png"
                  alt="Artify Brand"
                  width={200}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
              </Link>

              <div className="flex items-center gap-2">
                <LanguageSwitcher locales={[...routing.locales]} scrolled={false} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15 active:scale-95"
                  aria-label="Close mobile menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Content Container */}
            <div className="relative z-10 flex flex-1 flex-col justify-between overflow-y-auto px-5 py-6 sm:px-7 sm:py-8">
              {/* Main Navigation Links */}
              <div>
                <span className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-sky-400/80">
                  {locale === "mn" ? "Үндсэн цэс" : "Navigation"}
                </span>

                <nav className="flex flex-col divide-y divide-white/10 border-y border-white/10">
                  {links.map((link, index) => {
                    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                    const num = String(index + 1).padStart(2, "0");

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * (index + 1), duration: 0.25 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`group flex items-center justify-between py-4 transition-all ${
                            isActive ? "text-sky-300" : "text-white hover:text-sky-200"
                          }`}
                        >
                          <div className="flex items-baseline gap-3">
                            <span className="font-mono text-xs font-bold text-sky-400/60">
                              {num}
                            </span>
                            <span className="font-display text-2xl font-bold tracking-tight uppercase sm:text-3xl">
                              {link.label}
                            </span>
                          </div>

                          <div
                            className={`flex h-8 w-8 items-center justify-center border transition-all ${
                              isActive
                                ? "border-sky-400 bg-sky-400 text-[#070e24]"
                                : "border-white/20 bg-white/5 text-white group-hover:border-sky-400 group-hover:bg-sky-400/20 group-hover:text-sky-300"
                            }`}
                          >
                            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Contact & Consultation Request */}
              <div className="mt-8 space-y-5">
                {/* Consultation Direct Button */}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-between bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-[#070e24] shadow-lg transition-transform hover:bg-sky-50 active:scale-[0.99]"
                >
                  <span>{locale === "mn" ? "Зөвлөгөө авах хүсэлт" : "Request Consultation"}</span>
                  <ArrowUpRight size={16} />
                </Link>

                {/* Direct Hotline Strip */}
                <div className="border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                    <a
                      href="tel:+97677710155"
                      className="flex items-center gap-2.5 text-slate-300 transition-colors hover:text-white"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/15 bg-white/5 text-sky-300">
                        <Phone size={13} />
                      </div>
                      <span className="font-mono font-medium">+976 7771 0155</span>
                    </a>

                    <a
                      href="mailto:info@artifybrand.com"
                      className="flex items-center gap-2.5 text-slate-300 transition-colors hover:text-white"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/15 bg-white/5 text-sky-300">
                        <Mail size={13} />
                      </div>
                      <span className="truncate font-mono font-medium">info@artifybrand.com</span>
                    </a>
                  </div>

                  <div className="mt-3 flex items-center gap-2 border-t border-white/5 pt-2.5 text-[11px] text-slate-400">
                    <Clock size={12} className="text-sky-400/80" />
                    <span>{locale === "mn" ? "Даваа – Баасан: 09:00 – 18:00 (GMT+8)" : "Mon – Fri: 09:00 – 18:00 (GMT+8)"}</span>
                  </div>
                </div>

                {/* Brand Footnote */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>ARTIFY BRAND © 2026</span>
                  <span>CRAFTING QUALITY OF LIFE</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
