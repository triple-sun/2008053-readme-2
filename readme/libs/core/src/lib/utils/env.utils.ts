import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { APIEnvConfig } from '../config/env.config';

export const getMongoConnectionString = ({user, pass, host, port, database, authBase}): string => {
  return `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=${authBase}`;
}

export const validateEnv = (envConfig: typeof APIEnvConfig) => (
  (config: Record<string, unknown>) => {
    const cfg = plainToInstance(
      envConfig,
      config,
      { enableImplicitConversion: true  },
    );

    const errors = validateSync(
      cfg, {
        skipMissingProperties: false
      }
    );

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return cfg;
  }
)
