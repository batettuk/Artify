"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import Image from "@/components/common/Image";
import type { ContactInfoDto, MenuItemDto } from "@/api/cms/types/public";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface FooterProps {
  locale: string;
  navItems: MenuItemDto[];
  contactInfo: ContactInfoDto;
}

export default function Footer({ locale, contactInfo }: FooterProps) {
  const t = useTranslations("footer");

  const companyLinks = [
    { href: "/", label: locale === "mn" ? "Нүүр" : "Home" },
    { href: "/#about", label: locale === "mn" ? "Бидний тухай" : "About Us" },
    { href: "/products", label: locale === "mn" ? "Бүтээгдэхүүн" : "Products" },
    { href: "/blog", label: locale === "mn" ? "Мэдээ, нийтлэл" : "Blog & News" },
    { href: "/contact", label: locale === "mn" ? "Холбоо барих" : "Contact" },
  ];

  const productLinks = [
    {
      href: "/products",
      label: locale === "mn" ? "Зөвлөх үйлчилгээ" : "Consulting Services",
      external: false,
    },
    {
      href: "/products/custom-materials",
      label: locale === "mn" ? "Онцгой хийцлэлтэй бүтээгдэхүүн" : "Custom Fabrication",
      external: false,
    },
    {
      href: "https://www.techinvent.mn/en",
      label: locale === "mn" ? "Эрүүл агаар (Zehnder)" : "Clean Air Solutions (Zehnder)",
      external: true,
    },
    {
      href: "https://www.facebook.com/artify.mn",
      label: locale === "mn" ? "Мастеркласс (Block Academy)" : "Masterclass (Block Academy)",
      external: true,
    },
  ];

  const facebookUrl = contactInfo.facebook || "https://www.facebook.com/artify.mn";
  const instagramUrl = contactInfo.instagram || "https://www.instagram.com/artify.mn";
  const phone = contactInfo.phone || "77710155";
  const email = contactInfo.email || "info@artifybrand.com";
  const address = contactInfo.address || (locale === "mn" ? "Улаанбаатар хот, Монгол" : "Ulaanbaatar, Mongolia");

  return (
    <footer className="w-full border-t border-[#0d1a46]/30 bg-[#070e24] text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.2fr] lg:gap-16">
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src="/images/artify-logo-white.png"
                alt="Artify"
                width={4351}
                height={472}
                className="h-8 w-auto lg:h-10"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300 sm:text-base">
              {locale === "mn"
                ? "Амьдралын чанарыг урлана. Барилгын төсөл бүрийн хэрэглэгчийн тав тухыг урлагийн түвшинд хөгжүүлнэ."
                : "Crafting Quality of Life. Elevating human comfort and construction to the level of art."}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/10 text-white shadow-sm transition-all hover:bg-white hover:text-[#0d1a46] hover:border-white"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/10 text-white shadow-sm transition-all hover:bg-white hover:text-[#0d1a46] hover:border-white"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-white">
              {locale === "mn" ? "Цэс" : "Navigation"}
            </h4>
            <div className="mt-2 h-0.5 w-8 bg-sky-400" />
            <ul className="mt-6 space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/90 transition-colors hover:text-sky-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-white">
              {locale === "mn" ? "Бүтээгдэхүүн" : "Products"}
            </h4>
            <div className="mt-2 h-0.5 w-8 bg-sky-400" />
            <ul className="mt-6 space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 transition-colors hover:text-sky-300"
                    >
                      {link.label}
                      <ArrowUpRight size={14} className="opacity-80" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white/90 transition-colors hover:text-sky-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-white">
              {locale === "mn" ? "Холбоо барих" : "Contact"}
            </h4>
            <div className="mt-2 h-0.5 w-8 bg-sky-400" />
            <ul className="mt-6 space-y-4 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-sky-400" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-sky-400" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-sky-300">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-sky-400" />
                <a href={`mailto:${email}`} className="transition-colors hover:text-sky-300">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Powered by bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-xs font-medium text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} Artify Brand. {locale === "mn" ? "Бүх эрх хуулиар хамгаалагдсан." : "All rights reserved."}</p>
          
          <a
            href="https://erxes.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
          >
            <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase group-hover:text-slate-200">
              Powered by
            </span>
            <Image
              src="/images/erxes-white.png"
              alt="erxes"
              width={160}
              height={40}
              className="h-4 w-auto opacity-80 transition-all group-hover:opacity-100 group-hover:scale-105"
            />
          </a>

          <p className="font-semibold tracking-wide text-white/90">{locale === "mn" ? "Амьдралын чанарыг урлана" : "Crafting Quality of Life"}</p>
        </div>
      </div>
    </footer>
  );
}
