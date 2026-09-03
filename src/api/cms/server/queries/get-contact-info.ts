import "server-only";

import { cache } from "react";
import { getPageDetail } from "@/api/cms/server/queries/get-page-detail";
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
 * Canonical contact info (address/phone/email) from the "contact" CMS page
 * custom fields. Shared by the contact form and the footer.
 */
export const getContactInfo = cache(
  async (language: string): Promise<ContactInfoDto> => {
    if (!language) throw new Error("CMS language is required");

    const page = await getPageDetail({ slug: "contact", language });
    if (!page) throw new Error('CMS page "contact" is missing');

    const fields = decodeCustomFields(page.customFieldsData, "contact-fields");
    const address = getStringValue(fields, "contactAddress");
    const phone = getStringValue(fields, "contactPhone");
    const email = getStringValue(fields, "contactEmail");
    if (!address || !phone || !email) {
      throw new Error("Contact page custom fields are missing in erxes CMS");
    }

    const facebook = validateSocialUrl(
      getMappedStringValue(page.customFieldsMap, "contact-fields", "facebook"),
      "Facebook",
      "facebook.com",
    );
    const instagram = validateSocialUrl(
      getMappedStringValue(page.customFieldsMap, "contact-fields", "instagram"),
      "Instagram",
      "instagram.com",
    );

    return { address, phone, email, facebook, instagram };
  },
);
