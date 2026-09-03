"use server";

import { headers } from "next/headers";
import { submitContactLead } from "@/api/forms/server/commands/submit-contact-lead";
import type {
  ContactFormField,
  ContactFormState,
} from "@/api/forms/types/public";
import { routing } from "@/i18n/routing";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

function readText(formData: FormData, key: ContactFormField): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().normalize("NFC") : "";
}

export async function submitContactForm(
  locale: string,
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = formData.get("website");
  if (typeof honeypot !== "string" || honeypot.length > 0) {
    return { status: "success", fieldErrors: {} };
  }

  const name = readText(formData, "name");
  const email = readText(formData, "email");
  const message = readText(formData, "message");
  const fieldErrors: ContactFormState["fieldErrors"] = {};

  if (!name || name.length > 120 || /[\r\n]/.test(name) || CONTROL_CHARACTERS.test(name)) {
    fieldErrors.name = true;
  }
  if (
    !email ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email) ||
    CONTROL_CHARACTERS.test(email)
  ) {
    fieldErrors.email = true;
  }
  if (!message || message.length > 4000 || CONTROL_CHARACTERS.test(message)) {
    fieldErrors.message = true;
  }
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return { status: "error", fieldErrors: {} };
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "invalid", fieldErrors };
  }

  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin")?.slice(0, 300) ?? "";
  const userAgent = requestHeaders.get("user-agent")?.slice(0, 500) ?? "";

  try {
    await submitContactLead({
      name,
      email,
      message,
      browserInfo: {
        url: `/${locale}/contact`,
        hostname: origin,
        language: locale,
        userAgent,
      },
    });
    return { status: "success", fieldErrors: {} };
  } catch {
    return { status: "error", fieldErrors: {} };
  }
}
