import type { Metadata } from "next";
import { Montserrat, Nunito_Sans, Caveat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import ApolloClientProvider from "@/lib/apollo/provider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getMenu } from "@/api/cms/server/queries/get-menu";
import { getContactInfo } from "@/api/cms/server/queries/get-contact-info";
import { getProducts } from "@/api/cms/server/queries/get-products";
import { getPostBySlug } from "@/api/cms/server/queries/get-post-by-slug";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";
import "../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
});


const caveat = Caveat({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const brandPost = await getPostBySlug({ slug: "brand-info", language: locale }).catch(() => null);
  const title = brandPost?.title || "Artify Brand";
  const description = brandPost?.excerpt || "";
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://artifybrand.com"),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
  };
}


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [messages, headerMenu, footerMenu, contactInfo, products] = await Promise.all([
    getMessages(),
    getMenu({ kind: "header", language: locale }),
    getMenu({ kind: "footer", language: locale }),
    getContactInfo(locale),
    getProducts(locale),
  ]);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${montserrat.variable} ${nunito.variable} ${caveat.variable} h-full antialiased`}
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
              <Footer
                locale={locale}
                navItems={footerMenu}
                contactInfo={contactInfo}
                products={products}
              />
            </ApolloClientProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
