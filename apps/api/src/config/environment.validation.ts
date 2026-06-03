import * as Joi from "joi";

export const environmentValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3001),

  DATABASE_URL: Joi.string()
    .uri({ scheme: ["postgres", "postgresql"] })
    .required()
    .messages({
      "string.uri": "DATABASE_URL must be a valid PostgreSQL connection URI",
    }),

  JWT_SECRET: Joi.string().min(32).required().messages({
    "string.min": "JWT_SECRET must be at least 32 characters",
  }),

  JWT_EXPIRY: Joi.string()
    .pattern(/^\d+[smhd]$|^\d+$/)
    .required()
    .messages({
      "string.pattern.base":
        'JWT_EXPIRY must be a duration (e.g. "15m", "7d") or seconds (e.g. "3600")',
    }),

  REDIS_URL: Joi.string()
    .uri({ scheme: ["redis", "rediss"] })
    .required()
    .messages({
      "string.uri": "REDIS_URL must be a valid Redis connection URI",
    }),

  REDIS_DEFAULT_TTL: Joi.number().integer().min(1).default(3600),

  STRIPE_SECRET_KEY: Joi.string()
    .pattern(/^sk_(test|live)_/)
    .required()
    .messages({
      "string.pattern.base":
        "STRIPE_SECRET_KEY must start with sk_test_ or sk_live_",
    }),

  STRIPE_WEBHOOK_SECRET: Joi.string()
    .pattern(/^whsec_/)
    .required()
    .messages({
      "string.pattern.base": "STRIPE_WEBHOOK_SECRET must start with whsec_",
    }),

  FRONTEND_URL: Joi.string().uri().required().messages({
    "string.uri": "FRONTEND_URL must be a valid URL (e.g. http://localhost:3000)",
  }),

  SMTP_HOST: Joi.string().hostname().required(),

  SMTP_PORT: Joi.number().port().required(),

  SMTP_USER: Joi.string().min(1).required(),

  SMTP_PASS: Joi.string().min(1).required(),

  SMTP_FROM: Joi.string()
    .custom((value: string, helpers) => {
      const match = /<([^>]+)>/.exec(value);
      const address = match ? match[1].trim() : value.trim();
      const { error } = Joi.string().email().validate(address);

      if (error) {
        return helpers.error("any.invalid");
      }

      return value;
    })
    .required()
    .messages({
      "any.invalid":
        'SMTP_FROM must be a valid email or "Display Name <email@example.com>"',
    }),
});
