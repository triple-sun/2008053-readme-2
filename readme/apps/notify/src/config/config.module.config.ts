import { configModuleConfig, mailerOptions, mongoDbOptions } from "@readme/core";
import envSchema from "../env/env.schema";
import envValidation from "../env/env.validation";

export const notifyConfigModuleConfig = {
  ...configModuleConfig,
  load: [mailerOptions, mongoDbOptions],
  validate: envValidation,
  validationSchema: envSchema
}
