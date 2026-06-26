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
  longDescription: string | null;
  durationMonths: number;
  displayOrder: number;
  priceBdt: number;
  originalPriceBdt: number;
  isPurchasable: boolean;
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

  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("brainstack_access_token");
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

export interface CreateParentMeetingLeadPayload {
  parentName: string;
  email: string;
  phone: string;
  childName?: string;
  childAge: number;
  questions?: string;
  consent: boolean;
}

export interface ParentMeetingLead {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childName: string | null;
  childAge: number;
  questions: string | null;
  consentGivenAt: string;
  createdAt: string;
}

export interface SubmitKidAssessmentPayload {
  parentEmail?: string;
  childAge: number;
  answers: Record<string, string>;
}

export interface KidAssessmentResult {
  id: string;
  childAge: number;
  score: number;
  maxScore: number;
  readinessLevel: "developing" | "ready" | "advanced";
  recommendation: string;
  suggestedCourseSlug: string;
}

export interface PaymentMethodInfo {
  id: string;
  label: string;
  description: string;
}

export interface CreateCheckoutSessionPayload {
  courseSlug: string;
  email: string;
  phone?: string;
  parentName?: string;
  paymentMethod?: "card" | "bkash" | "nagad";
}

export interface CheckoutSessionResponse {
  sessionId: string;
  checkoutUrl: string;
  courseTitle: string;
  priceBdt: number;
  originalPriceBdt: number;
  discountPercent: number;
  paymentMethods: PaymentMethodInfo[];
  mode: "stripe" | "demo";
}

export interface CheckoutSessionStatus {
  sessionId: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  courseTitle: string;
  courseSlug: string;
  email: string;
  amountBdt: number;
  originalPriceBdt: number;
  provider: "stripe" | "demo";
  completedAt: string | null;
  parentName: string | null;
  phone: string | null;
}

export async function submitParentMeetingLead(
  payload: CreateParentMeetingLeadPayload,
): Promise<ParentMeetingLead> {
  return apiFetch<ParentMeetingLead>("/parent-meeting-leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitKidAssessment(
  payload: SubmitKidAssessmentPayload,
): Promise<KidAssessmentResult> {
  return apiFetch<KidAssessmentResult>("/assessments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getPaymentMethods(): Promise<PaymentMethodInfo[]> {
  return apiFetch<PaymentMethodInfo[]>("/payments/methods");
}

export async function createCheckoutSession(
  payload: CreateCheckoutSessionPayload,
): Promise<CheckoutSessionResponse> {
  return apiFetch<CheckoutSessionResponse>("/payments/checkout-session", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getCheckoutSessionStatus(
  sessionId: string,
): Promise<CheckoutSessionStatus> {
  return apiFetch<CheckoutSessionStatus>(
    `/payments/session/${encodeURIComponent(sessionId)}`,
  );
}

export interface SafeUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  onboardingCompleted: boolean;
  assessmentResult: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: SafeUser;
}

export async function getProfile(): Promise<SafeUser> {
  return apiFetch<SafeUser>("/auth/me");
}

export async function loginUser(payload: any): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerUser(payload: any): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
