type FieldKey =
  | "email"
  | "phone"
  | "parentName"
  | "childName"
  | "childAge"
  | "mediumOfInstruction"
  | "gender"
  | "preferredLanguage"
  | "hasDevice"
  | "parentalConsent"
  | "selectedDate"
  | "classSlotId";

const FIELD_STEP: Record<FieldKey, 1 | 2 | 3> = {
  email: 1,
  phone: 1,
  parentName: 2,
  childName: 2,
  childAge: 2,
  mediumOfInstruction: 2,
  gender: 2,
  preferredLanguage: 2,
  hasDevice: 2,
  parentalConsent: 2,
  selectedDate: 3,
  classSlotId: 3,
};

const MESSAGE_FIELD_RULES: Array<{ pattern: RegExp; field: FieldKey }> = [
  { pattern: /consent/i, field: "parentalConsent" },
  { pattern: /\bemail\b/i, field: "email" },
  { pattern: /\bphone\b/i, field: "phone" },
  { pattern: /parentname|parent name/i, field: "parentName" },
  { pattern: /childname|child name/i, field: "childName" },
  { pattern: /childage|child age|child's age/i, field: "childAge" },
  { pattern: /mediumofinstruction|medium of instruction/i, field: "mediumOfInstruction" },
  { pattern: /\bgender\b/i, field: "gender" },
  { pattern: /preferredlanguage|preferred language/i, field: "preferredLanguage" },
  { pattern: /hasdevice|device/i, field: "hasDevice" },
  { pattern: /\bdate\b/i, field: "selectedDate" },
  { pattern: /classslot|class time|class slot|selected class time/i, field: "classSlotId" },
];

function inferFieldFromMessage(message: string): FieldKey | null {
  for (const rule of MESSAGE_FIELD_RULES) {
    if (rule.pattern.test(message)) {
      return rule.field;
    }
  }

  return null;
}

export function mapApiValidationErrors(message: string | string[]): {
  step: 1 | 2 | 3;
  fields: Partial<Record<FieldKey, string>>;
  general?: string;
} {
  const messages = Array.isArray(message) ? message : [message];
  const fields: Partial<Record<FieldKey, string>> = {};
  let step: 1 | 2 | 3 = 3;
  const unmatched: string[] = [];

  for (const entry of messages) {
    const field = inferFieldFromMessage(entry);

    if (field) {
      fields[field] = entry;
      step = Math.min(step, FIELD_STEP[field]) as 1 | 2 | 3;
    } else {
      unmatched.push(entry);
    }
  }

  return {
    step,
    fields,
    general: unmatched.length > 0 ? unmatched.join(" ") : undefined,
  };
}

export type { FieldKey };
