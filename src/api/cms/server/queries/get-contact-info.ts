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
    const rawAddress = getStringValue(fields, "contactAddress");
    const address = language === "en"
      ? (rawAddress && !/[а-яА-ЯөӨүҮ]/.test(rawAddress) ? rawAddress : "Ulaanbaatar, Mongolia")
      : (rawAddress || "Улаанбаатар хот, Монгол улс");

    const rawPhone = getStringValue(fields, "contactPhone");
    const isOldPhone = !rawPhone || rawPhone.includes("7770155") || rawPhone.includes("7770255") || (rawPhone.includes("7710") && !rawPhone.includes("77710"));
    const phone = isOldPhone ? "+976 77710 155" : rawPhone;

    const email = getStringValue(fields, "contactEmail") || "info@artifybrand.com";
    const rawHours = getStringValue(fields, "contactHours");
    const hours = language === "en"
      ? (rawHours && !/[а-яА-ЯөӨүҮ]/.test(rawHours) ? rawHours : "Mon – Fri: 09:00 – 18:00 (GMT+8)")
      : (rawHours || "Даваа – Баасан: 09:00 – 18:00 (GMT+8)");

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

    const customMap = page.customFieldsMap as Record<string, Record<string, unknown>> | null;
    const rawSlogan =
      (customMap?.["contact-fields"]?.["slogan"] as string | undefined) ||
      (customMap?.["contact-fields"]?.["tagline"] as string | undefined) ||
      null;
    const slogan = rawSlogan || "Crafting The Quality Of Life";

    const rawBrandDesc =
      (customMap?.["contact-fields"]?.["brandDescription"] as string | undefined) ||
      (customMap?.["contact-fields"]?.["footerDescription"] as string | undefined) ||
      null;
    const brandDescription =
      rawBrandDesc ||
      (language === "mn"
        ? "Инженерийн нарийн тооцоолол, ухаалаг агааржуулалт, захиалгат ховор материалын цогц шийдлээр амьдралын чанарыг урлана."
        : "Crafting the quality of life through precise engineering, intelligent ventilation, and bespoke rare architectural materials.");

    return { address, phone, email, hours, facebook, instagram, slogan, brandDescription };
  },
);
