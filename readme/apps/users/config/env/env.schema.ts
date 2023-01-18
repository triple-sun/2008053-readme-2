import { apiEnvSchema, jwtEnvSchema, mongoDbEnvSchema } from '@readme/core';
import * as Joi from 'joi';

const usersEnvSchema = {
  UPLOAD_DIR: Joi
    .string()
    .required(),
}

export default Joi.object({
  ...apiEnvSchema,
  ...usersEnvSchema,
  ...mongoDbEnvSchema,
  ...jwtEnvSchema,
})
