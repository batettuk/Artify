"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Search } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { routing } from "@/i18n/routing";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="fixed top-0 left-1/2 z-50 w-full max-w-[1920px] -translate-x-1/2 bg-background/95 backdrop-blur">
      <div className="relative mx-3 flex h-16 items-center justify-between border border-border bg-card px-4 shadow-sm lg:mx-6 lg:h-20 lg:px-6">
        <Link
          href="/"
          className="flex items-center justify-start"
        >
          <Image
            src="/images/artify-logo-black.png"
            alt="Artify"
            width={4351}
            height={472}
            priority
            className="h-6 w-auto lg:h-8"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 lg:gap-2">
          <div
            className={`flex items-center overflow-hidden border border-border bg-background transition-all duration-300 ${
              searchOpen ? "w-48 px-2" : "w-10"
            }`}
          >
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground hover:bg-secondary"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <input
              type="text"
              placeholder={locale === "mn" ? "Хайх" : "Search"}
              className={`h-8 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground ${
                searchOpen ? "opacity-100" : "w-0 opacity-0"
              }`}
            />
          </div>

          <div className="hidden lg:block">
            <LanguageSwitcher locales={[...routing.locales]} />
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mx-3 mt-2 border border-border bg-card p-4 shadow-sm lg:hidden">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-base font-medium text-foreground hover:bg-secondary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-border pt-4">
            <LanguageSwitcher locales={[...routing.locales]} />
          </div>
        </div>
      )}
    </header>
  );
}
