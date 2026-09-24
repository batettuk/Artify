import "server-only";

import { getStaticApolloClient } from "@/lib/apollo/server-client";

export function getCmsClient() {
  return getStaticApolloClient();
}

export function getCmsPortalId() {
  const portalId = process.env.ERXES_CLIENT_PORTAL_ID;

  if (!portalId) {
    throw new Error("ERXES_CLIENT_PORTAL_ID is required for CMS access");
  }

  return portalId;
}

// Freshness policy: all public CMS reads revalidate every 60s.
// Only confirmed-public DTOs (pages, posts, menus) pass through this context.
export const cmsPublicQueryContext = {
  fetchOptions:
    process.env.NODE_ENV !== "production"
      ? { cache: "no-store" }
      : { next: { revalidate: 60 } },
};
