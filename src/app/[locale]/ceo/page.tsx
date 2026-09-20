import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { FadeIn } from "@/components/motion/FadeIn";
import { CmsContent } from "@/components/common/CmsContent";
import Image from "@/components/common/Image";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle2,
  Compass,
  FileCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPageDetail({ slug: "/ceo", language: locale });

  const isEn = locale === "en";
  const title = isEn
    ? "Munkhchuluun Sukhbaatar — Founder & CEO | Artify"
    : "Мөнхчулуун Сүхбаатар — Үүсгэн байгуулагч, Гүйцэтгэх захирал | Artify";
  const description =
    page?.description ||
    (isEn
      ? "Executive Profile & Leadership Statement of Munkhchuluun S., Founder & CEO of Artify Brand."
      : "Артифай компанийн үүсгэн байгуулагч, гүйцэтгэх захирал Мөнхчулуун Сүхбаатарын танилцуулга, карьерын түүх.");

  return {
    title,
    description,
  };
}

export default async function CeoProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getPageDetail({ slug: "/ceo", language: locale });
  if (!page) notFound();

  const isEn = locale === "en";

  const ceoName = isEn ? "Munkhchuluun Sukhbaatar" : "Мөнхчулуун Сүхбаатар";
  const ceoRole = isEn
    ? "Founder & Chief Executive Officer"
    : "Үүсгэн байгуулагч, Гүйцэтгэх захирал";
  const ceoCredentials = isEn
    ? "Certified Civil Engineer • Certified Cost Estimator (+15 Years Industry Experience)"
    : "Иргэний барилгын мэргэшсэн инженер, мэргэшсэн төсөвчин (+15 жилийн салбарын туршлага)";

  const defaultQuote = isEn
    ? "“The construction industry is a multidimensional space where knowledge, technology, and craftsmanship from diverse disciplines converge. Artify aspires to be the premier platform where the industry's finest come together.”"
    : "“Барилгын салбар бол олон салбарын мэдлэг, технологи, ур чадвар нэгддэг өргөн хүрээний орон зай. Салбарын шилдэгүүд нэгдэх талбар нь Артифай байхыг зорьдог.”";

  const defaultEnBio = `Munkhchuluun Sukhbaatar is a certified civil engineer and project management specialist with over 15 years of distinguished leadership in the construction sector. Throughout his career, he has advanced from site engineer to client supervision engineer, chief engineer, director of project management, and chief executive officer, accumulating extensive hands-on experience across every phase of real estate development.

His portfolio of successfully delivered developments includes landmark projects such as Gegeenten Complex, Romana Residence, SS Garden, Active Garden, and Gerlug Vista. Across these projects, his responsibilities spanned structural assembly, advanced engineering solutions, quality assurance, budgeting, supply chain management, subcontractor coordination, and state commissioning.

In 2024, he founded Artify Deluxe LLC, synthesizing his years of engineering, project execution, procurement, and management expertise to drive higher quality, efficiency, and human-centric living standards across the construction industry.

He achieved his "Certified Civil Engineer" credential in 2019 and "Certified Cost Estimator" credential in 2020.`;

  // Parse Quote for top hero card and Biography for main section
  let quoteContent = defaultQuote;
  let bioContent = page.content || "";

  if (isEn) {
    if (page.description) {
      const raw = page.description.trim();
      const quoteMatch = raw.match(/^[“"][^“”"]+[”"]/);
      if (quoteMatch) {
        quoteContent = quoteMatch[0].trim();
        const remainder = raw.slice(quoteMatch[0].length).trim();
        bioContent = remainder || defaultEnBio;
      } else {
        bioContent = defaultEnBio;
      }
    } else {
      bioContent = defaultEnBio;
    }
  } else {
    if (page.description) {
      const raw = page.description.trim();
      const quoteMatch = raw.match(/^[“"][^“”"]+[”"]/);
      if (quoteMatch) {
        quoteContent = quoteMatch[0].trim();
      } else {
        quoteContent = raw.split(/\r?\n\r?\n|\r?\n/)[0]?.trim() || defaultQuote;
      }
    }
  }

  const projects = [
    {
      name: isEn ? "Gegeenten Complex" : "Гэгээнтэн цогцолбор хотхон",
      category: isEn ? "Mixed-Use Complex" : "Орон сууц, үйлчилгээний цогцолбор",
      year: "2016 – 2018",
    },
    {
      name: isEn ? "Romana Residence" : "Romana Residence",
      category: isEn ? "Luxury Residential" : "Тансаг зэрэглэлийн орон сууц",
      year: "2018 – 2020",
    },
    {
      name: isEn ? "SS Garden" : "SS Garden",
      category: isEn ? "Townhouse & Villa" : "Таунхаус, хотхоны бүтээн байгуулалт",
      year: "2021 – 2023",
    },
    {
      name: isEn ? "Active Garden" : "Active Garden",
      category: isEn ? "Green Community & ERV" : "Эрүүл эко, ухаалаг агааржуулалттай төсөл",
      year: "2023 – 2024",
    },
    {
      name: isEn ? "Gerlug Vista" : "Гэрлүг Виста",
      category: isEn ? "High-End Residential" : "Орчин үеийн орон сууцны төсөл",
      year: "2024 – 2025",
    },
  ];

  const coreCompetencies = [
    {
      title: isEn ? "+15 Years Practical Experience" : "+15 жилийн бодит туршлага",
      desc: isEn
        ? "Comprehensive project oversight from site engineer, client supervisor, chief engineer, to executive director."
        : "Талбайн инженерээс эхлэн ерөнхий инженер, захиалагчийн хяналт, гүйцэтгэх захирал хүртэлх бүх үе шатны практик туршлага.",
      icon: <Building2 className="text-white" size={20} />,
    },
    {
      title: isEn ? "Accredited Civil Engineer (2019)" : "Мэргэшсэн инженер (2019)",
      desc: isEn
        ? "Official national engineering accreditation ensuring structural integrity and modern building standards."
        : "Барилга байгууламжийн бүтээц, техникийн шийдэл, стандартын дагуу төсөл хэрэгжүүлэх мэргэжлийн зэрэг.",
      icon: <Award className="text-white" size={20} />,
    },
    {
      title: isEn ? "Accredited Cost Estimator (2020)" : "Мэргэшсэн төсөвчин (2020)",
      desc: isEn
        ? "Precision budget modeling, pricing strategy, investment efficiency, and construction financial control."
        : "Төслийн хөрөнгө оруулалтын оновчлол, үнийн бодлого, төсөв тооцооны өндөр нарийвчлалтай удирдлага.",
      icon: <FileCheck className="text-white" size={20} />,
    },
    {
      title: isEn ? "Engineering-Driven Innovation" : "Инженерийн ур ухаан & Инновац",
      desc: isEn
        ? "Harmonizing Swiss Zehnder clean-air microclimate systems, custom facades, and architectural differentiation."
        : "Швейцарын Zehnder ухаалаг агаар сэлгэлт, ховор захиалгат хийцлэл, амьдралын чанарыг эрхэмлэсэн шийдлүүд.",
      icon: <Sparkles className="text-white" size={20} />,
    },
  ];

  return (
    <article className="bg-background text-foreground">
      {/* Hero Header */}
      <section className="relative flex min-h-[500px] w-full items-end overflow-hidden bg-[#040817] pt-32 pb-16 lg:min-h-[600px] lg:pt-40 lg:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/about-1.jpg"
            alt={ceoName}
            fill
            priority
            className="h-full w-full object-cover object-center opacity-30 scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040817] via-[#040817]/70 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <FadeIn>
            <div>
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft size={14} />
                <span>{isEn ? "Back to Home" : "Нүүр хуудас руу буцах"}</span>
              </Link>
            </div>

            <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl max-w-4xl">
              {ceoName}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-slate-300">
              <span className="text-white font-semibold">{ceoRole}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>{isEn ? "Artify Brand" : "Артифай брэнд"}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        {/* Visual Quote & Portrait Presentation Card */}
        <div className="group relative flex h-full flex-col bg-white/10 p-[1px] shadow-2xl [clip-path:polygon(28px_0,100%_0,100%_100%,0_100%,0_28px)] mb-20">
          <div className="relative overflow-hidden bg-[#040817] [background:radial-gradient(circle_at_20%_25%,rgba(24,48,110,0.55)_0%,#040817_65%)] p-6 sm:p-10 lg:p-14 [clip-path:polygon(27px_0,100%_0,100%_100%,0_100%,0_27px)]">
            <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-b border-r border-white/20 bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />

            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col justify-between lg:col-span-7">
                <div className="mb-6 sm:mb-8">
                  <Image
                    src="/images/artify-logo-white.png"
                    alt="ARTIFY®"
                    width={280}
                    height={60}
                    priority
                    className="h-8 sm:h-10 w-auto object-contain"
                  />
                </div>

                <div className="relative max-w-2xl">
                  <CmsContent
                    html={quoteContent}
                    className="font-display text-lg font-medium leading-relaxed text-white/95 sm:text-xl lg:text-2xl lg:leading-[1.7] [&_strong]:font-bold [&_strong]:text-white"
                  />
                </div>

                <div className="mt-8 flex flex-col items-end sm:mt-10 sm:pr-8">
                  <span className="font-mono text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                    Founder & CEO:
                  </span>
                  <span className="font-signature text-3xl font-bold tracking-wide text-white drop-shadow-md sm:text-4xl lg:text-5xl mt-1 select-none">
                    Munkhchuluun S.
                  </span>
                </div>

                <div className="mt-8 border-t border-white/10 pt-4 text-left sm:text-right text-xs font-medium text-slate-400">
                  {ceoCredentials}
                </div>
              </div>

              <div className="relative flex flex-col items-center justify-end lg:col-span-5">
                <div className="relative mx-auto h-[360px] w-full max-w-[340px] sm:h-[440px] sm:max-w-[400px] lg:h-[500px]">
                  <Image
                    src="/images/ceo.png"
                    alt={ceoName}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="h-full w-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Biography & Career Path */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <FadeIn>
              <div>
                <h2 className="font-display text-2xl font-bold text-[#0d1a46] dark:text-white sm:text-3xl lg:text-4xl">
                  {isEn
                    ? "Engineering Rigor & Strategic Vision"
                    : "Инженерийн ур ухаан, төслийн удирдлагын практик туршлага"}
                </h2>
                <div className="mt-6 prose prose-slate max-w-none dark:prose-invert prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300">
                  <CmsContent html={bioContent} />
                </div>
              </div>
            </FadeIn>

            {/* Core Competencies Grid */}
            <div className="mt-14">
              <h3 className="font-display text-xl font-bold text-[#0d1a46] dark:text-white mb-6">
                {isEn ? "Core Expertise & Qualifications" : "Мэргэжлийн ур чадвар, мэргэшлийн зэрэг"}
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {coreCompetencies.map((comp, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between bg-slate-200/90 p-[1px] [clip-path:polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]"
                  >
                    <div className="relative flex h-full flex-col justify-between bg-white p-5 [clip-path:polygon(15px_0,100%_0,100%_100%,0_100%,0_15px)] dark:bg-[#0b132b]">
                      <div className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-b border-r border-white/20 bg-slate-100/80 [clip-path:polygon(0_0,100%_0,0_100%)] dark:bg-white/10" />
                      <div>
                        <div className="flex h-10 w-10 items-center justify-center bg-[#070e24] text-white [clip-path:polygon(6px_0,100%_0,100%_100%,0_100%,0_6px)] mb-3.5">
                          {comp.icon}
                        </div>
                        <h4 className="font-display text-sm font-bold text-[#0d1a46] dark:text-white">
                          {comp.title}
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                          {comp.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Projects & Consultation CTA */}
          <div className="lg:col-span-4 space-y-8">
            <FadeIn delay={0.15}>
              <div className="border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 dark:bg-[#0b132b] dark:border-white/10 [clip-path:polygon(16px_0,100%_0,100%_100%,0_100%,0_16px)]">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 size={16} className="text-white" />
                  <h3 className="font-display text-base font-bold text-[#0d1a46] dark:text-white uppercase tracking-wide">
                    {isEn ? "Featured Projects" : "Хэрэгжүүлсэн томоохон төслүүд"}
                  </h3>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-white/10">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-sm font-bold text-[#0d1a46] dark:text-white">
                          {proj.name}
                        </h4>
                        <span className="font-mono text-[10px] font-semibold text-slate-400">
                          {proj.year}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {proj.category}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/10">
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-between rounded-none bg-[#0d1a46] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-primary dark:bg-white dark:text-[#070e24] dark:hover:bg-slate-200"
                  >
                    <span className="text-white dark:text-[#070e24] font-bold">{isEn ? "Request Project Advisory" : "Төслийн зөвлөгөө авах"}</span>
                    <ArrowUpRight size={15} className="text-white dark:text-[#070e24]" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </article>
  );
}
