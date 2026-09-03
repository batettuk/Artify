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

type GetFeaturedPostsOptions = {
  language: string;
  limit: number;
  sortField?: string;
  sortDirection?: "asc" | "desc";
};

/**
 * Type-wide featured collection. Hardcodes the exact backend `featured: true`
 * filter; callers can never weaken the invariant. One featured slot =>
 * pass `limit: 1` with an explicit deterministic sort.
 */
export async function getFeaturedPosts({
  language,
  limit,
  sortField = "publishedDate",
  sortDirection = "desc",
}: GetFeaturedPostsOptions): Promise<BlogCardDto[]> {
  if (!language || !Number.isInteger(limit) || limit < 1) {
    throw new Error("A CMS language and positive featured-post limit are required");
  }

  const postType = getVerifiedPostType("news");
  const portalId = getCmsPortalId();

  const variables: CpPostsVariables = {
    language,
    type: postType.code,
    featured: true,
    status: "published",
    sortField,
    sortDirection,
    limit,
  };
  const { data } = await getCmsClient().query<CpPostsData, CpPostsVariables>({
    query: CP_POSTS,
    variables,
    context: cmsPublicQueryContext,
  });

  return (data?.cpPosts ?? []).map((post) => {
    if (!post.title || !post.slug) {
      throw new Error(`Featured post ${post._id} is missing title or slug`);
    }
    if (
      post.clientPortalId !== portalId ||
      post.customPostType?._id !== postType.id ||
      post.customPostType.code !== postType.code ||
      post.customPostType.clientPortalId !== portalId ||
      post.featured !== true
    ) {
      throw new Error(`Featured query returned an unexpected post ${post._id}`);
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
