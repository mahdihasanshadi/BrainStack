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
  secretKey: string;
  webhookSecret: string;
}

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

export interface Configuration {
  app: AppConfig;
  database: DatabaseConfig;
  jwt: JwtConfig;
  redis: RedisConfig;
  stripe: StripeConfig;
  smtp: SmtpConfig;
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
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY as string,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
  },
  smtp: {
    host: process.env.SMTP_HOST as string,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
    from: process.env.SMTP_FROM as string,
  },
});
