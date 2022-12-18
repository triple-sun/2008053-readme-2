import { Port } from "@readme/core";
import * as Joi from 'joi'

export default Joi.object({
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
  UPLOAD_DIR: Joi
    .string()
    .required(),
  AVATAR_DIR: Joi
    .string()
    .required(),
  JWT_SECRET: Joi
    .string()
    .required(),
});
