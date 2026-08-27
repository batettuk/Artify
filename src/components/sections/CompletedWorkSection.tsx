"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Project {
  title: string;
  image: string;
  tags: string[];
  scope: string[];
}

function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <FadeIn delay={delay} direction="up">
      <div className="group flex h-full flex-col overflow-hidden rounded-none bg-card shadow-sm transition-all hover:shadow-md lg:rounded-none">
        <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        </div>
        <div className="flex flex-1 flex-col p-5 lg:p-6">
          <h3 className="font-display text-lg font-semibold text-foreground lg:text-xl">
            {project.title}
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="mt-4 border-t border-border pt-4">
            <ul className="space-y-1 text-sm text-foreground">
              {project.scope.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 block h-1 w-1 rounded-none bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export function CompletedWorkSection() {
  const t = useTranslations("completedWork");
  const [showAll, setShowAll] = useState(false);

  const projects: Project[] = [
    {
      title: "Romana Residence",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      tags: ["Оффис", "Худалдаа үйлчилгээ", "Орон сууц"],
      scope: ["Захиалагчийн хяналтын менежмент"],
    },
    {
      title: "Gegeenten Complex",
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
      tags: ["Оффис", "Худалдаа үйлчилгээ", "Кино театр", "Хоол үйлдвэрлэл", "Орон сууц"],
      scope: ["Захиалагчийн хяналтын менежмент"],
    },
    {
      title: "GrandMed Hospital",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b934af7?w=800&q=80",
      tags: ["Эмнэлгийн тусгай зориулалттай барилга"],
      scope: ["Захиалагчийн хяналтын менежмент"],
    },
    {
      title: "Olympic Residence",
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80",
      tags: ["Тансаг зэрэглэлийн 99 айлын орон сууц", "4 блок барилга"],
      scope: ["Захиалагчийн хяналтын менежмент"],
    },
    {
      title: "SS Garden",
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
      tags: ["Хурын ус ашиглалтын систем", "Нөөц цахилгаан үүсгэвэрийн шийдэлтэй тансаг зэрэглэлийн пентхаус төсөл"],
      scope: ["Төлөвлөлт", "Удирдлага", "Менежмент", "Шийдэл"],
    },
    {
      title: "Gerlug Vista",
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
      tags: ["Талст хэлбэртэй 8 блок"],
      scope: [
        "Ашиглалтын үйл ажиллагааны төлөвлөлт",
        "Сервис менежментийн цаг хүрээ, зорилт",
        "Төсвийн задаргаа",
      ],
    },
    {
      title: "Active Garden",
      image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80",
      tags: ["Тарпец хэлбэртэй, үйлчилгээтэй 8 блок"],
      scope: ["Төлөвлөлт", "Удирдлага", "Менежмент", "Шийдэл"],
    },
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section className="bg-background px-3 py-16 text-foreground lg:px-6 lg:py-24">
      <div className="mx-auto max-w-[1600px]">
        <FadeIn>
          <div className="mb-10 text-center lg:mb-16">
            <h2 className="font-display text-2xl font-semibold lg:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} delay={0.05 * index} />
          ))}
        </div>

        {projects.length > 4 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-none bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              {showAll ? (
                <>
                  {t("showLess")}
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  {t("showAll")}
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
