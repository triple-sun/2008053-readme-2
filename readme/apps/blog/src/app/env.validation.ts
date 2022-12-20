import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { ENVError } from '@readme/core';

class EnvironmentConfig {
  @IsString({
    message: ENVError.UploadDir
  })
  public UPLOAD_DIR: string;

  @IsString({
    message: ENVError.DBHost
  })
  public DATABASE_URL: string;
}

export const validateEnvironments = (config: Record<string, unknown>) => {
  const environmentsConfig = plainToInstance(
    EnvironmentConfig,
    config,
    { enableImplicitConversion: true  },
  );

  const errors = validateSync(
    environmentsConfig, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
