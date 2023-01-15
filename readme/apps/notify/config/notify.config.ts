import { moduleConfig, EnvFilePath, mailerOptions, mongoDbOptions, rmqOptions } from "@readme/core";
import envSchema from "./env/env.schema";
import envValidation from "./env/env.validation";

export const notifyConfig = {
  ...moduleConfig,
  envFilePath: EnvFilePath.Notify,
  load: [mailerOptions, mongoDbOptions, rmqOptions],
  validate: envValidation,
  validationSchema: envSchema
}
