export type ContactFormField = "name" | "email" | "message";

export type ContactFormState = {
  status: "idle" | "invalid" | "success" | "error";
  fieldErrors: Partial<Record<ContactFormField, true>>;
};
