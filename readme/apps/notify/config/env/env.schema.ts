import { apiEnvSchema, mailerEnvSchema, mongoDbEnvSchema, rmqEnvSchema } from "@readme/core";
import * as Joi from 'joi'

export default Joi.object({
  ...apiEnvSchema,
  ...mailerEnvSchema,
  ...mongoDbEnvSchema,
  ...rmqEnvSchema
})
