/**
 * Typed BrainStack API client.
 * Shapes mirrored from apps/api DTOs and response interfaces.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

// --- Types (from apps/api) ---

export interface CourseSummary {
  id: string;
  slug: string;
  title: string;
  ageMin: number;
  ageMax: number;
  shortDescription: string;
  durationMonths: number;
  displayOrder: number;
}

export interface CourseLevel {
  id: string;
  levelNumber: number;
  title: string;
  toolName: string;
  description: string;
  finalOutcome: string;
  durationMonths: number;
  learningOutcomes: string[];
}

export interface CourseDetail extends CourseSummary {
  levels: CourseLevel[];
}

export interface ClassSlotDates {
  dates: string[];
}

export interface ClassSlotTimeOption {
  id: string;
  startTime: string;
  endTime: string;
}

export interface ClassSlotTimes {
  date: string;
  slots: ClassSlotTimeOption[];
}

export type MediumOfInstruction =
  | "bangla_medium"
  | "english_medium"
  | "english_version"
  | "madrasah";

export type Gender = "male" | "female";

export type PreferredLanguage = "english" | "bangla";

export interface CreateRegistrationLeadPayload {
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: number;
  mediumOfInstruction: MediumOfInstruction;
  gender: Gender;
  preferredLanguage: PreferredLanguage;
  hasDevice: boolean;
  classSlotId: string;
  notes?: string;
  parentalConsent: true;
}

export interface RegistrationLead {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: number;
  mediumOfInstruction: MediumOfInstruction;
  gender: Gender;
  preferredLanguage: PreferredLanguage;
  hasDevice: boolean;
  classSlotId: string;
  notes: string | null;
  parentalConsent: boolean;
  consentGivenAt: string;
  createdAt: string;
}

interface ApiErrorBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

// --- Client ---

export class ApiError extends Error {
  readonly status: number;
  readonly body: ApiErrorBody | undefined;

  constructor(message: string, status: number, body?: ApiErrorBody) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export function getApiBaseUrl(): string {
  return API_BASE_URL.replace(/\/$/, "");
}

function formatErrorMessage(body: ApiErrorBody | undefined, status: number): string {
  if (!body?.message) {
    return `Request failed with status ${status}`;
  }

  if (Array.isArray(body.message)) {
    return body.message.join(", ");
  }

  return body.message;
}

async function parseJsonBody<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const body = await parseJsonBody<T | ApiErrorBody>(response);

  if (!response.ok) {
    throw new ApiError(
      formatErrorMessage(body as ApiErrorBody | undefined, response.status),
      response.status,
      body as ApiErrorBody | undefined,
    );
  }

  return body as T;
}

// --- Endpoint functions ---

export async function getCourses(): Promise<CourseSummary[]> {
  return apiFetch<CourseSummary[]>("/courses", { cache: "no-store" });
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail> {
  return apiFetch<CourseDetail>(`/courses/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
}

export async function getClassSlotDates(
  childAge: number,
): Promise<ClassSlotDates> {
  const params = new URLSearchParams({ childAge: String(childAge) });
  return apiFetch<ClassSlotDates>(`/class-slots/dates?${params.toString()}`);
}

export async function getClassSlotTimes(
  childAge: number,
  date: string,
): Promise<ClassSlotTimes> {
  const params = new URLSearchParams({
    childAge: String(childAge),
    date,
  });
  return apiFetch<ClassSlotTimes>(`/class-slots/times?${params.toString()}`);
}

export async function createRegistrationLead(
  payload: CreateRegistrationLeadPayload,
): Promise<RegistrationLead> {
  return apiFetch<RegistrationLead>("/registration-leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Alias used by the trial registration form. */
export const submitRegistrationLead = createRegistrationLead;
