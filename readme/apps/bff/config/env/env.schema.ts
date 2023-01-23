import { apiEnvSchema, jwtEnvSchema, rmqEnvSchema } from '@readme/core';
import * as Joi from 'joi';

const bffEnvSchema = {
  UPLOAD_DIR: Joi
    .string()
    .required(),
}

export default Joi.object({
  ...apiEnvSchema,
  ...bffEnvSchema,
  ...rmqEnvSchema,
  ...jwtEnvSchema
})
