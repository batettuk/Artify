import "server-only";

/**
 * Verified custom-field identity map (read back from the created field
 * groups, 2026-09-02; mirrors docs/erxes-integration/contract.json).
 * The deployed backend keys every customFieldsData entry by field `_id`
 * in the shape [{ field: "<fieldId>", value: ... }].
 */
const FIELD_IDS = {
  "product-fields": {
    website: "zS5QQ5qFAOFIKk6LaHjPn",
  },
  "home-ceo-fields": {
    ceoRole: "6RT8VrZ9LgFW9z_0nyyqM",
  },
  "contact-fields": {
    contactAddress: "KHSm9uVf92K8OMK5VPRq8",
    contactPhone: "xSEGclyeHihQtg-Yv8ZXf",
    contactEmail: "QjE7X5AYQKP4UqP8jPD3f",
    facebook: "field_1788417270275",
    instagram: "field_1788417279738",
  },
  "about-page-fields": {
    aboutLabel: "vZNYm2cdA9pRtxnlS0n-I",
    aboutHeading: "_cd-UBTHIeHSW4S_d-8nC",
    aboutIntro: "Zgr6T8WYm6zBF_PJTuYC5",
    ubTitle: "tm_EK_D1HrMA5Z5PNLF32",
    ubIntro: "BrTVoSwmN6tefbFsizgUP",
    ubPoints: "hi8QdnHTW8MINvyCYaq4n",
    ubBold: "MgYDD1W7WCFqFg_qZPVXj",
    ubBody: "lEz2kCIwnz1UFlDRkC7zK",
    smartTitle: "D6d8ZR6r0u8NqTFMjzTQ6",
    smartBody1: "O-TCBcGq3H1iJvHg0VvbB",
    smartBody2: "iys3s1VMlt6TzMfs0sa-U",
    solutionTitle: "-KJ6pCHUlpy4wXIYyJsX5",
    solutionElements: "CH9AxkYvNpcyIN8021-IN",
    solutionBody: "5IR5ZHdWuiGfzyh98mDES",
    partnerTitle: "jJVw22f2LF0Wpt6qQoht9",
    partnerBody1: "HrXk_m-1v8SoG3hfVPBLa",
    partnerBody2: "lSvRUdpIFdPqSaRhsnMf2",
    aboutClosing: "mmUScD4vLpo8j6jgmGrYy",
  },
} as const;

export type CustomFieldGroupCode = keyof typeof FIELD_IDS;
export type CustomFieldKey<G extends CustomFieldGroupCode> =
  keyof (typeof FIELD_IDS)[G];

type FieldEntry = { field?: unknown; value?: unknown };

/**
 * Decode one record's customFieldsData into semantic keys for one verified
 * field group. Unknown field ids are ignored; only string/boolean values
 * are returned (plain-text/boolean policy).
 */
export function decodeCustomFields<G extends CustomFieldGroupCode>(
  data: unknown,
  groupCode: G,
): Partial<Record<CustomFieldKey<G>, string | boolean>> {
  const idToKey = new Map<string, string>(
    Object.entries(FIELD_IDS[groupCode]).map(([key, id]) => [id, key]),
  );
  const result: Record<string, string | boolean> = {};

  const entries: FieldEntry[] = Array.isArray(data) ? (data as FieldEntry[]) : [];
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    const key = typeof entry.field === "string" ? idToKey.get(entry.field) : undefined;
    if (!key) continue;
    const value = entry.value;
    if (typeof value === "string" || typeof value === "boolean") {
      result[key] = value;
    }
  }

  return result as Partial<Record<CustomFieldKey<G>, string | boolean>>;
}

export function getStringValue(
  fields: Partial<Record<string, string | boolean>>,
  key: string,
): string | null {
  const value = fields[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function getMappedStringValue<G extends CustomFieldGroupCode>(
  data: unknown,
  groupCode: G,
  key: CustomFieldKey<G>,
): string | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;

  const group = (data as Record<string, unknown>)[groupCode];
  if (!group || typeof group !== "object" || Array.isArray(group)) return null;

  const value = (group as Record<string, unknown>)[key as string];
  return typeof value === "string" && value.length > 0 ? value : null;
}
