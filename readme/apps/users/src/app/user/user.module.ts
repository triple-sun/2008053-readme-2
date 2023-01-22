import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Entity, getFormDataConfig, getJWTConfig, getRMQModuleConfig, JwtStrategy, Upload } from '@readme/core';

import { UserModel, UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    RMQModule.forRootAsync(getRMQModuleConfig(Entity.User)),
    JwtModule.registerAsync(getJWTConfig()),
    NestjsFormDataModule.configAsync(getFormDataConfig(Upload.Avatar)),
  ],
  providers: [
    UserRepository,
    UserService,
    JwtStrategy,
  ],
  controllers: [
    UserController
  ],
  exports: [
    UserRepository,
    JwtModule,
    PassportModule,
    NestjsFormDataModule
  ],
})
export class UserModule {}
