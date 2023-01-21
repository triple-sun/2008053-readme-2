import { EnvFilePath, jwtConfig, moduleConfig, rmqModuleConfig } from "@readme/core";
import blogEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";
export const bffConfig = {
  ...moduleConfig,
  envFilePath: EnvFilePath.Blog,
  load: [jwtConfig, rmqModuleConfig],
  validate: envValidation,
  validationSchema: blogEnvSchema
}
