import { appConfig, EnvFilePath, mailerConfig, mongoConfig, rabbitMqConfig,  } from "@readme/core";
import envSchema from "./env/env.schema";
import envValidation from "./env/env.validation";

export const notifyConfig = {
  ...appConfig,
  envFilePath: EnvFilePath.Notify,
  load: [mailerConfig, mongoConfig, rabbitMqConfig],
  validate: envValidation,
  validationSchema: envSchema
}
