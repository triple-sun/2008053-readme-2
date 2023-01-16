import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { usersConfig } from '../../config/users.config';
import { getMongoConfig } from '@readme/core';

@Module({
  imports: [
    ConfigModule.forRoot(usersConfig),
    MongooseModule.forRootAsync(getMongoConfig()),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
