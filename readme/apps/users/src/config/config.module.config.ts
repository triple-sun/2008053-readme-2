import { configModuleConfig, jwtOptions, mongoDbOptions, rmqOptions } from "@readme/core";
import { EnvFilePath } from "../../../../libs/core/src";
import usersEnvSchema from "../env/env.schema";
import envValidation from "../env/env.validation";

export const usersConfigModuleConfig = {
  ...configModuleConfig,
  envFilePath: EnvFilePath.Users,
  load: [jwtOptions, mongoDbOptions, rmqOptions],
  validate: envValidation,
  validationSchema: usersEnvSchema
}
