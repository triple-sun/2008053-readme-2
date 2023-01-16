import { IntersectionType } from "@nestjs/swagger";
import { APIEnvConfig, MailerEnvConfig, validateEnv, MongoEnvConfig, RMQEnvConfig } from "@readme/core";

class EnvConfig extends IntersectionType(
  IntersectionType(APIEnvConfig, MailerEnvConfig),
  IntersectionType(MongoEnvConfig, RMQEnvConfig)
) {}

export default validateEnv(EnvConfig)


