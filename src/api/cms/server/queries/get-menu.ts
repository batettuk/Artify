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

const DEFAULT_MENUS: Record<string, Record<CmsMenuKind, MenuItemDto[]>> = {
  mn: {
    header: [
      { id: "home", label: "Нүүр", url: "/", external: false },
      { id: "products", label: "Бүтээгдэхүүн", url: "/products", external: false },
      { id: "blog", label: "Мэдээ", url: "/blog", external: false },
      { id: "contact", label: "Холбоо барих", url: "/contact", external: false },
    ],
    footer: [
      { id: "home", label: "Нүүр", url: "/", external: false },
      { id: "products", label: "Бүтээгдэхүүн", url: "/products", external: false },
      { id: "blog", label: "Мэдээ", url: "/blog", external: false },
      { id: "contact", label: "Холбоо барих", url: "/contact", external: false },
    ],
  },
  en: {
    header: [
      { id: "home", label: "Home", url: "/", external: false },
      { id: "products", label: "Products", url: "/products", external: false },
      { id: "blog", label: "Blog", url: "/blog", external: false },
      { id: "contact", label: "Contact", url: "/contact", external: false },
    ],
    footer: [
      { id: "home", label: "Home", url: "/", external: false },
      { id: "products", label: "Products", url: "/products", external: false },
      { id: "blog", label: "Blog", url: "/blog", external: false },
      { id: "contact", label: "Contact", url: "/contact", external: false },
    ],
  },
};

/**
 * CMS-managed navigation for one menu kind. If CMS returns empty or fails,
 * resilient default navigation is automatically provided.
 */
export async function getMenu({
  kind,
  language,
}: {
  kind: CmsMenuKind;
  language: string;
}): Promise<MenuItemDto[]> {
  const fallback = (DEFAULT_MENUS[language] || DEFAULT_MENUS.mn)[kind] || [];

  if (!kind || !language) {
    return fallback;
  }

  try {
    const variables: CpMenusVariables = { kind, language };
    const { data } = await getCmsClient().query<CpMenusData, CpMenusVariables>({
      query: CP_MENUS,
      variables,
      context: cmsPublicQueryContext,
    });

    const items = (data?.cpMenus ?? [])
      .filter((item) => item.label && item.url)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((item) => ({
        id: item._id,
        label: item.label as string,
        url: item.url as string,
        external: /^https?:\/\//.test(item.url as string),
      }));

    return items.length > 0 ? items : fallback;
  } catch (error) {
    console.warn(`[getMenu] Failed fetching ${kind} menu for ${language}, using fallback:`, error);
    return fallback;
  }
}
