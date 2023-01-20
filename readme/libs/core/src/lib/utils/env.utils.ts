import { plainToInstance } from 'class-transformer';
import { APIEnvConfig } from '../config/env.config';
import { validateSync } from 'class-validator';

export const getMongoConnectionString = ({user, pass, host, port, database, authBase}): string => {
  return `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=${authBase}`;
}

export const validateEnv = (envConfig: typeof APIEnvConfig) => (
  (config: Record<string, unknown>) => {
    const environmentsConfig = plainToInstance(
      envConfig,
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
)
