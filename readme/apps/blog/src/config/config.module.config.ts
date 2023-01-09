import { configModuleConfig } from "@readme/core";
import blogEnvSchema from "../env/env.schema";
import envValidation from "../env/env.validation";

export const blogConfigModuleConfig = {
  ...configModuleConfig,
  validate: envValidation,
  validationSchema: blogEnvSchema
}
