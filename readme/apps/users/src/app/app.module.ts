import envSchema from './env.schema';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig, ENV_FILE_PATH, getMongoDbConfig, jwtOptions } from '@readme/core';
import { validateEnvironments } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [dbConfig, jwtOptions],
      validationSchema: envSchema,
      validate: validateEnvironments,
      expandVariables: true
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
