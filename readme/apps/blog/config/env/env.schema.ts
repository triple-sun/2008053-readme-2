import { apiEnvSchema, rmqEnvSchema } from '@readme/core';
import * as Joi from 'joi';

const blogEnvSchema = {
  DATABASE_URL: Joi
    .string()
    .required(),
  UPLOAD_DIR: Joi
    .string()
    .required(),
}

export default Joi.object({
  ...apiEnvSchema,
  ...blogEnvSchema,
  ...rmqEnvSchema,
})
