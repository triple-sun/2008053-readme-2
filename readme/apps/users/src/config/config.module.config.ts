import { configModuleConfig, jwtOptions } from "@readme/core";
import envSchema from "../env/env.schema";
import envValidation from "../env/env.validation";
import envConfig from "./env.config";

export const usersConfigModuleConfig = {
  ...configModuleConfig,
  load: [envConfig, jwtOptions],
  validate: envValidation,
  validationSchema: envSchema
}
