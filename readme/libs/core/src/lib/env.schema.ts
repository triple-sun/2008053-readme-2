import * as Joi from 'joi';

export const getSchema = (defaultPort: number) => Joi.object({
  MONGO_DB: Joi
    .string()
    .required(),
  MONGO_HOST: Joi
    .string()
    .hostname()
    .required(),
  MONGO_PORT: Joi
    .number()
    .port()
    .default(defaultPort)
    .required(),
  MONGO_USER: Joi
    .string()
    .required(),
  MONGO_PASS: Joi
    .string(),
  MONGO_AUTH_BASE: Joi
    .string()
    .required()
});
