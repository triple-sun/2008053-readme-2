import { configModuleConfig, jwtOptions, mongoDbOptions, rmqOptions } from "@readme/core";
import usersEnvSchema from "../env/env.schema";
import envValidation from "../env/env.validation";

export const usersConfigModuleConfig = {
  ...configModuleConfig,
  load: [jwtOptions, mongoDbOptions, rmqOptions],
  validate: envValidation,
  validationSchema: usersEnvSchema
}
