import { EnvFilePath, formDataConfig, jwtConfig, moduleConfig, rmqModuleConfig } from "@readme/core";
import blogEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";

export const blogConfig = {
  ...moduleConfig,
  envFilePath: EnvFilePath.Blog,
  load: [rmqModuleConfig, jwtConfig, formDataConfig],
  validate: envValidation,
  validationSchema: blogEnvSchema
}
