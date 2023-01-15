import { jwtOptions, mongoDbOptions, rmqOptions, moduleConfig, EnvFilePath } from "@readme/core";
import usersEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";

export const usersConfigModuleConfig = {
  ...moduleConfig,
  envFilePath: EnvFilePath.Users,
  load: [jwtOptions, mongoDbOptions, rmqOptions],
  validate: envValidation,
  validationSchema: usersEnvSchema
}
