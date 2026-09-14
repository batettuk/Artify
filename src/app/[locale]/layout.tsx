import type { Metadata } from "next";
import { Montserrat, Nunito_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import ApolloClientProvider from "@/lib/apollo/provider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getMenu } from "@/api/cms/server/queries/get-menu";
import { getContactInfo } from "@/api/cms/server/queries/get-contact-info";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";
import "../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://artify.vercel.app"),
  title: "Artify | Барилгын шийдлүүд",
  description: "Artify — инновац, чанар, тогтвортой барилгын бүтээн байгуулалт.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [messages, headerMenu, footerMenu, contactInfo] = await Promise.all([
    getMessages(),
    getMenu({ kind: "header", language: locale }),
    getMenu({ kind: "footer", language: locale }),
    getContactInfo(locale),
  ]);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${montserrat.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider messages={messages}>
            <ApolloClientProvider>
              <Header locale={locale} navItems={headerMenu} />
              <main className="flex-1">{children}</main>
              <Footer locale={locale} navItems={footerMenu} contactInfo={contactInfo} />
            </ApolloClientProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
