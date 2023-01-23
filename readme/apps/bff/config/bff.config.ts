import { appConfig, EnvFilePath, formDataConfig, jwtConfig, rabbitMqConfig } from "@readme/core";
import blogEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";
export const bffConfig = {
  ...appConfig,
  envFilePath: EnvFilePath.Blog,
  load: [jwtConfig, formDataConfig, rabbitMqConfig],
  validate: envValidation,
  validationSchema: blogEnvSchema
}
