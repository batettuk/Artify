import "server-only";

import { cache } from "react";
import { isCmsConfigurationError } from "@/api/cms/server/errors";
import { getBlogPosts } from "@/api/cms/server/queries/get-blog-posts";
import {
  getPartners,
  getProjects,
} from "@/api/cms/server/queries/get-home-collection";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import type { CmsCollectionDto } from "@/api/cms/types/public";

async function resolveCollection<T>(
  postType: string,
  request: Promise<T[]>,
): Promise<CmsCollectionDto<T>> {
  try {
    return { status: "ready", items: await request };
  } catch (error) {
    if (isCmsConfigurationError(error)) {
      return { status: "unconfigured", postType };
    }

    throw error;
  }
}

export const getHomeContent = cache(async (language: string) => {
  if (!language) {
    throw new Error("CMS language is required for home content");
  }

  const [
    page,
    aboutPage,
    ceoPage,
    completedWorkPage,
    partnersPage,
    blogPage,
    contactPage,
    contactTextPage,
    blogPosts,
    projects,
    partners,
  ] = await Promise.all([
    getPageDetail({ slug: "home", language }),
    getPageDetail({ slug: "about", language }),
    getPageDetail({ slug: "/ceo", language }),
    getPageDetail({ slug: "testimonials", language }),
    getPageDetail({ slug: "partners", language }),
    getPageDetail({ slug: "blog", language }),
    getPageDetail({ slug: "contact", language }),
    getPageDetail({ slug: "contact-text", language }),
    getBlogPosts({ language, limit: 3 }),
    resolveCollection("tusul", getProjects(language)),
    resolveCollection("khamtragch", getPartners(language)),
  ]);

  return {
    page,
    sectionPages: {
      about: aboutPage,
      ceo: ceoPage,
      completedWork: completedWorkPage,
      partners: partnersPage,
      blog: blogPage,
      contact: contactPage,
      contactText: contactTextPage,
    },
    blogPosts,
    projects,
    partners,
  };
});
