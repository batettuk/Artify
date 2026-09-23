import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import type { ContactInfoDto, MenuItemDto } from "@/api/cms/types/public";

interface FooterProps {
  locale: string;
  navItems?: MenuItemDto[];
  contactInfo: ContactInfoDto;
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function Footer({ locale, navItems, contactInfo }: FooterProps) {
  const companyLinks = [
    { href: "/", label: locale === "mn" ? "Нүүр" : "Home" },
    { href: "/#about", label: locale === "mn" ? "Бидний тухай" : "About Us" },
    { href: "/products", label: locale === "mn" ? "Бүтээгдэхүүн" : "Products" },
    { href: "/blog", label: locale === "mn" ? "Мэдээ, нийтлэл" : "Blog & News" },
    { href: "/contact", label: locale === "mn" ? "Холбоо барих" : "Contact" },
  ];

  const productLinks = [
    {
      href: "/products/consulting",
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
      href: "https://www.facebook.com/profile.php?id=61583605854922",
      label: locale === "mn" ? "Мастеркласс (Block Academy)" : "Masterclass (Block Academy)",
      external: true,
    },
  ];

  const facebookUrl = contactInfo.facebook || "https://www.facebook.com/artify.mn";
  const instagramUrl = contactInfo.instagram || "https://www.instagram.com/artify.mn";
  const rawPhone = contactInfo.phone || "+976 77710 155";
  const phone = rawPhone.includes("7770155") || rawPhone.includes("7770255") || (rawPhone.includes("7710") && !rawPhone.includes("77710")) ? "+976 77710 155" : rawPhone;
  const email = contactInfo.email || "info@artifybrand.com";
  const address =
    locale === "en"
      ? (contactInfo.address && !/[а-яА-ЯөӨүҮ]/.test(contactInfo.address) ? contactInfo.address : "Ulaanbaatar, Mongolia")
      : (contactInfo.address || "Улаанбаатар хот, Монгол улс");
  const hours =
    locale === "en"
      ? (contactInfo.hours && !/[а-яА-ЯөӨүҮ]/.test(contactInfo.hours) ? contactInfo.hours : "Mon – Fri: 09:00 – 18:00 (GMT+8)")
      : (contactInfo.hours || "Даваа – Баасан: 09:00 – 18:00 (GMT+8)");

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
                ? "Инженерийн нарийн тооцоолол, ухаалаг агааржуулалт, захиалгат ховор материалын цогц шийдлээр амьдралын чанарыг урлана."
                : "Crafting the quality of life through precise engineering, intelligent ventilation, and bespoke rare architectural materials."}
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
            <div className="mt-2 h-0.5 w-8 bg-white/80" />
            <ul className="mt-6 space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/90 transition-colors hover:text-white hover:underline"
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
            <div className="mt-2 h-0.5 w-8 bg-white/80" />
            <ul className="mt-6 space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                      <ArrowUpRight size={14} className="opacity-80" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white/90 transition-colors hover:text-white hover:underline"
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
            <div className="mt-2 h-0.5 w-8 bg-white/80" />
            <ul className="mt-6 space-y-4 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-white/80" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-white/80" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-white hover:underline">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-white/80" />
                <a href={`mailto:${email}`} className="transition-colors hover:text-white hover:underline">
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

          <p className="font-semibold tracking-wide text-white/90">crafting the quality of life</p>
        </div>
      </div>
    </footer>
  );
}
