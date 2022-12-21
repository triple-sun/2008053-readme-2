import { configModuleConfig, ENVFIlePath } from "@readme/core";
import envConfig from "./env.config";
import envSchema from "../env/env.schema";
import envValidation from "../env/env.validation";

export const notifyConfigModuleConfig = {
  ...configModuleConfig,
  envFilePath: ENVFIlePath.Notify,
  load: [envConfig],
  validate: envValidation,
  validationSchema: envSchema
}
