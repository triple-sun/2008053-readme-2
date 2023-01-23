import { APIEnvConfig, JWTEnvConfig, MongoEnvConfig, RMQEnvConfig, validateEnv, ValidateENVProp } from '@readme/core';
import { IntersectionType } from '@nestjs/swagger';

class UsersEnvConfig {
  @ValidateENVProp()
  public UPLOAD_DIR: string;
}

class EnvConfig extends IntersectionType(
  IntersectionType(APIEnvConfig, UsersEnvConfig),
  IntersectionType(RMQEnvConfig, IntersectionType(MongoEnvConfig, JWTEnvConfig))
) {}

export default validateEnv(EnvConfig)
