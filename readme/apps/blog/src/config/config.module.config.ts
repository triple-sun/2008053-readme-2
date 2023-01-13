import { configModuleConfig, rmqOptions } from "@readme/core";
import blogEnvSchema from "../env/env.schema";
import envValidation from "../env/env.validation";

export const blogConfigModuleConfig = {
  ...configModuleConfig,
  load: [rmqOptions],
  validate: envValidation,
  validationSchema: blogEnvSchema
}
