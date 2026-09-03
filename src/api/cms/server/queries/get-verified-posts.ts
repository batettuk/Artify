import "server-only";

import { CP_POSTS } from "@/graphql/cms/queries/post";
import type {
  CpPostsData,
  CpPostsVariables,
  Post,
} from "@/graphql/cms/queries/post";
import {
  cmsPublicQueryContext,
  getCmsClient,
  getCmsPortalId,
} from "@/api/cms/server/client";

export async function getVerifiedPosts({
  postType,
  language,
  limit,
  sortDirection,
}: {
  postType: { id: string; code: string; clientPortalId: string };
  language: string;
  limit: number;
  sortDirection: "asc" | "desc";
}): Promise<Post[]> {
  if (
    !postType.id ||
    !postType.code ||
    !language ||
    !Number.isInteger(limit) ||
    limit < 1
  ) {
    throw new Error("CMS post type, language, and positive limit are required");
  }

  const client = getCmsClient();
  const portalId = getCmsPortalId();
  if (postType.clientPortalId !== portalId) {
    throw new Error(`Post type ${postType.code} does not belong to this portal`);
  }

  const variables: CpPostsVariables = {
    language,
    type: postType.code,
    status: "published",
    sortField: "publishedDate",
    sortDirection,
    limit,
  };
  const { data } = await client.query<CpPostsData, CpPostsVariables>({
    query: CP_POSTS,
    variables,
    context: cmsPublicQueryContext,
  });
  const posts = data?.cpPosts ?? [];

  for (const post of posts) {
    if (
      post.clientPortalId !== portalId ||
      post.customPostType?._id !== postType.id ||
      post.customPostType.code !== postType.code ||
      post.customPostType.clientPortalId !== portalId
    ) {
      throw new Error(
        `Custom post query ${postType.code} returned mismatched post ${post._id}`,
      );
    }
  }

  return posts;
}
