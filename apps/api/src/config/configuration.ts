import { THROTTLE_DEFAULTS } from "./throttle.defaults";

export interface AppConfig {
  port: number;
  frontendUrl: string;
}

export interface DatabaseConfig {
  url: string;
}

export interface JwtConfig {
  secret: string;
  expiry: string;
}

export interface RedisConfig {
  url: string;
  defaultTtlSeconds: number;
}

export interface StripeConfig {
  secretKey?: string;
  webhookSecret?: string;
}

export interface PaymentsConfig {
  enabled: boolean;
}

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

export interface ThrottleRouteConfig {
  limit: number;
  ttlMs: number;
}

export interface ThrottleConfig {
  login: ThrottleRouteConfig;
  register: ThrottleRouteConfig;
  registrationLeads: ThrottleRouteConfig;
}

export interface Configuration {
  app: AppConfig;
  database: DatabaseConfig;
  jwt: JwtConfig;
  redis: RedisConfig;
  payments: PaymentsConfig;
  stripe: StripeConfig;
  smtp: SmtpConfig;
  throttle: ThrottleConfig;
}

function envFlag(name: string, defaultValue = false): boolean {
  const value = process.env[name];

  if (value === undefined || value === "") {
    return defaultValue;
  }

  return ["true", "1", "yes", "on"].includes(value.toLowerCase());
}

function optionalEnv(name: string): string | undefined {
  const value = process.env[name];
  return value === undefined || value === "" ? undefined : value;
}

function throttleRouteConfig(
  limitEnv: string,
  ttlEnv: string,
  defaults: { limit: number; ttlSeconds: number },
): ThrottleRouteConfig {
  const limit = Number(process.env[limitEnv]);
  const ttlSeconds = Number(process.env[ttlEnv]);

  return {
    limit:
      Number.isInteger(limit) && limit > 0 ? limit : defaults.limit,
    ttlMs:
      Number.isInteger(ttlSeconds) && ttlSeconds > 0
        ? ttlSeconds * 1000
        : defaults.ttlSeconds * 1000,
  };
}

export default (): Configuration => ({
  app: {
    port: Number(process.env.PORT) || 3001,
    frontendUrl: process.env.FRONTEND_URL as string,
  },
  database: {
    url: process.env.DATABASE_URL as string,
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiry: process.env.JWT_EXPIRY as string,
  },
  redis: {
    url: process.env.REDIS_URL as string,
    defaultTtlSeconds: Number(process.env.REDIS_DEFAULT_TTL) || 3600,
  },
  payments: {
    enabled: envFlag("PAYMENTS_ENABLED", false),
  },
  stripe: {
    secretKey: optionalEnv("STRIPE_SECRET_KEY"),
    webhookSecret: optionalEnv("STRIPE_WEBHOOK_SECRET"),
  },
  smtp: {
    host: process.env.SMTP_HOST as string,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
    from: process.env.SMTP_FROM as string,
  },
  throttle: {
    login: throttleRouteConfig(
      "THROTTLE_LOGIN_LIMIT",
      "THROTTLE_LOGIN_TTL_SECONDS",
      THROTTLE_DEFAULTS.login,
    ),
    register: throttleRouteConfig(
      "THROTTLE_REGISTER_LIMIT",
      "THROTTLE_REGISTER_TTL_SECONDS",
      THROTTLE_DEFAULTS.register,
    ),
    registrationLeads: throttleRouteConfig(
      "THROTTLE_REGISTRATION_LEADS_LIMIT",
      "THROTTLE_REGISTRATION_LEADS_TTL_SECONDS",
      THROTTLE_DEFAULTS.registrationLeads,
    ),
  },
});
