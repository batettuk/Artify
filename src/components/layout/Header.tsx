"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { routing } from "@/i18n/routing";
import type { MenuItemDto } from "@/api/cms/types/public";

interface HeaderProps {
  locale: string;
  navItems: MenuItemDto[];
}

export default function Header({ locale, navItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = navItems.map((item) => ({ href: item.url, label: item.label }));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out ${
        scrolled
          ? "border-b border-[#0d1a46]/10 bg-white/90 py-3 shadow-[0_4px_30px_rgba(13,26,70,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl backdrop-saturate-[180%] lg:py-3.5"
          : "border-b border-transparent bg-transparent py-5 shadow-none lg:py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-12">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`flex h-[42px] items-center overflow-hidden border backdrop-blur-md transition-all duration-300 ${
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

          <div className="hidden lg:block">
            <LanguageSwitcher locales={[...routing.locales]} scrolled={scrolled} />
          </div>

          <button
            className={`flex h-[42px] w-[42px] items-center justify-center border backdrop-blur-md lg:hidden transition-colors ${
              scrolled
                ? "border-[#0d1a46]/20 bg-white/50 text-[#0d1a46] hover:bg-[#0d1a46]/10"
                : "border-white/30 bg-black/25 text-white hover:bg-white/15"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mx-4 mt-3 border border-[#0d1a46]/15 bg-white/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-lg font-semibold text-[#0d1a46] transition-colors hover:bg-[#0d1a46]/10"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-[#0d1a46]/10 pt-4">
            <LanguageSwitcher locales={[...routing.locales]} scrolled={true} />
          </div>
        </div>
      )}
    </header>
  );
}


