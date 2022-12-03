import { ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { getMongoConnectionString } from "../utils";

export const getMongoDbConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoConnectionString({
        user: configService.get<string>('database.user'),
        pass: configService.get<string>('database.pass'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        authBase: configService.get<string>('database.authBase'),
        database: configService.get<string>('database.database'),
        upload: configService.get<string>('upload.dest')
      })
    }),
    inject: [ConfigService]
  }
}
