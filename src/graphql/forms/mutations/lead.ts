import { gql } from "@apollo/client";

export type FormFieldValueInput = {
  _id: string;
  type: string;
  text: string;
  value: string;
};

export type WidgetsSaveLeadVariables = {
  formId: string;
  submissions: FormFieldValueInput[];
  browserInfo: Record<string, string>;
};

export type WidgetsSaveLeadData = {
  widgetsSaveLead: {
    status: string;
    errors?: Array<{
      fieldId?: string | null;
      code?: string | null;
      text?: string | null;
    } | null> | null;
  } | null;
};

export const WIDGETS_SAVE_LEAD = gql`
  mutation WidgetsSaveLead(
    $formId: String!
    $submissions: [FieldValueInput]
    $browserInfo: JSON!
  ) {
    widgetsSaveLead(
      formId: $formId
      submissions: $submissions
      browserInfo: $browserInfo
    ) {
      status
      errors {
        fieldId
        code
        text
      }
    }
  }
`;
