import { IntersectionType } from '@nestjs/swagger';
import { ENVError, APIEnvConfig, validateEnv, RMQEnvConfig } from '@readme/core';
import { IsString } from 'class-validator';

class BlogEnvConfig {
  @IsString({
    message: ENVError.DBUrl
  })
  public DATABASE_URL: string;

  @IsString({
    message: ENVError.UploadDir
  })
  public UPLOAD_DIR: string;
}

class EnvConfig extends IntersectionType(
  APIEnvConfig,
  IntersectionType(BlogEnvConfig, RMQEnvConfig)
) {}

export default validateEnv(EnvConfig)
