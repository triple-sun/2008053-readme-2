import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { usersConfigModuleConfig } from '../../config/config.module.config';
import { getMongoDbConfig, getRabbitMQModuleConfig } from '@readme/core';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    ConfigModule.forRoot(usersConfigModuleConfig),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQModuleConfig()),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
