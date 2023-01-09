import { getAPIEnvSchema, Port } from '@readme/core';
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
  ...getAPIEnvSchema(Port.BlogAPIDefault),
  ...blogEnvSchema
})
