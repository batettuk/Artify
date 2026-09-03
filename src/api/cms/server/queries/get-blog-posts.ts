import "server-only";

import { CP_POSTS } from "@/graphql/cms/queries/post";
import type {
  CpPostsData,
  CpPostsVariables,
} from "@/graphql/cms/queries/post";
import {
  cmsPublicQueryContext,
  getCmsClient,
  getCmsPortalId,
} from "@/api/cms/server/client";
import { getVerifiedPostType } from "@/api/cms/server/post-types";
import type { BlogCardDto } from "@/api/cms/types/public";

export async function getBlogPosts({
  language,
  limit,
}: {
  language: string;
  limit: number;
}): Promise<BlogCardDto[]> {
  if (!language || !Number.isInteger(limit) || limit < 1) {
    throw new Error("A CMS language and positive blog post limit are required");
  }

  const postType = getVerifiedPostType("news");
  const variables: CpPostsVariables = {
    language,
    type: postType.code,
    status: "published",
    sortField: "publishedDate",
    sortDirection: "desc",
    limit,
  };
  const portalId = getCmsPortalId();
  const { data } = await getCmsClient().query<
    CpPostsData,
    CpPostsVariables
  >({
    query: CP_POSTS,
    variables,
    context: cmsPublicQueryContext,
  });

  return (data?.cpPosts ?? []).map((post) => {
    if (!post.title || !post.slug) {
      throw new Error(`Published blog post ${post._id} is missing title or slug`);
    }
    if (
      post.clientPortalId !== portalId ||
      post.customPostType?._id !== postType.id ||
      post.customPostType.code !== postType.code ||
      post.customPostType.clientPortalId !== portalId
    ) {
      throw new Error(`Blog query returned an unexpected post type for ${post._id}`);
    }

    return {
      id: post._id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? null,
      publishedDate: post.publishedDate ?? null,
      thumbnailUrl: post.thumbnail?.url ?? null,
    };
  });
}
