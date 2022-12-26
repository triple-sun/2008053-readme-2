import { getAppEnvSchema, Port } from "@readme/core";
import * as Joi from 'joi';

const envSchema = {
  MAIL_PORT: Joi
    .number()
    .port()
    .default(Port.MailDefault)
    .required(),
  MAIL_HOST: Joi
    .string()
    .hostname()
    .required(),
  MAIL_USER: Joi
    .string()
    .required(),
  MAIL_PASS: Joi
    .string()
    .required(),
  MAIL_FROM: Joi
    .string()
    .required()
}

export default getAppEnvSchema(Port.NotifyAPIDefault, envSchema)
