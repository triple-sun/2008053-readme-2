import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { USERS_DEFAULT_DB_PORT, USERS_ENV_FILE_PATH, USERS_UPLOAD_DIR } from './app.const';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig, getMongoDbConfig, getSchema, validateEnvironment } from '@readme/core';
import { MulterModule } from '@nestjs/platform-express';

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
  MulterModule.register({
    dest: USERS_UPLOAD_DIR,
  }),
  AuthModule,
  UserModule
],
  controllers: [],
  providers: [],
  exports: [UserModule, AuthModule]
})
export class AppModule {}
