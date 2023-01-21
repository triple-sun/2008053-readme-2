import { EnvFilePath, jwtConfig, appConfig, rmqModuleConfig } from "@readme/core";
import blogEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";
export const blogConfig = {
  ...appConfig,
  envFilePath: EnvFilePath.Blog,
  load: [jwtConfig, rmqModuleConfig, jwtConfig],
  validate: envValidation,
  validationSchema: blogEnvSchema
}
