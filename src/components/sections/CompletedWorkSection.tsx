import { getTranslations } from "next-intl/server";
import { CmsContent } from "@/components/common/CmsContent";
import EmptyState from "@/components/common/EmptyState";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectGrid } from "@/components/sections/client/ProjectGrid";
import type {
  CmsCollectionDto,
  CmsPageDto,
  ProjectCardDto,
} from "@/api/cms/types/public";

function ProjectCard({ project, delay = 0 }: { project: ProjectCardDto; delay?: number }) {
  return (
    <FadeIn delay={delay} direction="up" className="h-full">
      <div className="group relative flex h-full flex-col bg-slate-200/90 p-[1px] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#0d1a46]/50 hover:shadow-2xl [clip-path:polygon(22px_0,100%_0,100%_100%,0_100%,0_22px)]">
        <article className="relative flex h-full flex-col justify-between bg-white [clip-path:polygon(21px_0,100%_0,100%_100%,0_100%,0_21px)]">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-6 w-6 border-b border-r border-[#0d1a46]/15 bg-slate-100/80 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />
          <div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <Image
                src={project.thumbnailUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5 lg:p-6">
              <h3 className="font-display text-lg font-bold text-[#0d1a46] lg:text-xl">
                {project.title}
              </h3>
              {project.tags.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-slate-500 font-medium">
                  {project.tags.map((tag) => <li key={tag}>• {tag}</li>)}
                </ul>
              )}
              {project.content && (
                <CmsContent
                  html={project.content}
                  className="mt-4 border-t border-slate-100 pt-4 text-xs sm:text-sm text-slate-600 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_ul]:space-y-1"
                />
              )}
            </div>
          </div>
        </article>
      </div>
    </FadeIn>
  );
}

export async function CompletedWorkSection({
  page,
  projects,
  locale,
}: {
  page: CmsPageDto | null;
  projects: CmsCollectionDto<ProjectCardDto>;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "completedWork" });
  const items = projects.status === "ready" ? projects.items : [];

  return (
    <section className="bg-background px-4 py-16 text-foreground sm:px-6 lg:px-12 lg:py-24 border-t border-slate-200/80">
      <div className="mx-auto max-w-[1600px]">
        <FadeIn>
          <div className="mb-10 text-center lg:mb-16">
            <span className="inline-block border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0d1a46] mb-3">
              03 — Portfolio
            </span>
            <h2 className="font-display text-2xl font-bold text-[#0d1a46] lg:text-4xl">
              {page?.name ?? ""}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              {page?.description ?? ""}
            </p>
          </div>
        </FadeIn>

        {projects.status === "unconfigured" ? (
          <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
        ) : items.length === 0 ? (
          <EmptyState title={t("noProjectsTitle")} description={t("noProjectsDescription")} />
        ) : (
          <ProjectGrid
            total={items.length}
            showAllLabel={t("showAll")}
            showLessLabel={t("showLess")}
          >
            {items.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={0.05 * index} />
            ))}
          </ProjectGrid>
        )}
      </div>
    </section>
  );
}
