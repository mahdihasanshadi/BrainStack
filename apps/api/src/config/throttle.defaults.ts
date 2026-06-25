export const THROTTLE_LOGIN = "login";

export const THROTTLE_REGISTER = "register";

export const THROTTLE_REGISTRATION_LEADS = "registration-leads";

export const THROTTLE_NAMES = [
  THROTTLE_LOGIN,
  THROTTLE_REGISTER,
  THROTTLE_REGISTRATION_LEADS,
] as const;

export const THROTTLE_DEFAULTS = {
  login: {
    limit: 5,
    ttlSeconds: 60,
  },
  register: {
    limit: 5,
    ttlSeconds: 60,
  },
  registrationLeads: {
    limit: 10,
    ttlSeconds: 60,
  },
} as const;

export const THROTTLE_TOO_MANY_REQUESTS_MESSAGE =
  "Too many requests, please try again later.";
