import * as Joi from 'joi';
import { Port } from '../enum/utils.enum';

export const mailerEnvSchema = {
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
