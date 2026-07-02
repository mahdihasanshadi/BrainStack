const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export function formatClassSlot(slot: {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  minAge: number;
  maxAge: number;
}): string {
  const day = DAY_NAMES[slot.dayOfWeek] ?? "?";
  return `${day} ${slot.startTime}–${slot.endTime} (ages ${slot.minAge}–${slot.maxAge})`;
}

export function formatDateTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function formatLabel(value: string): string {
  return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatBdt(amount: number): string {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function normalizeAdminLoginIdentifier(input: string): string {
  const trimmed = input.trim().toLowerCase();
  return trimmed === "admin" ? "admin" : trimmed;
}
