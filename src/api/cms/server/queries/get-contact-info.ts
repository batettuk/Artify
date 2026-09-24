import "server-only";

import { cache } from "react";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
import { getPostBySlug } from "@/api/cms/server/queries/get-post-by-slug";
import {
  decodeCustomFields,
  getMappedStringValue,
  getStringValue,
} from "@/api/cms/server/custom-fields";
import type { ContactInfoDto } from "@/api/cms/types/public";

function validateSocialUrl(
  value: string | null,
  service: string,
  domain: string,
): string | null {
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Contact ${service} URL is invalid`);
  }

  if (
    url.protocol !== "https:" ||
    (url.hostname !== domain && !url.hostname.endsWith(`.${domain}`))
  ) {
    throw new Error(`Contact ${service} URL must use https://${domain}`);
  }

  return value;
}

/**
 * Canonical contact info (address/phone/email/hours/slogan/description)
 * fetched dynamically from the CMS "brand-info" post and "contact" page.
 */
export const getContactInfo = cache(
  async (language: string): Promise<ContactInfoDto> => {
    if (!language) throw new Error("CMS language is required");

    const [page, brandPost] = await Promise.all([
      getPageDetail({ slug: "contact", language }).catch(() => null),
      getPostBySlug({ slug: "brand-info", language }).catch(() => null),
    ]);

    let parsedAddress = "";
    let parsedPhone = "";
    let parsedEmail = "";
    let parsedHours = "";
    let parsedSlogan = brandPost?.excerpt ?? "";
    let parsedDescription = "";

    if (brandPost?.content) {
      const lines = brandPost.content.split("\n");
      for (const rawLine of lines) {
        const line = rawLine.trim();
        const colonIdx = line.indexOf(":");
        if (colonIdx === -1) continue;
        const key = line.slice(0, colonIdx).trim().toLowerCase();
        const val = line.slice(colonIdx + 1).trim();

        if (key.includes("address") || key.includes("хаяг")) {
          parsedAddress = val;
        } else if (key.includes("phone") || key.includes("утас")) {
          parsedPhone = val;
        } else if (key.includes("email") || key.includes("шуудан")) {
          parsedEmail = val;
        } else if (key.includes("hour") || key.includes("цаг")) {
          parsedHours = val;
        } else if (key.includes("slogan") || key.includes("уриа")) {
          parsedSlogan = val;
        } else if (key.includes("description") || key.includes("тайлбар")) {
          parsedDescription = val;
        }
      }
    }

    const fields = page ? decodeCustomFields(page.customFieldsData, "contact-fields") : {};
    const address = parsedAddress || getStringValue(fields, "contactAddress") || "";
    const phone = parsedPhone || getStringValue(fields, "contactPhone") || "";
    const email = parsedEmail || getStringValue(fields, "contactEmail") || "";
    const hours = parsedHours || getStringValue(fields, "contactHours") || "";

    const facebook = page
      ? validateSocialUrl(
          getMappedStringValue(page.customFieldsMap, "contact-fields", "facebook"),
          "Facebook",
          "facebook.com",
        )
      : null;
    const instagram = page
      ? validateSocialUrl(
          getMappedStringValue(page.customFieldsMap, "contact-fields", "instagram"),
          "Instagram",
          "instagram.com",
        )
      : null;

    const slogan = parsedSlogan || "";
    const brandDescription = parsedDescription || "";

    return { address, phone, email, hours, facebook, instagram, slogan, brandDescription };
  },
);

