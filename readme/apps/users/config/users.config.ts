import { appConfig, EnvFilePath, formDataConfig, jwtConfig, mongoConfig, rabbitMqConfig } from "@readme/core";
import usersEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";

export const usersConfig = {
  ...appConfig,
  envFilePath: EnvFilePath.Users,
  load: [mongoConfig, jwtConfig, formDataConfig, rabbitMqConfig],
  validate: envValidation,
  validationSchema: usersEnvSchema
}
