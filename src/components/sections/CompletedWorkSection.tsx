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
    <FadeIn delay={delay} direction="up">
      <article className="group flex h-full flex-col overflow-hidden bg-card shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 lg:p-6">
          <h3 className="font-display text-lg font-semibold text-[#0d1a46] lg:text-xl">
            {project.title}
          </h3>
          {project.tags.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          )}
          {project.content && (
            <CmsContent
              html={project.content}
              className="mt-4 border-t border-border pt-4 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_ul]:space-y-1 [&_ul]:text-sm [&_ul]:text-foreground [&_li]:before:mt-2 [&_li]:before:block [&_li]:before:h-1 [&_li]:before:w-1 [&_li]:before:shrink-0 [&_li]:before:bg-primary [&_li]:before:content-['']"
            />
          )}
        </div>
      </article>
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
    <section className="bg-background px-3 py-16 text-foreground lg:px-6 lg:py-24">
      <div className="mx-auto max-w-[1600px]">
        <FadeIn>
          <div className="mb-10 text-center lg:mb-16">
            <h2 className="font-display text-2xl font-semibold text-[#0d1a46] lg:text-4xl">
              {page?.name ?? ""}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
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
