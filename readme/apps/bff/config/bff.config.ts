import { appConfig, EnvFilePath, rmqModuleConfig } from "@readme/core";
import blogEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";
export const bffConfig = {
  ...appConfig,
  envFilePath: EnvFilePath.Blog,
  load: [rmqModuleConfig],
  validate: envValidation,
  validationSchema: blogEnvSchema
}
