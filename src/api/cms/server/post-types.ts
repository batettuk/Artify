import "server-only";

import { getCmsPortalId } from "@/api/cms/server/client";
import { CmsConfigurationError } from "@/api/cms/server/errors";

/**
 * Portal-bound verified post-type registry.
 * Mirrors docs/erxes-integration/contract.json (admin cmsCustomPostTypes
 * lookup, 2026-09-03). Keep definition id, write value, query value, and
 * returned identity separate per the contract preflight.
 */
const cmsPostTypes = {
  news: {
    id: "Y__opbF6UVEEDxdXztIiH",
    code: "news",
    clientPortalId: "zT-scbXDlh_netwVQv30X",
  },
  tusul: {
    id: "yG5Hul_XjnWnLEdqKlofr",
    code: "tusul",
    clientPortalId: "zT-scbXDlh_netwVQv30X",
  },
  khamtragch: {
    id: "ThM013IyA-a3EB1xgCF-B",
    code: "khamtragch",
    clientPortalId: "zT-scbXDlh_netwVQv30X",
  },
  buteegdekhuun: {
    id: "gdR_QsZvWEtilt1InTbGK",
    code: "buteegdekhuun",
    clientPortalId: "zT-scbXDlh_netwVQv30X",
  },
} as const;

export type CmsPostTypeCode = keyof typeof cmsPostTypes;

export function getVerifiedPostType(code: CmsPostTypeCode) {
  const definition = cmsPostTypes[code];

  if (definition.clientPortalId !== getCmsPortalId()) {
    throw new CmsConfigurationError(
      "CUSTOM_POST_TYPE_NOT_FOUND",
      `Verified post type ${code} belongs to a different client portal`,
    );
  }

  return definition;
}
