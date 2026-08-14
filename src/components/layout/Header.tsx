"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Search, Globe, Sun, Moon } from "lucide-react";
import { Link } from "@/i18n/routing";
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
      <div className="mx-3 flex h-16 items-center justify-between rounded-2xl border border-border bg-card px-4 shadow-sm lg:mx-6 lg:h-20 lg:rounded-3xl lg:px-6">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          href="/"
          className="flex items-center justify-start"
        >
          <img
            src="/images/artify.logo.png"
            alt="Artify"
            className="h-10 w-auto lg:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 lg:gap-2">
          <div
            className={`flex items-center overflow-hidden rounded-full border border-border bg-background transition-all duration-300 ${
              searchOpen ? "w-48 px-2" : "w-10"
            }`}
          >
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
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
        </div>
      </div>

      {mobileOpen && (
        <div className="mx-3 mt-2 rounded-2xl border border-border bg-card p-4 shadow-sm lg:hidden">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-secondary"
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
