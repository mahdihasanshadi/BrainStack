export const TRIAL_REGISTRATION_PATH = "/trial-class-registration";
export const PARENT_MEETING_PATH = "/webinar";
export const ASSESSMENT_PATH = "/assessment";

export const PRIMARY_NAV_LINKS = [
  { href: "/programs", label: "Programs" },
  { href: PARENT_MEETING_PATH, label: "Parent Meeting" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
] as const;

export const TRIAL_CTA = {
  href: TRIAL_REGISTRATION_PATH,
  label: "Book Free Trial",
} as const;

export const PARENT_MEETING_CTA = {
  href: PARENT_MEETING_PATH,
  label: "Join Parent Meeting",
} as const;

export const COURSES_SECTION_ID = "courses";
