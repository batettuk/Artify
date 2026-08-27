"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  en: "EN",
  mn: "МН",
};

export function LanguageSwitcher({ locales }: { locales: string[] }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center rounded-none border border-border bg-background p-1">
      {locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={
            l === locale
              ? "rounded-none bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
              : "rounded-none px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          }
        >
          {LABELS[l] ?? l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
