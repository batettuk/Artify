import "server-only";

import { CP_POST } from "@/graphql/cms/queries/post";
import type {
  CpPostData,
  CpPostVariables,
} from "@/graphql/cms/queries/post";
import {
  cmsPublicQueryContext,
  getCmsClient,
  getCmsPortalId,
} from "@/api/cms/server/client";
import { getVerifiedPostType } from "@/api/cms/server/post-types";
import type { BlogPostDetailDto } from "@/api/cms/types/public";

/**
 * Public post detail for real detail-route rendering. The researched backend
 * increments the view count on cpPost, so this must never be used for audits,
 * collision checks, or migration read-back.
 */
export async function getPostDetail({
  slug,
  language,
}: {
  slug: string;
  language: string;
}): Promise<BlogPostDetailDto | null> {
  if (!slug || !language) {
    throw new Error("CMS post slug and language are required");
  }

  const postType = getVerifiedPostType("news");
  const portalId = getCmsPortalId();

  const { data } = await getCmsClient().query<CpPostData, CpPostVariables>({
    query: CP_POST,
    variables: { slug, language },
    context: cmsPublicQueryContext,
  });

  const post = data?.cpPost;
  if (!post) return null;

  if (!post.title || !post.slug) {
    throw new Error(`Published post ${post._id} is missing title or slug`);
  }
  if (
    post.clientPortalId !== portalId ||
    post.customPostType?._id !== postType.id ||
    post.customPostType.code !== postType.code
  ) {
    throw new Error(`Post detail returned an unexpected post type for ${post._id}`);
  }

  return {
    id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? null,
    content: post.content ?? null,
    publishedDate: post.publishedDate ?? null,
    thumbnailUrl: post.thumbnail?.url ?? null,
  };
}
