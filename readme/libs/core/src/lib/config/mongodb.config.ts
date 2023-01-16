import { ConfigService, registerAs } from "@nestjs/config"
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose"
import { Token } from "../enum/token.enum"

import { getMongoConnectionString } from "../utils/env.utils"

export const mongoConfig = registerAs(Token.Mongo, () => ({
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
          user: configService.get<string>(`${Token.Mongo}.user`),
          pass: configService.get<string>(`${Token.Mongo}.pass`),
          host: configService.get<string>(`${Token.Mongo}.host`),
          port: configService.get<number>(`${Token.Mongo}.port`),
          authBase: configService.get<string>(`${Token.Mongo}.authBase`),
          database: configService.get<string>(`${Token.Mongo}.database`),
        })
      }
    },
    inject: [ConfigService]
  }
}
