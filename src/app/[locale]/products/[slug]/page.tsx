import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProductDetail } from "@/api/cms/server/queries/get-product-detail";
import { getProducts } from "@/api/cms/server/queries/get-products";
import { CmsContent } from "@/components/common/CmsContent";
import { FadeIn } from "@/components/motion/FadeIn";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowUpRight, Download, FileText, ExternalLink, Mail, CheckCircle2 } from "lucide-react";
import Image from "@/components/common/Image";
import { ScrollDownCue } from "@/components/common/ScrollDownCue";
import { ScrollToButton } from "@/components/common/ScrollToButton";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductDetail({ slug, language: locale });
  if (!product) return {};

  return {
    title: `${product.title} | Artify`,
    description: product.excerpt ?? undefined,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  const [product, allProducts] = await Promise.all([
    getProductDetail({ slug, language: locale }),
    getProducts(locale),
  ]);

  if (!product) {
    notFound();
  }

  const otherProducts = allProducts.filter((p) => p.slug !== slug);
  const isEn = locale === "en";

  // Product-specific metadata & catalog configs
  const isCleanAir = slug === "tech-invent";
  const isMasterclass = slug === "blok-akademi";

  // Catalog items for Clean Air (Zehnder) — Exactly matching user's uploaded files
  const cleanAirCatalogs = [
    {
      id: "radiator",
      title: "Zehnder радиатор, алчуур хатаагч",
      description: isEn
        ? "Official Zehnder designer radiator & bathroom towel warmer technical specifications."
        : "Германы Zehnder брэндийн дизайнер радиатор, алчуур хатаагчийн албан ёсны техникийн каталоги.",
      fileUrl: "/catalogs/zehnder-radiator-towel-dryer.pdf",
      fileName: "Zehnder радиатор, алчуур хатаагч.pdf",
      size: "13.8 MB",
    },
    {
      id: "erv-system",
      title: "ERV системийн ач холбогдол ба хэрэглээ  TechInvent",
      description: isEn
        ? "Comprehensive technical guide and health advantages of Energy Recovery Ventilation (ERV) systems."
        : "Дулаан ба чийг сэргээгчтэй ухаалаг ERV агааржуулалтын систем, барилгын төсөлд үзүүлэх давуу тал.",
      fileUrl: "/catalogs/erv-system-significance-techinvent.pdf",
      fileName: "ERV системийн ач холбогдол ба хэрэглээ  TechInvent.pdf",
      size: "7.5 MB",
    },
    {
      id: "comfoschool",
      title: "Comfoscholl catalog 20251104-x (Монгол)",
      description: isEn
        ? "Smart fresh air ventilation systems specifically engineered for schools and modern facilities."
        : "Сургууль, цэцэрлэг болон олон нийтийн барилгад зориулсан эрүүл, цэвэр агаар сэлгэлтийн систем.",
      fileUrl: "/catalogs/comfoschool-catalog-mn.pdf",
      fileName: "Comfoscholl catalog 20251104-x (Монгол).pdf",
      size: "1.1 MB",
    },
    {
      id: "caw300",
      title: "CAW300 User Manual MN",
      description: isEn
        ? "Operation, technical specifications, and maintenance guide for Zehnder CAW300 fresh air units."
        : "Zehnder CAW300 төхөөрөмжийн ашиглалт, тохиргоо, суурилуулалтын албан ёсны гарын авлага.",
      fileUrl: "/catalogs/caw300-user-manual-mn.pdf",
      fileName: "CAW300 User Manual MN.pdf",
      size: "955 KB",
    },
  ];

  return (
    <article className="min-h-screen bg-background text-foreground">
      {/* Full-bleed Edge-to-Edge Clean Hero Banner */}
      <section className="relative flex min-h-[500px] w-full flex-col justify-center overflow-hidden bg-[#070e24] pt-28 pb-24 sm:min-h-[480px] sm:pt-36 sm:pb-36">
        <div className="absolute inset-0">
          {product.thumbnailUrl && (
            <Image
              src={product.thumbnailUrl}
              alt={product.title}
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-[center_35%] opacity-35"
            />
          )}
          {/* Smooth cinematic gradient overlay for perfect readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-[#070e24]/75 to-[#070e24]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white lg:px-12">
          <FadeIn>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 transition-colors hover:text-white mb-6"
            >
              <ArrowLeft size={14} />
              {t("backToProducts")}
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            {(isCleanAir || isMasterclass) && (
              <div className="flex justify-center mb-4">
                <span className="inline-block border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  {isCleanAir ? "Zehnder Group Partner" : "Block Academy"}
                </span>
              </div>
            )}
            <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {product.title}
            </h1>
          </FadeIn>

          {product.excerpt && (
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white drop-shadow-sm lg:text-lg">
                {product.excerpt}
              </p>
            </FadeIn>
          )}

          {isCleanAir && (
            <FadeIn delay={0.25} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ScrollToButton
                targetId="catalogs"
                className="inline-flex items-center gap-2 rounded-none bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#070e24] shadow-lg transition-all hover:bg-slate-200 active:scale-[0.99]"
              >
                <Download size={15} />
                <span>{isEn ? "Download Catalogs" : "Каталог татах"}</span>
              </ScrollToButton>
              <a
                href="https://www.techinvent.mn/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-none border border-white/30 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <span>{isEn ? "Zehnder Portal" : "Zehnder хуудас үзэх"}</span>
                <ExternalLink size={14} />
              </a>
            </FadeIn>
          )}
        </div>

        {/* Down Scrolling Animation Indicator for Clean Air */}
        {isCleanAir && (
          <ScrollDownCue
            targetId="catalogs"
            label={isEn ? "Scroll Down" : "Доош гүйлгэх"}
          />
        )}
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main Description Column */}
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-headings:text-[#0d1a46] dark:prose-headings:!text-white prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:!text-white prose-strong:text-[#0d1a46] dark:prose-strong:!text-white prose-li:text-slate-600 dark:prose-li:!text-white">
                <CmsContent html={product.content} />
              </div>
            </FadeIn>

            {/* Clean Air Catalog Download Section */}
            {isCleanAir && (
              <div id="catalogs" className="scroll-mt-24">
                <FadeIn delay={0.2} className="mt-16 border-t border-slate-200 pt-12 dark:border-white/10">
                <div className="mb-8">
                  <span className="inline-block border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0d1a46] mb-2.5 dark:border-white/20 dark:bg-white/10 dark:text-white">
                    Zehnder Documentation
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#0d1a46] dark:text-white">
                    {isEn ? "Product Catalogs & Technical Documentation" : "Бүтээгдэхүүний каталог татах"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:!text-white max-w-2xl">
                    {isEn
                      ? "Download comprehensive engineering brochures, technical specifications, and system manuals for Zehnder clean air and climate solutions."
                      : "Германы Zehnder брэндийн эрүүл агаар сэлгэлт, ухаалаг халаалт, радиаторын албан ёсны каталоги болон техникийн танилцуулгыг татаж авна уу."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {cleanAirCatalogs.map((catalog) => (
                    <div
                      key={catalog.id}
                      className="group relative flex flex-col justify-between border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-[#0d1a46] hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-[#0b132b] dark:hover:border-white/30 dark:hover:bg-[#0e1938]"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex h-9 w-9 items-center justify-center bg-[#0d1a46] text-white dark:bg-white dark:text-[#070e24]">
                            <FileText size={18} />
                          </div>
                          <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-white/80">
                            {catalog.size}
                          </span>
                        </div>

                        <h4 className="mt-4 font-display text-base font-bold text-[#0d1a46] transition-colors group-hover:text-primary dark:text-white">
                          {catalog.title}
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:!text-white">
                          {catalog.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10">
                        <a
                          href={catalog.fileUrl}
                          download={catalog.fileName}
                          className="inline-flex w-full items-center justify-between rounded-none bg-[#0d1a46] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary dark:bg-white dark:text-[#070e24] dark:hover:bg-slate-200"
                        >
                          <span className="flex items-center gap-2">
                            <Download size={14} />
                            {isEn ? "Download Catalog" : "Каталог татах"}
                          </span>
                          <span className="text-[10px] font-mono opacity-80">PDF</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
              </div>
            )}
          </div>

          {/* Sidebar CTA & Info Column */}
          <div className="lg:col-span-4 space-y-8">
            <FadeIn delay={0.1}>
              <div className="relative border border-[#1e294f] bg-[#070e24] p-6 text-white shadow-xl sm:p-8 dark:border-white/10 dark:bg-[#070e24] [clip-path:polygon(18px_0,100%_0,100%_100%,0_100%,0_18px)]">
                {/* Subtle corner chamfer accent */}
                <div className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-b border-r border-white/20 bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)]" />

                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  {isMasterclass
                    ? isEn ? "Block Academy Masterclass" : "Блок Академи Сургалт"
                    : isCleanAir
                    ? isEn ? "Zehnder Clean Air Solutions" : "Zehnder Эрүүл Агаар"
                    : isEn ? "Request Consultation" : "Зөвлөгөө авах"}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {isMasterclass
                    ? isEn
                      ? "Join our professional engineering and construction management masterclasses powered by Block Academy."
                      : "Барилгын төслийн менежмент, инженерийн практик сургалтуудыг Блок Академиар дамжуулан аваарай."
                    : isCleanAir
                    ? isEn
                      ? "Official Zehnder heating and ventilation solutions engineered for health, silence, and optimal energy efficiency."
                      : "Германы 120 жилийн түүхтэй Zehnder брэндийн албан ёсны төлөөлөгчөөс инженерийн тооцоолуур, суурилуулалт аваарай."
                    : isEn
                    ? "Contact our engineering team to evaluate the best solutions tailored to your project requirements."
                    : "Манай инженерийн багтай холбогдон төслийнхөө шаардлагад нийцсэн шийдлийг тооцоолуулна уу."}
                </p>

                <div className="mt-6 space-y-3">
                  {/* Dedicated Action Button based on product */}
                  {isMasterclass ? (
                    <div className="space-y-2.5">
                      <a
                        href="https://www.facebook.com/profile.php?id=61583605854922"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between rounded-none bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#070e24] shadow-md transition-all hover:bg-slate-100 active:scale-[0.99]"
                      >
                        <span className="text-[#070e24] font-bold">{isEn ? "Visit Block Academy (Facebook)" : "Блок Академи Facebook хуудас"}</span>
                        <ExternalLink size={15} className="text-[#070e24]" />
                      </a>
                      <a
                        href="https://academy.artify.mn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between rounded-none border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-white/15"
                      >
                        <span className="text-white font-bold">academy.artify.mn</span>
                        <ExternalLink size={15} className="text-white" />
                      </a>
                    </div>
                  ) : isCleanAir ? (
                    <div className="space-y-2.5">
                      <ScrollToButton
                        targetId="catalogs"
                        className="flex w-full items-center justify-between rounded-none bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#070e24] shadow-md transition-all hover:bg-slate-100 active:scale-[0.99]"
                      >
                        <span className="text-[#070e24] font-bold">{isEn ? "Download Catalogs" : "Каталог татах"}</span>
                        <Download size={15} className="text-[#070e24]" />
                      </ScrollToButton>
                      <a
                        href="https://www.techinvent.mn/en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between rounded-none border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-white/15"
                      >
                        <span className="text-white font-bold">{isEn ? "Zehnder Portal (TechInvent)" : "Zehnder хуудас үзэх"}</span>
                        <ExternalLink size={15} className="text-white" />
                      </a>
                    </div>
                  ) : (
                    <Link
                      href="/contact"
                      className="flex w-full items-center justify-between rounded-none bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#070e24] shadow-md transition-all hover:bg-slate-100 active:scale-[0.99]"
                    >
                      <span className="text-[#070e24] font-bold">{isEn ? "Send Inquiry" : "Хүсэлт илгээх"}</span>
                      <ArrowUpRight size={15} className="text-[#070e24]" />
                    </Link>
                  )}

                  {/* Direct Email */}
                  <a
                    href="mailto:info@artifybrand.com"
                    className="flex w-full items-center justify-center gap-2 rounded-none border border-white/15 bg-white/5 py-3 text-xs font-bold text-white transition-colors hover:bg-white/15"
                  >
                    <Mail size={14} className="text-white/80" />
                    info@artifybrand.com
                  </a>
                </div>

                {/* Key Benefits Guarantee list */}
                <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>{isEn ? "Certified Engineering Calculations" : "Мэргэшсэн инженерийн тооцоолол"}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>{isEn ? "Premium Quality Assurance" : "Чанарын өндөр стандарт, баталгаа"}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>{isEn ? "Dedicated Client Support" : "Шуурхай дэмжлэг, үйлчилгээ"}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Other Products Section with Chamfer Card & 4:3 Proportional Image on Top */}
        {otherProducts.length > 0 && (
          <div className="mt-20 border-t border-slate-200/80 pt-16 lg:mt-28 dark:border-white/10">
            <div className="mb-10">
              <span className="inline-block border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0d1a46] mb-3 dark:border-white/20 dark:bg-white/10 dark:text-white">
                {isEn ? "Solutions" : "Шийдлүүд"}
              </span>
              <h2 className="font-display text-2xl font-bold text-[#0d1a46] dark:text-white lg:text-3xl">
                {isEn ? "Other Solutions" : "Бусад шийдлүүд"}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {otherProducts.map((p) => (
                <div
                  key={p.id}
                  className="group relative flex h-full flex-col bg-slate-200/90 p-[1px] transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#0d1a46]/50 hover:shadow-2xl [clip-path:polygon(22px_0,100%_0,100%_100%,0_100%,0_22px)] dark:bg-white/10 dark:hover:bg-white/30"
                >
                  <div className="relative flex h-full flex-col justify-between bg-white p-5 sm:p-6 [clip-path:polygon(21px_0,100%_0,100%_100%,0_100%,0_21px)] dark:bg-[#0b132b]">
                    <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-b border-r border-[#0d1a46]/15 bg-slate-100/80 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80 dark:border-white/20 dark:bg-white/10" />

                    <div>
                      {/* Full 4:3 Image on top - Not cut in half */}
                      {p.thumbnailUrl && (
                        <Link href={`/products/${p.slug}`} className="block overflow-hidden bg-slate-100 dark:bg-slate-900">
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                            <Image
                              src={p.thumbnailUrl}
                              alt={p.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="h-full w-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-105"
                            />
                            {p.logoUrl && (
                              <div className="pointer-events-none absolute bottom-3.5 left-3.5 flex items-center">
                                <Image
                                  src={p.logoUrl}
                                  alt={`${p.title} logo`}
                                  width={180}
                                  height={50}
                                  className="h-5 w-auto max-w-[120px] object-contain object-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                                />
                              </div>
                            )}
                          </div>
                        </Link>
                      )}

                      {/* Title below image */}
                      <Link href={`/products/${p.slug}`} className="block">
                        <h3 className="mt-5 flex min-h-[3rem] items-center font-display text-lg font-bold leading-tight text-[#0d1a46] transition-colors group-hover:text-primary dark:text-white line-clamp-2">
                          {p.title}
                        </h3>
                      </Link>

                      {/* Description on bottom */}
                      {p.excerpt && (
                        <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600 dark:!text-white">
                          {p.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10">
                      <Link
                        href={`/products/${p.slug}`}
                        className="flex w-full items-center justify-between rounded-none bg-[#0d1a46] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all group-hover:bg-primary group-hover:text-primary-foreground dark:bg-white dark:text-[#070e24] dark:group-hover:bg-slate-200"
                      >
                        <span>{t("details")}</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
