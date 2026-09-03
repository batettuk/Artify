import "server-only";

import { getVerifiedPosts } from "@/api/cms/server/queries/get-verified-posts";
import { getVerifiedPostType } from "@/api/cms/server/post-types";
import type { PartnerLogoDto, ProjectCardDto } from "@/api/cms/types/public";

export async function getProjects(language: string): Promise<ProjectCardDto[]> {
  const posts = await getVerifiedPosts({
    postType: getVerifiedPostType("tusul"),
    language,
    limit: 20,
    sortDirection: "asc",
  });
  return posts.map((post) => ({
    id: post._id,
    title: post.title ?? "",
    content: post.content ?? null,
    thumbnailUrl: post.thumbnail?.url ?? null,
    tags: (post.tags ?? []).flatMap((tag) => (tag.name ? [tag.name] : [])),
  }));
}

export async function getPartners(language: string): Promise<PartnerLogoDto[]> {
  const posts = await getVerifiedPosts({
    postType: getVerifiedPostType("khamtragch"),
    language,
    limit: 20,
    sortDirection: "asc",
  });
  return posts.map((post) => ({
    id: post._id,
    name: post.title ?? "",
    logoUrl: post.thumbnail?.url ?? null,
  }));
}
