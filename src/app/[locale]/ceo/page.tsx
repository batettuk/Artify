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

import { getPostBySlug } from "@/api/cms/server/queries/get-post-by-slug";
import { getProjects } from "@/api/cms/server/queries/get-home-collection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [page, statementPost] = await Promise.all([
    getPageDetail({ slug: "/ceo", language: locale }),
    getPostBySlug({ slug: "ceo-statement", language: locale }),
  ]);

  const name = statementPost?.title || page?.name || "Munkhchuluun Sukhbaatar";
  const title = `${name} | Artify`;
  const description = statementPost?.excerpt || page?.description || "";

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
  const [page, statementPost, credentialsPost, competenciesPost, projectItems] =
    await Promise.all([
      getPageDetail({ slug: "/ceo", language: locale }),
      getPostBySlug({ slug: "ceo-statement", language: locale }),
      getPostBySlug({ slug: "ceo-credentials", language: locale }),
      getPostBySlug({ slug: "ceo-competencies", language: locale }),
      getProjects(locale).catch(() => []),
    ]);

  if (!page && !statementPost) notFound();

  const isEn = locale === "en";

  const ceoName = statementPost?.title || page?.name || "";
  const ceoRole = credentialsPost?.title || "";
  const ceoCredentials = credentialsPost?.excerpt || "";

  const quoteContent = statementPost?.excerpt || page?.description || "";
  const bioContent = statementPost?.content || page?.content || "";

  // Dynamic projects from CMS (post type: tusul)
  const projects = projectItems.map((p) => ({
    name: p.title,
    category: p.tags.join(" • ") || p.content || "",
    thumbnailUrl: p.thumbnailUrl,
  }));

  // Dynamic competencies from CMS (post: ceo-competencies)
  const competencyIcons = [
    <Building2 key="bld" className="text-white" size={20} />,
    <Award key="awd" className="text-white" size={20} />,
    <FileCheck key="chk" className="text-white" size={20} />,
    <Sparkles key="spk" className="text-white" size={20} />,
  ];

  const rawCompetencies = (competenciesPost?.content || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const coreCompetencies = rawCompetencies.map((line, idx) => {
    const separatorIdx = line.indexOf(" | ");
    if (separatorIdx !== -1) {
      return {
        title: line.slice(0, separatorIdx).trim(),
        desc: line.slice(separatorIdx + 3).trim(),
        icon: competencyIcons[idx % competencyIcons.length],
      };
    }
    return {
      title: line,
      desc: "",
      icon: competencyIcons[idx % competencyIcons.length],
    };
  });


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
        <div className="group relative flex h-full flex-col bg-slate-200/90 dark:bg-white/10 p-[1px] shadow-xl dark:shadow-2xl [clip-path:polygon(28px_0,100%_0,100%_100%,0_100%,0_28px)] mb-20 transition-all duration-300">
          <div className="relative overflow-hidden bg-white dark:bg-[#040817] [background:radial-gradient(circle_at_20%_25%,rgba(219,234,254,0.65)_0%,rgba(248,250,252,0.6)_45%,#ffffff_75%)] dark:[background:radial-gradient(circle_at_20%_25%,rgba(24,48,110,0.55)_0%,#040817_65%)] p-6 sm:p-10 lg:p-14 transition-colors duration-500 [clip-path:polygon(27px_0,100%_0,100%_100%,0_100%,0_27px)]">
            <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-b border-r border-[#0d1a46]/20 bg-slate-100/90 dark:border-white/20 dark:bg-white/10 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />

            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col justify-between lg:col-span-7">
                <div className="mb-6 sm:mb-8">
                  <Image
                    src="/images/artify-logo-navy.png"
                    alt="ARTIFY®"
                    width={280}
                    height={60}
                    priority
                    className="h-8 sm:h-10 w-auto object-contain dark:hidden"
                  />
                  <Image
                    src="/images/artify-logo-white.png"
                    alt="ARTIFY®"
                    width={280}
                    height={60}
                    priority
                    className="h-8 sm:h-10 w-auto object-contain hidden dark:block"
                  />
                </div>

                <div className="relative max-w-2xl">
                  <CmsContent
                    html={quoteContent}
                    className="font-display text-lg font-medium leading-relaxed text-[#070e24] dark:text-white/95 sm:text-xl lg:text-2xl lg:leading-[1.7] [&_strong]:font-bold [&_strong]:text-[#0d1a46] dark:[&_strong]:text-white"
                  />
                </div>

                <div className="mt-8 flex flex-col items-end sm:mt-10 sm:pr-8">
                  <span className="font-mono text-[11px] font-medium tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                    Founder & CEO:
                  </span>
                  <span className="font-signature text-3xl font-bold tracking-wide text-[#0d1a46] dark:text-white drop-shadow-sm dark:drop-shadow-md sm:text-4xl lg:text-5xl mt-1 select-none">
                    Munkhchuluun S.
                  </span>
                </div>

                <div className="mt-8 border-t border-slate-200 dark:border-white/10 pt-4 text-left sm:text-right text-xs font-medium text-slate-600 dark:text-slate-400">
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
                    className="h-full w-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(13,26,70,0.18)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
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
                  <Building2 size={16} className="text-[#0d1a46] dark:text-white" />
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
                      </div>
                      {proj.category && (
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {proj.category}
                        </p>
                      )}
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
