import { IsString } from 'class-validator';
import { APIEnvConfig, ENVError, JWTEnvConfig, MongoEnvConfig, validateEnv } from '@readme/core';
import { IntersectionType } from '@nestjs/swagger';

class UsersEnvConfig {
  @IsString({
    message: ENVError.AvatarDir
  })
  public AVATAR_DIR: string;
}

class EnvConfig extends IntersectionType(
  APIEnvConfig,
  IntersectionType(
    JWTEnvConfig,
    IntersectionType(
      MongoEnvConfig,
      UsersEnvConfig
    )
  )
) {}

export default validateEnv(EnvConfig)
