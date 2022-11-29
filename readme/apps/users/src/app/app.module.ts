import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { USERS_DEFAULT_DB_PORT, USERS_ENV_FILE_PATH } from './app.const';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig, getMongoDbConfig, getSchema, validateEnvironment } from '@readme/core';
console.log(process.env.MONGO_DB)

@Module({
  imports: [ConfigModule .forRoot({
    cache: true,
    isGlobal: true,
    envFilePath: USERS_ENV_FILE_PATH,
    load: [dbConfig],
    validationSchema: getSchema(USERS_DEFAULT_DB_PORT),
    validate: validateEnvironment
  }),
  MongooseModule.forRootAsync(
    getMongoDbConfig()
  ),
  AuthModule,
  UserModule
],
  controllers: [],
  providers: [],
  exports: [UserModule, AuthModule]
})
export class AppModule {}
