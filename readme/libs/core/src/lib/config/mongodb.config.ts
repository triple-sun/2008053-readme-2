import { ConfigService, registerAs } from "@nestjs/config"
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose"
import { AppName } from "../enum/app-name"

import { getMongoConnectionString } from "../utils/env.utils"

export const mongoConfig = registerAs(AppName.Mongo, () => ({
  database: process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  authBase: process.env.MONGO_AUTH_BASE,
}))

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          user: configService.get<string>(`${AppName.Mongo}.user`),
          pass: configService.get<string>(`${AppName.Mongo}.pass`),
          host: configService.get<string>(`${AppName.Mongo}.host`),
          port: configService.get<number>(`${AppName.Mongo}.port`),
          authBase: configService.get<string>(`${AppName.Mongo}.authBase`),
          database: configService.get<string>(`${AppName.Mongo}.database`),
        })
      }
    },
    inject: [ConfigService]
  }
}
