import { ConfigService, registerAs } from "@nestjs/config"
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose"

import { EnvRegisterAs } from "../enum/env.enum"
import { getMongoConnectionString } from "../utils/utils"

export const mongoDbOptions = registerAs(EnvRegisterAs.Mongo, () => ({
  database: process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  port: parseInt(process.env.MONGO_PORT, 10),
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  authBase: process.env.MONGO_AUTH_BASE,
}))

export const getMongoDbConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoConnectionString({
        user: configService.get<string>(`${EnvRegisterAs.Mongo}.user`),
        pass: configService.get<string>(`${EnvRegisterAs.Mongo}.pass`),
        host: configService.get<string>(`${EnvRegisterAs.Mongo}.host`),
        port: configService.get<number>(`${EnvRegisterAs.Mongo}.port`),
        authBase: configService.get<string>(`${EnvRegisterAs.Mongo}.authBase`),
        database: configService.get<string>(`${EnvRegisterAs.Mongo}.database`),
      })
    }),
    inject: [ConfigService]
  }
}
