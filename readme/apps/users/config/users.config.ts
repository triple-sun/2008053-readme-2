import { EnvFilePath, apiConfig, moduleConfig, mongoConfig, rmqModuleConfig } from "@readme/core";
import usersEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";

export const usersConfig = {
  ...moduleConfig,
  envFilePath: EnvFilePath.Users,
  load: [apiConfig, mongoConfig, rmqModuleConfig],
  validate: envValidation,
  validationSchema: usersEnvSchema
}
