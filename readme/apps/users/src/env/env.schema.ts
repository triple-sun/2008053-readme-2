import { getAPIEnvSchema, jwtEnvSchema, mongoDbEnvSchema, Port } from '@readme/core';
import * as Joi from 'joi';

const usersEnvSchema = {
  AVATAR_DIR: Joi
    .string()
    .required(),
}

export default Joi.object({
  ...getAPIEnvSchema(Port.UsersAPIDefault),
  ...mongoDbEnvSchema,
  ...jwtEnvSchema,
  ...usersEnvSchema

})
