import { moduleConfig, rabbitMQModuleOptions, rmqModuleOptions, rmqOptions } from "@readme/core";
import blogEnvSchema from "./env/env.schema";
import envValidation from "./env/env.validation";

export const blogConfig = {
  ...moduleConfig,
  envFilePath: 'environments/blog.env',
  load: [rmqOptions, rmqModuleOptions, rabbitMQModuleOptions],
  validate: envValidation,
  validationSchema: blogEnvSchema
}
