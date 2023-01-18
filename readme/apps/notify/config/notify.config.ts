import { moduleConfig, EnvFilePath, mailerConfig, mongoConfig, rmqModuleConfig,  } from "@readme/core";
import envSchema from "./env/env.schema";
import envValidation from "./env/env.validation";

export const notifyConfig = {
  ...moduleConfig,
  envFilePath: EnvFilePath.Notify,
  load: [mailerConfig, mongoConfig, rmqModuleConfig],
  validate: envValidation,
  validationSchema: envSchema
}
