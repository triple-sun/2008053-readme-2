import { getAPIEnvSchema, mailerEnvSchema, mongoDbEnvSchema, Port, rmqEnvSchema } from "@readme/core";
import * as Joi from 'joi'

export default Joi.object({
  ...getAPIEnvSchema(Port.NotifyAPIDefault),
  ...mailerEnvSchema,
  ...mongoDbEnvSchema,
  ...rmqEnvSchema
})
