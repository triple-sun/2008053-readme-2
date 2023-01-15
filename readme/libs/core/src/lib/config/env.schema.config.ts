import * as Joi from 'joi';
import { Port } from '../enum/utils.enum';

export const apiEnvSchema = {
  API_PORT: Joi
    .number()
    .port()
    .required(),
}

export const mailerEnvSchema = {
  MAILER_PORT: Joi
    .number()
    .port()
    .default(Port.MailDefault)
    .required(),
  MAILER_HOST: Joi
    .string()
    .hostname()
    .required(),
  MAILER_USER: Joi
    .string()
    .required(),
  MAILER_PASS: Joi
    .string()
    .required(),
  MAILER_FROM: Joi
    .string()
    .required()
}

export const mongoDbEnvSchema = {
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
    .default(Port.DBDefault)
    .required(),
  MONGO_USER: Joi
    .string()
    .required(),
  MONGO_PASS: Joi
    .string(),
  MONGO_AUTH_BASE: Joi
    .string()
    .required(),
}

export const jwtEnvSchema = {
    JWT_SECRET: Joi
    .string()
    .required()
}

export const rmqEnvSchema = {
  RMQ_USER: Joi
    .string()
    .required(),
  RMQ_PASS: Joi
    .string()
    .required(),
  RMQ_HOST: Joi
    .string()
    .hostname()
    .required(),
  RMQ_QUEUE: Joi
    .string()
    .required()
}
