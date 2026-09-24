import "server-only";

import { CP_PAGES } from "@/graphql/cms/queries/page";
import type {
  CpPagesData,
  CpPagesVariables,
} from "@/graphql/cms/queries/page";
import {
  cmsPublicQueryContext,
  getCmsClient,
} from "@/api/cms/server/client";

/**
 * Slugs of all CMS pages in the portal (any status filter is backend-side;
 * cpPages returns the portal's published page set). Used by the catch-all
 * route's generateStaticParams.
 */
export async function getPageSlugs(language: string): Promise<string[]> {
  if (!language) {
    throw new Error("CMS language is required");
  }

  const variables: CpPagesVariables = { language };
  const { data } = await getCmsClient().query<CpPagesData, CpPagesVariables>({
    query: CP_PAGES,
    variables,
    context: cmsPublicQueryContext,
  });

  return (data?.cpPages ?? []).flatMap((page) =>
    page.slug ? [page.slug] : [],
  );
}

export interface CmsPageListItemDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnailUrl: string | null;
}

export async function getPages(language: string): Promise<CmsPageListItemDto[]> {
  if (!language) {
    throw new Error("CMS language is required");
  }

  const variables: CpPagesVariables = { language };
  const { data } = await getCmsClient().query<CpPagesData, CpPagesVariables>({
    query: CP_PAGES,
    variables,
    context: cmsPublicQueryContext,
  });

  return (data?.cpPages ?? []).map((page) => ({
    id: page._id,
    name: page.name || "",
    slug: page.slug || "",
    description: page.description ? page.description.replace(/<[^>]+>/g, "").trim() : "",
    thumbnailUrl: page.thumbnail?.url ?? null,
  }));
}

