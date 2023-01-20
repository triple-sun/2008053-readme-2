import { EnvFilePath, formDataConfig, jwtConfig, moduleConfig, rmqModuleConfig } from "@readme/core";
import blogEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";
export const blogConfig = {
  ...moduleConfig,
  envFilePath: EnvFilePath.Blog,
  load: [jwtConfig, rmqModuleConfig, formDataConfig],
  validate: envValidation,
  validationSchema: blogEnvSchema
}
