import "server-only";

import { CP_MENUS } from "@/graphql/cms/queries/menu";
import type {
  CpMenusData,
  CpMenusVariables,
} from "@/graphql/cms/queries/menu";
import {
  cmsPublicQueryContext,
  getCmsClient,
} from "@/api/cms/server/client";
import type { MenuItemDto } from "@/api/cms/types/public";

export type CmsMenuKind = "header" | "footer";

/**
 * CMS-managed navigation for one menu kind. cpMenus returns a flat,
 * unordered array; items are sorted by their backend `order` here.
 */
export async function getMenu({
  kind,
  language,
}: {
  kind: CmsMenuKind;
  language: string;
}): Promise<MenuItemDto[]> {
  if (!kind || !language) {
    throw new Error("CMS menu kind and language are required");
  }

  const variables: CpMenusVariables = { kind, language };
  const { data } = await getCmsClient().query<CpMenusData, CpMenusVariables>({
    query: CP_MENUS,
    variables,
    context: cmsPublicQueryContext,
  });

  return (data?.cpMenus ?? [])
    .filter((item) => item.label && item.url)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({
      id: item._id,
      label: item.label as string,
      url: item.url as string,
      external: /^https?:\/\//.test(item.url as string),
    }));
}
