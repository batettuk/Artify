"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Phone, Mail, MapPin } from "lucide-react";
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

export default function Footer({ locale, navItems, contactInfo }: FooterProps) {
  const t = useTranslations("footer");

  const companyLinks = navItems.map((item) => ({
    href: item.url,
    label: item.label,
    external: item.external,
  }));

  const productLinks = [
    { href: "/products/block-academy", label: t("training"), external: false },
    {
      href: "https://www.techinvent.mn/en",
      label: t("cleanAir"),
      external: true,
    },
    {
      href: "/products/custom-materials",
      label: t("customFabrication"),
      external: false,
    },
  ];

  return (
    <footer className="mx-3 mt-10 pb-6 lg:mx-6">
      <div className="overflow-hidden bg-gradient-to-r from-primary to-accent px-6 py-10 text-white lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/images/artify-logo-white.png"
                  alt="Artify"
                  width={4351}
                  height={472}
                  className="h-8 w-auto lg:h-10"
                />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
                {t("tagline")}
              </p>
              {(contactInfo.facebook || contactInfo.instagram) && (
                <div className="mt-6 flex items-center gap-3">
                  {contactInfo.facebook && (
                    <a
                      href={contactInfo.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex h-10 w-10 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <FacebookIcon size={18} />
                    </a>
                  )}
                  {contactInfo.instagram && (
                    <a
                      href={contactInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex h-10 w-10 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <InstagramIcon size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {t("company")}
              </h4>
              <ul className="mt-5 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {t("contact")}
              </h4>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-2 text-sm text-white/80">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  {contactInfo.address}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/80">
                  <Phone size={16} className="shrink-0" />
                  {contactInfo.phone}
                </li>
                <li className="flex items-center gap-2 text-sm text-white/80">
                  <Mail size={16} className="shrink-0" />
                  {contactInfo.email}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {locale === "mn" ? "Бүтээгдэхүүн" : "Products"}
              </h4>
              <ul className="mt-5 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 text-sm text-white/70 lg:flex-row">
            <p>{t("rights")}</p>
            <p>{t("copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
