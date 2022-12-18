import {IsNumber, IsString, Max, Min, validateSync} from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ENVError, Port } from '../../enum/utils.enum';

class UsersEnvConfig {
  @IsString({
    message: ENVError.DBName
  })
  public MONGO_DB: string;

  @IsString({
    message: ENVError.DBHost
  })
  public MONGO_HOST: string;

  @IsNumber({}, {
    message: ENVError.DBPort
  })
  @Min(Port.Min)
  @Max(Port.Max)
  public MONGO_PORT: number;

  @IsString({
    message: ENVError.DBUser
  })
  public MONGO_USER: string;

  @IsString({
    message: ENVError.DBPass
  })
  public MONGO_PASS: string;

  @IsString({
    message: ENVError.DBAuthBase
  })
  public MONGO_AUTH_BASE: string;

  @IsString({
    message: ENVError.UploadDir
  })
  public AVATAR_DIR: string;
}

export const validateUsersEnvironment = (config: Record<string, unknown>) => {
  const environmentsConfig = plainToInstance(
    UsersEnvConfig,
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


