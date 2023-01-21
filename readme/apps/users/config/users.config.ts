import { appConfig, EnvFilePath, jwtConfig, mongoConfig, rmqModuleConfig } from "@readme/core";
import usersEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";

export const usersConfig = {
  ...appConfig,
  envFilePath: EnvFilePath.Users,
  load: [mongoConfig, rmqModuleConfig, jwtConfig],
  validate: envValidation,
  validationSchema: usersEnvSchema
}
