import "server-only";

import { cache } from "react";
import { CP_PAGE_DETAIL } from "@/graphql/cms/queries/page";
import type {
  CpPageDetailData,
  CpPageDetailVariables,
} from "@/graphql/cms/queries/page";
import {
  cmsPublicQueryContext,
  getCmsClient,
} from "@/api/cms/server/client";
import type { CmsPageDto } from "@/api/cms/types/public";

export const getPageDetail = cache(
  async ({ slug, language }: Required<CpPageDetailVariables>): Promise<CmsPageDto | null> => {
    if (!slug || !language) {
      throw new Error("CMS page slug and language are required");
    }

    const { data } = await getCmsClient().query<
      CpPageDetailData,
      CpPageDetailVariables
    >({
      query: CP_PAGE_DETAIL,
      variables: { slug, language },
      context: cmsPublicQueryContext,
    });

    const page = data?.cpCmsPageDetail;
    if (!page?.name || !page.slug) return null;

    return {
      id: page._id,
      name: page.name,
      slug: page.slug,
      description: page.description ?? null,
      content: page.content ?? null,
      thumbnailUrl: page.thumbnail?.url ?? null,
      customFieldsData: page.customFieldsData ?? null,
      customFieldsMap: page.customFieldsMap ?? null,
    };
  },
);
