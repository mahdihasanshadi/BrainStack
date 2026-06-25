const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizePhone(value: string): string {
  return value.trim();
}

export const CHILD_AGE_OPTIONS = Array.from({ length: 9 }, (_, index) => 6 + index);

export const MEDIUM_OF_INSTRUCTION_OPTIONS = [
  { value: "bangla_medium", label: "Bangla medium" },
  { value: "english_medium", label: "English medium" },
  { value: "english_version", label: "English version" },
  { value: "madrasah", label: "Madrasah" },
] as const;

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const;

export const PREFERRED_LANGUAGE_OPTIONS = [
  { value: "english", label: "English" },
  { value: "bangla", label: "Bangla" },
] as const;

export function formatDisplayDate(date: string): string {
  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTimeRange(startTime: string, endTime: string): string {
  return `${startTime} – ${endTime}`;
}
