import { IntersectionType } from '@nestjs/swagger';
import { APIEnvConfig, validateEnv, RMQEnvConfig, ValidateENVProp, JWTEnvConfig } from '@readme/core';

class BlogEnvConfig {
  @ValidateENVProp()
  public UPLOAD_DIR: string;
}

class EnvConfig extends IntersectionType(
  IntersectionType(APIEnvConfig, JWTEnvConfig),
  IntersectionType(BlogEnvConfig, RMQEnvConfig)
) {}

export default validateEnv(EnvConfig)
