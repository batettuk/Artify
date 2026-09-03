import "server-only";

import { getFormsClient } from "@/api/forms/server/client";
import {
  WIDGETS_SAVE_LEAD,
  type WidgetsSaveLeadData,
  type WidgetsSaveLeadVariables,
} from "@/graphql/forms/mutations/lead";

const CONTACT_FORM = {
  id: "7LK3Ze-UuAQ6GyFITgLAT",
  fields: {
    name: { id: "5x3fMw_HdlYIOcZMwdj0o", type: "text", text: "Нэр" },
    email: { id: "2O8Og9RNTyMHWBO6iLUFg", type: "text", text: "Имэйл" },
    message: { id: "mPPOEmbZQFLbFbrx7mF2f", type: "textarea", text: "Зурвас" },
  },
} as const;

type ContactLeadInput = {
  name: string;
  email: string;
  message: string;
  browserInfo: Record<string, string>;
};

export async function submitContactLead(input: ContactLeadInput): Promise<void> {
  const submissions = Object.entries(CONTACT_FORM.fields).map(([key, field]) => ({
    _id: field.id,
    type: field.type,
    text: field.text,
    value: input[key as keyof Pick<ContactLeadInput, "name" | "email" | "message">],
  }));

  const { data } = await getFormsClient().mutate<
    WidgetsSaveLeadData,
    WidgetsSaveLeadVariables
  >({
    mutation: WIDGETS_SAVE_LEAD,
    variables: {
      formId: CONTACT_FORM.id,
      submissions,
      browserInfo: input.browserInfo,
    },
  });

  const result = data?.widgetsSaveLead;
  if (!result || result.status !== "ok" || result.errors?.length) {
    throw new Error("Erxes rejected the contact form submission");
  }
}
