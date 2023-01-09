import { IntersectionType } from "@nestjs/swagger";
import { APIEnvConfig, MailerEnvConfig, validateEnv, MongoEnvConfig, RMQEnvConfig } from "@readme/core";

class EnvConfig extends IntersectionType(
  APIEnvConfig,
  IntersectionType(
    MailerEnvConfig,
    IntersectionType(
      MongoEnvConfig,
      RMQEnvConfig)
  )
) {}

export default validateEnv(EnvConfig)


