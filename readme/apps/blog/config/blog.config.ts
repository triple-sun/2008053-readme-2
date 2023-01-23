import { EnvFilePath, jwtConfig, appConfig, rabbitMqConfig, formDataConfig } from "@readme/core";
import blogEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";
export const blogConfig = {
  ...appConfig,
  envFilePath: EnvFilePath.Blog,
  load: [jwtConfig, rabbitMqConfig, formDataConfig],
  validate: envValidation,
  validationSchema: blogEnvSchema
}
